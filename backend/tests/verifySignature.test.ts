import request from "supertest";
import { createApp } from "../src/app";
import { Wallet } from "ethers";
import { describe, it, expect } from "@jest/globals";

describe("POST /verify-signature", () => {
  it("validates a correct signature and returns signer", async () => {
    const app = createApp();
    const wallet = Wallet.createRandom();
    const message = "hello world";
    const signature = await wallet.signMessage(message);

    const res = await request(app)
      .post("/verify-signature")
      .send({ message, signature })
      .expect(200);

    expect(res.body.isValid).toBe(true);
    expect(res.body.signer.toLowerCase()).toBe(wallet.address.toLowerCase());
    expect(res.body.originalMessage).toBe(message);
  });

  it("rejects invalid input", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/verify-signature")
      .send({})
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("returns 200 with isValid false on bad signature", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/verify-signature")
      .send({ message: "m", signature: "0xdeadbeef" })
      .expect(200);
    expect(res.body.isValid).toBe(false);
  });
});
