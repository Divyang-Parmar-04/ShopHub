# ShopNow – React + Tailwind E-Commerce App (Local JSON Storage)

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **fully functional e-commerce web application** built with **React**, **Tailwind CSS**, and **React Router**.  
All data (users, products, cart, orders) is stored in **`localStorage`** as JSON — **no backend or database required**.

Perfect for learning React Context, routing, state management, and Tailwind CSS.

---

## Live Demo (Local)

After setup, open:  
[http://localhost:3000](http://localhost:3000)

---

## Features

| Feature | Description |
|-------|-------------|
| **Login / Logout** | Secure login with role-based access |
| **Product Catalog** | Search, filter by category & price |
| **Shopping Cart** | Add, update quantity, remove items |
| **Checkout** | Place order with total calculation |
| **Admin Panel** | Add products, view & delete orders |
| **Responsive Design** | Mobile-first UI with Tailwind |
| **Zero Backend** | Uses `localStorage` as JSON DB |

---

## Screenshots

*(Add screenshots here on GitHub)*  
- Login Page  
- Product Grid with Filters  
- Shopping Cart  
- Admin Panel  

---

## Tech Stack

- **React 18** – UI Library
- **React Router v6** – Navigation
- **Tailwind CSS** – Styling
- **Context API** – Global State Management
- **localStorage** – Persistent JSON Storage

---

## Project Structure

```
src/
 ├─ components/     → Navbar
 ├─ context/        → AppContext.js (global state)
 ├─ pages/          → Login, Products, Cart, Checkout, Admin
 ├─ utils/          → initData.js (sync localStorage init)
 ├─ App.jsx
 └─ index.js
```

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shopnow.git
cd shopnow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configure Tailwind (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### 5. Replace `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Critical Setup: Fix First-Time Login

> **Problem**: Login fails on first load because `localStorage` is empty.  
> **Solution**: `initData.js` **must initialize data synchronously**.

### File: `src/utils/initData.js`

```js
// Initializes default users & products on first load
(() => {
  const init = (key, fallback) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(fallback));
    }
  };
  init('users', [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user',  password: 'user123',  role: 'user' }
  ]);
  init('items', [
    { id: 1, name: 'MacBook Pro', price: 1999, category: 'Electronics' },
    { id: 2, name: 'iPhone 15',   price: 999,  category: 'Electronics' },
    { id: 3, name: 'T-Shirt',     price: 25,   category: 'Clothing' },
    { id: 4, name: 'Jeans',       price: 79,   category: 'Clothing' },
    { id: 5, name: 'Coffee Mug',  price: 12,   category: 'Home' },
    { id: 6, name: 'Desk Lamp',   price: 45,   category: 'Home' }
  ]);
  init('orders', []);
})();
```

### Import in `src/index.js` (MUST BE FIRST)

```js
import './utils/initData'; // ← Critical: Runs before React mounts
```

---

## Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Login Credentials

| Username | Password     | Role  |
|----------|--------------|-------|
| `admin`  | `admin123`   | Admin |
| `user`   | `user123`    | User  |

---

## How Data is Stored (`localStorage`)

| Key | Purpose |
|-----|--------|
| `users` | All registered users |
| `items` | All products |
| `orders` | All completed orders |
| `currentUser` | Logged-in user |
| `cart_<userId>` | Per-user cart |

---

## Reset Data (Clear Everything)

Run in **browser console**:

```js
localStorage.clear();
location.reload();
```

→ App will reinitialize with default data.

---

## Common Issues & Fixes

| Issue | Solution |
|------|----------|
| **"Invalid username or password" on first load** | Ensure `initData.js` is imported **first** in `index.js` |
| **Cart not saving after refresh** | Each user has separate cart: `cart_1`, `cart_2` |
| **Login fails after code change** | Clear `localStorage` and reload |
| **Tailwind styles not working** | Run `npm run build` or restart dev server |

---

## Future Enhancements

- [ ] User registration
- [ ] Product images & details page
- [ ] Pagination for products
- [ ] Order history per user
- [ ] Export orders to JSON/CSV
- [ ] Deploy to Vercel/Netlify

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) for details.

---

## Author

**Built with love by [Your Name]**  
Powered by [xAI Grok](https://x.ai)

---

**Start shopping!**  
Add items to cart, checkout, and try the admin panel with `admin/admin123`.

--- 

*Happy Coding!*
