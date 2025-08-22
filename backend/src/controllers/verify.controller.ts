import { Request, Response } from "express";
import { z } from "zod";
import { isValidSignature, recoverSigner } from "../services/signature.service";
import { addValidSignature } from "../services/signature.store";

const bodySchema = z.object({
  message: z.string().min(1).max(5000),
  signature: z.string().min(1),
});

export async function postVerifySignature(req: Request, res: Response) {
  const parse = bodySchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: "Invalid payload", details: parse.error.flatten() });
  }
  const { message, signature } = parse.data;
  const valid = isValidSignature(message, signature);
  const signer = valid ? recoverSigner(message, signature) : null;
  if (valid && signer) {
    addValidSignature({ message, signature, signer });
  }
  return res.json({
    isValid: valid,
    signer,
    originalMessage: message,
  });
}
