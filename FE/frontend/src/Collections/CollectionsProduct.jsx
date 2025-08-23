import React from 'react';
import ProductCard from './ProductCard';

function CollectionsProduct({ data }) {
  return (
    <div>
      <h1 className="text-2xl mt-4">Fire Collections of Shopping Time</h1>
      <p className="text-red-400">It's RCB time ❤️‍🔥</p>
      <div className="grid grid-cols-1 ml-13 mt-7 sm:grid-cols-3 md:grid-cols-4 gap-4">

        {data.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CollectionsProduct;
