import { Container, Stack } from "@mantine/core";
import { SignerPanel } from "./components/SignerPanel";
import { HeaderBar } from "./components/HeaderBar";
import { MessageVerifyPanel } from "./components/ManualVerifyPanel";
import { HistoryList } from "./components/HistoryList";
import { AuthPanel } from "./components/AuthPanel";
import { MfaPanel } from "./components/MfaPanel";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <Container size="md" p="lg">
      <Stack gap="lg">
        <HeaderBar />
        <AuthPanel />
        <MfaPanel />
        <SignerPanel />
        <MessageVerifyPanel />
        <HistoryList />
      </Stack>
    </Container>
  );
}

export default App;
