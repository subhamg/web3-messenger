import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./index.css";
import App from "./App.tsx";
import { lazy, Suspense } from "react";
const DynamicProvider = lazy(() =>
  import("./dynamic/DynamicProvider").then((m) => ({
    default: m.DynamicProvider,
  }))
);
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-right" />
      <Suspense fallback={null}>
        <DynamicProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </DynamicProvider>
      </Suspense>
    </MantineProvider>
  </StrictMode>
);
