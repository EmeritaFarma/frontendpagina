import { create } from 'zustand'
import { Product } from '@/lib/types/product'

export interface CartItem extends Product {
  quantity: number,
  price:number,
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number,
  getTotalPriceWithoutDiscount: () => number,
  getProductInCart: (productId: number) => CartItem | null
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      
      
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        ),
      }
    }
    
      const price = product.priceDiscount > 0 ? product.priceDiscount : product.priceBase
  
      return {
        items: [...state.items, { ...product, quantity: 1 , price}],
      }
    })
  },

  removeItem: (productId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }))
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (quantity < 1) {
      get().removeItem(productId)
      return
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }))
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.priceBase * item.quantity,
      0
    )
  },

  getTotalPriceWithoutDiscount:() => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },
  getProductInCart: (productId: number) => {
    return get().items.find(item => item.id === productId) ?? null
  },
}))
