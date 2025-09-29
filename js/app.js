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
        <div class="relative h-80 overflow-hidden bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
          <img
            src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Biryani Blues Promotion"
            class="w-full h-full object-cover opacity-20"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="container mx-auto px-4 h-full flex items-center">
              <div class="text-center text-white w-full">
                <div class="flex items-center justify-center mb-4">
                  <div class="bg-white rounded-full p-3 mr-4">
                    <span class="text-2xl font-bold text-primary">BB</span>
                  </div>
                  <h1 class="text-4xl font-bold">BIRYANI BLUES</h1>
                </div>
                <div class="bg-white/90 rounded-lg p-6 max-w-md mx-auto">
                  <div class="text-6xl font-bold text-red-600 mb-2">
                    FLAT <span class="text-red-700">₹150</span> OFF
                  </div>
                  <div class="text-2xl font-semibold text-blue-800 mb-4">
                    FOR NEW USERS
                  </div>
                  <div class="bg-red-600 text-white px-4 py-2 rounded-lg inline-block">
                    <span class="text-sm font-medium">USE CODE</span>
                    <span class="text-lg font-bold ml-2">BBFIRST</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">*T&C Apply</div>
                </div>
              </div>
            </div>
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
    const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    
    let filteredProducts = PRODUCTS.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
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