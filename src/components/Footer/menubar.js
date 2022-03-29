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
  de: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/de/cats"
                  >Für Katzen</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/de/help"
                  >Kontakt</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/de/faq"
                  >FAQ Versand</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/de/Terms-And-Conditions"
                  >Allgemeine Geschäftsbedingungen</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/de/Widerrufsbelehrung"
                  >Widerrufsbelehrung</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Kontakt ROYAL CANIN®</p>
  <div class="rc-text--inverse">
    <p>Sie erreichen uns von Montag bis Freitag ab 08:00 Uhr bis 17:00 Uhr</p>
  </div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-mobile--xs
      rc-brand3
    "
    role="menuitem"
    href="tel:0221 937060 650"
    style="display: inline-block"
    >0221 937060 650</a
  >
  <a
    class="
      qhx
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
      text-white
    "
    role="menuitem"
    href="mailto:service.de@royalcanin.com"
    >E-Mail</a
  >
</div>`,
  mx: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/cats"
                  >GATOS</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/help"
                  >Contacto</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/faq"
                  >Preguntas frecuentes</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contacto ROYAL CANIN®</p>
  <div class="rc-text--inverse">
    <p>Horarios de atención al cliente de 9:00 am a 6:00 pm</p>
  </div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-mobile--xs
      rc-brand3
    "
    role="menuitem"
    href="tel:800 024 77 64"
    style="display: inline-block"
    >800 024 77 64</a
  ><a
    class="
      ctnus
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
    "
    role="menuitem"
    href="/help"
    >Contacto</a
  >
</div>`,
  us: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/About-Us"
                  >About Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/Values"
                  >Values</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/Quality-safety"
                  >Quality Safety</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/cats"
                  >Cats</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/account"
                  >My Account</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/account"
                  >My Orders</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/help/contact"
                  >Contact Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/faq"
                  >FAQs</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contact Royal Canin</p>
  <div class="rc-text--inverse">
    <p>Monday through Friday from 8.00 am to 4.30 pm CT.</p>
  </div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-mobile--xs
      rc-brand3
    "
    role="menuitem"
    href="tel:1-844-673-3772"
    style="display: inline-block"
    >1-844-673-3772</a
  ><a
    class="
      ctnus
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
    "
    role="menuitem"
    href="/help/contact"
    >Contact Us</a
  >
</div>`,
  fr: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contacter Royal Canin</p>
  <div class="rc-text--inverse">
    <p>
      Nos spécialistes sont disponibles de 8h30 à 12h30 et de 14h à 17h du lundi
      au vendredi.
    </p>
    <p>
      Pour toute question ou demande: suivi.dtc.france@royalcanin.com - Tél 0
      800 005 360 (appel non surtaxé)
    </p>
  </div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      qhx
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
      text-white
    "
    role="menuitem"
    href="mailto:suivi.dtc.france@royalcanin.com"
    >Contactez-nous</a
  >
</div>`,
  tr: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="https://www.royalcanin.com/de/about-us/our-history#Our%20history"
                  target="_blank"
                  role="menuitem"
                  rel="nofollow"
                  >Hakkımızda</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="https://www.royalcanin.com/de/about-us/our-values#Our%20values"
                  target="_blank"
                  role="menuitem"
                  rel="nofollow"
                  >Değerlerimiz</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/tr/Quality-safety"
                  >Kalite ve güvenlik</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/tr/cats"
                  >Kedi</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/tr/account"
                  >Hesabım</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/tr/account/orders"
                  >Sipariş Takibi</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/tr/help"
                  >Yardım</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="https://www.shop.royalcanin.com.tr/tr/general-terms-conditions.html"
                  target="_blank"
                  role="menuitem"
                  rel="nofollow"
                  >Şartlar ve Koşullar</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="https://www.shop.royalcanin.com.tr/tr/privacy-statement.html"
                  target="_blank"
                  role="menuitem"
                  rel="nofollow"
                  >Gizlilik Politikası</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contact Royal Canin</p>
  <div class="rc-text--inverse"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      qhx
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
      text-white
    "
    role="menuitem"
    href="mailto:info.de@royalcanin.com"
    >Contact Us</a
  >
</div>`,
  ru: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/aboutUs"
                  >О нас</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/values-ru"
                  >Наши ценности</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/Quality-safety"
                  >Качество и безопасность</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/cats"
                  >Кошки</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/dogs"
                  >Собаки</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/account"
                  >Мой личный кабинет</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/help"
                  >Контакты</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/shipmentConditions"
                  >Условия доставки</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/ru/general-conditions"
                  >Возврат товара</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Связаться с ROYAL CANIN®</p>
  <div class="rc-text--inverse"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
>
  <a
    class="
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-mobile--xs
      rc-brand3
    "
    role="menuitem"
    href="tel:"
    style="display: inline-block"
  ></a
  ><a
    class="
      ctnus
      rc-btn rc-btn--inverse rc-btn--icon-label
      rc-icon
      rc-email--xs
      rc-brand3
    "
    role="menuitem"
    href="/ru/aboutUs-ru"
    >Связаться с нами</a
  >
</div>`,
  uk: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/About-Us"
                  >About Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/Values"
                  >Values</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/Quality-safety"
                  >Quality Safety</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/cats"
                  >Cats</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/uk/account"
                  >My Account</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/uk/account"
                  >My Orders</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/help/contact"
                  >Contact Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/uk/faq"
                  >FAQs</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contact Royal Canin</p>
  <div class="rc-text--inverse"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
