import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import FloatingSocialHandle from "./components/FloatingSocialHandle";
import AIBotFloatingWidget from "./components/AIBotFloatingWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayush Das (software developer)",
  description: "Ayush Das Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-dark:selection:bg-gray-800`}
      >
        <Provider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6">
            {children}
          </main>
        </Provider>
        <AIBotFloatingWidget />
      </body>
    </html>
  );
}
