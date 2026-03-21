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
    default: "Covered — Find Substance Use Care",
    template: "%s | Covered",
  },
  description:
    "Free, open-source tools to evaluate your risk, find treatment providers, and learn about substance use care. Powered by SAMHSA data.",
  openGraph: {
    title: "Covered — Find Substance Use Care",
    description:
      "Free, open-source tools to evaluate your risk, find treatment providers, and learn about substance use care.",
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
