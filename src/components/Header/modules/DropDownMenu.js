import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
    if (currentDesc && currentDesc.text && currentDesc.imageLink) {
      descObj = { text: currentDesc.text, imageLink: currentDesc.imageLink };
    } else if (item.navigationDesc && item.imageLink) {
      descObj = { text: item.navigationDesc, imageLink: item.imageLink };
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
                              className="dropdown-nav__link "
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
          <div className={`content-asset`}>
            <div className="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div className="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div className="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>{descObj.text}</p>
                </div>
                <Link to={item.mainLink}>
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
          <div className="dropdown-nav__help d-md-flex">
            <div className="dropdown-nav__help__text align-self-center">
              <h4 className="title rc-delta">
                <FormattedMessage id="aQuestion" />
              </h4>
              <div className="desc children-nomargin text-left">
                <p className="rc-text-colour--text">
                  <FormattedMessage id="uNeedHelp" />
                </p>
                <p className="rc-text-colour--text">
                  <FormattedMessage id="dontHesitateToContactUs" /> :
                </p>
              </div>
            </div>
            <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="help.byTelephone" />
                </b>
                <div className="children-nomargin">
                  <p>{configStore.contactTimePeriod}</p>
                </div>
                <div>
                  <a
                    href={`tel:${configStore.storeContactPhoneNumber}`}
                    className="rc-large-body tel"
                  >
                    {configStore.storeContactPhoneNumber}
                  </a>
                </div>
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par téléphone icon"
                />
              </div>
            </div>
            <Link
              className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/help"
            >
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="help.byEmail" />
                </b>
                <div className="children-nomargin" />
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="Par e-mail icon"
                />
              </div>
            </Link>
            <Link
              className="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
              to="/FAQ/all"
            >
              <div className="rc-margin-right--xs flex-grow-1">
                <b>
                  <FormattedMessage id="footer.FAQ" />
                </b>
                <div className="children-nomargin" />
              </div>
              <div className="rc-padding-left--xs rc-lg-up">
                <img
                  className=" ls-is-cached lazyloaded"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                  src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                />
              </div>
              <div className="rc-padding-left--xs rc-md-down">
                <img
                  className="lazyload"
                  data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  alt="FAQ icon"
                />
              </div>
            </Link>
          </div>
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
          .sort((a, b) => a.sort - b.sort)
          .map((item, i) =>
            item.navigationLink && item.navigationLink.includes('/help')
              ? this.renderHelpMenu(item, i)
              : this.renderNormalMenu(item, i)
          )}
      </div>
    );
  }
}
