const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'dogs2' }],
  '/list/cats': [{ name: 'cats2' }],
  '/list/vcn': [
    { name: 'dogs2', href: '/list/dogs' },
    { name: 'age', href: '/list/dogs' },
    { name: 'puppy' }
  ],
  '/list/vd': [
    { name: 'cats2', href: '/list/cats' },
    { name: 'age', href: '/list/cats' },
    { name: 'kitten' }
  ],
  '/list/keywords': [{ name: 'viewResults' }]
  // '/details': [{ name: '' }, { name: '' }]
};

export default breadcrumbNameMap