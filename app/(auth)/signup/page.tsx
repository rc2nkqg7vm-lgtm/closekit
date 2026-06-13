"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Check } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const redirectTo = `${location.origin}/dashboard${plan ? `?checkout=${plan}` : ""}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  }

  async function handleGoogle() {
    const redirectTo = `${location.origin}/dashboard${plan ? `?checkout=${plan}` : ""}`;
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
  }

  const inputClass = "w-full rounded-xl border border-border/50 bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-colors";

  const freeBenefits = ["3 documents free every month", "Invoice + proposal templates", "Instant PDF download", "No credit card required"];

  return (
    <div>
      <div className="mb-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
        <p className="mb-2.5 text-sm font-semibold text-foreground">What you get for free:</p>
        <ul className="space-y-1.5">
          {freeBenefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-indigo-400" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-2xl shadow-black/40">
        <h1 className="mb-1.5 text-xl font-bold text-foreground">
          {plan ? "Create your account to continue" : "Start for free"}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">No credit card required</p>

        {sent ? (
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-center">
            <p className="text-sm font-medium text-indigo-300">Check your email</p>
            <p className="mt-1 text-xs text-muted-foreground">We sent a link to <strong>{email}</strong> to activate your account</p>
          </div>
        ) : (
          <>
            <button onClick={handleGoogle} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-secondary/50 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center text-xs text-muted-foreground"><span className="bg-card px-2">or</span></div>
            </div>
            <form onSubmit={handleSignup} className="space-y-3">
              <input type="email" required className={inputClass} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:brightness-110 disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create free account →"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground/60">
          By signing up you agree to our{" "}
          <Link href="/terms" className="underline hover:text-muted-foreground">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-muted-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
