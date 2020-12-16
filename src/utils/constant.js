import locales from '@/lang';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import amexImg from '@/assets/images/credit-cards/amex.svg';
import mastercardImg from '@/assets/images/credit-cards/mastercard.svg';
import discoverImg from '@/assets/images/credit-cards/discover.svg';
import cartebancaireImg from '@/assets/images/credit-cards/cartebancaire.png';
import oxxo from '@/assets/images/oxxo.png';

import breedCatsImg from '@/assets/images/banner-list/Banner_BHN_Persa.jpg';
import breedDogsImg from '@/assets/images/banner-list/Banner_BHN_German_Shepherd.jpg';

import CARECAT from '@/assets/images/MX-L-VET-CARE-CAT.jpg';
import CAREDOG from '@/assets/images/MX-L-VET-CARE-DOG.jpg';
import DIETCAT from '@/assets/images/MX-L-VET-DIET-CAT.jpg';
import DIETDOG from '@/assets/images/MX-L-VET-DIET-DOG.jpg';
import Bundles_Breed_Cat from '@/assets/images/home-catogery-mx/Bundles_Breed_Cat.jpg';
import Bundles_Breed_Dog from '@/assets/images/home-catogery-mx/Bundles_Breed_Dog.jpg';

import untereHarnwege from '@/assets/images/home-catogery-de/01_UntereHarnwege.jpg';
import hautFell from '@/assets/images/home-catogery-de/02_HautFell.jpg';
import ubergewicht from '@/assets/images/home-catogery-de/03_Ubergewicht.jpg';
import diabetesMellitus from '@/assets/images/home-catogery-de/04_Diabetes_mellitus.jpg';
import magenDarmTrakt from '@/assets/images/home-catogery-de/05_Magen-Darm-Trakt.jpg';
import leber from '@/assets/images/home-catogery-de/06_Leber.jpg';
import niere from '@/assets/images/home-catogery-de/07_Niere.jpg';
import gelenke from '@/assets/images/home-catogery-de/08_Gelenke.jpg';
import herz from '@/assets/images/home-catogery-de/09_Herz.jpg';
import kastration from '@/assets/images/home-catogery-de/10_Kastration.jpg';
import maulhohle from '@/assets/images/home-catogery-de/11_Maulhohle.jpg';
import verhalten from '@/assets/images/home-catogery-de/12_Verhalten.jpg';
import aufzuchtWachstum from '@/assets/images/home-catogery-de/13_AufzuchtWachstum.jpg';
import prophylaxe from '@/assets/images/home-catogery-de/14_Prophylaxe.jpg';
import pillAssist from '@/assets/images/home-catogery-de/15_PillAssist.jpg';

import puppyRuImg from '@/assets/images/banner-list/puppy-ru.png';
import kittenRuImg from '@/assets/images/banner-list/kitten-ru.png';
import catsRuImg from '@/assets/images/banner-list/cats-ru.png';

const CURRENT_LANGFILE = locales;

export const IMG_DEFAULT =
  'data:image/png;base64,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';
export const SUBSCRIPTION_DISCOUNT_RATE = '35%';

export const DELIVER_STATUS_ENUM = {
  NOT_YET_SHIPPED: CURRENT_LANGFILE['deliveryStatus.NOT_YET_SHIPPED'],
  SHIPPED: CURRENT_LANGFILE['deliveryStatus.SHIPPED'],
  PART_SHIPPED: CURRENT_LANGFILE['deliveryStatus.PART_SHIPPED'],
  VOID: CURRENT_LANGFILE['deliveryStatus.VOID']
};
export const ORDER_STATUS_ENUM = {
  INIT: CURRENT_LANGFILE['orderStatus.INIT'],
  REMEDY: CURRENT_LANGFILE['orderStatus.REMEDY'],
  REFUND: CURRENT_LANGFILE['orderStatus.REFUND'],
  AUDIT: CURRENT_LANGFILE['orderStatus.AUDIT'],
  DELIVERED_PART: CURRENT_LANGFILE['orderStatus.DELIVERED_PART'],
  DELIVERED: CURRENT_LANGFILE['orderStatus.DELIVERED'],
  CONFIRMED: CURRENT_LANGFILE['orderStatus.CONFIRMED'],
  COMPLETED: CURRENT_LANGFILE['orderStatus.COMPLETED'],
  VOID: CURRENT_LANGFILE['orderStatus.VOID']
};
export const PAY_STATUS_ENUM = {
  REFUND: CURRENT_LANGFILE['payStatus.REFUND'],
  NOT_PAID: CURRENT_LANGFILE['payStatus.NOT_PAID'],
  PAID: CURRENT_LANGFILE['payStatus.PAID'],
  PAYING: CURRENT_LANGFILE['payStatus.PAID_IN']
};

