import { createContext } from "react";
import type { HistoryItem, VerifyResponse } from "../utils/history";

export type AppContextValue = {
  history: HistoryItem[];
  verify: (payload: {
    message: string;
    signature: string;
  }) => Promise<VerifyResponse>;
  clearHistory: () => void;
};

export const AppContext = createContext<AppContextValue | null>(null);
