import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">Your cart is empty</p>
        <Link
          to="/products"
          className="mt-4 inline-block text-indigo-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price} each</p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <span className="text-xl font-bold">Total: ${total}</span>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}