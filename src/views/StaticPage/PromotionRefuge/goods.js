const list1 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/babycat-ru-fhn17-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-1-300.jpg 2x`,
    mainItemCode: '2544',
    goodsName: 'Mother & Babycat',
    price: '44.99',
    toPrice: '44.99',
    marketPrice: '25.99',
    fromPrice: '25.99',
    goodsNewSubtitle: 'Chattes en gestation/lactation et chaton de 1 à 4 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/2013-reproduction-pro-packshots-babycat-milk.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-2-300.jpg 2x`,
    goodsName: 'Babycat milk',
    mainItemCode: '2553',
    price: '21.00',
    fromPrice: '21.00',
    marketPrice: '',
    goodsNewSubtitle: 'De la naissance au sevrage - Lait 1er âge pour Chatons'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-3-300.jpg 2x`,
    mainItemCode: '4058',
    goodsName: 'Kitten en Sauce',
    price: '14.99',
    fromPrice: '14.99',
    marketPrice: '',
    goodsNewSubtitle: 'Chatons de 4 à 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/16-kitten-ns-b1.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-4-300.jpg 2x`,
    mainItemCode: '2522',
    goodsName: 'Kitten',
    price: '84.99',
    toPrice: '84.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle: 'Chaton jusqu’à 12 mois'
  }
  // {
  //   imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/16-kitten-sterilised-b1-ne.jpg`,
  //   goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-150.jpg`,
  //   imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-300.jpg 2x`,
  //   goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-5-300.jpg 2x`,
  //   mainItemCode: '2562',
  //   goodsName: 'Kitten Sterilised',
  //   price: '39.99',
  //   toPrice: '39.99',
  //   marketPrice: '24.99',
  //   fromPrice: '24.99',
  //   goodsNewSubtitle: 'Kitten Sterilised'
  // },
  // {
  //   imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-sauce.jpg`,
  //   goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-150.jpg`,
  //   imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-300.jpg 2x`,
  //   goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-6-300.jpg 2x`,
  //   mainItemCode: '1071',
  //   goodsName: 'Kitten Sterilised en Sauce',
  //   price: '15.99',
  //   fromPrice: '15.99',
  //   marketPrice: '',
  //   goodsNewSubtitle: 'Chatons stérilisés 6 de 12 mois'
  // },
  // {
  //   imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-gele.jpg`,
  //   goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-150.jpg`,
  //   imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-300.jpg 2x`,
  //   goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/1-7-300.jpg 2x`,
  //   mainItemCode: '1072',
  //   goodsName: 'Kitten Sterilised en Gelée',
  //   fromPrice: '15.99',
  //   price: '15.99',
  //   marketPrice: '',
  //   goodsNewSubtitle: 'Chatons stérilisés 6 de 12 mois'
  // }
];

const list2 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/digestive-int-fcn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-1-300.jpg 2x`,
    mainItemCode: '2555',
    goodsName: 'Digestive Care',
    price: '67.99',
    toPrice: '67.99',
    marketPrice: '27.99',
    fromPrice: '27.99',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à soutenir la santé digestive'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/urinary-int-fcn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-2-300.jpg 2x`,
    mainItemCode: '1800',
    goodsName: 'Urinary Care',
    price: '82.99',
    toPrice: '82.99',
    marketPrice: '27.99',
    fromPrice: '27.99',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir la santé du système urinaire'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/hairskin-ne-fcn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-3-300.jpg 2x`,
    mainItemCode: '2526',
    goodsName: 'Hair & Skin Care',
    price: '93.99',
    toPrice: '93.99',
    marketPrice: '27.99',
    fromPrice: '27.99',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir une peau saine et un poil brillant'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/fcn-ow-light-packshot-ns.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-400.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-4-400.jpg 2x`,
    mainItemCode: '2524',
    goodsName: 'Light Weight Care',
    price: '75.99',
    toPrice: '75.99',
    marketPrice: '25.99',
    fromPrice: '25.99',
    goodsNewSubtitle: 'Chaton jusqu’à 12 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/digest-sensitive-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-5-300.jpg 2x`,
    mainItemCode: '4076',
    goodsName: 'Digest Sensitive en Sauce',
    price: '15.99',
    fromPrice: '15.99',
    marketPrice: '',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à soutenir la santé digestive'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/urinary-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-6-300.jpg 2x`,
    mainItemCode: '4157',
    goodsName: 'Urinary Care en Sauce',
    price: '15.99',
    fromPrice: '15.99',
    marketPrice: '',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir la santé du système urinaire'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/intense-beauty-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-7-300.jpg 2x`,
    mainItemCode: '4071',
    goodsName: 'Intense Beauty en Sauce',
    price: '15.99',
    fromPrice: '15.99',
    marketPrice: '',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à maintenir une peau saine et un poil brillant'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/light-weight-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/2-8-150.jpg 2x`,
    mainItemCode: '4070',
    goodsName: 'Light Weight Care en Sauce',
    price: '15.99',
    fromPrice: '15.99',
    marketPrice: '',
    goodsNewSubtitle:
      'Chats adultes de 1 à 7 ans - Aide à limiter la prise de poids'
  }
];

