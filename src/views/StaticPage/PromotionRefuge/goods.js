const list1 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/babycat-ru-fhn17-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-300.jpg 2x`,
    linkUrl: '/mother-&-babycat-2544',
    title: 'Mother & Babycat',
    price: '44.99',
    marketPrice: '25.99',
    subTitle: 'Chattes en gestation/lactation et chaton de 1 à 4 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/2013-reproduction-pro-packshots-babycat-milk.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-300.jpg 2x`,
    title: 'Babycat milk',
    linkUrl: '/babycat-milk-2553',
    price: '21.00',
    marketPrice: '',
    subTitle: 'De la naissance au sevrage - Lait 1er âge pour Chatons'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-300.jpg 2x`,
    linkUrl: '/kitten-en-sauce-4058',
    title: 'Kitten en Sauce',
    price: '14.99',
    marketPrice: '',
    subTitle: 'Chatons de 4 à 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/16-kitten-ns-b1.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-300.jpg 2x`,
    linkUrl: '/kitten-2522',
    title: 'Kitten',
    price: '84.99',
    marketPrice: '24.99',
    subTitle: 'Chaton jusqu’à 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/16-kitten-sterilised-b1-ne.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-300.jpg 2x`,
    linkUrl: '/kitten-sterilised-2562',
    title: 'Kitten Sterilised',
    price: '39.99',
    marketPrice: '24.99',
    subTitle: 'Kitten Sterilised'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-300.jpg 2x`,
    linkUrl: '/kitten-sterilised-en-sauce-1071',
    title: 'Kitten Sterilised en Sauce',
    price: '15.99',
    marketPrice: '',
    subTitle: 'Chatons stérilisés 6 de 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-gele.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-300.jpg 2x`,
    linkUrl: '/kitten-sterilised-en-gelée-1072',
    title: 'Kitten Sterilised en Gelée',
    price: '15.99',
    marketPrice: '',
    subTitle: 'Chatons stérilisés 6 de 12 mois'
  }
];

const list2 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/digestive-int-fcn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-300.jpg 2x`,
    linkUrl: '/digestive-care-2555',
    title: 'Digestive Care',
    price: '67.99',
    marketPrice: '27.99',
    subTitle: 'Chats adultes de 1 à 7 ans - Aide à soutenir la santé digestive'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/urinary-int-fcn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-300.jpg 2x`,
    linkUrl: '/urinary-care-1800',
    title: 'Urinary Care',
    price: '82.99',
    marketPrice: '27.99',
    subTitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir la santé du système urinaire'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/hairskin-ne-fcn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-300.jpg 2x`,
    linkUrl: '/hair-skin-care-2526',
    title: 'Hair & Skin Care',
    price: '93.99',
    marketPrice: '27.99',
    subTitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir une peau saine et un poil brillant'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/fcn-ow-light-packshot-ns.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-400.jpg 2x`,
    linkUrl: '/light-weight-care-2524',
    title: 'Light Weight Care',
    price: '75.99',
    marketPrice: '25.99',
    subTitle: 'Chaton jusqu’à 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/digest-sensitive-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-300.jpg 2x`,
    linkUrl: '/digest-sensitive-en-sauce-4076',
    title: 'Digest Sensitive en Sauce',
    price: '15.99',
    marketPrice: '',
    subTitle: 'Chats adultes de 1 à 7 ans - Aide à soutenir la santé digestive'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/urinary-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-300.jpg 2x`,
    linkUrl: '/urinary-care-en-sauce--4157',
    title: 'Urinary Care en Sauce',
    price: '15.99',
    marketPrice: '',
    subTitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir la santé du système urinaire'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/intense-beauty-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-300.jpg 2x`,
    linkUrl: '/intense-beauty-en-sauce-4071',
    title: 'Intense Beauty en Sauce',
    price: '15.99',
    marketPrice: '',
    subTitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir une peau saine et un poil brillant'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/light-weight-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg 2x`,
    linkUrl: '/light-weight-care-en-sauce-4070',
    title: 'Light Weight Care en Sauce',
    price: '15.99',
    marketPrice: '',
    subTitle: 'Chats adultes de 1 à 7 ans - Aide à limiter la prise de poids'
  }
];

