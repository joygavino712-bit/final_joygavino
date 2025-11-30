"use client"

import type React from "react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useProductContext } from "@/lib/context"
import Link from "next/link"
import { ShoppingCart, Trash2 } from "lucide-react"

export const CartDropdown: React.FC = () => {
  const { cart, removeFromCart, getCartTotal } = useProductContext()
  const [open, setOpen] = useState(false)

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full">
              {cart.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b pb-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.cartQuantity} × ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        ${(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-destructive hover:text-destructive/80 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="pt-4">
                <div className="flex justify-between items-center mb-4 font-semibold">
                  <span>Total:</span>
                  <span className="text-xl text-primary">${getCartTotal().toFixed(2)}</span>
                </div>
                <Link href="/cart" onClick={() => setOpen(false)} className="w-full block">
                  <Button className="w-full bg-primary hover:bg-primary/90">View All Items</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
