"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useProductContext } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { products, addToCart } = useProductContext()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-lg text-muted-foreground">Product not found</p>
      </main>
    )
  }

  const isLowStock = product.quantity < 5
  const isOutOfStock = product.quantity === 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-sm text-muted-foreground">
            Product ID: <span className="font-mono">{product.id}</span>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-xl font-medium text-accent-foreground bg-accent px-3 py-1 rounded-full">
              ★ {product.rating}
            </span>
          </div>

          {isLowStock && (
            <div className="bg-destructive/10 text-destructive font-semibold px-4 py-2 rounded-md mb-6">
              ⚠️ Low Stock - Only {product.quantity} left!
            </div>
          )}

          {isOutOfStock && (
            <div className="bg-destructive/10 text-destructive font-semibold px-4 py-2 rounded-md mb-6">
              ❌ Out of Stock
            </div>
          )}

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <h3 className="font-semibold mb-3">Specifications</h3>
              <p className="text-muted-foreground mb-6">{product.specification}</p>

              <h3 className="font-semibold mb-3">Category</h3>
              <p className="text-muted-foreground mb-6">{product.category}</p>
            </CardContent>
          </Card>

          {!isOutOfStock && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity === 1}
                    className="px-4 py-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.quantity}
                    className="px-4 py-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
