import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./client-layout";
import { RootLayoutClient } from "./root-layout-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DocuForge - AI-Powered Documentation for Legacy Systems",
  description:
    "Transform legacy code into living documentation. Generate beautiful docs from COBOL, Perl, and 25+ languages in minutes.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          <RootLayoutClient>{children}</RootLayoutClient>
        </ClientLayout>
      </body>
    </html>
  );
}
