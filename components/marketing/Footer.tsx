import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-3 flex items-center gap-2 font-semibold">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
                <Zap className="h-3.5 w-3.5 text-white" fill="white" />
              </div>
              <span>CloseKit</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Professional proposals and invoices for freelancers. Win clients, get paid faster.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/free-invoice-generator" className="text-muted-foreground hover:text-foreground">Free Invoice Generator</Link></li>
              <li><Link href="/templates" className="text-muted-foreground hover:text-foreground">Templates</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/blog/how-to-write-a-freelance-proposal" className="text-muted-foreground hover:text-foreground">How to Write a Proposal</Link></li>
              <li><Link href="/blog/invoice-template-guide" className="text-muted-foreground hover:text-foreground">Invoice Template Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-foreground">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CloseKit. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built for freelancers who mean business.</p>
        </div>
      </div>
    </footer>
  );
}
