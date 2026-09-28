import Link from "next/link";
import type { Extra } from "@/lib/extras";

/* Card list of tools / guides / printables. Used on post pages and index pages. */
export default function ExtrasLinks({ items, label }: { items: Extra[]; label?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="no-print">
      {label && <div className="section-label">{label}</div>}
      {items.map(item => (
        <Link key={item.href} href={item.href} className="card-link">
          <div className="card-tag">{"// "}{item.kind}</div>
          <div className="card-title">{item.title}</div>
          <p className="card-desc">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}
