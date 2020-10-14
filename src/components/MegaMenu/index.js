import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './index.css';
import { inject, observer } from 'mobx-react';

@inject('configStore')
@observer
class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMegaMenu: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  handleMouseOver() {
    this.flag = 1;
    this.setState({
      showMegaMenu: true
    });
  }
  handleMouseOut() {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.setState({
          showMegaMenu: false
        });
      }
    }, 200);
  }
  toggleMenu() {
    this.setState({
      showMegaMenu: !this.state.showMegaMenu
    });
  }
  _renderLinkItem = (item) => {
    return item.link ? (
      <a
        className="rc-list__header"
        href={item.link}
        target="_blank"
        aria-haspopup={!!item.subMenuKey}
      >
        <FormattedMessage id={item.langKey} />
      </a>
    ) : (
      <Link
        className="rc-list__header"
        to={item.linkObj}
        aria-haspopup={!!item.subMenuKey}
      >
        <FormattedMessage id={item.langKey} />
      </Link>
    );
  };
  render() {
    return (
      <>
        <button
          className="rc-btn rc-btn--icon-label rc-icon rc-menu--xs rc-iconography rc-md-up"
          aria-label="Menu"
          ref={this.menuBtnRef}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <FormattedMessage id="menu" />
        </button>
        <button
          id="J-btn-menu"
          className={`rc-btn rc-btn--icon rc-icon rc-menu--xs rc-iconography rc-md-down ${
            this.state.showMegaMenu ? 'btn-close' : ''
          }`}
          aria-label="Menu"
          onClick={this.toggleMenu}
        >
          <span className="rc-screen-reader-text">
            <FormattedMessage id="menu" />
          </span>
        </button>
        <div className={`${this.state.showMegaMenu ? '' : 'rc-hidden'}`}>
          <section className="rc-max-width--xl">
            <nav
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
                    {this.props.menuData.map((item, i) => (
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
            <nav
              className="rc-nav rc-nav-custom rc-md-up"
              data-toggle-group="mobile"
              data-toggle-effect="rc-expand--horizontal"
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
            >
              <div className="rc-layout-container rc-three-column">
                <div className="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
                  <ul
                    className="rc-list rc-list--blank rc-list--align"
                    role="menubar"
                  >
                    <li className="rc-list__item rc-list__item--group w-100">
                      <Link className="rc-list__header" to="/list/cats">
                        <FormattedMessage id="cats" />
                      </Link>
                    </li>
                    <li className="rc-list__item rc-list__item--group w-100">
                      <Link className="rc-list__header" to="/list/dogs">
                        <FormattedMessage id="dogs" />
                      </Link>
                    </li>
                    <li className="rc-list__item rc-list__item--group w-100">
                      <a
                        className="rc-list__header"
                        href={this.props.configStore.contactUsUrl}
                        target="_blank"
                      >
                        <FormattedMessage id="aboutUs" />
                      </a>
                    </li>
                    <li className="rc-list__item rc-list__item--group w-100">
                      <Link className="rc-list__header" to="/help">
                        <FormattedMessage id="contactUs" />
                      </Link>
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

export default MegaMenu;
