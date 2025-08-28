import biryaniHero from "@/assets/biryani-hero.jpg";
import chickenKebab from "@/assets/chicken-kebab.jpg";
import chicken65 from "@/assets/chicken-65.jpg";
import jeeraRaita from "@/assets/jeera-raita.jpg";

export const products = [
  {
    id: "1",
    name: "Hyderabadi Chicken Dum Biryani Boneless",
    price: 349,
    originalPrice: 479,
    image: biryaniHero,
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
    image: chickenKebab,
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
    image: chicken65,
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
    image: chickenKebab,
    category: "Starters",
    isVeg: false,
    rating: 4.2,
    description: "Soft and flavorful chicken shammi kebabs made with lentils and spices"
  },
  {
    id: "5",
    name: "Galouti Kebab 4 Pcs", 
    price: 209,
    image: chickenKebab,
    category: "Starters",
    isVeg: false,
    rating: 4.6,
    description: "Melt-in-mouth galouti kebabs with authentic Lucknowi flavors"
  },
  {
    id: "6",
    name: "Fiery Potato 65 Half",
    price: 129,
    image: chicken65,
    category: "Starters",
    isVeg: true,
    rating: 4.1,
    description: "Crispy potato wedges tossed in spicy South Indian masala"
  },
  {
    id: "7",
    name: "Jeera Raita",
    price: 19,
    image: jeeraRaita,
    category: "Sides",
    isVeg: true,
    rating: 4.0,
    description: "Refreshing yogurt raita flavored with roasted cumin seeds"
  },
  {
    id: "8",
    name: "Pepsi 400ml",
    price: 19.05,
    image: jeeraRaita, // placeholder
    category: "Beverages",
    isVeg: true,
    rating: 4.0,
    description: "Chilled Pepsi to complement your meal"
  }
];