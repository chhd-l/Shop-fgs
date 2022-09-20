export const fetchArticles = () => {
  return Promise.resolve({
    total: 2,
    content: [
      { id: 1, title: 'Article1', desc: '', url: '/' },
      { id: 2, title: 'Article2', desc: '', url: '/' }
    ]
  });
};

export const fetchBreeds = () => {
  return Promise.resolve({
    total: 5,
    content: [
      { id: 1, title: 'Breed1', desc: '', url: '/' },
      { id: 2, title: 'Breed2', desc: '', url: '/' },
      { id: 3, title: 'Breed3', desc: '', url: '/' },
      { id: 4, title: 'Breed4', desc: '', url: '/' },
      { id: 5, title: 'Breed5', desc: '', url: '/' }
    ]
  });
};

export const fetchProducts = () => {
  return Promise.resolve({
    total: 6,
    content: [
      { id: 1, title: 'Product1', desc: 'Cat', url: '/' },
      { id: 2, title: 'Product2', desc: 'Spu', url: '/' },
      { id: 3, title: 'Product3', desc: 'dog', url: '/' },
      { id: 4, title: 'Product4', desc: 'Gae', url: '/' },
      { id: 5, title: 'Product5', desc: 'Dcc', url: '/' },
      { id: 6, title: 'Product6', desc: 'Rusxc', url: '/' }
    ]
  });
};
