export const menubar = {
  // titleId:列头部名称，list：每列的数据 {prop：stone portal配置的数据，messageId：列数据名称，url：前端自定义超链接，link：前端路由}
  en: [
    [
      {
        titleId: 'footer.aboutRoyalCanin',
        list: [
          { prop: 'contactUsUrl', messageId: 'aboutUs2' },
          {
            prop: 'ourValues',
            url: 'https://shop.royalcanin.com/Values.html',
            messageId: 'Values'
          },
          {
            link: '/qualitySafety',
            messageId: 'qualitySafety'
          },
          {
            link: '/tailorednutrition',
            messageId: 'tailorednutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/list/cats', messageId: 'cats2' },
          { link: '/list/dogs', messageId: 'dogs2' }
        ]
      }
    ],
    [
      {
        titleId: 'ACCOUNT',
        list: [
          { link: '/account', messageId: 'My Account' },
          { link: '/account/orders', messageId: 'My Orders' },
          { link: '/account/subscription', messageId: 'My Club Shipments' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help',
        list: [
          { link: '/help', messageId: 'Contact Us' },
          { link: '/FAQ/all', messageId: 'FAQs' }
        ]
      }
    ]
  ],
  es: [
    [
      {
        titleId: 'footer.aboutRoyalCanin',
        list: [
          { prop: 'contactUsUrl', messageId: 'aboutUs2' },
          {
            prop: 'ourValues',
            url: 'https://www.royalcanin.com/mx/about-us/our-values',
            messageId: 'footer.ourValues'
          },
          {
            link: '/qualitySafety',
            messageId: 'footer.qualityAndSafety'
          },
          {
            prop: 'specificNutrition',
            url: 'https://www.royalcanin.com/mx/tailored-nutrition',
            messageId: 'footer.healthAndNutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/list/cats', messageId: 'cats' },
          { link: '/list/dogs', messageId: 'dogs' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help',
        list: [
          { link: '/help', messageId: 'footer.contacts' },
          { link: '/FAQ/all', messageId: 'footer.FAQ' },
          { link: '/requestinvoice', messageId: 'footer.RequestInvoice' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.Additionally',
        list: [
          { link: '/privacypolicy', messageId: 'footer.privacyPolicy' },
          {
            prop: 'informationForParents',
            messageId: 'footer.informationForParents'
          },
          { link: '/termuse', messageId: 'footer.websiteTermsOfUse' },
          { prop: 'cookiesUrl', messageId: 'footer.cookieCollectionPolicy' }
        ]
      }
    ]
  ],
  de: [
    [
      {
        titleId: 'aboutUs',
        list: [
          {
            url:
              'https://www.royalcanin.com/de/about-us/our-history#Our%20history',
            messageId: 'footer.history'
          },
          {
            props: 'ourValues',
            url:
              'https://www.royalcanin.com/de/about-us/our-values#Our%20values',
            messageId: 'footer.ourValues'
          },
          {
            url:
              'https://www.royalcanin.com/de/about-us/sustainability#Sustainability',
            messageId: 'footer.consistence'
          },
          {
            url:
              'https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit',
            messageId: 'footer.qualityAndSafety'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/news',
            messageId: 'footer.news'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/acceptance-guarantee',
            messageId: 'footer.acceptance'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/newsletter',
            messageId: 'footer.newsletter'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/promotions',
            messageId: 'footer.action'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { url: process.env.REACT_APP_ACCESS_PATH+'list/cats', messageId: 'de_cats' },
          { url: process.env.REACT_APP_ACCESS_PATH+'list/dogs', messageId: 'de_dogs' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help2',
        list: [
          {
            url: `${process.env.REACT_APP_ACCESS_PATH}help`,
            messageId: 'footer.contacts'
          },
          { url: process.env.REACT_APP_ACCESS_PATH+'FAQ/catogery-1', messageId: 'footer.FAQVersand' },
          { url: process.env.REACT_APP_ACCESS_PATH+'FAQ/catogery-0', messageId: 'footer.FAQAllgemeines' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.Additionally2',
        list: [
          {
            url: 'https://www.royalcanin.com/de/about-us/data-protection',
            messageId: 'footer.privacyPolicy2'
          },
          // { link: '/Terms-And-Conditions', messageId: 'footer.termsOfService' },
          // { link: '/Widerrufsbelehrung', messageId: 'footer.withdrawal' }
          { url: process.env.REACT_APP_ACCESS_PATH+'Terms-And-Conditions', messageId: 'footer.termsOfService' },
          { url: process.env.REACT_APP_ACCESS_PATH+'Widerrufsbelehrung', messageId: 'footer.withdrawal' }
        ]
      }
    ]
  ],
  fr: [
    [
      {
        titleId: 'footer.aboutRoyalCanin',
        list: [
          {
            link: '/aboutUs',
            messageId: 'aboutUs2'
          },
          {
            link: '/Values',
            messageId: 'footer.ourValues'
          },
          {
            link: '/qualitySafety',
            messageId: 'footer.qualityAndSafety'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/list/CHATS', messageId: 'account.cat' },
          { link: '/list/CHIENS', messageId: 'account.dog' },
          {
            link: '/tailorednutrition',
            messageId: 'tailorednutrition'
          },
          {
            link: '/product-finder',
            messageId: 'product-finder'
          }
        ]
      }
    ],
    [
      {
        titleId: 'COMPTE',
        list: [
          // 我的账户，订单，订阅单
          {
            link: '/account',
            messageId: 'Mon compte'
          },
          { link: '/account/orders', messageId: 'Mes commandes' },
          { link: '/account/subscription', messageId: 'Mes abonnements' }
        ]
      }
    ],
    [
      {
        titleId: 'AIDE',
        list: [
          {
            link: '/help',
            messageId: 'Aide'
          },
          { link: '/FAQ/all', messageId: 'FAQ' }
        ]
      }
    ],
    [
      {
        titleId: 'AUTRES',
        list: [
          {
            link:'/general-terms-conditions',
            messageId: 'Conditions Générales de Vente'
          }
        ]
      }
    ]
  ],
  ru: [
    [
      {
        titleId: 'О КОМПАНИИ ROYAL CANIN®',
        list: [
          {
            // url: 'https://www.shop.royal-canin.ru/ru/About-Us.html',
            link: '/aboutUs',
            messageId: 'О нас'
          },
          {
            link: '/values-ru',
            messageId: 'Наши ценности'
          },
          {
            // url: 'https://www.shop.royal-canin.ru/ru/Quality-safety.html',
            link: '/qualitySafety',
            messageId: 'footer.qualityAndSafety'
          },
          {
            link: '/tailorednutrition',
            messageId: 'tailorednutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/list/cats', messageId: 'cats2' },
          { link: '/list/dogs', messageId: 'dogs2' },
          {
            link: '/subscription-landing-ru',
            messageId: 'account.subscription'
          }
        ]
      }
    ],
    [
      {
        titleId: 'ПОМОЩЬ',
        list: [
          // 我的账户，订单，订阅单
          {
            link: '/account',
            messageId: 'footer.myPersonalAccount'
          },
          { link: '/help', messageId: 'footer.contacts' },
          {
            link: '/shipmentConditions',
            messageId: 'Условия доставки'
          },
          {
            link: '/general-conditions',
            messageId: 'Возврат товара'
          },
          {
            link: '/FAQ/all',
            messageId: 'Часто задаваемые вопросы'
          }
        ]
      }
    ],
    [
      {
        titleId: 'ДОПОЛНИТЕЛЬНО',
        list: [
          {
            link: '/general-conditions',
            messageId: 'Пользовательское соглашение'
          },
          {
            url: 'https://www.mars.com/global/policies/privacy/pp-russian',
            messageId: 'Политика конфиденциальности'
          },
          {
            url:
              'https://www.mars.com/global/policies/note-to-parents/np-russian',
            messageId: 'Информация для родителей'
          },
          {
            url: 'https://www.mars.com/global/policies/legal/ld-russian',
            messageId: 'Условия использования веб-сайта'
          },
          {
            url: 'https://www.mars.com/global/policies/cookie/cn-russian',
            messageId: 'Политика сбора Cookie'
          }
        ]
      }
    ]
  ],
  tr: [
    [
      {
        titleId: 'footer.aboutRoyalCanin',
        list: [
          { prop: 'contactUsUrl', messageId: 'aboutUs2' },
          {
            prop: 'ourValues',
            url: 'https://www.shop.royalcanin.com.tr/tr/Values.html',
            messageId: 'Değerlerimiz'
          },
          {
            link: '/qualitySafety',
            messageId: 'footer.qualityAndSafety'
          },
          {
            link: '/tailorednutrition',
            messageId: 'tailorednutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/list/cats', messageId: 'cats2' },
          { link: '/list/dogs', messageId: 'dogs2' }
        ]
      }
    ],
    [
      {
        titleId: 'HESAP',
        list: [
          { link: '/account', messageId: 'Hesabım' },
          { link: '/account/orders', messageId: 'Sipariş Takibi' },
          { link: '/subscription-landing-tr', messageId: 'Otomatik Sipariş' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help',
        list: [
          { link: '/help', messageId: 'Yardım' },
          { link: '/FAQ/all', messageId: 'S.S.S.' }
        ]
      }
    ],
    [
      {
        titleId: 'DİĞER',
        list: [
          {
            url:
              'https://www.shop.royalcanin.com.tr/tr/general-terms-conditions.html',
            messageId: 'Şartlar ve Koşullar'
          },
          {
            url: 'https://www.shop.royalcanin.com.tr/tr/privacy-statement.html',
            messageId: 'Gizlilik Politikası'
          },
          {
            url: 'https://www.shop.royalcanin.com.tr/tr/Cookiepolicy.html',
            messageId: 'Çerez Bildirimi'
          }
        ]
      }
    ]
  ]
};
