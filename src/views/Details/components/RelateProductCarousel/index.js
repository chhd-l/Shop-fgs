import React, { useEffect, useState } from 'react';
import RelateProductCarousel from '@/components/RelateProductCarousel';
import { getGoodsRelation } from '@/api/details';
import getTechnologyOrBreedsAttr from '@/lib/get-technology-or-breedsAttr';
interface Props {
  id: string;
}

const HandledRelateProductCarousel = ({ id }: Props) => {
  const [relatedGoodsList, setRelatedGoodsList] = useState([]);

  const getRelatedGoodsList = async (id) => {
    try {
      //this.setState({relatedGoodsLoading:true})
      const res = await getGoodsRelation(id);
      let relatedGoodsList = res.context.goods;
      console.log(relatedGoodsList, 'relatedGoodsList');
      setRelatedGoodsList(relatedGoodsList);
    } catch (err) {
      console.log(111111, err.message);
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
    <RelateProductCarousel goodsList={relatedGoodsList} />
  ) : null;
};
export default HandledRelateProductCarousel;
