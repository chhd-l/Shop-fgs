import React, { useEffect, useState } from 'react';
import ProductCarousel from '@/components/ProductCarousel';
import { getGoodsRelation } from '@/api/details';

interface Props {
  id: string;
}

const HandledRelateProductCarousel = ({ id }: Props) => {
  const [relatedGoodsList, setRelatedGoodsList] = useState([]);

  const getRelatedGoodsList = async (id: any) => {
    try {
      //this.setState({relatedGoodsLoading:true})
      const res = await getGoodsRelation(id);
      let relatedGoodsList = (res as any).context.goods;
      console.log(relatedGoodsList, 'relatedGoodsList');
      setRelatedGoodsList(relatedGoodsList);
    } catch (err) {
      console.log(111111, (err as any).message);
    } finally {
      //this.setState({relatedGoodsLoading:false})
    }
  };

  useEffect(() => {
    if (id) {
      //获取推荐产品start
      getRelatedGoodsList(id);
      //获取推荐产品end
    }
  }, [id]);
  return relatedGoodsList.length > 0 ? (
    <ProductCarousel goodsList={relatedGoodsList} />
  ) : null;
};
export default HandledRelateProductCarousel;
