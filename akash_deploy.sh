#!/bin/sh 
# Assume akash wallet & cert setup and following define: AKASH_KEY_NAME
# Assume provider is chosen: AKASH_PROVIDER_STAGING
# Assume the following are set
# AKASH_NET = https://raw.githubusercontent.com/ovrclk/net/master/mainnet
# AKASH_KEYRING_BACKEND = os
# AKASH_GAS = auto
# AKASH_GAS_ADJUSTMENT = 1.25
# AKASH_GAS_PRICES = 0.025uakt
# AKASH_SIGN_MODE = amino-json
# AKASH_YES = true
# AKASH_OSEQ = 1
# AKASH_GSEQ = 1
# AKASH_VERSION = `curl -s "${AKASH_NET}/version.txt"`
# AKASH_ACCOUNT_ADDRESS = `akash keys show ${AKASH_KEY_NAME} -a`
# AKASH_CHAIN_ID = `curl -s "${AKASH_NET}/chain-id.txt"`
# AKASH_NODE = `curl -s "${AKASH_NET}/rpc-nodes.txt" | shuf -n 1`

ARGS=$(getopt he:) 
while :
do
    case "$1" in
    -e)
        if [ $2 == 'staging' ]; then
            # Staging specific variables
            echo "environment: $2"
            AKASH_PROVIDER=${AKASH_PROVIDER_STAGING}
            AKASH_MANIFEST=./deploy-staging.yml
            AKASH_LOG_DEPLOYMENT=./logs/deploy-staging.deployment.log
            AKASH_LOG_BIDS=./logs/deploy-staging.bids.log
            AKASH_LOG_LEASE=./logs/deploy-staging.lease.log
            AKASH_LOG_DSEQ=./logs/AKASH_DSEQ_STAGING
        elif [ $2 == 'production' ]; then
            # production specific variables
            echo "environment: $2"
            AKASH_PROVIDER=${AKASH_PROVIDER_PRODUCTION}
            AKASH_MANIFEST=./deploy-production.yml
            AKASH_LOG_DEPLOYMENT=./logs/deploy-production.deployment.log
            AKASH_LOG_BIDS=./logs/deploy-production.bids.log
            AKASH_LOG_LEASE=./logs/deploy-production.lease.log
            AKASH_LOG_DSEQ=./logs/AKASH_DSEQ_PRODUCTION
        else
            echo "usage: sh $0 -e <staging|production>"
            exit 2    
        fi
        shift; shift
        break
        ;;
    -h)
        echo "usage: sh $0 -e <staging|production>"
        exit 2
        ;;
    *)
        echo "usage: sh $0 -e <staging|production>"
        exit 2
        ;;
    esac
done

npm --prefix ./envsub install > /dev/null
node envsub/envsub.js deploy.yml.template >| ${AKASH_MANIFEST}

# CREATE LEASE
unset AKASH_DSEQ
provider-services tx deployment create ${AKASH_MANIFEST} --from ${AKASH_KEY_NAME} >| ${AKASH_LOG_DEPLOYMENT}
AKASH_DSEQ=`cat ${AKASH_LOG_DEPLOYMENT} | jq -Mr '.logs[].events[].attributes[] | select(.key == "dseq").value' | sort -rn | head -1`
echo ${AKASH_DSEQ} >> ${AKASH_LOG_DSEQ}
# provider-services query deployment get --owner ${AKASH_ACCOUNT_ADDRESS} --dseq ${AKASH_DSEQ}

# CHOOSE PROVIDER. 
# pre-selected provider defined in AKASH_PROVIDER
sleep 20
provider-services query market bid list --owner ${AKASH_ACCOUNT_ADDRESS} --node ${AKASH_NODE} --dseq ${AKASH_DSEQ} --state=open >| ${AKASH_LOG_BIDS}
provider-services tx market lease create --dseq ${AKASH_DSEQ} --provider ${AKASH_PROVIDER} --from ${AKASH_KEY_NAME} >| ${AKASH_LOG_LEASE}

# DEPLOY
provider-services send-manifest ${AKASH_MANIFEST} --dseq ${AKASH_DSEQ} --provider ${AKASH_PROVIDER} --from ${AKASH_KEY_NAME}
#provider-services lease-status --dseq ${AKASH_DSEQ} --from ${AKASH_KEY_NAME} --provider ${AKASH_PROVIDER}
#provider-services lease-logs --dseq ${AKASH_DSEQ} --provider ${AKASH_PROVIDER} --from ${AKASH_KEY_NAME}

# UPDATE
# provider-services tx deployment update ${AKASH_MANIFEST} --dseq ${AKASH_DSEQ} --from ${AKASH_KEY_NAME} 
# provider-services send-manifest ${AKASH_MANIFEST} --dseq ${AKASH_DSEQ} --provider ${AKASH_PROVIDER} --from ${AKASH_KEY_NAME}