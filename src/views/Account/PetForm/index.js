import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Modal from '@/components/Modal';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { Link } from 'react-router-dom';
import './index.less';
import { Helmet } from 'react-helmet';
import LinkedSubs from './components/LinkedSubs';
import LazyLoad from 'react-lazyload';
import PetForms from './components/PetForms';
import { petsById, getRecommendProducts } from '@/api/pet';
import Loading from '@/components/Loading';
import {
  getDictionary,
  getDeviceType,
  datePickerConfig,
  setSeoConfig,
  getElementToPageTop,
  getClubFlag
} from '@/utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns-tz';
import Banner_Cat from './images/banner_Cat.jpg';
import Banner_Dog from './images/banner_Dog.jpg';
import RelateProductCarousel from '@/components/RelateProductCarousel';
import { findPetProductForClub } from '@/api/subscription';
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
@inject('loginStore')
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
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
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
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    let datePickerDom = document.querySelector('.receiveDate');
    // datePickerDom.disabled = true;
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
    const { currentPet, selectedSizeObj, isMobile, isCat } = this.state;
    let isChoosePetType = isCat !== null;
    return (
      <div className="petForm">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 p-petform">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
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
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <div
                className="chooseTypeBox my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop mt-2 mt-md-0"
                style={{ display: !isChoosePetType ? 'block' : 'none' }}
              >
                <h5 style={{ color: '#333333', fontWeight: 400 }}>
                  <FormattedMessage id="New Pet" />
                </h5>
                <div className="content mt-2 mt-md-4">
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
                      <FormattedMessage id="Choose your pet type" />
                    </p>
                    <p style={{ color: '#E2001A', fontSize: '1.375rem' }}>
                      <FormattedMessage id="Your Pet is a…" />
                    </p>
                    <div>
                      <button
                        className="rc-btn rc-btn--sm rc-btn--one"
                        style={{ marginRight: '1.25rem' }}
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
            {/* 土耳其、俄罗斯club绑定订阅 */}
            {currentPet.petsId && getClubFlag() ? (
              <LinkedSubs
                petsId={this.props.match.params.id}
                loading={this.state.loading}
                setState={this.setState.bind(this)}
                errorMsg={this.state.errorMsg}
                petsType={currentPet.petsType}
              />
            ) : null}
            <div>
              {this.state.recommendData.length && isChoosePetType ? (
                <RelateProductCarousel
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
