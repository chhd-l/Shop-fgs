import React from 'react';
import Help from './HelpForHub';
import NavItem from './NavItemForHub';
import PromotionPanel from '../hub/PromotionPanel';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';

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
    this.state = {
      currentClickedParentItemId: -1
    };
    this.hanldeListItemMouseOver = this.hanldeListItemMouseOver.bind(this);
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
    this.toggleListItem = this.toggleListItem.bind(this);
    this.onListItemFocus = this.onListItemFocus.bind(this);
  }
  toggleListItem(item, e) {
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();

    const { currentClickedParentItemId } = this.state;

    let tmpId = -1;
    const { activeTopParentId } = this.props;
    // 如果可以下拉，且(没有展开/与前一次点击的item不同)时，则打开下拉
    if (
      item.expanded &&
      (activeTopParentId === -1 || currentClickedParentItemId !== item.id)
    ) {
      tmpId = item.id;
    }
    this.props.updateActiveTopParentId(tmpId);
    this.setState({ currentClickedParentItemId: item.id });
    !item.expanded && this.menuItemEvent({ item });
  }
  onListItemBlur = (e) => {
    this.timeOutId = setTimeout(() => {
      this.props.updateActiveTopParentId(-1);
    });
  };
  onListItemFocus() {
    clearTimeout(this.timeOutId);
  }
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
    const Level2 =
      (type ? cItem?.Title : cItem?.Link?.Text) ||
      cItem?.PrimaryLink?.Text ||
      cItem?.Subtitle; //兼容图片链接ga
    window?.dataLayer?.push({
      event: 'navTopClick',
      navTopClick: {
        itemName: [Level1, Level2].filter((e) => e).join('|')
      }
    });
  }

  renderNormalMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    let menuItemListGroupedByStep = [];
    let lists = [];
    // 全部为MenuItem时，四个为一列
    if (item.MenuItems.every((ele) => ele.Type === 'MenuItem')) {
      menuItemListGroupedByStep.push(item.MenuItems);
      // for (let i = 0; i < item.MenuItems.length; i += 4) {
      //   menuItemListGroupedByStep.push(item.MenuItems.slice(i, i + 4));
      // }
    } else {
      // 排列这两个的顺序
      const menuItemList = item.MenuItems.filter(
        (ele) => ele.Type === 'MenuItem'
      );
      const otherItemList = item.MenuItems.filter(
        (ele) => ele.Type !== 'MenuItem'
      );
      lists = [
        {
          sort: item.MenuItems.findIndex((ele) => ele.Type === 'MenuItem'),
          value: menuItemList,
          type: 'MenuItem'
        },
        {
          sort: item.MenuItems.findIndex((ele) => ele.Type !== 'MenuItem'),
          value: otherItemList,
          type: 'OtherItem'
        }
      ].sort((a, b) => a.sort - b.sort);
    }

    return (
      <div
        className={cn(
          'dropdown-nav d-flex justify-content-center1 align-items-start bg-white pt-4 pb-4 border-top',
          {
            show: activeTopParentId === item.id,
            'flex-wrap': menuItemListGroupedByStep.length > 0
          },
          `dropdown-nav__${item.id} nav-type__${item.Type}`
        )}
        aria-hidden={activeTopParentId === item.id}
        // onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        // onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        {menuItemListGroupedByStep.length > 0 &&
          menuItemListGroupedByStep.map((gItem, gIdx) =>
            gItem.map((cItem) => (
              <a
                href={cItem.Link.Url}
                className="medium mb-2 ui-cursor-pointer btn-link pl-4 pr-4 nav-column"
                key={cItem.id}
                style={{ display: 'block' }}
                onClick={this.handleClickNavItem.bind(this, { item, cItem })}
              >
                {cItem.Link.Text}
              </a>
            ))
          )}

        {lists.map((list, i) => (
          <React.Fragment key={i}>
            {list.value.length > 0 ? (
              list.type === 'MenuItem' ? (
                <div className="pl-4 pr-4 nav-column">
                  {list.value.map((cItem) => (
                    <a
                      href={cItem.Link.Url}
                      className="medium mb-2 ui-cursor-pointer btn-link"
                      key={cItem.id}
                      style={{ display: 'block' }}
                      onClick={this.handleClickNavItem.bind(this, {
                        item,
                        cItem
                      })}
                      title={cItem.Link.Text}
                    >
                      {cItem.Link.Text}
                    </a>
                  ))}
                </div>
              ) : (
                <>
                  {list.value.map((cItem, cIdx) => (
                    <React.Fragment key={cItem.id}>
                      {cItem.Type === 'DetailedMenuItem' && (
                        <div
                          className={`d-flex align-items-center dropdown-nav__catogery__card pr-5 pl-4 ${
                            cIdx ? '' : 'border-right'
                          }`}
                        >
                          <div
                            className="mr-4 text-center"
                            style={{ width: '35%' }}
                          >
                            {/* <LazyLoad> */}
                            <img
                              src={cItem.Image.Url}
                              alt={cItem.Image.AltText}
                              srcSet={cItem.Image.Srcset}
                              style={{ width: '6rem', margin: '0 auto' }}
                            />
                            {/* </LazyLoad> */}
                            <p className="red medium">
                              {cItem.ImageDescription}
                            </p>
                          </div>
                          <div style={{ flex: 1 }}>
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
                          className={`dropdown-nav__ad__card flex-grow-111 ${
                            item.Type === 'DetailedMenuGroup'
                              ? 'dropdown-nav__ad__productcard'
                              : ''
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )
            ) : null}
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
        {showNav ? (
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
                  className={`rc-list__item ${
                    item.expanded ? `dropdown` : ''
                  } ${activeTopParentId === item.id ? 'active' : ''} `}
                  key={i}
                  // onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
                  // onMouseOut={this.hanldeListItemMouseOut.bind(this, item)}
                  onBlur={this.onListItemBlur}
                  onFocus={this.onListItemFocus}
                >
                  <ul
                    className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center"
                    style={{ outline: 'none' }}
                    tabIndex={item.id}
                    onClick={this.toggleListItem.bind(this, item)}
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
        ) : null}
      </>
    );
  }
}
