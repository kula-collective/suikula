"use client";

import { EnokiFlowProvider } from "@mysten/enoki/react";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <html lang="en">
        <body>{children}</body>
      </html>
    </EnokiFlowProvider>
  );
}
