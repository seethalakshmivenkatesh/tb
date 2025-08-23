import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Cart - To Buy Products Later</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow-sm flex gap-4">
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-600 text-sm mt-2 cursor-pointer hover:text-red-800">
                x
              </button>

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"/>

              <div className="flex justify-between flex-1">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    ₹{parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity}
                  </p>

                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button onClick={() => decreaseQuantity(item.name)} className="px-2 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.name)} className="px-2 bg-gray-200 rounded">+</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;