const list3 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/Mini-Puppy-1-bis.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-1-300.jpg 2x`,
    mainItemCode: 'MKT40001',
    goodsName: 'Pack Mini Puppy',
    price: '41.98',
    fromPrice: '41.98',
    marketPrice: '',
    goodsNewSubtitle: 'Chiots jusqu’à 10 mois'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-puppy-medium-shn17.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-2-300.jpg 2x`,
    mainItemCode: '3003',
    goodsName: 'Medium Puppy',
    price: '71.99',
    toPrice: '71.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle:
      "Chiot de taille moyenne. Poids adulte de 11 à 25 Kg. Jusqu'à 12 mois."
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-puppy-maxi-shn17.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-3-300.jpg 2x`,
    mainItemCode: '3006',
    goodsName: 'Maxi Puppy',
    price: '71.99',
    toPrice: '71.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle:
      "Chiot de grande taille. Poids adulte de 26 à 44 Kg. Jusqu'à 15 mois."
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-med-ad-shn17.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-4-300.jpg 2x`,
    mainItemCode: '3004',
    goodsName: 'Medium Adult',
    price: '65.99',
    toPrice: '65.99',
    marketPrice: '51.99',
    fromPrice: '51.99',
    goodsNewSubtitle:
      'Chiens Medium. Poids adulte de 11 à 25 Kg. De 12 mois à 7 ans.'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/packshot-maxi-ad-shn17.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/3-5-300.jpg 2x`,
    mainItemCode: '3007',
    goodsName: 'Maxi Adult',
    price: '67.99',
    toPrice: '67.99',
    marketPrice: '23.99',
    fromPrice: '23.99',
    goodsNewSubtitle:
      'Chien Maxi. Poids adulte de 26 à 44 Kg. De 15 mois à 5 ans.'
  }
];

const list4 = [
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-sterilised-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-1-300.jpg 2x`,
    mainItemCode: '3185',
    goodsName: 'Mini Sterilised',
    price: '61.99',
    toPrice: '61.99',
    marketPrice: '10.99',
    fromPrice: '10.99',
    goodsNewSubtitle: 'Pour Chiens stérilisés - Jusqu’à 10 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/medium-sterilised-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-2-300.jpg 2x`,
    mainItemCode: '3034',
    goodsName: 'Medium Sterilised',
    price: '64.99',
    toPrice: '64.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle: 'Pour Chiens stérilisés - De 11 à 25 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-sterilised-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-3-300.jpg 2x`,
    mainItemCode: '3035',
    goodsName: 'Maxi Sterilised',
    price: '58.99',
    toPrice: '58.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle: 'Pour Chiens stérilisés - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/sterilised.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-4-300.jpg 2x`,
    mainItemCode: '1179',
    goodsName: 'Sterilised en Mousse',
    price: '13.99',
    fromPrice: '13.99',
    marketPrice: '',
    goodsNewSubtitle: 'Pour Chiens stérilisés - Toutes tailles'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-light-ccn19-b1-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-5-300.jpg 2x`,
    mainItemCode: '3018',
    goodsName: 'Mini Light Weight Care',
    price: '61.99',
    toPrice: '61.99',
    marketPrice: '11.99',
    fromPrice: '11.99',
    goodsNewSubtitle: "Pour Chiens sujets à la prise de poids - Jusqu'à 10 kg"
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/kitten-sterilised-sauce.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-6-300.jpg 2x`,
    mainItemCode: '3021',
    goodsName: 'Kitten Sterilised en Sauce',
    price: '64.99',
    toPrice: '64.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle: 'Pour Chiens sujets à la prise de poids - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-light-ccn19-b1-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-7-300.jpg 2x`,
    mainItemCode: '2446',
    goodsName: 'Maxi Light Weight Care',
    price: '64.99',
    toPrice: '64.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle: 'Pour Chiens sujets à la prise de poids - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/light-weight-care.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-8-300.jpg 2x`,
    mainItemCode: '1178',
    goodsName: 'Light Weight Care en Mousse',
    price: '',
    marketPrice: '13.99',
    fromPrice: '13.99',
    goodsNewSubtitle:
      'Pour Chiens avec tendance à la prise de poids - Toutes tailles'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/mini-dermacomfort-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-9-300.jpg 2x`,
    mainItemCode: '2441',
    goodsName: 'Mini Dermacomfort',
    price: '61.99',
    toPrice: '61.99',
    marketPrice: '11.99',
    fromPrice: '11.99',
    goodsNewSubtitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - Jusqu’à 10 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/medium-dermacomfort-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-10-300.jpg 2x`,
    mainItemCode: '2442',
    goodsName: 'Medium Dermacomfort',
    price: '64.99',
    toPrice: '64.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - De 11 à 25 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/maxi-derma-ccn-packshot.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-11-300.jpg 2x`,
    mainItemCode: '2444',
    goodsName: 'Maxi Dermacomfort',
    price: '64.99',
    toPrice: '64.99',
    marketPrice: '24.99',
    fromPrice: '24.99',
    goodsNewSubtitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - De 26 à 44 kg'
  },
  {
    imageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotion-refuge/dermacomfort-care.jpg`,
    goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-150.jpg`,
    imgUrl2: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-300.jpg 2x`,
    goodsImgSrcSet: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-150.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/promotionRefuge/4-12-300.jpg 2x`,
    mainItemCode: '1181',
    goodsName: 'Dermacomfort en Mousse',
    price: '',
    marketPrice: '13.99',
    fromPrice: '13.99',
    goodsNewSubtitle:
      'Pour Chiens sujets aux irritations et démangeaisons de peau - Toutes tailles'
  }
];

export { list1, list2, list3, list4 };
