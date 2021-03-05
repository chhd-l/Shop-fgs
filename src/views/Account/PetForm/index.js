import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { Link } from 'react-router-dom';
import './index.less';
// import dog from '@/assets/images/animal-1.jpg';
// import cat from '@/assets/images/animal-2.jpg';
import success from '@/assets/images/check-success.svg';
import edit from '@/assets/images/edit.svg';
import { Helmet } from 'react-helmet';
import { myAccountActionPushEvent } from '@/utils/GA';

import {
  getPetList,
  addPet,
  petsById,
  delPets,
  editPets,
  getRecommendProducts
} from '@/api/pet';
import Loading from '@/components/Loading';
import {
  getDictionary,
  getDeviceType,
  datePickerConfig,
  setSeoConfig
} from '@/utils/utils';
import { getCustomerInfo } from '@/api/user';
import { getDict } from '@/api/dict';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Selection from '@/components/Selection';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import Banner_Cat from './images/banner_Cat.jpg';
import Banner_Dog from './images/banner_Dog.jpg';
import UploadImg from './components/ImgUpload';
import Carousel from './components/Carousel';
import LazyLoad from 'react-lazyload';

const selectedPet = {
  border: '3px solid #ec001a'
};
const noSelect = {
  border: '3px solid #d7d7d7'
};

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

