// Cart management system
class CartManager {
  constructor() {
    this.items = this.loadFromStorage();
    this.listeners = [];
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('biryani-blues-cart');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('biryani-blues-cart', JSON.stringify(this.items));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveToStorage();
    this.showToast(`${product.name} added to cart`);
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
  }

  removeItem(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveToStorage();
      this.showToast(`${item.name} removed from cart`);
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getSubtotal() {
    return this.getTotal();
  }

  getCGST() {
    return this.getSubtotal() * 0.025; // 2.5%
  }

  getSGST() {
    return this.getSubtotal() * 0.025; // 2.5%
  }

  getPackagingCharge() {
    return this.items.length > 0 ? 5 : 0;
  }

  getFinalTotal() {
    return this.getSubtotal() + this.getCGST() + this.getSGST() + this.getPackagingCharge();
  }

  showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'bg-card border border-border text-card-foreground px-4 py-3 rounded-lg shadow-medium toast-enter';
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i data-lucide="check-circle" class="h-4 w-4 text-success"></i>
        <span class="text-sm font-medium">${message}</span>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Initialize Lucide icons in the toast
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Create global cart instance
window.cart = new CartManager();