const list3 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/Mini-Puppy-1-bis.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-300.jpg 2x`,
    linkUrl: '/pack-mini-puppy-MKT40001',
    title: 'Pack Mini Puppy',
    price: '41.98',
    marketPrice: '',
    subTitle: 'Chiots jusqu’à 10 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-puppy-medium-shn17.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-300.jpg 2x`,
    linkUrl: '/medium-puppy-3003',
    title: 'Medium Puppy',
    price: '71.99',
    marketPrice: '24.99',
    subTitle:
      "Chiot de taille moyenne. Poids adulte de 11 à 25 Kg. Jusqu'à 12 mois."
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-puppy-maxi-shn17.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-300.jpg 2x`,
    linkUrl: '/maxi-puppy-3006',
    title: 'Maxi Puppy',
    price: '71.99',
    marketPrice: '24.99',
    subTitle:
      "Chiot de grande taille. Poids adulte de 26 à 44 Kg. Jusqu'à 15 mois."
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-med-ad-shn17.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-300.jpg 2x`,
    linkUrl: '/medium-adult-3004',
    title: 'Medium Adult',
    price: '65.99',
    marketPrice: '51.99',
    subTitle: 'Chiens Medium. Poids adulte de 11 à 25 Kg. De 12 mois à 7 ans.'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-maxi-ad-shn17.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-300.jpg 2x`,
    linkUrl: '/maxi-adult-3007',
    title: 'Maxi Adult',
    price: '67.99',
    marketPrice: '23.99',
    subTitle: 'Chien Maxi. Poids adulte de 26 à 44 Kg. De 15 mois à 5 ans.'
  }
];

const list4 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-sterilised-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-300.jpg 2x`,
    linkUrl: '/mini-sterilised-3185',
    title: 'Mini Sterilised',
    price: '61.99',
    marketPrice: '10.99',
    subTitle: 'Pour Chiens stérilisés - Jusqu’à 10 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/medium-sterilised-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-300.jpg 2x`,
    linkUrl: '/medium-sterilised-3034',
    title: 'Medium Sterilised',
    price: '64.99',
    marketPrice: '24.99',
    subTitle: 'Pour Chiens stérilisés - De 11 à 25 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-sterilised-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-300.jpg 2x`,
    linkUrl: '/maxi-sterilised-3035',
    title: 'Maxi Sterilised',
    price: '58.99',
    marketPrice: '24.99',
    subTitle: 'Pour Chiens stérilisés - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/sterilised.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-300.jpg 2x`,
    linkUrl: '/sterilised-en-mousse-1179',
    title: 'Sterilised en Mousse',
    price: '13.99',
    marketPrice: '',
    subTitle: 'Pour Chiens stérilisés - Toutes tailles'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-light-ccn19-b1-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-300.jpg 2x`,
    linkUrl: '/mini-light-weight-care-3018',
    title: 'Mini Light Weight Care',
    price: '61.99',
    marketPrice: '11.99',
    subTitle: "Pour Chiens sujets à la prise de poids - Jusqu'à 10 kg"
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-sauce.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-300.jpg 2x`,
    linkUrl: '/medium-light-weight-care-3021',
    title: 'Kitten Sterilised en Sauce',
    price: '64.99',
    marketPrice: '24.99',
    subTitle: 'Pour Chiens sujets à la prise de poids - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-light-ccn19-b1-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-300.jpg 2x`,
    linkUrl: '/maxi-light-weight-care-2446',
    title: 'Maxi Light Weight Care',
    price: '64.99',
    marketPrice: '24.99',
    subTitle: 'Pour Chiens sujets à la prise de poids - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/light-weight-care.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-300.jpg 2x`,
    linkUrl: '/light-weight-care-en-mousse-1178',
    title: 'Light Weight Care en Mousse',
    price: '',
    marketPrice: '13.99',
    subTitle: 'Pour Chiens avec tendance à la prise de poids - Toutes tailles'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-dermacomfort-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-300.jpg 2x`,
    linkUrl: '/mini-dermacomfort-2441',
    title: 'Mini Dermacomfort',
    price: '61.99',
    marketPrice: '11.99',
    subTitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - Jusqu’à 10 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/medium-dermacomfort-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-300.jpg 2x`,
    linkUrl: '/medium-dermacomfort-2442',
    title: 'Medium Dermacomfort',
    price: '64.99',
    marketPrice: '24.99',
    subTitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - De 11 à 25 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-derma-ccn-packshot.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-300.jpg 2x`,
    linkUrl: '/maxi-dermacomfort-2444',
    title: 'Maxi Dermacomfort',
    price: '64.99',
    marketPrice: '24.99',
    subTitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/dermacomfort-care.jpg`,
    imgUrl1: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-300.jpg 2x`,
    linkUrl: '/dermacomfort-en-mousse-1181',
    title: 'Dermacomfort en Mousse',
    price: '',
    marketPrice: '13.99',
    subTitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - Toutes tailles'
  }
];

export { list1, list2, list3, list4 };
