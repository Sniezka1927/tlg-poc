import "./App.css";
import {
  AlephiumWalletProvider,
  AlephiumConnectButton,
} from "@alephium/web3-react";
// import { Send } from "./Send";

function App() {
  return (
    <>
      <h1>PoC - ALPH</h1>
      <AlephiumWalletProvider network="testnet">
        <AlephiumConnectButton />
        {/* <Send /> */}
      </AlephiumWalletProvider>
    </>
  );
}

export default App;
