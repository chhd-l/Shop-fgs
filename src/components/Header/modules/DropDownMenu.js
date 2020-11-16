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
            name: 'Mini (5-10 KG)',
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
    }, // 图片及描述文字
    mainLink: '/list/dogs' // 图片旁边按钮链接
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
              name: 'Mini (5-10 KG)',
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
  ],
  tr: [
    {
      key: 'dogs',
      menus: [
        {
          name: 'Boyut',
          children: [
            {
              name: 'İri (> 45 kg)',
              linkObj: { pathname: '/list/dogs', search: '?fid=485|1818' }
            },
            {
              name: 'Büyük (26-44 kg)',
              linkObj: { pathname: '/list/dogs', search: '?fid=485|1819' }
            },
            {
              name: 'Orta (11-25 kg)',
              linkObj: { pathname: '/list/dogs', search: '?fid=485|1821' }
            },
            {
              name: 'Küçük (1-10 kg)',
              linkObj: { pathname: '/list/dogs', search: '?fid=485|1824' }
            }
          ]
        },
        {
          name: 'Yaş',
          children: [
            {
              name: 'Yavru (10 ay - 1 yaş)',
              linkObj: { pathname: '/list/dogs' }
            },
            {
              name: 'Yetişkin (1 - 7 yaş)',
              linkObj: { pathname: '/list/dogs' }
            },
            {
              name: 'Yaşlı (7+ yaş)',
              linkObj: { pathname: '/list/dogs' }
            }
          ]
        },
        {
          name: 'Özel İhtiyaçlar',
          children: [
            {
              name: 'Irklara Özel Mamalar',
              linkObj: { pathname: '/list/dogs', search: '?fid=484|1792' }
            },
            {
              name: 'Özel Bakım Mamaları',
              linkObj: { pathname: '/list/dogs' }
            },
            {
              name: 'Sağlıklı Kedi Mamaları',
              linkObj: { pathname: '/list/dogs' }
            },
            {
              name: 'Yaş Mama',
              linkObj: { pathname: '/list/dogs' }
            }
          ]
        }
      ],
      desc: {
        text: 'Her hayvan özeldir. Beslenme ihtiyaçları da öyle.',
        img:
          'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg'
      },
      mainLink: '/list/dogs'
    },
    {
      key: 'cats',
      menus: [
        {
          name: 'Yaş',
          children: [
            {
              name: 'Yavru kedi (0-12 ay)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1898' }
            },
            {
              name: 'Yetişkin (1-7 yaş)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1899' }
            },
            {
              name: 'Olgun (7-11 yaş)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1900' }
            },
            {
              name: 'Yaşlı (11 yaş üzeri)',
              linkObj: { pathname: '/list/cats', search: '?fid=492|1901' }
            }
          ]
        },
        {
          name: 'Özel İhtiyaçlar',
          children: [
            {
              name: 'Irklara Özel Mamalar',
              linkObj: { pathname: '/list/cats', search: '?fid=484|1792' }
            },
            {
              name: 'Özel Bakım Mamaları',
              linkObj: { pathname: '/list/cats' }
            },
            {
              name: 'Sağlıklı Kedi Mamaları',
              linkObj: { pathname: '/list/cats' }
            },
            {
              name: 'Yaş Mama',
              linkObj: { pathname: '/list/cats' }
            }
          ]
        }
      ],
      desc: {
        text: 'Her hayvan özeldir. Beslenme ihtiyaçları da öyle.',
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
  static defaultProps = {
    data: [],
    headerNavigationList: [],
    activeTopParentId: -1
  };
  constructor(props) {
    super(props);
    this.state = { currentDesc: null };
    this.hanldeListItemMouseOver = this.hanldeListItemMouseOver.bind(this);
    this.handleNavChildrenMouseOver = this.handleNavChildrenMouseOver.bind(
      this
    );
  }
  handleNavChildrenMouseOver(item, childrenItem, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      currentDesc: {
        text: childrenItem.navigationDesc,
        imageLink: childrenItem.imageLink
      }
    });
    this.props.updateActiveTopParentId(item.id);
  }
  handleNavChildrenMouseOut = () => {
    this.setState({
      currentDesc: null
    });
  };
  hanldeListItemMouseOver(item) {
    this.props.updateActiveTopParentId(item.id);
  }
  hanldeListItemMouseOut = () => {
    this.props.updateActiveTopParentId(-1);
  };
  _renderDogOrCatMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    const { currentDesc } = this.state;
    let descObj = null;
    if (currentDesc && currentDesc.text && currentDesc.imageLink) {
      descObj = { text: currentDesc.text, imageLink: currentDesc.imageLink };
    } else if (item.navigationDesc && item.imageLink) {
      descObj = { text: item.navigationDesc, imageLink: item.imageLink };
    }
    return (
      <div
        className={`dropdown-nav d-flex ${
          activeTopParentId === item.id ? 'show' : ''
        }`}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="flex-grow-1 rc-padding-y--xs rc-padding-left--sm--desktop">
          <ul
            className="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
            role="menu"
          >
            {(item.children || []).map((mitem, mIndx) => (
              <li
                className="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
                key={mIndx}
                onMouseOver={this.handleNavChildrenMouseOver.bind(
                  this,
                  item,
                  mitem
                )}
                onMouseOut={this.handleNavChildrenMouseOut}
              >
                <div className="dropdown-nav__title rc-margin-bottom--xs">
                  <span className="dropdown-nav__item">
                    <small />
                    <b>{mitem.navigationName}</b>
                  </span>
                </div>
                <ul className="rc-padding--none" role="menu" aria-hidden="true">
                  {(mitem.children || []).map((citem, cIndex) => (
                    <li
                      className="dropdown-nav__item"
                      role="menuitem"
                      key={cIndex}
                      onMouseOver={this.handleNavChildrenMouseOver.bind(
                        this,
                        item,
                        citem
                      )}
                      onMouseOut={this.handleNavChildrenMouseOut}
                    >
                      <Link
                        to={citem.linkObj}
                        role="button"
                        className="dropdown-nav__link"
                      >
                        {citem.navigationName}
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
        {descObj ? (
          <div className={`content-asset`}>
            <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>{descObj.text}</p>
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
                  src={descObj.imageLink}
                  alt=""
                />
                <img
                  className="pull-right rc-md-down lazyload"
                  src={descObj.imageLink}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
  _renderHelpMenu = (item, i) => {
    const { configStore, activeTopParentId } = this.props;
    return (
      <div
        className={`dropdown-nav d-flex full-width-asset justify-content-center ${
          activeTopParentId === item.id ? 'show' : ''
        }`}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="content-asset">
          <div className="dropdown-nav__help d-md-flex">
            <div className="dropdown-nav__help__text align-self-center">
              <h4 className="title rc-delta">
                <FormattedMessage id="aQuestion" />
              </h4>
              <div className="desc children-nomargin text-left">
                <p className="rc-text-colour--text">
                  <FormattedMessage id="uNeedHelp" />
                </p>
                <p className="rc-text-colour--text">
                  <FormattedMessage id="dontHesitateToContactUs" /> :
                </p>
              </div>
            </div>
            <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="help.byTelephone" />
                </b>
                <div className="children-nomargin">
                  <p>{configStore.contactTimePeriod}</p>
                </div>
                <div>
                  <a
                    href={`tel:${configStore.storeContactPhoneNumber}`}
                    className="rc-large-body tel"
                  >
                    {configStore.storeContactPhoneNumber}
                  </a>
                </div>
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                />
              </div>
            </div>
            <Link
              className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/help"
            >
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="help.byEmail" />
                </b>
                <div className="children-nomargin" />
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                />
              </div>
            </Link>
            <Link
              className="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/FAQ/all"
            >
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="footer.FAQ" />
                </b>
                <div className="children-nomargin" />
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  render() {
    console.log(1111, this.props.headerNavigationList);
    return (
      <div className="rc-md-up">
        {this.props.headerNavigationList
          .filter(
            (ele) =>
              (ele.expanded && ele.children && ele.children.length) ||
              (ele.navigationLink && ele.navigationLink.includes('/help'))
          )
          .map((item, i) =>
            item.navigationLink && item.navigationLink.includes('/help')
              ? this._renderHelpMenu(item, i)
              : this._renderDogOrCatMenu(item, i)
          )}
      </div>
    );
  }
}
