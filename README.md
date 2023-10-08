# Blocktrain Builders - Project Overview

## Value Proposition

### Transparency in Data Ownership:
Leveraging Prolog within OKP4, BlockTrain aims to exhibit clear ownership of datasets. Each dataset is associated with a distinct identity, demonstrating who owns the dataset. This transparency is a significant shift from conventional models where data ownership and origins are often opaque. It provides users with a clearer understanding of data lineage and ownership.

### Revenue Sharing through Smart Contracts:
Dataset owners have the opportunity to monetize their datasets by charging users who wish to utilize models trained on their data. Smart contracts on OKP4 manage the revenue-sharing agreements. This ensures that payments are automated, transparent, and fair, fostering a new economic ecosystem around AI and data.

### Controlled Access to Models:
By utilizing Prolog rules on OKP4, BlockTrain governs who can access a particular AI model. Access control is managed via smart contracts, ensuring that only authorized individuals or entities can use the model. This approach secures the models and datasets against unauthorized access.

### Insight into Model Training Data:
BlockTrain offers users a "look under the hood" of the models, allowing them to understand the data on which they are trained. This initiative is a step towards more transparent AI. It enables users to have better insight into model behavior and biases, which is often missing in today's consumer AI implementations.

## Repository Structure

- **TrainingApp**: This directory contains Python scripts related to training models.
  - `app.py`: A Python script for the training application.
  - `train.py`: A Python script dedicated to training processes.
  
- **orchestrator**: Contains TypeScript source files for orchestrating various processes.
  - `src/app.ts`: A TypeScript file for the orchestrator application.
  
- **src**: Contains the main source files for the application.
  - `App.tsx`: A TypeScript React file for the main application.

## Deployed Frontend

https://block-train-rouge.vercel.app/ 

## How to run

### A. to run AI container locally

% source env.development.blocktrain.sh
% make dev

### B. to build image and deploy to akash

### setup github token for access to write to container registry

### https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

### then login to your

% echo <TOKEN> | docker login ghcr.io -u blocktrainbuilders --password-stdin

### setup akash wallet (testing) to deploy to akash

### make sure this wallet has more than 5AKT

% provider-services keys add blocktrain --recover
"almost shy radio prepare alcohol under cruise frequent acid track card junior"
% provider-services tx cert generate client --from blocktrain
% provider-services tx cert publish client --from blocktrain

% source env.staging.blocktrain.sh
% make deploy-staging

## What the image does? (app.py)

---

1. process environment variables
2. query okp4 to check authentication (validation against environment variables), and get data paths and training parameters
3. retrieve the data
4. train the model
5. make the model available publicly via port 5000/80
