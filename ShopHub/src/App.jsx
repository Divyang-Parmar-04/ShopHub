import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { useAppContext } from './context/AppContext';

export default function App() {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={user ? <Products /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={user ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              user && user.role === 'admin' ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </main>
    </div>
  );
}