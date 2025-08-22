import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import H1 from '../images/H1.jpg';
import H2 from '../images/H2.jpg';
import H3 from '../images/H3.jpg';
import H4 from '../images/H4.jpg';
import H5 from '../images/H5.jpg';
import H6 from '../images/H6.jpg';
import H7 from '../images/H7.jpg';
import H8 from '../images/H8.jpg';

const productDatas = [
  { name: 'Mobile', image: H1, rating: 4.5, price: '₹25,000', description: 'Latest smartphone with high performance.' },
  { name: 'Watch', image: H2, rating: 3.8, price: '₹5,999', description: 'Stylish and durable wrist watch.' },
  { name: 'Mobile', image: H3, rating: 3.5, price: '₹18,000', description: 'Affordable mobile with great features.' },
  { name: 'Speaker', image: H4, rating: 4.6, price: '₹3,200', description: 'Wireless speaker with deep bass.' },
  { name: 'Apple Watch', image: H5, rating: 4.1, price: '₹32,000', description: 'Premium smartwatch from Apple.' },
  { name: 'Headset', image: H6, rating: 3.9, price: '₹2,499', description: 'Noise-cancelling over-ear headphones.' },
  { name: 'Electric Mug', image: H7, rating: 3.6, price: '₹1,200', description: 'Smart mug that keeps your drink hot.' },
  { name: 'Selfie Sticks', image: H8, rating: 4.5, price: '₹499', description: 'Extendable selfie stick with remote.' },
];

function HomeProducts() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 ml-13 mt-7 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {productDatas?.map?.((products, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 hover:scale-[1.01] w-56">
          <div className="h-34 w-full overflow-hidden rounded-md">
            <img
              src={products?.image}
              alt={products?.name}
              className="h-full w-full " />
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-sm font-semibold text-[#1C1C1C]">{products?.name}</p>
            <div className="bg-green-800 text-white text-xs px-1 py-[2px] rounded">
              {products?.rating}⭐
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-1">{products?.description}</p>
          <p className="text-sm font-semibold text-[#1C1C1C] mt-1">{products?.price}</p>

          <button
            onClick={() => addToCart(products)}
            className="mt-2 w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-xs py-1 rounded-md">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeProducts;









