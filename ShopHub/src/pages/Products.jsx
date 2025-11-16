import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Products() {
  const { items, addToCart } = useAppContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = [...new Set(items.map((i) => i.category))];

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category ? item.category === category : true;
    const matchesMin = minPrice ? item.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? item.price <= Number(maxPrice) : true;
    return matchesSearch && matchesCat && matchesMin && matchesMax;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-xl font-bold text-indigo-600 mt-2">
              ${item.price}
            </p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}
    </div>
  );
}