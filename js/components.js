// Reusable component functions for generating HTML

function createCategoryCard(categoryCard) {
  return `
    <div class="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer rounded-2xl bg-card border border-gray-200" onclick="navigateToCategory('${categoryCard.category}')">
      <div class="relative overflow-hidden h-72">
        <img
          src="${categoryCard.image}"
          alt="${categoryCard.category}"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <h3 class="font-bold text-2xl mb-1 leading-tight drop-shadow-lg">${categoryCard.category}</h3>
        </div>
      </div>
    </div>
  `;
}

function createCartItem(item) {
  return `
    <div class="flex items-center gap-4 py-4 border-b border-border last:border-b-0">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
      
      <div class="flex-1">
        <h4 class="font-medium text-card-foreground">${item.name}</h4>
        <p class="text-sm text-muted-foreground">₹${item.price} each</p>
      </div>
      
      <div class="flex items-center gap-2">
        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent">
          <i data-lucide="minus" class="h-3 w-3"></i>
        </button>
        <span class="w-8 text-center font-medium">${item.quantity}</span>
        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent">
          <i data-lucide="plus" class="h-3 w-3"></i>
        </button>
        <button onclick="cart.removeItem('${item.id}')" class="ml-2 w-8 h-8 rounded-full text-destructive hover:bg-destructive/10 flex items-center justify-center">
          <i data-lucide="trash-2" class="h-4 w-4"></i>
        </button>
      </div>
    </div>
  `;
}

function createCartContent(items) {
  if (items.length === 0) {
    return `
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="shopping-bag" class="h-8 w-8 text-muted-foreground"></i>
        </div>
        <p class="text-muted-foreground">Your cart is empty</p>
      </div>
    `;
  }

  const subtotal = cart.getSubtotal();
  const cgst = cart.getCGST();
  const sgst = cart.getSGST();
  const packagingCharge = cart.getPackagingCharge();
  const total = cart.getFinalTotal();

  return `
    <!-- Location Info -->
    <div class="bg-muted p-4 rounded-lg mb-6">
      <div class="flex items-center gap-2">
        <i data-lucide="map-pin" class="h-4 w-4 text-primary"></i>
        <span class="text-sm font-medium">Delivering to</span>
      </div>
      <p class="text-sm text-muted-foreground mt-1">Gurugram, Haryana</p>
    </div>

    <!-- Cart Items -->
    <div class="space-y-0 mb-6">
      ${items.map(createCartItem).join('')}
    </div>

    <!-- Bill Details -->
    <div class="border-t pt-6">
      <h3 class="font-semibold mb-4">Bill Details</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span>Item Total</span>
          <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-muted-foreground">
          <span>CGST (2.5%)</span>
          <span>₹${cgst.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-muted-foreground">
          <span>SGST (2.5%)</span>
          <span>₹${sgst.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-muted-foreground">
          <span>Packaging Charge</span>
          <span>₹${packagingCharge.toFixed(2)}</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button class="w-full mt-6 gradient-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity" onclick="handlePayment()">
        MAKE PAYMENT
      </button>
    </div>
  `;
}

function createProductCard(product) {
  const vegIndicator = product.isVeg
    ? '<div class="w-5 h-5 border-2 border-green-600 flex items-center justify-center"><div class="w-2.5 h-2.5 rounded-full bg-green-600"></div></div>'
    : '<div class="w-5 h-5 border-2 border-red-600 flex items-center justify-center"><div class="w-2.5 h-2.5 rounded-full bg-red-600"></div></div>';

  const originalPriceHTML = product.originalPrice
    ? `<span class="text-sm text-gray-400 line-through ml-2">₹${product.originalPrice}</span>`
    : '';

  const ratingHTML = product.rating
    ? `<div class="flex items-center gap-1 text-sm">
         <span class="text-yellow-500">⭐</span>
         <span class="font-medium">${product.rating}</span>
       </div>`
    : '';

  const servesHTML = product.serves
    ? `<span class="text-xs text-gray-500">Serves ${product.serves}</span>`
    : '';

  return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <!-- Product Image -->
      <div class="relative h-48 overflow-hidden bg-gray-100">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <!-- Veg/Non-veg Indicator -->
        <div class="absolute top-3 left-3 bg-white rounded p-1">
          ${vegIndicator}
        </div>
        ${product.customizable ? '<div class="absolute top-3 right-3 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">CUSTOMIZABLE</div>' : ''}
      </div>

      <!-- Product Details -->
      <div class="p-4">
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-bold text-gray-900 text-base leading-tight flex-1">${product.name}</h3>
          ${ratingHTML}
        </div>

        ${product.description ? `<p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>` : ''}

        <div class="flex items-center justify-between mb-3">
          <div class="flex items-baseline">
            <span class="text-lg font-bold text-gray-900">₹${product.price}</span>
            ${originalPriceHTML}
          </div>
          ${servesHTML}
        </div>

        <!-- Add to Cart Button -->
        <button
          onclick="cart.addItem(PRODUCTS.find(p => p.id === '${product.id}'))"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <i data-lucide="plus" class="h-4 w-4"></i>
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  `;
}

// Global helper functions

function navigateToCategory(categoryName) {
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  router.navigate(`category/${categorySlug}`);
}

function handlePayment() {
  cart.showToast('Payment feature coming soon!');
}