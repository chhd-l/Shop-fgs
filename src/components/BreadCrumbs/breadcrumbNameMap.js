const breadcrumbNameMap = {
  '/list/urinary': [{ name: 'product.de.catogery1.name' }],
  '/list/dermatology': [{ name: 'product.de.catogery2.name' }],
  '/list/weight-management': [{ name: 'product.de.catogery3.name' }],
  '/list/gastrointestinal-tract': [{ name: 'product.de.catogery4.name' }],
  '/list/vital-support': [{ name: 'product.de.catogery5.name' }],
  '/list/health-management': [{ name: 'product.de.catogery6.name' }],
  '/list/dogs': [{ name: 'home.catogery6' }],
  '/list/cats': [{ name: 'home.catogery5' }],
  '/list/vcn': [{ name: 'product.catogery3.name' }],
  '/list/vd': [{ name: 'product.catogery4.name' }],
  '/list/prescription-dogs': [{ name: 'product.catogery1.name' }],
  '/list/prescription-cats': [{ name: 'product.catogery2.name' }],
  '/list/breed-dogs': [{ name: 'product.catogery8.name' }],
  '/list/breed-cats': [{ name: 'product.catogery7.name' }],
  '/list/chien': [{ name: 'home.catogery6' }],
  '/list/chat': [{ name: 'home.catogery5' }],
  '/list/chiot': [{ name: 'product.fr.catogery3.name' }],
  '/list/chaton': [{ name: 'product.fr.catogery4.name' }],
  '/list/dogs-ru': [{ name: 'product.ru.catogery1.name' }],
  '/list/cats-ru': [{ name: 'product.ru.catogery2.name' }],
  '/list/puppy-ru': [{ name: 'product.ru.catogery3.name' }],
  '/list/kitten-ru': [{ name: 'product.ru.catogery4.name' }],
  '/list/dogs-tr': [{ name: 'product.tr.catogery1.name' }],
  '/list/cats-tr': [{ name: 'product.tr.catogery2.name' }],
  '/list/puppy-tr': [{ name: 'product.tr.catogery3.name' }],
  '/list/kitten-tr': [{ name: 'product.tr.catogery4.name' }],
  '/list/dogs-en': [{ name: 'product.en.catogery1.name' }],
  '/list/cats-en': [{ name: 'product.en.catogery2.name' }],
  '/list/keywords': [{ name: 'viewResults' }],
  '/account': [{ name: 'account.personalArea' }],
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
    { name: 'Product Review' }
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
  ],
  '/general-conditions': [
    {
      name: 'GeneralConditions'
    }
  ],
  '/qualitySafety': [
    {
      name: 'QualitySafety'
    }
  ],
  '/shipmentConditions': [
    {
      name: 'ShipmentConditions'
    }
  ],
  '/product-finder': [
    {
      name: 'productFinder.index'
    }
  ],
  '/product-finder/result': [
    {
      name: 'productFinder.index',
      href: '/product-finder'
    },
    { name: 'productFinder.resultPage' }
  ],
  '/product-finder/noresult': [{ name: 'viewResults' }]
};

export default breadcrumbNameMap;
