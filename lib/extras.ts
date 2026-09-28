/* Registry of tools, situation guides, and printables — plus which posts link to each. */

export type Extra = {
  kind: "TOOL" | "GUIDE" | "PRINTABLE";
  slug: string;
  href: string;
  title: string;
  seoTitle: string;
  description: string;
  relatedPosts: string[];
};

export const tools: Extra[] = [
  {
    kind: "TOOL",
    slug: "circuit-load-calculator",
    href: "/tools/circuit-load-calculator",
    title: "Can this circuit handle it?",
    seoTitle: "Circuit Load Calculator: Will This Trip My Breaker?",
    description: "Add what's plugged in on one circuit and see if you're over the safe limit — before the breaker trips or the wire heats up.",
    relatedPosts: ["amperage-vs-wattage", "breaker-box-basics", "space-heater-safety", "extension-cord-gauge"],
  },
  {
    kind: "TOOL",
    slug: "debt-payoff-calculator",
    href: "/tools/debt-payoff-calculator",
    title: "What the minimum payment really costs",
    seoTitle: "Credit Card Payoff Calculator: Minimum Payment vs Paying Extra",
    description: "Plug in your balance and APR. See how long minimum payments take, what they cost, and what a little extra each month saves.",
    relatedPosts: ["how-interest-works", "credit-score-factors", "emergency-fund-basics"],
  },
  {
    kind: "TOOL",
    slug: "where-to-get-care",
    href: "/tools/where-to-get-care",
    title: "ER, urgent care, telehealth, or your doctor?",
    seoTitle: "ER vs Urgent Care vs Telehealth: Where Should I Go?",
    description: "Answer a few questions and get pointed at the right door — the one that treats the problem without the surprise bill.",
    relatedPosts: ["er-vs-urgent-care", "telehealth-vs-urgent-care", "insurance-terms-decoded", "medical-bill-negotiation"],
  },
  {
    kind: "TOOL",
    slug: "can-my-landlord-do-that",
    href: "/tools/can-my-landlord-do-that",
    title: "Can my landlord do that?",
    seoTitle: "Can My Landlord Do That? Tenant Rights Checker",
    description: "Pick what your landlord did. Get the general rule in most states, what to do next, and how to document it.",
    relatedPosts: ["landlord-rights", "mold-habitability", "lease-clauses", "small-claims-court"],
  },
  {
    kind: "TOOL",
    slug: "deadline-checker",
    href: "/tools/deadline-checker",
    title: "Is it too late?",
    seoTitle: "Consumer Rights Deadline Calculator: Disputes, Fraud, and More",
    description: "Card disputes, fraud reporting, door-to-door sale cancellations — enter the date and see exactly when your window closes.",
    relatedPosts: ["credit-card-chargebacks", "return-policy-tricks", "statute-of-limitations-basics", "credit-freeze-vs-lock"],
  },
];

export const guides: Extra[] = [
  {
    kind: "GUIDE",
    slug: "pulled-over",
    href: "/guides/pulled-over",
    title: "You just got pulled over",
    seoTitle: "What to Do When You Get Pulled Over: Your Rights, Step by Step",
    description: "What to hand over, what you don't have to answer, what to say if they ask to search, and what to do after.",
    relatedPosts: ["right-to-remain-silent", "probable-cause", "miranda-rights-when", "recording-police"],
  },
  {
    kind: "GUIDE",
    slug: "first-apartment",
    href: "/guides/first-apartment",
    title: "Moving into your first apartment",
    seoTitle: "First Apartment Checklist: Lease, Move-In, and Tenant Rights",
    description: "Before you sign, the day you get the keys, and the first week — the stuff that decides whether you get your deposit back.",
    relatedPosts: ["lease-clauses", "renters-insurance", "landlord-rights", "water-shutoff-locations", "smoke-co-detector-placement", "breaker-box-basics"],
  },
  {
    kind: "GUIDE",
    slug: "huge-medical-bill",
    href: "/guides/huge-medical-bill",
    title: "You got a huge medical bill",
    seoTitle: "Got a Huge Medical Bill? What to Do, Step by Step",
    description: "Don't pay it yet. The order of operations that routinely cuts hospital bills — sometimes to zero.",
    relatedPosts: ["medical-bill-negotiation", "insurance-terms-decoded", "er-vs-urgent-care", "statute-of-limitations-basics"],
  },
  {
    kind: "GUIDE",
    slug: "buying-a-used-car",
    href: "/guides/buying-a-used-car",
    title: "Buying a used car",
    seoTitle: "Used Car Buying Checklist: Inspection, History, and Scams to Avoid",
    description: "The checks that take an hour and save thousands — history report, inspection, the sticker most people ignore, and the add-ons to refuse.",
    relatedPosts: ["check-engine-light-codes", "tire-tread-penny-test", "lemon-law-basics", "extended-warranties-scam"],
  },
];

export const printables: Extra[] = [
  {
    kind: "PRINTABLE",
    slug: "home-emergency-sheet",
    href: "/printables/home-emergency-sheet",
    title: "Home emergency sheet",
    seoTitle: "Printable Home Emergency Sheet: Shutoffs, Breakers, Contacts",
    description: "One page on the fridge: where every shutoff is, what each breaker controls, and who to call. Fill it in once.",
    relatedPosts: ["water-shutoff-locations", "breaker-box-basics", "smoke-co-detector-placement", "home-inventory-for-insurance"],
  },
  {
    kind: "PRINTABLE",
    slug: "move-in-inspection",
    href: "/printables/move-in-inspection",
    title: "Move-in inspection checklist",
    seoTitle: "Printable Move-In Inspection Checklist for Renters",
    description: "Room-by-room condition checklist. Fill it in on day one, photograph everything, and your deposit is defensible.",
    relatedPosts: ["landlord-rights", "lease-clauses", "mold-habitability", "renters-insurance"],
  },
  {
    kind: "PRINTABLE",
    slug: "know-your-rights-card",
    href: "/printables/know-your-rights-card",
    title: "Know-your-rights wallet card",
    seoTitle: "Printable Know Your Rights Card for Police Stops",
    description: "Wallet-sized. What to hand over, what to say, and the exact words that invoke your rights.",
    relatedPosts: ["right-to-remain-silent", "miranda-rights-when", "probable-cause", "recording-police"],
  },
];

export const allExtras: Extra[] = [...tools, ...guides, ...printables];

export function extrasForPost(slug: string): Extra[] {
  return allExtras.filter(e => e.relatedPosts.includes(slug));
}
