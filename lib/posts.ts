export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  difficulty: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "hot-neutral-ground",
    category: "ELECTRICAL",
    title: "Hot wire, neutral wire, ground wire",
    excerpt: "Ribbed = neutral. Smooth = hot. Green or bare copper = ground. This is the single most useful thing you can know before touching a wire.",
    readTime: "5 MIN READ",
    difficulty: "BEGINNER",
    tags: ["ELECTRICAL SAFETY"],
  },
  {
    slug: "right-to-remain-silent",
    category: "LEGAL",
    title: "You don't have to answer that",
    excerpt: "What you're actually required to say to police, what you're not, and why staying silent is almost always the right move.",
    readTime: "4 MIN READ",
    difficulty: "BEGINNER",
    tags: ["KNOW YOUR RIGHTS"],
  },
  {
    slug: "er-vs-urgent-care",
    category: "HEALTH",
    title: "ER vs urgent care vs your doctor",
    excerpt: "The difference costs hundreds or thousands of dollars depending on which door you walk through.",
    readTime: "6 MIN READ",
    difficulty: "INTERMEDIATE",
    tags: ["HEALTHCARE"],
  },
  {
    slug: "landlord-rights",
    category: "HOME",
    title: "Your landlord cannot do that",
    excerpt: "Entry without notice, withholding deposits, retaliation for complaints — what's actually illegal in most states.",
    readTime: "5 MIN READ",
    difficulty: "BEGINNER",
    tags: ["TENANT RIGHTS"],
  },
  {
    slug: "how-interest-works",
    category: "FINANCE",
    title: "How interest actually works against you",
    excerpt: "APR vs APY, minimum payments as debt traps, and why paying $25 extra a month matters more than you think.",
    readTime: "7 MIN READ",
    difficulty: "INTERMEDIATE",
    tags: ["PERSONAL FINANCE"],
  },
  {
    slug: "breaker-box-basics",
    category: "ELECTRICAL",
    title: "Breaker box basics",
    excerpt: "Your breaker box controls every circuit in your house. Knowing how it works means you can troubleshoot problems yourself.",
    readTime: "4 MIN READ",
    difficulty: "BEGINNER",
    tags: ["ELECTRICAL"],
  },
];

export const categories = ["ALL", "ELECTRICAL", "LEGAL", "HEALTH", "HOME", "FINANCE"];
