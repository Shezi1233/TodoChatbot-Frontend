import type { Metadata } from "next";
import "./globals.css";
import { AuthProviderWrapper } from "@/components/AuthProvider";
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Phase II Todo App",
  description: "Full-stack todo application with JWT authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
        <ChatWidget />
      </body>
    </html>
  );
}
