A. to run AI container locally
------------------------------
% source env.development.blocktrain.sh
% make dev

B. to build and deploy to akash
-------------------------------
# setup github token for access to write to container registry
# https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
# then login to your
% echo <TOKEN> | docker login ghcr.io -u blocktrainbuilders --password-stdin

# setup akash wallet (testing) to deploy to akash
% provider-services keys add blocktrain --recover
"almost shy radio prepare alcohol under cruise frequent acid track card junior"

% source env.staging.blocktrain.sh
% make deploy-staging