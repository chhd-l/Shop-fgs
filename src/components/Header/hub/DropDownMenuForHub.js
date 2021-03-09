import React from 'react';
import Help from './HelpForHub';
import NavItem from './NavItemForHub';
import PromotionPanel from '../hub/PromotionPanel';
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
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
    this.toggleListItem = this.toggleListItem.bind(this);
  }
  toggleListItem(item) {
    this.flag = 1;
    // 如果可以打开，就打开，否则不打开
    let tmpId = -1;
    const { activeTopParentId } = this.props;
    if (item.expanded && activeTopParentId === -1 && this.flag) {
      tmpId = item.id;
    }
    this.props.updateActiveTopParentId(tmpId);
    !item.expanded && this.menuItemEvent(item);
  }
  onListItemBlur = (e) => {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.props.updateActiveTopParentId(-1);
      }
    }, 200);
  };
  hanldeListItemMouseOver(item) {
    // 若存在子项，才展开
    this.props.updateActiveTopParentId(item.expanded ? item.id : -1);
  }
  hanldeListItemMouseOut = () => {
    this.props.updateActiveTopParentId(-1);
  };
  handleClickNavItem({ item, cItem, type }) {
    // 点击subMenu埋点
    this.menuItemEvent({ item, cItem, type });
  }

  menuItemEvent({ item, cItem, type }) {
    const Level1 = item?.Link?.Text;
    const Level2 = type ? cItem : cItem?.Link?.Text;
    dataLayer.push({
      event: 'navTopClick',
      navTopClick: {
        itemName: [Level1, Level2].filter((e) => e).join('|')
      }
    });
  }

  renderNormalMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    let menuItemListGroupedByStep = [];
    let menuItemList = [];
    let otherItemList = [];
    // 全部为MenuItem时，四个为一列
    if (item.MenuItems.every((ele) => ele.Type === 'MenuItem')) {
      for (let i = 0; i < item.MenuItems.length; i += 4) {
        menuItemListGroupedByStep.push(item.MenuItems.slice(i, i + 4));
      }
    } else {
      menuItemList = item.MenuItems.filter((ele) => ele.Type === 'MenuItem');
      otherItemList = item.MenuItems.filter((ele) => ele.Type !== 'MenuItem');
    }

    return (
      <div
        className={`dropdown-nav d-flex justify-content-center align-items-start bg-white pt-4 pb-4 border-top ${
          activeTopParentId === item.id ? 'show' : ''
        } dropdown-nav__${item.id}`}
        aria-hidden={activeTopParentId === item.id}
        // onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        // onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        {menuItemListGroupedByStep.length > 0 &&
          menuItemListGroupedByStep.map((gItem, gIdx) => (
            <div
              className={`pl-4 pr-4 ${
                menuItemListGroupedByStep > 6
                  ? 'd-flex flex-wrap nav-two-column'
                  : 'nav-column'
              }`}
              key={gIdx}
            >
              {gItem.map((cItem) => (
                <a
                  href={cItem.Link.Url}
                  className="medium mb-2 ui-cursor-pointer btn-link"
                  key={cItem.id}
                  style={{ display: 'block' }}
                  onClick={this.handleClickNavItem.bind(this, { item, cItem })}
                >
                  {cItem.Link.Text}
                </a>
              ))}
            </div>
          ))}

        {menuItemList.length > 0 && (
          <div className="pl-4 pr-4 nav-column">
            {menuItemList.map((cItem) => (
              <a
                href={cItem.Link.Url}
                className="medium mb-2 ui-cursor-pointer btn-link"
                key={cItem.id}
                style={{ display: 'block' }}
                onClick={this.handleClickNavItem.bind(this, { item, cItem })}
                title={cItem.Link.Text}
              >
                {cItem.Link.Text}
              </a>
            ))}
          </div>
        )}

        {otherItemList.map((cItem, cIdx) => (
          <React.Fragment key={cItem.id}>
            {cItem.Type === 'DetailedMenuItem' && (
              <div
                className={`d-flex align-items-center dropdown-nav__catogery__card pr-4 pl-4 ${
                  cIdx === item.MenuItems.length ? '' : 'border-right'
                }`}
              >
                <div className="mr-4 text-center">
                  {/* <LazyLoad> */}
                    <img
                      src={cItem.Image.Url}
                      alt={cItem.Image.AltText}
                      srcSet={cItem.Image.Srcset}
                      style={{ width: '4rem', margin: '0 auto' }}
                    />
                  {/* </LazyLoad> */}
                  <p className="red">{cItem.ImageDescription}</p>
                </div>
                <div>
                  {cItem.SubItems.map((sItem, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <a
                        href={sItem.Link.Url}
                        className="medium mb-0 ui-cursor-pointer btn-link"
                        onClick={this.handleClickNavItem.bind(this, {
                          item,
                          cItem: sItem,
                          type: 1
                        })}
                      >
                        {sItem.Title}
                      </a>
                      {sItem.Subtitle ? (
                        <p className="mb-3">{sItem.Subtitle}</p>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {cItem.Type === 'PromotionalMenuItem' && (
              <PromotionPanel
                key={cItem.id}
                item={item}
                cItem={cItem}
                handleClickNavItem={this.handleClickNavItem}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  renderHelpMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    return (
      <div
        className={`dropdown-nav bg-transparent d-flex full-width-asset justify-content-center ${
          activeTopParentId === item.id ? 'show' : ''
        } dropdown-nav__${item.id}`}
        aria-hidden={activeTopParentId === item.id}
        // onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        // onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="content-asset bg-white border-top">
          <Help data={item} handleClickNavItem={this.handleClickNavItem} />
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
          style={{ paddingRight: '2px', paddingLeft: '2px' }}
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
                {item.Type === 'ContactUsMenuGroup'
                  ? this.renderHelpMenu(item, i)
                  : this.renderNormalMenu(item, i)}
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }
}
