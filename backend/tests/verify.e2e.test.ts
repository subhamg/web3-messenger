import request from "supertest";
import { Wallet } from "ethers";
import { createApp } from "../src/app";
import { describe, it, expect } from "@jest/globals";

const app = createApp();

describe("POST /verify-signature", () => {
  it("returns valid for a proper signature", async () => {
    const wallet = Wallet.createRandom();
    const message = "integration test message";
    const signature = await wallet.signMessage(message);

    const res = await request(app)
      .post("/verify-signature")
      .send({ message, signature })
      .expect(200);

    expect(res.body.isValid).toBe(true);
    expect(res.body.signer.toLowerCase()).toBe(wallet.address.toLowerCase());
    expect(res.body.originalMessage).toBe(message);
  });

  it("returns invalid for bad payload", async () => {
    const res = await request(app)
      .post("/verify-signature")
      .send({ message: "", signature: "" })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });
});
