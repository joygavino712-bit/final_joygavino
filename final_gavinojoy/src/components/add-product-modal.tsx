"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useProductContext } from "@/lib/context"
import type { Product } from "@/lib/types"
import { CATEGORIES } from "@/lib/constants"

interface FormData {
  name: string
  category: string
  price: string
  quantity: string
  description: string
  specification: string
  rating: string
  image: string
}

export const AddProductModal: React.FC = () => {
  const { addProduct } = useProductContext()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "Electronics",
    price: "",
    quantity: "",
    description: "",
    specification: "",
    rating: "",
    image: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.quantity || Number.parseInt(formData.quantity) < 0) newErrors.quantity = "Valid quantity is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.specification.trim()) newErrors.specification = "Specification is required"
    if (!formData.rating || Number.parseFloat(formData.rating) < 0 || Number.parseFloat(formData.rating) > 5)
      newErrors.rating = "Rating must be between 0 and 5"
    if (!formData.image.trim()) newErrors.image = "Product image URL is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      quantity: Number.parseInt(formData.quantity),
      description: formData.description,
      specification: formData.specification,
      rating: Number.parseFloat(formData.rating),
      image: formData.image,
    }

    addProduct(newProduct)
    setFormData({
      name: "",
      category: "Electronics",
      price: "",
      quantity: "",
      description: "",
      specification: "",
      rating: "",
      image: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">+ Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in all fields to add a new product to the catalog.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat === "All" ? "Electronics" : cat}>
                  {cat === "All" ? "Electronics" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Product Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            />
            {errors.image && <p className="text-destructive text-sm mt-1">{errors.image}</p>}
            {formData.image && (
              <div className="mt-2 w-full h-32 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
              />
              {errors.price && <p className="text-destructive text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
              />
              {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Rating (0-5) *</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              step="0.1"
              min="0"
              max="5"
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            />
            {errors.rating && <p className="text-destructive text-sm mt-1">{errors.rating}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            />
            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Specification *</label>
            <textarea
              name="specification"
              value={formData.specification}
              onChange={handleChange}
              placeholder="Enter product specifications"
              rows={3}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            />
            {errors.specification && <p className="text-destructive text-sm mt-1">{errors.specification}</p>}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Product
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
