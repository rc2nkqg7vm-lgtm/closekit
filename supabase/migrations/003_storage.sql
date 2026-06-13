-- Create the brand-assets bucket (run in Supabase dashboard → Storage → New bucket,
-- or apply via the Supabase CLI / API)

-- Storage policies (run in SQL editor):
insert into storage.buckets (id, name, public)
values ('brand-assets', 'brand-assets', true)
on conflict do nothing;

-- Allow authenticated users to upload their own logo
create policy "Authenticated users can upload brand assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'brand-assets'
    and name like 'logos/' || auth.uid()::text || '%'
  );

-- Allow anyone to read public logos
create policy "Public read brand assets"
  on storage.objects for select
  to public
  using (bucket_id = 'brand-assets');

-- Allow users to update and delete their own logos
create policy "Users can update own logos"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'brand-assets'
    and name like 'logos/' || auth.uid()::text || '%'
  );

create policy "Users can delete own logos"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'brand-assets'
    and name like 'logos/' || auth.uid()::text || '%'
  );
