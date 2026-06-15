# Hydraulics Store (Static Website)

A simple static multi-page storefront for **HYDRAULICS STORE**.

## Demo / Live Pages
- `index.html` (Home)
- `products.html` (Shop / Products)
- `more.html` (More products)
- `about.html` (About)
- `contact.html` (Contact)
- `enquiry.html` (Enquiry form)
- `cart.html` (Cart – currently shows an under-construction message)

## Tech Stack
- **HTML** for page content
- **CSS** for styling (`css/index.css`)
- **Font Awesome** icons loaded from CDN in the HTML pages
- **Images/Assets** stored in `assets/`

## Project Structure
```text
.
├─ index.html
├─ products.html
├─ more.html
├─ about.html
├─ contact.html
├─ enquiry.html
├─ cart.html
├─ css/
│  └─ index.css
└─ assets/
   └─ (images + icons)
```

## How to Run Locally
Because this is a **static** site, you can run it in any browser.

### Option A: Open directly
1. Open `index.html` in your browser.
2. Navigate to other pages using the links.

### Option B: Use a local static server (recommended)
Some browsers are stricter about file-based access; using a server is more reliable.

If you have Python installed, run from the project folder:

```bash
python -m http.server 5500
```

Then open:
- `http://localhost:5500/index.html`

## Notes
- The cart page (`cart.html`) currently displays a message that checkout is under construction.
- The enquiry form (`enquiry.html`) submits using a `mailto:` action.
- Crawler guidance: `Robotics.txt` (note: spelling matches your request) + `sitemap.xml` were added at the project root.
- Security policy contact: `security.txt` was added at the project root.
- Basic HTTP security/caching headers: `.htaccess` (Apache) was added at the project root.


## Customization
- Update site styling in: `css/index.css`
- Update/replace images in: `assets/`
- Update page content in the corresponding `.html` files.

