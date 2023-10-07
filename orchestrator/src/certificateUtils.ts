import { MsgCreateCertificate } from "@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert";
import rs from "jsrsasign";
import { apiEndpoint, networkVersion } from "./constants";
import axios from "axios";
import { RestApiCertificatesResponseType } from "./types/certificate";
import { base64Decode, signAndBroadcast } from "./utils";
import { SigningStargateClient } from "@cosmjs/stargate";
import fs from "fs";

export async function ensureValidCert(address: string, client: SigningStargateClient) {
  const certPath = ".data/cert.json";

  if (!fs.existsSync(certPath)) {
    console.log("No local cert. Creating a new one...");
    //const cert = await createCertificate(address);
    // ^^^ Cannot read properties of null (reading 'getAlgorithmParameters') ^^^

    const { crtpem, pubpem, encryptedKey } = generateCertificate(address);

    await fs.promises.writeFile(".data/cert.json", JSON.stringify({ crtpem, pubpem, encryptedKey }), "utf8");
  }

  const certStr = await fs.promises.readFile(certPath, "utf8");
  const certJson = JSON.parse(certStr);
  const localCert = await openCert(certJson.crtpem, certJson.encryptedKey);

  console.log("Checking on-chain certificates...");
  const listResponse = await axios.get<RestApiCertificatesResponseType>(
    `${apiEndpoint}/akash/cert/${networkVersion}/certificates/list?filter.state=valid&filter.owner=${address}`
  );
  const onlineCerts = listResponse.data.certificates.map((x) => ({ ...x, parsed: base64Decode(x.certificate.cert) })) ?? [];

  //   const result = await queryCertificates({ owner: address, $type: "akash.cert.v1beta1.CertificateFilter", serial: "", state: "" });
  //   ^^^ ReferenceError: XMLHttpRequest is not defined ^^^

  const isLocalCertOnChain = onlineCerts.some((x) => x.parsed === localCert.certPem);

  if (!isLocalCertOnChain) {
    console.log("Broadcasting cert on-chain...");
    const message = {
      typeUrl: `/akash.cert.${networkVersion}.MsgCreateCertificate`,
      value: MsgCreateCertificate.fromPartial({
        owner: address,
        cert: Uint8Array.from(Buffer.from(certJson.crtpem)),
        pubkey: Uint8Array.from(Buffer.from(certJson.pubpem))
      })
    };
    const broadcastResponse = await signAndBroadcast(address, client, [message]);
    console.log(broadcastResponse);
  } else {
    console.log("Certificate is already on-chain.");
  }

  return localCert;
}

export async function openCert(certPem: string, encryptedKeyPem: string) {
  if (!certPem || !encryptedKeyPem) throw new Error("Invalid cert or key");

  const key = rs.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(encryptedKeyPem);

  return {
    certPem,
    keyPem: rs.KEYUTIL.getPEM(key, "PKCS8PRV")
  };
}

export const getCertPem = (certKey: string) => {
  var c = new rs.X509();
  c.readCertPEM(certKey);
  var hSerial = c.getSerialNumberHex(); // '009e755e" hexadecimal string
  var sIssuer = c.getIssuerString(); // '/C=US/O=z2'
  var sSubject = c.getSubjectString(); // '/C=US/O=z2'
  var sNotBefore = c.getNotBefore(); // '100513235959Z'
  var sNotAfter = c.getNotAfter(); // '200513235959Z'

  return {
    hSerial,
    sIssuer,
    sSubject,
    sNotBefore,
    sNotAfter,
    issuedOn: strToDate(sNotBefore),
    expiresOn: strToDate(sNotAfter)
  };
};

export const generateCertificate = (address: string) => {
  const notBefore = new Date();
  let notAfter = new Date();
  notAfter.setFullYear(notBefore.getFullYear() + 1);

  const notBeforeStr = dateToStr(notBefore);
  const notAfterStr = dateToStr(notAfter);

  // STEP1. generate a key pair
  const kp = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
  const prv = kp.prvKeyObj;
  const pub = kp.pubKeyObj;

  const encryptedKey = rs.KEYUTIL.getPEM(prv, "PKCS8PRV") as string;

  const pubpem = rs.KEYUTIL.getPEM(pub, "PKCS8PUB" as any).replaceAll("PUBLIC KEY", "EC PUBLIC KEY") as string;

  // STEP2. specify certificate parameters
  const cert = new rs.KJUR.asn1.x509.Certificate({
    version: 3,
    serial: { int: Math.floor(new Date().getTime() * 1000) },
    issuer: { str: "/CN=" + address },
    notbefore: notBeforeStr,
    notafter: notAfterStr,
    subject: { str: "/CN=" + address },
    //subjectAltName: {array: [{oid: "2.23.133.2.6", value: "v0.0.1"}]},
    sbjpubkey: pub, // can specify public key object or PEM string
    ext: [
      { extname: "keyUsage", critical: true, names: ["keyEncipherment", "dataEncipherment"] },
      {
        extname: "extKeyUsage",
        array: [{ name: "clientAuth" }]
      },
      { extname: "basicConstraints", cA: true, critical: true }
    ],
    sigalg: "SHA256withECDSA",
    cakey: prv // can specify private key object or PEM string
  });

  const crtpem = cert.getPEM() as string;

  return { cert, crtpem, pubpem, encryptedKey };
};

function dateToStr(date: Date) {
  const year = date.getUTCFullYear().toString().substring(2).padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const secs = date.getUTCSeconds().toString().padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${secs}Z`;
}

/**
 * 230518223318Z into Date
 * @param {*} str
 * @returns Date
 */
function strToDate(str: string) {
  const year = parseInt(`20${str.substring(0, 2)}`);
  const month = parseInt(str.substring(2, 4)) - 1;
  const day = parseInt(str.substring(4, 6));
  const hours = parseInt(str.substring(6, 8));
  const minutes = parseInt(str.substring(8, 10));
  const secs = parseInt(str.substring(10, 12));

  return new Date(Date.UTC(year, month, day, hours, minutes, secs));
}
