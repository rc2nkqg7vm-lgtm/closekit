import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "CloseKit pricing — free, Pro ($29/mo), and lifetime ($99). Simple plans for freelancers.",
};

export default function PricingPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-3xl px-4 text-center mb-4">
        <h1 className="text-4xl font-bold mb-3">Pricing</h1>
        <p className="text-muted-foreground">Start free. Upgrade when you need it.</p>
      </div>
      <Pricing />
      <FAQ />
    </div>
  );
}
