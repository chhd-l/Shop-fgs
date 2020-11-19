import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './index.css';

class MegaMenu extends React.Component {
  static defaultProps = {
    menuData: [],
    handleClickNavItem: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      showMegaMenu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClickNavItem = this.handleClickNavItem.bind(this);
  }
  toggleMenu() {
    this.setState((curState) => ({ showMegaMenu: !curState.showMegaMenu }));
  }
  handleClickNavItem(item) {debugger
    this.props.handleClickNavItem(item);
  }
  _renderLinkItem = (item) => {
    let hasChildren;

    // 顶级父类，有子项的添加haspopup=true,其他直接跳转的使用a标签
    // item.children && item.children.length
    return item.children && item.children.length ? (
      <span className="rc-list__header bg-transparent" aria-haspopup={true}>
        {item.navigationName}
      </span>
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
    );
  };
  render() {
    const { showMegaMenu } = this.state;
    const { menuData } = this.props;
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
