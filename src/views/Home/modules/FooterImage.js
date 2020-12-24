import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import footerpet from '@/assets/images/home/footerpet@2x.jpg';
import togetherwithu from '@/assets/images/home/togetherwithu.jpg';

class FooterImage extends React.Component {
  render() {
    const defaultVal = (
      <div className="row rc-margin-x--none d-flex">
        <div
          className="col-6 col-lg-4 order-1 order-lg-0"
          style={{ fontSize: 0 }}
        >
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
            <LazyLoad height={200}>
              <img
                className="w-100"
                src={footerpet}
                alt="Royal Canin® - for dogs and cats"
                title="Royal Canin® - for dogs and cats"
              />
            </LazyLoad>
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
            <LazyLoad height={200}>
              <img
                src={togetherwithu}
                srcSet={togetherwithu}
                width="58"
                alt="together with you"
                title="together with you"
              />
            </LazyLoad>
          </div>
          <h5 className="rc-epsilon rc-text-colour--brand1">
            <b>
              <FormattedMessage id="home.point6" />
            </b>
          </h5>
        </div>
      </div>
    );

    const footerImage = {
      es: (
        <div className="row rc-margin-x--none d-flex">
          <div
            className="col-6 col-lg-4 order-1 order-lg-0"
            style={{ fontSize: 0 }}
          >
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
              <LazyLoad height={200}>
                <img
                  className="w-100"
                  src={footerpet}
                  alt="Royal Canin® - for dogs and cats"
                  title="Royal Canin® - for dogs and cats"
                />
              </LazyLoad>
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
              <LazyLoad height={200}>
                <img
                  src={togetherwithu}
                  srcSet={togetherwithu}
                  width="58"
                  alt="together with you"
                  title="together with you"
                />
              </LazyLoad>
            </div>
            <h5 className="rc-epsilon rc-text-colour--brand1">
              <b>
                <FormattedMessage id="home.point6" />
              </b>
            </h5>
          </div>
        </div>
      ),
      en: defaultVal,
      de: (
        <div className="rc-layout-container rc-three-column">
          <div className="rc-column">
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
              <LazyLoad height={200}>
                <img
                  className="w-100"
                  src={footerpet}
                  alt="Royal Canin® - for dogs and cats"
                  title="Royal Canin® - for dogs and cats"
                />
              </LazyLoad>
            </picture>
          </div>
          <div className="rc-column rc-double-width">
            <h6 className="rc-zeta pb-4" style={{ fontWeight: 'bold' }}>
              Das ROYAL CANIN® VET Portfolio
            </h6>
            <p
              className="rc-intro p-2"
              style={{ fontSize: '12px', color: '#000' }}
            >
              Seit 1968 erforscht ROYAL CANIN® die besonderen
              Ernährungsbedürfnisse von Katzen und Hunden bis ins kleinste
              Detail. Denn schon kleinste Nährstoffunterschiede in der Nahrung
              können einen großen Unterschied für das Wohlbefinden Ihres
              Haustieres bedeuten.​
            </p>
            <p
              className="rc-intro p-2"
              style={{ fontSize: '12px', color: '#000' }}
            >
              Das gilt natürlich um so mehr, wenn Tierärzt*innen bei Ihrer Katze
              oder Ihrem Hund ein besonderes Bedürfnis festgestellt haben.
              Gerade dann kann eine maßgeschneiderte Ernährung helfen, die
              Gesundheit Ihres Haustieres zu unterstützen und zu erhalten.
            </p>
            <p
              className="rc-intro p-2"
              style={{ fontSize: '12px', color: '#000' }}
            >
              ROYAL CANIN® bietet deshalb ein umfangreiches Programm an
              Nahrungen an, die speziell auf die tierärztlich festgestellten
              besonderen Bedürfnisse von Katzen und Hunden abgestimmt sind.
              Sprechen Sie mit Ihrer Tierärztin oder Ihrem Tierarzt darüber, mit
              welcher ROYAL CANIN® Nahrung Sie die Gesundheit Ihres vierbeinigen
              Begleiters am besten unterstützen können.
            </p>
          </div>
        </div>
      ),
      fr: (
        <div className="row rc-margin-x--none d-flex">
          <div
            className="col-6 col-lg-4 order-1 order-lg-0"
            style={{ fontSize: 0 }}
          >
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
              <LazyLoad height={200}>
                <img
                  className="w-100"
                  src={footerpet}
                  alt="Royal Canin® - for dogs and cats"
                  title="Royal Canin® - for dogs and cats"
                />
              </LazyLoad>
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
              <LazyLoad height={200}>
                <img
                  src={togetherwithu}
                  srcSet={togetherwithu}
                  width="58"
                  alt="together with you"
                  title="together with you"
                />
              </LazyLoad>
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
    return <div>{footerImage[process.env.REACT_APP_LANG] || defaultVal}</div>;
  }
}
export default FooterImage;
