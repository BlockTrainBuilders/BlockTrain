#!/bin/bash

set -euo pipefail

# instantiate a law stone (code id = 5) smart contract
# see https://docs.okp4.network/contracts/okp4-law-stone#instantiatemsg
# replace mywallet with your wallet name
okp4d tx wasm instantiate 5 \
    --label "single-source" \
    --from mywallet \
    --admin "okp418yj2mc7hjk2zqtwr9exfyj625kffwmjggd3tux" \
    --gas 1000000 \
    --broadcast-mode block \
    "{"program":"$(cat my_knowledgebase.pl | base64)", "storage_address": "okp41gygq7hhy8k9htuauagzl62hm5p5zg5x65yepv3lpz9s7qtkk3e8q69y5p6"}"