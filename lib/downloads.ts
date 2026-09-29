/*
 * Free V0IDL1NE desktop tools, built from reviewed source and hosted as GitHub Release assets.
 * sha256 values must match the uploaded files exactly.
 */

export const RELEASE_TAG = "pc-tools-2026.09";
const RELEASE_BASE = `https://github.com/V0IDL1NE/v0idl1ne/releases/download/${RELEASE_TAG}`;

export type Download = {
  slug: string;
  name: string;
  summary: string;
  does: string[];
  doesNot: string[];
  file: string;
  sizeMb: number;
  sha256: string;
  relatedPosts: { href: string; label: string }[];
};

export const downloads: Download[] = [
  {
    slug: "specs-reporter",
    name: "Specs Reporter",
    summary: "Your PC's full hardware report — CPU, RAM, GPU, motherboard, BIOS, storage — in one window, savable as a text or HTML file. What you need before asking for tech help or selling a PC.",
    does: ["Reads your hardware info", "Saves a report only where you choose"],
    doesNot: ["Change anything on your system", "Need admin rights", "Send anything anywhere"],
    file: "V0IDL1NE-SpecsReporter.exe",
    sizeMb: 43.3,
    sha256: "499741effa4fa4f9ebef118a0e49a91a34a12ad44df638229dafae93c6cca572",
    relatedPosts: [],
  },
  {
    slug: "disk-usage",
    name: "Disk Usage",
    summary: "Find out what's actually filling your drive. Scan any folder, drill down largest-first, and see the 100 biggest files anywhere in the scan.",
    does: ["Scans folders you pick", "Opens a file's location in Explorer when you ask"],
    doesNot: ["Delete or modify anything — this version is read-only", "Need admin rights", "Send anything anywhere"],
    file: "V0IDL1NE-DiskUsage-Free.exe",
    sizeMb: 43.3,
    sha256: "cb16708a7768961a77b57cd7268e541d0c25fa46e1a2ac8f8b82ab9b80204711",
    relatedPosts: [],
  },
  {
    slug: "network-info",
    name: "Network Info",
    summary: "Everything about your connection in one place: IP addresses, DNS servers, Wi-Fi signal, ping, a download speed test, devices your PC has talked to on your network, and which programs have ports open.",
    does: [
      "Reads your network settings",
      "Looks up your public IP address (via ipify.org) when it opens",
      "Pings Google and Cloudflare, or runs a download speed test from Cloudflare — only when you click those buttons",
    ],
    doesNot: ["Change any network settings", "Need admin rights", "Scan other people's devices"],
    file: "V0IDL1NE-NetworkInfo.exe",
    sizeMb: 43.8,
    sha256: "81cfe0ae2b2549ce86bd02bc5f2195632fbce9ef64b11e2a4ea95d60d58eebfa",
    relatedPosts: [{ href: "/blog/public-wifi-vpn-myths", label: "PUBLIC WI-FI & VPNS" }],
  },
  {
    slug: "startup-manager",
    name: "Startup Manager",
    summary: "See everything that launches when you log in — registry entries, the Startup folder, scheduled tasks, and services — and turn off the safe ones.",
    does: [
      "Lists every startup item",
      "Turns Startup-folder items on and off by moving them into a \"Disabled\" subfolder and back",
    ],
    doesNot: ["Delete anything", "Touch the registry, services, or scheduled tasks (those are view-only here)", "Need admin rights"],
    file: "V0IDL1NE-StartupManager-Free.exe",
    sizeMb: 43.4,
    sha256: "60a0a3b06f8881b1587bdf238731c11e33465632243cb0978613f02913cd2635",
    relatedPosts: [{ href: "/blog/password-manager-2fa", label: "SECURE YOUR ACCOUNTS" }],
  },
];

export function downloadUrl(d: Download): string {
  return `${RELEASE_BASE}/${d.file}`;
}
