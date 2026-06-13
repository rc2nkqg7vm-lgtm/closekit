-- Add this function to your Supabase SQL editor or create a new migration.
-- It safely increments docs_this_month for a user, only if they are on the free plan.

create or replace function increment_docs_count(user_id uuid)
returns void as $$
begin
  update public.profiles
  set docs_this_month = docs_this_month + 1
  where id = user_id;
end;
$$ language plpgsql security definer;
