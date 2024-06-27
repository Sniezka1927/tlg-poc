import "./App.css";
import {
  AlephiumWalletProvider,
  AlephiumConnectButton,
} from "@alephium/web3-react";

function App() {
  return (
    <>
      <h1>PoC - ALPH</h1>
      <AlephiumWalletProvider network="mainnet">
        <AlephiumConnectButton />
      </AlephiumWalletProvider>
    </>
  );
}

export default App;
