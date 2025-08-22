import {
  Code,
  Group,
  Title,
  Button,
  Paper,
  Badge,
  Tooltip,
  CopyButton,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export function HeaderBar() {
  const { address, logout } = useAuth();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <Paper p="sm" withBorder>
      <Group justify="space-between" align="center">
        <Title order={4}>Web3 Messenger</Title>
        <Group gap="xs">
          <ActionIcon
            variant="default"
            onClick={() =>
              setColorScheme(colorScheme === "dark" ? "light" : "dark")
            }
            title="Toggle color scheme"
          >
            {colorScheme === "dark" ? "🌙" : "☀️"}
          </ActionIcon>
          {address ? (
            <Group gap="xs">
              <Badge color="green" variant="light">
                Connected
              </Badge>
              <Code>{address}</Code>
              <Tooltip label="Copy address">
                <CopyButton value={address}>
                  {({ copied, copy }) => (
                    <ActionIcon size="xs" variant="light" onClick={copy}>
                      {copied ? <IconCheck /> : <IconCopy />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Tooltip>
              <Button size="xs" variant="subtle" onClick={logout}>
                Logout
              </Button>
            </Group>
          ) : (
            <Badge color="gray" variant="light">
              Signed out
            </Badge>
          )}
        </Group>
      </Group>
    </Paper>
  );
}
