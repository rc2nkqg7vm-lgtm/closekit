import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero-grid flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl font-bold gradient-text">404</div>
      <h1 className="mb-2 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mb-8 text-muted-foreground">This page doesn&apos;t exist or was moved.</p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition-all">
          Go home
        </Link>
        <Link href="/dashboard" className="rounded-xl border border-border/50 px-5 py-2.5 text-sm text-muted-foreground hover:border-border hover:text-foreground transition-colors">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
