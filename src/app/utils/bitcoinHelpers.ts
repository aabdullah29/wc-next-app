import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
// import UniversalProvider from "@walletconnect/universal-provider/dist/types/UniversalProvider";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { projectId } from "./chainAndTokens";

export enum BitcoinChains {
  Mainnet = "000000000019d6689c085ae165831e93",
  Chain = "8086",
  Testnet = "1908",
}

const isVersionedTransaction = (
  transaction: Transaction | VersionedTransaction
): transaction is VersionedTransaction => "version" in transaction;

export const getProviderUrl = (chainId: string) => {
  return `https://rpc.walletconnect.com/v1/?chainId=${'12a765e31ffd4059bada1e25190f6e98'}&projectId=${projectId}`;
};

export const sendTransaction = async (
  to: string,
  amount: number,
  provider: any,
  address: string
) => {
  const senderPublicKey = new PublicKey(address);

  const connection = new Connection(
    getProviderUrl(`bitcoin:${BitcoinChains.Mainnet}`)
  );

  const { blockhash } = await connection.getLatestBlockhash();

  const transaction: Transaction | VersionedTransaction = new Transaction({
    feePayer: senderPublicKey,
    recentBlockhash: blockhash,
  }).add(
    SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: new PublicKey(to),
      lamports: amount,
    })
  );

  let rawTransaction: string;
  let legacyTransaction: Transaction | VersionedTransaction | undefined;

  if (isVersionedTransaction(transaction)) {
    // V0 transactions are serialized and passed in the `transaction` property
    rawTransaction = Buffer.from(transaction.serialize()).toString("base64");

    if (transaction.version === "legacy") {
      // For backwards-compatible, legacy transactions are spread in the props
      legacyTransaction = Transaction.from(transaction.serialize());
    }
  } else {
    rawTransaction = transaction
      .serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      })
      .toString("base64");
    legacyTransaction = transaction;
  }

  try {
    const result = await provider!.request({
      method: "bitcoin_signTransaction",
      props: {
        // Passing ...legacyTransaction is deprecated.
        // All new clients should rely on the `transaction` parameter.
        // The future versions will stop passing ...legacyTransaction.
        ...legacyTransaction,
        // New base64-encoded serialized transaction request parameter
        transaction: rawTransaction,
      },
    });

    // We only need `Buffer.from` here to satisfy the `Buffer` param type for `addSignature`.
    // The resulting `UInt8Array` is equivalent to just `bs58.decode(...)`.
    transaction.addSignature(
      senderPublicKey,
      Buffer.from(bs58.decode(result.signature))
    );

    const valid = transaction.verifySignatures();

    return {
      method: "bitcoin_signTransaction",
      address,
      valid,
      result: result.signature,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    return { error: error };
    throw new Error(error);
  }
};

/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


// import bitcoin from "bitcoinjs-lib";
// import { ECPairFactory } from "ecpair";
// import ecc from "tiny-secp256k1";
// import CryptoAccount from "send-crypto";

// const sendFundBTCmainnet = async (
//   receiverAddress: string,
//   amount: number,
//   provider: any,
//   account: string
// ) => {
//   try {
//     const network = bitcoin.networks.bitcoin;
//     const ECPair = ECPairFactory(ecc);

//     const keyPair = ECPair.fromWIF(privateKeyWIF, network);
//     const { privateKey } = keyPair;

//     const account = new CryptoAccount("privateKey");
//     // for testnet
//     // const account = new CryptoAccount(privateKey1, { network: 'testnet' });
//     console.log("account", await account.address("BTC"));
//     console.log("Sender Address:", await account.address("BTC"));
//     console.log("Sender Balance:", await account.getBalance("BTC"));
//     console.log(
//       "Receiver Balance:",
//       await account.getBalance("BTC", { address: receiverAddress })
//     );

//     const txHash = await account
//       .send(receiverAddress, amount, "BTC")
//       .on("transactionHash", console.log)
//       .on("confirmation", console.log);

//     console.log("Transaction Hash:", txHash);

//     console.log("Sender Balance After:", await account.getBalance("BTC"));
//     console.log(
//       "Receiver Balance After:",
//       await account.getBalance("BTC", { address: receiverAddress })
//     );
//     console.log("txHash: ", txHash);
//   } catch (error) {
//     console.error("Error getting BTC balance:", error);
//   }
// };
