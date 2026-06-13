import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: { default: "CloseKit — Professional Proposals & Invoices", template: "%s | CloseKit" },
  description: "Win clients and get paid faster. Create professional proposals and invoices in minutes with CloseKit.",
  keywords: ["proposal generator", "invoice template", "freelance invoice", "invoice PDF", "freelance contract template"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://closekit.app",
    siteName: "CloseKit",
    title: "CloseKit — Professional Proposals & Invoices for Freelancers",
    description: "Win clients and get paid faster. Generate polished proposals and invoices in minutes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@closekit" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
