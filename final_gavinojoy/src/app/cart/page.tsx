"use client"
import Link from "next/link"
import { useProductContext } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useProductContext()

  const handleIncrement = (productId: string, currentQty: number, maxQty: number) => {
    if (currentQty < maxQty) {
      updateCartQuantity(productId, currentQty + 1)
    }
  }

  const handleDecrement = (productId: string, currentQty: number) => {
    if (currentQty > 1) {
      updateCartQuantity(productId, currentQty - 1)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.category}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">each</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => handleDecrement(item.id, item.cartQuantity)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.cartQuantity}</span>
                          <button
                            onClick={() => handleIncrement(item.id, item.cartQuantity, item.quantity)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-primary">
                            ${(item.price * item.cartQuantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.cartQuantity}
                      </span>
                      <span className="font-medium">${(item.price * item.cartQuantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">Proceed to Checkout</Button>

                <Link href="/" className="w-full block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  )
}