@inject('loginStore')
@observer
class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      precent: 12.5,
      step: 1,
      currentStep: 'step1',
      showList: false,
      isDisabled: true,
      isInputDisabled: false,
      isUnknownDisabled: false,
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      //pet
      currentPetId: '',
      isCat: null,
      isMale: null,
      nickname: '',
      isUnknown: false,
      isMix: false,
      breed: '',
      weight: '',
      isSterilized: true,
      birthdate: '',
      sizeArr: [],
      specialNeeds: [],
      selectedSpecialNeeds: [],
      selectedSpecialNeedsObj: {
        value: ''
      },
      selectedSizeObj: {
        value: ''
      },
      showBreedList: false,
      breedList: [],
      petList: [],
      currentPet: {},
      isEdit: false,
      errorMsg: '',
      successMsg: '',
      breedListLoading: false,
      showBreedListNoneTip: false,
      specialNeedsDisable: false,
      imgUrl: '',
      isMobile: false,
      isChoosePetType: this.props.match.params.id ? true : false,
      isPurebred: true,
      recommendData: []
    };
    this.nextStep = this.nextStep.bind(this);
    this.selectPetType = this.selectPetType.bind(this);
    this.selectSex = this.selectSex.bind(this);
    this.selectWeight = this.selectWeight.bind(this);
    this.setSterilized = this.setSterilized.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    console.log(this.props, 'props');
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
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
    await getDictionary({ type: 'specialNeeds' })
      .then((res) => {
        this.setState({
          specialNeeds: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
      });
  }
  get specialNeedsOptions() {
    let option = this.state.specialNeeds.map((ele) => {
      delete ele.value;
      return {
        value: ele.valueEn,
        ...ele
      };
    });

    return option;
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
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  // getPetList = async () => {
  //   if (!this.userInfo.customerAccount) {
  //     this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
  //     this.setState({
  //       loading: false
  //     });
  //     return false;
  //   }
  //   await getPetList({
  //     customerId: this.userInfo.customerId,
  //     consumerAccount: this.userInfo.customerAccount
  //   })
  //     .then((res) => {
  //       let petList = res.context.context;
  //       if (petList.length > 0) {
  //         let currentPet = petList.filter(
  //           (el) => el.petsId === this.props.match.params.id
  //         )[0];
  //         this.setState({
  //           loading: false,
  //           showList: true,
  //           petList
  //         });
  //         if (currentPet) {
  //           this.edit(currentPet);
  //           this.getSpecialNeeds(currentPet.customerPetsPropRelations);
  //           this.setState({
  //             currentPetId: currentPet.petsId,
  //             currentPet: currentPet,
  //             imgUrl: currentPet.petsImg.includes('http')
  //               ? currentPet.petsImg
  //               : ''
  //           });
  //         }
  //       } else {
  //         this.setState({
  //           loading: false,
  //           showList: false,
  //           petList
  //         });
  //         this.add();
  //       }
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         loading: false
  //       });
  //       this.showErrorMsg(
  //         err.message || this.props.intl.messages.getDataFailed
  //       );
  //     });
  // };

  petsById = async (id) => {
    let params = {
      petsId: id
    };
    this.setState({
      loading: true
    });
    const res = await petsById(params);
    let currentPet = res.context.context;
    this.setState({
      currentPet: currentPet,
      showList: true,
      loading: false,
      currentPetId: currentPet.petsId
    });
    this.getSpecialNeeds(currentPet.customerPetsPropRelations);
  };
  delPets = async (currentPet) => {
    // let params = { petsIds: [currentPet.petsId] };
    let params = { petsIds: [this.props.match.params.id] };
    currentPet.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      currentPet: currentPet
    });
    await delPets(params);

    myAccountActionPushEvent('Remove pet');

    this.props.history.push('/account/pets/');
  };
  savePet = async () => {
    const { selectedSpecialNeeds } = this.state;
    let consumerAccount = '';
    if (this.userInfo && this.userInfo.customerAccount) {
      consumerAccount = this.userInfo.customerAccount;
    } else {
      this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      return;
    }

    let validFiled = ['nickname', 'birthdate'];
    if (this.state.isPurebred) {
      validFiled.push('breed');
    } else if (!this.state.isCat) {
      validFiled.push('weight');
    }
    for (let i = 0; i < validFiled.length; i++) {
      if (!this.state[validFiled[i]]) {
        this.showErrorMsg(
          this.props.intl.messages.pleasecompleteTheRequiredItem
        );
        return;
      }
    }
    if (!selectedSpecialNeeds.length) {
      this.showErrorMsg(this.props.intl.messages.pleasecompleteTheRequiredItem);
      return;
    }

    this.setState({
      loading: true
    });

    let customerPetsPropRelations = [];
    let propId = 100;
    for (let i = 0; i < selectedSpecialNeeds.length; i++) {
      let prop = {
        delFlag: 0,
        detailId: 0,
        indexFlag: 0,
        petsId: this.state.currentPetId,
        propId: propId,
        propName: selectedSpecialNeeds[i],
        relationId: '10086',
        sort: 0
      };
      customerPetsPropRelations.push(prop);
      propId += 1;
    }

    let pets = {
      birthOfPets: this.state.birthdate,
      petsId: this.state.currentPetId,
      petsImg: this.state.imgUrl,
      petsBreed: this.state.breed,
      petsName: this.state.nickname,
      petsSex: this.state.isMale ? '0' : '1',
      petsSizeValueId: '10086',
      petsSizeValueName: this.state.weight,
      petsType: this.state.isCat ? 'cat' : 'dog',
      sterilized: this.state.isSterilized ? '1' : '0',
      storeId: process.env.REACT_APP_STOREID
    };
    // if (this.state.isUnknown) {
    //   pets.petsBreed = 'unknown Breed';
    // }
    if (!this.state.isPurebred) {
      pets.petsBreed = 'mixed Breed';
    }
    let param = {
      customerPets: pets,
      customerPetsPropRelations: customerPetsPropRelations,
      storeId: process.env.REACT_APP_STOREID,
      userId: consumerAccount
    };
    if (pets.petsId) {
      await editPets(param)
        .then((res) => {
          this.setState({
            currentStep: 'success'
          });
          setTimeout(() => {
            this.petsById(pets.petsId);
          }, 3000);
          this.props.history.push('/account/pets/');
        })
        .catch((err) => {
          this.showErrorMsg(err.message || this.props.intl.messages.saveFailed);
          this.setState({
            loading: false
          });
        });
    } else {
      await addPet(param)
        .then((res) => {
          myAccountActionPushEvent('Add pet');
          let currentStep = 'success';
          this.setState({
            currentStep: currentStep
          });
          this.props.history.push('/account/pets/');
        })
        .catch((err) => {
          this.showErrorMsg(err.message || this.props.intl.messages.saveFailed);
          this.setState({
            loading: false
          });
        });
    }
  };
  nextStep() {
    let step = this.state.step;
    let isEdit = this.state.isEdit;
    let currentStep;
    if (step >= 8) {
      this.savePet();
    } else {
      step += 1;
      if (this.state.isCat && step === 5) {
        step += 1;
      }
      currentStep = 'step' + step;
    }
    this.setState({
      step: step,
      currentStep: currentStep,
      isDisabled: isEdit ? false : true
    });
  }
  selectPetType(type) {
    if (type === 'cat') {
      this.setState({
        isCat: true,
        isDisabled: false
      });
    } else if (type === 'dog') {
      this.setState({
        isCat: false,
        isDisabled: false
      });
    }
  }
  selectSex(type) {
    if (type === 'male') {
      this.setState({
        isMale: true,
        isDisabled: false
      });
    } else if (type === 'female') {
      this.setState({
        isMale: false,
        isDisabled: false
      });
    }
  }
  inputNickname = (e) => {
    let isDisabled = true;
    if (e.target.value !== '') {
      isDisabled = false;
    } else {
      isDisabled = true;
    }
    this.setState({
      nickname: e.target.value,
      isDisabled: isDisabled
    });
  };
  setUnknown = () => {
    let isUnknown = !this.state.isUnknown;
    let inputBreed = this.state.inputBreed;
    let isDisabled = this.state.isDisabled;
    let isInputDisabled = this.state.isInputDisabled;
    if (isUnknown) {
      inputBreed = '';
      isDisabled = false;
      isInputDisabled = true;
    } else {
      isDisabled = true;
      isInputDisabled = false;
    }
    this.setState({
      isUnknown: isUnknown,
      inputBreed: inputBreed,
      isDisabled: isDisabled,
      isInputDisabled: isInputDisabled
    });
  };
  inputBreed = (e) => {
    let isDisabled = true;
    let isUnknownDisabled = false;
    let showBreedList = false;
    if (e.target.value !== '') {
      isDisabled = false;
      isUnknownDisabled = true;
      showBreedList = true;
    } else {
      isDisabled = true;
      isUnknownDisabled = false;
      showBreedList = false;
    }
    this.setState({
      breed: e.target.value,
      isDisabled: isDisabled,
      isUnknownDisabled: isUnknownDisabled,
      showBreedList: showBreedList,
      breedListLoading: true,
      breedList: []
    });

    getDict({
      type: this.state.isCat ? 'catBreed' : 'dogBreed',
      name: e.target.value,
      delFlag: 0,
      storeId: process.env.REACT_APP_STOREID
    })
      .then((res) => {
        this.setState({
          breedList: res.context.sysDictionaryVOS,
          breedListLoading: false,
          showBreedListNoneTip: !res.context.sysDictionaryVOS.length
        });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
        this.setState({ breedListLoading: false, showBreedListNoneTip: true });
      });
    // this.getDict(
    //   this.state.isCat ? 'catBreed_mx' : 'dogBreed_mx',
    //   e.target.value
    // );
  };
  selectWeight(val) {
    this.setState({
      weight: val,
      isDisabled: false
    });
  }
  setSterilized(val) {
    console.log(val);
    this.setState({
      isSterilized: val
      // isDisabled: false
    });
  }

  inputBlur(e) {
    if (e.target.value && e.target.value !== '') {
      this.setState({
        birthdate: e.target.value,
        isDisabled: false
      });
    }
  }
  selectedBreed = (item) => {
    this.setState({
      breed: item.name,
      showBreedList: false
    });
  };
  add = () => {
    this.setState({
      step: 1,
      currentStep: 'step1',
      showList: false,
      isEdit: false,
      isDisabled: true,
      currentPetId: '',
      isCat: null,
      isMale: null,
      nickname: '',
      isUnknown: false,
      breed: '',
      weight: '',
      isSterilized: null,
      birthdate: '',
      selectedSpecialNeeds: [],
      isUnknownDisabled: false,
      isInputDisabled: false
    });
  };
  edit = (currentPet) => {
    let param = {
      isEdit: true,
      step: 1,
      currentStep: 'step1',
      isDisabled: false,
      showList: false,
      currentPetId: currentPet.petsId,
      isCat: currentPet.petsType === 'dog' ? false : true,
      isMale: currentPet.petsSex === 0 ? true : false,
      nickname: currentPet.petsName,
      isUnknown: currentPet.petsBreed === 'unknown Breed' ? true : false,
      isInputDisabled: currentPet.petsBreed === 'unknown Breed' ? true : false,
      isUnknownDisabled:
        currentPet.petsBreed === 'unknown Breed' ? false : true,
      breed:
        currentPet.petsBreed === 'unknown Breed' ? '' : currentPet.petsBreed,
      weight: currentPet.petsType === 'dog' ? currentPet.petsSizeValueName : '',
      isSterilized: currentPet.sterilized === 1 ? true : false,
      birthdate: currentPet.birthOfPets
    };
    if (currentPet.petsBreed === 'unknown Breed') {
      param.isMix = false;
      param.isUnknown = true;
      // param.isInputDisabled = true;
      param.breed = '';
    } else if (currentPet.petsBreed === 'mixed Breed') {
      param.isMix = true;
      param.isUnknown = false;
      // param.isInputDisabled = true;
      param.breed = '';
      param.isPurebred = false;
    } else {
      param.isPurebred = true;
    }

    let filterSize = this.sizeOptions.filter(
      (el) => el.value === currentPet.petsSizeValueName
    );
    if (filterSize.length) {
      param.selectedSizeObj = Object.assign(this.state.selectedSizeObj, {
        value: filterSize[0].value
      });
    }
    // if (
    //   currentPet.customerPetsPropRelations[0].propName !==
    //   'none'
    // ) {
    //   // param.selectedSpecialNeedsObj = Object.assign(
    //   //   this.state.selectedSpecialNeedsObj,
    //   //   {
    //   //     value: this.specialNeedsOptions.filter(
    //   //       (el) => el.name === currentPet.customerPetsPropRelations[0].propName
    //   //     )[0].valueEn
    //   //   }
    //   // );
    //   // param.selectedSpecialNeeds = [
    //   //   currentPet.customerPetsPropRelations[0].propName
    //   // ];
    //   param.selectedSpecialNeedsObj = { value: currentPet.customerPetsPropRelations[0].propName };
    // } else {
    //   param.selectedSpecialNeedsObj = { value: 'none' };
    // }
    param.selectedSpecialNeedsObj = {
      value: currentPet.customerPetsPropRelations[0].propName
    };
    let params = {
      breedCode: param.isPurebred ? param.breed : 'mixed Breed',
      birth: param.birthdate,
      petsType: param.isCat ? 'cat' : 'dog',
      // mainReason: selectedSpecialNeedsObj
      mainReason: param.selectedSpecialNeedsObj.value,
      sterilized: currentPet.sterilized
    };
    if (param.weight) {
      params.size = param.weight;
    }
    getRecommendProducts(params).then((res) => {
      let result = res.context.context;
      if (result.otherProducts) {
        let recommendData = result.otherProducts;
        recommendData.unshift(result.mainProduct);
        this.setState({
          recommendData: recommendData
        });
      }
    });
    this.setState(param);
  };
  getDict = (type, name) => {
    this.setState({ loading: true });
    getDict({ type, name, delFlag: 0, storeId: process.env.REACT_APP_STOREID })
      .then((res) => {
        this.setState({
          breedList: res.context.sysDictionaryVOS,
          loading: false
        });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
        this.setState({ loading: false });
      });
  };

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    });
    this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 2000);
  };

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.rc-layout-container');
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
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
  cancel = () => {
    this.setState({
      loading: true
    });
  };
  updateConfirmTooltipVisible = (status) => {
    let { currentPet } = this.state;
    currentPet.confirmTooltipVisible = status;
    this.setState({
      currentPet: currentPet
    });
  };
  onDateChange(date) {
    this.setState({
      birthdate: format(date, 'yyyy-MM-dd'),
      isDisabled: false
    });
  }
  genderChange(e) {
    if (e.currentTarget.value === '0') {
      this.setState({
        isMale: true
      });
    } else if (e.currentTarget.value === '1') {
      this.setState({
        isMale: false
      });
    }
  }
  petTypeChange(isCat) {
    this.setState({
      isChoosePetType: true,
      isCat: isCat,
      isDisabled: false
    });
    // if (e.currentTarget.value === '0') {
    //   this.setState({
    //     isCat: true,
    //     isDisabled: false
    //   });
    // } else if (e.currentTarget.value === '1') {
    //   this.setState({
    //     isCat: false,
    //     isDisabled: false
    //   });
    // }
  }
  specialNeedsOptionsChange(data) {
    console.log(data);
    if (data.value === 'none') {
      this.setState({
        selectedSpecialNeeds: ['none']
      });
    } else {
      this.setState({
        selectedSpecialNeeds: [data.value]
      });
    }
  }
  sizeOptionsChange(data) {
    console.log(data);
    this.setState({
      weight: data.value,
      selectedSizeObj: { value: data.value }
    });
  }
  handelImgChange(data) {
    console.log(data);
    this.setState({ imgUrl: data });
  }
  handleErrMessage = () => {};
  render() {
    const {
      currentPet,
      selectedSpecialNeedsObj,
      selectedSizeObj,
      imgUrl,
      isMobile,
      isChoosePetType
    } = this.state;
    return (
      <div className="petForm">
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
                    <img src={Banner_Dog} style={{ left: '40px' }} alt="" />
                  </LazyLoad>
                  <div className="buttonBox">
                    <p
                      style={{
                        color: '#333333',
                        fontWeight: 400,
                        fontSize: '22px'
                      }}
                    >
                      <FormattedMessage id="Choose your pet type" />
                    </p>
                    <p style={{ color: '#E2001A', fontSize: '22px' }}>
                      <FormattedMessage id="Your Pet is a…" />
                    </p>
                    <div>
                      <button
                        className="rc-btn rc-btn--sm rc-btn--one"
                        style={{ marginRight: '20px' }}
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
                    <img src={Banner_Cat} style={{ right: '40px' }} alt="" />
                  </LazyLoad>
                  {/* <div className="buttonBox" style={{left: '350px'}}>
                    <h4>I have a dog</h4>
                    <span>
                      <button className="rc-btn rc-btn--sm rc-btn--two" onClick={() => {this.petTypeChange(false)}}>Dog</button>
                    </span>
                  </div>
                  <img src={Banner_Cat} style={{right: '40px'}}/>
                  <div className="buttonBox" style={{right: '350px'}}>
                    <h4>I have a cat</h4>
                    <span>
                      <button className="rc-btn rc-btn--sm rc-btn--two" onClick={() => {this.petTypeChange(true)}}>Cat</button>
                    </span>
                  </div> */}
                </div>
              </div>
              <div
                className="petFormBox my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                style={{ display: isChoosePetType ? 'block' : 'none' }}
              >
                {/* 错误提示 */}
                <div
                  className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
                    this.state.errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    {this.state.errorMsg}
                  </aside>
                </div>
                <div style={{ display: isMobile ? 'block' : 'flex' }}>
                  <div className="photoBox">
                    {/* <LazyLoad> */}
                    <img
                      style={{
                        width: '120px',
                        marginTop: '40px',
                        borderRadius: '50%'
                      }}
                      src={imgUrl || (this.state.isCat ? Cat : Dog)}
                      alt=""
                    />
                    {/* </LazyLoad> */}
                    {/* <a className="rc-styled-link" href="#/" onClick={(e) => {
                        e.preventDefault()
                      }}>Change picture</a> */}
                    <UploadImg
                      tipVisible={false}
                      handleChange={(data) => this.handelImgChange(data)}
                      geterrMessage={this.handleErrMessage}
                      showLoading={() => {
                        this.setState({ loading: true });
                      }}
                      hiddenLoading={() => {
                        this.setState({ loading: false });
                      }}
                    />
                  </div>
                  <div className="formBox">
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width "
                        htmlFor="name"
                      >
                        <FormattedMessage id="name" />
                      </label>
                      <span
                        className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                        input-setup="true"
                      >
                        <input
                          type="text"
                          className="rc-input__control"
                          id="firstName"
                          name="firstName"
                          required=""
                          aria-required="true"
                          style={{ padding: '.5rem 0' }}
                          value={this.state.nickname}
                          onChange={this.inputNickname}
                          maxLength="50"
                          autoComplete="address-line"
                        />
                        <label
                          className="rc-input__label"
                          htmlFor="name"
                        ></label>
                      </span>
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="name" />
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        htmlFor="gender"
                      >
                        <FormattedMessage id="gender" />
                      </label>
                      <div style={{ padding: '.5rem 0' }}>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="female"
                            value="1"
                            checked={!this.state.isMale}
                            type="radio"
                            name="gender"
                            onChange={(e) => this.genderChange(e)}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="female"
                          >
                            <FormattedMessage id="petFemale" />
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="male"
                            value="0"
                            checked={this.state.isMale}
                            type="radio"
                            name="gender"
                            onChange={(e) => this.genderChange(e)}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="male"
                          >
                            <FormattedMessage id="petMale" />
                          </label>
                        </div>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="gender" />
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        htmlFor="birthday"
                      >
                        <FormattedMessage id="birthday" />
                      </label>
                      <span
                        className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                        input-setup="true"
                      >
                        <DatePicker
                          className="receiveDate"
                          placeholder="Select Date"
                          dateFormat={datePickerConfig.format}
                          locale={datePickerConfig.locale}
                          maxDate={new Date()}
                          selected={
                            this.state.birthdate
                              ? new Date(this.state.birthdate)
                              : ''
                          }
                          onChange={(date) => this.onDateChange(date)}
                        />
                        <div className="invalid-birthdate invalid-feedback">
                          <FormattedMessage id="account.dateTip" />
                        </div>
                      </span>
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="birthday" />
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        htmlFor="Is Purebred"
                      >
                        <FormattedMessage id="isPurebred" />
                      </label>
                      <div style={{ padding: '.5rem 0' }}>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="purebred"
                            value="0"
                            checked={this.state.isPurebred}
                            type="radio"
                            name="Is Purebred"
                            onChange={(e) => {
                              this.setState({
                                isPurebred: true,
                                weight: ''
                              });
                            }}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="purebred"
                          >
                            <FormattedMessage id="account.yes" />
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="noPurebred"
                            value="1"
                            checked={!this.state.isPurebred}
                            type="radio"
                            name="Is Purebred"
                            onChange={(e) => {
                              this.setState({
                                isPurebred: false,
                                breed: ''
                              });
                            }}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="noPurebred"
                          >
                            <FormattedMessage id="account.no" />
                          </label>
                        </div>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="Is Purebred" />
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        htmlFor="weight"
                      >
                        <FormattedMessage id="Special Need" />
                      </label>
                      <Selection
                        optionList={this.specialNeedsOptions}
                        selectedItemChange={(el) =>
                          this.specialNeedsOptionsChange(el)
                        }
                        selectedItemData={{
                          value: selectedSpecialNeedsObj.value
                          // value: ''
                        }}
                        disabled={this.state.specialNeedsDisable}
                        key={selectedSpecialNeedsObj.value}
                      />
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="weight" />
                          }}
                        />
                      </div>
                    </div>
                    {!this.state.isPurebred ? (
                      !this.state.isCat ? (
                        <div className="form-group col-lg-6 pull-left required">
                          <label
                            className="form-control-label rc-full-width"
                            htmlFor="Size"
                          >
                            <FormattedMessage id="Size" />
                          </label>
                          <Selection
                            optionList={this.sizeOptions}
                            selectedItemChange={(el) =>
                              this.sizeOptionsChange(el)
                            }
                            selectedItemData={{
                              value: selectedSizeObj.value
                            }}
                            key={selectedSizeObj.value}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'none' }}
                          >
                            <FormattedMessage
                              id="payment.errorInfo"
                              values={{
                                val: <FormattedMessage id="Size" />
                              }}
                            />
                          </div>
                        </div>
                      ) : isMobile ? null : (
                        <div
                          className="form-group col-lg-6 pull-left"
                          style={{ height: '85px' }}
                        ></div>
                      )
                    ) : (
                      <div className="form-group col-lg-6 pull-left required">
                        <label
                          className="form-control-label rc-full-width"
                          htmlFor="breed"
                        >
                          <FormattedMessage id="breed" />
                        </label>
                        <span
                          className="rc-input rc-input--label rc-input--full-width"
                          input-setup="true"
                          style={{ marginBottom: '10px' }}
                        >
                          <input
                            type="text"
                            id="dog-breed"
                            placeholder={this.props.intl.messages.enterDogBreed}
                            className="form-control input-pet breed"
                            value={this.state.breed}
                            onChange={this.inputBreed}
                            style={{
                              display: this.state.isCat ? 'none' : null
                            }}
                            disabled={
                              this.state.isInputDisabled ? 'disabled' : null
                            }
                          />

                          <input
                            type="text"
                            id="cat-breed"
                            placeholder={this.props.intl.messages.enterCatBreed}
                            className="form-control input-pet breed"
                            value={this.state.breed}
                            onChange={this.inputBreed}
                            style={{
                              display: !this.state.isCat ? 'none' : null
                            }}
                            disabled={
                              this.state.isInputDisabled ? 'disabled' : null
                            }
                            onBlur={() => {
                              this.setState({ showBreedListNoneTip: false });
                            }}
                          />

                          <div
                            className={`select-breed ${
                              this.state.showBreedList ? '' : 'hidden'
                            }`}
                          >
                            {this.state.breedListLoading ? (
                              <div className="m-1">
                                <Skeleton
                                  color="#f5f5f5"
                                  width="95%"
                                  count={2}
                                />
                              </div>
                            ) : null}
                            {this.state.breedList.map((item, i) => (
                              <option
                                value={item.value}
                                key={item.id}
                                className={`pl-2 pr-1 ui-cursor-pointer ${
                                  i !== this.state.breedList.length - 1
                                    ? 'border-bottom'
                                    : ''
                                }`}
                                onClick={() => this.selectedBreed(item)}
                                style={{ whiteSpace: 'initial' }}
                              >
                                {item.name}
                              </option>
                            ))}
                          </div>
                          <label
                            className="rc-input__label"
                            htmlFor="breed"
                          ></label>
                        </span>
                        <div
                          className="invalid-feedback"
                          style={{ display: 'none' }}
                        >
                          <FormattedMessage
                            id="payment.errorInfo"
                            values={{
                              val: <FormattedMessage id="breed" />
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {/* <div className="form-group col-lg-6 pull-left"> */}
                    {/* <div className="rc-input rc-input--inline">
                      <input
                        className="rc-input__checkbox"
                        id="noSpecialNeeds"
                        value="in necesidades especiales"
                        type="checkbox"
                        name="noSpecialNeeds"
                        checked={this.state.specialNeedsDisable}
                        onClick={(e) =>
                          this.specialNeedsOptionsChange({
                            name: 'Sin necesidades especiales'
                          })
                        }
                      />
                      <label
                        className="rc-input__label--inline"
                        htmlFor="noSpecialNeeds"
                      >
                        <FormattedMessage id="noSpecialNeeds" />
                      </label>
                    </div> */}
                    {/* </div> */}
                    {/* <div className="form-group col-lg-6 pull-left">
                    <div className="rc-input rc-input--inline">
                      {this.state.isMix ? (
                        <input
                          className="rc-input__checkbox"
                          id="Mix breed"
                          value="Mix breed"
                          type="checkbox"
                          name="breed"
                          checked={this.state.isMix}
                          onClick={(e) => this.breedCheckboxChange(e)}
                        />
                      ) : (
                        <input
                          className="rc-input__checkbox"
                          id="Mix breed"
                          value="Mix breed"
                          type="checkbox"
                          name="breed"
                          onClick={(e) => this.breedCheckboxChange(e)}
                        />
                      )}
                      <label className="rc-input__label--inline" htmlFor="Mix breed">
                        Mix breed
                      </label>
                    </div>
                    <div className="rc-input rc-input--inline">
                      {this.state.isUnknown ? (
                        <input
                          className="rc-input__checkbox"
                          id="Don't know"
                          value="Don't know"
                          type="checkbox"
                          name="breed"
                          checked={this.state.isUnknown}
                          onClick={(e) => this.breedCheckboxChange(e)}
                        />
                      ) : (
                        <input
                          className="rc-input__checkbox"
                          id="Don't know"
                          value="Don't know"
                          type="checkbox"
                          name="breed"
                          onClick={(e) => this.breedCheckboxChange(e)}
                        />
                      )}
                      <label className="rc-input__label--inline" htmlFor="Don't know">
                        Don't know
                      </label>
                    </div>
                  </div> */}
                    {/* <div className="form-group col-lg-6 pull-left">
                    <div className="rc-input rc-input--inline">
                      <input
                        className="rc-input__checkbox"
                        id="noSpecialNeeds"
                        value="in necesidades especiales"
                        type="checkbox"
                        name="noSpecialNeeds"
                        checked={this.state.specialNeedsDisable}
                        onClick={(e) =>
                          this.specialNeedsOptionsChange({
                            name: 'Sin necesidades especiales'
                          })
                        }
                      />
                      <label
                        className="rc-input__label--inline"
                        htmlFor="noSpecialNeeds"
                      >
                        <FormattedMessage id="noSpecialNeeds" />
                      </label>
                    </Fdiv>
                  </div> */}
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        // htmlFor="sterilized"
                      >
                        <FormattedMessage id="sterilized" />
                      </label>
                      <div style={{ padding: '.5rem 0' }}>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="sterilized"
                            value="1"
                            checked={this.state.isSterilized}
                            type="radio"
                            name="sterilized"
                            onChange={(e) => this.setSterilized(true)}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="sterilized"
                          >
                            <FormattedMessage id="account.yes" />
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id="noSterilized"
                            value="0"
                            checked={!this.state.isSterilized}
                            type="radio"
                            name="sterilized"
                            onChange={(e) => this.setSterilized(false)}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor="noSterilized"
                          >
                            <FormattedMessage id="account.no" />
                          </label>
                        </div>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{ display: 'none' }}
                      >
                        <FormattedMessage
                          id="payment.errorInfo"
                          values={{
                            val: <FormattedMessage id="sterilized" />
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="form-group col-lg-6 pull-left placehoder"
                      style={{ height: '86px' }}
                    ></div>
                    <div className="form-group col-lg-12 pull-left required">
                      {isMobile ? (
                        <p style={{ textAlign: 'center' }}>
                          <button
                            className="rc-btn rc-btn--one"
                            onClick={() => this.savePet()}
                          >
                            <FormattedMessage id="saveChange" />
                          </button>
                          <br />
                          {this.props.match.params.id && (
                            <a
                              className="rc-styled-link"
                              href="#/"
                              onClick={(e) => {
                                e.preventDefault();
                                this.delPets(currentPet);
                              }}
                            >
                              <FormattedMessage id="pet.deletePet" />
                            </a>
                          )}
                        </p>
                      ) : (
                        <p style={{ textAlign: 'right' }}>
                          {this.props.match.params.id && (
                            <a
                              className="rc-styled-link"
                              href="#/"
                              onClick={(e) => {
                                e.preventDefault();
                                this.delPets(currentPet);
                              }}
                            >
                              <FormattedMessage id="pet.deletePet" />
                            </a>
                          )}
                          <button
                            className="rc-btn rc-btn--one"
                            style={{ marginLeft: '35px' }}
                            onClick={() => this.savePet()}
                          >
                            <FormattedMessage id="saveChange" />
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {this.state.recommendData.length && this.state.isChoosePetType ? (
                <Carousel
                  location={this.props.location}
                  history={this.props.history}
                  recommendData={
                    this.state.recommendData.length
                      ? this.state.recommendData
                      : []
                  }
                  customCls="ui-petform"
                />
              ) : null}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(PetForm);
