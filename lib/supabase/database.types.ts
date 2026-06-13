// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
// This is a minimal stub — replace with generated types after migration.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          plan: "free" | "pro" | "lifetime";
          stripe_customer_id: string | null;
          docs_this_month: number;
          brand_logo_url: string | null;
          brand_color: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string | null;
          company: string | null;
          address: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["clients"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          type: "invoice" | "proposal";
          title: string;
          status: "draft" | "sent" | "paid" | "accepted";
          client_id: string | null;
          line_items: unknown;
          tax_rate: number;
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["documents"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
      };
      leads: {
        Row: { id: string; email: string; source: string; created_at: string };
        Insert: { email: string; source?: string };
        Update: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
      };
    };
  };
};