export const STORE_CATE_ENUM = [
  {
    url: '/list/dogs',
    category: 'dogs',
    cateName: [
      'Prescription dogs',
      'VD dogs',
      'Breed dogs',
      'Chien',
      'Chiot',
      'Puppy',
      'Dogs',
      'Dog'
    ],
    text: CURRENT_LANGFILE['product.catogery5.name'],
    title: CURRENT_LANGFILE['product.catogery5.title'],
    desc: CURRENT_LANGFILE['product.catogery5.desc'],
    img: dogsImg
  },
  {
    url: '/list/cats',
    category: 'cats',
    cateName: [
      'Prescription cats',
      'VD cats',
      'Breed cats',
      'Chat',
      'Chaton',
      'Kitten',
      'Cats',
      'Cat'
    ],
    text: CURRENT_LANGFILE['product.catogery6.name'],
    title: CURRENT_LANGFILE['product.catogery6.title'],
    desc: CURRENT_LANGFILE['product.catogery6.desc']
  }
];

export const STORE_CATOGERY_ENUM = {
  en: [
    {
      url: '/list/dogs-en',
      category: 'dogs-en',
      cateName: ['Dog'],
      textLangKey: 'product.en.catogery1.name',
      text: CURRENT_LANGFILE['product.en.catogery1.name'],
      title: CURRENT_LANGFILE['product.en.catogery1.title'],
      desc: CURRENT_LANGFILE['product.en.catogery1.desc'],
      img: dogsImg,
      homeImg:
        'https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd4ad0ca3/Homepage/Dog_categorie USA@2x.jpg?sw=144&amp;sfrm=png'
    },
    {
      url: '/list/cats-en',
      category: 'cats-en',
      cateName: ['Cat'],
      textLangKey: 'product.en.catogery2.name',
      text: CURRENT_LANGFILE['product.ru.catogery2.name'],
      title: CURRENT_LANGFILE['product.ru.catogery2.title'],
      desc: CURRENT_LANGFILE['product.ru.catogery2.desc'],
      img: catsRuImg,
      homeImg:
        'https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd29d71bf/Homepage/Cat_categorie-USA@2x.jpg?sw=144&amp;sfrm=png'
    },
    {
      url: '/list/keywords/puppy',
      category: '',
      cateName: [''],
      textLangKey: 'product.en.catogery3.name',
      text: CURRENT_LANGFILE['product.ru.catogery3.name'],
      homeImg:
        'https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwbc0eb98a/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;sfrm=png'
    },
    {
      url: '/list/keywords/kitten',
      category: '',
      cateName: [],
      textLangKey: 'product.en.catogery4.name',
      text: CURRENT_LANGFILE['product.ru.catogery4.name'],
      homeImg:
        'https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4bc1f713/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;sfrm=png'
    }
  ],
  es: [
    {
      url: '/list/vd',
      category: 'vd',
      cateName: ['VD cats'],
      textLangKey: 'product.catogery4.name',
      text: CURRENT_LANGFILE['product.catogery4.name'],
      title: CURRENT_LANGFILE['product.catogery4.title'],
      desc: CURRENT_LANGFILE['product.catogery4.desc'],
      img: catsImg,
      homeImg: CARECAT
    },
    {
      url: '/list/prescription-cats',
      category: 'prescription-cats',
      cateName: ['Prescription cats'],
      textLangKey: 'product.catogery2.name',
      text: CURRENT_LANGFILE['product.catogery2.name'],
      title: CURRENT_LANGFILE['product.catogery2.title'],
      desc: CURRENT_LANGFILE['product.catogery2.desc'],
      img: catsImg,
      homeImg: DIETCAT
    },
    {
      url: '/list/breed-cats',
      category: 'breed-cats',
      cateName: ['Breed cats'],
      textLangKey: 'product.catogery7.name',
      text: CURRENT_LANGFILE['product.catogery7.name'],
      title: CURRENT_LANGFILE['product.catogery7.title'],
      desc: CURRENT_LANGFILE['product.catogery7.desc'],
      img: breedCatsImg,
      homeImg: Bundles_Breed_Cat
    },
    {
      url: '/list/vcn',
      category: 'vcn',
      cateName: ['VD dogs'],
      textLangKey: 'product.catogery3.name',
      text: CURRENT_LANGFILE['product.catogery3.name'],
      title: CURRENT_LANGFILE['product.catogery3.title'],
      desc: CURRENT_LANGFILE['product.catogery3.desc'],
      img: dogsImg,
      homeImg: CAREDOG
    },
    {
      url: '/list/prescription-dogs',
      category: 'prescription-dogs', // url的查询参数
      cateName: ['Prescription dogs'], // 匹配接口storelist相同的名字
      textLangKey: 'product.catogery1.name',
      text: CURRENT_LANGFILE['product.catogery1.name'], // 该分类名字，用于导航显示和GTM插码
      title: CURRENT_LANGFILE['product.catogery1.title'], // 该分类标题(用于列表页顶部显示)
      desc: CURRENT_LANGFILE['product.catogery1.desc'], // 该分类描述(用于列表页顶部显示)
      img: dogsImg,
      homeImg: DIETDOG
    },
    {
      url: '/list/breed-dogs',
      category: 'breed-dogs',
      cateName: ['Breed dogs'],
      textLangKey: 'product.catogery8.name',
      text: CURRENT_LANGFILE['product.catogery8.name'],
      title: CURRENT_LANGFILE['product.catogery8.title'],
      desc: CURRENT_LANGFILE['product.catogery8.desc'],
      img: breedDogsImg,
      homeImg: Bundles_Breed_Dog
    }
  ],
  de: [
    {
      url: '/list/untere-harnwege',
      category: 'untere-harnwege',
      cateName: ['Untere Harnwege'],
      textLangKey: 'product.de.catogery1.name',
      text: CURRENT_LANGFILE['product.de.catogery1.name'],
      title: CURRENT_LANGFILE['product.de.catogery1.title'],
      desc: CURRENT_LANGFILE['product.de.catogery1.desc'],
      img: dogsImg,
      homeImg: untereHarnwege
    },
    {
      url: '/list/haut-fell',
      category: 'haut-fell',
      cateName: ['Haut & Fell'],
      textLangKey: 'product.de.catogery2.name',
      text: CURRENT_LANGFILE['product.de.catogery2.name'],
      title: CURRENT_LANGFILE['product.de.catogery2.title'],
      desc: CURRENT_LANGFILE['product.de.catogery2.desc'],
      img: dogsImg,
      homeImg: hautFell
    },
    {
      url: '/list/ubergewicht',
      category: 'ubergewicht',
      cateName: ['Übergewicht'],
      textLangKey: 'product.de.catogery3.name',
      text: CURRENT_LANGFILE['product.de.catogery3.name'],
      title: CURRENT_LANGFILE['product.de.catogery3.title'],
      desc: CURRENT_LANGFILE['product.de.catogery3.desc'],
      img: dogsImg,
      homeImg: ubergewicht
    },
    {
      url: '/list/diabetesMellitus',
      category: 'diabetesMellitus',
      cateName: ['Diabetes mellitus'],
      textLangKey: 'product.de.catogery4.name',
      text: CURRENT_LANGFILE['product.de.catogery4.name'],
      title: CURRENT_LANGFILE['product.de.catogery4.title'],
      desc: CURRENT_LANGFILE['product.de.catogery4.desc'],
      img: dogsImg,
      homeImg: diabetesMellitus
    },
    {
      url: '/list/magen-darm-trakt',
      category: 'magen-darm-trakt',
      cateName: ['Magen-Darm-Trakt'],
      textLangKey: 'product.de.catogery5.name',
      text: CURRENT_LANGFILE['product.de.catogery5.name'],
      title: CURRENT_LANGFILE['product.de.catogery5.title'],
      desc: CURRENT_LANGFILE['product.de.catogery5.desc'],
      img: dogsImg,
      homeImg: magenDarmTrakt
    },
    {
      url: '/list/leber',
      category: 'leber',
      cateName: ['Leber'],
      textLangKey: 'product.de.catogery6.name',
      text: CURRENT_LANGFILE['product.de.catogery6.name'],
      title: CURRENT_LANGFILE['product.de.catogery6.title'],
      desc: CURRENT_LANGFILE['product.de.catogery6.desc'],
      img: dogsImg,
      homeImg: leber
    },
    {
      url: '/list/niere',
      category: 'niere',
      cateName: ['Niere'],
      textLangKey: 'product.de.catogery7.name',
      text: CURRENT_LANGFILE['product.de.catogery7.name'],
      title: CURRENT_LANGFILE['product.de.catogery7.title'],
      desc: CURRENT_LANGFILE['product.de.catogery7.desc'],
      img: dogsImg,
      homeImg: niere
    },
    {
      url: '/list/gelenke',
      category: 'gelenke',
      cateName: ['Gelenke'],
      textLangKey: 'product.de.catogery8.name',
      text: CURRENT_LANGFILE['product.de.catogery8.name'],
      title: CURRENT_LANGFILE['product.de.catogery8.title'],
      desc: CURRENT_LANGFILE['product.de.catogery8.desc'],
      img: dogsImg,
      homeImg: gelenke
    },
    {
      url: '/list/herz',
      category: 'herz',
      cateName: ['Herz'],
      textLangKey: 'product.de.catogery9.name',
      text: CURRENT_LANGFILE['product.de.catogery9.name'],
      title: CURRENT_LANGFILE['product.de.catogery9.title'],
      desc: CURRENT_LANGFILE['product.de.catogery9.desc'],
      img: dogsImg,
      homeImg: herz
    },
    {
      url: '/list/kastration',
      category: 'kastration',
      cateName: ['Kastration'],
      textLangKey: 'product.de.catogery10.name',
      text: CURRENT_LANGFILE['product.de.catogery10.name'],
      title: CURRENT_LANGFILE['product.de.catogery10.title'],
      desc: CURRENT_LANGFILE['product.de.catogery10.desc'],
      img: dogsImg,
      homeImg: kastration
    },
    {
      url: '/list/maulhohle',
      category: 'maulhohle',
      cateName: ['Maulhöhle'],
      textLangKey: 'product.de.catogery11.name',
      text: CURRENT_LANGFILE['product.de.catogery11.name'],
      title: CURRENT_LANGFILE['product.de.catogery11.title'],
      desc: CURRENT_LANGFILE['product.de.catogery11.desc'],
      img: dogsImg,
      homeImg: maulhohle
    },
    {
      url: '/list/verhalten',
      category: 'verhalten',
      cateName: ['Verhalten'],
      textLangKey: 'product.de.catogery12.name',
      text: CURRENT_LANGFILE['product.de.catogery12.name'],
      title: CURRENT_LANGFILE['product.de.catogery12.title'],
      desc: CURRENT_LANGFILE['product.de.catogery12.desc'],
      img: dogsImg,
      homeImg: verhalten
    },
    {
      url: '/list/aufzuchtWachstum',
      category: 'aufzuchtWachstum',
      cateName: ['Aufzucht & Wachstum'],
      textLangKey: 'product.de.catogery13.name',
      text: CURRENT_LANGFILE['product.de.catogery13.name'],
      title: CURRENT_LANGFILE['product.de.catogery13.title'],
      desc: CURRENT_LANGFILE['product.de.catogery13.desc'],
      img: dogsImg,
      homeImg: aufzuchtWachstum
    },
    {
      url: '/list/prophylaxe',
      category: 'prophylaxe',
      cateName: ['Prophylaxe'],
      textLangKey: 'product.de.catogery14.name',
      text: CURRENT_LANGFILE['product.de.catogery14.name'],
      title: CURRENT_LANGFILE['product.de.catogery14.title'],
      desc: CURRENT_LANGFILE['product.de.catogery14.desc'],
      img: dogsImg,
      homeImg: prophylaxe
    },
    {
      url: '/list/pill-assist',
      category: 'pill-assist',
      cateName: ['Pill Assist'],
      textLangKey: 'product.de.catogery15.name',
      text: CURRENT_LANGFILE['product.de.catogery15.name'],
      title: CURRENT_LANGFILE['product.de.catogery15.title'],
      desc: CURRENT_LANGFILE['product.de.catogery15.desc'],
      img: dogsImg,
      homeImg: pillAssist
    }

    // {
    //   url: '/list/urinary',
    //   category: 'urinary',
    //   cateName: ['Urinary'],
    //   textLangKey: 'product.de.catogery1.name',
    //   text: CURRENT_LANGFILE['product.de.catogery1.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery1.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery1.desc'],
    //   img: dogsImg,
    //   homeImg: Urinary
    // },
    // {
    //   url: '/list/dermatology',
    //   category: 'dermatology',
    //   cateName: ['Dermatology'],
    //   textLangKey: 'product.de.catogery2.name',
    //   text: CURRENT_LANGFILE['product.de.catogery2.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery2.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery2.desc'],
    //   img: dogsImg,
    //   homeImg: Dermatology
    // },
    // {
    //   url: '/list/weight-management',
    //   category: 'weight-management',
    //   cateName: ['Weight Management'],
    //   textLangKey: 'product.de.catogery3.name',
    //   text: CURRENT_LANGFILE['product.de.catogery3.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery3.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery3.desc'],
    //   img: dogsImg,
    //   homeImg: WeightManagement
    // },
    // {
    //   url: '/list/gastrointestinal-tract',
    //   category: 'gastrointestinal-tract',
    //   cateName: ['Gastrointestinal Tract'],
    //   textLangKey: 'product.de.catogery4.name',
    //   text: CURRENT_LANGFILE['product.de.catogery4.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery4.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery4.desc'],
    //   img: dogsImg,
    //   homeImg: Gastrointestinal
    // },
    // {
    //   url: '/list/vital-support',
    //   category: 'vital-support',
    //   cateName: ['Vital Support'],
    //   textLangKey: 'product.de.catogery5.name',
    //   text: CURRENT_LANGFILE['product.de.catogery5.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery5.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery5.desc'],
    //   img: dogsImg,
    //   homeImg: VitalSupport
    // },
    // {
    //   url: '/list/health-management',
    //   category: 'health-management',
    //   cateName: ['Health Management'],
    //   textLangKey: 'product.de.catogery6.name',
    //   text: CURRENT_LANGFILE['product.de.catogery6.name'],
    //   title: CURRENT_LANGFILE['product.de.catogery6.title'],
    //   desc: CURRENT_LANGFILE['product.de.catogery6.desc'],
    //   img: dogsImg,
    //   homeImg: HealthManagement
    // }
  ],
  fr: [
    {
      url: '/list/chien',
      category: 'chien',
      cateName: ['Chien'],
      textLangKey: 'product.fr.catogery1.name',
      text: CURRENT_LANGFILE['product.fr.catogery1.name'],
      title: CURRENT_LANGFILE['product.fr.catogery1.title'],
      desc: CURRENT_LANGFILE['product.fr.catogery1.desc'],
      img: dogsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/chat',
      category: 'chat',
      cateName: ['Chat'],
      textLangKey: 'product.fr.catogery2.name',
      text: CURRENT_LANGFILE['product.fr.catogery2.name'],
      title: CURRENT_LANGFILE['product.fr.catogery2.title'],
      desc: CURRENT_LANGFILE['product.fr.catogery2.desc'],
      img: catsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/chiot',
      category: 'chiot',
      cateName: ['Chiot'],
      textLangKey: 'product.fr.catogery3.name',
      text: CURRENT_LANGFILE['product.fr.catogery3.name'],
      title: CURRENT_LANGFILE['product.fr.catogery3.title'],
      desc: CURRENT_LANGFILE['product.fr.catogery3.desc'],
      img: dogsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpgs'
    },
    {
      url: '/list/chaton',
      category: 'chaton',
      cateName: ['Chaton'],
      textLangKey: 'product.fr.catogery4.name',
      text: CURRENT_LANGFILE['product.fr.catogery4.name'],
      title: CURRENT_LANGFILE['product.fr.catogery4.title'],
      desc: CURRENT_LANGFILE['product.fr.catogery4.desc'],
      img: catsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw93a47ae0/Homepage/1440x1440px_RC_Kitten_Second_Age.jpg?sw=144&sfrm=jpg'
    }
  ],
  ru: [
    {
      url: '/list/dogs-ru',
      category: 'dogs-ru',
      cateName: ['Dogs'],
      textLangKey: 'product.ru.catogery1.name',
      text: CURRENT_LANGFILE['product.ru.catogery1.name'],
      title: CURRENT_LANGFILE['product.ru.catogery1.title'],
      desc: CURRENT_LANGFILE['product.ru.catogery1.desc'],
      img: dogsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/cats-ru',
      category: 'cats-ru',
      cateName: ['Cats'],
      textLangKey: 'product.ru.catogery2.name',
      text: CURRENT_LANGFILE['product.ru.catogery2.name'],
      title: CURRENT_LANGFILE['product.ru.catogery2.title'],
      desc: CURRENT_LANGFILE['product.ru.catogery2.desc'],
      img: catsRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/puppy-ru',
      category: 'puppy-ru',
      cateName: ['Puppy'],
      textLangKey: 'product.ru.catogery3.name',
      text: CURRENT_LANGFILE['product.ru.catogery3.name'],
      title: CURRENT_LANGFILE['product.ru.catogery3.title'],
      desc: CURRENT_LANGFILE['product.ru.catogery3.desc'],
      img: puppyRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpgs'
    },
    {
      url: '/list/kitten-ru',
      category: 'kitten-ru',
      cateName: ['Kitten'],
      textLangKey: 'product.ru.catogery4.name',
      text: CURRENT_LANGFILE['product.ru.catogery4.name'],
      title: CURRENT_LANGFILE['product.ru.catogery4.title'],
      desc: CURRENT_LANGFILE['product.ru.catogery4.desc'],
      img: kittenRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    }
  ],
  tr: [
    {
      url: '/list/dogs-tr',
      category: 'dogs-tr',
      cateName: ['Dogs'],
      textLangKey: 'product.tr.catogery1.name',
      text: CURRENT_LANGFILE['product.tr.catogery1.name'],
      title: CURRENT_LANGFILE['product.tr.catogery1.title'],
      desc: CURRENT_LANGFILE['product.tr.catogery1.desc'],
      img: dogsImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/cats-tr',
      category: 'cats-tr',
      cateName: ['Cats'],
      textLangKey: 'product.tr.catogery2.name',
      text: CURRENT_LANGFILE['product.tr.catogery2.name'],
      title: CURRENT_LANGFILE['product.tr.catogery2.title'],
      desc: CURRENT_LANGFILE['product.tr.catogery2.desc'],
      img: catsRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    },
    {
      url: '/list/puppy-tr',
      category: 'puppy-tr',
      cateName: ['Puppy'],
      textLangKey: 'product.tr.catogery3.name',
      text: CURRENT_LANGFILE['product.tr.catogery3.name'],
      title: CURRENT_LANGFILE['product.tr.catogery3.title'],
      desc: CURRENT_LANGFILE['product.tr.catogery3.desc'],
      img: puppyRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpgs'
    },
    {
      url: '/list/kitten-tr',
      category: 'kitten-tr',
      cateName: ['Kitten'],
      textLangKey: 'product.tr.catogery4.name',
      text: CURRENT_LANGFILE['product.tr.catogery4.name'],
      title: CURRENT_LANGFILE['product.tr.catogery4.title'],
      desc: CURRENT_LANGFILE['product.tr.catogery4.desc'],
      img: kittenRuImg,
      homeImg:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;amp;sfrm=jpg'
    }
  ]
};

