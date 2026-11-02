# Kalahari Roots — Website Project

## Project Title
Kalahari Roots — South African Handcrafted Home Décor Website

## Student Information
- Student: Stanza
- Student number: ST10520886
- Module: WEDE5020 — Web Development (POE Part 3: Enhancing Functionality and SEO)

## Project Overview
Kalahari Roots is a fictional retail store selling South African-made handcrafted home décor (baskets, ceramics, textiles and wood furnishings). The site is a static 5-page HTML/CSS/JavaScript website. Part 3 adds interactivity, dynamic content, SEO, validated forms and deployment.

## Website Goals and Objectives
- Sell products online to customers beyond the store's immediate geographic area.
- Reduce reliance on manual WhatsApp order-taking by formalising enquiries.
- Build brand awareness around the artisans behind each product.
- Generate qualified product enquiries that convert into sales.

## Key Features and Functionality
**Pages:** `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`

**Interactive elements (JavaScript)**
- Tabs (About page: story / mission / vision) — ARIA roles and arrow-key navigation.
- Accordion (Enquiry page FAQ) with animated expand/collapse.
- Quick-view modal on every product card (built dynamically with DOM methods, closes with Esc / outside click, restores focus).
- Gallery lightbox (About page gallery + product images) with previous/next buttons and keyboard arrows.
- Interactive Leaflet/OpenStreetMap map on the Contact page with two markers, popups, directions links and "fly-to" buttons.
- Animations & transitions: scroll-reveal (IntersectionObserver), hover lift/zoom, fade-up panels, modal slide-in. Disabled for users who prefer reduced motion.

**Dynamic content**
- `js/products.js` holds the product catalogue; products are rendered into the page with JavaScript on `products.html` and the homepage "Featured" section.
- Live search (name, description, category), category filter buttons, and sorting (name A–Z/Z–A, price low/high), with a result counter and "no results" state. Category links from the homepage (`products.html#baskets`) pre-select the filter.

**Forms**
- `enquiry.html`: name, email, SA phone number, quantity, product (populated from the catalogue and pre-selected from `?product=`), enquiry type, contact method, optional message. HTML5 attributes (`required`, `type`, `min/max`, `minlength/maxlength`) plus JavaScript validation with field-level error messages (`novalidate` is set so our own messages display). Valid data is submitted via **AJAX (`fetch`)** to the form's `action` URL and an automatic response is shown: availability, lead time and estimated total (10% wholesale discount from 5 units; 15% custom-order surcharge).
- `contact.html`: name, email, optional phone, message type, message (10–500 chars, live counter), consent checkbox. When valid, the details are compiled into an email (subject + body preview) addressed to `hello@kalahariroots.co.za`, and the visitor sends it with the **Open in my email app** (`mailto:`) button.

**SEO** — see `SEO-notes.md` for the full strategy. Implemented: unique titles and meta descriptions, meta keywords, one `<h1>` per page with logical heading order, descriptive image file names and alt text, clean descriptive URLs, internal linking, mobile-friendly responsive layout, canonical + Open Graph tags, JSON-LD LocalBusiness data, `robots.txt`, `sitemap.xml`, lazy-loaded images and deferred scripts (page speed), and security measures (Content-Security-Policy, security headers, `rel="noopener noreferrer"`).

## File Structure
```
/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── _headers            (security + caching headers for Netlify)
├── SEO-notes.md
├── css/style.css
├── js/
│   ├── products.js     (product + store data)
│   └── script.js       (all interactivity, forms, map)
└── images/             (descriptively named SVG product images)
```

## Deployment
Deployed on a free platform (Netlify / GitHub Pages): **[add live URL here]**
After deploying, replace `https://kalahari-roots.netlify.app` in `sitemap.xml`, `robots.txt`, the `<link rel="canonical">` / Open Graph tags (all pages) and the JSON-LD block in `index.html` with the real URL.

## Notes
- Product imagery uses simple SVG illustrations rather than photographs.
- The enquiry form posts to `https://jsonplaceholder.typicode.com/posts`, a free test API that accepts POST requests, so the AJAX flow works without a backend. To receive real submissions, replace the form's `action` with a Formspree (or similar) endpoint.
- Leaflet 1.9.4 is loaded from cdnjs; map tiles come from OpenStreetMap. The market-stall pin is approximate.
- This is a fictional organisation created for academic purposes.

## Changelog
- **2026-11-02 — Part 3: Feedback from Part 2**
  - **Stylesheet rebuilt to match the HTML.** `style.css` used class names (`.nav-container`, `.grid-layout`, `.card`) that did not exist in the pages (`.site-header`, `.nav-wrap`, `.card-grid`, `.product-card` …), so most layout was unstyled. Rewrote the stylesheet around the real class names, keeping the original colour palette and fonts; added a working mobile menu and breakpoints at 900px and 700px.
  - **Products page repaired.** The grid markup was incomplete (unclosed containers, no filter buttons although the script expected them). Replaced with a JavaScript-rendered catalogue with working filters.
  - **Homepage "Featured" section** was empty — now populated from the catalogue.
  - **Enquiry form completed.** It had no message field, no submit button and no feedback; rebuilt with full validation and an automatic response.
  - **Contact page.** The README promised embedded maps but none existed; added the interactive Leaflet map. Added a phone field, message type and consent checkbox to the form.
  - **README** student number/module placeholders completed; added this changelog.
  - *(Add any further feedback points from the lecturer's Part 2 comments here.)*
- **2026-11-02 — Part 3: Functionality**
  - Added tabs, accordion, quick-view modal, gallery lightbox, scroll animations and transitions.
  - Added dynamic product rendering with search, filter and sort (`js/products.js`).
  - Added Leaflet interactive map with two store markers and fly-to buttons.
  - Enquiry form: HTML5 + JavaScript validation, AJAX submission, instant availability/price response.
  - Contact form: validation and compiled `mailto:` email with preview.
- **2026-11-02 — Part 3: SEO and security**
  - Unique `<title>` and meta description per page; added meta keywords, canonical, Open Graph and Twitter tags; JSON-LD LocalBusiness data.
  - Renamed images to descriptive file names (e.g. `basket1.svg` → `ilala-palm-storage-basket.svg`) and wrote descriptive alt text; lazy loading and image dimensions to prevent layout shift.
  - Added `robots.txt`, `sitemap.xml`, `_headers`, Content-Security-Policy meta tag, skip link and `rel="noopener noreferrer"` on external links.
  - Added `SEO-notes.md` (keyword research, on-page, off-page and local SEO plan).
- **Part 2** — Initial project structure created: 5 HTML pages, shared CSS, shared JS, README.
