const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'home.catogery3' }],
  '/list/cats': [{ name: 'home.catogery4' }],
  '/list/vcn': [
    { name: 'home.catogery1' }
    // { name: 'dogs2', href: '/list/dogs' },
    // { name: 'age', href: '/list/dogs' },
    // { name: 'puppy' }
  ],
  '/list/vd': [
    { name: 'home.catogery2' }
    // { name: 'cats2', href: '/list/cats' },
    // { name: 'age', href: '/list/cats' },
    // { name: 'kitten' }
  ],
  '/list/keywords': [{ name: 'viewResults' }],
  // '/details': [{ name: '' }, { name: '' }]
  '/account': [
    { name: 'Personal Area' }
  ],
  '/account/information': [
    { name: 'Personal Area', href: '/account' },
    { name: 'Profile' }
  ]
};

export default breadcrumbNameMap