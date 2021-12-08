export const menubar = {
  // titleId:列头部名称，list：每列的数据 {prop：stone portal配置的数据，messageId：列数据名称，url：前端自定义超链接，link：前端路由}
  us: [
    [
      {
        titleId: 'footer.aboutRoyalCanin',
        list: [
          { link: '/About-Us', messageId: 'aboutUs2' },
          { link: '/Values', messageId: 'Values' },
          { link: '/Quality-safety', messageId: 'qualitySafety' },
          { link: '/Tailorednutrition', messageId: 'tailorednutrition2' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/cats', messageId: 'cats2' },
          { link: '/dogs', messageId: 'dogs2' }
        ]
      }
    ],
    [
      {
        titleId: 'ACCOUNT',

        list: [
          { link: '/account', messageId: 'My Account', needLogin: true },
          { link: '/account/orders', messageId: 'My Orders', needLogin: true },
          {
            link: '/account/subscription',
            messageId: 'My Club Shipments',
            needLogin: true
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help',
        list: [
          { link: '/help/contact', messageId: 'Contact Us' },
          { link: '/faq', messageId: 'FAQs' }
        ]
      }
    ]
  ],
  mx: [
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
            link: '/Quality-safety',
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
          { link: '/cats', messageId: 'cats' },
          { link: '/dogs', messageId: 'dogs' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help',
        list: [
          { link: '/help', messageId: 'footer.contacts' },
          { link: '/faq', messageId: 'footer.FAQ' },
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
            url: 'https://www.royalcanin.com/de/about-us/our-history#Our%20history',
            messageId: 'footer.history'
          },
          {
            props: 'ourValues',
            url: 'https://www.royalcanin.com/de/about-us/our-values#Our%20values',
            messageId: 'footer.ourValues'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/sustainability#Sustainability',
            messageId: 'footer.consistence'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit',
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
          { link: '/cats', messageId: 'de_cats' },
          { link: '/dogs', messageId: 'de_dogs' }
        ]
      }
    ],
    [
      {
        titleId: 'footer.help2',
        list: [
          {
            link: `/help`,
            messageId: 'footer.contacts'
          },
          {
            link: {
              pathname: '/faq',
              state: {
                catogery: 'catogery-1'
              }
            },
            messageId: 'footer.FAQVersand'
          },
          {
            link: {
              pathname: '/faq',
              state: {
                catogery: 'catogery-0'
              }
            },
            messageId: 'footer.FAQAllgemeines'
          },
          {
            url: 'https://www.royalcanin.com/de/about-us/imprint',
            messageId: 'footer.imprint'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.Additionally2',
        list: [
          {
            url: 'https://www.mars.com/privacy-policy-germany',
            messageId: 'footer.privacyPolicy2'
          },
          { link: '/Terms-And-Conditions', messageId: 'footer.termsOfService' },
          { link: '/Widerrufsbelehrung', messageId: 'footer.withdrawal' }
          // { url: window.__.env.REACT_APP_ACCESS_PATH+'Terms-And-Conditions', messageId: 'footer.termsOfService' },
          // { url: window.__.env.REACT_APP_ACCESS_PATH+'Widerrufsbelehrung', messageId: 'footer.withdrawal' }
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
            link: '/About-Us',
            messageId: 'aboutUs2'
          },
          {
            link: '/Values',
            messageId: 'footer.ourValues'
          },
          {
            link: '/Quality-safety',
            messageId: 'footer.qualityAndSafety'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/cats', messageId: 'account.cat' },
          { link: '/dogs', messageId: 'account.dog' },
          {
            link: '/Tailorednutrition',
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
            messageId: 'Mon compte',
            needLogin: true
          },
          {
            link: '/account/orders',
            messageId: 'Mes commandes',
            needLogin: true
          },
          {
            link: '/account/subscription',
            messageId: 'Mes abonnements',
            needLogin: true
          }
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
          { link: '/faq', messageId: 'FAQ' }
        ]
      }
    ],
    [
      {
        titleId: 'AUTRES',
        list: [
          {
            link: '/general-terms-conditions',
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
            link: '/Quality-safety',
            messageId: 'footer.qualityAndSafety'
          },
          {
            link: '/Tailorednutrition',
            messageId: 'tailorednutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/cats', messageId: 'cats2' },
          { link: '/dogs', messageId: 'dogs2' },
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
            link: '/faq',
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
            url: 'https://www.mars.com/global/policies/note-to-parents/np-russian',
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
            link: '/Quality-safety',
            messageId: 'footer.qualityAndSafety'
          },
          {
            link: '/Tailorednutrition',
            messageId: 'tailorednutrition'
          }
        ]
      }
    ],
    [
      {
        titleId: 'footer.products',
        list: [
          { link: '/cats', messageId: 'cats2' },
          { link: '/dogs', messageId: 'dogs2' }
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
          { link: '/faq', messageId: 'S.S.S.' }
        ]
      }
    ],
    [
      {
        titleId: 'DİĞER',
        list: [
          {
            url: 'https://www.shop.royalcanin.com.tr/tr/general-terms-conditions.html',
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

export const menubarJSON = {
  de: '<ul class="rc-list rc-list--footer-columns rc-list--blank rc-list--align rc-list--inverse" role="menubar"><li class="rc-list__item rc-list__item--group"><h3 class="rc-list__header " role="menuitem" data-toggle="nav-footer-list-0" aria-haspopup="false" aria-selected="false" id="nav-footer-0">ÜBER UNS</h3><ul class="rc-list rc-list--blank rc-list--align overflow-hidden" role="menu" id="nav-footer-list-0" aria-labelledby="nav-footer-0" style="max-height: initial;"><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/our-history#Our%20history" target="_blank" role="menuitem" rel="nofollow">Unsere Geschichte</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/our-values#Our%20values" target="_blank" role="menuitem" rel="nofollow">Unsere Werte</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/sustainability#Sustainability" target="_blank" role="menuitem" rel="nofollow">Nachhaltigkeit</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit" target="_blank" role="menuitem" rel="nofollow">Qualität und Futtermittelsicherheit</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/news" target="_blank" role="menuitem" rel="nofollow">Neuigkeiten</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/acceptance-guarantee" target="_blank" role="menuitem" rel="nofollow">Akzeptanzgarantie</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/newsletter" target="_blank" role="menuitem" rel="nofollow">Newsletter</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/promotions" target="_blank" role="menuitem" rel="nofollow">Aktionen</a></li></ul></li><li class="rc-list__item rc-list__item--group"><h3 class="rc-list__header " role="menuitem" data-toggle="nav-footer-list-1" aria-haspopup="false" aria-selected="false" id="nav-footer-1">PRODUKTE</h3><ul class="rc-list rc-list--blank rc-list--align overflow-hidden" role="menu" id="nav-footer-list-1" aria-labelledby="nav-footer-1" style="max-height: initial;"><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/cats">Für Katzen</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/dogs">Für Hunde</a></li></ul></li><li class="rc-list__item rc-list__item--group"><h3 class="rc-list__header " role="menuitem" data-toggle="nav-footer-list-2" aria-haspopup="false" aria-selected="false" id="nav-footer-2">HABEN SIE FRAGEN?</h3><ul class="rc-list rc-list--blank rc-list--align overflow-hidden" role="menu" id="nav-footer-list-2" aria-labelledby="nav-footer-2" style="max-height: initial;"><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/help">Kontakt</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/faq">FAQ Versand</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/faq">FAQ Allgemeines</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.royalcanin.com/de/about-us/imprint" target="_blank" role="menuitem" rel="nofollow">Impressum</a></li></ul></li><li class="rc-list__item rc-list__item--group"><h3 class="rc-list__header " role="menuitem" data-toggle="nav-footer-list-3" aria-haspopup="false" aria-selected="false" id="nav-footer-3">WEITERES</h3><ul class="rc-list rc-list--blank rc-list--align overflow-hidden" role="menu" id="nav-footer-list-3" aria-labelledby="nav-footer-3" style="max-height: initial;"><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 1111" href="https://www.mars.com/privacy-policy-germany" target="_blank" role="menuitem" rel="nofollow">Datenschutz</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/Terms-And-Conditions">Allgemeine Geschäftsbedingungen</a></li><li class="rc-list__item"><a class="rc-list__link text-decoration-none color-f6f6f6 66" role="menuitem" href="/de/Widerrufsbelehrung">Widerrufsbelehrung</a></li></ul></li></ul>'
};
