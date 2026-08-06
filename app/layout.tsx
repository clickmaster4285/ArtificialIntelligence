// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/landingPage/Navbar";
import { HugeFooter } from "@/components/landingPage/HugeFooter";

export const metadata: Metadata = {
  title: "ClickMasters - AI Development Company",
  description: "Custom AI development services from $30K. Chatbots, RAG systems, ML models & enterprise AI platforms.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Navbar - Fixed at top */}
        <Navbar />
        
        {/* Main content - Grows to fill space */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer - Always at bottom */}
        <HugeFooter />
      </body>
    </html>
  );
}