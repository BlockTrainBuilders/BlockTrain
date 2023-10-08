# Blocktrain Builders - Project Overview
![BlockTrain](https://github.com/BlockTrainBuilders/BlockTrain/assets/80094928/8c1f52ab-23c6-407a-a393-8dd67bf99dcb)

## Value Proposition

### Transparency in Data Ownership:
Leveraging Prolog within OKP4, BlockTrain aims to exhibit clear ownership of datasets. Each dataset is associated with a distinct identity, demonstrating who owns the dataset. This transparency is a significant shift from conventional models where data ownership and origins are often opaque. It provides users with a clearer understanding of data lineage and ownership.

### Revenue Sharing through Smart Contracts:
Dataset owners have the opportunity to monetize their datasets by charging users who wish to utilize models trained on their data. Smart contracts on OKP4 manage the revenue-sharing agreements. This ensures that payments are automated, transparent, and fair, fostering a new economic ecosystem around AI and data.

### Controlled Access to Models:
By utilizing Prolog rules on OKP4, BlockTrain governs who can access a particular AI model. Access control is managed via smart contracts, ensuring that only authorized individuals or entities can use the model. This approach secures the models and datasets against unauthorized access.

### Insight into Model Training Data:
BlockTrain offers users a "look under the hood" of the models, allowing them to understand the data on which they are trained. This initiative is a step towards more transparent AI. It enables users to have better insight into model behavior and biases, which is often missing in today's consumer AI implementations.

### Akash Integration and Ease of Deployment:
BlockTrain is integrated with Akash, ensuring a seamless and efficient deployment process. The integration facilitates easy deployment of AI models and datasets on the decentralized cloud. Moreover, BlockTrain provides code for automated orchestration, simplifying the deployment process and reducing manual intervention.

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


### B. Building the Image and Deploying to Akash

#### Setting Up GitHub Token

Before deploying to Akash, ensure you have set up a GitHub token for access to write to the container registry. Follow the instructions provided in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to generate and manage your personal access tokens.

Once you have your token, log in using the following command:

```text

echo <TOKEN> | docker login ghcr.io -u blocktrainbuilders --password-stdin

```


#### Setting Up Akash Wallet for Testing

Ensure that your Akash wallet has a balance of more than 5AKT. Follow the steps below to set up your wallet:

Use the mnemonic phrase of your wallet, Then, generate and publish the client certificate:


```text

provider-services tx cert generate client --from blocktrain
provider-services tx cert publish client --from blocktrain

```
To deploy to Akash, source the environment and deploy:
```text

source env.staging.blocktrain.sh
make deploy-staging


```


## Functionality of the Image (app.py)

The image performs the following tasks:

1. Processes environment variables.
2. Queries OKP4 to check authentication (validates against environment variables) and retrieves data paths and training parameters.
3. Retrieves the necessary data.
4. Trains the AI model.
5. Makes the trained model publicly available via ports 5000 and 80.



