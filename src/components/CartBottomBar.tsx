import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";

export const CartBottomBar = () => {
  const { items, getTotal, getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] border-t">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="w-full h-14 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between text-base font-medium"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {getItemCount()}
                </Badge>
              </div>
              <span>{getItemCount()} item{getItemCount() !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span>₹{getTotal().toFixed(2)}</span>
              <span className="text-sm opacity-90">VIEW CART</span>
            </div>
          </Button>
        </div>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};