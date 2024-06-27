import "./App.css";
// import WebApp from "@twa-dev/sdk";
import { NightlyConnectAdapter } from "@nightlylabs/wallet-selector-solana";
// import { Market } from "@invariant-labs/sdk";
import { StandardAdapter, WalletAdapter } from "./walletAdapter";
// import { Connection } from "@solana/web3.js";
import { useState } from "react";

// let _market: Market;
// const connection = new Connection("https://api.devnet.solana.com", "recent");
const wallet: WalletAdapter = new StandardAdapter();

export const nightlyConnectAdapter: NightlyConnectAdapter =
  NightlyConnectAdapter.buildLazy(
    {
      appMetadata: {
        name: "Invariant",
        description: "Invariant - AMM DEX provided concentrated liquidity",
        icon: "https://invariant.app/favicon-192x192.png",
      },
      url: "https://nc2.nightly.app",
    },
    // @ts-ignore
    true
  );

function App() {
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    try {
      // WebApp.showAlert(`Connecting wallet...`);
      await wallet.connect();
      setAddress(wallet.publicKey.toString());
    } catch (e) {
      console.log(e);
      // WebApp.showAlert(`Err: ${e}`);
    }
  };

  const disconnectWallet = async () => {
    try {
      // WebApp.showAlert(`Disconnecting wallet...`);
      await wallet.disconnect();
      setAddress(wallet.publicKey.toString());
    } catch (e) {
      console.log(e);
      // WebApp.showAlert(`Err: ${e}`);
    }
  };

  return (
    <>
      <h1>PoC</h1>
      <div className="card">
        <button onClick={connectWallet}>connect wallet</button>
        <button onClick={disconnectWallet}>disconnect wallet</button>
      </div>
      <div className="card">
        <span>{address}</span>
      </div>
    </>
  );
}

export default App;
