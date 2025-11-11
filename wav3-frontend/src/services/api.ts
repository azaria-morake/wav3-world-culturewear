import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // for cookies
});

export interface Collection {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  theme: string;
}

export interface Item {
  id: string;
  title: string;
  images: {
    front: string;
    back: string;
    label: string;
  };
  price: number;
  stock: number;
  sizes: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export const apiClient = {
  // Auth
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async login(email: string, password: string): Promise<User> {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  // Collections
  async getCollections(): Promise<Collection[]> {
    const response = await api.get('/api/collections');
    return response.data;
  },

  async getCollection(slug: string): Promise<Collection & { description: string; items: Item[] }> {
    const response = await api.get(`/api/collections/${slug}`);
    return response.data;
  },

  // Items
  async getItem(id: string): Promise<Item> {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  },

  // Wishlist
  async addToWishlist(itemId: string): Promise<void> {
    await api.post('/api/wishlist', { itemId });
  },

  async removeFromWishlist(itemId: string): Promise<void> {
    await api.delete(`/api/wishlist/${itemId}`);
  },

  // Cart
  async addToCart(itemId: string, quantity: number = 1, size?: string): Promise<void> {
    await api.post('/api/cart', { itemId, quantity, size });
  },

  async getCart(): Promise<any> {
    const response = await api.get('/api/cart');
    return response.data;
  },

  // Checkout
  async checkout(cartId: string, paymentMethod: string): Promise<{ orderId: string; status: string }> {
    const response = await api.post('/api/checkout', { cartId, paymentMethod });
    return response.data;
  },
};

export { api };