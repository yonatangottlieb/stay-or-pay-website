# STAY OR PAY — Official Static Website

Static marketing and legal site for [stayorpay.app](https://stayorpay.app), hosted on GitHub Pages from this repository.

No backend, cookies, or analytics.

## Routes

| URL | Description |
|-----|-------------|
| `/` | Home — logo, slogan, links to legal documents |
| `/privacy/en`, `/privacy/he` | Privacy Policy |
| `/terms/en`, `/terms/he` | Terms of Service |
| `/data-deletion/en`, `/data-deletion/he` | Data Deletion Policy |

## Language behavior

- Home page document links use the browser language: **Hebrew (`he`) → Hebrew pages**, all other languages → **English**.
- Each legal page includes an **EN | HE** switcher.
- Hebrew pages use `dir="rtl"`; English pages use `dir="ltr"`.
- To add a language later, extend `SUPPORTED_LOCALES` in `assets/js/i18n.js` and add `/{doc}/{locale}/index.html` pages.

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
3. Configure DNS separately when approved (A records or CNAME to GitHub Pages).
4. Enable **Enforce HTTPS** once DNS propagates.

## Updating legal content

Edit the locale files:

- `privacy/{locale}/index.html`
- `terms/{locale}/index.html`
- `data-deletion/{locale}/index.html`

Keep the header, language switcher, and footer intact.

## Structure

```
├── CNAME
├── .nojekyll
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/i18n.js
│   ├── js/home.js
│   ├── js/legal-page.js
│   ├── favicon.svg
│   └── images/logo.svg
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
- `favicon.svg` and logo for sharing

No tracking scripts are included.
