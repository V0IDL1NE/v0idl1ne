import type { Post } from "@/lib/posts";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Matches query words at a word boundary (prefix of a whole word), not as a
// substring anywhere — otherwise "tire" would match "entirely" or "retirement".
function fieldMatches(field: string, word: string): boolean {
  return new RegExp(`\\b${escapeRegExp(word)}`, "i").test(field);
}

export function searchPosts(posts: Post[], query: string): Post[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return posts
    .map(post => {
      const title = post.title;
      const excerpt = post.excerpt;
      const category = post.category;
      const tags = post.tags.join(" ");

      let score = 0;
      for (const w of words) {
        if (fieldMatches(title, w)) score += 5;
        if (fieldMatches(tags, w)) score += 3;
        if (fieldMatches(category, w)) score += 2;
        if (fieldMatches(excerpt, w)) score += 1;
      }
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);
}
