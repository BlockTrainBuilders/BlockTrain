#!/bin/sh

ARGS=$(getopt he:) 
while :
do
    case "$1" in
    -e)
        if [ $2 == 'staging' ]; then
            # Staging specific variables
            echo "environment: $2"
            AKASH_LOG_DSEQ=./logs/AKASH_DSEQ_STAGING
            AKASH_LOG_CLOSE=./logs/deploy-staging.close.log
        elif [ $2 == 'production' ]; then
            # production specific variables
            echo "environment: $2"
            AKASH_LOG_DSEQ=./logs/AKASH_DSEQ_PRODUCTION
            AKASH_LOG_CLOSE=./logs/deploy-production.close.log
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

AKASH_DSEQ=`cat ${AKASH_LOG_DSEQ} | sort -nr | head -1`
AKASH_ACCOUNT_ADDRESS=`provider-services keys show ${AKASH_KEY_NAME} -a`
provider-services tx deployment close --dseq ${AKASH_DSEQ}  --owner ${AKASH_ACCOUNT_ADDRESS} --from ${AKASH_KEY_NAME} >| ${AKASH_LOG_CLOSE} || echo "shutdown failed. Continuing..."
#provider-services tx deployment close --from $AKASH_KEY_NAME >| ${AKASH_LOG_CLOSE}
