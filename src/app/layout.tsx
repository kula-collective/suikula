"use client";

// import type { Metadata } from "next";
import { AppstateStoreProvider } from "@/providers/appstate-store-provider";
import { createNetworkConfig, SuiClientProvider } from "@mysten/dapp-kit";
import { EnokiFlowProvider } from "@mysten/enoki/react";
import { getFullnodeUrl } from "@mysten/sui/client";
import { Inter, Lexend } from "next/font/google";
import { ApplicationLayout } from "./application-layout";
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

export default async function RootLayout({
  auth,
  kulas,
  offers,
  children,
  modals,
}: Readonly<{
  auth: React.ReactNode;
  kulas: React.ReactNode;
  offers: React.ReactNode;
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  // Config options for the networks you want to connect to
  const { networkConfig } = createNetworkConfig({
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  return (
    <html
      lang="en"
      className="h-full text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <AppstateStoreProvider>
          <EnokiFlowProvider apiKey={process.env.NEXT_PUBLIC_ENOKI_API_KEY!}>
            <SuiClientProvider
              networks={networkConfig}
              defaultNetwork="testnet"
            >
              {/* Must pass Server Components to Client Components as Props */}
              <ApplicationLayout kulas={kulas} offers={offers}>
                {auth}
                {modals}
                {children}
              </ApplicationLayout>
            </SuiClientProvider>
          </EnokiFlowProvider>
        </AppstateStoreProvider>
      </body>
    </html>
  );
}
