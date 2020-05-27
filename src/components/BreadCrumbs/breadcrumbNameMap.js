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
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.profile' }
  ],
  '/account/pets': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'Pets' }
  ],
  '/account/pets/petForm': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'Pets' }
  ],
  '/account/orders': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders' }
  ],
  '/account/shippingAddress': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'shippingAddress' }
  ],
  '/account/shippingAddress/create': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'shippingAddress',href: '/account/shippingAddress' },
    { name: 'create'}
  ]
};

export default breadcrumbNameMap