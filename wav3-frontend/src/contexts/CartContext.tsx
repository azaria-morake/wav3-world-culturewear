import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiClient } from '../services/api';

interface CartItem {
  itemId: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (itemId: string, size?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      const cartData = await apiClient.getCart();
      setItems(cartData.items || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const addItem = async (itemId: string, size?: string) => {
    try {
      if (isAuthenticated) {
        await apiClient.addToCart(itemId, 1, size);
        await loadCart(); // Reload cart from server
      } else {
        // Local cart for unauthenticated users
        setItems(prev => {
          const existing = prev.find(item => item.itemId === itemId && item.size === size);
          if (existing) {
            return prev.map(item =>
              item.itemId === itemId && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prev, { itemId, quantity: 1, size }];
        });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    // Implementation for remove item
    setItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    // Implementation for update quantity
    setItems(prev =>
      prev.map(item =>
        item.itemId === itemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};