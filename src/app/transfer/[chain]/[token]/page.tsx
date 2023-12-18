"use client";

import styles from "../../../page.module.css";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useEffect, useState } from "react";
import SendERC20 from "../../SendERC20";
import { disconnect } from "@wagmi/core";
import { nativeCurrency, allChains } from "../../../utils/chainAndTokens";
import { useRouter } from "next/navigation";
import SendNativeCurrency from "../../SendNativeCurrency";

export default function Transfer({
  params,
}: {
  params: {
    chain: string;
    token: string;
  };
}) {
  const [selectedChain, token] = [
    decodeURIComponent(params.chain),
    params.token,
  ];
  const tokenName = token.substring(0, token.indexOf("_"));
  const tokenAmount = token.substring(token.indexOf("_") + 1, token.length);

  const router = useRouter();
  const [callFunction, setCallFunction] = useState<string>("");
  const [connectButton, setConnectButton] = useState<Boolean>(false);

  const { chain } = useNetwork();
  const {
    chains,
    error: errorSwitchNetwork,
    isLoading,
    pendingChainId,
    switchNetwork,
    reset,
  } = useSwitchNetwork({
    // chainId: 5,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      console.log("SwitchNetworkError", error);
    },
    onMutate(args) {
      console.log("SwitchNetworkMutate", args);
    },
    onSettled(data, error) {
      console.log("SwitchNetworkSettled", { data, error });
    },
    onSuccess(data) {
      console.log("SwitchNetworkSuccess", data);
    },
  });

  const { address, isConnecting, isDisconnected } = useAccount();

  const currentNetworkId = allChains.find(
    (chain) => selectedChain === chain.name
  )?.id;

  const isNetworkSame = (net: any) => {
    return net ? net === currentNetworkId : false;
  };

  useEffect(() => {
    // at page reload
    return () => {
      const atReload = async () => {
        setTimeout(() => {
          disconnect().then(() => {
            console.log("--disconnect++");
            setConnectButton(true);
          });
        }, 800);
      };
      (async () => {
        await atReload();
      })();
    };
  }, []);

  useEffect(() => {
    if (address && chain?.id && !isDisconnected && connectButton) {
      console.log(`isDisconnected: ${isDisconnected}
      selectedNetworkId++: ${chain?.id}
      fromAddress: ${address}`);

      setTimeout(() => {
        if (!isNetworkSame(chain?.id)) {
          reset();
          console.log(
            "++Switch Network From:",
            chain?.id,
            " To:",
            currentNetworkId
          );
          switchNetwork?.(currentNetworkId);
        } else if (chain?.id == currentNetworkId) {
          if (
            nativeCurrency[tokenName] &&
            callFunction !== "call" &&
            callFunction !== "done"
          ) {
            console.log("sending currency::", nativeCurrency[tokenName]);
            setCallFunction("call");
          } else if (!nativeCurrency[tokenName]) {
            console.log("sending erc20::");
            setCallFunction("call");
          }
        }
      }, 1500);
    }
  }, [address, chain?.id, isDisconnected, tokenName]);

  return (
    <main className={styles.main}>
      {
        <div className={styles.description}>
          {/* for Native Currency */}
          {connectButton &&
            tokenName &&
            nativeCurrency[tokenName] &&
            isNetworkSame(chain?.id) && (
              <SendNativeCurrency
                {...{
                  selectedChain: selectedChain,
                  amount: tokenAmount,
                  senderAddrss: address,
                  chainId: chain?.id!,
                  callFunction: callFunction,
                  setCallFunction: setCallFunction,
                }}
              />
            )}
          {/* for ERC20 Tokens */}
          {connectButton &&
            tokenName &&
            !nativeCurrency[tokenName] &&
            isNetworkSame(chain?.id) && (
              <SendERC20
                {...{
                  tokenName: tokenName,
                  tokenAmount: tokenAmount,
                  senderAddrss: address,
                  chainId: chain?.id!,
                  callFunction: callFunction,
                  setCallFunction: setCallFunction,
                }}
              />
            )}
        </div>
      }

      <div className={styles.description}></div>
      <div className={styles.center}>
        {tokenName && connectButton && (
          <w3m-button balance={"show"} size={"md"} label={"Pay"}></w3m-button>
        )}
        {/* {
          <button
            disabled={!switchNetwork}
            onClick={() =>
              switchNetwork?.(
                allChains.find((chain) => selectedChain === chain.name)?.id
              )
            }
          >
            {selectedChain}
          </button>
        } */}
        {/* <button onClick={disconnect}>Disconnect</button> */}
      </div>
      <div className={styles.grid}></div>
    </main>
  );
}
