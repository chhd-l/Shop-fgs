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
    body: JSON.stringify({ keywords, page: pageNum, size: 12 })
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const fetchArticles = ({ keywords, pageNum }) => {
  return fetchApi('/search/article/goods', keywords, pageNum).then((data) => {
    console.log(data);
    return {
      total: data?.context?.totalElements ?? 0,
      content: data?.context?.context ?? []
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

export const fetchBreeds = () => {
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

export const fetchProducts = () => {
  return Promise.resolve({
    total: 6,
    content: [
      {
        id: 1,
        title: 'Product1',
        desc: 'Cat',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 2,
        title: 'Product2',
        desc: 'Spu',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 3,
        title: 'Product3',
        desc: 'dog',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 4,
        title: 'Product4',
        desc: 'Gae',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 5,
        title: 'Product5',
        desc: 'Dcc',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      },
      {
        id: 6,
        title: 'Product6',
        desc: 'Rusxc',
        url: '/',
        img: 'https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg'
      }
    ]
  });
};
