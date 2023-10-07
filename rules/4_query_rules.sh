#!/bin/bash

set -euo pipefail

# evaluate a Prolog query
# from rules stored on a specific "law stone" smart contract instance
okp4d query wasm contract-state smart okp418sjvyazj6lpepfsgrvacm602pv7qk0rcjpt7qp4m3ke3m4ar76xqxzc9xy \
    --node https://api.testnet.okp4.network:443/rpc \
    "{\"ask\": {\"query\": \"is_owner(X, Dataset).\"}}"
