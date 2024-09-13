import { getKulas } from "@/actions";
import { AppstateStoreProvider } from "@/providers/appstate-store-provider";
import { SuiProvider } from "@/providers/sui-provider";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Kula Collective on Sui",
  description: "The gift economy platform on Sui",
};

export default async function RootLayout({
  auth,
  offers,
  children,
  modals,
}: Readonly<{
  auth: React.ReactNode;
  offers: React.ReactNode;
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  const kulas = await getKulas();
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
          {/* All the providers are in SuiProvider so that root layout can be rendered on server */}
          <SuiProvider>
            {/* Must pass Server Components to Client Components as Props */}
            <ApplicationLayout kulas={kulas}>
              {auth}
              {modals}
              {children}
            </ApplicationLayout>
          </SuiProvider>
        </AppstateStoreProvider>
      </body>
    </html>
  );
}
