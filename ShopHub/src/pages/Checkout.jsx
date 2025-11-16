import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Checkout() {
  const { cart, placeOrder } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePurchase = () => {
    placeOrder();
    alert('Purchase completed successfully!');
    navigate('/products');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="mb-6">
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between py-1">
              <span>
                {i.name} x {i.quantity}
              </span>
              <span>${i.price * i.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-2 font-bold text-lg">
            Total: ${total}
          </div>
        </div>
        <button
          onClick={handlePurchase}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
}