import { EncodeObject } from "@cosmjs/proto-signing";
import { SigningStargateClient, calculateFee } from "@cosmjs/stargate";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

export function base64Decode(input: string) {
  return Buffer.from(input, "base64").toString("utf8");
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function signAndBroadcast(address: string, client: SigningStargateClient, messages: readonly EncodeObject[]) {
  const simulation = await client.simulate(address, messages, "");

  const fee = calculateFee(Math.round(simulation * 1.35), "0.025uakt");

  const txRaw = await client.sign(address, messages, fee, "");

  const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
  const txResult = await client.broadcastTx(txRawBytes);

  if (txResult.code !== 0) {
    console.log(txResult);
    throw new Error(`Error broadcasting transaction: ${txResult.rawLog}`);
  }

  return txResult;
}
