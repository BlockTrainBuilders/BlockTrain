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