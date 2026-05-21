import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRATI AI | AI-Native Digital Twin Platform",
  description:
    "PRATI AI is a modular, AI-native digital twin SaaS platform for manufacturing units, underground labs, analog habitats, drone operations, industrial infrastructure, and smart facilities.",
  keywords: [
    "AI-native digital twin platform",
    "digital twin SaaS",
    "industrial digital twin",
    "MQTT telemetry platform",
    "plugin-first architecture",
    "real-time telemetry dashboards",
    "anomaly detection platform",
    "industrial AI platform",
    "smart facility digital twin",
  ],
  openGraph: {
    title: "PRATI AI | AI-Native Digital Twin Platform",
    description:
      "A modular, AI-native digital twin SaaS platform configurable through schemas, templates, plugins, and APIs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRATI AI | AI-Native Digital Twin Platform",
    description:
      "A modular, AI-native digital twin SaaS platform for complex physical environments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
