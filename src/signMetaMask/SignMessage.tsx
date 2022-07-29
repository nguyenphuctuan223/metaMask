import React, { useRef, useState } from "react";
import { ethers } from "ethers";
interface SignProps {
  // setError: any;
  message: any;
}

const signMessage = async ({ message }: SignProps) => {
  try {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found!");
    }

    await window.ethereum.send("eth_requestAccounts");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    console.log(err);
    alert("MetaMask Message Signature: User denied message signature.");
  }
};

const SignMessage = ({ message }: SignProps) => {
  const resultBox = useRef<any>();
  const [signatures, setSignatures] = useState<any>([]);

  const handleSign = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sig = await signMessage({
      message: data.get("message"),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <form onSubmit={handleSign}>
      <div>
        <footer>
          <button
            type="submit"
            style={{
              background: "#ffc400",
              maxWidth: "100%",
              height: "120px",
              width: "100%",
            }}
          >
            Sign message
          </button>
          <div>
            <textarea
              required
              name="message"
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "60px",
                marginTop: "20px",
              }}
              placeholder="Message"
            />
          </div>
        </footer>
        {signatures.map((sig: any, idx: number) => {
          return (
            <div key={sig}>
              <div>
                <textarea
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    height: "60px",
                    marginTop: 20,
                  }}
                  readOnly
                  ref={resultBox}
                  placeholder="Generated signature"
                  value={sig.signature}
                />
                <h5 style={{ margin: 0, fontSize: 13 }}>
                  Message : {sig.message}
                </h5>
                <h5
                  style={{
                    margin: 3,
                    fontSize: 13,
                  }}
                >
                  {sig.address}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default SignMessage;
