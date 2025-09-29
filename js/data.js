// Product data for the food ordering app
const PRODUCTS = [
  {
    id: "1",
    name: "Hyderabadi Chicken Dum Biryani Boneless",
    price: 349,
    originalPrice: 479,
    image: "src/assets/biryani-hero.jpg",
    category: "Biryani",
    isVeg: false,
    rating: 4.5,
    description: "Aromatic basmati rice cooked with tender boneless chicken in traditional Hyderabadi style with saffron and authentic spices",
    customizable: true,
    serves: "1-2"
  },
  {
    id: "2", 
    name: "Chicken Seekh Kebab Half",
    price: 199,
    image: "src/assets/chicken-kebab.jpg",
    category: "Starters",
    isVeg: false,
    rating: 4.3,
    description: "Juicy chicken seekh kebabs grilled to perfection with aromatic spices and served with mint chutney",
    serves: "1"
  },
  {
    id: "3",
    name: "Fiery Chicken 65 Half",
    price: 189,
    image: "src/assets/chicken-65.jpg",
    category: "Starters", 
    isVeg: false,
    rating: 4.4,
    description: "Spicy and crispy chicken 65 pieces with South Indian flavors, curry leaves and green chilies",
    customizable: true,
    serves: "1"
  },
  {
    id: "4",
    name: "Chicken Shammi Kebab 4 Pcs",
    price: 139,
    image: "src/assets/chicken-kebab.jpg",
    category: "Starters",
    isVeg: false,
    rating: 4.2,
    description: "Soft and flavorful chicken shammi kebabs made with lentils and spices"
  },
  {
    id: "5",
    name: "Galouti Kebab 4 Pcs", 
    price: 209,
    image: "src/assets/chicken-kebab.jpg",
    category: "Starters",
    isVeg: false,
    rating: 4.6,
    description: "Melt-in-mouth galouti kebabs with authentic Lucknowi flavors"
  },
  {
    id: "6",
    name: "Fiery Potato 65 Half",
    price: 129,
    image: "src/assets/chicken-65.jpg",
    category: "Starters",
    isVeg: true,
    rating: 4.1,
    description: "Crispy potato wedges tossed in spicy South Indian masala"
  },
  {
    id: "7",
    name: "Jeera Raita",
    price: 19,
    image: "src/assets/jeera-raita.jpg",
    category: "Sides",
    isVeg: true,
    rating: 4.0,
    description: "Refreshing yogurt raita flavored with roasted cumin seeds"
  },
  {
    id: "8",
    name: "Pepsi 400ml",
    price: 19.05,
    image: "src/assets/jeera-raita.jpg", // placeholder
    category: "Beverages",
    isVeg: true,
    rating: 4.0,
    description: "Chilled Pepsi to complement your meal"
  }
];

const CATEGORY_CARDS = [
  {
    category: "Hyderabadi & Lucknowi Dum Biryanis",
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    itemCount: 12,
    description: "Authentic royal recipes"
  },
  {
    category: "Biryani Thalis",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    itemCount: 8,
    description: "Complete meal experience"
  },
  {
    category: "Celebration Handi Biryanis",
    image: "https://images.pexels.com/photos/1437316/pexels-photo-1437316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    itemCount: 6,
    description: "Perfect for special occasions"
  },
  {
    category: "Supersaver Mini Biryanis Starting @ Rs.99/-",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    itemCount: 10,
    description: "Budget-friendly options"
  }
];

// Export for use in other files
window.PRODUCTS = PRODUCTS;
window.CATEGORY_CARDS = CATEGORY_CARDS;