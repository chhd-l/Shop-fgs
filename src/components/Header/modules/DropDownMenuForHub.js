import React from 'react';
import Help from './HelpForHub';
import NavItem from './NavItemForHub';
import PromotionPanel from './PromotionPanel';
import LazyLoad from 'react-lazyload';

/**
 * 渲染二级菜单
 */
export default class DropDownMenuForHub extends React.Component {
  static defaultProps = {
    headerNavigationList: [],
    activeTopParentId: -1,
    handleClickNavItem: () => {},
    showNav: true,
    showLoginBtn: true
  };
  constructor(props) {
    super(props);
    this.state = { currentDesc: null };
    this.hanldeListItemMouseOver = this.hanldeListItemMouseOver.bind(this);
    this.handleNavChildrenMouseOver = this.handleNavChildrenMouseOver.bind(
      this
    );
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
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
  handleClickNavItem = (item) => {
    // 点击subMenu埋点-start
    let interaction = {
      category: 'submenu',
      action: 'submenu',
      label: item.navigationLink,
      value: item.navigationName
    };
    this.GAClickMenu(interaction);
    // 点击subMenu埋点-end
    // this.props.handleClickNavItem(item);
  };
  renderNormalMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    const { currentDesc } = this.state;
    let descObj = null;
    if (item.navigationDesc && item.imageLink) {
      descObj = {
        text: item.navigationDesc,
        imageLink: item.imageLink
      };
    }
    if (currentDesc && (currentDesc.text || currentDesc.imageLink)) {
      descObj = Object.assign(descObj, {
        text: currentDesc.text || '',
        imageLink: currentDesc.imageLink || ''
      });
    }

    const menuItemList = item.menuItems.filter(
      (ele) => ele.type === 'MenuItem'
    );
    const otherItemList = item.menuItems.filter(
      (ele) => ele.type !== 'MenuItem'
    );

    return (
      <div
        className={`${
          process.env.REACT_APP_LANG == 'de' ? 'drop' : ''
        } dropdown-nav bg-transparent d-flex justify-content-center ${
          activeTopParentId === item.id ? 'show' : ''
        }`}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="d-flex align-items-start justify-content-between bg-white pt-4 pb-4 border-top">
          {menuItemList.length > 0 && (
            <div className="pl-4 pr-4">
              {menuItemList.map((cItem) => (
                <a
                  href={cItem.link.url}
                  className="medium mb-2 ui-cursor-pointer"
                  key={cItem.id}
                  style={{ display: 'block' }}
                >
                  {cItem.link.text}
                </a>
              ))}
            </div>
          )}

          {otherItemList.map((cItem, cIdx) => (
            <React.Fragment key={cItem.id}>
              {cItem.type === 'DetailedMenuItem' && (
                <div
                  className={`d-flex align-items-center dropdown-nav__catogery__card pr-4 pl-4 ${
                    cIdx === item.menuItems.length ? '' : 'border-right'
                  }`}
                >
                  <div className="mr-4 text-center">
                    <LazyLoad>
                      <img
                        src={cItem.image.url}
                        alt={cItem.image.altText}
                        srcSet={cItem.image.srcset}
                        style={{ width: '4rem', margin: '0 auto' }}
                      />
                    </LazyLoad>
                    <p className="red text-nowrap">{cItem.title}</p>
                  </div>
                  <div>
                    {cItem.subItems.map((sItem, sIdx) => (
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
                  </div>
                </div>
              )}
              {cItem.type === 'PromotionalMenuItem' && (
                <PromotionPanel key={cItem.id} item={cItem} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  renderHelpMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    return (
      <div
        className={`dropdown-nav bg-transparent d-flex full-width-asset justify-content-center ${
          activeTopParentId === item.id ? 'show' : ''
        }`}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="content-asset bg-white border-top">
          <Help data={item} />
        </div>
      </div>
    );
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
                onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
                onMouseOut={this.hanldeListItemMouseOut.bind(this, item)}
              >
                <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
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
                            {item.link && item.link.text}
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
                          item.link && item.link.text
                        )}
                      </NavItem>
                    </span>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className="rc-md-up">
          {headerNavigationList
            .filter((ele) => ele.expanded)
            .map((item, i) =>
              item.type === 'ContactUsMenuGroup'
                ? this.renderHelpMenu(item, i)
                : this.renderNormalMenu(item, i)
            )}
        </div>
      </>
    );
  }
}
