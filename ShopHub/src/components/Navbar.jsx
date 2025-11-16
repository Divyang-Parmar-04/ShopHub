import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/products" className="text-xl font-bold text-indigo-600">
          ShopHub
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                {user.username} ({user.role})
              </span>
              <Link to="/cart" className="text-indigo-600 hover:underline">
                Cart
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-indigo-600 hover:underline">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}