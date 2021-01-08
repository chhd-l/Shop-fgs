const breadcrumbNameMap = {
  '/list/untere-harnwege': [{ name: 'product.de.catogery1.name' }],
  '/list/haut-fell': [{ name: 'product.de.catogery2.name' }],
  '/list/ubergewicht': [{ name: 'product.de.catogery3.name' }],
  '/list/diabetesMellitus': [{ name: 'product.de.catogery4.name' }],
  '/list/magen-darm-trakt': [{ name: 'product.de.catogery5.name' }],
  '/list/leber': [{ name: 'product.de.catogery6.name' }],
  '/list/niere': [{ name: 'product.de.catogery7.name' }],
  '/list/gelenke': [{ name: 'product.de.catogery8.name' }],
  '/list/herz': [{ name: 'product.de.catogery9.name' }],
  '/list/kastration': [{ name: 'product.de.catogery10.name' }],
  '/list/maulhohle': [{ name: 'product.de.catogery11.name' }],
  '/list/verhalten': [{ name: 'product.de.catogery12.name' }],
  '/list/aufzuchtWachstum': [{ name: 'product.de.catogery13.name' }],
  '/list/prophylaxe': [{ name: 'product.de.catogery14.name' }],
  '/list/pill-assist': [{ name: 'product.de.catogery15.name' }],

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
  '/account': [{ name: 'home' }],
  '/account/information': [
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
  '/account/orders/detail/:orderNumber': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'order.orderDetails' }
  ],
  '/account/productReview/:tid': [
    { name: 'account.personalArea', href: '/account' },
    { name: 'orders', href: '/account/orders' },
    { name: 'Product Review' }
  ],

  '/account/subscription/order/detail/:subscriptionNumber': [
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
  '/Quality-safety': [
    {
      name: 'Qualité et sécurité alimentaire'
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
  '/general-terms-conditions':[
    {
      name:'Conditions Générales De Vente'
    }
  ],
  '/Values':[
    {
      name:'Nos valeurs'
    }
  ],
  '/packmixfeedingwetdry':[
    {
      name:'Nos combinaisons de croquettes et de bouchées'
    }
  ],
  '/FAQ/all':[
    {
      name:"FAQ"
    }
  ],
  '/faq':[
    {
      name:"FAQ"
    }
  ],
  '/shipmentConditions': [
    {
      name: 'ShipmentConditions'
    }
  ],
  '/promotion-refuge':[{
    name:'Nos promotions refuge'
  }],
  '/cadeau-coussin-chat':[{
    name:'Nos promotions Chat'
  }],
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
  ]
};

export default breadcrumbNameMap;
