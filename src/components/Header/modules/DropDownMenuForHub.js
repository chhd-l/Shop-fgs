import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Help from './Help';
import NavItem from './NavItem';
import LazyLoad from 'react-lazyload';

/**
 * 渲染二级菜单
 */
export default class DropDownMenu extends React.Component {
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
        <div className="flex-grow-1111 rc-padding-y--xs rc-padding-left--sm--desktop bg-white">
          <ul
            className="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
            role="menu"
          >
            {(item.children || [])
              .sort((a, b) => a.sort - b.sort)
              .map((mitem, mIndx) => (
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
                    <span className="dropdown-nav__item font-weight-normal">
                      <NavItem
                        item={mitem}
                        onClick={this.handleClickNavItem.bind(this, mitem)}
                      >
                        {mitem.navigationName}
                      </NavItem>
                    </span>
                  </div>
                  <ul
                    className="rc-padding--none"
                    role="menu"
                    aria-hidden="true"
                  >
                    {(mitem.children || [])
                      .sort((a, b) => a.sort - b.sort)
                      .map((citem, cIndex) => (
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
                          <NavItem
                            className="dropdown-nav__link"
                            item={citem}
                            onClick={this.handleClickNavItem.bind(this, citem)}
                            item={citem}
                          >
                            {citem.navigationName}
                          </NavItem>
                        </li>
                      ))}
                  </ul>
                  {mIndx === 0 && (
                    <div className="dropdown-nav__cat-link rc-padding-bottom--xs">
                      <NavItem
                        item={item}
                        onClick={this.handleClickNavItem.bind(this, item)}
                        className="rc-styled-link"
                      >
                        <FormattedMessage id="viewAll" />
                      </NavItem>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
        {descObj ? (
          <div className={`content-asset bg-white`}>
            <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>{descObj.text}</p>
                </div>
                <Link to="/product-finder">
                  <button
                    className="rc-btn rc-btn--one"
                    onClick={() =>
                      this.GAClickMenu({
                        category: 'banner',
                        action: 'banner',
                        label: '/product-finder',
                        value: 'product-finder'
                      })
                    }
                  >
                    <FormattedMessage id="findTheRightDiet" />
                  </button>
                </Link>
              </div>
              <div className="mt-auto">
                <LazyLoad>
                  <FormattedMessage id="findTheRightDiet">
                    {(txt) => (
                      <img
                        className="pull-right rc-lg-up ls-is-cached lazyloaded"
                        src={descObj.imageLink}
                        alt={txt}
                      />
                    )}
                  </FormattedMessage>
                </LazyLoad>
              </div>
            </div>
          </div>
        ) : null}
        {/* <div
          className="d-flex bg-white pt-4 pb-4 border-top"
          style={{ width: '80%' }}
        >
          <div className="border-right d-flex align-items-center pr-4 pl-4">
            <div className="mr-4 text-center">
              <img
                src="https://www.royalcanin.com/fr/-/media/german_shepherd_adult.png?sw=60&hash=A6C7D257823CAD6AF7B7453B1D32B2CAAB376F9A%20320w"
                style={{ width: '4rem', margin: '0 auto' }}
              />
              <p className="red text-nowrap">Dog products</p>
            </div>
            <div class="">
              <p class="medium mb-0">Retail products</p>
              <p class="mb-3">
                Precise nutrition for cats of all ages, sizes and breeds.
              </p>
              <p class="medium mb-0">Retail products</p>
              <p class="mb-3">
                Precise nutrition for cats of all ages, sizes and breeds.
              </p>
              <p class="medium mb-0">Discover our product ranges</p>
            </div>
          </div>
          <div className="d-flex align-items-center pr-4 pl-4">
            <div className="mr-4 text-center">
              <img
                src="https://www.royalcanin.com/fr/-/media/german_shepherd_adult.png?sw=60&hash=A6C7D257823CAD6AF7B7453B1D32B2CAAB376F9A%20320w"
                style={{ width: '4rem', margin: '0 auto' }}
              />
              <p className="red text-nowrap">Dog products</p>
            </div>
            <div class="">
              <p class="medium mb-0">Retail products</p>
              <p class="mb-3">
                Precise nutrition for cats of all ages, sizes and breeds.
              </p>
              <p class="medium mb-0">Retail products</p>
              <p class="mb-3">
                Precise nutrition for cats of all ages, sizes and breeds.
              </p>
              <p class="medium mb-0">Discover our product ranges</p>
            </div>
          </div>
          <div className="pl-4 pr-4">
            <div className="border d-flex align-items-center p-4">
              <div>
                <p className="red">Need help finding the right product?</p>
                <p>Try our product finder</p>
                <button className="rc-btn rc-btn--two">Finde a product</button>
              </div>
              <img
                src="https://www.royalcanin.com/fr/-/media/german_shepherd_adult.png?sw=60&hash=A6C7D257823CAD6AF7B7453B1D32B2CAAB376F9A%20320w"
                style={{ width: '2rem' }}
              />
            </div>
          </div>
        </div>
       */}
      </div>
    );
  };
  renderHelpMenu = (item, i) => {
    const { configStore, activeTopParentId } = this.props;
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
          <Help configStore={configStore} />
        </div>
      </div>
    );
  };
  render() {
    const { headerNavigationList, activeTopParentId } = this.props;
    return (
      <>
        <nav
          className={`rc-header__nav rc-header__nav--secondary rc-md-up ${
            this.props.showNav ? '' : 'rc-hidden'
          }`}
        >
          <ul
            className={`rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center flex-nowrap ${
              this.props.showLoginBtn ? '' : 'rc-hidden'
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
                            {item.navigationName}
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
                          item.navigationName
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
            .filter(
              (ele) =>
                (ele.expanded && ele.children && ele.children.length) ||
                (ele.navigationLink && ele.navigationLink.includes('/help'))
            )
            .map((item, i) =>
              item.navigationLink && item.navigationLink.includes('/help')
                ? this.renderHelpMenu(item, i)
                : this.renderNormalMenu(item, i)
            )}
        </div>
      </>
    );
  }
}
