export type Section = {
  name: string;
  slug: string;
  blurb: string;
};

export const sections: Section[] = [
  { name: "Recipes", slug: "recipes", blurb: "The full recipe book, by category." },
  { name: "Menu", slug: "menu", blurb: "What could be made, at a glance." },
  { name: "Meal Planning", slug: "meal-planning", blurb: "Pick candidates, then lock in the week." },
  { name: "Grocery List", slug: "grocery", blurb: "What to pick up." },
  { name: "Chores", slug: "chores", blurb: "What needs doing." },
  { name: "Gift Ideas", slug: "gifts", blurb: "Running lists, one per person." },
];
