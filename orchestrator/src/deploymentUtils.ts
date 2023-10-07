import { SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { apiEndpoint, networkVersion } from "./constants";
import { MsgCreateLease } from "@akashnetwork/akashjs/build/protobuf/akash/market/v1beta3/lease";
import { LocalCertType } from "./types";
import { SDL } from "@akashnetwork/akashjs/build/sdl";
import { signAndBroadcast, sleep } from "./utils";
import { Agent } from "https";
import { MsgCreateDeployment, MsgUpdateDeployment } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg";
import { RestApiBidsResponseType } from "./types/bid";
import { RestApiDeploymentInfoResponseType } from "./types/deployment";
import { ProviderApiLeaseStatusResponseType, RestApiDeploymentLeasesResponseType } from "./types/lease";

export async function fetchDeploymentInfo(owner: string, dseq: string) {
  try {
    const response = await axios.get<RestApiDeploymentInfoResponseType>(
      `${apiEndpoint}/akash/deployment/${networkVersion}/deployments/info?id.owner=${owner}&id.dseq=${dseq}`
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.message?.includes("Deployment not found")) {
      return null;
    }

    throw err;
  }
}

export async function waitForBids(owner: string, dseq: string, preferredProvider?: string) {
  console.log(`Waiting for bids... (provider: ${preferredProvider ?? "ANY"})`);

  while (true) {
    await new Promise((r) => setTimeout(r, 5000));
    const response = await axios.get<RestApiBidsResponseType>(
      `${apiEndpoint}/akash/market/${networkVersion}/bids/list?filters.owner=${owner}&filters.dseq=${dseq}`
    );

    const bids = response.data.bids.map((x) => ({ provider: x.bid.bid_id.provider, price: parseFloat(x.bid.price.amount), state: x.bid.state }));
    const found = bids.some((x) => !preferredProvider || x.provider === preferredProvider);

    if (found) return bids;

    await sleep(7_000); // TODO: Add timeout
  }
}

export async function createDeployment(client: SigningStargateClient, sdlStr: string, owner: string, dseq: string) {
  //const sdl = SDL.fromString(sdlStr, "beta3");
  // ^^^ GPU resource is required for profile web ^^^
  const sdlV2 = SDL.fromString(sdlStr, "beta2");
  const sdl = new SDL(sdlV2.data, "beta3");
  const manifestVersion = await sdl.manifestVersion();
  const message = {
    typeUrl: `/akash.deployment.${networkVersion}.MsgCreateDeployment`,
    value: MsgCreateDeployment.fromPartial({
      id: {
        owner: owner,
        dseq: dseq
      },
      groups: sdl.groups(),
      version: manifestVersion,
      deposit: {
        denom: "uakt",
        amount: "5000000"
      },
      depositor: owner
    })
  };

  await signAndBroadcast(owner, client, [message]);
}

export async function updateDeployment(client: SigningStargateClient, sdlStr: string, owner: string, dseq: string) {
  //const sdl = SDL.fromString(sdlStr, "beta3");
  // ^^^ GPU resource is required for profile web ^^^
  const sdlV2 = SDL.fromString(sdlStr, "beta2");
  const sdl = new SDL(sdlV2.data, "beta3");
  const manifestVersion = await sdl.manifestVersion();
  const message = {
    typeUrl: `/akash.deployment.${networkVersion}.MsgUpdateDeployment`,
    value: MsgUpdateDeployment.fromPartial({
      id: {
        owner: owner,
        dseq: dseq
      },
      version: manifestVersion
    })
  };

  await signAndBroadcast(owner, client, [message]);
}

export async function sendManifest(cert: LocalCertType, sdlStr: string, dseq: string, providerHostUri: string) {
  console.log("Sending manifest to " + providerHostUri);

  const sdlV2 = SDL.fromString(sdlStr, "beta2");
  const sdl = new SDL(sdlV2.data, "beta3");

  const jsonStr = sdl.manifestSortedJSON();

  // Waiting for 10 sec for provider to have lease
  await sleep(10_000);

  let response;

  const httpsAgent = new Agent({
    cert: cert.certPem,
    key: cert.keyPem,
    rejectUnauthorized: false
  });

  for (let i = 1; i <= 3; i++) {
    console.log("Try #" + i);
    try {
      if (!response) {
        response = await axios.put(`${providerHostUri}/deployment/${dseq}/manifest`, jsonStr, {
          httpsAgent: httpsAgent,
          timeout: 60_000
        });

        i = 3;
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.includes("no lease for deployment") && i < 3) {
        console.log("Lease not found, retrying...");
        await sleep(10_000);
      } else {
        throw err;
      }
    }
  }
}

export async function createLease(client: SigningStargateClient, owner: string, dseq: string, provider: string) {
  console.log(`Creating lease for ${provider}...`);

  const message = {
    typeUrl: `/akash.market.${networkVersion}.MsgCreateLease`,
    value: MsgCreateLease.fromPartial({
      bidId: {
        owner: owner,
        dseq: dseq,
        gseq: 1,
        oseq: 1,
        provider: provider
      }
    })
  };

  await signAndBroadcast(owner, client, [message]);
}

export async function getProviderLeaseStatus(cert: LocalCertType, dseq: string, providerHostUri: string) {
  const httpsAgent = new Agent({
    cert: cert.certPem,
    key: cert.keyPem,
    rejectUnauthorized: false
  });

  const response = await axios.get<ProviderApiLeaseStatusResponseType>(`${providerHostUri}/lease/${dseq}/1/1/status`, { httpsAgent: httpsAgent });

  return response.data;
}

export async function getDeploymentLeases(owner: string, dseq: string) {
  const response = await axios.get<RestApiDeploymentLeasesResponseType>(
    `${apiEndpoint}/akash/market/v1beta3/leases/list?filters.owner=${owner}&filters.dseq=${dseq}&pagination.limit=1000&pagination.count_total=true`
  );

  return response.data.leases;
}

export async function getSdlVersion(sdlStr: string) {
  const sdlV2 = SDL.fromString(sdlStr, "beta2");
  const sdl = new SDL(sdlV2.data, "beta3");
  const manifestVersion = await sdl.manifestVersion();

  return Buffer.from(manifestVersion).toString("base64");
}
