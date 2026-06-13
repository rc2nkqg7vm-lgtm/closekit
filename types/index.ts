export type Plan = "free" | "pro" | "lifetime";

export interface Profile {
  id: string;
  email: string;
  plan: Plan;
  stripe_customer_id: string | null;
  docs_this_month: number;
  brand_logo_url: string | null;
  brand_color: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string;
  company: string | null;
  address: string | null;
}

export type DocType = "invoice" | "proposal";
export type DocStatus = "draft" | "sent" | "paid" | "accepted";

export interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export interface Document {
  id: string;
  user_id: string;
  type: DocType;
  title: string;
  status: DocStatus;
  client_id: string | null;
  line_items: LineItem[];
  tax_rate: number;
  notes: string;
  created_at: string;
  clients?: Client;
}

export interface Lead {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export const PLAN_LIMITS = {
  free: { docs_per_month: 3, templates: 1, watermark: true, custom_branding: false },
  pro: { docs_per_month: Infinity, templates: Infinity, watermark: false, custom_branding: true },
  lifetime: { docs_per_month: Infinity, templates: Infinity, watermark: false, custom_branding: true },
} as const;
