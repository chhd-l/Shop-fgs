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
            url: 'https://shop.royalcanin.com/Quality-safety.html',
            messageId: 'Quality Safety'
          },
          {
            prop: 'specificNutrition',
            url: 'https://shop.royalcanin.com/Tailorednutrition.html',
            messageId: 'Tailored Nutrition'
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
            prop: 'qualityAndSafety',
            url:
              'https://www.royalcanin.com/mx/about-us/quality-and-food-safety',
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
          { link: '/list/cats', messageId: 'de_cats' },
          { link: '/list/dogs', messageId: 'de_dogs' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help2',
        list: [
          {
            url: 'https://shopstg.royalcanin.com/help',
            messageId: 'footer.contacts'
          },
          { link: '/FAQ/catogery-0', messageId: 'footer.FAQVersand' },
          { link: '/FAQ/catogery-1', messageId: 'footer.FAQAllgemeines' }
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
          { link: '/Terms-And-Conditions', messageId: 'footer.termsOfService' },
          { link: '/Widerrufsbelehrung', messageId: 'footer.withdrawal' }
        ]
      }
    ]
  ],
  fr: [
    [
      {
        titleId: 'ROYAL CANIN',
        list: [
          {
            url: 'https://shop.royalcanin.fr/About-Us.html',
            messageId: 'A propos'
          },
          {
            url: 'https://shop.royalcanin.fr/Values.html',
            messageId: 'Nos valeurs'
          },
          {
            url: 'https://shop.royalcanin.fr/Quality-safety.html',
            messageId: 'Qualité et sécurité alimentaire'
          }
        ]
      }
    ],
    [
      {
        titleId: 'ALIMENTS',
        list: [
          { link: '/list/cats', messageId: 'Chat' },
          { link: '/list/dogs', messageId: 'Chien' },
          {
            url: 'https://shop.royalcanin.fr/Tailorednutrition.html',
            messageId: 'Santé et bien-être'
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
            url: 'https://shop.royalcanin.fr/general-terms-conditions.html',
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
            url: 'https://www.shop.royal-canin.ru/ru/About-Us.html',
            messageId: 'О нас'
          },
          {
            url: 'https://www.shop.royal-canin.ru/ru/Values.html',
            messageId: 'Наши ценности'
          },
          {
            // url: 'https://www.shop.royal-canin.ru/ru/Quality-safety.html',
            link: '/qualitySafety',
            messageId: 'Качество и безопасность'
          },
          {
            url: 'https://www.shop.royal-canin.ru/ru/Tailorednutrition.html',
            messageId: 'Здоровье и питание'
          }
        ]
      }
    ],
    [
      {
        titleId: 'ПРОДУКТЫ',
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
            url: '/shipmentConditions',
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
            prop: 'qualityAndSafety',
            url: 'https://www.shop.royalcanin.com.tr/tr/Quality-safety.html',
            messageId: 'Gıda Kalitesi ve Güvenliği'
          },
          {
            prop: 'specificNutrition',
            url:
              'https://www.shop.royalcanin.com.tr/tr/saglik-beslenme/Tailorednutrition.html',
            messageId: 'Sağlık ve Beslenme'
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
