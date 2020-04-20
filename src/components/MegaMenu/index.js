import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function MegaMenu (props) {
  return (
    <React.Fragment>
      <div className={[props.show ? '' : 'rc-hidden'].join(' ')}>
        <section class="rc-max-width--xl">
          <nav class="rc-nav rc-md-down" data-toggle-group="mobile" data-toggle-effect="rc-expand--horizontal">
            <div class="rc-layout-container rc-three-column">
              <div class="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
                <ul class="rc-list rc-list--blank rc-list--align" role="menubar">
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/list/cats">CATS</a></li>
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/list/dogs">DOGS</a></li>
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/">ABOUT US</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <nav class="rc-nav rc-nav-custom rc-md-up" data-toggle-group="mobile" data-toggle-effect="rc-expand--horizontal">
            <div class="rc-layout-container rc-three-column">
              <div class="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
                <ul class="rc-list rc-list--blank rc-list--align" role="menubar">
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/list/cats">CATS</a></li>
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/list/dogs">DOGS</a></li>
                  <li class="rc-list__item rc-list__item--group"><a class="rc-list__header" href="#/">ABOUT US</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
      </div>

      {/* <div data-js-modal-menu>
        <section className="rc-max-width--xl">
          <nav className="rc-nav rc-hidden" data-toggle-group="mobile" data-toggle-effect="rc-expand--horizontal"
            data-js-target="mobile-push-nav">
            <div className="rc-layout-container rc-three-column">
              <div className="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
                <ul className="rc-list rc-list--blank rc-list--align" role="menubar">
                  <li className="rc-list__item rc-list__item--group">
                    <Link to="/list/cats" className="rc-list__header">CATS</Link>
                  </li>
                  <li className="rc-list__item rc-list__item--group">
                    <Link to="/list/dogs" className="rc-list__header">DOGS</Link>
                  </li>
                  <li className="rc-list__item rc-list__item--group">
                    <Link to="/" className="rc-list__header">ABOUT US</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
      </div> */}

      {/* <aside role="modal" className="rc-modal rc-hidden" data-modal-target="modal-register"></aside> */}
    </React.Fragment>
  )
}

export default MegaMenu;