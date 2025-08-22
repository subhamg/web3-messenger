import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { notifications } from "@mantine/notifications";
import {
  addToHistory,
  type HistoryItem,
  type VerifyResponse,
} from "../utils/history";
import { AppContext, type AppContextValue } from "./context";
import { useVerifySignature } from "../hooks/useVerifySignature";

export function AppProvider({ children }: PropsWithChildren) {
  const { verify: rawVerify } = useVerifySignature();

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem("history");
      return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
    } catch {
      return [];
    }
  });

  const persist = useCallback((next: HistoryItem[]) => {
    setHistory(next);
    localStorage.setItem("history", JSON.stringify(next));
  }, []);

  const verify = useCallback(
    async ({ message, signature }: { message: string; signature: string }) => {
      try {
        const data: VerifyResponse = await rawVerify({ message, signature });
        persist(addToHistory(history, data));
        notifications.show({
          color: data.isValid ? "green" : "yellow",
          title: data.isValid ? "Signature valid" : "Signature invalid",
          message: data.isValid
            ? "Recovered signer address is shown in the result."
            : "Check the message/signature and try again.",
        });
        return data;
      } catch (e) {
        notifications.show({
          color: "red",
          title: "Verification failed",
          message: "Network or server error",
        });
        throw e;
      }
    },
    [history, persist, rawVerify]
  );

  const clearHistory = useCallback(() => persist([]), [persist]);

  const value = useMemo<AppContextValue>(
    () => ({ history, verify, clearHistory }),
    [history, verify, clearHistory]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
