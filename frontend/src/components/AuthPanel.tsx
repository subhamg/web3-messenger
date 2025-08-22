import { useState } from "react";
import { Button, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

export function AuthPanel() {
  const { user, step, setStep, loading, sendEmailOtp, verifyEmailOtp } =
    useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  async function handleSendOtp() {
    await sendEmailOtp(email);
  }

  async function handleVerifyOtp() {
    await verifyEmailOtp(otp);
  }

  return (
    <Paper p="lg" withBorder>
      <Stack>
        {!user ? (
          step === "email" ? (
            <Stack>
              <Text size="sm" c="dimmed">
                Sign in with email
              </Text>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Group>
                <Button
                  onClick={handleSendOtp}
                  disabled={!email}
                  loading={loading}
                >
                  Send OTP
                </Button>
              </Group>
            </Stack>
          ) : (
            <Stack>
              <Text size="sm" c="dimmed">
                Enter the OTP sent to {email}
              </Text>
              <TextInput
                label="OTP"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.currentTarget.value)}
              />
              <Group>
                <Button variant="light" onClick={() => setStep("email")}>
                  Back
                </Button>
                <Button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  loading={loading}
                >
                  Verify
                </Button>
              </Group>
            </Stack>
          )
        ) : (
          <Text size="sm">Signed in as {user.email || user.userId}</Text>
        )}
      </Stack>
    </Paper>
  );
}
