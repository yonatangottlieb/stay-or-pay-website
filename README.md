# STAY OR PAY — Official Static Website

Static marketing and legal site for [stayorpay.app](https://stayorpay.app), hosted on GitHub Pages from this repository.

No backend, cookies, or analytics.

## Routes

| URL | Description |
|-----|-------------|
| `/` | Landing page — product overview, how it works, coming soon CTA |
| `/privacy/en`, `/privacy/he` | Privacy Policy |
| `/terms/en`, `/terms/he` | Terms of Service |
| `/data-deletion/en`, `/data-deletion/he` | Data Deletion Policy |

## Language behavior

- Home page defaults to the browser language: **Hebrew (`he`) → Hebrew**, all other languages → **English**.
- Use the **EN | HE** switcher in the header, or `?lang=en` / `?lang=he` in the URL.
- Legal page links on the home page follow the active locale.
- Each legal page includes an **EN | HE** switcher.
- Hebrew pages use `dir="rtl"`; English pages use `dir="ltr"`.
- To add a language later, extend `SUPPORTED_LOCALES` in `assets/js/i18n.js`, add strings in `assets/js/home.js`, and add `/{doc}/{locale}/index.html` pages.

## Local preview

From the repository root:

```bash
npx --yes serve . -p 4173
```

Then open `http://localhost:4173`.

> Absolute paths (`/assets/...`) require a local static server; opening `index.html` directly from the filesystem will not load assets correctly.

## GitHub Pages deployment

Deployment runs automatically via `.github/workflows/deploy-website.yml` on every push to `main`.

Repository settings (one-time):

1. **Settings → Pages → Build and deployment**
2. **Source:** GitHub Actions
3. After the first successful run, confirm the site URL.

### Custom domain

1. Ensure `CNAME` contains:
   ```
   stayorpay.app
   ```
2. In **Settings → Pages → Custom domain**, enter `stayorpay.app`.
3. Configure DNS (only after approval):
   - **A records** for `@` → GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or **CNAME** for `www` → `<username>.github.io` if using a subdomain.
4. Enable **Enforce HTTPS** once DNS propagates.

## Updating legal content

Replace the placeholder block inside each locale file:

- `privacy/{locale}/index.html`
- `terms/{locale}/index.html`
- `data-deletion/{locale}/index.html`

Keep the header, language switcher, and footer intact.

## Structure

```
├── CNAME
├── .nojekyll
├── index.html
├── robots.txt
├── sitemap.xml
├── manifest.json
├── assets/
│   ├── css/style.css
│   ├── js/i18n.js
│   ├── js/home.js
│   ├── js/legal-page.js
│   ├── favicon.svg
│   ├── icons/
│   └── images/
├── privacy/en/index.html
├── privacy/he/index.html
├── terms/en/index.html
├── terms/he/index.html
├── data-deletion/en/index.html
└── data-deletion/he/index.html
```

## SEO

Each page includes:

- Unique `<title>`
- `<meta name="description">`
- `robots.txt` and `sitemap.xml`
- `favicon.svg`, PWA icons, and OG image for sharing

No tracking scripts are included.
