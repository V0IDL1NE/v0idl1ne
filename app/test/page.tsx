import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

type Recipe = {
  name: string;
  blurb: string;
  time: string;
  ingredients: string[];
  steps: string[];
};

type Category = {
  name: string;
  recipes: Recipe[];
};

const menu: Category[] = [
  {
    name: "Breakfast",
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
    name: "Dinner",
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
    name: "Dessert",
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
];

export default function TestPage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--bg)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "5rem 1.5rem 6rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            color: "#fff",
            marginBottom: "0.4rem",
          }}
        >
          The Menu
        </h1>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "var(--purple-dim)",
            marginBottom: "3rem",
            textTransform: "uppercase",
          }}
        >
          // recipe box
        </div>

        {menu.map((category) => (
          <section key={category.name} style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "1.4rem",
                color: "var(--purple-mid)",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "0.6rem",
                marginBottom: "1.2rem",
              }}
            >
              {category.name}
            </h2>

            {category.recipes.map((recipe) => (
              <details
                key={recipe.name}
                style={{
                  border: "1px solid var(--border)",
                  background: "rgba(136, 0, 255, 0.03)",
                  padding: "1rem 1.2rem",
                  marginBottom: "0.8rem",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "1rem",
                    listStyle: "none",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "1.05rem",
                        color: "#e0d8f0",
                      }}
                    >
                      {recipe.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "#a090c0",
                      }}
                    >
                      {recipe.blurb}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "var(--purple-dim)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {recipe.time}
                  </span>
                </summary>

                <div style={{ marginTop: "1.2rem", display: "grid", gap: "1.2rem" }}>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: "var(--purple-dim)",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                      }}
                    >
                      Ingredients
                    </div>
                    <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "0.3rem" }}>
                      {recipe.ingredients.map((ing) => (
                        <li
                          key={ing}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.78rem",
                            color: "#a090c0",
                          }}
                        >
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: "var(--purple-dim)",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                      }}
                    >
                      Steps
                    </div>
                    <ol style={{ paddingLeft: "1.1rem", display: "grid", gap: "0.4rem" }}>
                      {recipe.steps.map((step, i) => (
                        <li
                          key={i}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.88rem",
                            color: "#c8bedd",
                            lineHeight: 1.6,
                          }}
                        >
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
