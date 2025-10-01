// Main application logic

class BiryaniBluesApp {
  constructor() {
    this.init();
  }

  init() {
    // Setup cart listeners
    cart.addListener((items) => this.updateCartUI(items));
    
    // Setup router
    router.addRoute('home', () => this.renderHomePage());
    router.addRoute('category', (params) => this.renderCategoryPage(params[0]));
    
    // Setup cart drawer functionality
    this.setupCartDrawer();
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    // Start the app
    this.updateCartUI(cart.items);
  }

  setupCartDrawer() {
    const cartButton = document.getElementById('cartButton');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCartButton = document.getElementById('closeCartButton');

    const openCart = () => {
      cartOverlay.classList.remove('hidden');
      setTimeout(() => {
        cartDrawer.classList.add('cart-drawer-enter');
        cartDrawer.classList.remove('cart-drawer-exit');
      }, 10);
      this.updateCartContent();
    };

    const closeCart = () => {
      cartDrawer.classList.remove('cart-drawer-enter');
      cartDrawer.classList.add('cart-drawer-exit');
      setTimeout(() => {
        cartOverlay.classList.add('hidden');
      }, 300);
    };

    cartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCart();
      }
    });
  }

  updateCartUI(items) {
    const cartBottomBar = document.getElementById('cartBottomBar');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsText = document.getElementById('cartItemsText');
    const cartTotal = document.getElementById('cartTotal');

    const itemCount = cart.getItemCount();
    const total = cart.getTotal();

    if (itemCount > 0) {
      cartBottomBar.classList.remove('hidden');
      cartBadge.textContent = itemCount;
      cartItemsText.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
      cartTotal.textContent = `₹${total.toFixed(2)}`;
    } else {
      cartBottomBar.classList.add('hidden');
    }
  }

  updateCartContent() {
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = createCartContent(cart.items);
    
    // Re-initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderHomePage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-background">
        <!-- Header -->
        <div class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h1 class="text-2xl font-bold text-gradient">
                  Biryani Blues
                </h1>
                <div class="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div class="flex items-center gap-1">
                    <i data-lucide="map-pin" class="h-4 w-4"></i>
                    <span>Gurugram</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i data-lucide="clock" class="h-4 w-4"></i>
                    <span>30-40 mins</span>
                  </div>
                </div>
              </div>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success text-success-foreground">
                ⭐ 4.3 (1K+ reviews)
              </span>
            </div>
          </div>
        </div>

        <!-- Promotion Banner -->
        <div class="relative bg-gray-100 overflow-hidden" style="min-height: 350px;">
          <div class="container mx-auto px-4 py-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
              <!-- Left Side: Branding and Offer -->
              <div class="flex-1 text-center md:text-left">
                <!-- Logo and Brand Name -->
                <div class="flex items-center justify-center md:justify-start mb-6 gap-3">
                  <!-- Left Palm Tree -->
                  <div class="text-green-600">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5 9.7 5.5 10 5.8C9.3 6.1 8.8 6.8 8.8 7.6C8.8 8.7 9.7 9.6 10.8 9.6H11V22H13V9.6H13.2C14.3 9.6 15.2 8.7 15.2 7.6C15.2 6.8 14.7 6.1 14 5.8C14.3 5.5 14.5 5 14.5 4.5C14.5 3 13.5 2 12 2Z"/>
                    </svg>
                  </div>

                  <!-- Logo Circle and Text -->
                  <div class="flex items-center gap-2">
                    <div class="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md border-2 border-blue-900">
                      <span class="text-xl font-bold text-red-600">B</span>
                    </div>
                    <div>
                      <div class="text-xs text-blue-900 font-semibold leading-tight">BIRYANI</div>
                      <div class="text-xs text-blue-900 font-semibold leading-tight">BLUES</div>
                    </div>
                  </div>

                  <!-- Right Palm Tree -->
                  <div class="text-green-600">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5 9.7 5.5 10 5.8C9.3 6.1 8.8 6.8 8.8 7.6C8.8 8.7 9.7 9.6 10.8 9.6H11V22H13V9.6H13.2C14.3 9.6 15.2 8.7 15.2 7.6C15.2 6.8 14.7 6.1 14 5.8C14.3 5.5 14.5 5 14.5 4.5C14.5 3 13.5 2 12 2Z"/>
                    </svg>
                  </div>

                  <h1 class="text-3xl md:text-4xl font-bold text-blue-900">BIRYANI BLUES</h1>
                </div>

                <!-- Offer Card -->
                <div class="bg-white rounded-lg shadow-lg p-6 inline-block border-2 border-gray-200">
                  <div class="mb-2">
                    <span class="text-gray-700 font-semibold text-lg">FLAT</span>
                  </div>
                  <div class="mb-3">
                    <span class="text-red-600 font-bold text-6xl">₹150</span>
                    <span class="text-blue-900 font-bold text-3xl ml-2">OFF</span>
                  </div>
                  <div class="text-blue-900 font-bold text-xl mb-4 border-t border-b border-gray-300 py-2">
                    FOR NEW USERS
                  </div>
                  <div class="bg-red-600 text-white px-6 py-2 rounded inline-block">
                    <span class="text-xs font-semibold">USE CODE</span>
                    <span class="text-base font-bold ml-2 tracking-wider">BBFIRST</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-3">*T&C Apply</div>
                </div>
              </div>

              <!-- Right Side: Food Image -->
              <div class="flex-1 relative hidden md:block">
                <!-- Decorative Shapes -->
                <div class="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-60 z-0"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-green-500 rounded-full opacity-40 z-0" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"></div>

                <!-- Biryani Image in Pan -->
                <div class="relative z-10">
                  <img
                    src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Delicious Biryani"
                    class="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                  />
                  <!-- Garnish Elements -->
                  <div class="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-70"></div>
                  <div class="absolute -bottom-4 right-12 w-16 h-16 bg-red-500 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Indicators -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div class="w-2 h-2 rounded-full bg-red-600"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        </div>

        <!-- What would you like to order? -->
        <div class="container mx-auto px-4 py-6">
          <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">What would you like to order?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${CATEGORY_CARDS.map(createCategoryCard).join('')}
          </div>
        </div>
      </div>
    `;
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderCategoryPage(categoryName) {
    const app = document.getElementById('app');

    const categorySlug = categoryName.toLowerCase();
    const categoryMap = {
      'hyderabadi-lucknowi-dum-biryanis': 'Biryani',
      'biryani-thalis': 'Biryani',
      'celebration-handi-biryanis': 'Biryani',
      'supersaver-mini-biryanis-starting-rs99-': 'Biryani',
      'starters': 'Starters',
      'sides': 'Sides',
      'beverages': 'Beverages'
    };

    const actualCategory = categoryMap[categorySlug] || categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const formattedCategory = categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let filteredProducts = PRODUCTS.filter(product =>
      product.category.toLowerCase() === actualCategory.toLowerCase()
    );


    app.innerHTML = `
      <div class="min-h-screen bg-background">
        <!-- Header -->
        <div class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center gap-4 mb-4">
              <button onclick="router.navigate('')" class="p-2 hover:bg-accent rounded-lg">
                <i data-lucide="arrow-left" class="h-5 w-5"></i>
              </button>
              
              <div class="flex-1">
                <h1 class="text-xl font-bold">${formattedCategory}</h1>
                <p class="text-sm text-muted-foreground">${filteredProducts.length} items</p>
              </div>
              

              <button class="p-2 hover:bg-accent rounded-lg">
                <i data-lucide="search" class="h-5 w-5"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="container mx-auto px-4 py-6 pb-24">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredProducts.map(product => createProductCard(product)).join('')}
          </div>
          
          ${filteredProducts.length === 0 ? `
            <div class="text-center py-12">
              <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <i data-lucide="utensils" class="h-8 w-8 text-muted-foreground"></i>
              </div>
              <p class="text-muted-foreground">
                No items found in this category.
              </p>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BiryaniBluesApp();
});