export type Recipe = {
  name: string;
  blurb: string;
  time: string;
  ingredients: string[];
  steps: string[];
};

export type Category = {
  name: string;
  slug: string;
  recipes: Recipe[];
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawMenu: Omit<Category, "slug">[] = [
  {
    name: "Appetizers",
    recipes: [
      {
        name: "Loaded Potato Skins",
        blurb: "Crispy shells, cheddar, bacon, sour cream.",
        time: "35 min",
        ingredients: [
          "4 russet potatoes",
          "1 cup shredded cheddar",
          "4 strips bacon, cooked and crumbled",
          "2 tbsp butter, melted",
          "sour cream, to serve",
          "chives, chopped",
        ],
        steps: [
          "Bake potatoes at 400°F until tender, about 45 min, then halve and scoop out most of the flesh.",
          "Brush skins with butter, bake 10 min until crisp.",
          "Fill with cheddar and bacon, bake another 8–10 min until cheese melts.",
          "Top with sour cream and chives.",
        ],
      },
    ],
  },
  {
    name: "Soups & Salads",
    recipes: [
      {
        name: "Classic Caesar Salad",
        blurb: "Romaine, parmesan, garlic croutons, anchovy dressing.",
        time: "20 min",
        ingredients: [
          "1 head romaine, chopped",
          "1/2 cup parmesan, shaved",
          "1 cup croutons",
          "2 anchovy fillets, minced",
          "1 clove garlic, minced",
          "1 egg yolk",
          "1 tbsp lemon juice",
          "1/2 cup olive oil",
        ],
        steps: [
          "Whisk anchovy, garlic, egg yolk, and lemon juice, then slowly whisk in olive oil until emulsified.",
          "Toss romaine with dressing.",
          "Top with parmesan and croutons.",
        ],
      },
    ],
  },
  {
    name: "Pasta",
    recipes: [
      {
        name: "Spaghetti Bolognese",
        blurb: "Slow-simmered, deep and rich, weeknight-friendly.",
        time: "45 min",
        ingredients: [
          "1 lb ground beef",
          "1 onion, diced",
          "2 cloves garlic, minced",
          "1 carrot, diced",
          "28 oz crushed tomatoes",
          "2 tbsp tomato paste",
          "1/2 cup red wine (optional)",
          "spaghetti",
          "parmesan, to finish",
        ],
        steps: [
          "Sauté onion, garlic, and carrot until softened, about 5 min.",
          "Add beef, brown fully, breaking it up as it cooks.",
          "Stir in tomato paste, cook 1 min, then deglaze with wine if using.",
          "Add crushed tomatoes, simmer uncovered 25–30 min, stirring occasionally.",
          "Toss with cooked spaghetti, finish with parmesan.",
        ],
      },
    ],
  },
  {
    name: "Poultry",
    recipes: [
      {
        name: "Chicken Stir Fry",
        blurb: "Fast, high heat, whatever vegetables are in the fridge.",
        time: "25 min",
        ingredients: [
          "1 lb chicken thigh, sliced thin",
          "mixed vegetables (bell pepper, broccoli, snap peas)",
          "3 tbsp soy sauce",
          "1 tbsp oyster sauce",
          "1 tsp sesame oil",
          "2 cloves garlic",
          "1 tsp ginger, minced",
          "cooked rice, to serve",
        ],
        steps: [
          "Sear chicken in a very hot pan/wok until browned, remove and set aside.",
          "Add garlic and ginger, cook 30 sec until fragrant.",
          "Add vegetables, stir fry 3–4 min until crisp-tender.",
          "Return chicken to the pan, add sauces, toss to coat and heat through.",
          "Serve over rice.",
        ],
      },
    ],
  },
  {
    name: "Seafood",
    recipes: [
      {
        name: "Garlic Butter Shrimp",
        blurb: "Ten-minute skillet shrimp, lemon, parsley.",
        time: "15 min",
        ingredients: [
          "1 lb shrimp, peeled and deveined",
          "4 tbsp butter",
          "4 cloves garlic, minced",
          "1/2 tsp red pepper flakes",
          "juice of 1 lemon",
          "parsley, chopped",
        ],
        steps: [
          "Melt butter in a skillet over medium-high heat.",
          "Add garlic and red pepper flakes, cook 30 sec until fragrant.",
          "Add shrimp, cook 2–3 min per side until pink and opaque.",
          "Finish with lemon juice and parsley.",
        ],
      },
    ],
  },
  {
    name: "Breads & Breakfast",
    recipes: [
      {
        name: "Buttermilk Pancakes",
        blurb: "Fluffy stack, butter, real maple syrup.",
        time: "20 min",
        ingredients: [
          "2 cups flour",
          "2 eggs",
          "1.5 cups buttermilk",
          "2 tbsp sugar",
          "2 tsp baking powder",
          "3 tbsp melted butter",
          "pinch of salt",
        ],
        steps: [
          "Whisk dry ingredients together in a large bowl.",
          "In a separate bowl, whisk eggs, buttermilk, and melted butter.",
          "Combine wet into dry — stir just until no dry streaks remain, don't overmix.",
          "Cook on a hot buttered griddle, 2–3 min per side, flip once bubbles form and edges set.",
        ],
      },
      {
        name: "Avocado Toast",
        blurb: "Sourdough, chili flake, flaky salt, soft egg.",
        time: "10 min",
        ingredients: [
          "2 slices sourdough",
          "1 ripe avocado",
          "1 egg",
          "chili flakes",
          "flaky salt",
          "squeeze of lemon",
        ],
        steps: [
          "Toast sourdough until deep golden.",
          "Mash avocado with lemon juice and a pinch of salt.",
          "Fry or poach the egg to your liking.",
          "Spread avocado on toast, top with egg, chili flakes, and flaky salt.",
        ],
      },
    ],
  },
  {
    name: "Desserts",
    recipes: [
      {
        name: "Chocolate Chip Cookies",
        blurb: "Crisp edges, soft center, the standard.",
        time: "30 min",
        ingredients: [
          "2.25 cups flour",
          "1 tsp baking soda",
          "1 cup butter, softened",
          "3/4 cup brown sugar",
          "3/4 cup white sugar",
          "2 eggs",
          "1 tsp vanilla",
          "2 cups chocolate chips",
        ],
        steps: [
          "Cream butter and sugars until light and fluffy.",
          "Beat in eggs and vanilla.",
          "Mix in flour and baking soda until just combined, fold in chocolate chips.",
          "Scoop onto a lined sheet, bake at 375°F for 9–11 min until edges are golden.",
          "Cool on the sheet for 5 min before moving.",
        ],
      },
    ],
  },
  {
    name: "Drinks",
    recipes: [
      {
        name: "Fresh Lemonade",
        blurb: "Bright, cold, barely sweet.",
        time: "10 min",
        ingredients: [
          "1 cup fresh lemon juice (about 6 lemons)",
          "3/4 cup sugar",
          "4 cups cold water",
          "ice",
          "lemon slices, to garnish",
        ],
        steps: [
          "Dissolve sugar into lemon juice.",
          "Stir in cold water.",
          "Serve over ice with lemon slices.",
        ],
      },
    ],
  },
];

export const menu: Category[] = rawMenu.map((c) => ({ ...c, slug: slugify(c.name) }));

export function getCategory(slug: string): Category | undefined {
  return menu.find((c) => c.slug === slug);
}
