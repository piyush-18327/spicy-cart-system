import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export const CartDrawer = () => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCart();

  const subtotal = getTotal();
  const cgst = subtotal * 0.025; // 2.5%
  const sgst = subtotal * 0.025; // 2.5%
  const packagingCharge = 39;
  const totalAmount = subtotal + cgst + sgst + packagingCharge;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-[var(--shadow-strong)] bg-[var(--gradient-primary)] hover:bg-primary-hover z-50"
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">My Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    Your location: Sector 59, Gurugram, Haryana, India
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    Pickup from: SCO No- 38, 2nd Floor, Block -B, Sector - 56, Gurugram
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-4">Items in cart</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Serves 1 (3 Pcs)
                          </p>
                          <p className="font-semibold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <h3 className="font-semibold mb-3">Bill details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Item Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CGST</span>
                      <span>₹{cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST</span>
                      <span>₹{sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packaging Charge</span>
                      <span>₹{packagingCharge}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>To Pay</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[var(--gradient-primary)] hover:bg-primary-hover shadow-[var(--shadow-soft)] h-12 text-base font-semibold"
                  disabled={items.length === 0}
                >
                  MAKE PAYMENT
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};