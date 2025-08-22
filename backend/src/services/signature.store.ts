export type StoredSignature = {
  message: string;
  signature: string;
  signer: string;
  timestamp: number;
};

const inMemoryStore: StoredSignature[] = [];
const MAX_ENTRIES = 1000;

export function addValidSignature(entry: {
  message: string;
  signature: string;
  signer: string;
}): StoredSignature {
  const record: StoredSignature = {
    ...entry,
    timestamp: Date.now(),
  };
  inMemoryStore.unshift(record);
  if (inMemoryStore.length > MAX_ENTRIES) inMemoryStore.pop();
  return record;
}

export function getValidSignatures(): ReadonlyArray<StoredSignature> {
  return inMemoryStore;
}
