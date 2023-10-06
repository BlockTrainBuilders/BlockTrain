#!/bin/sh 


ARGS=$(getopt he:) 
while :
do
    case "$1" in
    -e)
        if [ $2 == 'staging' ]; then
            # Staging specific variables
            echo "environment: $2"
            AKASH_MANIFEST=./deploy-staging.yml
        elif [ $2 == 'production' ]; then
            # production specific variables
            echo "environment: $2"
            AKASH_MANIFEST=./deploy-production.yml
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