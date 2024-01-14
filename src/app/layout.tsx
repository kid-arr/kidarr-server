import "@/styles/globals.css";

import { ABeeZee as TheFont } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { type Metadata } from "next";
import NextAuthProvider from "@/lib/services/auth/provider";

const inter = TheFont({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kidarr",
  description: "Radar for your kids",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
