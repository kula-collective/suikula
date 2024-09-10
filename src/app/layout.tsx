"use client";

import { EnokiFlowProvider } from "@mysten/enoki/react";
// import type { Metadata } from "next";
import { AppstateStoreProvider } from "@/providers/appstate-store-provider";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

// FIXME Put this in a layout but not in the same place as EnokiFlowProvider
// export const metadata: Metadata = {
//   title: "Let's Kula on Sui",
//   description: "The gift economy platform on Sui",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EnokiFlowProvider apiKey={process.env.NEXT_PUBLIC_ENOKI_API_KEY!}>
      {/* h-full needed for SignIn */}
      <html lang="en" className="h-full bg-gray-50">
        <body className="h-full">
          <AppstateStoreProvider>{children}</AppstateStoreProvider>
        </body>
      </html>
    </EnokiFlowProvider>
  );
}
