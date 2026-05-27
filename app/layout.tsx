import type { Metadata } from "next";
import "./globals.css";

import {
  AuthProvider,
} from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "StudySphere AI",
  description:
    "AI-powered academic operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}