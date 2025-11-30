"use client"

import type React from "react"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isLowStock = product.quantity < 5

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="relative w-full h-48 mb-4 bg-muted rounded-md overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm font-medium text-accent-foreground bg-accent px-2 py-1 rounded">
              ★ {product.rating}
            </span>
          </div>
          {isLowStock && (
            <div className="bg-destructive/10 text-destructive text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              Low Stock ({product.quantity})
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
