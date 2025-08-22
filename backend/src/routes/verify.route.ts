import { Router } from "express";
import { postVerifySignature } from "../controllers/verify.controller";

export const verifyRouter = Router();

verifyRouter.post("/verify-signature", postVerifySignature);
