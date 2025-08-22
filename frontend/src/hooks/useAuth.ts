import { useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  useConnectWithOtp,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

export function useAuth() {
  const { user, primaryWallet, setShowAuthFlow, handleLogOut } =
    useDynamicContext();
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);

  const address: string | null = primaryWallet?.address || null;

  async function sendEmailOtp(email: string) {
    setLoading(true);
    try {
      await connectWithEmail(email);
      setStep("otp");
      notifications.show({
        color: "green",
        title: "OTP sent",
        message: "Check your inbox.",
      });
    } catch (e) {
      notifications.show({
        color: "red",
        title: "Failed to send OTP",
        message: "Please try again.",
      });
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function verifyEmailOtp(otp: string) {
    setLoading(true);
    try {
      await verifyOneTimePassword(otp);
      notifications.show({
        color: "green",
        title: "Signed in",
        message: "Email verified.",
      });
    } catch (e) {
      notifications.show({
        color: "red",
        title: "Invalid OTP",
        message: "Please try again.",
      });
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function connect() {
    setShowAuthFlow?.(true);
  }

  async function logout() {
    try {
      await handleLogOut?.();
      notifications.show({
        color: "green",
        title: "Logged out",
        message: "You have been signed out.",
      });
    } catch {
      notifications.show({
        color: "red",
        title: "Logout failed",
        message: "Please try again.",
      });
    }
  }

  return {
    user,
    address,
    step,
    setStep,
    loading,
    sendEmailOtp,
    verifyEmailOtp,
    connect,
    logout,
  };
}
