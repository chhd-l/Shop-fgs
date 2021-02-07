import React from 'react';
import { FormattedMessage } from 'react-intl';
import Help from '../modules/HelpForHub';
import NavItem from '../modules/NavItemForHub';
import PromotionPanel from './PromotionPanel';
import LazyLoad from 'react-lazyload';

function SecondItemContainer(props) {
  const { item } = props;
  return (
    <ul
      className="rc-list rc-list--blank rc-list--align hasSubcategories rc-expand--horizontal h-100"
      role="menu"
      aria-expanded={!!item.expand}
      aria-hidden={!item.expand}
    >
      <li className="rc-list__item w-100 rc-md-down rc-bg-colour--brand4 border-bottom">
        <button
          className="rc-list__link rc-icon rc-left--xs rc-iconography border-left-0 border-right-0 border-top-0"
          data-js-show="nav-bottom-banner-mobile"
          data-toggle="nav-list-aide"
          role="button"
          data-active="true"
          data-depth="2"
          aria-haspopup="true"
          aria-selected="true"
          data-tab-init="true"
          onClick={props.handleClickToggleChilds}
        >
          Retour
        </button>
      </li>
      {props.childsListContent || null}
      <div className="content-asset">{props.assetContent || null}</div>
    </ul>
  );
}

