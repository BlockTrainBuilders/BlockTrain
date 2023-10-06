# blocktrain-runner
export PORT=8000
export DEBUG=DEBUG,INFO,WARN,ERROR
export ADDRESS="okp41qljavkuszlclekhd2mjrnaexp4l6aljtnrvk6u"

# docker
export IMAGE=ghcr.io/blocktrainbuilders
export TAG=v`node -pe "require(\"./package.json\")['version']"`

# AKash private
# akash keys add ${AKASH_KEY_NAME} --import "<seed phrase>"
export AKASH_KEY_NAME=work3

# provider.europlots.com, HR (croatia)
export AKASH_PROVIDER_STAGING=akash18ga02jzaq8cw52anyhzkwta5wygufgu6zsz6xc

# Akash generic
export AKASH_NET=https://raw.githubusercontent.com/akash-network/net/master/mainnet
export AKASH_KEYRING_BACKEND=os
export AKASH_GAS=auto
export AKASH_GAS_ADJUSTMENT=1.25
export AKASH_GAS_PRICES=0.025uakt
export AKASH_SIGN_MODE=amino-json
export AKASH_YES=true
export AKASH_OSEQ=1
export AKASH_GSEQ=1
export AKASH_VERSION=`curl -s https://api.github.com/repos/akash-network/provider/releases/latest | jq -r '.tag_name'`
export AKASH_ACCOUNT_ADDRESS=`provider-services keys show ${AKASH_KEY_NAME} -a`
export AKASH_CHAIN_ID=`curl -s "${AKASH_NET}/chain-id.txt"`
export AKASH_NODE=`curl -s "${AKASH_NET}/rpc-nodes.txt" | shuf -n 1`
STATUS=$(curl -s -o /dev/null -w "%{http_code}\n" $AKASH_NODE)
if [ $STATUS != 200 ] ; then
    echo "$AKASH_NODE is down, returned $STATUS"
fi