></div>
`,
  se: `<div class="md:mb-10 col-span-12">
  <div class="rc-divider hidden md:block"></div>
  <div class="rc-layout-container rc-one-column rc-padding-x--xs">
    <div class="rc-column rc-padding-x--xs">
      <nav
        data-toggle-group="mobile"
        data-toggle-effect="rc-expand--vertical"
        class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      >
        <ul
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/About-Us"
                  >About Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/Values"
                  >Values</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/Quality-safety"
                  >Quality Safety</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/cats"
                  >Cats</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/account"
                  >My Account</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  href="/account"
                  >My Orders</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
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
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/help/contact"
                  >Contact Us</a
                >
              </li>
              <li class="rc-list__item">
                <a
                  class="
                    rc-list__link
                    text-decoration-none
                    color-f6f6f6
                    ui-cursor-pointer
                  "
                  role="menuitem"
                  href="/faq"
                  >FAQs</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="rc-divider hidden md:block"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-8
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
>
  <p class="rc-espilon rc-text--inverse">Contact Royal Canin</p>
  <div class="rc-text--inverse"></div>
</div>
<div
  class="
    rc-column
    col-span-12
    md:col-span-4
    rc-padding-bottom--none
    rc-padding-top--lg--mobile
  "
  id="J_footer_payment_box"
></div>
<div
  class="
    rc-column
    rc-padding-x--none
    rc-padding-top--xs--desktop
    rc-padding-y--md--mobile
    rc-text--center--sm-down
    col-span-12
  "
></div>
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/About-Us"
        >About Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/Values"
        >Values</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/Quality-safety"
        >Quality Safety</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/cats"
        >Cats</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        href="/account"
        >My Account</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        href="/account"
        >My Orders</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
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
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/help/contact"
        >Contact Us</a
      >
    </li>
    <li class="rc-list__item">
      <a
        class="rc-list__link text-decoration-none color-f6f6f6 ui-cursor-pointer"
        role="menuitem"
        href="/faq"
        >FAQs</a
      >
    </li>
  </ul>
</li>
</ul>
`,
  jp: `<div class="md:mb-10 col-span-12">
<div class="rc-divider hidden md:block"></div>
<div class="rc-layout-container rc-one-column rc-padding-x--xs">
  <div class="rc-column rc-padding-x--xs">
    <nav
      data-toggle-group="mobile"
      data-toggle-effect="rc-expand--vertical"
      class="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
    >
      <ul
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
            id="nav-footer-0"
          >
            <span>マイ ロイヤルカナン</span>
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
                href="/home"
                >ロイヤルカナンについて</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/myroyalcanin"
                >マイ ロイヤルカナンについて</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/point-program"
                >ポイントプログラムについて</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/loyalty-program"
                >定期購入について</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="https://shopstg.royalcanin.com/jp/news"
                >お知らせ</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/policy-condition"
                >利用規約</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/policy-legal"
                >販売会社について・特定商取引法に基づく表示</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/policy-point"
                >ポイント・クーポン規約</a
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
            id="nav-footer-1"
          >
            <span>製品</span>
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
                href="/jp/cats"
                >ドッグフード</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/jp/dogs"
                >キャットフード</a
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
            id="nav-footer-2"
          >
            <span>アカウント</span>
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
                >マイ・アカウント</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 55"
                href="/account/orders"
                >オーダー履歴</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 55"
                href="/account/subscription"
                >定期購入情報</a
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
            id="nav-footer-3"
          >
            <span>お問い合わせ</span>
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
                href="/contact-us"
                >お問い合わせ窓口</a
              >
            </li>
            <li class="rc-list__item">
              <a
                class="rc-list__link text-decoration-none color-f6f6f6 66"
                role="menuitem"
                href="/faq"
                >ご利用ガイド</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</div>
<div class="rc-divider hidden md:block"></div>
</div>
<div
class="
  rc-column
  col-span-12
  md:col-span-8
  rc-padding-bottom--none
  rc-padding-top--lg--mobile
"
>
<div class="rc-text--inverse">
  <p>
  マイ ロイヤルカナン カスタマーサービス
  </p>
  <p>
  受付時間: 月曜～土曜 11:00～16:00
  </p>
  <p>
  日曜・祝日・弊社指定定休日を除く
  </p>
</div>
</div>
<div
class="
  rc-column
  col-span-12
  md:col-span-4
  rc-padding-bottom--none
  rc-padding-top--lg--mobile
"
id="J_footer_payment_box"
></div>
<div
class="
  rc-column
  rc-padding-x--none
  rc-padding-top--xs--desktop
  rc-padding-y--md--mobile
  rc-text--center--sm-down
  col-span-12
"
>
<a
  class="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
  role="menuitem"
  href="tel:0120-253-912"
  >0120-253-912</a
>
</div>`
};
