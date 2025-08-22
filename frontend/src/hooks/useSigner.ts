import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function useSigner() {
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState("");

  async function signMessage(message: string) {
    if (!primaryWallet) {
      setShowAuthFlow(true);
      return;
    }
    setLoading(true);
    try {
      const sig = await primaryWallet.signMessage(message);
      if (typeof sig === "string") setSignature(sig);
    } finally {
      setLoading(false);
    }
  }

  return { signature, loading, signMessage };
}
