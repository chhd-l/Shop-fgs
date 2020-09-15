import React from 'react';
import { Link } from 'react-router-dom';

const subMenuCfg = [
  {
    key: 'dogs',
    menus: [
      {
        name: 'Âge',
        children: [
          {
            name: 'Chiot (0-2 mois)',
            linkObj: { pathname: '/list/dogs', search: '?fid=485|1818' }
          },
          {
            name: 'Chiot (2 mois-1 an)',
            linkObj: { pathname: '/list/dogs', search: '?fid=485|1819' }
          },
          {
            name: 'Adulte (1-7 ans)',
            linkObj: { pathname: '/list/dogs', search: '?fid=485|1821' }
          },
          {
            name: 'Sénior (7 ans et plus)',
            linkObj: { pathname: '/list/dogs', search: '?fid=485|1824' }
          }
        ]
      },
      {
        name: 'Taille',
        children: [
          {
            name: 'X-Small (1-4 Kg)',
            linkObj: { pathname: '/list/dogs' }
          },
          {
            name: 'Mini (1-10 KG)',
            linkObj: { pathname: '/list/dogs' }
          },
          {
            name: 'Medium (11-25kg)',
            linkObj: { pathname: '/list/dogs' }
          },
          {
            name: 'Maxi (26-44kg)',
            linkObj: { pathname: '/list/dogs' }
          },
          {
            name: <span>Géant (&gt; 45kg)</span>,
            linkObj: { pathname: '/list/dogs' }
          }
        ]
      },
      {
        name: 'Gamme',
        children: [
          {
            name: 'Aliments secs',
            linkObj: { pathname: '/list/dogs', search: '?fid=484|1792' }
          },
          {
            name: 'Bouchées en sauce',
            linkObj: { pathname: '/list/dogs' }
          },
          {
            name: 'Aliment pour Chien de Race',
            linkObj: { pathname: '/list/dogs' }
          }
        ]
      }
    ],
    desc: {
      text: 'Chaque animal est unique, tout comme ses besoins nutritionnels.',
      img:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg'
    },
    mainLink: '/list/dogs'
  },
  {
    key: 'cats',
    menus: [
      {
        name: 'Âge',
        children: [
          {
            name: 'Chaton (1-12 mois)',
            linkObj: { pathname: '/list/cats', search: '?fid=492|1898' }
          },
          {
            name: 'Adulte (1-7 ans)',
            linkObj: { pathname: '/list/cats', search: '?fid=492|1899' }
          },
          {
            name: 'Mature (7-12 ans)',
            linkObj: { pathname: '/list/cats', search: '?fid=492|1900' }
          },
          {
            name: 'Senior (+ 12 ans)',
            linkObj: { pathname: '/list/cats', search: '?fid=492|1901' }
          }
        ]
      },
      {
        name: 'Gamme',
        children: [
          {
            name: 'Aliments secs',
            linkObj: { pathname: '/list/cats', search: '?fid=484|1792' }
          },
          {
            name: 'Bouchées en sauce',
            linkObj: { pathname: '/list/cats' }
          },
          {
            name: 'Aliment pour Chien de Race',
            linkObj: { pathname: '/list/cats' }
          }
        ]
      }
    ],
    desc: {
      text: 'Chaque animal est unique, tout comme ses besoins nutritionnels.',
      img:
        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw73b132cd/CMS/header-cat.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg'
    },
    mainLink: '/list/cats'
  },
  { key: 'help' }
];

export default class DropDownMenu extends React.Component {
  hanldeListItemMouseOver = (type) => {
    this.props.updateVisibleType(type);
  };
  hanldeListItemMouseOut = () => {
    this.props.updateVisibleType('');
  };
  _renderDogOrCatMenu = (item, i) => {
    const { visibleType } = this.props;
    return (
      <div
        class={`dropdown-nav d-flex ${visibleType === item.key ? 'show' : ''}`}
        aria-hidden={visibleType === item.key}
        onMouseOver={() => this.hanldeListItemMouseOver(item.key)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div class="flex-grow-1 rc-padding-y--xs rc-padding-left--sm--desktop">
          <ul
            class="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
            role="menu"
          >
            {item.menus.map((mitem, mIndx) => (
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
                key={mIndx}
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="dog-age" class="dropdown-nav__item">
                    <small></small>
                    <b>{mitem.name}</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  {mitem.children.map((citem, cIndex) => (
                    <li class="dropdown-nav__item" role="menuitem" key={cIndex}>
                      <Link
                        to={citem.linkObj}
                        role="button"
                        class="dropdown-nav__link"
                      >
                        {citem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {mIndx === 0 && (
                  <div class="dropdown-nav__cat-link rc-padding-bottom--xs">
                    <Link class="rc-styled-link" to="/list/dogs">
                      Voir tous les produits
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div class="content-asset">
          <div class="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
            <div class="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
              <div class="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                <p>{item.desc && item.desc.text}</p>
              </div>
              <Link to={item.mainLink}>
                <button class="rc-btn rc-btn--one">
                  Trouver l'alimentation adaptée
                </button>
              </Link>
            </div>
            <div class="mt-auto">
              <img
                class="pull-right rc-lg-up ls-is-cached lazyloaded"
                data-src={item.desc && item.desc.img}
                src={item.desc && item.desc.img}
              />
              <img
                class="pull-right rc-md-down lazyload"
                data-src={item.desc && item.desc.img}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  _renderHelpMenu = (item, i) => {
    const { visibleType } = this.props;
    return (
      <div
        class={`dropdown-nav d-flex full-width-asset justify-content-center ${
          visibleType === item.key ? 'show' : ''
        }`}
        aria-hidden={visibleType === item.key}
        onMouseOver={() => this.hanldeListItemMouseOver(item.key)}
        onMouseOut={this.hanldeListItemMouseOut}
      >
        <div class="content-asset">
          <div class="dropdown-nav__help d-md-flex">
            {' '}
            <div class="dropdown-nav__help__text align-self-center">
              {' '}
              <h4 class="title rc-delta">Une question ?</h4>{' '}
              <div class="desc children-nomargin">
                {' '}
                <p>Vous avez besoin d'aide?</p>
                <p>N'hésitez pas à nous contacter : </p>{' '}
              </div>{' '}
            </div>{' '}
            <div class="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
              {' '}
              <div class="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>Par téléphone</b>{' '}
                <div class="children-nomargin">
                  {' '}
                  <p>De 8h00 à 20h00</p>{' '}
                </div>{' '}
                <div>
                  <a href="tel:+0 800 005 360" class="rc-large-body tel">
                    0 800 005 360
                  </a>
                </div>{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  class=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  class="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                />{' '}
              </div>{' '}
            </div>{' '}
            <Link
              class="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/help"
            >
              {' '}
              <div class="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>Par e-mail</b> <div class="children-nomargin"> </div>{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  class=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  class="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                />{' '}
              </div>{' '}
            </Link>{' '}
            <Link
              class="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/FAQ/all"
            >
              {' '}
              <div class="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>FAQ</b> <div class="children-nomargin"> </div>{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  class=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div class="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  class="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                />{' '}
              </div>{' '}
            </Link>{' '}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div class="rc-md-up">
        {subMenuCfg.map((item, i) =>
          item.key !== 'help'
            ? this._renderDogOrCatMenu(item, i)
            : this._renderHelpMenu(item, i)
        )}
      </div>
    );
  }
}
