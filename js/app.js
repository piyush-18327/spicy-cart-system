// Main application logic

class BiryaniBluesApp {
  constructor() {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.vegOnly = false;
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
    
    const filteredProducts = this.getFilteredProducts();
    
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
            
            <!-- Search -->
            <div class="relative">
              <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
              <input
                type="text"
                placeholder="Search for dishes..."
                value="${this.searchQuery}"
                class="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                oninput="app.handleSearchChange(this.value)"
              />
            </div>
          </div>
        </div>

        <!-- Hero Section -->
        <div class="relative h-64 overflow-hidden">
          <img
            src="src/assets/biryani-hero.jpg"
            alt="Delicious Biryani"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <div class="container mx-auto px-4 h-full flex items-center">
              <div class="text-white max-w-lg">
                <h2 class="text-3xl font-bold mb-2">
                  Authentic Hyderabadi Flavors
                </h2>
                <p class="text-lg opacity-90">
                  Experience the rich taste of traditional biryani and kebabs
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Cards -->
        <div class="container mx-auto px-4 py-6">
          <h2 class="text-xl font-bold mb-4">Browse Categories</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            ${CATEGORY_CARDS.map(createCategoryCard).join('')}
          </div>
          
          <!-- Category Filter -->
          <div class="flex gap-2 overflow-x-auto pb-2">
            ${CATEGORIES.map(category => `
              <button
                onclick="app.handleCategoryChange('${category}')"
                class="whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                  this.selectedCategory === category 
                    ? 'gradient-primary text-primary-foreground' 
                    : 'border border-border text-card-foreground hover:bg-accent'
                }"
              >
                ${category}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Products Grid -->
        <div class="container mx-auto px-4 pb-24">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${filteredProducts.map(product => createProductCard(product)).join('')}
          </div>
          
          ${filteredProducts.length === 0 ? `
            <div class="text-center py-12">
              <p class="text-muted-foreground">No dishes found matching your search.</p>
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

  renderCategoryPage(categoryName) {
    const app = document.getElementById('app');
    const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    
    let filteredProducts = PRODUCTS.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (this.vegOnly) {
      filteredProducts = filteredProducts.filter(product => product.isVeg);
    }

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
              
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium">Veg Only</span>
                <button
                  onclick="app.handleVegToggle()"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    this.vegOnly ? 'bg-primary' : 'bg-muted'
                  }"
                >
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    this.vegOnly ? 'translate-x-6' : 'translate-x-1'
                  }"></span>
                </button>
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
                ${this.vegOnly ? 'No vegetarian items found in this category.' : 'No items found in this category.'}
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

  getFilteredProducts() {
    return PRODUCTS.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  handleSearchChange(value) {
    this.searchQuery = value;
    this.renderHomePage();
  }

  handleCategoryChange(category) {
    this.selectedCategory = category;
    this.renderHomePage();
  }

  handleVegToggle() {
    this.vegOnly = !this.vegOnly;
    const currentRoute = router.getCurrentRoute();
    if (currentRoute && currentRoute.path === 'category') {
      this.renderCategoryPage(currentRoute.params[0]);
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BiryaniBluesApp();
});