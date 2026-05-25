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
  title: "AI-Native Multi-Tenant Digital Twin Platform | PRATI AI",
  description:
    "PRATI AI is an AI-native, multi-tenant digital twin and operational intelligence platform for manufacturing, drone operations, habitats, infrastructure, energy, logistics, healthcare, mining, and aerospace environments.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/icon.png", sizes: "64x64", type: "image/png" }],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "AI-native digital twin platform",
    "industrial digital twin platform",
    "multi-tenant digital twin platform",
    "operational intelligence platform",
    "private pilot digital twin platform",
    "digital twin SaaS",
    "industrial digital twin",
    "digital twin platform for manufacturing",
    "digital twin platform for facilities",
    "digital twin platform for industrial infrastructure",
    "MQTT telemetry platform",
    "plugin-first architecture",
    "real-time telemetry dashboards",
    "anomaly detection platform",
    "industrial AI platform",
    "smart facility digital twin",
  ],
  openGraph: {
    title: "AI-Native Multi-Tenant Digital Twin Platform | PRATI AI",
    description:
      "An AI-native, multi-tenant digital twin platform configurable through schemas, templates, plugins, industry packs, and APIs.",
    type: "website",
    url: "https://www.prati.ai/",
    siteName: "PRATI AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Native Multi-Tenant Digital Twin Platform | PRATI AI",
    description:
      "An AI-native, multi-tenant digital twin platform for complex physical environments.",
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
