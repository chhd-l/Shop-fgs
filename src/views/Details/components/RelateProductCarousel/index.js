import React, { useEffect, useState } from 'react';
import RelateProductCarousel from '@/components/RelateProductCarousel';
import { getGoodsRelation } from '@/api/details';

const isHub = window.__.env.REACT_APP_HUB == '1';
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
      relatedGoodsList = relatedGoodsList.map((ele) => {
        const breedsAttr = (ele.goodsAttributesValueRelVOAllList || [])
          .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
          .map((t) => t.goodsAttributeValueEn);
        const breedsValueAttr = (ele.goodsAttributesValueRelVOAllList || [])
          .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
          .map((t) => t.goodsAttributeValue);
        const technologyAttr = (ele.goodsAttributesValueRelVOAllList || [])
          .filter(
            (item) => item?.goodsAttributeName?.toLowerCase() == 'technology'
          )
          .map((t) => t.goodsAttributeValueEn);
        const attrs = breedsAttr.concat(technologyAttr).join(','); //需要排序因此不能一起写；
        const breedValue = breedsValueAttr?.[0]?.split('_')?.[1];
        const breed = breedValue?.toLowerCase() === 'cat' ? 'Kошка' : 'Cобака'; //俄罗斯定制，嗐！
        const ruAttrs = [breed, ...technologyAttr];
        const technologyOrBreedsAttr =
          isHub && window.__.env.REACT_APP_COUNTRY === 'ru'
            ? ruAttrs.join(',')
            : attrs;
        return Object.assign(ele, { technologyOrBreedsAttr });
      });
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
