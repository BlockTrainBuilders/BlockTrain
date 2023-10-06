#!/bin/bash

set -euo pipefail

okp4d query wasm contract-state smart okp41mpyp9t48q2dy6s4lkxwjpy8sgg4r823hwam2tap2ra86hmgrrqyq0ushlr \
    --output json \
    --chain-id okp4-nemeton-1 \
    --node https://api.testnet.okp4.network:443/rpc \
    "{\"object_data\": {\"id\": $(okp4d query txs --events 'message.sender=okp418yj2mc7hjk2zqtwr9exfyj625kffwmjggd3tux&instantiate.code_id=5' \
        --chain-id okp4-nemeton-1 --node https://api.testnet.okp4.network:443/rpc \
        --output json | jq '.txs[-1].logs[-1].events[] | select(.type == "wasm").attributes[] | select(.key == "id").value')}}" |
    jq '.data' | tr -d '"' | base64 -d
