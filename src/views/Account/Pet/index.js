import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import './index.less';
import noPet from '@/assets/images/noPet.jpg';
import { Link } from 'react-router-dom';
import { getPetList } from '@/api/pet';
import { getCustomerInfo } from '@/api/user';
import Female from '@/assets/images/female.png'
import Male from '@/assets/images/male.png'
import Cat from '@/assets/images/cat.png'
import Dog from '@/assets/images/dog.png'

@inject('loginStore')
@observer
class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      petList: []
    };
  }
  componentDidMount() {
    this.getPetList();
  }
  isHavePet() {
    const { history } = this.props;
    // history.push('/account/pets/petForm');
  }
  getUserInfo() {
    return this.props.loginStore.userInfo;
  }

  getAccount = () => {
    let consumerAccount = '';
    if (this.getUserInfo() && this.getUserInfo().customerAccount) {
      consumerAccount = this.getUserInfo().customerAccount;
    } else {
      getCustomerInfo().then((res) => {
        const context = res.context;
        this.props.loginStore.setUserInfo(context);

        consumerAccount = context.consumerAccount;
      });
    }

    return consumerAccount;
  };

  getPetList = async () => {
    if (!this.getAccount()) {
      this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    let params = {
      consumerAccount: this.getAccount()
    };
    await getPetList(params)
      .then((res) => {
        if (res.code === 'K-000000') {
          let petList = res.context.context;
          this.setState({
            loading: false,
            petList: petList
          });
          // if (petList.length > 0) {
          //   this.setState({
          //     loading: false
          //   });
          //   this.isHavePet();
          // } else {
          //   this.setState({
          //     loading: false,
          //     petList: petList
          //   });
          // }
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    };
    return (
      <div id="Pets">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />

              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {/* <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="account.pets"></FormattedMessage>
                  </h4>
                </div> */}
                <div className="content-asset">
                  {this.state.loading ? (
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={5}
                    />
                  ) : (
                    this.state.petList.length <= 0? (
                      <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                      <div className="rc-column">
                        <div className="rc-padding-right-lg rc-padding-y--sm ">
                          <div className="children-nomargin">
                            <p style={{ wordBreak: 'break-all' }}>
                              <FormattedMessage id="account.noPet"></FormattedMessage>
                            </p>
                          </div>
                          <div className="rc-margin-top--sm">
                            <Link
                              className="rc-btn rc-btn--one"
                              to="/account/pets/petForm"
                            >
                              <FormattedMessage id="account.addPet"></FormattedMessage>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column">
                        <img src={noPet} alt="No pets" />
                      </div>
                    </div>
                    ): (
                      <div>
                        <p>Create and manage your pet's profile to maintain its best health possible</p>
                        {this.state.petList.map(el => (
                          <div className="petItem">
                            <div className="photo">
                              <img style={{width: '90px'}} src={el.petsType === 'cat'? Cat: Dog}/>
                            </div>
                            <div className="content">
                              <h1 className="name red">{el.petsName} <img style={{width: '15px'}} src={!el.petsSex?Male: Female}/></h1>
                              <div className="key">
                                <span>Birthday</span>
                                <span>Breed</span>
                              </div>
                              <div className="value">
                                <span>{el.birthOfPets}</span>
                                <span>{el.petsBreed}</span>
                              </div>
                            </div>
                            <div className="operation">
                              <a className="edit rc-styled-link" href="#/" onClick={(e) => {
                                e.preventDefault()
                                this.props.history.push('/account/pets/petForm/' + el.petsId)      
                              }}>Edit</a>
                            </div>
                          </div>
                        ))}
                        <div className="petItem" onClick={() => {
                          this.props.history.push('/account/pets/petForm')
                        }} style={{textAlign: 'center', display: 'block', cursor: 'pointer'}}>
                          <span style={{fontSize: '25px'}}>+</span> Add a new PET
                        </div>
                      </div>
                    )
                    
                  )}
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
export default Pet;
