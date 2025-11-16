// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const defaultUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user',  password: 'user123',  role: 'user' },
];

const defaultItems = [
  { id: 1, name: 'MacBook Pro', price: 1999, category: 'Electronics' },
  { id: 2, name: 'iPhone 15',   price: 999,  category: 'Electronics' },
  { id: 3, name: 'T-Shirt',     price: 25,   category: 'Clothing' },
  { id: 4, name: 'Jeans',       price: 79,   category: 'Clothing' },
  { id: 5, name: 'Coffee Mug',  price: 12,   category: 'Home' },
  { id: 6, name: 'Desk Lamp',   price: 45,   category: 'Home' },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // NEW

  // ---------- LOAD / INIT ----------
  useEffect(() => {
    const init = (key, fallback) => {
      const stored = localStorage.getItem(key);
      if (!stored) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(stored);
    };

    const storedUsers = init('users', defaultUsers);
    const storedItems = init('items', defaultItems);
    const storedOrders = init('orders', []);

    setUsers(storedUsers);
    setItems(storedItems);
    setOrders(storedOrders);

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      const userCart = JSON.parse(localStorage.getItem(`cart_${storedUser.id}`) || '[]');
      setCart(userCart);
    }

    setIsLoading(false); // Data is ready
  }, []);

  // ---------- PERSIST ----------
  useEffect(() => {
    if (!isLoading) localStorage.setItem('users', JSON.stringify(users));
  }, [users, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem('items', JSON.stringify(items));
  }, [items, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user) localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [user, cart, isLoading]);

  // ---------- AUTH ----------
  const login = (username, password) => {
    if (isLoading) return false;

    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      const userCart = JSON.parse(localStorage.getItem(`cart_${found.id}`) || '[]');
      setCart(userCart);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (user) localStorage.removeItem(`cart_${user.id}`);
    setUser(null);
    setCart([]);
  };

  // ---------- CART ----------
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  // ---------- ORDER ----------
  const placeOrder = () => {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      items: cart,
      total,
      date: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
    setCart([]);
  };

  // ---------- ADMIN ----------
  const addProduct = (newItem) => {
    setItems(prev => [...prev, { id: Date.now(), ...newItem }]);
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <AppContext.Provider
      value={{
        user, login, logout,
        cart, addToCart, updateQuantity, removeFromCart,
        placeOrder,
        items, orders,
        addProduct, deleteOrder,
        isLoading, // Expose loading state
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);