import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isVeg?: boolean;
  rating?: number;
  description?: string;
  customizable?: boolean;
  serves?: string;
}

interface ProductDetailCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  cartItems: CartItem[];
}

export const ProductDetailCard = ({ 
  product, 
  onAddToCart, 
  onUpdateQuantity,
  cartItems 
}: ProductDetailCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity === 0) {
      onUpdateQuantity(product.id, 0);
    } else if (quantity === 0) {
      handleAddToCart();
    } else {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const truncatedDescription = product.description && product.description.length > 80
    ? product.description.substring(0, 80) + "..."
    : product.description;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-medium)] border-border/50">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-1 left-1">
              <div className={`w-3 h-3 rounded-full border-2 ${
                product.isVeg 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-red-500 border-red-600'
              }`} />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2 mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm leading-tight">
                  {product.name}
                </h3>
                {product.serves && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Serves {product.serves}
                  </p>
                )}
              </div>
              
              {/* Quantity Controls or Add Button */}
              <div className="flex-shrink-0">
                {quantity > 0 ? (
                  <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityUpdate(quantity - 1)}
                      className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityUpdate(quantity + 1)}
                      className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    size="sm"
                    className="h-8 px-3 text-xs bg-primary hover:bg-primary/90"
                  >
                    ADD
                  </Button>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="text-xs text-muted-foreground">
                <p>
                  {showFullDescription ? product.description : truncatedDescription}
                  {product.description.length > 80 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-primary ml-1 underline"
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            )}

            {/* Customizable Badge */}
            {product.customizable && (
              <Badge variant="outline" className="mt-2 text-xs">
                Customizable
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};