export interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  description: string
  specification: string
  rating: number
  image: string
}

export interface CartItem extends Product {
  cartQuantity: number
}
