import React from 'react';
import { FormattedMessage } from 'react-intl';
import Help from './HelpForHub';
import NavItem from './NavItemForHub';
import PromotionPanel from '../modules/PromotionPanel';
import LazyLoad from 'react-lazyload';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { Link } from 'react-router-dom';
import Language from '@/components/Language';

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
      menuData: this.props.menuData,
      shareData: [],
      portalData: []
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
    this.handleClickToggleChilds = this.handleClickToggleChilds.bind(this);
  }
  componentDidMount() {
    let shareData = [];
    let portalData = [];
    if (process.env.REACT_APP_HUB_MONROYALCANIN) {
      shareData.push({
        link: process.env.REACT_APP_HUB_MONROYALCANIN,
        text: (
          <>
            <span className="iconfont iconzhuanfa" />{' '}
            <FormattedMessage id="header.User.monRoyalCanin" />
          </>
        )
      });
    }
    if (process.env.REACT_APP_HUB_BREEDER_PORTAL) {
      portalData.push({
        link: process.env.REACT_APP_HUB_BREEDER_PORTAL,
        text: (
          <>
            <span className="iconfont iconzhuanfa" />{' '}
            <FormattedMessage id="header.User.breederPortal" />
          </>
        )
      });
    }
    if (process.env.REACT_APP_HUB_VET_PORTAL) {
      portalData.push({
        link: process.env.REACT_APP_HUB_VET_PORTAL,
        text: (
          <>
            <span className="iconfont iconzhuanfa" />{' '}
            <FormattedMessage id="header.User.vetPortal" />
          </>
        )
      });
    }
    this.setState({
      shareData,
      portalData
    });
  }
  toggleMenu() {
    this.setState((curState) => ({ showMegaMenu: !curState.showMegaMenu }));
  }
  handleClickNavItem(item) {
    this.props.handleClickNavItem(item);
  }
  handleClickToggleChilds(item) {
    // document.querySelector('#headnav-mobile').scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
    let { menuData } = this.state;
    item.expand = !item.expand;
    this.setState({ menuData });
  }
  renderSecondChildItem = (item, parentItem) => {
    const promotionalMenuItem = parentItem.MenuItems.filter(
      (ele) => ele.Type === 'PromotionalMenuItem'
    )[0];
    return (
      <SecondItemContainer
        item={item}
        handleClickToggleChilds={this.handleClickToggleChilds.bind(this, item)}
        childsListContent={
          <ul>
            <li className="pl-4 pr-4 red mt-2 mb-2">
              <img
                alt={item.Image.AltText}
                src={item.Image.Url}
                className="img-catogery"
              />
              {item.ImageDescription}
            </li>
            {item.Type === 'DetailedMenuItem' && (
              <li className="pl-4 pr-4">
                {item.SubItems.map((sItem, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <a
                      href={sItem.Link.Url}
                      className="medium mb-0 ui-cursor-pointer"
                    >
                      {sItem.Title}
                    </a>
                    {sItem.Subtitle ? (
                      <p className="mb-3">{sItem.Subtitle}</p>
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
      item.Type === 'DetailedMenuGroup'
        ? (item.MenuItems || []).filter(
            (ele) => ele.Type === 'DetailedMenuItem'
          )
        : (item.MenuItems || []).filter((ele) => ele);
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
                      <div
                        className="custom-accordion__button rc-list__header bg-transparent d-flex justify-content-between border-0"
                        role="menuitem"
                        aria-selected="false"
                        data-tab-init="true"
                        onClick={this.handleClickToggleChilds.bind(this, item)}
                      >
                        <span className="rc-text-colour--text">
                          {item.Link.Text}
                        </span>
                        <span
                          className={`iconfont inlineblock font-weight-bolder ${
                            item.expand ? 'red' : 'rc-text-colour--text'
                          }`}
                          style={{
                            transform: item.expand
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)'
                          }}
                        >
                          &#xe60f;
                        </span>
                      </div>
                    </dt>
                    {filterItemChildList.length > 0 && (
                      <dd
                        className={`rc-list__content rc-bg-colour--brand4 rc-padding--none ${
                          item.expand ? '' : 'hidden'
                        }`}
                      >
                        <ul className="rc-list rc-list--blank subcategories dropdown-nav__catogery__card">
                          {item.Type === 'ContactUsMenuGroup' ? (
                            <li className="bg-white">
                              <Help data={item} />
                            </li>
                          ) : (
                            filterItemChildList.map((cItem) => (
                              <li
                                className="rc-list__item w-100 bg-white"
                                key={cItem.id}
                              >
                                {cItem.Type === 'DetailedMenuItem' && (
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
                                        alt={cItem.Image.AltText}
                                        src={cItem.Image.Url}
                                        className="img-catogery"
                                      />
                                      <span className="rc-text-colour--text">
                                        {cItem.ImageDescription}
                                      </span>
                                    </span>
                                    {this.renderSecondChildItem(cItem, item)}
                                  </>
                                )}
                                {cItem.Type === 'MenuItem' && (
                                  <NavItem
                                    item={cItem}
                                    className="rc-list__link submenu-padding-mobile bg-white border-0"
                                    style={{ fontWeight: 500 }}
                                    onClick={this.handleClickNavItem.bind(
                                      this,
                                      cItem
                                    )}
                                  >
                                    {cItem.Link && cItem.Link.Text}
                                  </NavItem>
                                )}
                                {cItem.Type === 'PromotionalMenuItem' && (
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
            <span className="rc-text-colour--text">{item.Link.Text}</span>
          </NavItem>
        )}
      </>
    );
  };
  render() {
    const { history, isLogin, userInfo } = this.props;
    const { showMegaMenu, menuData, shareData, portalData } = this.state;
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
                    className="rc-list rc-list--blank rc-list--align border-top border-d7d7d7"
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
                    <li className="rc-list__item rc-list__item--group w-100 border-bottom border-d7d7d7">
                      {portalData.length > 0 &&
                        portalData.map((data, i) => (
                          <a
                            href={data.link}
                            className={`rc-list__header bg-transparent border-0 ${
                              i !== shareData.length - 1 ? 'pb-0' : ''
                            }`}
                            key={i}
                          >
                            <span className="rc-text-colour--text">
                              {data.text}
                            </span>
                          </a>
                        ))}
                      {isLogin ? (
                        <>
                          <Link
                            className="rc-list__header bg-transparent border-0 pt-3 pb-0 d-flex"
                            to="/account"
                          >
                            <span className="brefName mb-2 rc-text-colour--text">
                              {userInfo?.firstName?.slice(0, 1)}
                            </span>
                            <span className="border-bottom flex-fill font-weight-light pb-2 rc-text-colour--text">
                              {userInfo?.firstName}
                            </span>
                            <span className="iconfont medium rc-text-colour--text">
                              &#xe6f9;
                            </span>
                          </Link>
                          <LogoutButton
                            containerClassName="rc-list__header border-0 bg-transparent border-bottom pt-3 pb-3 ml-3 ml-0 text-left"
                            btnStyle={{
                              background: 'transparent'
                            }}
                          >
                            <span className="rc-text-colour--text">
                              <FormattedMessage id="header.User.logOut" />
                            </span>
                          </LogoutButton>
                        </>
                      ) : (
                        <LoginButton
                          btnClass={`rc-list__header bg-transparent border-0 ${
                            shareData.length ? 'pb-0' : ''
                          }`}
                          history={history}
                        >
                          <span className="iconfont rc-text-colour--text">
                            &#xe69c;
                          </span>{' '}
                          <span className="rc-text-colour--text">
                            <FormattedMessage id="signInAndRegisterNow" />
                          </span>
                        </LoginButton>
                      )}
                      {shareData.map((data, i) => (
                        <a
                          href={data.link}
                          className={`rc-list__header bg-transparent border-0 ${
                            i !== shareData.length - 1 ? 'pb-0' : ''
                          }`}
                          key={i}
                        >
                          <span className="rc-text-colour--text">
                            {data.text}
                          </span>
                        </a>
                      ))}
                    </li>
                    <li className="rc-list__item rc-list__item--group w-100 border-bottom border-d7d7d7">
                      <Language className="rc-list__header bg-transparent border-0">
                        <span className="iconfont rc-text-colour--text">
                          &#xe60c;
                        </span>{' '}
                        <span className="rc-text-colour--text">
                          <FormattedMessage id="language" />
                        </span>
                      </Language>
                    </li>
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
