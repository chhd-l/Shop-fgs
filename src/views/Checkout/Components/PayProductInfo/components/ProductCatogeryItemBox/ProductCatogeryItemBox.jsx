import React from 'react';

const ProductCatogeryItemBox = ({ children }) => {
  return (
    <div className="product-catogery-item">
      <div className="px-5">{children}</div>
    </div>
  );
};

export default ProductCatogeryItemBox;
