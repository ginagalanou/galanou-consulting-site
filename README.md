# Galanou Consulting Site

This repository contains the Galanou Consulting public website as a static HTML/CSS/JavaScript site.

The site began as a Hugo Serif theme customization, but the production implementation has been consolidated into a direct static source under `site/`. Hugo, `exampleSite`, theme metadata, SCSS pipelines, and generated cache/output directories are no longer part of the active architecture.

## Repository Structure

```text
site/
  index.html                  Homepage
  about/index.html            About page
  services/index.html         Services page
  experience/index.html       Experience page
  contact/index.html          Contact page
  404.html                    Netlify 404 page
  _redirects                  Netlify redirects and 404 fallback
  robots.txt                  Robots policy
  sitemap.xml                 Sitemap
  css/style.css               Shared site styles
  js/scripts.js               Mobile menu and sticky header behavior
  images/                     Production images and social assets

netlify.toml                  Netlify deploy configuration
wrangler.jsonc                Cloudflare Workers static asset configuration
LICENSE                       Original theme license retained for attribution
```

## Editing

Edit the files in `site/` directly. Keep public URLs stable where possible:

- `/`
- `/about/`
- `/services/`
- `/experience/`
- `/contact/`

If an old URL is removed, add a redirect in `site/_redirects`.

## Local Preview

Any static file server can preview the site. From the repository root:

```bash
python3 -m http.server 8080 --directory site
```

Then open `http://localhost:8080/`.

## Validation

Before publishing changes, verify:

- primary routes load: `/`, `/about/`, `/services/`, `/experience/`, `/contact/`, `/404.html`
- CSS and JavaScript load from `/css/style.css` and `/js/scripts.js`
- images referenced by pages exist under `site/images/`
- mobile navigation opens and closes
- old service/team URLs redirect through `site/_redirects`
- `site/sitemap.xml` and `site/robots.txt` are still accurate

## Deployment

Netlify publishes the `site/` directory directly. There is no build command.

Cloudflare Workers static asset configuration also points to `site/`.

The production/default Git branch is `master`. Cleanup and future work should happen on feature branches and be merged into `master` only after validation.
