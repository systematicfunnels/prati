import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const heebo = localFont({
  src: "./fonts/HeeboLatin.woff2",
  weight: "400 800",
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prati.ai"),
  title: "Prati AI | Predictive Operations for Every Plant",
  description:
    "Connect your existing factory floor to one simple dashboard. Spot machine failures before they happen, cut wasted energy, and make better decisions with Prati AI.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/icon.png", sizes: "64x64", type: "image/png" }],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "predictive maintenance",
    "industrial operations",
    "factory monitoring",
    "machine health monitoring",
    "reduce unplanned downtime",
    "industrial AI",
    "energy monitoring",
    "MQTT",
    "Modbus",
  ],
  openGraph: {
    title: "Prati AI | Predictive Operations for Every Plant",
    description:
      "Connect your existing factory floor to one simple dashboard. Spot machine failures early and cut wasted energy.",
    type: "website",
    url: "https://www.prati.ai/",
    siteName: "PRATI AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prati AI | Predictive Operations for Every Plant",
    description:
      "Spot machine failures before they happen, cut wasted energy, and make better decisions with Prati AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heebo.className} ${heebo.variable}`}>{children}</body>
    </html>
  );
}
