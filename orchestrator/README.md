The key code for the actual automation of the Akash orchestration can be found in /src/app.ts:

NOTE: this code was provided to us with help from Maxime of Cloudmos, to be integrated. Included in the repo for future reference
```bash
async function run() {
  if (!process.env.WALLET_MNEMONIC) throw new Error("The env variable WALLET_MNEMONIC is not set.");

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.WALLET_MNEMONIC, { prefix: "akash" 
});
  const [account] = await wallet.getAccounts();

  console.log("Wallet Address: " + account.address);

  const myRegistry = new Registry([...getAkashTypeRegistry()]);

  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { registry: myRegistry, 
broadcastTimeoutMs: 30_000 });
  const balance = await client.getBalance(account.address, "uakt");
  const balanceUAkt = parseFloat(balance.amount);
  const akt = Math.round((balanceUAkt / 1_000_000) * 100) / 100;
  console.log("Balance: " + akt + "akt");

  const cert = await ensureValidCert(account.address, client);

  for (const provider of providers) {
    await ensureDeployment(client, cert, account.address, provider);
  }
}
```
