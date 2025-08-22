import { Button, Code, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useApp } from "../hooks/useApp";

export function HistoryList() {
  const { history, clearHistory } = useApp();
  return (
    <Paper p="lg" withBorder>
      <Stack>
        <Group justify="space-between">
          <Title order={4}>History</Title>
          <Button variant="subtle" onClick={() => clearHistory()}>
            Clear
          </Button>
        </Group>
        {history.length === 0 ? (
          <Text c="dimmed">No entries yet.</Text>
        ) : (
          <Stack>
            {history.map((h) => (
              <Paper key={h.timestamp} p="sm" withBorder>
                <Text size="sm">
                  <b>Time:</b> {new Date(h.timestamp).toLocaleString()}
                </Text>
                <Text size="sm">
                  <b>Valid:</b> {String(h.isValid)}
                </Text>
                <Text size="sm" style={{ wordBreak: "break-all" }}>
                  <b>Signer:</b> {h.signer || "N/A"}
                </Text>
                <Code block mt="xs">
                  {h.originalMessage}
                </Code>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
