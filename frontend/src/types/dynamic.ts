export type LogoutCapable = {
  handleLogOut?: () => Promise<void> | void;
};

export function hasLogout(value: unknown): value is LogoutCapable {
  return (
    !!value &&
    typeof value === "object" &&
    "handleLogOut" in value &&
    typeof (value as Record<string, unknown>).handleLogOut === "function"
  );
}

export type SmsOtpCapable = {
  connectWithSms?: (args: {
    iso2: string;
    dialCode: string;
    phone: string;
  }) => Promise<void> | void;
  verifyOneTimePassword?: (code: string) => Promise<void> | void;
};

export function hasSmsOtp(value: unknown): value is SmsOtpCapable {
  return (
    !!value &&
    typeof value === "object" &&
    (("connectWithSms" in value &&
      typeof (value as Record<string, unknown>).connectWithSms ===
        "function") ||
      ("verifyOneTimePassword" in value &&
        typeof (value as Record<string, unknown>).verifyOneTimePassword ===
          "function"))
  );
}
