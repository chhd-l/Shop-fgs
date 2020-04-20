const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'Dogs' }],
  '/list/cats': [{ name: 'Cats' }],
  '/list/puppies': [
    { name: 'Dogs', href: '#/list/dogs' },
    { name: 'Age', href: '#/list/dogs' },
    { name: 'Puppy (0-1 year old)' }
  ],
  '/list/kittens': [
    { name: 'Cats', href: '#/list/cats' },
    { name: 'Age', href: '#/list/cats' },
    { name: 'Kitten (0-1 year old)' }
  ],
  '/list/keywords': [{ name: 'View Results' }]
  // '/details': [{ name: '' }, { name: '' }]
};

export default breadcrumbNameMap