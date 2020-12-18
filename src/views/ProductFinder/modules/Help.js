import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';

@inject('configStore')
@observer
class Help extends React.Component {
  render() {
    const { configStore } = this.props;
    return (
    <div class="rc-layout-container rc-two-column">
      <article class="rc-full-width rc-column rc-padding-left--none--desktop">
        <div class="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
          <div
            class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
            <div
              class="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
              <div class="w-100">
                <b style={{color: '#00A4A6'}}>
                  <FormattedMessage id="callUs" />
                </b>
                {/* <p>{configStore.contactTimePeriod}</p> */}
                <p>Appel Gratuit (depuis un poste fixe) De 8h30 à 12h30 et de 14h à 17h du lundi au vendredi</p>
                <div class="rc-margin-top--xs">
                  <a href={`tel:${configStore.storeContactPhoneNumber}`} style={{color: '#00A4A6'}}
                    class="rc-numeric nowrap">{configStore.storeContactPhoneNumber}</a>
                </div>
              </div>
            </div>
            <div class="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
              <picture class="align-self-center m-auto" data-rc-feature-objectfillpolyfill-setup="true">
                <LazyLoad>
                  <img className="ls-is-cached lazyloaded"
                    data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=120&amp;sfrm=jpg"
                    alt="Par téléphone icon"
                    src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=120&amp;sfrm=jpg" />
                </LazyLoad>
                {/*
                <source media="(max-width: 769px)"
                  srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=120&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=240&amp;sfrm=jpg 2x">
                <source media="(min-width: 769px)"
                  srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=120&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=240&amp;sfrm=jpg 2x">
                */}
                {/* <img
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=120&amp;sfrm=jpg"
                  alt="Par téléphone" title="Par téléphone" /> */}
              </picture>
            </div>
          </div>
        </div>
      </article>
      <article class="rc-full-width rc-column rc-padding-left--none--desktop">
        <Link
          // className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
          to="/help"
        >
          <div class="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
            <div
              class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
              {/*
              <Link
                className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
                to="/help"> */}
              <div
                class="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                <div class="w-100">
                  <b style={{color: '#0087BD'}}>Par mail</b>
                  <div class="rc-margin-top--xs">
                    <a href={`mailto:${configStore.storeContactPhoneNumber}`} class="rc-styled-link nowrap">
                      <FormattedMessage id="emailUs" /></a>
                  </div>
                </div>
              </div>
              <div class="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                <picture class="align-self-center m-auto" data-rc-feature-objectfillpolyfill-setup="true">
                  {/*
                  <source media="(max-width: 769px)"
                    srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=120&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=240&amp;sfrm=png 2x">
                  <source media="(min-width: 769px)"
                    srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=120&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=240&amp;sfrm=png 2x">
                  */}
                  {/* <img
                    src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=120&amp;sfrm=png"
                    alt="Par email" title="Par email" /> */}
                  <LazyLoad>
                    <img className=" ls-is-cached lazyloaded"
                      data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=120&amp;sfrm=png"
                      alt="Par e-mail icon"
                      src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4fb71e73/help/email.png?sw=120&amp;sfrm=png" />
                  </LazyLoad>
                </picture>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </div>)
  }
}

export default Help