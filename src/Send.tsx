import { DUST_AMOUNT } from "@alephium/web3";
import { useBalance, useWallet } from "@alephium/web3-react";
import { useState } from "react";

export const Send = () => {
  const [txId, setTxId] = useState<string>("");
  const { signer, account } = useWallet();
  const { balance } = useBalance();

  const send = async () => {
    if (!signer) return;
    if (!signer.nodeProvider) return;
    const tx = await signer.signAndSubmitTransferTx({
      signerAddress: account.address,
      signerKeyType: account.keyType,
      destinations: [
        {
          address: account.address,
          attoAlphAmount: DUST_AMOUNT,
        },
      ],
    });

    setTxId(tx.txId);
  };

  return (
    <div>
      <button onClick={send}> ign Tx</button> <br />
      {JSON.stringify(balance)} <br />
      {txId && <div>Transaction ID: {txId}</div>}
    </div>
  );
};
