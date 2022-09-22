const fetchApi = ({ baseUrl, url, keywords, pageNum, countryCode }) => {
  return fetch(
    `${baseUrl}${url}?keywords=${keywords}&pageNum=${pageNum}&pageSize=12&countryCode=${countryCode}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => response.json());
};

export const fetchArticles = ({ baseUrl, keywords, pageNum, countryCode }) => {
  return fetchApi({
    baseUrl,
    url: '/search/articles',
    keywords,
    pageNum,
    countryCode
  })
    .then((data) => {
      console.log(data);
      return {
        total: data?.context?.totalElements ?? 0,
        content: (data?.context?.content ?? []).map((item, idx) => ({
          id: idx,
          type: 'Article',
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

export const fetchBreeds = ({ baseUrl, keywords, pageNum, countryCode }) => {
  return fetchApi({
    baseUrl,
    url: '/search/breeds',
    keywords,
    pageNum,
    countryCode
  })
    .then((data) => {
      console.log(data);
      return {
        total: data?.context?.totalElements ?? 0,
        content: (data?.context?.content ?? []).map((item, idx) => ({
          id: idx,
          type: 'Breed',
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

export const fetchProducts = ({
  baseUrl,
  keywords,
  pageNum,
  countryCode,
  itemBaseUrl
}) => {
  return fetch(`${baseUrl}/goods/spuListFront`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      keywords,
      pageNum,
      pageSize: 12,
      countryCode
    })
  })
    .then((res) => {
      const esGoodsPage = res?.context?.esGoodsPage ?? [];
      return {
        total: esGoodsPage?.totalElements ?? 0,
        content: (esGoodsPage?.content ?? []).map((item, idx) => ({
          id: idx,
          type: 'Product',
          title: item.goodsName,
          desc: item.goodsNewSubtitle,
          goodsNo: item.goodsNo,
          lowGoodsName: item.lowGoodsName,
          url: `${itemBaseUrl}/${item.lowGoodsName
            .split(' ')
            .join('-')
            .replace('/', '')}-${item.goodsNo}`,
          img:
            item.goodsImg ||
            item.goodsInfos?.sort((a, b) => a.marketPrice - b.marketPrice)[0]
              ?.goodsInfoImg
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
