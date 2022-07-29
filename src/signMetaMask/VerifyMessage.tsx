// import { useState, useRef } from "react";
import { ethers } from "ethers";

const verifyMessage = async ({ message, address, signature }: any) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const handleVerification = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const isValid = await verifyMessage({
      message: data.get("message"),
      address: data.get("address"),
      signature: data.get("signature"),
    });

    if (isValid) {
      alert("Signature is valid!");
    } else {
      alert("Signature is Invalid!");
    }
  };

  return (
    <form onSubmit={handleVerification}>
      <div>
        <button
          type="submit"
          style={{ background: "#1c54b2", height: "120px", width: "100%" }}
        >
          Verify signature
        </button>
        <div>
          <textarea
            required
            name="message"
            style={{ width: "100%", height: "60px", marginTop: "20px" }}
            placeholder="Message"
          />
          <textarea
            required
            name="signature"
            placeholder="Signature"
            style={{ width: "100%", height: "60px", marginTop: "20px" }}
          />
          <div>
            <input
              required
              type="text"
              name="address"
              style={{ width: "100%", height: "60px", marginTop: "20px" }}
              placeholder="Signer address"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
