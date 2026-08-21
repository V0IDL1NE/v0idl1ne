import { redirect } from "next/navigation";
import { menu } from "./menu-data";

export default function RecipesIndexPage() {
  redirect(`/test/recipes/${menu[0].slug}`);
}
