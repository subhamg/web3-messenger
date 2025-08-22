import { useState } from "react";
import axios from "axios";

export type VerifyResponse = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export function useVerifySignature() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function verify(payload: {
    message: string;
    signature: string;
  }): Promise<VerifyResponse> {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<VerifyResponse>(
        `${BACKEND_URL}/verify-signature`,
        payload,
        { timeout: 8000 }
      );
      return res.data;
    } catch (e) {
      setError("Verification request failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, verify };
}
