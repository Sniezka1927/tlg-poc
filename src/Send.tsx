import { DUST_AMOUNT } from "@alephium/web3";
import { useWallet } from "@alephium/web3-react";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { useState } from "react";

const KEYPAIR = {
  privateKey:
    "607943e865e313f8142f0e480a16b2172d75820b91071cb32e34bc1ffae999fd",
  publicKey:
    "033c48aca26286d8540ff74e5327933bb3add05889d49b24f4622e91185b7d1485",
};
export const Send = () => {
  const { nodeProvider, account } = useWallet();

  const [txId, setTxId] = useState<string>("");
  const [wallet, setWallet] = useState<PrivateKeyWallet | null>(null);
  const [balance, setBalance] = useState<string>("");

  const loadWalletFromPrivateKey = async () => {
    if (!nodeProvider) return;
    const { privateKey } = KEYPAIR;
    const loadedWallet = new PrivateKeyWallet({ privateKey, nodeProvider });
    queryBalance(loadedWallet.address);
    setWallet(loadedWallet);
  };
  const getWallet = async () => {
    if (!nodeProvider) return;

    const generatedWallet = PrivateKeyWallet.Random(
      account.group,
      nodeProvider
    );
    queryBalance(generatedWallet.address);
    setWallet(generatedWallet);
  };

  const clearWallet = () => setWallet(null);

  const send = async () => {
    if (!wallet) return;
    const tx = await wallet.signAndSubmitTransferTx({
      signerAddress: wallet.address,
      signerKeyType: wallet.keyType,
      destinations: [
        {
          address: wallet.address,
          attoAlphAmount: DUST_AMOUNT,
        },
      ],
    });

    queryBalance(wallet.address);
    setTxId(tx.txId);
  };

  const queryBalance = async (address: string) => {
    try {
      const response = await fetch(
        `https://wallet-v20.testnet.alephium.org/addresses/${address}/balance`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBalance(data.balanceHint);
    } catch (error) {
      alert("err fetching balance");
    }
  };

  return (
    <div>
      <br />
      <button onClick={loadWalletFromPrivateKey}>Load Wallet</button>
      <button onClick={clearWallet}> clear wallet</button>
      <button onClick={getWallet}> Get Wallet</button>
      <br />
      {wallet && (
        <p>
          pubkey: {wallet.publicKey} <br />
          private key: {wallet.privateKey} <br />
          address: {wallet.address} <br />
        </p>
      )}
      <button onClick={send}> Sign Tx</button> <br />
      {txId && <div>Transaction ID: {txId}</div>}
      {wallet && <div>Balance: {balance}</div>}
    </div>
  );
};
