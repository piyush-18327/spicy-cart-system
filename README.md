# Biryani Blues - Food Ordering App

A beautiful food ordering web application built with vanilla HTML, Tailwind CSS, and JavaScript.

## Features

- 🎨 Beautiful 2x2 category grid layout
- 🍽️ Product catalog with category browsing
- 🛒 Shopping cart with persistent storage
- 🔍 Search and filter functionality
- 📱 Fully responsive design
- ⚡ No build step required - pure vanilla JavaScript

## How to Run

### Option 1: Direct File Access
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For better performance and to avoid CORS issues:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx serve
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
.
├── index.html          # Main landing page
├── category.html       # Category page (redirects to index.html with hash)
├── styles.css          # Custom CSS styles
├── js/
│   ├── app.js         # Main application logic
│   ├── cart.js        # Shopping cart management
│   ├── components.js  # Reusable UI components
│   ├── data.js        # Product and category data
│   └── router.js      # Hash-based routing
└── assets/            # Product images
```

## Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Vanilla JavaScript** - ES6+ features
- **Lucide Icons** - Icon library (via CDN)
- **LocalStorage** - Cart persistence

## Customization

### Adding Products
Edit `js/data.js` and add items to the `PRODUCTS` array.

### Styling
Customize colors and design tokens in `styles.css` or modify Tailwind config in HTML files.

### Features
Extend functionality by editing the respective JavaScript modules in the `js/` directory.
