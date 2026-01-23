// Cart types and utilities
export interface CartItem {
  id: string;
  type: "repair" | "refurbished" | "accessory";
  name: string;
  price: number;
  quantity: number;
  image?: string;
  details?: {
    brand?: string;
    device?: string;
    repairType?: string;
    storage?: string;
    color?: string;
    variant?: string;
  };
}

export interface Cart {
  items: CartItem[];
  email?: string;
  createdAt: string;
}

const CART_STORAGE_KEY = "icrack_cart";

export function getCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], createdAt: new Date().toISOString() };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
  }

  return { items: [], createdAt: new Date().toISOString() };
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

export function addToCart(item: Omit<CartItem, "quantity">): void {
  const cart = getCart();
  const existingItem = cart.items.find(
    (i) =>
      i.id === item.id &&
      i.type === item.type &&
      JSON.stringify(i.details) === JSON.stringify(item.details)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(itemId: string, details?: any): void {
  const cart = getCart();
  cart.items = cart.items.filter((item) => {
    if (item.id !== itemId) return true;
    if (details && JSON.stringify(item.details) !== JSON.stringify(details)) {
      return true;
    }
    return false;
  });
  saveCart(cart);
}

export function updateCartItemQuantity(
  itemId: string,
  quantity: number,
  details?: any
): void {
  const cart = getCart();
  const item = cart.items.find((i) => {
    if (i.id !== itemId) return false;
    if (details && JSON.stringify(i.details) !== JSON.stringify(details)) {
      return false;
    }
    return true;
  });

  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId, details);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

export function clearCart(): void {
  saveCart({ items: [], createdAt: new Date().toISOString() });
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}

