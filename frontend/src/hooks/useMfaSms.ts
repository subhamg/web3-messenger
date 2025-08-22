import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useConnectWithOtp } from "@dynamic-labs/sdk-react-core";
import type { SmsOtpCapable } from "../types/dynamic";

export function useMfaSms() {
  const otp = useConnectWithOtp() as unknown as SmsOtpCapable;
  const connectWithSms = otp?.connectWithSms;
  const verifyOneTimePassword = otp?.verifyOneTimePassword;

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function sendSms(args: {
    iso2: string;
    dialCode: string;
    phone: string;
  }) {
    if (!connectWithSms) {
      notifications.show({
        color: "yellow",
        title: "SMS not available",
        message: "Enable SMS in Dynamic or use TOTP.",
      });
      return;
    }
    setLoading(true);
    try {
      await connectWithSms(args);
      setSent(true);
      notifications.show({
        color: "green",
        title: "SMS sent",
        message: "OTP sent to your phone.",
      });
    } catch (e) {
      notifications.show({
        color: "red",
        title: "Failed to send SMS",
        message: "Please try again.",
      });
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function verifySms(code: string) {
    if (!verifyOneTimePassword) return;
    setLoading(true);
    try {
      await verifyOneTimePassword(code);
      notifications.show({
        color: "green",
        title: "MFA passed",
        message: "Phone verified.",
      });
    } catch (e) {
      notifications.show({
        color: "red",
        title: "Invalid code",
        message: "Please try again.",
      });
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { sent, loading, sendSms, verifySms, setSent };
}
