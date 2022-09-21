import { getList } from '@/api/list';
import { optimizeImage } from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : window.__.env.REACT_APP_BASEURL;
const fetchApi = (url, keywords, pageNum) => {
  return fetch(
    `${BASE_URL}${url}?keywords=${keywords}&page=${pageNum}&size=12`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => response.json());
};

export const fetchArticles = ({ keywords, pageNum }) => {
  return fetchApi('/search/articles', keywords, pageNum)
    .then((data) => {
      console.log(data);
      return {
        total: data?.context?.totalElements ?? 0,
        content: (data?.context?.content ?? []).map((item, idx) => ({
          id: idx,
          title: item.title || item.thumbnailAltText,
          desc: item.thumbnailAltText,
          url: item.url,
          img: item.thumbnailUrl
        }))
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        total: 0,
        content: []
      };
    });
};

export const fetchBreeds = ({ keywords, pageNum }) => {
  return fetchApi('/search/breeds', keywords, pageNum)
    .then((data) => {
      console.log(data);
      return {
        total: data?.context?.totalElements ?? 0,
        content: (data?.context?.content ?? []).map((item, idx) => ({
          id: idx,
          title: item.title || item.thumbnailAltText,
          desc: item.thumbnailAltText,
          url: item.url,
          img: item.thumbnailUrl
        }))
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        total: 0,
        content: []
      };
    });
};

export const fetchProducts = ({ keywords, pageNum }) => {
  return getList({
    keywords,
    propDetails: [],
    pageNum,
    brandIds: [],
    pageSize: 6,
    esGoodsInfoDTOList: [],
    companyType: ''
  })
    .then((res) => {
      const esGoodsPage = res?.context?.esGoodsPage ?? [];
      return {
        total: esGoodsPage?.totalElements ?? 0,
        content: (esGoodsPage?.content ?? []).map((item, idx) => ({
          id: idx,
          title: item.goodsName,
          desc: item.goodsNewSubtitle,
          goodsNo: item.goodsNo,
          lowGoodsName: item.lowGoodsName,
          img:
            optimizeImage({
              originImageUrl:
                item.goodsImg ||
                item.goodsInfos?.sort(
                  (a, b) => a.marketPrice - b.marketPrice
                )[0]?.goodsInfoImg,
              width: 300
            }) || IMG_DEFAULT
        }))
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        total: 0,
        content: []
      };
    });
};
