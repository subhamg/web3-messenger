import type { PropsWithChildren } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export function DynamicProvider({ children }: PropsWithChildren) {
  const environmentId =
    (import.meta.env.VITE_DYNAMIC_ENV_ID as string | undefined) || "";

  return (
    <DynamicContextProvider
      settings={{ environmentId, walletConnectors: [EthereumWalletConnectors] }}
    >
      {children}
    </DynamicContextProvider>
  );
}
