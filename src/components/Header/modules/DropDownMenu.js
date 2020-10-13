import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const defaultSubMenuCfg = [
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

const subMenuCfgENUM = {
  fr: defaultSubMenuCfg,
  ru: [
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
        text:
          'Каждый питомец уникален, так же как и его потребности в питании.',
        img:
          'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg'
      },
      mainLink: '/list/dogs'
    },
    {
      key: 'cats',
      menus: [
        {
          name: 'Возраст',
          children: [
            {
              name: 'Котенок (0-1 год)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1898' }
            },
            {
              name: 'Взрослая (1-7 лет)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1899' }
            },
            {
              name: 'Стареющая (7-12 лет)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1900' }
            },
            {
              name: 'Пожилая (12 лет +)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1901' }
            }
          ]
        },
        {
          name: 'Линейка',
          children: [
            {
              name: 'Feline Health Nutrition',
              linkObj: { pathname: '/list/cats', search: '?fid=484|1792' }
            },
            {
              name: 'Feline Breed Nutrition',
              linkObj: { pathname: '/list/cats' }
            },
            {
              name: 'Feline Care Nutrition',
              linkObj: { pathname: '/list/cats' }
            }
          ]
        },
        {
          name: 'Тип корма',
          children: [
            {
              name: 'Сухой корм',
              linkObj: { pathname: '/list/cats', search: '?fid=484|1792' }
            },
            {
              name: 'Влажный корм',
              linkObj: { pathname: '/list/cats' }
            }
          ]
        }
      ],
      desc: {
        text:
          'Каждый питомец уникален, так же как и его потребности в питании.',
        img:
          'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw73b132cd/CMS/header-cat.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg'
      },
      mainLink: '/list/cats'
    },
    { key: 'help' }
  ]
};

const subMenuCfg = subMenuCfgENUM[process.env.REACT_APP_LANG] || [];

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
        className={`dropdown-nav d-flex ${
          visibleType === item.key ? 'show' : ''
        }`}
        aria-hidden={visibleType === item.key}
        onMouseOver={() => this.hanldeListItemMouseOver(item.key)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="flex-grow-1 rc-padding-y--xs rc-padding-left--sm--desktop">
          <ul
            className="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
            role="menu"
          >
            {item.menus.map((mitem, mIndx) => (
              <li
                className="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
                key={mIndx}
              >
                <div className="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="dog-age" className="dropdown-nav__item">
                    <small></small>
                    <b>{mitem.name}</b>
                  </span>
                </div>
                <ul className="rc-padding--none" role="menu" aria-hidden="true">
                  {mitem.children.map((citem, cIndex) => (
                    <li
                      className="dropdown-nav__item"
                      role="menuitem"
                      key={cIndex}
                    >
                      <Link
                        to={citem.linkObj}
                        role="button"
                        className="dropdown-nav__link"
                      >
                        {citem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {mIndx === 0 && (
                  <div className="dropdown-nav__cat-link rc-padding-bottom--xs">
                    <Link className="rc-styled-link" to="/list/dogs">
                      <FormattedMessage id="viewAll" />
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="content-asset">
          <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
            <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
              <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                <p>{item.desc && item.desc.text}</p>
              </div>
              <Link to={item.mainLink}>
                <button className="rc-btn rc-btn--one">
                  <FormattedMessage id="findTheRightDiet" />
                </button>
              </Link>
            </div>
            <div className="mt-auto">
              <img
                className="pull-right rc-lg-up ls-is-cached lazyloaded"
                data-src={item.desc && item.desc.img}
                src={item.desc && item.desc.img}
              />
              <img
                className="pull-right rc-md-down lazyload"
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
        className={`dropdown-nav d-flex full-width-asset justify-content-center ${
          visibleType === item.key ? 'show' : ''
        }`}
        aria-hidden={visibleType === item.key}
        onMouseOver={() => this.hanldeListItemMouseOver(item.key)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="content-asset">
          <div className="dropdown-nav__help d-md-flex">
            {' '}
            <div className="dropdown-nav__help__text align-self-center">
              {' '}
              <h4 className="title rc-delta">Une question ?</h4>{' '}
              <div className="desc children-nomargin">
                {' '}
                <p>Vous avez besoin d'aide?</p>
                <p>N'hésitez pas à nous contacter : </p>{' '}
              </div>{' '}
            </div>{' '}
            <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
              {' '}
              <div className="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>Par téléphone</b>{' '}
                <div className="children-nomargin">
                  {' '}
                  <p>De 8h00 à 20h00</p>{' '}
                </div>{' '}
                <div>
                  <a href="tel:+0 800 005 360" className="rc-large-body tel">
                    0 800 005 360
                  </a>
                </div>{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                />{' '}
              </div>{' '}
            </div>{' '}
            <Link
              className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/help"
            >
              {' '}
              <div className="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>Par e-mail</b> <div className="children-nomargin"> </div>{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                />{' '}
              </div>{' '}
            </Link>{' '}
            <Link
              className="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/FAQ/all"
            >
              {' '}
              <div className="rc-margin-right--xs flex-grow-1">
                {' '}
                <b>FAQ</b> <div className="children-nomargin"> </div>{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-lg-up">
                {' '}
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />{' '}
              </div>{' '}
              <div className="rc-padding-left--xs rc-md-down">
                {' '}
                <img
                  className="lazyload"
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
      <div className="rc-md-up">
        {subMenuCfg.map((item, i) =>
          item.key !== 'help'
            ? this._renderDogOrCatMenu(item, i)
            : this._renderHelpMenu(item, i)
        )}
      </div>
    );
  }
}
