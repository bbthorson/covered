import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CrisisBanner } from "@/components/layout/crisis-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Covered — We've Got You",
    template: "%s | Covered",
  },
  description:
    "Free tools to check in with yourself, find care near you, and learn about managing your relationship with substances. No sign-up, no judgment.",
  openGraph: {
    title: "Covered — We've Got You",
    description:
      "Free tools to check in with yourself, find care near you, and learn about managing your relationship with substances.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary-600 focus:text-white"
        >
          Skip to main content
        </a>
        <CrisisBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
