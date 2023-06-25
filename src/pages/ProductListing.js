import React from 'react';
import ProductCard from './ProductCard';

const ProductListing = ({ products }) => {
  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="product-cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;