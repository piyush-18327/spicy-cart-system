// Reusable component functions for generating HTML

function createCategoryCard(categoryCard) {
  return `
    <div class="group overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 cursor-pointer rounded-xl bg-card" onclick="navigateToCategory('${categoryCard.category}')">
      <div class="relative overflow-hidden h-64">
        <img
          src="${categoryCard.image}"
          alt="${categoryCard.category}"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <h3 class="font-bold text-xl mb-2 leading-tight">${categoryCard.category}</h3>
          <p class="text-sm opacity-90 mb-1">${categoryCard.description}</p>
          <p class="text-xs opacity-75">${categoryCard.itemCount} varieties available</p>
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

// Global helper functions

function handlePayment() {
  cart.showToast('Payment feature coming soon!');
}