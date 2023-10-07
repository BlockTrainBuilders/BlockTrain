# Build stage
FROM golang:1.20-alpine3.16 AS go-builder
WORKDIR /src
# CosmWasm: see https://github.com/CosmWasm/wasmvm/releases
ADD https://github.com/CosmWasm/wasmvm/releases/download/v1.2.4/libwasmvm_muslc.aarch64.a /lib/libwasmvm_muslc.aarch64.a
ADD https://github.com/CosmWasm/wasmvm/releases/download/v1.2.4/libwasmvm_muslc.x86_64.a /lib/libwasmvm_muslc.x86_64.a
# hadolint ignore=DL4006
RUN set -eux \
    && apk add --no-cache ca-certificates=20220614-r0 build-base=0.5-r3 git=2.36.6-r0 linux-headers=5.16.7-r1 \
    && sha256sum /lib/libwasmvm_muslc.aarch64.a | grep 682a54082e131eaff9beec80ba3e5908113916fcb8ddf7c668cb2d97cb94c13c \
    && sha256sum /lib/libwasmvm_muslc.x86_64.a | grep ce3d892377d2523cf563e01120cb1436f9343f80be952c93f66aa94f5737b661 \
    && cp "/lib/libwasmvm_muslc.$(uname -m).a" /lib/libwasmvm_muslc.a
#COPY . /src/
RUN git clone https://github.com/okp4/okp4d.git /src/
RUN BUILD_TAGS=muslc LINK_STATICALLY=true make build


# image
# Use the official Python image as the base image
FROM python:3.8-slim-buster AS base

# Set the working directory
WORKDIR /usr/src/app

# install okp4d
COPY --from=go-builder /src/target/dist/okp4d /usr/bin/okp4d

# Copy the requirements file into the container
COPY TrainingApp/requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining files into the container
COPY ./TrainingApp/ .

# Set the Flask environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application
CMD ["flask", "run", "--host=0.0.0.0"]
#CMD ["sh", "blocktrain.sh"]