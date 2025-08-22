import { useState } from "react";
import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useMfaSms } from "../hooks/useMfaSms";

// Headless MFA (bonus): simple SMS OTP second factor
export function MfaPanel() {
  const { user } = useDynamicContext();
  const { sent, loading, sendSms, verifySms, setSent } = useMfaSms();

  const [iso2, setIso2] = useState("US");
  const [dialCode, setDialCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  if (!user) {
    return null;
  }

  async function handleSendSms() {
    await sendSms({ iso2, dialCode, phone });
  }

  async function handleVerifyOtp() {
    await verifySms(otp);
  }

  return (
    <Paper p="lg" withBorder>
      <Stack>
        <Title order={5}>MFA (SMS OTP)</Title>
        {!sent ? (
          <Stack>
            <Group wrap="nowrap">
              <TextInput
                w={80}
                label="ISO"
                value={iso2}
                onChange={(e) => setIso2(e.currentTarget.value)}
              />
              <TextInput
                w={90}
                label="Code"
                value={dialCode}
                onChange={(e) => setDialCode(e.currentTarget.value)}
              />
              <TextInput
                flex={1}
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
              />
            </Group>
            <Group>
              <Button
                onClick={handleSendSms}
                disabled={!phone}
                loading={loading}
              >
                Send SMS
              </Button>
            </Group>
          </Stack>
        ) : (
          <Stack>
            <Text size="sm" c="dimmed">
              Enter the OTP sent to your phone
            </Text>
            <TextInput
              label="OTP"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.currentTarget.value)}
            />
            <Group>
              <Button variant="light" onClick={() => setSent(false)}>
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
        )}
      </Stack>
    </Paper>
  );
}
