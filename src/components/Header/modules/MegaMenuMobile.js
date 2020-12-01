import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Help from '../modules/Help';

function SecondItemContainer(props) {
  const { item } = props;
  return (
    <ul
      className="rc-list rc-list--blank rc-list--align hasSubcategories rc-expand--horizontal h-100"
      role="menu"
      aria-expanded={!!item.expand}
      aria-hidden={!item.expand}
    >
      <li className="rc-list__item w-100 rc-md-down">
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

class MegaMenu extends React.Component {
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
  renderSecondChildItem = (item) => {
    return item.navigationLink && item.navigationLink.includes('/help') ? (
      <SecondItemContainer
        item={item}
        assetContent={<Help configStore={this.props.configStore} />}
        handleClickToggleChilds={this.handleClickToggleChilds.bind(this, item)}
      />
    ) : (
      <SecondItemContainer
        item={item}
        handleClickToggleChilds={this.handleClickToggleChilds.bind(this, item)}
        childsListContent={
          <>
            <ul className="rc-list rc-list--blank subcategories">
              {item.children.map((cItem, cIdx) => (
                <li className="rc-list__item w-100" key={cIdx}>
                  <dl
                    data-toggle-effect="rc-expand--vertical"
                    className="custom-accordion rc-margin--none"
                    role="presentation"
                  >
                    <div className="custom-accordion__item">
                      <dt>
                        <button
                          className="custom-accordion__button rc-list__header"
                          role="menuitem"
                          aria-selected="false"
                          data-tab-init="true"
                          onClick={this.handleClickToggleChilds.bind(
                            this,
                            cItem
                          )}
                        >
                          {cItem.navigationName}
                          <span
                            className={`rc-icon rc-iconography ${
                              cItem.expand ? 'rc-down--xs' : 'rc-right--xs'
                            }`}
                          />
                        </button>
                      </dt>
                      {cItem.children &&
                        cItem.children.length > 0 &&
                        cItem.children.map((eItem, eIdx) => (
                          <dd
                            className={`rc-list__content rc-bg-colour--brand4 rc-padding--none ${
                              !!cItem.expand ? '' : 'hidden'
                            }`}
                            key={eIdx}
                          >
                            <ul className="rc-list rc-list--blank subcategories">
                              <li className="rc-list__item w-100">
                                <span
                                  onClick={this.handleClickNavItem.bind(
                                    this,
                                    eItem
                                  )}
                                  role="menuitem"
                                  className="rc-list__link submenu-padding-mobile"
                                >
                                  {eItem.navigationName}
                                </span>
                              </li>
                            </ul>
                          </dd>
                        ))}
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
            <li className="rc-list__item w-100">
              <span
                className="rc-list__header rc-list__link submenu-padding-mobile"
                onClick={this.handleClickNavItem.bind(this, item)}
                role="menuitem"
                data-tab-init="true"
              >
                <FormattedMessage id="viewAll" />
              </span>
            </li>
          </>
        }
        assetContent={
          item.navigationDesc && item.imageLink ? (
            <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>{item.navigationDesc}</p>
                </div>
                <Link to="/product-finder" data-tab-init="true">
                  <button className="rc-btn rc-btn--one" data-tab-init="true">
                    <FormattedMessage id="findTheRightDiet" />
                  </button>
                </Link>
              </div>
              <div className="mt-auto">
                <img
                  className="pull-right rc-md-down lazyloaded"
                  alt="Trouver l'alimentation adaptée"
                  src={item.imageLink}
                />
              </div>
            </div>
          ) : null
        }
      />
    );
  };
  _renderLinkItem = (item) => {
    // 顶级父类，有子项的添加haspopup=true,其他直接跳转的使用a标签
    return (
      <>
        {(item.expanded && item.children && item.children.length) ||
        (item.navigationLink && item.navigationLink.includes('/help')) ? (
          <>
            <span
              className="rc-list__header bg-transparent"
              aria-haspopup={true}
              onClick={this.handleClickToggleChilds.bind(this, item)}
            >
              {item.navigationName}
            </span>
            {this.renderSecondChildItem(item)}
          </>
        ) : item.interaction === 1 ? (
          <a
            className="rc-list__header bg-transparent"
            href={item.navigationLink}
            target={item.target}
            rel="noopener noreferrer"
          >
            {item.navigationName}
          </a>
        ) : (
          <span
            className="rc-list__header bg-transparent"
            onClick={this.handleClickNavItem.bind(this, item)}
          >
            {item.navigationName}
          </span>
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
                        className="rc-list__item rc-list__item--group w-100"
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

export default MegaMenu;
