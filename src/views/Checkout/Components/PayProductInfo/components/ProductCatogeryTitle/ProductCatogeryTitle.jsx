import React from 'react';

const ProductCatogeryTitle = ({ title, icon }) => {
  return (
    <div className="flex justify-between items-center pt-3">
      <p className="medium text-lg">{title}</p>
      {icon}
    </div>
  );
};

export default ProductCatogeryTitle;
