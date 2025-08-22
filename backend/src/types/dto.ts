export type VerifyRequestDto = {
  message: string;
  signature: string;
};

export type VerifyResponseDto = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};
