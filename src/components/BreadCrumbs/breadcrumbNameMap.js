const breadcrumbNameMap = {
  '/list/dogs': [{ name: 'home.catogery6' }],
  '/list/cats': [{ name: 'home.catogery5' }],
  '/list/vcn': [{ name: 'product.catogery3.name' }],
  '/list/vd': [{ name: 'product.catogery4.name' }],
  '/list/prescription-dogs': [{ name: 'product.catogery1.name' }],
  '/list/prescription-cats': [{ name: 'product.catogery2.name' }], 
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
    { name: 'pets' }
  ],
  '/account/pets/petForm': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'pets' }
  ],
  '/account/orders': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders' }
  ],
  '/account/subscription': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'subscription' }
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
  '/account/productReview/:tid': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'productReview'}
  ],

  '/account/subscription-detail/:subscriptionNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'subscription', href: '/account/subscription' },
    { name: 'subscription.detail' }
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