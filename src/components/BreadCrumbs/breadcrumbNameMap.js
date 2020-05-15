const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'home.catogery3' }],
  '/list/cats': [{ name: 'home.catogery4' }],
  '/list/vcn': [
    { name: 'home.catogery1' }
  ],
  '/list/vd': [
    { name: 'home.catogery2' }
  ],
  '/list/keywords': [{ name: 'viewResults' }],
  '/account': [
    { name: 'account.personalArea' }
  ],
  '/account/information': [
    { name: 'Personal Area', href: '/account' },
    { name: 'Profile' }
  ],
  '/account/pets': [
    { name: 'Personal Area', href: '/account' },
    { name: 'Pets' }
  ],
  '/account/orders': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders' }
  ]
};

export default breadcrumbNameMap