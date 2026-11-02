# SEO Notes — Kalahari Roots

## 1. Keyword research
| Intent | Primary keywords | Used on |
|---|---|---|
| Brand / local | Kalahari Roots, home décor store Woodstock, Cape Town craft shop | Home, Contact |
| Product | woven baskets, stoneware vase, handwoven throw blanket, reclaimed wood stool, live edge side table | Products |
| Value | handcrafted South African home décor, handmade homeware, local artisans | Home, About |
| Transactional | custom handmade furniture order, wholesale baskets South Africa | Enquiry |

Keywords appear naturally in titles, meta descriptions, headings, alt text and body copy (no stuffing). Validate and extend with Google Keyword Planner / Google Trends (South Africa).

## 2. On-page SEO (implemented)
- **Title tags**: unique, under about 60 characters, keyword first, brand last.
- **Meta descriptions**: unique, about 150–160 characters, with a call to action.
- **Meta keywords**: page-specific list (low weight with modern search engines, included for the brief).
- **Headings**: exactly one `<h1>` per page, then `<h2>`/`<h3>` in order.
- **Images**: descriptive file names (`ilala-palm-storage-basket.svg`), meaningful alt text, `width`/`height`, `loading="lazy"`.
- **URLs**: short, lowercase, descriptive (`/products.html`, `/enquiry.html`).
- **Internal linking**: body-copy links between pages (home → products/about/contact, about → products/contact, products → enquiry, FAQ → contact) plus the footer.
- **Mobile-friendliness**: responsive CSS, viewport meta tag, tap-sized buttons, collapsible menu.
- **Structured data**: JSON-LD `HomeGoodsStore` (address locality, geo, hours, phone).

## 3. Off-page SEO (plan)
- **Backlinks**: pitch artisan profiles/guest posts to South African design blogs; get listed in local craft and "buy local" directories; partner artisans link to their products on Kalahari Roots; Oranjezicht City Farm Market vendor page links to the site.
- **Social media**: Instagram (product reels and maker stories), Pinterest boards by room/craft, Facebook page with market-day posts; consistent hashtags (#handmadeSA #kalahariroots); footer links on every page.
- **Local SEO**: claim and complete a Google Business Profile (both locations, photos, hours); keep Name/Address/Phone identical everywhere; collect Google reviews; "Cape Town" / "Woodstock" in content and metadata.

## 4. Technical
- `robots.txt` (allows crawling, points to sitemap) and `sitemap.xml` (5 URLs) in the site root. Submit the sitemap in Google Search Console after deployment.
- **Page speed**: no frameworks, one small CSS file, deferred scripts, lazy-loaded images, vector images, long-term caching headers (`_headers`), Leaflet only loaded on the contact page.
- **Security**: Content-Security-Policy meta tag, `_headers` file (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS), `rel="noopener noreferrer"` on external links, HTTPS via the hosting platform, client + server-side validation planned for any real backend, no inline event handlers or secrets in the code.

## 5. Testing checklist
Lighthouse (SEO, performance, accessibility), Google Mobile-Friendly check, W3C HTML validator, Rich Results Test for the JSON-LD.
