import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import BannerTip from '@/components/BannerTip';
import './index.css';
import edit from '@/assets/images/edit.svg';
import { setSeoConfig } from '@/utils/utils';

export default class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    setSeoConfig()
  }

  render() {
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div
                  className="list-select-pet js-list-pet"
                  data-toggle-group=""
                >
                  <ul
                    className="scroll--x list list--inline list--align list--blank flex--middle"
                    role="tablist"
                  >
                    <li className="pet-element">
                      <a
                        href="/ru/account/"
                        className="tab-add tab--img"
                        role="tab"
                      >
                        <span className="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                      </a>
                    </li>
                    <li className="rc-margin-x--xs pet-element">
                      <a href="/on/demandware.store">
                        <div className="tab__img img--round img--round--md name--select text-center active">
                          Rita
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pet-information js-pet-information rc-margin-bottom--md">
                  <h2 className="name-pet">Rita</h2>
                  <div className="rc-layout-container">
                    <div className="rc-column">
                      <ul className="pet-data">
                        <li className="breed dog">
                          <span className="">Unknown breed</span>
                        </li>
                        <li className="birth">
                          <span className="">2020-05-05</span>
                        </li>
                        <li className="gender male sprite-pet">
                          <span className="">male</span>
                        </li>
                        <li className="weight">
                          <span className="">Mini</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rc-column">
                      <div className="pet-special-need">Special needs</div>
                      <ul className="list-special-need">
                        <li className="">Skin and Wool Care</li>
                        <li className="">Increased joint sensitivity</li>
                        <li className="">Sensitive digestive system</li>
                      </ul>
                    </div>
                    <div className="edit js-edit-pet">
                      <a href="#" className="tab--img" data-toggle="">
                        <img src={edit} className="img-success" alt="" />
                      </a>
                    </div>
                    <div className="delete">
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
