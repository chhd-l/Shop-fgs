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
  getZoneTime,
  getClubFlag
} from '@/utils/utils';
import { getDict } from '@/api/dict';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns-tz';
import Selection from '@/components/Selection';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import Banner_Cat from './images/banner_Cat.jpg';
import Banner_Dog from './images/banner_Dog.jpg';
import UploadImg from './components/ImgUpload';
import RelateProductCarousel from '@/components/RelateProductCarousel';
import {
  findPetProductForClub,
  changeSubscriptionDetailPets
} from '@/api/subscription';

import InputBox from './components/FormItem/InputBox';
import RadioBox from './components/FormItem/RadioBox';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
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
      sterilized: '0',
      step: 1,
      currentStep: 'step1',
      showList: false,
      petsSex: '1',
      isPurebred: '1',
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
      nickname: '',
      isUnknown: false,
      breed: '',
      weight: '',
      birthdate: '',
      sizeArr: [],
      specialNeeds: [],
      selectedSpecialNeeds: [],
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
      sensitivityList: [],
      isChoosePetType: this.props.match.params.id ? true : false,
      recommendData: [],
      lifestyle: '',
      activity: '',
      weightObj: {
        measure: '',
        measureUnit: 'kg',
        type: 2
      },
      breedName: '',
      breedcode: '',
      isDeleteModalShow: false,
      deleteWarningMessage: '',
      sterilizedGroup: [
        {
          value: '1',
          name: 'sterilized',
          id: 'sterilized',
          label: 'account.yes',
          checked: true
        },
        {
          value: '0',
          name: 'sterilized',
          label: 'account.no',
          id: 'noSterilized',
          checked: false
        }
      ],
      purebredGroup: [
        {
          value: '1',
          name: 'Is Purebred',
          label: 'account.yes',
          id: 'purebred',
          checked: true
        },
        {
          value: '0',
          name: 'Is Purebred',
          id: 'noPurebred',
          label: 'account.no',
          checked: false
        }
      ],
      genderGroup: [
        {
          value: '1',
          name: 'gender',
          label: 'petFemale',
          id: 'female',
          checked: true
        },
        {
          value: '0',
          name: 'gender',
          id: 'male',
          label: 'petMale',
          checked: false
        }
      ]
    };

    this.delPets = this.delPets.bind(this);
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
    const lifestyleOptions = await getDictionary({ type: 'Lifestyle' });
    const activityOptions = await getDictionary({ type: 'Activity' });
    const specialNeedsOptions = await getDictionary({ type: 'specialNeeds' }); //为了暂时解决fr的字典问题，后期字典应该还会调整，每个国家这里的字典都有区别
    lifestyleOptions.map((el) => {
      el.value = el.valueEn;
    });
    activityOptions.map((el) => {
      el.value = el.valueEn;
    });
    specialNeedsOptions.map((el) => {
      el.value = el.valueEn;
    });
    this.setState({
      lifestyleOptions,
      activityOptions,
      specialNeedsOptions
    });
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
  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  petsById = async () => {
    let id = this.props.match.params?.id;
    let params = {
      petsId: id
    };
    this.setState({
      loading: true
    });
    try {
      const res = await petsById(params);
      let currentPet = res.context.context;
      const {
        customerPetsPropRelations = [],
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
      this.getSpecialNeeds(customerPetsPropRelations);
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
        storeId: process.env.REACT_APP_STOREID,
        petsSizeValueName,
        petsType,
        sterilized,
        weight
      };
      this.setState(
        {
          currentPet: currentPet,
          showList: true,
          oldCurrentPet,
          isCat: currentPet.petsType == 'cat' ? true : false,
          loading: false,
          currentPetId: currentPet.petsId
        },
        () => {
          this.getTypeDict();
        }
      );
      this.edit(currentPet);

      this.getSpecialNeeds(currentPet.customerPetsPropRelations);
    } catch (err) {
      this.setState({
        loading: false
      });
      this.showErrorMsg(err.message || this.props.intl.messages.getDataFailed);
    }
  };
  delPets = async (currentPet, deleteFlag) => {
    let params = {
      petsIds: [this.props.match.params.id],
      deleteFlag: deleteFlag
    };
    currentPet.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      currentPet: currentPet
    });
    try {
      await delPets(params);
      myAccountActionPushEvent('Remove pet');
      this.props.history.push('/account/pets/');
    } catch (err) {
      if (err.code === 'P-010003') {
        this.setState({
          isDeleteModalShow: true,
          deleteWarningMessage: err.message
        });
      } else {
        this.showErrorMsg(err.message);
      }
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  equalProps = (a, b) => {
    var newObj = {};
    for (var key in a) {
      if (Array.isArray(a[key])) {
        a[key]?.map((el, i) => {
          this.equalProps(el, b[key] && b[key][i]);
        });
      } else if (typeof a[key] === 'object' && a[key] !== null) {
        var obj = this.equalProps(a[key], b[key]);
        newObj[key] = obj;
      } else if (a[key] != b[key]) {
        newObj[key] = a[key];
      }
    }
    return newObj;
  };
  savePet = async () => {
    const {
      selectedSpecialNeeds,
      isPurebred,
      oldCurrentPet,
      isCat,
      sensitivity,
      activity,
      lifestyle,
      birthdate,
      currentPetId,
      imgUrl,
      breed,
      breedcode,
      nickname,
      petsSex,
      weight,
      sterilized
    } = this.state;
    if (isPurebred == 1) {
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
    if (isPurebred == 1) {
      validFiled.push('breed');
    } else if (!isCat) {
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

    if (!sensitivity || (isPurebred == 1 && !this.state.breedName)) {
      this.showErrorMsg(this.props.intl.messages.pleasecompleteTheRequiredItem);
      return;
    }
    if (
      process.env.REACT_APP_COUNTRY !== 'US' &&
      process.env.REACT_APP_COUNTRY !== 'DE' &&
      process.env.REACT_APP_COUNTRY !== 'FR'
    ) {
      const RuTr =
        process.env.REACT_APP_COUNTRY == 'RU' ||
        process.env.REACT_APP_COUNTRY == 'TR';
      if (!activity || (!lifestyle && isCat && RuTr)) {
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
      if (this.state.weightObj && Number(this.state.weightObj.measure) <= 0) {
        this.showErrorMsg(this.props.intl.messages.petWeightVerify);
        return;
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
    const petsBreed =
      isPurebred == 1 ? breed : isCat ? 'mixed_breed' : breedcode;
    let pets = {
      birthOfPets: birthdate,
      petsId: currentPetId,
      petsImg: imgUrl,
      petsBreed,
      petsName: nickname,
      petsSex,
      petsSizeValueId: '',
      petsSizeValueName: weight,
      petsType: isCat ? 'cat' : 'dog',
      sterilized,
      storeId: process.env.REACT_APP_STOREID,
      isPurebred: isPurebred,
      activity,
      lifestyle,
      weight: JSON.stringify(this.state.weightObj),
      needs: sensitivity
    };
    let isEditAlert = false;
    let param = {
      customerPets: pets,
      // customerPetsPropRelations: customerPetsPropRelations,
      storeId: process.env.REACT_APP_STOREID,
      userId: consumerAccount
    };
    let action = addPet;
    let diffIndex = 0;
    if (pets.petsId) {
      action = editPets;
      console.info(pets, oldCurrentPet);
      if (!oldCurrentPet.petsSizeValueName) {
        oldCurrentPet.petsSizeValueName = '';
      }
      if (!oldCurrentPet.petsImg) {
        oldCurrentPet.petsImg = '';
      }

      // 如果编辑的，需判断是否只有name更变了
      let hasChangedProps = this.equalProps(pets, oldCurrentPet);
      // console.log(hasChangedProps, 'hasChangedProps');
      // return

      for (let key in hasChangedProps) {
        if (key !== 'petsName') {
          ++diffIndex;
        }
      }
    } else {
      // 新增的情况下都会改变
      diffIndex = 1;
    }
    try {
      let res = await action(param);
      let isLinkedSub = this.state.subList.find((el) => el.petsId);
      let isLinkedSubLength = this.state.subList.filter((el) => el.petsId)
        ?.length;
      let petsIdLinkedSub = isLinkedSub?.petsId;
      let subscribeId =
        this.props.location.state?.subscribeId || isLinkedSub?.subscribeId;
      if (!pets.petsId) {
        myAccountActionPushEvent('Add pet');
        let petsType = this.props.location.state?.petsType;
        let isFromSubscriptionDetail = this.props.location.state
          ?.isFromSubscriptionDetail; //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
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
              if (isFromSubscriptionDetail) {
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
        if (petsIdLinkedSub && diffIndex > 0 && isLinkedSubLength == 1) {
          isEditAlert = true;
          this.setState({ isEditAlert: true });
        }
      }
      this.setState({
        currentStep: 'success'
      });
      if (!isEditAlert) {
        this.gotoNext(null, diffIndex);
      }
    } catch (err) {
      this.showErrorMsg(err.message || this.props.intl.messages.saveFailed);
      this.setState({
        loading: false
      });
    }
  };

  gotoNext(stateText = 'isFromPets', diffIndex) {
    let isLinkedSub = this.state.subList.find((el) => el.petsId);
    let petsIdLinkedSub = isLinkedSub?.petsId;
    let subscribeId =
      this.props.location.state?.subscribeId || isLinkedSub?.subscribeId;
    let url = '/account/pets/';

    if (subscribeId || petsIdLinkedSub) {
      if (diffIndex) {
        url = {
          pathname: `/account/subscription/order/detail/${subscribeId}`,
          state: { [stateText]: true }
        };
      }
    }
    this.props.history.push(url);
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
      isDisabled
    });
  };

  inputBreed = async (e) => {
    let isDisabled = true;
    let isUnknownDisabled = false;
    let showBreedList = false;
    if (e.target.value !== '') {
      isDisabled = false;
      isUnknownDisabled = true;
      showBreedList = true;
    }
    this.setState({
      breedName: e.target.value,
      isDisabled,
      isUnknownDisabled,
      showBreedList,
      breedListLoading: true,
      breedList: []
    });
    try {
      let breedList = await getDictionary({
        type: this.state.isCat === 'cat' ? 'catBreed' : 'dogBreed',
        name: e.target.value
      });
      this.setState({
        breedList,
        breedListLoading: false,
        showBreedListNoneTip: !breedList.length
      });
    } catch (err) {
      this.showErrorMsg(
        err.message.toString() || this.props.intl.messages.getDataFailed
      );
      this.setState({ breedListLoading: false, showBreedListNoneTip: true });
    }
  };

  weightChange = (e) => {
    let { weightObj } = this.state;
    let valueArr = e.target.value.split('.');
    if (Number(e.target.value) < 0) weightObj.measure = '';
    if (valueArr.length > 1) {
      valueArr[1] = valueArr[1].slice(0, 2);
    }
    weightObj.measure = valueArr.join('.');
    this.setState({
      weightObj
    });
  };

  selectedBreed = (item) => {
    this.setState({
      breed: item.valueEn,
      showBreedList: false,
      breedName: item.name
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
      breedList = await getDictionary({
        type: currentPet.petsType === 'cat' ? 'catBreed' : 'dogBreed'
      });
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
      petsSex: currentPet.petsSex,
      nickname: currentPet.petsName,
      isUnknown: currentPet.petsBreed === 'unknown Breed' ? true : false,
      isInputDisabled: currentPet.petsBreed === 'unknown Breed' ? true : false,
      isUnknownDisabled:
        currentPet.petsBreed === 'unknown Breed' ? false : true,
      weight: currentPet.petsType === 'dog' ? currentPet.petsSizeValueName : '',
      sterilized: currentPet.sterilized,
      birthdate: currentPet.birthOfPets,
      activity: currentPet.activity,
      lifestyle: currentPet.lifestyle,
      weightObj,
      sensitivity: currentPet.needs,
      isPurebred: currentPet.isPurebred
    };
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

    param.selectedSpecialNeedsObj = {
      value: currentPet.customerPetsPropRelations[0]?.propName
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

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.rc-layout-container');
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
  onDateChange(date) {
    this.setState({
      birthdate: date ? format(date, 'yyyy-MM-dd') : '',
      isDisabled: false
    });
  }
  pruebredChange = (isPurebred) => {
    this.setState({ isPurebred }, () => {
      console.info('this.state.isPurebred', this.state.isPurebred);
    });
  };
  genderChange = (petsSex) => {
    this.setState({ petsSex });
  };
  sterilizedChange = (sterilized) => {
    this.setState({ sterilized });
  };
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
    let specialNeeds = [],
      sensitivityList = [];
    let type = this.state.isCat ? 'cat' : 'dog';
    sensitivityList = await getDictionary({ type: `sensitivity_${type}` });
    sensitivityList.map((el) => {
      el.value = el.valueEn;
    });
    specialNeeds = await getDictionary({ type: `specialneeds_${type}` });
    specialNeeds.map((el) => {
      el.value = el.valueEn;
    });
    this.setState({
      sensitivityList,
      specialNeeds
    });
  }

  specialNeedsOptionsChange(data) {
    this.setState({ sensitivity: data.value });
    console.log(data);
    let selectedSpecialNeeds = data.value === 'none' ? ['none'] : [data.value];
    this.setState({
      selectedSpecialNeeds
    });
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
      selectedSizeObj,
      imgUrl,
      isMobile,
      isChoosePetType,
      isCat
    } = this.state;
    const RuTr =
      process.env.REACT_APP_COUNTRY == 'RU' ||
      process.env.REACT_APP_COUNTRY == 'TR';
    const Us = process.env.REACT_APP_COUNTRY == 'US';
    let sensitivityList = this.state.specialNeedsOptions;
    let sensitivityLable = 'Special Need';
    if (RuTr) {
      sensitivityList = this.state.sensitivityList;
      sensitivityLable = 'Sensitivity';
    }
    if (Us) {
      sensitivityList = this.state.specialNeeds;
    }
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
                  <div className="formBox row">
                    <div className="form-group col-lg-6 pull-left required">
                      <InputBox
                        htmlFor="name"
                        FormattedMsg="petName"
                        name="firstName"
                        value={this.state.nickname}
                        handleChange={this.inputNickname}
                      />
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <RadioBox
                        htmlFor="gender"
                        setState={this.setState.bind(this)}
                        FormattedMsg="gender"
                        radioGroup={this.state.genderGroup}
                        radioChange={this.genderChange}
                      />
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
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <RadioBox
                        htmlFor="Is Purebred"
                        setState={this.setState.bind(this)}
                        FormattedMsg={`${
                          isCat ? 'isPurebredCat' : 'isPurebredDog'
                        }`}
                        radioGroup={this.state.purebredGroup}
                        radioChange={this.pruebredChange}
                      />
                    </div>
                    <div className="form-group col-lg-6 pull-left required">
                      <label
                        className="form-control-label rc-full-width"
                        htmlFor={sensitivityLable}
                      >
                        <FormattedMessage id={sensitivityLable} />
                      </label>
                      <Selection
                        optionList={sensitivityList}
                        selectedItemChange={(el) =>
                          this.specialNeedsOptionsChange(el)
                        }
                        selectedItemData={{
                          value: this.state.sensitivity
                        }}
                        key={this.state.sensitivity}
                      />
                    </div>
                    {!(this.state.isPurebred == 1) ? (
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
                              display: this.state.isCat ? 'none' : null,
                              height: '48px'
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
                              display: !this.state.isCat ? 'none' : null,
                              height: '48px'
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
                      </div>
                    )}
                    {process.env.REACT_APP_COUNTRY !== 'US' &&
                    process.env.REACT_APP_COUNTRY !== 'DE' &&
                    process.env.REACT_APP_COUNTRY !== 'FR' ? (
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
                              style={{ padding: '.5rem 0', height: '44px' }}
                              value={this.state.weightObj.measure}
                              onChange={this.weightChange}
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
                              height: '48px',
                              marginLeft: '4px'
                            }}
                            optionList={[
                              {
                                value: 'kg',
                                name: this.props.intl.messages['kg']
                              }
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
                            customCls="weight-unit-select"
                          />
                        </div>
                      </>
                    ) : null}

                    <div className="form-group col-lg-6 pull-left required">
                      <RadioBox
                        htmlFor="sterilized"
                        setState={this.setState.bind(this)}
                        FormattedMsg="sterilized"
                        radioGroup={this.state.sterilizedGroup}
                        radioChange={this.sterilizedChange}
                      />
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
                              onClick={this.delPets.bind(
                                this,
                                currentPet,
                                false
                              )}
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
                              onClick={this.delPets.bind(
                                this,
                                currentPet,
                                false
                              )}
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
            {currentPet.petsId &&
            getClubFlag() &&
            process.env.REACT_APP_COUNTRY !== 'RU' ? (
              <LinkedSubs
                petsId={this.props.match.params.id}
                loading={this.state.loading}
                setState={this.setState.bind(this)}
                errorMsg={this.state.errorMsg}
                petsType={currentPet.petsType}
              />
            ) : null}
            <div>
              {this.state.recommendData.length && this.state.isChoosePetType ? (
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
          <Modal
            headerVisible={true}
            footerVisible={false}
            visible={this.state.isDeleteModalShow}
            modalTitle={''}
            close={() => {
              this.setState({ isDeleteModalShow: false });
            }}
          >
            <div className="text-center">
              <p>
                <div>
                  {this.state.deleteWarningMessage}
                  {/* <FormattedMessage id="petSaveTips1" /> */}
                </div>
                {/* <FormattedMessage id="petSaveTips2" /> */}
              </p>
              <p>
                <button
                  onClick={this.delPets.bind(this, currentPet, true)}
                  className={`rc-btn rc-btn--one rc-btn--sm text-plain ${
                    this.state.loading ? 'ui-btn-loading' : ''
                  }`}
                >
                  <FormattedMessage id="pet.deletePet" />
                </button>
              </p>
            </div>
          </Modal>
          <Modal
            headerVisible={true}
            footerVisible={false}
            visible={this.state.isEditAlert}
            modalTitle={''}
            close={() => {
              this.props.history.push('/account/pets/');
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
                  onClick={() => this.gotoNext('updateLifeStage', true)}
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
