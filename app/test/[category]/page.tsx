import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menu, getCategory } from "../menu-data";
import { BookPage, ArrowLink } from "../components";

export function generateStaticParams() {
  return menu.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const index = menu.findIndex((c) => c.slug === slug);
  const prevHref = index > 0 ? `/test/${menu[index - 1].slug}` : "/test";
  const next = index < menu.length - 1 ? menu[index + 1] : undefined;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ArrowLink href={prevHref} direction="left" />
        <BookPage category={category} />
        <ArrowLink href={next ? `/test/${next.slug}` : undefined} direction="right" />
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          color: "#555",
          textTransform: "uppercase",
        }}
      >
        Page {index + 1} of {menu.length} — {category.name}
      </div>
    </>
  );
}
