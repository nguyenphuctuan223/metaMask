/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import React, { useState } from "react";

import "./App.css";
import SignMessage from "./signMetaMask/SignMessage";
import VerifyMessage from "./signMetaMask/VerifyMessage";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  async function requestAcount() {
    if (window.ethereum) {
      try {
        const acounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(acounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Meta Mask not detected!");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAcount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getSigner();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", marginRight: "36px" }}>
          <button
            onClick={connectWallet}
            style={{
              background: "#fc0339",
              height: "120px",
              marginRight: "50px",
              maxWidth: "100%",
            }}
          >
            Request Account
          </button>
          <button
            style={{ background: "#52b202", height: "120px", maxWidth: "100%" }}
            onClick={requestAcount}
          >
            Connect Wallet
          </button>
        </div>

        <h3 style={{ marginBottom: "10px" }}>
          Wallet Address: {walletAddress}
        </h3>
        <hr style={{ width: 650, maxWidth: 650 }} />

        <div style={{ display: "flex" }}>
          <div style={{ width: "100%", marginRight: "50px" }}>
            <SignMessage message={undefined} />
          </div>
          <div style={{ width: "100%" }}>
            <VerifyMessage />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
