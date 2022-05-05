import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import GoogleTagManager from '@/components/GoogleTagManager';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { Link } from 'react-router-dom';
import './index.less';
import LinkedSubs from './components/LinkedSubs';
import LazyLoad from 'react-lazyload';
import PetForms from './components/PetForms';
import { petsById, getRecommendProducts, getPetList } from '@/api/pet';
import Loading from '@/components/Loading';
import {
  getDictionary,
  getDeviceType,
  datePickerConfig,
  getElementToPageTop,
  getClubFlag
} from '@/utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import Banner_Cat from './images/banner_Cat.jpg';
import Banner_Dog from './images/banner_Dog.jpg';
import ProductCarousel from '@/components/ProductCarousel';
import { findPetProductForClub } from '@/api/subscription';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@seoHoc()
@observer
class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPetParam: {
        isPurebred: 1,
        petsSex: 1,
        sterilized: 1
      },
      subList: [],
      loading: true,
      sterilized: 0,
      showList: false,
      //pet
      isCat: null,
      breed: '',
      sizeArr: [],
      selectedSpecialNeeds: [],
      selectedSizeObj: {
        value: ''
      },
      petList: [],
      currentPet: {},
      isEdit: false,
      errorMsg: '',
      isMobile: false,
      recommendData: []
    };
  }
  componentWillUnmount() {}
  async componentDidMount() {
    let datePickerDom = document.querySelector('.receiveDate');
    let subdetailInfo = await sessionItemRoyal.get('rc-subdetailInfo');
    this.props.location.state = subdetailInfo && JSON.parse(subdetailInfo);
    sessionItemRoyal.remove('rc-subdetailInfo');
    console.info(sessionItemRoyal.get('rc-subdetailInfo'));
    // datePickerDom.disabled = true;
    console.log('datePickerConfig:', datePickerConfig);
    datePickerDom.placeholder = datePickerConfig.format.toUpperCase();
    console.log(this.props, 'props');
    let petsType = this.props.location.state?.petsType;
    if (petsType) {
      let isCat = petsType?.toLowerCase() === 'cat';
      this.petTypeChange(isCat);
    }
    this.setState({ isMobile: getDeviceType() !== 'PC' });
    getDictionary({ type: 'dogSize' })
      .then((res) => {
        this.setState({
          sizeArr: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
      });
    this.petsById();
    this.getPetList();
  }
  get sizeOptions() {
    return this.state.sizeArr.map((ele) => {
      delete ele.value;
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  petsById = async () => {
    let id = this.props.match.params?.id;
    if (!id) {
      this.setState({
        loading: false
      });
      return;
    }
    let params = {
      petsId: id
    };
    try {
      const res = await petsById(params);
      let currentPet = res.context?.context || res.context;
      const {
        activity,
        birthOfPets,
        isPurebred,
        lifestyle,
        needs,
        petsBreed,
        petsId,
        petsImg,
        petsName,
        petsSex,
        petsSizeValueName,
        petsType,
        sterilized,
        weight
      } = currentPet;
      let oldCurrentPet = {
        activity,
        birthOfPets,
        isPurebred,
        lifestyle,
        needs,
        petsBreed,
        petsId,
        petsImg,
        petsName,
        petsSex,
        petsSizeValueId: '',
        storeId: window.__.env.REACT_APP_STOREID,
        petsSizeValueName,
        petsType,
        sterilized,
        weight
      };
      this.setState({
        currentPet: currentPet,
        showList: true,
        oldCurrentPet,
        isCat: currentPet.petsType == 'cat' ? true : false,
        loading: false
      });
      this.edit(currentPet);
      this.getSpecialNeeds(currentPet.customerPetsPropRelations);
    } catch (err) {
      this.setState({
        loading: false
      });
      this.showErrorMsg(err.message || this.props.intl.messages.getDataFailed);
    }
  };
  edit = async (currentPet) => {
    let weightObj = {
      measure: '',
      measureUnit: 'kg',
      type: 2
    };
    try {
      if (currentPet.weight) {
        weightObj = JSON.parse(currentPet.weight);
      }
    } catch (e) {}
    let breedList = [];
    try {
      breedList = await getDictionary({
        type: currentPet.petsType === 'cat' ? 'catBreed' : 'dogBreed'
      });
    } catch (err) {
      this.showErrorMsg(
        err.message.toString() || this.props.intl.messages.getDataFailed
      );
    }
    let filteredBreed = breedList.filter(
      (el) => el.valueEn === currentPet.petsBreed
    )[0];
    console.log(filteredBreed, 'aaaa');
    let param = Object.assign(
      {},
      { ...currentPet },
      {
        isEdit: true,
        step: 1,
        showList: false,
        isCat: currentPet.petsType === 'dog' ? false : true,
        isInputDisabled:
          currentPet.petsBreed === 'unknown Breed' ? true : false,
        weight:
          currentPet.petsType === 'dog' ? currentPet.petsSizeValueName : '',
        weightObj,
        nickname: currentPet.petsName,
        birthdate: currentPet.birthOfPets,
        sensitivity: currentPet.needs
      }
    );
    if (currentPet.isPurebred == 1) {
      param.breedName =
        currentPet.petsBreed === 'unknown Breed'
          ? ''
          : filteredBreed
          ? filteredBreed.name
          : '';
      param.breed =
        currentPet.petsBreed === 'unknown Breed'
          ? ''
          : filteredBreed
          ? filteredBreed.valueEn
          : '';
    } else {
      param.breedcode = currentPet.petsBreed;
    }
    if (
      currentPet.petsBreed === 'unknown Breed' ||
      currentPet.petsBreed === 'Other Breed'
    ) {
      param.breed = '';
    }

    let filterSize = this.sizeOptions.filter(
      (el) => el.value === currentPet.petsSizeValueName
    );
    if (filterSize.length) {
      param.selectedSizeObj = Object.assign(this.state.selectedSizeObj, {
        value: filterSize[0].value
      });
    }

    param.selectedSpecialNeedsObj = {
      value:
        currentPet.customerPetsPropRelations &&
        currentPet.customerPetsPropRelations[0]?.propName
    };
    let params = {
      breedCode: param.isPurebred ? param.breed : 'Other Breed',
      birth: param.birthdate,
      petsType: param.isCat ? 'cat' : 'dog',
      mainReason: param.selectedSpecialNeedsObj.value,
      sterilized: currentPet.sterilized
    };
    if (param.weight) {
      params.size = param.weight;
    }
    if (getClubFlag()) {
      findPetProductForClub({
        petsId: this.props.match.params.id,
        apiTree: 'club_V2'
      }).then((res) => {
        let result = res.context;
        if (result.otherProducts) {
          let recommendData = result.otherProducts;
          recommendData.unshift(result.mainProduct);
          recommendData.forEach((el) => {
            el.goodsSubtitle = el.goodsSubTitle;
            el.mainItemCode = el.spuCode;
          });
          this.setState({
            recommendData: recommendData
          });
        }
      });
    } else {
      getRecommendProducts(params).then((res) => {
        let result = res.context;
        if (result.otherProducts) {
          let recommendData = result.otherProducts;
          recommendData.unshift(result.mainProduct);
          recommendData.forEach((el) => {
            el.goodsSubtitle = el.goodsSubTitle;
          });
          this.setState({
            recommendData: recommendData
          });
        }
      });
    }
    this.setState({ currentPetParam: param });
  };
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    this.scrollToErrorMsg();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.rc-layout-container');
    if (widget) {
      window.scrollTo({
        top: getElementToPageTop(widget),
        behavior: 'smooth'
      });
    }
  }
  getSpecialNeeds = (array) => {
    if (array && array.length > 0) {
      let needs = [];
      for (let index = 0; index < array.length; index++) {
        needs.push(array[index].propName);
      }
      this.setState({
        selectedSpecialNeeds: needs
      });
    }
  };
  petTypeChange(isCat) {
    this.setState({
      isCat
    });
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  getPetList = async () => {
    let customerId = this.userInfo && this.userInfo.customerId;
    let consumerAccount = this.userInfo && this.userInfo.consumerAccount;
    if (!customerId) {
      // showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    getPetList({
      customerId,
      consumerAccount
    })
      .then((res) => {
        let petList = res.context.context;
        this.setState({
          petList: petList
        });
      })
      .catch((err) => {});
  };

  render() {
    const event = {
      page: {
        type: 'myAccountPet',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    const { currentPet, selectedSizeObj, isMobile, isCat, petList } =
      this.state;
    let isChoosePetType = isCat !== null;
    return (
      <div className="petForm">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 p-petform">
          {this.props.history.location.pathname !== '/petForm/' &&
            this.props.history.location.pathname !== '/petForm' && (
              <BreadCrumbs />
            )}
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              {this.props.history.location.pathname !== '/petForm/' &&
                this.props.history.location.pathname !== '/petForm' && (
                  <div>
                    {isMobile ? (
                      <div className="col-12 rc-md-down">
                        <Link to="/account/pets">
                          <span className="red">&lt;</span>
                          <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                            <FormattedMessage id="account.pets" />
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <SideMenu type="Pets" />
                    )}
                  </div>
                )}
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <div
                className="chooseTypeBox my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop mt-2 md:mt-0"
                style={{ display: !isChoosePetType ? 'block' : 'none' }}
              >
                <h5 style={{ color: '#333333', fontWeight: 400 }}>
                  <FormattedMessage id="New Pet" />
                </h5>
                <div className="content mt-2 md:mt-4">
                  <LazyLoad>
                    <img
                      src={Banner_Dog}
                      style={{ left: '40px' }}
                      alt="Banner Dog"
                    />
                  </LazyLoad>
                  <div className="buttonBox">
                    <p
                      style={{
                        color: '#333333',
                        fontWeight: 400,
                        fontSize: '1.375rem'
                      }}
                    >
                      {window.__.env.REACT_APP_COUNTRY !== 'uk' ? (
                        <FormattedMessage id="Choose your pet type" />
                      ) : null}
                    </p>
                    <p style={{ color: '#E2001A', fontSize: '1.375rem' }}>
                      <FormattedMessage id="Your Pet is a…" />
                    </p>
                    <div>
                      <button
                        className="rc-btn rc-btn--sm rc-btn--one mr-5"
                        onClick={() => {
                          this.petTypeChange(false);
                        }}
                      >
                        <FormattedMessage id="Dog" />
                      </button>
                      <button
                        className="rc-btn rc-btn--sm rc-btn--one"
                        onClick={() => {
                          this.petTypeChange(true);
                        }}
                      >
                        <FormattedMessage id="Cat" />
                      </button>
                    </div>
                    {/* 日本需要 */}
                    <div>
                      {window.__.env.REACT_APP_COUNTRY === 'jp' &&
                        petList.length > 0 && (
                          <>
                            <a
                              href="javascript;:"
                              className="font-medium text-16 md:mr-2 pt-4"
                              style={{
                                color: '#444444',
                                borderBottom: '1px solid #d7d7d7'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (this.userInfo) {
                                  this.props.history.push('/home');
                                }
                              }}
                            >
                              Proceed without adding a pet profile
                            </a>
                          </>
                        )}
                    </div>
                  </div>
                  <LazyLoad>
                    <img
                      src={Banner_Cat}
                      style={{ right: '40px' }}
                      alt="Banner Cat"
                    />
                  </LazyLoad>
                </div>
              </div>
              <PetForms
                petList={petList}
                paramsId={this.props.match.params.id || ''}
                oldCurrentPet={this.state.oldCurrentPet}
                currentPetParam={this.state.currentPetParam}
                selectedSizeObj={selectedSizeObj}
                selectedSpecialNeeds={this.state.selectedSpecialNeeds}
                loading={this.state.loading}
                history={this.props.history}
                subList={this.state.subList}
                location={this.props.location}
                sizeOptions={this.sizeOptions}
                isCat={isCat}
                errorMsg={this.state.errorMsg}
                showErrorMsg={this.showErrorMsg.bind(this)}
                setState={this.setState.bind(this)}
              />
            </div>
            {/* 土耳其、俄罗斯club绑定订阅,不是indv的时候才能绑定 */}
            {currentPet.petsId &&
            getClubFlag() &&
            !(
              currentPet.sourceType == 1 ||
              currentPet.sourceType == 'individual'
            ) ? (
              <LinkedSubs
                {...this.props}
                petsId={this.props.match.params.id}
                loading={this.state.loading}
                setState={this.setState.bind(this)}
                errorMsg={this.state.errorMsg}
                petsType={currentPet.petsType}
              />
            ) : null}
            <div>
              {this.state.recommendData.length && isChoosePetType ? (
                <ProductCarousel
                  location={this.props.location}
                  history={this.props.history}
                  goodsList={
                    this.state.recommendData.length
                      ? this.state.recommendData
                      : []
                  }
                  customCls="ui-petform"
                />
              ) : null}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default injectIntl(PetForm);
