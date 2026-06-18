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


## Pictures of GUI
<img width="1893" height="970" alt="image" src="https://github.com/user-attachments/assets/f8ee4cc1-9587-4c09-9ab9-8823f2af0e71" />
<img width="1878" height="962" alt="image" src="https://github.com/user-attachments/assets/34f45e05-8a5e-43ba-b0ff-780d6dcd5860" />
<img width="1878" height="962" alt="image" src="https://github.com/user-attachments/assets/5f1193a2-1950-44dc-a86f-22320c91a52e" />
<img width="1888" height="958" alt="image" src="https://github.com/user-attachments/assets/8d5657ca-444b-4bc7-a636-bb739434c67a" />
<img width="1886" height="956" alt="image" src="https://github.com/user-attachments/assets/7017d78f-07f0-48f5-9863-02ee694f73b7" />
<img width="1890" height="968" alt="image" src="https://github.com/user-attachments/assets/ab661a8b-f45c-4b5d-9fa2-fe6e6d6f1455" />
<img width="1886" height="973" alt="image" src="https://github.com/user-attachments/assets/71edb993-2654-44d8-85e9-c115589beb77" />

