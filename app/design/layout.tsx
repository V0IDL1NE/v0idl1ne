import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
