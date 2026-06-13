import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

/* ── Static post content ──────────────────────────────────────────────────── */
const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  tag: string;
  content: React.ReactNode;
}> = {
  "how-to-write-a-freelance-proposal": {
    title: "How to Write a Freelance Proposal That Wins Clients",
    date: "June 10, 2026",
    readTime: "7 min read",
    tag: "Proposals",
    content: (
      <article className="prose prose-invert prose-sm max-w-none">
        <p className="lead">A strong proposal is the difference between landing a $5,000 project and watching the client go with someone else. Here's the exact structure that converts.</p>
        <h2>1. Start with the problem, not your credentials</h2>
        <p>Most freelancers open their proposals with "Hi, I'm [Name] and I've been doing X for Y years." The client doesn't care yet. Open with a crisp restatement of their problem — it shows you listened.</p>
        <p><strong>Example:</strong> "Your current checkout flow has a 68% abandonment rate on mobile. This proposal outlines how I'll rebuild it to load in under 2 seconds and reduce drop-off by at least 30%."</p>
        <h2>2. Define the scope clearly</h2>
        <p>Scope creep kills projects. List exactly what's included — and explicitly call out what's not. This protects you and builds trust with the client.</p>
        <ul>
          <li>Include: 3 design iterations, 1 round of revisions per iteration</li>
          <li>Not included: copywriting, stock photography, SEO</li>
        </ul>
        <h2>3. Break down the timeline</h2>
        <p>Clients are anxious about timelines. A phased breakdown (Week 1: Discovery, Week 2–3: Design, Week 4: Revisions) makes your process feel structured and trustworthy.</p>
        <h2>4. Present pricing with context</h2>
        <p>Don't just list a number. Frame it against the value: "This project will take approximately 40 hours at $75/hr = $3,000." Or offer a fixed price with clear deliverables. Avoid hourly if you can — fixed-price feels safer for clients.</p>
        <h2>5. End with a clear next step</h2>
        <p>Don't leave clients wondering what to do. End with: "To proceed, sign this proposal and pay the 50% deposit. I'll kick off discovery on Monday."</p>
        <h2>Use CloseKit to send it</h2>
        <p>CloseKit lets you build proposals with line items, add your branding, and download a client-ready PDF in under 2 minutes.</p>
      </article>
    ),
  },
  "invoice-template-guide": {
    title: "Invoice Template Guide: What to Include and Why",
    date: "June 5, 2026",
    readTime: "5 min read",
    tag: "Invoicing",
    content: (
      <article className="prose prose-invert prose-sm max-w-none">
        <p className="lead">A poorly structured invoice causes payment delays, disputes, and looks unprofessional. Here's exactly what every freelance invoice must include.</p>
        <h2>The 9 required fields</h2>
        <ol>
          <li><strong>Your name / business name</strong> — who they're paying</li>
          <li><strong>Your contact info</strong> — email at minimum</li>
          <li><strong>Invoice number</strong> — for your records and theirs</li>
          <li><strong>Invoice date</strong> — when it was issued</li>
          <li><strong>Due date</strong> — "Net 30" or a specific date</li>
          <li><strong>Client name + address</strong> — required for their accounting</li>
          <li><strong>Line items</strong> — description, quantity, rate, amount</li>
          <li><strong>Subtotal, tax, and total</strong></li>
          <li><strong>Payment instructions</strong> — bank transfer, PayPal, Stripe link</li>
        </ol>
        <h2>Common mistakes that delay payment</h2>
        <ul>
          <li>No due date — "when you get a chance" means never</li>
          <li>Vague line items — "Design work" vs. "Homepage redesign — 12 hrs @ $85/hr"</li>
          <li>Wrong client name — gets kicked back by accounting</li>
          <li>Missing payment details — clients won't chase you for bank info</li>
        </ul>
        <h2>PDF vs. email body</h2>
        <p>Always send a PDF. It's professional, can't be accidentally edited, and looks the same on every device. Email the PDF as an attachment with a 2-line summary in the body.</p>
        <h2>Generate yours in 2 minutes</h2>
        <p>CloseKit generates professional invoice PDFs — fill in your details and download. No account needed for your first invoice.</p>
      </article>
    ),
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: `${post.title} — CloseKit blog`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-300">
            {post.tag}
          </span>
          <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
        </div>

        <h1 className="mb-8 text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {post.title}
        </h1>

        <div className="mb-10">{post.content}</div>

        {/* CTA */}
        <div className="rounded-2xl border border-indigo-500/25 bg-indigo-500/8 p-6 text-center">
          <h3 className="mb-2 font-semibold text-foreground">Try CloseKit free</h3>
          <p className="mb-4 text-sm text-muted-foreground">Create a professional invoice or proposal PDF in under 2 minutes. No account required.</p>
          <Link href="/tools/free-invoice-generator" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 transition-all">
            Generate free invoice →
          </Link>
        </div>
      </div>
    </div>
  );
}
