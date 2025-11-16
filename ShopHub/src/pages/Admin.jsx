import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Admin() {
  const { items, orders, addProduct, deleteOrder } = useAppContext();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct({ name, price: Number(price), category });
    setName('');
    setPrice('');
    setCategory('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Add Product */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      </div>

      {/* Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded p-4 flex justify-between items-start"
              >
                <div>
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <ul className="mt-2 list-disc list-inside">
                    {order.items.map((i) => (
                      <li key={i.id}>
                        {i.name} x {i.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}