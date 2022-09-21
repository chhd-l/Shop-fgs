import { getList } from '@/api/list';
import { optimizeImage } from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : window.__.env.REACT_APP_BASEURL;
const fetchApi = (url, keywords, pageNum) => {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keywords, pageNum: pageNum, pageSize: 12 })
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const fetchArticles = ({ keywords, pageNum }) => {
  return fetchApi('/search/article/goods', keywords, pageNum).then((data) => {
    console.log(data);
    return {
      total: data?.context?.totalElements ?? 0,
      content: data?.context?.content ?? []
    };
  });
  return Promise.resolve({
    total: 2,
    content: [
      {
        id: 1,
        title: 'Article1',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 2,
        title: 'Article2',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      }
    ]
  });
};

export const fetchBreeds = ({ keywords, pageNum }) => {
  return fetchApi('/search/breed/goods', keywords, pageNum).then((data) => {
    console.log(data);
    return {
      total: data?.context?.totalElements ?? 0,
      content: data?.context?.content ?? []
    };
  });
  return Promise.resolve({
    total: 5,
    content: [
      {
        id: 1,
        title: 'Breed1',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 2,
        title: 'Breed2',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 3,
        title: 'Breed3',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 4,
        title: 'Breed4',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 5,
        title: 'Breed5',
        desc: '',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      }
    ]
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
          url: '/',
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
