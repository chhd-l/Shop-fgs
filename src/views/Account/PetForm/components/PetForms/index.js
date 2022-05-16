import React, { useEffect, useState } from 'react';
import { inject, observer, useLocalStore } from 'mobx-react';
import {
  myAccountActionPushEvent,
  GAForChangePetinfoBtn,
  GAForSeeRecommendationBtn
} from '@/utils/GA';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import SelectMultiple from '@/components/SelectMultiple';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import DatePicker from 'react-datepicker';
import InputBox from '../FormItem/InputBox';
import RadioBox from '../FormItem/RadioBox';
import UploadImg from '../ImgUpload';
import Modal from '@/components/Modal';
import { getDict } from '@/api/dict';
import { changeSubscriptionDetailPets } from '@/api/subscription';
import { addPet, delPets, editPets } from '@/api/pet';
import {
  getZoneTime,
  datePickerConfig,
  getDeviceType,
  getDictionary,
  handleDateForIos
} from '@/utils/utils';
import { format } from 'date-fns';
import { ErrorMessage } from '@/components/Message';

const purebredOpitons = [
  {
    value: 1,
    name: 'Is Purebred',
    label: 'account.yes',
    id: 'purebred',
    checked: true
  },
  {
    value: 0,
    name: 'Is Purebred',
    id: 'noPurebred',
    label: 'account.no',
    checked: false
  }
];
const genderOptions = [
  {
    value: 1,
    name: 'gender',
    label: 'petFemale',
    id: 'female',
    checked: true
  },
  {
    value: 0,
    name: 'gender',
    id: 'male',
    label: 'petMale',
    checked: false
  }
];
const sterilizedOptions = [
  {
    value: 1,
    name: 'sterilized',
    id: 'sterilized',
    label: 'account.yes',
    checked: true
  },
  {
    value: 0,
    name: 'sterilized',
    label: 'account.no',
    id: 'noSterilized',
    checked: false
  }
];
const localItemRoyal = window.__.localItemRoyal;

