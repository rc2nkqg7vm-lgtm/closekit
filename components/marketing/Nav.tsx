"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <Zap className="h-4 w-4 text-white" fill="white" />
          </div>
          <span className="text-lg tracking-tight">CloseKit</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/tools/free-invoice-generator" className="text-muted-foreground transition-colors hover:text-foreground">
            Free Invoice Tool
          </Link>
          <Link href="/templates" className="text-muted-foreground transition-colors hover:text-foreground">
            Templates
          </Link>
          <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
            Blog
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 hover:brightness-110"
          >
            Start free →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-4 text-sm">
            <Link href="/tools/free-invoice-generator" onClick={() => setOpen(false)} className="text-muted-foreground">Free Invoice Tool</Link>
            <Link href="/templates" onClick={() => setOpen(false)} className="text-muted-foreground">Templates</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="text-muted-foreground">Pricing</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-muted-foreground">Blog</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="text-muted-foreground">Sign in</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-center font-medium text-white">
              Start free →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
