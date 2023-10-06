#!/bin/bash

set -euo pipefail

okp4d query tx --node https://api.testnet.okp4.network:443/rpc $STORED_TRANSACTION_HASH --output json | jq  '.tx.body.messages[0].msg.program' | tr -d '"' | base64 -d
