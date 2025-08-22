import { useMemo, useState } from "react";
import {
  Button,
  Code,
  Divider,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useApp } from "../hooks/useApp";
import type { VerifyResponse } from "../utils/history";

export function MessageVerifyPanel() {
  const { verify } = useApp();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [result, setResult] = useState<VerifyResponse | null>(null);

  const canSubmit = useMemo(
    () => message.trim().length > 0 && signature.trim().length > 0,
    [message, signature]
  );

  async function handleVerify() {
    const res = await verify({ message, signature });
    setResult(res);
  }

  return (
    <Paper p="lg" withBorder>
      <Stack>
        <Text size="sm" c="dimmed">
          Paste your message and its signature to verify.
        </Text>
        <Textarea
          label="Message"
          placeholder="Hello world"
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Textarea
          label="Signature"
          placeholder="0x..."
          minRows={3}
          value={signature}
          onChange={(e) => setSignature(e.currentTarget.value)}
        />
        <Button onClick={handleVerify} disabled={!canSubmit}>
          Verify
        </Button>
        {result && (
          <Paper p="md" withBorder>
            <Stack gap="xs">
              <Text>
                <b>Valid:</b> {String(result.isValid)}
              </Text>
              <Text>
                <b>Signer:</b> {result.signer || "N/A"}
              </Text>
              <Divider my="xs" />
              <Text fw={500}>Original Message</Text>
              <Code block>{result.originalMessage}</Code>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}
