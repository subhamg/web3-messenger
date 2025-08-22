import { getAddress, verifyMessage } from "ethers";

export function recoverSigner(message: string, signature: string): string {
  const recovered = verifyMessage(message, signature);
  return getAddress(recovered);
}

export function isValidSignature(message: string, signature: string): boolean {
  try {
    recoverSigner(message, signature);
    return true;
  } catch {
    return false;
  }
}
