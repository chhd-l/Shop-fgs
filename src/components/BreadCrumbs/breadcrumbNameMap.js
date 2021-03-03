const breadcrumbNameMap = {
  '/account': [{ name: 'home' }],
  '/account/information': [{ name: 'account.profile' }],
  '/account/pets': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.pets' }
  ],
  '/account/pets/petForm': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.pets' }
  ],
  '/account/orders': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.ordersTitle' }
  ],
  '/account/subscription': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.subscriptionTitle' }
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
  '/account/orders/detail/:orderNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.ordersTitle', href: '/account/orders' },
    { name: 'order.orderDetails' }
  ],
  '/account/productReview/:tid': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'Product Review' }
  ],

  '/account/subscription/order/detail/:subscriptionNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'account.subscriptionTitle', href: '/account/subscription' },
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
  '/Quality-safety': [
    {
      name: 'footer.qualityAndSafety'
    }
  ],
  '/aboutUs': [
    {
      name: 'aboutUs2'
    }
  ],
  '/Tailorednutrition': [
    {
      name: 'tailorednutrition'
    }
  ],
  '/general-terms-conditions': [
    {
      name: 'Conditions Générales De Vente'
    }
  ],
  '/Values': [
    {
      name: 'values'
    }
  ],
  '/pack-mix-feeding-wet-dry': [
    {
      name: 'Nos combinaisons de croquettes et de bouchées'
    }
  ],
  '/faq': [
    {
      name: 'FAQ'
    }
  ],
  '/shipmentConditions': [
    {
      name: 'ShipmentConditions'
    }
  ],
  '/promotion-refuge': [
    {
      name: 'Nos promotions refuge'
    }
  ],
  '/cadeau-coussin-chat': [
    {
      name: 'Nos promotions Chat'
    }
  ],
  '/About-Us': [
    {
      name: 'aboutUs2'
    }
  ],
  '/product-finder': [{ name: 'productFinder.resultPage' }],
  '/product-finder-recommendation': [
    {
      name: 'productFinder.index',
      href: '/product-finder'
    },
    { name: 'productFinder.resultPage' }
  ],
  '/product-finder-noresult': [
    {
      name: 'productFinder.index',
      href: '/product-finder'
    },
    { name: 'productFinder.resultPage' }
  ],
  '/cat-nutrition': [{ name: 'catNutrition' }],
  '/kitten-nutrition': [{name: 'Nutrition chatons'}],
  '/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show': [{name: 'Search Results'}]
};

export default breadcrumbNameMap;
