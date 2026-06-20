# Deploy Mako Kennel to Vercel (one-click demo)

This is a **Next.js 16** app. `vercel.json` already sets the build command and
demo environment, so you can deploy without configuring anything in the UI.

## Steps

1. **Put this code in a GitHub repo you control.**
   - Easiest: github.com → **New repository** → name it `mako-kennel` →
     Create (do NOT add a README).
   - On the empty repo page click **“uploading an existing file”**, then drag in
     **all** the files/folders from this unzipped project → **Commit**.

2. **Import to Vercel.**
   - vercel.com → **Add New → Project → Import** the `mako-kennel` repo.
   - Framework auto-detects **Next.js**. Leave everything default
     (`vercel.json` handles the build command + env). Click **Deploy**.

3. **Make it public.**
   - Project → **Settings → Deployment Protection** → turn **Vercel
     Authentication OFF** so visitors don’t hit a 403 login wall.

That’s it — the site goes live with demo dogs, litters and puppies.

## Going to real production later

- Set `DEMO_MODE` to `false` (or remove it).
- Add a real Postgres `DATABASE_URL` (e.g. Neon) and real Clerk keys.
- Use the normal build command `npm run build` (runs DB migrations + seed).
- Manage all content from `/dashboard` (the admin CMS).
