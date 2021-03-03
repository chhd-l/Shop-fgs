import React from 'react';
import NavItem from './NavItemForHub';
import PromotionPanel from '../modules/PromotionPanel';
import LazyLoad from 'react-lazyload';

/**
 * 渲染二级菜单
 */
export default class DropDownMenuForHub extends React.Component {
  static defaultProps = {
    headerNavigationList: [],
    activeTopParentId: -1,
    showNav: true,
    showLoginBtn: true
  };
  constructor(props) {
    super(props);
    this.hanldeListItemMouseOver = this.hanldeListItemMouseOver.bind(this);
    this.toggleListItem = this.toggleListItem.bind(this);
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
  }
  toggleListItem(item) {
    // 如果可以打开，就打开，否则不打开
    let tmpId = -1;
    const { activeTopParentId } = this.props;
    if (item.expanded && activeTopParentId === -1) {
      tmpId = item.id;
    }
    this.props.updateActiveTopParentId(tmpId);
  }
  onListItemBlur = (e) => {
    this.props.updateActiveTopParentId(-1);
  };
  hanldeListItemMouseOver(item) {
    // 若存在子项，才展开
    this.props.updateActiveTopParentId(item.expanded ? item.id : -1);
  }
  hanldeListItemMouseOut = () => {
    this.props.updateActiveTopParentId(-1);
  };
  // 埋点submenu和banner
  GAClickMenu(interaction) {
    const { category, action, label, value } = interaction;
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}clickMenu`,
      interaction: {
        category,
        action,
        label,
        value
      }
    });
  }

  menuItemEvent(item, cItem, type) {
    const Level1 = item?.Link?.Text;
    const Level2 = type ? cItem : cItem?.Link?.Text;
    this.hubGA &&
      dataLayer.push({
        event: 'navTopClick',
        navTopClick: {
          itemName: `${Level1}|${Level2}`
        }
      });
  }

  renderNormalMenu = (item, i) => {
    let ret = null;
    let menuItemListGroupedByStep = [];
    let menuItemList = [];
    let otherItemList = [];
    // 全部为MenuItem时，四个为一列
    // 全部为MenuItem时
    if (item.MenuItems.every((ele) => ele.Type === 'MenuItem')) {
      // for (let i = 0; i < item.MenuItems.length; i += 4) {
      //   menuItemListGroupedByStep.push(item.MenuItems.slice(i, i + 4));
      // }
      menuItemListGroupedByStep.push(...item.MenuItems);
      ret = menuItemListGroupedByStep.length > 0 && (
        <ul
          className={`rc-list__item-sub-menu rc-js--width-adjust-init bg-white ${
            menuItemListGroupedByStep.length > 6
              ? 'rc-list__item-sub-menu--double-column'
              : 'rc-list__item-sub-menu--single-column'
          }`}
        >
          {menuItemListGroupedByStep.map((gItem, gIdx) => (
            <li>
              <a
                href={gItem.Link.Url}
                className="rc-header__list-item rc-text-colour--text"
                data-ref="nav-link"
                role="menuitem"
                // title="Breeds"
                key={gItem.id}
              >
                {gItem.Link.Text}
              </a>
            </li>
          ))}
        </ul>
      );
    } else {
      menuItemList = item.MenuItems.filter((ele) => ele.Type === 'MenuItem');
      otherItemList = item.MenuItems.filter((ele) => ele.Type !== 'MenuItem');
    }

    if (item.Type === 'DetailedMenuGroup') {
      ret = (
        <div className="rc-list__item-sub-menu rc-list__item-sub-menu--three-column rc-mega-menu-dropdown rc-list__item-sub-menu--fixed rc-js--width-adjust-init bg-white justify-content-between">
          {item.MenuItems.map((cItem, cIdx) => (
            <React.Fragment key={cItem.id}>
              {cItem.Type === 'PromotionalMenuItem' ? (
                <div className="rc-list__item-sub-menu__container rc-border-all rc-border-colour--interface rc-margin--md--mobile">
                  <div className="rc-layout-container rc-two-column rc-no-stack rc-margin-x--none rc-self-h-middle rc-padding-y--sm rc-padding--md--mobile">
                    <div className="rc-column rc-self-h-middle rc-flex-wrap--wrap rc-padding-y--none">
                      <h4 className="rc-delta">{cItem.Title}</h4>
                      <p className="rc-body">{cItem.Subtitle}</p>
                      <a
                        href={cItem.PrimaryLink.Url}
                        className="rc-btn rc-btn--two"
                        data-ref="nav-link"
                      >
                        {cItem.PrimaryLink.Text}
                      </a>
                    </div>
                    <div className="rc-column rc-padding-y--none">
                      <img
                        src={cItem.Image.Url}
                        alt={cItem.Image.AltText}
                        srcSet={cItem.Image.Srcset}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rc-list__item-sub-menu__container">
                  <button
                    className="rc-mega-menu-dropdown__column rc-mega-menu-dropdown__sub-section-header"
                    tabIndex="-1"
                  >
                    <span className="rc-mega-menu-dropdown__column-inner">
                      <img
                        src={cItem.Image.Url}
                        alt={cItem.Image.AltText}
                        srcSet={cItem.Image.Srcset}
                      />
                      <span className="rc-mega-menu-dropdown__column-title rc-delta">
                        {cItem.ImageDescription}
                      </span>
                    </span>
                  </button>

                  <div className="rc-mega-menu-dropdown__column-inner rc-mega-menu-dropdown__sub-section__slide-tray">
                    {cItem.SubItems.map((sItem, sIdx) => (
                      <div
                        className="rc-margin-bottom--xs mega-menu-inner-links"
                        key={sIdx}
                      >
                        <a
                          className="rc-margin-bottom--xs--desktop rc-mega-menu-dropdown__link__title rc-text-colour--text rc-mega-menu-dropdown__link"
                          href={sItem.Link.Url}
                          data-ref="nav-link"
                        >
                          {sItem.Title}
                        </a>
                        {sItem.Subtitle ? (
                          <a
                            className="rc-mega-menu-dropdown__link"
                            href={sItem.Link.Url}
                            data-ref="nav-link"
                          >
                            {sItem.Subtitle}
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    } else if (item.Type === 'ContactUsMenuGroup') {
      ret = (
        <div className="rc-list__item-sub-menu rc-mega-menu-dropdown rc-list__item-sub-menu--full rc-list__item-sub-menu--fixed rc-js--width-adjust-init bg-white">
          <div className="rc-layout-container rc-four-column rc-contact-dropdown">
            {item.MenuItems.map((cItem, cIdx) =>
              cIdx ? (
                <div
                  className="rc-column rc-border-all rc-border-colour--interface rc-contact-dropdown-column rc-margin-left--sm--desktop align-items-center d-flex"
                  key={cIdx}
                >
                  <div className="rc-layout-container rc-three-column rc-contact-dropdown-column__container align-items-center d-flex">
                    <div className="rc-column rc-double-width rc-contact-dropdown-column__inner">
                      <a
                        className="rc-contact-dropdown__sub-title rc-contact-dropdown-column__link"
                        data-ref="nav-link"
                        href="tel:+33 4 66 73 03 00"
                      >
                        {cItem.Subtitle}
                      </a>
                      <br />
                      {/* <a
                        className="rc-contact-dropdown__title rc-contact-dropdown-column__link"
                        data-ref="nav-link"
                        href="tel:+33 4 66 73 03 00"
                      >
                        +33 4 66 73 03 00
                      </a>
                      <br /> */}
                      {item.Link && item.Link.Url ? (
                        <a
                          className="rc-contact-dropdown__opening-hours rc-contact-dropdown-column__link"
                          data-ref="nav-link"
                          href={item.Link.Url}
                        >
                          {cItem.Description}
                        </a>
                      ) : (
                        <span className="rc-contact-dropdown__opening-hours rc-contact-dropdown-column__link">
                          {cItem.Description}
                        </span>
                      )}
                    </div>
                    {item.Link && item.Link.Url ? (
                      // <div className="rc-column rc-contact-dropdown-column__inner rc-contact-dropdown-column__icon">
                      <a
                        className={`rc-icon rc-brand1 ${
                          {
                            contact: 'rc-contact',
                            email: 'rc-email',
                            advice: 'rc-advice'
                          }[cItem.Icon]
                        }`}
                        data-ref="nav-link"
                        href={item.Link.Url}
                      />
                    ) : // </div>
                    null}
                  </div>
                </div>
              ) : (
                <div
                  className="rc-column rc-contact-dropdown-column--first"
                  key={cIdx}
                >
                  <p className="rc-delta">{cItem.Title}</p>
                  <p className="body-copy">{cItem.Content}</p>
                </div>
              )
            )}
          </div>
        </div>
      );
    }
    return ret;
  };
  render() {
    const {
      headerNavigationList,
      activeTopParentId,
      showNav,
      showLoginBtn
    } = this.props;

    return (
      <>
        <nav
          className={`rc-header__nav rc-header__nav--secondary rc-md-up ${
            showNav ? '' : 'rc-hidden'
          }`}
        >
          <ul
            className={`rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center flex-nowrap ${
              showLoginBtn ? '' : 'rc-hidden'
            }`}
          >
            {headerNavigationList.map((item, i) => (
              <li
                className={`rc-list__item ${item.expanded ? 'dropdown' : ''} ${
                  activeTopParentId === item.id ? 'active' : ''
                }`}
                key={i}
                // onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
                // onMouseOut={this.hanldeListItemMouseOut.bind(this, item)}
                onClick={this.toggleListItem.bind(this, item)}
                onBlur={this.onListItemBlur}
              >
                <ul
                  className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center"
                  style={{ outline: 'none' }}
                  tabIndex={item.id}
                >
                  <li className="rc-list__item">
                    <span className="rc-list__header pt-0 pb-0">
                      <NavItem
                        item={item}
                        className={`rc-list__header border-bottom border-width-2 ${
                          item.id === activeTopParentId
                            ? 'border-red'
                            : 'border-transparent'
                        }`}
                      >
                        {item.expanded ? (
                          <span className={`rc-header-with-icon header-icon`}>
                            {item.Link && item.Link.Text}
                            {item.id === activeTopParentId ? (
                              <span className="iconfont icon-dropdown-arrow ml-1">
                                &#xe6f9;
                              </span>
                            ) : (
                              <span className="iconfont icon-dropdown-arrow ml-1">
                                &#xe6fa;
                              </span>
                            )}
                          </span>
                        ) : (
                          item.Link && item.Link.Text
                        )}
                      </NavItem>
                    </span>
                  </li>
                </ul>
                {item.expanded ? this.renderNormalMenu(item, i) : null}
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }
}
