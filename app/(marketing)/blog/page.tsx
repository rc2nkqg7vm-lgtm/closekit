import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Freelance tips, proposal writing guides, and invoice best practices from CloseKit.",
};

const posts = [
  {
    slug: "how-to-write-a-freelance-proposal",
    title: "How to Write a Freelance Proposal That Wins Clients",
    excerpt: "A step-by-step guide to writing proposals that convert. Includes structure, pricing tips, and a free template.",
    date: "June 10, 2026",
    readTime: "7 min read",
    tag: "Proposals",
  },
  {
    slug: "invoice-template-guide",
    title: "Invoice Template Guide: What to Include and Why",
    excerpt: "Everything your invoice must include to get paid on time — and the mistakes that delay payment.",
    date: "June 5, 2026",
    readTime: "5 min read",
    tag: "Invoicing",
  },
];

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">Freelance resources, invoicing tips, and proposal guides.</p>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-indigo-500/30 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-300">
                  {post.tag}
                </span>
                <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-indigo-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="mt-3 text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                Read article →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
