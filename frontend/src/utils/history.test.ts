import { addToHistory, type VerifyResponse } from "./history";

describe("history utils", () => {
  it("adds latest item to the front and trims", () => {
    const resp: VerifyResponse = {
      isValid: true,
      signer: "0xabc",
      originalMessage: "hi",
    };
    const out = addToHistory([], resp, 2);
    expect(out).toHaveLength(1);
    expect(out[0].signer).toBe("0xabc");
    const out2 = addToHistory(out, { ...resp, signer: "0xdef" }, 2);
    expect(out2[0].signer).toBe("0xdef");
    expect(out2).toHaveLength(2);
  });
});
