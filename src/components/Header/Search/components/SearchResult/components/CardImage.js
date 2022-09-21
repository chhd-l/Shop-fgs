import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardImage.less';

const CardImage = ({ fullImage = false, item = {} }) => {
  const history = useHistory();

  const handleClickItem = () => {
    history.push({
      pathname: `/${item.lowGoodsName.split(' ').join('-').replace('/', '')}-${
        item.goodsNo
      }`,
      state: {
        GAListParam: 'Search Results'
      }
    });
  };

  return (
    <div
      className={`search-card-image-box ${
        fullImage ? 'search-card-image-full' : ''
      }`}
    >
      <div
        onClick={handleClickItem}
        className="search-card-image-wrap ui-cursor-pointer"
      >
        <div className="card-image-content">
          <img src={item.img} alt="" />
        </div>
        <div className="card-image-title">{item.title}</div>
        <div className="card-image-desc">{item.desc}</div>
      </div>
    </div>
  );
};

export default CardImage;
