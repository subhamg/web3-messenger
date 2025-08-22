export type VerifyResponse = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};

export type HistoryItem = VerifyResponse & { timestamp: number };

export function addToHistory(
  history: HistoryItem[],
  item: VerifyResponse,
  max = 20
): HistoryItem[] {
  const entry: HistoryItem = { ...item, timestamp: Date.now() };
  return [entry, ...history].slice(0, max);
}