const PetForms = ({
  petList,
  subList,
  oldCurrentPet,
  currentPetParam,
  selectedSizeObj,
  paramsId,
  sizeOptions,
  isCat,
  selectedSpecialNeeds,
  loading,
  history,
  errorMsg,
  setState,
  intl,
  location,
  showErrorMsg,
  loginStore
}) => {
  console.log('history', history);
  console.log('loginStore', loginStore);
  const Us = window.__.env.REACT_APP_COUNTRY == 'us';
  const RuTrFrDe =
    ['ru', 'tr', 'fr', 'de', 'se'].indexOf(window.__.env.REACT_APP_COUNTRY) >
    -1;
  const notUsUk =
    window.__.env.REACT_APP_COUNTRY !== 'us' &&
    window.__.env.REACT_APP_COUNTRY !== 'uk';
  const isMobile = getDeviceType() !== 'PC';
  const { enterCatBreed, enterDogBreed } = intl.messages;
  const isInputDisabled =
    currentPetParam?.petsBreed === 'unknown Breed' ? true : false;
  // const { loginStore } = useLocalStore(() => stores);
  const { userInfo } = loginStore;
  const [genderGroup, setGenderGroup] = useState(genderOptions);
  const [purebredGroup, setPurebredGroup] = useState(purebredOpitons);
  const [sterilizedGroup, setSterilizedGroup] = useState(sterilizedOptions);

  const [deleteWarningMessage, setDeleteWarningMessage] = useState('');
  const [showBreedList, setShowBreedList] = useState(false);
  const [breedListLoading, setBreedListLoading] = useState(false);
  const [petForm, setPetForm] = useState({
    nickname: '',
    petsSex: 1,
    birthdate: '',
    isPurebred: 1,
    breedName: '',
    sensitivity: '',
    weight: '',
    weightObj: {
      measure: '',
      measureUnit: 'kg',
      type: 2
    },
    activity: '',
    lifestyle: '',
    sterilized: 0,
    breed: '',
    imgUrl: '',
    breedcode: ''
  });
  const [isEditAlert, setIsEditAlert] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState([]);
  const [sensitivityList, setSensitivityList] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [lifestyleOptions, setLifestyleOptions] = useState([]);
  const [activityOptions, setActivityOptions] = useState([]);
  const [specialNeedsOptions, setSpecialNeedsOptions] = useState([]);
  useEffect(() => {
    (async () => {
      let lifestyleOptions = await getDictionary({ type: 'Lifestyle' });
      let activityOptions = await getDictionary({ type: 'Activity' });
      let specialNeedsOptions = await getDictionary({ type: 'specialNeeds' }); //为了暂时解决fr的字典问题，后期字典应该还会调整，每个国家这里的字典都有区别
      lifestyleOptions.map((el) => {
        el.value = el.valueEn;
      });
      activityOptions.map((el) => {
        el.value = el.valueEn.toLowerCase();
      });
      specialNeedsOptions.map((el) => {
        el.value = el.valueEn;
      });
      setLifestyleOptions(lifestyleOptions);
      setActivityOptions(activityOptions);
      setSpecialNeedsOptions(specialNeedsOptions);
    })();
  }, []);

  useEffect(() => {
    // 编辑的时候需要重置所有值
    console.log(currentPetParam, currentPetParam.petsImg, 'currentPetParam');
    currentPetParam.imgUrl = currentPetParam.petsImg;
    let petFormData = Object.assign(petForm, currentPetParam);

    setPetForm(petFormData);
    purebredOpitons.forEach((item) => {
      let checked = item.value == currentPetParam.isPurebred;
      item.checked = checked;
    });
    setPurebredGroup(purebredOpitons);
    genderOptions.forEach((item) => {
      let checked = item.value == currentPetParam.petsSex;
      item.checked = checked;
    });
    setGenderGroup(genderOptions);
    sterilizedOptions.forEach((item) => {
      let checked = item.value == currentPetParam.sterilized;
      item.checked = checked;
    });
    setSterilizedGroup(sterilizedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPetParam.petsId]);
  useEffect(() => {
    getTypeDict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCat]);
  const getTypeDict = async () => {
    let specialNeeds = [],
      sensitivityList = [];
    let type = isCat ? 'cat' : 'dog';
    sensitivityList = await getDictionary({ type: `sensitivity_${type}` });
    sensitivityList.map((el) => {
      el.value = el.valueEn;
    });
    specialNeeds = await getDictionary({ type: `specialneeds_${type}` });
    specialNeeds.map((el) => {
      el.value = el.valueEn;
    });
    setSpecialNeeds(specialNeeds);
    setSensitivityList(sensitivityList);
  };
  const handelImgChange = (imgUrl) => {
    setNewPetForm('imgUrl', imgUrl);
  };
  const inputBreed = async (e) => {
    let showBreedList = false;
    setNewPetForm('breedName', e.target.value);
    if (e.target.value !== '') {
      showBreedList = true;
    } else {
      return;
    }
    setShowBreedList(showBreedList);
    setBreedListLoading(true);
    setBreedList([]);
    getDict({
      type: isCat ? 'catBreed' : 'dogBreed',
      keywords: e.target.value,
      delFlag: 0,
      storeId: window.__.env.REACT_APP_STOREID
    })
      .then((res) => {
        setBreedListLoading(false);
        setBreedList(res.context.sysDictionaryVOS);
      })
      .catch((err) => {
        showErrorMsg(err.message.toString() || intl.messages.getDataFailed);
        setBreedListLoading(false);
      });
  };
  const gotoNext = (stateText = 'isFromPets', diffIndex) => {
    let isLinkedSub = subList.find((el) => el.petsId);
    let petsIdLinkedSub = isLinkedSub?.petsId;
    let subscribeId = location.state?.subscribeId || isLinkedSub?.subscribeId;
    let url = '/account/pets/';

    if (subscribeId || petsIdLinkedSub) {
      if (diffIndex) {
        url = {
          pathname: `/account/subscription/order/detail/${subscribeId}`,
          state: { [stateText]: true }
        };
      }
    }
    // 如果是日本，并且是从/prescription-gate 这个路由过来的 okta-redirectUrl才会是/account/pets/petForm
    // 因此添加宠物完成后就跳转回首页
    if (
      window.__.env.REACT_APP_STOREID === 123457919 &&
      localItemRoyal.get('okta-redirectUrl') === '/account/pets/petForm'
    ) {
      // 跳转之前先重置okta-redirectUrl
      localItemRoyal.set('okta-redirectUrl', '/home');
      history.push('/home');
    } else {
      history.push(url);
    }
  };
  const setNewPetForm = (keyname, value) => {
    let newpetForm = Object.assign({}, petForm, {
      [keyname]: value
    });
    setPetForm(newpetForm);
  };
  const inputNickname = (e) => {
    setNewPetForm('nickname', e.target.value);
  };
  const weightChange = (e) => {
    let measure = '';
    let valueArr = e.target.value.split('.');
    if (valueArr.length > 1) {
      valueArr[1] = valueArr[1].slice(0, 2);
    }
    measure = valueArr.join('.');
    let newWeightObj = Object.assign({}, petForm.weightObj, {
      measure
    });
    let newPetForm = Object.assign({}, petForm, {
      weightObj: newWeightObj
    });
    setPetForm(newPetForm);
  };
  const pruebredChange = (isPurebred) => {
    setNewPetForm('isPurebred', isPurebred);
  };
  const genderChange = (petsSex) => {
    setNewPetForm('petsSex', petsSex);
  };
  const sterilizedChange = (sterilized) => {
    setNewPetForm('sterilized', sterilized);
  };
  const onDateChange = (date) => {
    setNewPetForm(
      'birthdate',
      date ? format(new Date(handleDateForIos(date)), 'yyyy-MM-dd') : ''
    );
  };
  const selectedBreed = (item) => {
    let newPetFrom = Object.assign({}, petForm, {
      breedName: item.name,
      breed: item.valueEn
    });
    setPetForm(newPetFrom);
    setShowBreedList(false);
  };
  const specialNeedsOptionsChange = (data) => {
    setNewPetForm('sensitivity', data.value);
    let selectedSpecialNeeds = data.value === 'none' ? ['none'] : [data.value];
    setState({
      selectedSpecialNeeds
    });
  };
  const multipleSelSpecialNeedsOptionsChange = (data, selectedItem) => {
    // 选择No Special Needs的时候仅可单选，反之多选。
    if (selectedItem?.value == 'No Special Needs') {
      setNewPetForm('sensitivity', 'No Special Needs');
    } else {
      let selArr = data?.filter((item) => item?.value !== 'No Special Needs');
      let selValues = selArr?.map((item) => item.value)?.toString();
      setNewPetForm('sensitivity', selValues);
    }
  };
  const sizeOptionsChange = (data) => {
    let newpetForm = Object.assign({}, petForm, {
      weight: data.value,
      breedcode: data.description
    });
    setPetForm(newpetForm);
    setState({
      selectedSizeObj: { value: data.value }
    });
  };
  const lifestyleChange = (data) => {
    setNewPetForm('lifestyle', data.value);
  };
  const activityChange = (data) => {
    setNewPetForm('activity', data.value);
  };
  const handleDelPets = async (deleteFlag) => {
    let params = {
      petsIds: [paramsId],
      deleteFlag: deleteFlag
    };
    setState({
      loading: true
    });
    try {
      await delPets(params);
      myAccountActionPushEvent('Remove pet');
      history.push('/account/pets/');
    } catch (err) {
      if (err.code === 'P-010003') {
        setIsDeleteModalShow(true);
        setDeleteWarningMessage(err.message);
      } else {
        showErrorMsg(err.message);
      }
    } finally {
      setState({
        loading: false
      });
    }
  };

  const equalProps = (a, b) => {
    var newObj = {};
    for (var key in a) {
      if (Array.isArray(a[key])) {
        a[key]?.map((el, i) => {
          equalProps(el, b[key] && b[key][i]);
        });
      } else if (typeof a[key] === 'object' && a[key] !== null) {
        var obj = equalProps(a[key], b[key]);
        newObj[key] = obj;
      } else if (a[key] != b[key]) {
        newObj[key] = a[key];
      }
    }
    return newObj;
  };
  const savePet = async () => {
    GAForChangePetinfoBtn();
    // 这里的'weight'是size字段
    if (petForm.isPurebred == 1) {
      setNewPetForm('weight', '');
      setState({
        selectedSizeObj: { value: '' }
      });
    } else if (petForm.isPurebred == 0) {
      setNewPetForm('breed', '');
    }
    let consumerAccount = userInfo?.customerAccount;
    if (!consumerAccount) {
      showErrorMsg(intl.messages.getConsumerAccountFailed);
      return;
    }

    let validFiled = ['nickname', 'birthdate'];
    if (petForm.isPurebred == 1) {
      validFiled.push('breed');
    } else if (!isCat) {
      validFiled.push('weight');
    }
    console.log(validFiled, 'validFiled==');
    for (let i = 0; i < validFiled.length; i++) {
      if (!petForm[validFiled[i]]) {
        showErrorMsg(intl.messages.pleasecompleteTheRequiredItem);
        return;
      }
    }

    if (
      !petForm.sensitivity ||
      (petForm.isPurebred == 1 && !petForm.breedName)
    ) {
      showErrorMsg(intl.messages.pleasecompleteTheRequiredItem);
      return;
    }
    if (notUsUk) {
      if (!petForm.activity || (!petForm.lifestyle && isCat && RuTrFrDe)) {
        showErrorMsg(intl.messages.pleasecompleteTheRequiredItem);
        return;
      }
      for (let k in petForm.weightObj) {
        if (!petForm.weightObj[k]) {
          showErrorMsg(intl.messages.pleasecompleteTheRequiredItem);
          return;
        }
      }
      if (petForm.weightObj && Number(petForm.weightObj.measure) <= 0) {
        showErrorMsg(intl.messages.petWeightVerify);
        return;
      }
    }

    setState({
      loading: true
    });

    let customerPetsPropRelations = [];
    let propId = 100;
    for (let i = 0; i < selectedSpecialNeeds.length; i++) {
      let prop = {
        delFlag: 0,
        detailId: 0,
        indexFlag: 0,
        petsId: paramsId,
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
      petForm.isPurebred == 1
        ? petForm.breed
        : isCat
        ? 'mixed_breed'
        : petForm.breedcode;
    let pets = {
      birthOfPets: petForm.birthdate,
      petsId: paramsId,
      petsImg: petForm.imgUrl,
      petsBreed,
      petsName: petForm.nickname?.trim(),
      petsSex: petForm.petsSex,
      petsSizeValueId: '',
      petsSizeValueName: petForm.weight,
      petsType: isCat ? 'cat' : 'dog',
      sterilized: petForm.sterilized,
      storeId: window.__.env.REACT_APP_STOREID,
      isPurebred: petForm.isPurebred,
      activity: petForm.activity,
      lifestyle: petForm.lifestyle,
      weight: JSON.stringify(petForm.weightObj),
      needs: petForm.sensitivity
    };
    let isEditAlertNew = false;
    let param = {
      customerPets: pets,
      storeId: window.__.env.REACT_APP_STOREID,
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
      let hasChangedProps = equalProps(pets, oldCurrentPet);
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
      let isLinkedSub = subList.find((el) => el.petsId);
      let isLinkedSubLength = subList.filter((el) => el.petsId)?.length;
      let petsIdLinkedSub = isLinkedSub?.petsId;
      let subscribeId = location.state?.subscribeId || isLinkedSub?.subscribeId;
      if (!pets.petsId) {
        myAccountActionPushEvent('Add pet');
        let petsType = location.state?.petsType;
        let isFromSubscriptionDetail = location.state?.isFromSubscriptionDetail; //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
        let petsId = res.context?.result;
        if (subscribeId) {
          if (petsType) {
            // 从subdetail过来新增宠物的需要单独linksub
            let params = {
              subscribeId,
              petsId,
              createPetsLifeStageFlag: 1 // 新增宠物，link sub需要弹出yellow box
            };
            try {
              await changeSubscriptionDetailPets(params);
              setState({
                loading: false
              });
              // 有链接sub的，编辑宠物需要弹提示框
              if (isFromSubscriptionDetail) {
                isEditAlertNew = true;
                setIsEditAlert(true);
                // setState({ isEditAlert: true });
              }
            } catch (err) {
              setState({
                loading: false
              });
              showErrorMsg(err.message);
            }
          }
        }
      } else {
        // 有链接sub的，编辑宠物需要弹提示框
        if (petsIdLinkedSub && diffIndex > 0 && isLinkedSubLength == 1) {
          setState({
            loading: false
          });
          isEditAlertNew = true;
          setIsEditAlert(true);
          // setState({ isEditAlert: true });
        }
      }
      if (!isEditAlertNew) {
        gotoNext(null, diffIndex);
      }
    } catch (err) {
      showErrorMsg(err.message || intl.messages.saveFailed);
      setState({
        loading: false
      });
    }
  };
  let isChoosePetType = isCat !== null;
  let sensitivityLists = specialNeedsOptions;
  let sensitivityLable = 'Special Need';
  if (RuTrFrDe) {
    sensitivityLists = sensitivityList;
    sensitivityLable = 'Sensitivity';
  }
  if (Us) {
    sensitivityLists = specialNeeds;
  }
  return (
    <div
      className="petFormBox my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
      style={{ display: isChoosePetType ? 'block' : 'none' }}
    >
      {/* 错误提示 */}
      <ErrorMessage msg={errorMsg} />
      <div style={{ display: isMobile ? 'block' : 'flex' }}>
        <div className="photoBox">
          {/* <LazyLoad> */}
          <img
            style={{
              width: '120px',
              marginTop: '40px',
              borderRadius: '50%',
              height: '120px',
              objectFit: 'cover'
            }}
            src={petForm.imgUrl || (isCat ? Cat : Dog)}
            alt="photo box"
          />
          <UploadImg
            tipVisible={false}
            handleChange={(data) => handelImgChange(data)}
            geterrMessage={showErrorMsg}
            showLoading={() => {
              setState({ loading: true });
            }}
            hiddenLoading={() => {
              setState({ loading: false });
            }}
          />
        </div>
        <div className="formBox row">
          <div className="form-group col-12 col-lg-6 pull-left required">
            <InputBox
              htmlFor="name"
              FormattedMsg="petName"
              name="firstName"
              value={petForm.nickname}
              handleChange={inputNickname}
            />
          </div>
          <div className="form-group col-12 col-lg-6 pull-left required">
            <RadioBox
              htmlFor="gender"
              setState={setState}
              FormattedMsg="gender"
              radioGroup={genderGroup}
              radioChange={genderChange}
            />
          </div>
          <div className="form-group col-12 col-lg-6 pull-left required">
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
                  petForm.birthdate ? getZoneTime(petForm.birthdate) : ''
                }
                onChange={(date) => onDateChange(date)}
              />
              <div className="invalid-birthdate invalid-feedback">
                <FormattedMessage id="account.dateTip" />
              </div>
            </span>
          </div>
          <div className="form-group col-12 col-lg-6 pull-left required">
            <RadioBox
              htmlFor="Is Purebred"
              setState={setState}
              FormattedMsg={`${isCat ? 'isPurebredCat' : 'isPurebredDog'}`}
              radioGroup={purebredGroup}
              radioChange={pruebredChange}
            />
          </div>
          <div className="form-group col-12 col-lg-6 pull-left required">
            <label
              className="form-control-label rc-full-width"
              htmlFor={sensitivityLable}
            >
              <FormattedMessage id={sensitivityLable} />
            </label>
            {window.__.env.REACT_APP_COUNTRY == 'us' ? (
              <SelectMultiple
                optionList={sensitivityLists}
                // placeholder="Select one or more needs"
                selectedItemChange={(el, selectedItem) =>
                  multipleSelSpecialNeedsOptionsChange(el, selectedItem)
                }
                selectedItemData={{
                  value: petForm.sensitivity
                }}
              />
            ) : (
              <Selection
                optionList={sensitivityLists}
                selectedItemChange={(el) => specialNeedsOptionsChange(el)}
                selectedItemData={{
                  value: petForm.sensitivity
                }}
                key={petForm.sensitivity}
              />
            )}
          </div>
          {/* <div className="form-group col-12 col-lg-6 pull-left required">
            <label
              className="form-control-label rc-full-width"
              htmlFor={sensitivityLable}
            >
              <FormattedMessage id={sensitivityLable} />
            </label>
            <MultipleSelect/>
          </div> */}
          {/* {console.info(
            '!(petForm.isPurebred == 1)',
            !(petForm.isPurebred == 1)
          )}
          {console.info(
            '!(petForm.......................)',
            petForm.isPurebred
          )} */}
          {!(petForm.isPurebred == 1) ? (
            !isCat ? (
              <div className="form-group col-12 col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="Size"
                >
                  <FormattedMessage id="Size" />
                </label>
                <Selection
                  optionList={sizeOptions}
                  selectedItemChange={(el) => sizeOptionsChange(el)}
                  selectedItemData={{
                    value: selectedSizeObj.value
                  }}
                  key={selectedSizeObj.value}
                />
              </div>
            ) : null
          ) : (
            <div className="form-group col-12 col-lg-6 pull-left required">
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
                  autocomplete="off"
                  id="dog-breed"
                  placeholder={isCat ? enterCatBreed : enterDogBreed}
                  className="form-control input-pet breed"
                  value={petForm.breedName}
                  onChange={inputBreed}
                  style={{
                    height: '40px',
                    fontWeight: '300'
                  }}
                  disabled={isInputDisabled ? 'disabled' : null}
                />
                <ul
                  className={`select-breed ${
                    showBreedList ? '' : 'hidden no-border'
                  }`}
                >
                  {breedListLoading ? (
                    <div className="m-1">
                      <Skeleton color="#f5f5f5" width="95%" count={2} />
                    </div>
                  ) : null}
                  {breedList.map((item, i) => (
                    <li
                      value={item.value}
                      key={item.id}
                      className={`pl-2 pr-1 optionStyle ui-cursor-pointer ${
                        i !== breedList.length - 1 ? 'border-bottom' : ''
                      }`}
                      onClick={() => selectedBreed(item)}
                      style={{ whiteSpace: 'initial' }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
                <label className="rc-input__label" htmlFor="breed"></label>
              </span>
            </div>
          )}
          {notUsUk ? (
            <>
              {RuTrFrDe && isCat ? (
                <div className="form-group col-12 col-lg-6 pull-left required">
                  <label
                    className="form-control-label rc-full-width"
                    htmlFor="Lifestyle"
                  >
                    <FormattedMessage id="Lifestyle" />
                  </label>
                  <Selection
                    optionList={lifestyleOptions}
                    selectedItemChange={(el) => lifestyleChange(el)}
                    selectedItemData={{
                      value: petForm.lifestyle
                    }}
                    key={petForm.lifestyle}
                  />
                </div>
              ) : null}
              <div className="form-group col-12 col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="Activity"
                >
                  <FormattedMessage id="Activity" />
                </label>
                <Selection
                  optionList={activityOptions}
                  selectedItemChange={(el) => activityChange(el)}
                  selectedItemData={{
                    value: petForm.activity.toLowerCase()
                  }}
                  key={petForm.activity}
                />
              </div>
              <div className="form-group col-12 col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="Weight"
                >
                  <FormattedMessage id="Pet.Weight" />
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
                    style={{ padding: '.5rem 0', height: '49px' }}
                    value={petForm.weightObj.measure}
                    onChange={weightChange}
                    maxLength="50"
                    autoComplete="address-line"
                  />
                  <label
                    className="rc-input__label border-for-weight"
                    htmlFor="weight"
                  ></label>
                </span>
                <Selection
                  customContainerStyle={{
                    display: 'inline-block',
                    height: '48px'
                    // marginLeft: '4px'
                  }}
                  customInnerStyle={{
                    height: '100% !important'
                  }}
                  customInnerCls="h-full"
                  optionList={[
                    {
                      value: 'kg',
                      name: intl.messages['kg']
                    }
                    // { value: 'g', name: 'g' }
                  ]}
                  selectedItemChange={(el) => {
                    setNewPetForm('weightObj.measureUnit', el.value);
                    // petForm.weightObj.measureUnit = el.value;
                  }}
                  selectedItemData={{
                    value: petForm.weightObj.measureUnit
                  }}
                  key={petForm.activity}
                  customCls="weight-unit-select"
                />
              </div>
            </>
          ) : null}

          <div className="form-group col-12 col-lg-6 pull-left required">
            <RadioBox
              htmlFor="sterilized"
              setState={setState}
              FormattedMsg="sterilized"
              radioGroup={sterilizedGroup}
              radioChange={sterilizedChange}
            />
          </div>
          <div
            className="form-group col-lg-6 pull-left placehoder"
            style={{ height: '86px' }}
          ></div>
          {/* 新增累加按钮 */}
          {/* <div className="form-group col-12 col-lg-6 pull-left">
            <div
              className="cursor-pointer flex justify-center items-center rounded h-24"
              style={{ border: '1px solid #d7d7d7' }}
            >
              <img src={addCat} alt="add-cat" className="mr-6" />
              <p className="mr-2 text-36" style={{ color: '#767676' }}>
                +
              </p>
              <p className="text-16 leading-6" style={{ color: '#666666' }}>
                Add another cat
              </p>
            </div>
          </div>
          <div className="form-group col-12 col-lg-6 pull-left">
            <div
              className="cursor-pointer flex justify-center items-center rounded h-24"
              style={{ border: '1px solid #d7d7d7' }}
            >
              <img src={addDog} alt="add-cat" className="mr-6" />
              <p className="mr-2 text-36" style={{ color: '#767676' }}>
                +
              </p>
              <p className="text-16 md:leading-6" style={{ color: '#666666' }}>
                Add another dog
              </p>
            </div>
          </div> */}
          <div className="form-group col-lg-12 pull-left required">
            {isMobile ? (
              <p style={{ textAlign: 'center' }}>
                <button
                  className="rc-btn rc-btn--one"
                  onClick={() => savePet()}
                >
                  <FormattedMessage id="saveChange" />
                </button>
                <br />
                {/* sourceType为1 和 individual的时候都是individual的，不能删除宠物*/}
                {paramsId &&
                  !(
                    currentPetParam.sourceType == 1 ||
                    currentPetParam.sourceType == 'individual'
                  ) && (
                    <span
                      className="rc-styled-link"
                      onClick={() => {
                        handleDelPets(false);
                      }}
                    >
                      <FormattedMessage id="pet.deletePet" />
                    </span>
                  )}
              </p>
            ) : (
              <p style={{ textAlign: 'right' }}>
                {paramsId && currentPetParam.sourceType != 'individual' && (
                  <span
                    className="rc-styled-link md:mr-9"
                    onClick={() => {
                      handleDelPets(false);
                    }}
                  >
                    <FormattedMessage id="pet.deletePet" />
                  </span>
                )}
                {window.__.env.REACT_APP_COUNTRY === 'jp' &&
                  petList.length > 0 && (
                    <>
                      <a
                        href="javascript;"
                        className="font-medium text-16 md:mr-2"
                        style={{
                          color: '#444444',
                          borderBottom: '1px solid #d7d7d7'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (userInfo) {
                            history.push('/home');
                          }
                        }}
                      >
                        Proceed without adding a pet profile
                      </a>
                      <span className="md:mr-2">&nbsp;or&nbsp;</span>
                    </>
                  )}
                <button
                  className="rc-btn rc-btn--one"
                  onClick={() => savePet()}
                >
                  <FormattedMessage id="saveChange" />
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <Modal
        headerVisible={true}
        footerVisible={false}
        visible={isDeleteModalShow}
        modalTitle={''}
        close={() => {
          setIsDeleteModalShow(false);
        }}
      >
        <div className="text-center">
          <p>
            <div>{deleteWarningMessage}</div>
          </p>
          <p>
            <button
              onClick={() => {
                handleDelPets(true);
              }}
              className={`rc-btn rc-btn--one rc-btn--sm text-plain ${
                loading ? 'ui-btn-loading' : ''
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
        visible={isEditAlert}
        modalTitle={''}
        close={() => {
          history.push('/account/pets/');
          setIsEditAlert(false);
        }}
      >
        <div className="text-center">
          <p className="mb-4">
            <div>
              <FormattedMessage id="petSaveTips1" />
            </div>
            <FormattedMessage id="petSaveTips2" />
          </p>
          <p>
            <button
              onClick={() => {
                GAForSeeRecommendationBtn();
                gotoNext('updateLifeStage', true);
              }}
              className="rc-btn rc-btn--one rc-btn--sm"
            >
              <FormattedMessage id="See recommendation" />
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default injectIntl(inject('loginStore')(observer(PetForms)));
