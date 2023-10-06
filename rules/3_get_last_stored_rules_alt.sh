#!/bin/bash

set -euo pipefail

okp4d query tx --node https://api.testnet.okp4.network:443/rpc $STORED_TRANSACTION_HASH --output json | jq  '.program' 