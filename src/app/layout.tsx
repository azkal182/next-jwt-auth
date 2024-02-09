import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { NextAuthProvider } from "./next-auth-provider";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  })


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
             <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

<NextAuthProvider>{children}</NextAuthProvider>
          </ThemeProvider>
            </body>
    </html>
  );
}
