import React from 'react';

function Header () {
  return (
    <header className="rc-header" data-js-header-scroll>
      <nav className="rc-header__nav rc-header__nav--primary">
        <ul className="rc-list rc-list--blank rc-list--inline rc-list--align" role="menubar">
          {/* <li className="rc-list__item">
            <button className="rc-btn rc-btn--icon-label rc-icon rc-menu--xs rc-iconography rc-md-up"
              data-modal-trigger="main-nav-modal" aria-label="Menu">Menu</button>
            <button className="rc-btn rc-btn--icon rc-icon rc-menu--xs rc-iconography rc-md-down"
              data-js-trigger="mobile-push-nav" aria-label="Menu">
              <span className="rc-screen-reader-text">Menu</span>
            </button>
          </li> */}
        </ul>

        <a href="#/" className="rc-header__brand">
          <span className="rc-screen-reader-text">Royal Canin Logo</span>
          <object id="header__logo" className="rc-header__logo" type="image/svg+xml"
            data="https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.svg?v=8-7-8" data-js-import-interactive-svg>
            <img alt="Royal Canin logo" height="100" src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
              style={{backgroundImage: 'url(https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.png?v=8-7-8)'}} width="135" />
          </object>
        </a>

        <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__right" role="menubar">
          <li className="rc-list__item">
            <button data-js-trigger="search-bar" className="rc-btn rc-btn--icon rc-icon rc-search--xs rc-iconography"
              aria-label="Search">
              <span className="rc-screen-reader-text">Search</span>
            </button>
          </li>
        </ul>

        <form className="rc-header__search-bar rc-hidden" data-js-target="search-bar" autoComplete="off">
          <button className="rc-btn rc-btn--icon rc-icon rc-search--xs rc-iconography rc-stick-left rc-vertical-align"
            type="submit" aria-label="Search">
            <span className="rc-screen-reader-text">Search</span>
          </button>
          <input data-js-autocomplete className="rc-header__input" placeholder="Start typing to search" id="header-search"
            type="search" value="" />
          <label htmlFor="header-search">
            <span className="rc-screen-reader-text">Start typing to search</span>
          </label>
          <button data-js-trigger="search-bar"
            className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-stick-right rc-vertical-align" type="button"
            aria-label="Close">
            <span className="rc-screen-reader-text">Close</span>
          </button>
        </form>
      </nav>

      <nav className="rc-header__nav rc-header__nav--secondary rc-md-up ">

        <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
          <li className="rc-list__item">
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
              <li className="rc-list__item">
                <a className="rc-list__header" href="#/list/cats">CATS</a>
              </li>
            </ul>
          </li>


          <li className="rc-list__item">
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
              <li className="rc-list__item">
                <a className="rc-list__header" href="#/list/dogs">DOGS</a>
              </li>
            </ul>
          </li>

          <li className="rc-list__item">
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
              <li className="rc-list__item">
                <a className="rc-list__header" href="#/">ABOUT US</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;