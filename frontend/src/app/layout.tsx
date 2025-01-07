"use client";

import "./globals.css";
import { ReactNode, use } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
