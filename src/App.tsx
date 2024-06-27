import "./App.css";
// import WebApp from "@twa-dev/sdk";
import { getDefaultAlephiumWallet } from "@alephium/get-extension-wallet";
import {
  AlephiumWalletProvider,
  AlephiumConnectButton,
} from "@alephium/web3-react";

import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    // Returns the `window.alephiumProviders.alephium` object after user selects
    // the extension wallet.
    const windowAlephium = await getDefaultAlephiumWallet();
    // Authenticate user to the current dApp, return the selected account
    const selectedAccount = await windowAlephium?.enable();

    if (windowAlephium && selectedAccount) {
      console.log(windowAlephium);
      console.log(selectedAccount);
      setAddress(selectedAccount.address);
      // From here, you can execute various transactions:
      //
      // windowAlephium.signAndSubmitTransferTx(...)
      // windowAlephium.signAndSubmitDeployContractTx(...)
      // windowAlephium.signAndSubmitExecuteScriptTx(...)
      // ...
    }
  };

  const disconnectWallet = async () => {
    // try {
    //   await wallet.disconnect();
    //   setAddress(wallet.publicKey.toString());
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <>
      <h1>PoC - ALPH</h1>
      <div className="card">
        <button onClick={connectWallet}>connect wallet</button>
        <button onClick={disconnectWallet}>disconnect wallet</button>
      </div>
      <AlephiumWalletProvider network="mainnet">
        <AlephiumConnectButton />
      </AlephiumWalletProvider>
      <div className="card">
        <span>{address}</span>
      </div>
    </>
  );
}

export default App;
