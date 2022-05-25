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

  groupByCount({ arr, count }) {
    let result = [];
    for (let i = 0; i < arr.length; i += count) {
      result.push(arr.slice(i, i + count));
    }
    return result;
  }

  renderNormalMenu = (item, i) => {
    const { activeTopParentId } = this.props;
    let lists = [];
    // 分类MenuItem和非MenuItem类目
    if (false && item.MenuItems.every((ele) => ele.Type === 'MenuItem')) {
    } else {
      // 排列这两个的顺序
      const menuItemList = this.groupByCount({
        arr: item.MenuItems.filter((ele) => ele.Type === 'MenuItem'),
        count: 6
      }); // 6个为一组
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
          'dropdown-nav d-flex  justify-between items-center1 bg-white pt-411 pb-411 border-top1',
          {
            show: activeTopParentId === item.id,
            'px-0 pb-0': item.Type === 'DetailedMenuGroup'
          },
          `dropdown-nav__${item.id} nav-type__${item.Type}`
        )}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        {lists.map((list, i) => (
          <React.Fragment key={i}>
            {list.value.length > 0 ? (
              list.type === 'MenuItem' ? (
                list.value.map((l, idx) => (
                  <div className="pl-411 pr-4 nav-column" key={idx}>
                    {l.map((cItem) => (
                      <a
                        href={cItem.Link.Url}
                        className={cn(
                          'mb-2 ui-cursor-pointer text-lg ui-text-overflow-line1 hover:underline',
                          { 'font-normal': cItem.isBold }
                        )}
                        key={cItem.id}
                        style={{ display: 'block', color: '#333' }}
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
                ))
              ) : (
                <>
                  {list.value.map((cItem, cIdx) => (
                    <React.Fragment key={cItem.id}>
                      {cItem.Type === 'DetailedMenuItem' && (
                        <div
                          className={`d-flex align-items-center11 dropdown-nav__catogery__card1 pr-51 pl-411`}
                        >
                          <div
                            className={cn(
                              'mr-41 text-center1 h-full flex items-end',
                              { 'order-1': cIdx }
                            )}
                            // style={{ width: '35%' }}
                            // style={{ width: '160px' }}
                          >
                            {/* <LazyLoad> */}
                            <img
                              src={cItem.Image.Url}
                              alt={cItem.Image.AltText}
                              srcSet={cItem.Image.Srcset}
                              style={{
                                width: '160px'
                                //  margin: '0 auto'
                              }}
                            />
                            {/* </LazyLoad> */}
                            {/* <p className="red medium">
                              {cItem.ImageDescription}
                            </p> */}
                          </div>
                          <div
                            // style={{ flex: 1 }}
                            className={cn('pb-10 nav-column')}
                            style={{ color: '#66666' }}
                          >
                            <p className="text-xl ui-text-overflow-line1 text-rc-red">
                              {cItem.ImageDescription}
                            </p>
                            {cItem.SubItems.map((sItem, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <a
                                  href={sItem.Link.Url}
                                  className="mb-0 ui-cursor-pointer hover:underline text-lg ui-text-overflow-line1"
                                  onClick={this.handleClickNavItem.bind(this, {
                                    item,
                                    cItem: sItem,
                                    type: 1
                                  })}
                                >
                                  {sItem.Title}
                                </a>
                                {sItem.Subtitle ? (
                                  <p className="mb-3 text-sm ui-text-overflow-line2">
                                    {sItem.Subtitle}
                                  </p>
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
                          className={cn(
                            `dropdown-nav__ad__card flex-grow-111`,
                            {
                              'dropdown-nav__ad__productcard':
                                item.Type === 'DetailedMenuGroup'
                            }
                          )}
                          // {/* 当promotionItem在最前边时 - border-r, 在后边时-border-l */}
                          borderFix={!i ? 'border-r pr-10' : 'border-l pl-10'}
                        />
                      )}
                      {cItem.Type === 'ImageMenuItem' && (
                        <div className="dropdown-nav__ad__card">
                          <div className="pl-10">
                            <img
                              // className="w-full"
                              src={cItem?.Image?.Url}
                              alt={cItem?.Image?.AltText}
                            />
                          </div>
                        </div>
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
        className={`dropdown-nav bg-transparent1 d-flex full-width-asset justify-content-center ${
          activeTopParentId === item.id ? 'show' : ''
        } dropdown-nav__${item.id}`}
        aria-hidden={activeTopParentId === item.id}
        onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
        onMouseOut={this.hanldeListItemMouseOut}
        key={i}
      >
        <div className="content-asset w-full">
          <Help data={item} handleClickNavItem={this.handleClickNavItem} />
        </div>
      </div>
    );
  };
  render() {
    const { headerNavigationList, activeTopParentId, showNav, showLoginBtn } =
      this.props;
    return (
      <>
        {showNav ? (
          <nav
            className={cn('rc-header__nav rc-header__nav--secondary rc-md-up', {
              'rc-hidden': !showNav
            })}
            style={{ paddingRight: '2px', paddingLeft: '2px' }}
          >
            <ul
              className={cn(
                'rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center justify-evenly',
                {
                  'rc-hidden': !showLoginBtn
                }
              )}
              style={{ maxWidth: '1120px', margin: '0 auto' }}
            >
              {headerNavigationList.map((item, i) => (
                <li
                  className={cn(
                    `rc-list__item mr-0`,
                    activeTopParentId === item.id ? 'active' : '',
                    { dropdown: item.expanded }
                  )}
                  key={i}
                  onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
                  onMouseOut={this.hanldeListItemMouseOut.bind(this, item)}
                  onBlur={this.onListItemBlur}
                  onFocus={this.onListItemFocus}
                >
                  <ul
                    className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center"
                    style={{ outline: 'none' }}
                    tabIndex={item.id}
                    // onClick={this.toggleListItem.bind(this, item)}
                  >
                    <li className="rc-list__item">
                      <span className="rc-list__header pt-0 pb-0">
                        <NavItem
                          item={item}
                          className={cn(
                            `rc-list__header border-bottom border-width-2`,
                            item.id === activeTopParentId
                              ? 'border-red'
                              : 'border-transparent'
                          )}
                        >
                          {item.expanded ? (
                            <span className={`rc-header-with-icon header-icon`}>
                              {item.Link && item.Link.Text}
                              {/* {item.id === activeTopParentId ? (
                                <span className="iconfont icon-dropdown-arrow ml-1">
                                  &#xe6f9;
                                </span>
                              ) : (
                                <span className="iconfont icon-dropdown-arrow ml-1">
                                  &#xe6fa;
                                </span>
                              )} */}
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
