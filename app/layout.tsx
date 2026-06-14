import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V0IDL1NE — Public Record",
  description: "Practical knowledge that should be common. No credentials, no paywall, no bullshit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
