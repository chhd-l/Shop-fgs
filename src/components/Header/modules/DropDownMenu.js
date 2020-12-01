import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Help from './Help';

/**
 * 渲染二级菜单
 */
export default class DropDownMenu extends React.Component {
  static defaultProps = {
    headerNavigationList: [],
    activeTopParentId: -1,
    handleClickNavItem: () => {}
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
    this.props.updateActiveTopParentId(item.id);
  }
  hanldeListItemMouseOut = () => {
    this.props.updateActiveTopParentId(-1);
  };
  handleClickNavItem = (item) => {
    this.props.handleClickNavItem(item);
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
                      {mitem.interaction === 1 ? (
                        <a href={mitem.navigationLink} target={mitem.target}>
                          {mitem.navigationName}
                        </a>
                      ) : (
                        <span
                          onClick={this.handleClickNavItem.bind(this, mitem)}
                          className={`${
                            mitem.interaction !== 2 ? 'ui-cursor-pointer' : ''
                          }`}
                        >
                          {mitem.navigationName}
                        </span>
                      )}
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
                          {mitem.interaction === 1 ? (
                            <a
                              href={mitem.navigationLink}
                              target={mitem.target}
                              className="dropdown-nav__link"
                            >
                              {mitem.navigationName}
                            </a>
                          ) : (
                            <span
                              onClick={this.handleClickNavItem.bind(
                                this,
                                citem
                              )}
                              className={`dropdown-nav__link ${
                                citem.interaction !== 2
                                  ? 'ui-cursor-pointer'
                                  : ''
                              }`}
                            >
                              {citem.navigationName}
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                  {mIndx === 0 && (
                    <div className="dropdown-nav__cat-link rc-padding-bottom--xs">
                      {item.interaction === 1 ? (
                        <a
                          href={item.navigationLink}
                          target={item.target}
                          className="rc-styled-link"
                        >
                          <FormattedMessage id="viewAll" />
                        </a>
                      ) : (
                        <span
                          onClick={this.handleClickNavItem.bind(this, item)}
                          className="rc-styled-link"
                        >
                          <FormattedMessage id="viewAll" />
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
        {descObj ? (
          <div className={`content-asset`} style={{ width: '35%' }}>
            <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>{descObj.text}</p>
                </div>
                <Link to="/product-finder">
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
  renderHelpMenu = (item, i) => {
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
          <Help configStore={configStore} />
        </div>
      </div>
    );
  };
  render() {
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
              ? this.renderHelpMenu(item, i)
              : this.renderNormalMenu(item, i)
          )}
      </div>
    );
  }
}
