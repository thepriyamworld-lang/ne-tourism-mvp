# North-East Tourism MVP (React + Vite + Tailwind)

This is a ready-to-run MVP prototype for your NE Tourism app with:
- Splash (GIF logo + preloader)
- Auth (name + phone, no OTP)
- Home (slider, title/description, 14 cities, popular cities, footer tabs)
- City screen (Overview, Food, Stay) with modals, call + map links

## Run locally (no coding experience required)
1. Install **Node.js** (LTS) from nodejs.org
2. Open a terminal, then run:
   ```bash
   cd ne-tourism-mvp
   npm install
   npm run dev
   ```
3. Open the shown **local URL** in your browser.

## Run online (zero install)
**Option A: CodeSandbox**
- Go to https://codesandbox.io/ → Create Sandbox → Import from ZIP → upload this ZIP → it boots automatically.
- Click **Share** to get a public link for your client.

**Option B: StackBlitz**
- Go to https://stackblitz.com → Create Project → Upload Project → choose this ZIP.
- Share the URL.

## Deploy for the client (free tiers)
- **Vercel** (recommended): create a GitHub repo, push this project, then Import on vercel.com → Deploy.
- **Netlify**: similar flow, also supports drag & drop of the built folder.

## Customize
- Replace images and city data inside `src/App.jsx` (look for `SLIDER_IMAGES`, `CITIES`, `LISTINGS`).  
- Add more categories later following the LISTINGS structure.

## Next steps (backend later)
- Pick Supabase or Firebase for real database + storage; wire up to replace the in-file sample data.
