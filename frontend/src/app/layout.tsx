import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SyncAI | Intelligent Meeting Scheduler",
  description: "An AI-powered agent to manage your calendar and meetings seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
