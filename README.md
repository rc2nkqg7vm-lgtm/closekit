# CloseKit — Premium Monetizable Freelancer SaaS

> Professional proposals and invoices in minutes — win clients, get paid faster.

A full-stack Next.js 15 SaaS for freelancers with:
- Free invoice generator (SEO magnet, no auth required)
- Dashboard to create unlimited proposals & invoices
- Live split-pane PDF preview
- Stripe payments (Pro monthly/annual + Lifetime deal)
- Server-enforced free tier limits
- Custom branding (Pro: logo upload + brand colors)
- Supabase Auth (magic link + Google)

**Monetization tiers**
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 3 docs/mo, watermark, 1 template |
| Pro Monthly | $29/mo | Unlimited, custom branding, all templates |
| Pro Annual | $59/yr | Same as Pro Monthly |
| Lifetime | $99 once | Pro forever (limited 50 slots) |

**Estimated agency build value: $3,500–$6,000**

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Auth | Supabase Auth (magic link + Google) |
| Database | Supabase Postgres (RLS) |
| Payments | Stripe Checkout + Customer Portal |
| PDF | @react-pdf/renderer (server-side) |
| Email | Resend |
| Hosting | Vercel |

---

## Quick start

### 1. Clone and install

```bash
git clone <your-repo>
cd closekit
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page (secret) |
| `STRIPE_SECRET_KEY` | Stripe dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page |
| `STRIPE_WEBHOOK_SECRET` | After setting up webhook (step 5) |
| `STRIPE_PRICE_PRO_MONTHLY` | Stripe → Products → create price |
| `STRIPE_PRICE_PRO_ANNUAL` | Stripe → Products → create price |
| `STRIPE_PRICE_LIFETIME` | Stripe → Products → create price |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | A verified sender in Resend |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (dev) |

### 3. Run Supabase migrations

In your Supabase project, go to **SQL Editor** and run these files in order:

1. `supabase/migrations/001_initial.sql`
2. `supabase/migrations/002_rpc_helpers.sql`
3. `supabase/migrations/003_storage.sql`

Or use the Supabase CLI:

```bash
npx supabase db push
```

### 4. Enable Supabase Auth providers

In Supabase → **Authentication → Providers**:
- Enable **Email** (magic links enabled)
- Enable **Google** (add OAuth credentials from Google Cloud Console)

Set your site URL: `http://localhost:3000` (dev) / your domain (prod)

Add redirect URLs:
- `http://localhost:3000/**`
- `https://yourdomain.com/**`

### 5. Set up Stripe products

Create 3 products in Stripe:
1. **Pro Monthly** — $29/month recurring → copy Price ID to `STRIPE_PRICE_PRO_MONTHLY`
2. **Pro Annual** — $59/year recurring → copy Price ID to `STRIPE_PRICE_PRO_ANNUAL`
3. **Lifetime** — $99 one-time → copy Price ID to `STRIPE_PRICE_LIFETIME`

### 6. Set up Stripe webhook

```bash
# Install Stripe CLI
npm install -g stripe

# Forward events to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

For production, add a webhook endpoint in the Stripe dashboard pointing to:
`https://yourdomain.com/api/webhooks/stripe`

Events to listen for:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 7. Generate Supabase types (optional but recommended)

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID \
  > lib/supabase/database.types.ts
```

### 8. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add env vars in Vercel dashboard or:
vercel env add NEXT_PUBLIC_SUPABASE_URL
# ... repeat for all vars
```

Set `NEXT_PUBLIC_APP_URL` to your Vercel domain.

---

## Post-launch marketing checklist

- [ ] Post to r/freelance, r/webdev, r/entrepreneur
- [ ] Post to Indie Hackers, Product Hunt
- [ ] Share free tool link on Twitter/X and LinkedIn
- [ ] Offer 3 beta users free Pro in exchange for testimonials
- [ ] Add affiliate links to Stripe Atlas, Wave, FreshBooks in blog posts

**Realistic timeline to first sale: 3–14 days after deploy if you promote actively.**

---

## Revenue math to $3k

- Lifetime deal: **30 sales × $99 = $2,970**
- Pro annual: **52 × $59/yr = $3,068**
- Mix: **15 lifetime ($1,485) + 25 Pro monthly × $29 × 3 months ≈ $2,175 in 90 days**

---

## Project structure

```
closekit/
├── app/
│   ├── (marketing)/          # Landing, pricing, blog, free tool
│   ├── (auth)/               # Login, signup
│   ├── dashboard/            # App shell + editor
│   └── api/                  # Stripe, PDF, webhooks, leads
├── components/
│   ├── marketing/            # Hero, Pricing, FAQ, Nav, Footer
│   ├── editor/               # LineItems, Preview
│   ├── dashboard/            # DashboardNav, DocCard
│   └── ui/                   # shadcn primitives
├── lib/
│   ├── supabase/             # Client + server helpers + types
│   ├── stripe/               # Checkout + webhook utils
│   └── pdf/                  # Invoice PDF template
├── supabase/migrations/      # SQL schema
└── types/                    # Shared TypeScript types
```

---

## Success criteria

- [ ] Site looks and feels like a paid SaaS product (not a template clone)
- [ ] Visitor can generate a free invoice PDF in under 2 minutes
- [ ] Stripe checkout works for Pro and Lifetime tiers
- [ ] Free tier limits enforced server-side (not bypassable client-side)
- [ ] Clear path documented to first $3k

---

Built with CloseKit. Win clients, get paid faster.
