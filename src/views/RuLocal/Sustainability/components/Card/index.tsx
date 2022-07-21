import React from 'react';
import { cardList } from '../../mock';

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-cs-36 px-0 md:px-cs-200 gap-x-7">
      {cardList.map((item, index) => (
        <div
          className="max-w-full h-full md:max-w-cs-284 md:h-cs-409 shadow-sm px-cs-36 mt-cs-24 pt-cs-36"
          key={index}
        >
          <h3 className="text-20 font-medium text-cs-primary text-center mb-cs-16">
            {index + 1}.
          </h3>
          <p className="text-center text-16">
            <strong>{item.strong}</strong>
            {item.span}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;
