import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CloseKit privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: June 13, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information we collect</h2>
            <p className="text-muted-foreground leading-relaxed">We collect your email address when you sign up. We store documents, client info, and usage data you create in CloseKit. We collect payment data through Stripe (we never store card numbers). We collect email addresses submitted through the free invoice generator.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. How we use your information</h2>
            <p className="text-muted-foreground leading-relaxed">We use your email to authenticate you and send transactional emails (magic links, receipts). We use document data to generate your PDFs. We use aggregate usage data to improve the product. We never sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Data storage</h2>
            <p className="text-muted-foreground leading-relaxed">Your data is stored in Supabase (PostgreSQL) with Row Level Security — only you can access your documents and clients. PDFs are generated server-side and not persisted after delivery. Logo files are stored in Supabase Storage.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Third-party services</h2>
            <ul className="text-muted-foreground leading-relaxed space-y-1 list-disc pl-4">
              <li><strong className="text-foreground">Supabase</strong> — authentication and database</li>
              <li><strong className="text-foreground">Stripe</strong> — payment processing</li>
              <li><strong className="text-foreground">Resend</strong> — transactional email</li>
              <li><strong className="text-foreground">Vercel</strong> — hosting and edge functions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Your rights</h2>
            <p className="text-muted-foreground leading-relaxed">You can request deletion of all your data at any time by emailing <a href="mailto:hello@closekit.app" className="text-indigo-400 hover:text-indigo-300">hello@closekit.app</a>. We will delete your account, documents, and client data within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">We use session cookies for authentication only. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">Questions? Email <a href="mailto:hello@closekit.app" className="text-indigo-400 hover:text-indigo-300">hello@closekit.app</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