class MegaMenuMobileForHub extends React.Component {
  static defaultProps = {
    menuData: [],
    handleClickNavItem: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      showMegaMenu: false,
      menuData: this.props.menuData
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
    this.handleClickToggleChilds = this.handleClickToggleChilds.bind(this);
  }
  toggleMenu() {
    this.setState((curState) => ({ showMegaMenu: !curState.showMegaMenu }));
  }
  handleClickNavItem(item) {
    this.props.handleClickNavItem(item);
  }
  handleClickToggleChilds(item) {
    document.querySelector('#headnav-mobile').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let { menuData } = this.state;
    item.expand = !item.expand;
    this.setState({ menuData });
  }
  renderSecondChildItem = (item, parentItem) => {
    const promotionalMenuItem = parentItem.menuItems.filter(
      (ele) => ele.type === 'PromotionalMenuItem'
    )[0];
    return (
      <SecondItemContainer
        item={item}
        handleClickToggleChilds={this.handleClickToggleChilds.bind(this, item)}
        childsListContent={
          <ul>
            <li className="pl-4 pr-4 red mt-2 mb-2">
              <img
                alt={item.image.altText}
                src={item.image.url}
                className="img-catogery"
              />
              {item.title}
            </li>
            {item.type === 'DetailedMenuItem' && (
              <li className="pl-4 pr-4">
                {item.subItems.map((sItem, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <a
                      href={sItem.link.url}
                      className="medium mb-0 ui-cursor-pointer"
                    >
                      {sItem.title}
                    </a>
                    {sItem.subtitle ? (
                      <p className="mb-3">{sItem.subtitle}</p>
                    ) : null}
                  </React.Fragment>
                ))}
              </li>
            )}
            {promotionalMenuItem && (
              <li>
                <PromotionPanel item={promotionalMenuItem} />
              </li>
            )}
          </ul>
        }
      />
    );
  };
  _renderLinkItem = (item) => {
    // 顶级父类，有子项的添加haspopup=true(向左滑动打开子集合),其他直接跳转的使用a标签
    // 此种情况下，不渲染promotionItem，promotionItem需要拿到里层进行渲染
    const filterItemChildList =
      item.type === 'DetailedMenuGroup'
        ? (item.menuItems || []).filter(
            (ele) => ele.type === 'DetailedMenuItem'
          )
        : (item.menuItems || []).filter((ele) => ele);
    return (
      <>
        {item.expanded ? (
          <>
            <ul className="rc-list rc-list--blank subcategories">
              <li className="rc-list__item w-100">
                <dl
                  data-toggle-effect="rc-expand--vertical"
                  className="custom-accordion rc-margin--none"
                  role="presentation"
                >
                  <div className="custom-accordion__item">
                    <dt>
                      <button
                        className="custom-accordion__button rc-list__header bg-transparent d-flex justify-content-between"
                        role="menuitem"
                        aria-selected="false"
                        data-tab-init="true"
                        onClick={this.handleClickToggleChilds.bind(this, item)}
                      >
                        <span>{item.link.text}</span>
                        <span
                          className={`iconfont inlineblock ${
                            item.expand ? 'red' : ''
                          }`}
                          style={{
                            transform: item.expand
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)'
                          }}
                        >
                          &#xe60f;
                        </span>
                      </button>
                    </dt>
                    {filterItemChildList.length > 0 && (
                      <dd
                        className={`rc-list__content rc-bg-colour--brand4 rc-padding--none ${
                          item.expand ? '' : 'hidden'
                        }`}
                      >
                        <ul className="rc-list rc-list--blank subcategories dropdown-nav__catogery__card">
                          {item.type === 'ContactUsMenuGroup' ? (
                            <li className="bg-white">
                              <Help data={item} />
                            </li>
                          ) : (
                            filterItemChildList.map((cItem) => (
                              <li
                                className="rc-list__item w-100 bg-white"
                                key={cItem.id}
                              >
                                {cItem.type === 'DetailedMenuItem' && (
                                  <>
                                    <span
                                      className="rc-list__header bg-transparent border-0"
                                      aria-haspopup={true}
                                      onClick={this.handleClickToggleChilds.bind(
                                        this,
                                        cItem
                                      )}
                                    >
                                      <img
                                        alt={cItem.image.altText}
                                        src={cItem.image.url}
                                        className="img-catogery"
                                      />
                                      <span>{cItem.title}</span>
                                    </span>
                                    {this.renderSecondChildItem(cItem, item)}
                                  </>
                                )}
                                {cItem.type === 'MenuItem' && (
                                  <NavItem
                                    item={cItem}
                                    className="rc-list__link submenu-padding-mobile bg-white border-0"
                                    onClick={this.handleClickNavItem.bind(
                                      this,
                                      cItem
                                    )}
                                  >
                                    {cItem.link && cItem.link.text}
                                  </NavItem>
                                )}
                                {cItem.type === 'PromotionalMenuItem' && (
                                  <PromotionPanel item={cItem} />
                                )}
                              </li>
                            ))
                          )}
                        </ul>
                      </dd>
                    )}
                  </div>
                </dl>
              </li>
            </ul>
          </>
        ) : (
          <NavItem
            onClick={this.handleClickNavItem.bind(this, item)}
            item={item}
            className="rc-list__header bg-transparent border-0"
          >
            {item.link.text}
          </NavItem>
        )}
      </>
    );
  };
  render() {
    const { showMegaMenu, menuData } = this.state;
    return (
      <>
        <button
          className={`rc-btn rc-btn--icon rc-icon rc-menu--xs rc-iconography rc-md-down ${
            showMegaMenu ? 'btn-close' : ''
          }`}
          aria-label="Menu"
          onClick={this.toggleMenu}
        >
          <span className="rc-screen-reader-text">
            <FormattedMessage id="menu" />
          </span>
        </button>
        <div className={`${showMegaMenu ? '' : 'rc-hidden'}`}>
          <section className="rc-max-width--xl">
            <nav
              id="headnav-mobile"
              className="rc-nav rc-md-down"
              data-toggle-group="mobile"
              data-toggle-effect="rc-expand--horizontal"
            >
              <div className="rc-layout-container rc-three-column">
                <div className="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
                  <ul
                    className="rc-list rc-list--blank rc-list--align"
                    role="menubar"
                  >
                    {menuData.map((item, i) => (
                      <li
                        className="rc-list__item rc-list__item--group w-100 border-bottom border-d7d7d7"
                        key={i}
                      >
                        {this._renderLinkItem(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </section>
        </div>
      </>
    );
  }
}

export default MegaMenuMobileForHub;
