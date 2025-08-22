import { Wallet, hashMessage } from "ethers";
import {
  isValidSignature,
  recoverSigner,
} from "../src/services/signature.service";
import { describe, it, expect } from "@jest/globals";

describe("signature.service", () => {
  it("recovers signer and validates signature", async () => {
    const wallet = Wallet.createRandom();
    const message = "hello world";
    const signature = await wallet.signMessage(message);
    const recovered = recoverSigner(message, signature);
    expect(recovered.toLowerCase()).toBe(wallet.address.toLowerCase());
    expect(isValidSignature(message, signature)).toBe(true);
  });

  it("returns false for invalid signature", () => {
    const message = "hello world";
    // Fake signature (not a valid ECDSA signature for this message)
    const invalidSig = `0x${hashMessage("other").slice(2).padEnd(130, "0")}`;
    expect(isValidSignature(message, invalidSig)).toBe(false);
  });
});
