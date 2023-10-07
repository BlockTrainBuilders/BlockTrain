export const OKP4TestnetChain = {
    chainId: "okp4-nemeton-1",
    currencies: [
      {
        coinDenom: "know",
        coinMinimalDenom: "uknow",
        coinDecimals: 6,
        coinImageUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/okp4testnet/images/okp4.png",
      },
    ],
    path: "okp4testnet",
    rest: "https://api.testnet.okp4.network:443/",
    rpc: "https://api.testnet.okp4.network/rpc",
    bech32Config: {
      bech32PrefixAccAddr: "okp4",
      bech32PrefixAccPub: "okp4pub",
      bech32PrefixValAddr: "okp4valoper",
      bech32PrefixValPub: "okp4valoperpub",
      bech32PrefixConsAddr: "okp4valcons",
      bech32PrefixConsPub: "okp4valconspub",
    },
    chainName: "okp4testnet",
    feeCurrencies: [
      {
        coinDenom: "know",
        coinMinimalDenom: "uknow",
        coinDecimals: 6,
        coinImageUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/okp4testnet/images/okp4.png",
      },
    ],
    stakeCurrency: {
      coinDenom: "know",
      coinMinimalDenom: "uknow",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/okp4testnet/images/okp4.png",
    },
    bip44: {
      coinType: 118,
    },
  };

  export const yamlFile = `
  ---
  version: "2.0"
  
  services:
    blocktrain-runner:
      image: \${IMAGE}/blocktrain-server:\${TAG}
      env:
        - PORT=\${PORT}
        - DEBUG=\${DEBUG}
        - ADDRESS=\${ADDRESS}
      expose:
        - port: \${PORT}
          as: 80
          http_options:
            max_body_size: 104857600
  
  profiles:
    compute:
      blocktrain-runner:
        resources:
          cpu:
            units: 1.0
          memory:
            size: 512Mi
          storage:
            size: 512Mi
    placement:
      dcloud:
        attributes:
          host: akash
        signedBy:
          anyOf:
            - "akash1365yvmc4s7awdyj3n2sav7xfx76adc6dnmlx63"
        pricing:
          blocktrain-runner:
            denom: uakt
            amount: 200
  
  deployment:
    blocktrain-runner:
      dcloud:
        profile: blocktrain-runner
        count: 1
  `;
  