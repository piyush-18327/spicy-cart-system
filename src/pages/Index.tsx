import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import biryaniHero from "@/assets/biryani-hero.jpg";
import chickenKebab from "@/assets/chicken-kebab.jpg";
import chicken65 from "@/assets/chicken-65.jpg";
import jeeraRaita from "@/assets/jeera-raita.jpg";

const Index = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Biryani", "Starters", "Sides", "Beverages"];

  const categoryCards = [
    {
      category: "Biryani",
      image: biryaniHero,
      itemCount: products.filter(p => p.category === "Biryani").length,
      description: "Traditional Hyderabadi flavors"
    },
    {
      category: "Starters", 
      image: chickenKebab,
      itemCount: products.filter(p => p.category === "Starters").length,
      description: "Grilled to perfection"
    },
    {
      category: "Sides",
      image: jeeraRaita, 
      itemCount: products.filter(p => p.category === "Sides").length,
      description: "Perfect accompaniments"
    },
    {
      category: "Beverages",
      image: jeeraRaita,
      itemCount: products.filter(p => p.category === "Beverages").length,
      description: "Refreshing drinks"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                Biryani Blues
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Gurugram</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>30-40 mins</span>
                </div>
              </div>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">
              ⭐ 4.3 (1K+ reviews)
            </Badge>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={biryaniHero}
          alt="Delicious Biryani"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-lg">
              <h2 className="text-3xl font-bold mb-2">
                Authentic Hyderabadi Flavors
              </h2>
              <p className="text-lg opacity-90">
                Experience the rich taste of traditional biryani and kebabs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categoryCards.map((categoryCard) => (
            <CategoryCard
              key={categoryCard.category}
              category={categoryCard.category}
              image={categoryCard.image}
              itemCount={categoryCard.itemCount}
              description={categoryCard.description}
            />
          ))}
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No dishes found matching your search.</p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Index;