export const CREDIT_CARD_IMG_ENUM = {
  VISA: visaImg,
  MASTERCARD: mastercardImg,
  'AMERICAN EXPRESS': amexImg,
  DISCOVER: discoverImg,
  OXXO: oxxo,
  AMEX: amexImg
};

export const CREDIT_CARD_IMGURL_ENUM = [visaImg, amexImg, mastercardImg];
const tmpArr = [visaImg, mastercardImg];
export const ADYEN_CREDIT_CARD_IMGURL_ENUM =
  {
    fr: [visaImg, mastercardImg, cartebancaireImg],
    ru: [visaImg, mastercardImg, discoverImg, amexImg],
    en: [visaImg, mastercardImg, discoverImg, amexImg]
  }[process.env.REACT_APP_LANG] || tmpArr;
export const ADYEN_CREDIT_CARD_BRANDS = {
  fr: ['mc', 'visa', 'cartebancaire'],
  ru: ['mc', 'visa', 'amex', 'discover'],
  en: ['mc', 'visa', 'amex', 'discover'],
  de: ['mc', 'visa']
} || ['mc', 'visa', 'amex'];

export const EMAIL_REGEXP = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
export const ADDRESS_RULE = [
  {
    key: 'firstName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.firstName']
    )
  },
  {
    key: 'lastName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.lastName']
    )
  },
  {
    key: 'address1',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.address1']
    )
  },
  {
    key: 'country',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.country']
    )
  },
  {
    key: 'city',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.city']
    )
  },
  // {
  //   key: 'email',
  //   regExp: EMAIL_REGEXP,
  //   require: true,
  //   errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
  //     /{.+}/,
  //     CURRENT_LANGFILE['email']
  //   )
  // },
  {
    key: 'phoneNumber',
    regExp: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '',
    regExp: '',
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectPhoneNumber']
  },
  {
    key: 'postCode',
    regExp: /\d{5}/,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectPostCode']
  }
];

export const PAYMENT_METHOD_RULE = [
  {
    key: 'phoneNumber',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.phoneNumber']
    )
  },
  {
    key: 'cardOwner',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.cardOwner']
    )
  },
  {
    key: 'email',
    regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['email']
    )
  }
];

export const PRESONAL_INFO_RULE = [
  {
    key: 'firstName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.firstName']
    )
  },
  {
    key: 'lastName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.lastName']
    )
  },
  {
    key: 'address1',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.address1']
    )
  },
  {
    key: 'country',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.country']
    )
  },
  {
    key: 'city',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.city']
    )
  },
  {
    key: 'email',
    regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['email']
    )
  },
  {
    key: 'phoneNumber',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.phoneNumber']
    )
  },
  {
    key: 'postCode',
    regExp: /\d{5}/,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.postCode2']
    )
  }
];
