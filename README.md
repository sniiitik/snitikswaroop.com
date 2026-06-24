# Snitik — Portfolio

A personal portfolio cloned from the reference structure and modernized to run on React + Vite while preserving the same editorial look, typography, routes, and GSAP animation patterns.

## Stack

- React
- Vite
- React Router
- GSAP + ScrollTrigger + Flip animations
- Chakra UI installed for future UI components
- Static JSON content for projects, reading, and life list
- Local cached RSS XML for the blog
- Netlify hosting, redirects, serverless RSS proxy, and contact form support

## Local development

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deploy to Netlify

Netlify settings are already in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: configured for React Router
- Contact form: `talk`

## The main file to edit first

Change your name, social links, domain, email, hero copy, and contact copy here:

```txt
src/siteConfig.js
```

## Content files

```txt
src/static/projects.json      # Work / projects page
src/static/nonFiction.json    # Reading / books page
src/static/bucketList.json    # Life list page
src/static/blog-feed.xml      # Cached blog feed
src/static/avatar.svg         # Hero portrait placeholder
```

## Pages

```txt
/              Home
/blog          Essay archive
/blog/:slug    Individual essay page
/projects      Work/projects
/research      Research/publications
/books         Reading recommendations
/bucketlist    Life list
/talk          Contact form
/meet          External calendar redirect
```

## Blog / Substack setup

The site ships with a placeholder RSS feed so the blog layout works immediately.

To connect your own Substack:

```bash
SUBSTACK_FEED_URL="https://your-substack.substack.com/feed" npm run update-blog
```

This updates:

```txt
src/static/blog-feed.xml
```

You can also set the same URL in Netlify as an environment variable named `SUBSTACK_FEED_URL` for the serverless RSS proxy at `/api/blog`.

## Analytics

Google Analytics is disabled by default. To enable it, create `.env` locally or set this in Netlify:

```txt
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Notes

The project keeps the same visual system as the reference: Instrument Serif, Source Serif 4, Inter, dark/light theme toggle, sticky header, mobile menu, page fade transitions, hero image reveal, scroll reveals, book filtering with GSAP Flip, and life-list progress animation.
