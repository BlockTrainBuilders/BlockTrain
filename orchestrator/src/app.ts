import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { ensureValidCert } from "./certificateUtils";
import { getAkashTypeRegistry } from "@akashnetwork/akashjs/build/stargate";
import {
  createDeployment,
  createLease,
  fetchDeploymentInfo,
  getDeploymentLeases,
  getProviderLeaseStatus,
  getSdlVersion,
  sendManifest,
  updateDeployment,
  waitForBids
} from "./deploymentUtils";
import { rpcEndpoint } from "./constants";
import fs from "fs";

require("dotenv").config();

type ProviderType = {
  address: string;
  hostUri: string;
  dseq?: string;
};

const providers: ProviderType[] = [
  {
    address: "akash18ga02jzaq8cw52anyhzkwta5wygufgu6zsz6xc",
    hostUri: "https://provider.europlots.com:8443", // TODO: Get from chain
    dseq: "12877638"
  },
  // {
  //   address: "akash15ksejj7g4su7ljufsg0a8eglvkje94z8qsh68a",
  //   hostUri: "https://provider.palmito.duckdns.org:8443", // TODO: Get from chain
  //   dseq: "12919733"
  // },
  {
    address: "akash1u5cdg7k3gl43mukca4aeultuz8x2j68mgwn28e",
    hostUri: "https://provider.d3akash.cloud:8443", // TODO: Get from chain
    dseq: "12920958"
  }
];

async function run() {
  if (!process.env.WALLET_MNEMONIC) throw new Error("The env variable WALLET_MNEMONIC is not set.");

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.WALLET_MNEMONIC, { prefix: "akash" });
  const [account] = await wallet.getAccounts();

  console.log("Wallet Address: " + account.address);

  const myRegistry = new Registry([...getAkashTypeRegistry()]);

  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { registry: myRegistry, broadcastTimeoutMs: 30_000 });
  const balance = await client.getBalance(account.address, "uakt");
  const balanceUAkt = parseFloat(balance.amount);
  const akt = Math.round((balanceUAkt / 1_000_000) * 100) / 100;
  console.log("Balance: " + akt + "akt");

  const cert = await ensureValidCert(account.address, client);

  for (const provider of providers) {
    await ensureDeployment(client, cert, account.address, provider);
  }
}

async function ensureDeployment(
  client: SigningStargateClient,
  cert: {
    certPem: string;
    keyPem: string;
  },
  address: string,
  provider: ProviderType
) {
  if (!provider.dseq) throw new Error("No dseq provided");

  console.log(`Looking for deployment ${provider.dseq}...`);
  let deployment = await fetchDeploymentInfo(address, provider.dseq);

  let helloWorldSdl = await fs.promises.readFile("./sdl/hello-world.sdl.yml", "utf8");
  helloWorldSdl = helloWorldSdl.replace("${AKASH_DSEQ}", provider.dseq);

  let justCreated = false;
  if (deployment?.deployment.state === "active") {
    console.log(`Deployment ${provider.dseq} found.`);
  } else if (deployment?.deployment.state === "closed") {
    console.log(`Deployment ${provider.dseq} is closed.`);
    return;
  } else {
    console.log(`Deployment ${provider.dseq} not found. Creating...`);
    await createDeployment(client, helloWorldSdl, address, provider.dseq);
    deployment = await fetchDeploymentInfo(address, provider.dseq);
    justCreated = true;
  }

  const leases = justCreated ? [] : await getDeploymentLeases(address, provider.dseq);

  if (leases.length === 0) {
    const bids = await waitForBids(address, provider.dseq, provider.address);
    console.log(`Found ${bids.length} bids.`);

    const selectedBid = bids.find((x) => x.provider === provider.address);
    if (!selectedBid) throw new Error("No bid found for preferred provider.");
    if (selectedBid.state === "closed") {
      console.log("Bid is closed, please close the deployment");
      return;
    }

    if (selectedBid.state === "open") {
      await createLease(client, address, provider.dseq, selectedBid.provider);
      console.log("Lease created.");
    }
  } else {
    console.log(`Lease found.`);
  }

  const manifestVersion = await getSdlVersion(helloWorldSdl);
  const isVersionMatching = deployment?.deployment.version === manifestVersion;

  if (!isVersionMatching) {
    console.log("Updating deployment...");

    await updateDeployment(client, helloWorldSdl, address, provider.dseq);
  }

  //if (justCreated || !isVersionMatching) {
  console.log("Sending manifest...");

  await sendManifest(cert, helloWorldSdl, provider.dseq, provider.hostUri);
  // }

  const leaseStatus = await getProviderLeaseStatus(cert, provider.dseq, provider.hostUri);

  console.log(
    `URL: ${Object.values(leaseStatus.services)
      .flatMap((x) => x.uris)
      .join(", ")}`
  );
}

run();
