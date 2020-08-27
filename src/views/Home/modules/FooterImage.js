import React from 'react';
import { FormattedMessage } from 'react-intl';

class FooterImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const footerImage = {
      es: (
        <div className="row rc-margin-x--none d-flex">
          <div className="col-6 col-lg-4 order-1 order-lg-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=161&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=322&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 640px) and (max-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=338&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=676&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=830&amp;sfrm=png 2x"
              />
              <img
                className="w-100"
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png"
                alt="Royal Canin® - for dogs and cats"
                title="Royal Canin® - for dogs and cats"
              />
            </picture>
          </div>
          <div className="col-12 col-lg-4 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
            <div className="rc-alpha text-center uppercase inherit-fontsize markup-text children-nomargin rc-margin--none">
              <p>
                <FormattedMessage id="home.point5" />
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-4 d-flex align-items-center order-2 justify-content-center flex-column flex-lg-row">
            <div className="image-container rc-padding-bottom--xs rc-margin-right--xs--desktop">
              <img
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=116&amp;sfrm=png 2x"
                width="58"
                alt="together with you"
                title="together with you"
              />
            </div>
            <h5 className="rc-epsilon rc-text-colour--brand1">
              <b>
                <FormattedMessage id="home.point6" />
              </b>
            </h5>
          </div>
        </div>
      ),
      en: (
        <div className="row rc-margin-x--none d-flex">
          <div className="col-6 col-lg-4 order-1 order-lg-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=161&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=322&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 640px) and (max-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=338&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=676&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=830&amp;sfrm=png 2x"
              />
              <img
                className="w-100"
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png"
                alt="Royal Canin® - for dogs and cats"
                title="Royal Canin® - for dogs and cats"
              />
            </picture>
          </div>
          <div className="col-12 col-lg-4 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
            <div className="rc-alpha text-center uppercase inherit-fontsize markup-text children-nomargin rc-margin--none">
              <p>
                <FormattedMessage id="home.point5" />
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-4 d-flex align-items-center order-2 justify-content-center flex-column flex-lg-row">
            <div className="image-container rc-padding-bottom--xs rc-margin-right--xs--desktop">
              <img
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=116&amp;sfrm=png 2x"
                width="58"
                alt="together with you"
                title="together with you"
              />
            </div>
            <h5 className="rc-epsilon rc-text-colour--brand1">
              <b>
                <FormattedMessage id="home.point6" />
              </b>
            </h5>
          </div>
        </div>
      ),
      de2: (
        <div className="row rc-margin-x--none d-flex">
          <div className="col-6 col-lg-4 order-1 order-lg-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=161&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=322&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 640px) and (max-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=338&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=676&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=830&amp;sfrm=png 2x"
              />
              <img
                className="w-100"
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png"
                alt="Royal Canin® - for dogs and cats"
                title="Royal Canin® - for dogs and cats"
              />
            </picture>
          </div>
          <div className="col-6 col-lg-8 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
            <div style={{ width: '780px' }}>
              <h2 className="rc-body inherit-fontsize">
                Das ROYAL CANIN® VET Portfolio​
              </h2>
              <p className="rc-body inherit-fontsize">
                Seit 1968 erforscht ROYAL
                CANIN® die besonderen Ernährungsbedürfnisse von Katzen
                und Hunden bis ins kleinste Detail.
                Denn schon kleinste Nährstoffunterschiede in
                der Nahrung können einen großen Unterschied für das Wohlbefinden Ihres Haustieres bedeuten.​
              </p>
              <p className="rc-body inherit-fontsize">
                Das gilt natürlich um
                so mehr, wenn Tierärzt*innen bei Ihrer Katze oder Ihrem Hund ein besonderes Bedürfnis festgestellt haben. Gerade dann kann eine maßgeschneiderte Ernährung helfen,
                die
                Gesundheit Ihres Haustieres zu unterstützen und zu erhalten.​
              </p>
              <p className="rc-body inherit-fontsize">
                ROYAL
                CANIN® bietet deshalb ein umfangreiches Programm an Nahrungen an,
                die speziell auf
                die tierärztlich festgestellten besonderen Bedürfnisse von
                Katzen
                und Hunden abgestimmt sind. Sprechen Sie mit Ihrer Tierärztin oder Ihrem Tierarzt darüber, mit welcher ROYAL
                CANIN® Nahrung Sie die
                Gesundheit Ihres vierbeinigen Begleiters am besten unterstützen können.
              </p>
            </div>
          </div>
        </div>
      ),
      de: (
        <div className="row rc-margin-x--none d-flex">
          <div className="col-6 col-lg-4 order-1 order-lg-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=161&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=322&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 640px) and (max-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=338&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=676&amp;sfrm=png 2x"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=830&amp;sfrm=png 2x"
              />
              <img
                className="w-100"
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png"
                alt="Royal Canin® - for dogs and cats"
                title="Royal Canin® - for dogs and cats"
              />
            </picture>
          </div>
          <div className="col-12 col-lg-4 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
            <div className="rc-alpha text-center uppercase inherit-fontsize markup-text children-nomargin rc-margin--none">
              <p>
                <FormattedMessage id="home.point5" />
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-4 d-flex align-items-center order-2 justify-content-center flex-column flex-lg-row">
            <div className="image-container rc-padding-bottom--xs rc-margin-right--xs--desktop">
              <img
                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png"
                srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=116&amp;sfrm=png 2x"
                width="58"
                alt="together with you"
                title="together with you"
              />
            </div>
            <h5 className="rc-epsilon rc-text-colour--brand1">
              <b>
                <FormattedMessage id="home.point6" />
              </b>
            </h5>
          </div>
        </div>
      )
    };
    return <div>{footerImage[process.env.REACT_APP_LANG]}</div>;
  }
}
export default FooterImage;
