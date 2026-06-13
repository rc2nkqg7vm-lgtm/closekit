import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: June 13, 2026</p>

        <div className="space-y-6">
          {[
            ["1. Acceptance", "By creating a CloseKit account or using the free invoice generator, you agree to these terms. If you don't agree, don't use the service."],
            ["2. Your account", "You're responsible for keeping your login secure. You must be 18+ to create a paid account. One account per person."],
            ["3. Acceptable use", "Use CloseKit only for lawful purposes. Don't use it to generate fraudulent documents, impersonate others, or violate any laws. We reserve the right to terminate accounts that violate these terms."],
            ["4. Free tier limits", "The free tier allows 3 documents per month. Limits are enforced server-side. Attempting to circumvent limits will result in account termination."],
            ["5. Payments", "Pro and Lifetime plans are billed through Stripe. Subscriptions auto-renew unless cancelled. Lifetime deals are one-time payments with no renewal."],
            ["6. Intellectual property", "You own all documents you create. We own CloseKit's code, design, and brand assets. You grant us a license to process your data to provide the service."],
            ["7. Disclaimers", "CloseKit is provided 'as is'. We make no warranty that the service will be uninterrupted or error-free. Documents generated are not legal or financial advice."],
            ["8. Limitation of liability", "Our liability is limited to the amount you paid us in the 12 months prior to any claim, or $100, whichever is greater."],
            ["9. Governing law", "These terms are governed by the laws of Delaware, USA."],
            ["10. Changes", "We may update these terms. Continued use after changes constitutes acceptance. We'll notify you of material changes by email."],
          ].map(([title, text]) => (
            <section key={title as string}>
              <h2 className="mb-2 text-base font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </section>
          ))}
          <p className="text-sm text-muted-foreground">Contact: <a href="mailto:hello@closekit.app" className="text-indigo-400 hover:text-indigo-300">hello@closekit.app</a></p>
        </div>
      </div>
    </div>
  );
}
