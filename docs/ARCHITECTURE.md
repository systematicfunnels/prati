# ARCHITECTURE

## Frontend
- Next.js App Router
- Static asset delivery from `public`
- The landing route is composed in `app/page.tsx`
- Landing-page interactions and content live in `app/prati-landing.tsx`

## Structure
- `app/layout.tsx` owns shared typography and SEO metadata
- `app/globals.css` contains the existing Prati design tokens and responsive page styles
- Legacy landing components and their unused content data are not maintained separately

## Performance Notes
- Keep the dashboard mockup CSS-based and avoid loading external imagery
- Keep interactions lightweight and avoid unnecessary client state
