# Biryani Blues - Vanilla HTML/CSS/JS Version

This is a vanilla HTML, Tailwind CSS, and JavaScript implementation of the Biryani Blues food ordering application, converted from the original React version.

## Features

- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Product Catalog**: Browse food items by category
- **Shopping Cart**: Add items, manage quantities, and view totals
- **Search & Filter**: Search products and filter by vegetarian options  
- **Category Navigation**: Browse different food categories
- **Local Storage**: Cart persists across browser sessions
- **Toast Notifications**: User feedback for actions
- **Hash-based Routing**: Navigate between pages without page refresh

## File Structure

```
├── index.html              # Main application page
├── category.html           # Category redirect page  
├── styles.css              # Custom CSS styles
├── js/
│   ├── data.js             # Product data and categories
│   ├── cart.js             # Cart management system
│   ├── components.js       # Reusable UI components
│   ├── router.js           # Hash-based routing
│   └── app.js              # Main application logic
└── src/assets/             # Product images
    ├── biryani-hero.jpg
    ├── chicken-kebab.jpg
    ├── chicken-65.jpg
    └── jeera-raita.jpg
```

## How to Run

1. **Simple Setup**: Just open `index.html` in a web browser
2. **Local Server** (recommended): 
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx http-server -p 8080
   
   # Using PHP  
   php -S localhost:8080
   ```
3. Navigate to `http://localhost:8080`

## Key Technologies

- **HTML5**: Semantic markup for structure
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: Modern ES6+ JavaScript
- **Lucide Icons**: Icon library for UI elements
- **Local Storage**: Client-side data persistence

## Application Architecture

### Component System
The app uses a component-based architecture with JavaScript functions that return HTML strings:
- `createProductCard()`: Product display component
- `createCategoryCard()`: Category navigation component  
- `createCartItem()`: Shopping cart item component

### State Management
- **CartManager Class**: Handles cart operations with localStorage persistence
- **Router Class**: Manages hash-based navigation
- **BiryaniBluesApp Class**: Main application controller

### Routing
Hash-based routing enables navigation without page refreshes:
- `#` or `#home` - Homepage with all products
- `#category/biryani` - Biryani category page
- `#category/starters` - Starters category page

### Cart System
- Add/remove items with quantity management
- Calculate subtotal, taxes (CGST/SGST), and packaging charges
- Persistent storage using localStorage
- Real-time UI updates with observer pattern

## Customization

### Adding New Products
Edit `js/data.js` and add items to the `PRODUCTS` array:
```javascript
{
  id: "9",
  name: "New Dish Name", 
  price: 199,
  image: "path/to/image.jpg",
  category: "Category",
  isVeg: true,
  description: "Dish description"
}
```

### Styling  
- Modify color scheme in `styles.css` CSS variables
- Add new Tailwind classes in component functions
- Update Tailwind config in `index.html`

### Features
- Add new routes in `js/router.js`
- Extend cart functionality in `js/cart.js`
- Create new components in `js/components.js`

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ support required)
- **Mobile**: Responsive design works on all mobile devices
- **Offline**: Basic offline functionality via localStorage

## Performance

- **Bundle Size**: No build step required, loads from CDN
- **Loading**: Fast initial load with progressive enhancement
- **Images**: Lazy loading implemented for product images
- **Caching**: Browser caches static assets automatically

## Migration Notes

This vanilla version maintains 100% feature parity with the original React application:
- ✅ All UI components converted to vanilla JS functions
- ✅ React state management replaced with vanilla JS classes
- ✅ React Router replaced with hash-based routing  
- ✅ Component lifecycle replaced with event listeners
- ✅ All styling preserved using Tailwind CSS
- ✅ Cart functionality fully replicated with localStorage

The app provides the same user experience while being framework-independent and having a smaller footprint.