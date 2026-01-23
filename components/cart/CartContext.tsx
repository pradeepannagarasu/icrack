"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem, Cart, getCart, saveCart, addToCart as addItem, removeFromCart as removeItem, updateCartItemQuantity as updateQuantity, clearCart as clear, getCartTotal, getCartItemCount } from "@/lib/cart";

interface CartContextType {
  cart: Cart;
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string, details?: any) => void;
  updateQuantity: (itemId: string, quantity: number, details?: any) => void;
  clearCart: () => void;
  setEmail: (email: string) => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], createdAt: new Date().toISOString() });

  const refreshCart = () => {
    const updatedCart = getCart();
    setCart(updatedCart);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    addItem(item);
    refreshCart();
  };

  const removeFromCart = (itemId: string, details?: any) => {
    removeItem(itemId, details);
    refreshCart();
  };

  const updateCartItemQuantity = (itemId: string, quantity: number, details?: any) => {
    updateQuantity(itemId, quantity, details);
    refreshCart();
  };

  const clearCartItems = () => {
    clear();
    refreshCart();
  };

  const setEmail = (email: string) => {
    const updatedCart = { ...cart, email };
    saveCart(updatedCart);
    setCart(updatedCart);
  };

  const value: CartContextType = {
    cart,
    items: cart.items,
    itemCount: getCartItemCount(),
    total: getCartTotal(),
    addToCart,
    removeFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart: clearCartItems,
    setEmail,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

