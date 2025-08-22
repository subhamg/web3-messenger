import { useState } from "react";
import {
  Button,
  Code,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useClipboard } from "@mantine/hooks";
import { useApp } from "../hooks/useApp";
import { useSigner } from "../hooks/useSigner";

// Result is handled by AppContext notifications/history; no local type needed here.

export function SignerPanel() {
  const { primaryWallet, user } = useDynamicContext();
  const { verify } = useApp();
  const [message, setMessage] = useState("");
  const { signature, loading, signMessage } = useSigner();
  const clipboard = useClipboard({ timeout: 1200 });

  const address = primaryWallet?.address || null;

  async function handleSign() {
    if (!primaryWallet) return; // require auth from AuthPanel
    await signMessage(message);
  }

  async function handleVerify() {
    await verify({ message, signature });
  }

  return (
    <Paper p="lg" withBorder>
      <Stack>
        <Group justify="space-between">
          <Title order={4}>Embedded Wallet</Title>
          {address ? (
            <Text size="sm">
              Connected: <Code>{address}</Code>
            </Text>
          ) : (
            <Text size="sm" c="dimmed">
              Not signed in — use the Auth panel to sign in
            </Text>
          )}
        </Group>
        {user && (
          <Text size="sm" c="dimmed">
            User: {user.email || user.userId}
          </Text>
        )}
        <Textarea
          label="Message"
          placeholder="Hello world"
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Group>
          <Button onClick={handleSign} disabled={!message} loading={loading}>
            Sign
          </Button>
          <Button
            variant="light"
            onClick={handleVerify}
            disabled={!message || !signature}
          >
            Verify
          </Button>
          <Button
            variant="subtle"
            onClick={() => clipboard.copy(signature)}
            disabled={!signature}
          >
            {clipboard.copied ? "Copied" : "Copy Sig"}
          </Button>
        </Group>
        {signature && (
          <Stack gap="xs">
            <Text fw={500}>Signature</Text>
            <Code block>{signature}</Code>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
