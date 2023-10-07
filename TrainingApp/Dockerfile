# Use the official Python image as the base image
FROM python:3.8-slim-buster

# Set the working directory
WORKDIR /usr/src/app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining files into the container
COPY . .

# Set the Flask environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application
CMD ["flask", "run", "--host=0.0.0.0"]
