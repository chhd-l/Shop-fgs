import React from 'react';
import { FormattedMessage } from 'react-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import './index.css';
import edit from '@/assets/images/edit.svg';
import { Link } from 'react-router-dom';

export default class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div class="list-select-pet js-list-pet" data-toggle-group="">
                  <ul
                    class="scroll--x list list--inline list--align list--blank flex--middle"
                    role="tablist"
                  >
                    <li class="pet-element">
                      <a
                        href="/ru/account/"
                        class="tab-add tab--img"
                        role="tab"
                      >
                        <span class="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                      </a>
                    </li>
                    <li class="rc-margin-x--xs pet-element">
                      <a href="/on/demandware.store">
                        <div class="tab__img img--round img--round--md name--select text-center active">
                          Rita
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="pet-information js-pet-information rc-margin-bottom--md">
                  <h2 class="name-pet">Rita</h2>
                  <div class="rc-layout-container">
                    <div class="rc-column">
                      <ul class="pet-data">
                        <li class="breed dog">
                          <span class="">Unknown breed</span>
                        </li>
                        <li class="birth">
                          <span class="">2020-05-05</span>
                        </li>
                        <li class="gender male sprite-pet">
                          <span class="">male</span>
                        </li>
                        <li class="weight">
                          <span class="">Mini</span>
                        </li>
                      </ul>
                    </div>
                    <div class="rc-column">
                      <div class="pet-special-need">Special needs</div>
                      <ul class="list-special-need">
                        <li class="">Skin and Wool Care</li>
                        <li class="">Increased joint sensitivity</li>
                        <li class="">Sensitive digestive system</li>
                      </ul>
                    </div>
                    <div class="edit js-edit-pet">
                      <a href="#" class="tab--img" data-toggle="">
                        <img src={edit} class="img-success" alt="" />
                      </a>
                    </div>
                    <div class="delete">
                      <a href="#">X</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
