const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'home.catogery6' }],
  '/list/cats': [{ name: 'home.catogery5' }],
  '/list/vcn': [{ name: 'home.catogery1' }],
  '/list/vd': [{ name: 'home.catogery2' }],
  '/list/prescription-dogs': [{ name: 'home.catogery3' }],
  '/list/prescription-cats': [{ name: 'home.catogery4' }],
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
    { name: 'shippingAddress', href: '/account/shippingAddress' },
    { name: 'create' }
  ],
  '/account/orders-detail/:orderNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'order.orderDetails' }
  ],
  '/account/orders-aftersale/:orderNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'order.orderDetails' }
  ],
  '/account/return-order': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'order.returnOrder' }
  ],
  '/account/return-order-detail/:returnNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'order.returnOrder', href: '/account/return-order' },
    { name: 'order.returnOrderDetails' }
  ],
  '/account/paymentMethod': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'paymentMethod' }
  ]
};

export default breadcrumbNameMap