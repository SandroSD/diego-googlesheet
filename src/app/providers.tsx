"use client";

import { NextUIProvider } from "@nextui-org/react";
import AppProvider from "./context/appContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </AppProvider>
  );
}
