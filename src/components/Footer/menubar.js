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
/**
 * 开启hub时，请求hub接口；若hub存在数据，则显示hub，否则显示json
 * 1. 若hub存在数据，则显示hub footer
 * 2. 否则显示storepotal配置的json
 * 关闭hub时，显示storepotal配置的json
 */

/**
 * json配置手册:
 * 1.最外层添加rc-list-overwrite样式名
 * 2.每个header添加J_rc-list__header样式名
 * 3.在每个header里添加<span class="iconfont iconDown icon-down"></span>
 */
export const menubarJSON = {
  de: `<ul
  class="
    rc-list
    rc-list--footer-columns
    rc-list--blank
    rc-list--align
    rc-list--inverse
    rc-list-overwrite
  "
  role="menubar"
>
  <li class="rc-list__item rc-list__item--group">
    <h3
      class="
        rc-list__header
        J_rc-list__header
        flex
        justify-between justify-items-center
      "
      role="menuitem"
      data-toggle="nav-footer-list-0"
      aria-haspopup="false"
      aria-selected="false"
      id="nav-footer-0"
    >
      <span>ÜBER UNS</span>
      <span class="iconfont iconDown icon-down"></span>
    </h3>
    <ul
      class="rc-list rc-list--blank rc-list--align overflow-hidden"
      role="menu"
      id="nav-footer-list-0"
      aria-labelledby="nav-footer-0"
    >
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/our-history#Our%20history"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Unsere Geschichte</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/our-values#Our%20values"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Unsere Werte</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/sustainability#Sustainability"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Nachhaltigkeit</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Qualität und Futtermittelsicherheit</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/news"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Neuigkeiten</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/acceptance-guarantee"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Akzeptanzgarantie</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/newsletter"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Newsletter</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/promotions"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Aktionen</a
        >
      </li>
    </ul>
  </li>
  <li class="rc-list__item rc-list__item--group">
    <h3
      class="
        rc-list__header
        J_rc-list__header
        flex
        justify-between justify-items-center
      "
      role="menuitem"
      data-toggle="nav-footer-list-1"
      aria-haspopup="false"
      aria-selected="false"
      id="nav-footer-1"
    >
      <span>PRODUKTE</span>
      <span class="iconfont iconDown icon-down"></span>
    </h3>
    <ul
      class="rc-list rc-list--blank rc-list--align overflow-hidden"
      role="menu"
      id="nav-footer-list-1"
      aria-labelledby="nav-footer-1"
    >
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/cats"
          >Für Katzen</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/dogs"
          >Für Hunde</a
        >
      </li>
    </ul>
  </li>
  <li class="rc-list__item rc-list__item--group">
    <h3
      class="
        rc-list__header
        J_rc-list__header
        flex
        justify-between justify-items-center
      "
      role="menuitem"
      data-toggle="nav-footer-list-2"
      aria-haspopup="false"
      aria-selected="false"
      id="nav-footer-2"
    >
      <span>HABEN SIE FRAGEN?</span>
      <span class="iconfont iconDown icon-down"></span>
    </h3>
    <ul
      class="rc-list rc-list--blank rc-list--align overflow-hidden"
      role="menu"
      id="nav-footer-list-2"
      aria-labelledby="nav-footer-2"
    >
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/help"
          >Kontakt</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/faq"
          >FAQ Versand</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/faq"
          >FAQ Allgemeines</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.royalcanin.com/de/about-us/imprint"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Impressum</a
        >
      </li>
    </ul>
  </li>
  <li class="rc-list__item rc-list__item--group">
    <h3
      class="
        rc-list__header
        J_rc-list__header
        flex
        justify-between justify-items-center
      "
      role="menuitem"
      data-toggle="nav-footer-list-3"
      aria-haspopup="false"
      aria-selected="false"
      id="nav-footer-3"
    >
      <span>WEITERES</span>
      <span class="iconfont iconDown icon-down"></span>
    </h3>
    <ul
      class="rc-list rc-list--blank rc-list--align overflow-hidden"
      role="menu"
      id="nav-footer-list-3"
      aria-labelledby="nav-footer-3"
    >
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 1111"
          href="https://www.mars.com/privacy-policy-germany"
          target="_blank"
          role="menuitem"
          rel="nofollow"
          >Datenschutz</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/Terms-And-Conditions"
          >Allgemeine Geschäftsbedingungen</a
        >
      </li>
      <li class="rc-list__item">
        <a
          class="rc-list__link text-decoration-none color-f6f6f6 66"
          role="menuitem"
          href="/de/Widerrufsbelehrung"
          >Widerrufsbelehrung</a
        >
      </li>
    </ul>
  </li>
</ul>
`,
  mx: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>SOBRE ROYAL CANIN®</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        href="https://www.royalcanin.com/mx/about-us?_ga=2.264139332.971640032.1596965811-769183423.1596011687"
        >Sobre Nosotros</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://shop.royalcanin.mx/termuse"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Nuestros valores</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Quality-safety"
        >Calidad y seguridad</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="800 024 77 64"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Nutrición específica</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTOS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/cats"
        >GATOS</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/dogs"
        >PERROS</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>AYUDA</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/help"
        >Contacto</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/faq"
        >Preguntas frecuentes</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/requestinvoice"
        >Solicitud de factura</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>Ligas de Interés</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/privacypolicy"
        >Política de privacidad</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        href="https://www.mars.com/global/policies/note-to-parents/np-spanish"
        >Información para padres de familia</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/termuse"
        >Términos de uso del sitio web</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        href="https://www.mars.com/cookies-spain"
        >Política de recopilación de cookies</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  us: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Tailorednutrition"
        >Tailored Nutrition</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/dogs"
        >Dogs</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ACCOUNT</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Club Shipments</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>HELP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  fr: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
    style="max-height: 0px"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/About-Us"
        >A propos</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/Values"
        >Nos valeurs</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/Quality-safety"
        >Qualité et sécurité alimentaire</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>ALIMENTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/cats"
        >Chat</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/dogs"
        >Chien</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/Tailorednutrition"
        >Santé et Nutrition</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/product-finder"
        >Aide aux choix</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>COMPTE</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/fr/account"
        >Mon compte</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/fr/account"
        >Mes commandes</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/fr/account"
        >Mes abonnements</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>AIDE</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/help"
        >Aide</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/faq"
        >FAQ</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-4"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-4"
  >
    <span>AUTRES</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-4"
    aria-labelledby="nav-footer-4"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/fr/general-terms-conditions"
        >Conditions Générales de Vente</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  tr: `<ul
  class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN® HAKKINDA</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.royalcanin.com/de/about-us/our-history#Our%20history"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Hakkımızda</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.royalcanin.com/de/about-us/our-values#Our%20values"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Değerlerimiz</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/Quality-safety"
        >Kalite ve güvenlik</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/Tailorednutrition"
        >Sağlık ve Beslenme</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>ÜRÜNLER</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/cats"
        >Kedi</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/dogs"
        >Köpek</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>HESAP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/account"
        >Hesabım</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/account/orders"
        >Sipariş Takibi</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/subscription-landing-tr"
        >Otomatik Sipariş</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>YARDIM</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/help"
        >Yardım</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/tr/faq"
        >S.S.S.</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-4"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-4"
  >
    <span>DİĞER</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-4"
    aria-labelledby="nav-footer-4"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.shop.royalcanin.com.tr/tr/general-terms-conditions.html"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Şartlar ve Koşullar</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.shop.royalcanin.com.tr/tr/privacy-statement.html"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Gizlilik Politikası</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.shop.royalcanin.com.tr/tr/Cookiepolicy.html"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Çerez Bildirimi</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  ru: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>О КОМПАНИИ ROYAL CANIN®</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/aboutUs"
        >О нас</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/values-ru"
        >Наши ценности</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/Quality-safety"
        >Качество и безопасность</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/Tailorednutrition"
        >Здоровье и питание</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>ПРОДУКТЫ</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/cats"
        >Кошки</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/dogs"
        >Собаки</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/subscription-landing-ru"
        >Вступить в КЛУБ</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ПОМОЩЬ</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/account"
        >Мой личный кабинет</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/help"
        >Контакты</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/shipmentConditions"
        >Условия доставки</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/general-conditions"
        >Возврат товара</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/faq"
        >Часто задаваемые вопросы</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>ДОПОЛНИТЕЛЬНО</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/ru/general-conditions"
        >Пользовательское соглашение</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.mars.com/global/policies/privacy/pp-russian"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Политика конфиденциальности</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.mars.com/global/policies/note-to-parents/np-russian"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Информация для родителей</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.mars.com/global/policies/legal/ld-russian"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Условия использования веб-сайта</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 1111"
        href="https://www.mars.com/global/policies/cookie/cn-russian"
        target="_blank"
        role="menuitem"
        rel="nofollow"
        >Политика сбора Cookie</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  uk: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/Tailorednutrition"
        >Tailored Nutrition</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/dogs"
        >Dogs</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ACCOUNT</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/uk/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/uk/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/uk/account"
        >My Club Shipments</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>HELP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/uk/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  se: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
  rc-list-overwrite
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Tailorednutrition"
        >Tailored Nutrition</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/dogs"
        >Dogs</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ACCOUNT</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Club Shipments</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>HELP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  ca: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Tailorednutrition"
        >Tailored Nutrition</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/dogs"
        >Dogs</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ACCOUNT</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Club Shipments</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>HELP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  core: `<ul
class="
  rc-list
  rc-list--footer-columns
  rc-list--blank
  rc-list--align
  rc-list--inverse
"
role="menubar"
>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-0"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-0"
  >
    <span>ROYAL CANIN</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-0"
    aria-labelledby="nav-footer-0"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/Tailorednutrition"
        >Tailored Nutrition</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-1"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-1"
  >
    <span>PRODUCTS</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-1"
    aria-labelledby="nav-footer-1"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/dogs"
        >Dogs</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-2"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-2"
  >
    <span>ACCOUNT</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-2"
    aria-labelledby="nav-footer-2"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 55"
        href="/account"
        >My Club Shipments</a
      >
    </li>
  </ul>
</li>
<li class="rc-list__item rc-list__item--group">
  <h3
    class="
      rc-list__header
      J_rc-list__header
      flex
      justify-between justify-items-center
    "
    role="menuitem"
    data-toggle="nav-footer-list-3"
    aria-haspopup="true"
    aria-selected="false"
    id="nav-footer-3"
  >
    <span>HELP</span>
    <span class="iconfont iconDown icon-down"></span>
  </h3>
  <ul
    class="rc-list rc-list--blank rc-list--align overflow-hidden"
    role="menu"
    id="nav-footer-list-3"
    aria-labelledby="nav-footer-3"
  >
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 66"
        role="menuitem"
        href="/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`
};
