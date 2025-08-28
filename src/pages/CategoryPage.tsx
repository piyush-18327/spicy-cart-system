import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductDetailCard } from "@/components/ProductDetailCard";
import { CartBottomBar } from "@/components/CartBottomBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Search } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { addItem, updateQuantity, items } = useCart();
  const [vegOnly, setVegOnly] = useState(false);

  const categoryProducts = products.filter(product => {
    const matchesCategory = product.category.toLowerCase() === categoryName?.toLowerCase();
    const matchesVeg = !vegOnly || product.isVeg;
    return matchesCategory && matchesVeg;
  });

  const categoryDisplayName = categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {categoryDisplayName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {categoryProducts.length} items available
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Veg Only</span>
                <Switch
                  checked={vegOnly}
                  onCheckedChange={setVegOnly}
                />
              </div>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Category Title with underline */}
          <div className="relative">
            <h2 className="text-lg font-semibold text-foreground pb-2">
              {categoryDisplayName}
            </h2>
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-destructive"></div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="container mx-auto px-4 py-6 space-y-4">
        {categoryProducts.map((product) => (
          <ProductDetailCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
            onUpdateQuantity={updateQuantity}
            cartItems={items}
          />
        ))}
        
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {vegOnly 
                ? "No vegetarian items available in this category" 
                : "No items found in this category"
              }
            </p>
          </div>
        )}
      </div>

      <CartBottomBar />
    </div>
  );
};

export default CategoryPage;