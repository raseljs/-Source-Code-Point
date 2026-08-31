import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Source Code Point — Ready Source Code & Live Demo",
  description:
    "Laravel source code, landing pages, e-commerce websites, management software and Android app live demos. Pay with bKash or Rocket and complete your order online.",
  keywords: [
    "Laravel source code Bangladesh",
    "ready source code",
    "landing page",
    "e-commerce website",
    "management software",
    "Source Code Point",
  ],
  icons: {
    icon: "/source-code-point-icon.png",
    shortcut: "/source-code-point-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
