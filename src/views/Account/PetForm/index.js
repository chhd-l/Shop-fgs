import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Modal from '@/components/Modal';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { Link } from 'react-router-dom';
import './index.less';
import { Helmet } from 'react-helmet';
import { myAccountActionPushEvent } from '@/utils/GA';
import LinkedSubs from './components/LinkedSubs';
import LazyLoad from 'react-lazyload';

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
  setSeoConfig,
  getFormatDate,
  getZoneTime,
  getClubFlag
} from '@/utils/utils';
import { getCustomerInfo } from '@/api/user';
import { getDict } from '@/api/dict';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import Selection from '@/components/Selection';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import Banner_Cat from './images/banner_Cat.jpg';
import Banner_Dog from './images/banner_Dog.jpg';
import UploadImg from './components/ImgUpload';
import Carousel from './components/Carousel';
import {
  findPetProductForClub,
  changeSubscriptionDetailPets
} from '@/api/subscription';

const selectedPet = {
  border: '3px solid #ec001a'
};
const noSelect = {
  border: '3px solid #d7d7d7'
};

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

console.log(datePickerConfig, 'datePickerConfig');

@inject('loginStore')
@observer
class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subList: [],
      isEditAlert: false,
      loading: true,
      precent: 12.5,
      step: 1,
      currentStep: 'step1',
      showList: false,
      isDisabled: true,
      isInputDisabled: false,
      isUnknownDisabled: false,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
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
      recommendData: [],
      lifestyle: '',
      activity: '',
      weightObj: {
        measure: '',
        measureUnit: 'kg',
        type: 2
      },
      breedName: '',
      breedcode: ''
    };
    this.nextStep = this.nextStep.bind(this);
    this.selectPetType = this.selectPetType.bind(this);
    this.selectSex = this.selectSex.bind(this);
    this.selectWeight = this.selectWeight.bind(this);
    this.setSterilized = this.setSterilized.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.delPets = this.delPets.bind(this);
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    console.log(this.props, 'props');
    const lifestyleOptions = await getDictionary({ type: 'Lifestyle' });
    const activityOptions = await getDictionary({ type: 'Activity' });
    lifestyleOptions.map((el) => {
      el.value = el.valueEn;
    });
    activityOptions.map((el) => {
      el.value = el.valueEn;
    });
    this.setState({
      lifestyleOptions,
      activityOptions
    });
    let petsType = this.props.location.state?.petsType;
    if (petsType) {
      let isCat = petsType === 'Cat';
      this.petTypeChange(isCat);
    }

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
    this.getPetList();
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
  getPetList = async () => {
    if (!this.userInfo.customerAccount) {
      this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    await getPetList({
      customerId: this.userInfo.customerId,
      consumerAccount: this.userInfo.customerAccount
    })
      .then((res) => {
        let petList = res.context.context;
        if (petList.length > 0) {
          let currentPet = petList.filter(
            (el) => el.petsId === this.props.match.params.id
          )[0];
          this.setState({
            loading: false,
            showList: true,
            petList
          });
          if (currentPet) {
            this.edit(currentPet);
            this.getSpecialNeeds(currentPet.customerPetsPropRelations);
            this.setState(
              {
                currentPetId: currentPet.petsId,
                currentPet: currentPet,
                imgUrl:
                  currentPet.petsImg && currentPet.petsImg.includes('http')
                    ? currentPet.petsImg
                    : '',
                isCat: currentPet.petsType == 'cat' ? true : false
              },
              () => {
                this.getTypeDict();
              }
            );
          }
        } else {
          this.setState({
            loading: false,
            showList: false,
            petList
          });
          this.add();
        }
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
        this.showErrorMsg(
          err.message || this.props.intl.messages.getDataFailed
        );
      });
  };

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
    const { selectedSpecialNeeds, isPurebred, subList } = this.state;
    if (isPurebred) {
      this.setState({
        weight: ''
      });
    } else if (!isPurebred) {
      this.setState({
        breed: ''
      });
    }
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
    if (!this.state.sensitivity) {
      this.showErrorMsg(this.props.intl.messages.pleasecompleteTheRequiredItem);
      return;
    }
    if (process.env.REACT_APP_LANG !== 'en') {
      if (!this.state.activity || (!this.state.lifestyle && this.state.isCat)) {
        this.showErrorMsg(
          this.props.intl.messages.pleasecompleteTheRequiredItem
        );
        return;
      }
      for (let k in this.state.weightObj) {
        if (!this.state.weightObj[k]) {
          this.showErrorMsg(
            this.props.intl.messages.pleasecompleteTheRequiredItem
          );
          return;
        }
      }
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
        relationId: '',
        sort: 0,
        propType: 'needsName'
      };
      customerPetsPropRelations.push(prop);
      propId += 1;
    }
    let pets = {
      birthOfPets: this.state.birthdate,
      petsId: this.state.currentPetId,
      petsImg: this.state.imgUrl,
      petsBreed: this.state.isCat
        ? 'mixed_breed'
        : this.state.isPurebred
        ? this.state.breed
        : this.state.breedcode,
      petsName: this.state.nickname,
      petsSex: this.state.isMale ? '0' : '1',
      petsSizeValueId: '',
      petsSizeValueName: this.state.weight,
      petsType: this.state.isCat ? 'cat' : 'dog',
      sterilized: this.state.isSterilized ? '1' : '0',
      storeId: process.env.REACT_APP_STOREID,
      isPurebred: this.state.isPurebred ? '1' : '0',
      activity: this.state.activity,
      lifestyle: this.state.lifestyle,
      weight: JSON.stringify(this.state.weightObj),
      needs: this.state.sensitivity
    };
    let isEditAlert = false;
    let param = {
      customerPets: pets,
      // customerPetsPropRelations: customerPetsPropRelations,
      storeId: process.env.REACT_APP_STOREID,
      userId: consumerAccount
    };
    let action = addPet;
    if (pets.petsId) {
      action = editPets;
    }
    try {
      let res = await action(param);
      let subscribeId = this.props.location.state?.subscribeId;
      debugger;
      if (!pets.petsId) {
        myAccountActionPushEvent('Add pet');
        let petsType = this.props.location.state?.petsType;
        let petsId = res.context?.result;
        if (subscribeId) {
          if (petsType) {
            // 从subdetail过来新增宠物的需要单独linksub
            let params = {
              subscribeId,
              petsId
            };
            try {
              await changeSubscriptionDetailPets(params);
              // 有链接sub的，编辑宠物需要弹提示框
              let isLinkedSub = subList.find((el) => el.petsId)?.petsId;
              if (isLinkedSub) {
                isEditAlert = true;
                this.setState({ isEditAlert: true });
              }
            } catch (err) {
              this.showErrorMsg(err.message);
            }
          }
        }
      } else {
        // 有链接sub的，编辑宠物需要弹提示框
        let isLinkedSub = subList.find((el) => el.petsId)?.petsId;
        if (isLinkedSub) {
          isEditAlert = true;
          this.setState({ isEditAlert: true });
        }
      }
      this.setState({
        currentStep: 'success'
      });
      if (!isEditAlert) {
        this.gotoNext();
      }
    } catch (err) {
      this.showErrorMsg(err.message || this.props.intl.messages.saveFailed);
      this.setState({
        loading: false
      });
    }
  };

  gotoNext(stateText = 'isFromPets') {
    let isLinkedSub = this.state.subList.find((el) => el.petsId);
    let petsIdLinkedSub = isLinkedSub?.petsId;
    let subscribeId =
      this.props.location.state?.subscribeId || isLinkedSub?.subscribeId;
    if (subscribeId || petsIdLinkedSub) {
      this.props.history.push({
        pathname: `/account/subscription/order/detail/${subscribeId}`,
        state: { [stateText]: true }
      });
    } else {
      this.props.history.push('/account/pets/');
    }
  }

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
      breedName: e.target.value,
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
      breed: item.valueEn,
      showBreedList: false,
      breedName: item.name
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
      isInputDisabled: false,
      activity: '',
      lifestyle: '',
      weightObj: {
        measure: '',
        measureUnit: 'kg',
        type: 2
      }
    });
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
      let res = await getDict({
        type: currentPet.petsType === 'cat' ? 'catBreed' : 'dogBreed',
        delFlag: 0,
        storeId: process.env.REACT_APP_STOREID
      });
      breedList = res.context.sysDictionaryVOS;
    } catch (err) {
      this.showErrorMsg(
        err.message.toString() || this.props.intl.messages.getDataFailed
      );
      this.setState({ breedListLoading: false, showBreedListNoneTip: true });
    }
    let filteredBreed = breedList.filter(
      (el) => el.valueEn === currentPet.petsBreed
    )[0];
    console.log(filteredBreed, 'aaaa');
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
      weight: currentPet.petsType === 'dog' ? currentPet.petsSizeValueName : '',
      isSterilized: currentPet.sterilized === 1 ? true : false,
      birthdate: currentPet.birthOfPets,
      activity: currentPet.activity,
      lifestyle: currentPet.lifestyle,
      weightObj,
      sensitivity: currentPet.needs,
      isPurebred: currentPet.isPurebred
    };
    if (currentPet.isPurebred === 1) {
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
    if (currentPet.petsBreed === 'unknown Breed') {
      param.isMix = false;
      param.isUnknown = true;
      // param.isInputDisabled = true;
      param.breed = '';
    } else if (currentPet.petsBreed === 'Other Breed') {
      param.isMix = true;
      param.isUnknown = false;
      // param.isInputDisabled = true;
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
      value: currentPet.customerPetsPropRelations[0]?.propName
    };
    let params = {
      breedCode: param.isPurebred ? param.breed : 'Other Breed',
      birth: param.birthdate,
      petsType: param.isCat ? 'cat' : 'dog',
      // mainReason: selectedSpecialNeedsObj
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
          this.setState({
            recommendData: recommendData
          });
        }
      });
    }
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
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
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
    this.setState(
      {
        isChoosePetType: true,
        isCat: isCat,
        isDisabled: false
      },
      () => {
        this.getTypeDict();
      }
    );
  }
  async getTypeDict() {
    let sensitivityCat = [],
      sensitivityDog = [];
    if (this.state.isCat) {
      sensitivityCat = await getDictionary({ type: 'sensitivity_cat' });
      sensitivityCat.map((el) => {
        el.value = el.valueEn;
      });
      console.log(sensitivityCat, 'sensitivityCat');
    } else {
      sensitivityDog = await getDictionary({ type: 'sensitivity_dog' });
      sensitivityDog.map((el) => {
        el.value = el.valueEn;
      });
      console.log(sensitivityDog, 'sensitivityDog');
    }
    this.setState({
      sensitivityList: this.state.isCat ? sensitivityCat : sensitivityDog
    });
  }

  specialNeedsOptionsChange(data) {
    this.setState({ sensitivity: data.value });
    // console.log(data);
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
      selectedSizeObj: { value: data.value },
      breedcode: data.description
    });
  }
  lifestyleChange(data) {
    this.setState({
      lifestyle: data.value
    });
  }
  activityChange(data) {
    this.setState({
      activity: data.value
    });
  }
  handelImgChange(data) {
    console.log(data);
    this.setState({ imgUrl: data });
  }
  handleErrMessage = () => {};

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
    const {
      currentPet,
      selectedSpecialNeedsObj,
      selectedSizeObj,
      imgUrl,
      isMobile,
      isChoosePetType,
      isCat
    } = this.state;
    const RuTr =
      process.env.REACT_APP_LANG == 'ru' || process.env.REACT_APP_LANG == 'tr';
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
                      src={imgUrl || (isCat ? Cat : Dog)}
                      alt="photo box"
                    />
                    {/* </LazyLoad> */}
                    {/* <a className="rc-styled-link" href="#/" onClick={(e) => {
                        e.preventDefault()
                      }}>Change picture</a> */}
                    <UploadImg
                      tipVisible={false}
                      handleChange={(data) => this.handelImgChange(data)}
                      geterrMessage={this.showErrorMsg.bind(this)}
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
                              ? getZoneTime(this.state.birthdate)
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
                        <FormattedMessage
                          id={`${isCat ? 'isPurebredCat' : 'isPurebredDog'}`}
                        />
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
                                isPurebred: true
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
                                isPurebred: false
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
                      {RuTr ? (
                        <>
                          <label
                            className="form-control-label rc-full-width"
                            htmlFor="Sensitivity"
                          >
                            <FormattedMessage id="Sensitivity" />
                          </label>
                          <Selection
                            optionList={this.state.sensitivityList}
                            selectedItemChange={(el) =>
                              this.specialNeedsOptionsChange(el)
                            }
                            selectedItemData={{
                              value: this.state.sensitivity
                            }}
                            key={this.state.sensitivity}
                          />
                        </>
                      ) : (
                        <>
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
                              value: this.state.sensitivity
                            }}
                            key={this.state.sensitivity}
                          />
                        </>
                      )}
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
                          style={{ marginBottom: '.625rem' }}
                        >
                          <input
                            type="text"
                            id="dog-breed"
                            autocomplete="off"
                            placeholder={this.props.intl.messages.enterDogBreed}
                            className="form-control input-pet breed"
                            value={this.state.breedName}
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
                            autocomplete="off"
                            placeholder={this.props.intl.messages.enterCatBreed}
                            className="form-control input-pet breed"
                            value={this.state.breedName}
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
                    {process.env.REACT_APP_LANG !== 'en' ? (
                      <>
                        {RuTr && this.state.isCat ? (
                          <div className="form-group col-lg-6 pull-left required">
                            <label
                              className="form-control-label rc-full-width"
                              htmlFor="Lifestyle"
                            >
                              <FormattedMessage id="Lifestyle" />
                            </label>
                            <Selection
                              optionList={this.state.lifestyleOptions}
                              selectedItemChange={(el) =>
                                this.lifestyleChange(el)
                              }
                              selectedItemData={{
                                value: this.state.lifestyle
                              }}
                              key={this.state.lifestyle}
                            />
                          </div>
                        ) : null}
                        <div className="form-group col-lg-6 pull-left required">
                          <label
                            className="form-control-label rc-full-width"
                            htmlFor="Activity"
                          >
                            <FormattedMessage id="Activity" />
                          </label>
                          <Selection
                            optionList={this.state.activityOptions}
                            selectedItemChange={(el) => this.activityChange(el)}
                            selectedItemData={{
                              value: this.state.activity
                            }}
                            key={this.state.activity}
                          />
                        </div>
                        <div className="form-group col-lg-6 pull-left required">
                          <label
                            className="form-control-label rc-full-width"
                            htmlFor="Weight"
                          >
                            <FormattedMessage id="Weight" />
                          </label>
                          <span
                            className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                            input-setup="true"
                            style={{ display: 'inline-block' }}
                          >
                            <input
                              type="number"
                              className="rc-input__control"
                              name="weight"
                              required=""
                              aria-required="true"
                              style={{ padding: '.5rem 0' }}
                              value={this.state.weightObj.measure}
                              onChange={(e) => {
                                let { weightObj } = this.state;
                                let valueArr = e.target.value.split('.');
                                if (valueArr.length > 1) {
                                  console.log(valueArr);
                                  valueArr[1] = valueArr[1].slice(0, 2);
                                }
                                weightObj.measure = valueArr.join('.');
                                this.setState({
                                  weightObj
                                });
                              }}
                              maxLength="50"
                              autoComplete="address-line"
                            />
                            <label
                              className="rc-input__label"
                              htmlFor="weight"
                            ></label>
                          </span>
                          <Selection
                            customContainerStyle={{
                              display: 'inline-block',
                              height: '40px',
                              marginLeft: '4px'
                            }}
                            optionList={[
                              { value: 'kg', name: 'kg' }
                              // { value: 'g', name: 'g' }
                            ]}
                            selectedItemChange={(el) => {
                              let { weightObj } = this.state;
                              weightObj.measureUnit = el.value;
                              this.setState({
                                weightObj
                              });
                            }}
                            selectedItemData={{
                              value: this.state.weightObj.measureUnit
                            }}
                            key={this.state.activity}
                          />
                        </div>
                      </>
                    ) : null}

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
                            <span
                              className="rc-styled-link"
                              onClick={this.delPets.bind(this, currentPet)}
                            >
                              <FormattedMessage id="pet.deletePet" />
                            </span>
                          )}
                        </p>
                      ) : (
                        <p style={{ textAlign: 'right' }}>
                          {this.props.match.params.id && (
                            <span
                              className="rc-styled-link"
                              onClick={this.delPets.bind(this, currentPet)}
                            >
                              <FormattedMessage id="pet.deletePet" />
                            </span>
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

            {/* {
            ['tr', 'ru'].indexOf(process.env.REACT_APP_LANG) > -1?
            <LinkedSubs
              petsId={this.props.match.params.id}
              loading={this.state.loading}
              setState={this.setState.bind(this)}
              errorMsg={this.state.errorMsg}
            />: null
            } */}
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
          <Modal
            headerVisible={true}
            footerVisible={false}
            visible={this.state.isEditAlert}
            modalTitle={''}
            close={() => {
              this.setState({ isEditAlert: false });
            }}
          >
            <div className="text-center">
              <p>
                <div>
                  <FormattedMessage id="petSaveTips1" />
                </div>
                <FormattedMessage id="petSaveTips2" />
              </p>
              <p>
                <button
                  onClick={() => this.gotoNext('clubPetsLifeStageFlag')}
                  className="rc-btn rc-btn--one rc-btn--sm"
                >
                  <FormattedMessage id="See recommendation" />
                </button>
              </p>
            </div>
          </Modal>
          <Footer />
        </main>
      </div>
    );
  }
}

export default injectIntl(PetForm);
