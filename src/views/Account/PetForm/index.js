import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import './index.css';
import dog from '@/assets/images/animal-1.jpg';
import cat from '@/assets/images/animal-2.jpg';
import success from '@/assets/images/check-success.svg';
import edit from '@/assets/images/edit.svg';
import { getPetList, addPet, petsById, delPets, editPets } from '@/api/pet';
import Loading from '@/components/Loading';
import { getDictionary } from '@/utils/utils';
import { getCustomerInfo } from '@/api/user';
import { getDict } from '@/api/dict';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import es from 'date-fns/locale/es';
import de from 'date-fns/locale/de';

const lang = process.env.REACT_APP_LANG;

switch (lang) {
  case 'de':
    registerLocale('de', de);
    break;
  case 'es':
    registerLocale('es', es);
    break;
  default:
    break;
}

const datePickerCfg = {
  es: { format: 'yyyy-MM-dd', locale: 'es' },
  de: { format: 'dd.MM.yyyy', locale: 'de' },
  default: { format: 'yyyy-MM-dd', locale: '' }
};

const curDatePickerCfg =
  datePickerCfg[process.env.REACT_APP_LANG] || datePickerCfg.default;

const selectedPet = {
  border: '3px solid #ec001a'
};
const noSelect = {
  border: '3px solid #d7d7d7'
};

const localItemRoyal = window.__.localItemRoyal;

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
      //pet
      currentPetId: '',
      isCat: null,
      isMale: null,
      nickname: '',
      isUnknown: false,
      breed: '',
      weight: '',
      isSterilized: null,
      birthdate: '',
      sizeArr: [],
      specialNeeds: [],

      selectedSpecialNeeds: [],

      showBreedList: false,
      breedList: [],
      petList: [],
      currentPet: {},
      isEdit: false,
      errorMsg: '',
      successMsg: '',
      breedListLoading: false,
      showBreedListNoneTip: false
    };
    this.nextStep = this.nextStep.bind(this);
    this.selectPetType = this.selectPetType.bind(this);
    this.selectSex = this.selectSex.bind(this);
    this.selectWeight = this.selectWeight.bind(this);
    this.setSterilized = this.setSterilized.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.selectFeatures = this.selectFeatures.bind(this);
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.getPetList();

    getDictionary({ type: 'dogSize' })
      .then((res) => {
        this.setState({
          sizeArr: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
      });
    getDictionary({ type: 'specialNeeds' })
      .then((res) => {
        this.setState({
          specialNeeds: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
      });
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

  getPetList = () => {
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
    getPetList(params)
      .then((res) => {
        if (res.code === 'K-000000') {
          let petList = res.context.context;
          if (petList.length > 0) {
            let currentPet = petList[0];
            this.setState({
              loading: false,
              showList: true,
              petList: petList,
              currentPetId: currentPet.petsId,
              currentPet: currentPet
            });
            this.getSpecialNeeds(currentPet.customerPetsPropRelations);
          } else {
            this.setState({
              loading: false,
              showList: false,
              petList: petList
            });
            this.add();
          }
        } else {
          this.setState({
            loading: false,
            showList: false
          });
          this.showErrorMsg(
            res.message || this.props.intl.messages.getDataFailed
          );
        }
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
        console.log(err);

        this.showErrorMsg(this.props.intl.messages.getDataFailed);
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
    if (res.code === 'K-000000') {
      let currentPet = res.context.context;
      this.setState({
        currentPet: currentPet,
        showList: true,
        loading: false,
        currentPetId: currentPet.petsId
      });
      this.getSpecialNeeds(currentPet.customerPetsPropRelations);
    }
  };
  delPets = async (currentPet) => {
    let params = { petsIds: [currentPet.petsId] };
    currentPet.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      currentPet: currentPet
    });
    await delPets(params);
    this.getPetList();
  };
  savePet = async () => {
    let consumerAccount = '';
    if (this.getUserInfo() && this.getUserInfo().customerAccount) {
      consumerAccount = this.getUserInfo().customerAccount;
    } else {
      this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      return;
    }
    this.setState({
      loading: true
    });

    const { selectedSpecialNeeds } = this.state;
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
      petsBreed: this.state.isUnknown
        ? this.props.intl.messages['account.unknownBreed']
        : this.state.breed,
      petsId: this.state.currentPetId,
      petsImg: '10086',
      petsName: this.state.nickname,
      petsSex: this.state.isMale ? '0' : '1',
      petsSizeValueId: '10086',
      petsSizeValueName: this.state.weight,
      petsType: this.state.isCat ? 'cat' : 'dog',
      sterilized: this.state.isSterilized ? '0' : '1',
      storeId: process.env.REACT_APP_STOREID
    };
    let param = {
      customerPets: pets,
      customerPetsPropRelations: customerPetsPropRelations,
      storeId: process.env.REACT_APP_STOREID,
      userId: consumerAccount
    };
    if (pets.petsId) {
      await editPets(param)
        .then((res) => {
          if (res.code === 'K-000000') {
            let currentStep = 'success';
            this.setState({
              currentStep: currentStep
            });
            setTimeout(() => {
              this.petsById(pets.petsId);
            }, 3000);
          } else {
            this.showErrorMsg(
              res.message || this.props.intl.messages.saveFailed
            );

            this.setState({
              loading: false
            });
          }
        })
        .catch((err) => {
          this.showErrorMsg(this.props.intl.messages.saveFailed);
          this.setState({
            loading: false
          });
        });
    } else {
      await addPet(param)
        .then((res) => {
          if (res.code === 'K-000000') {
            let currentStep = 'success';
            this.setState({
              currentStep: currentStep
            });
            setTimeout(() => {
              this.getPetList();
            }, 3000);
          } else {
            this.showErrorMsg(
              res.message || this.props.intl.messages.saveFailed
            );

            this.setState({
              loading: false
            });
          }
        })
        .catch((err) => {
          this.showErrorMsg(this.props.intl.messages.saveFailed);
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
      name: e.target.value
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
    this.setState({
      isSterilized: val,
      isDisabled: false
    });
  }

  handleInputChange(e) {
    console.log(this.state.birthdate);

    console.log(e.target.value);
  }

  inputBlur(e) {
    if (e.target.value && e.target.value !== '') {
      this.setState({
        birthdate: e.target.value,
        isDisabled: false
      });
    }
  }
  selectFeatures = (val) => {
    //如果包含传入元素，则移除
    if (this.state.selectedSpecialNeeds.includes(val)) {
      let tempArr = this.state.selectedSpecialNeeds.filter((item) => {
        return item !== val;
      });
      this.setState({
        selectedSpecialNeeds: tempArr,
        isDisabled: false
      });
    } else {
      //如果是没有特殊需求
      if (val === 'Sin necesidades especiales') {
        let tempArr = [];
        if (val === 'Sin necesidades especiales') {
          tempArr = ['Sin necesidades especiales'];
        }
        this.setState({
          selectedSpecialNeeds: tempArr,
          isDisabled: false
        });
      } else {
        //先排除'No special needs'
        let tempArr = this.state.selectedSpecialNeeds.filter((item) => {
          return item !== 'Sin necesidades especiales';
        });
        tempArr.push(val);
        this.setState({
          selectedSpecialNeeds: tempArr,
          isDisabled: false
        });
      }
    }
  };
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
    this.setState({
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
      isSterilized: currentPet.sterilized === 0 ? true : false,
      birthdate: currentPet.birthOfPets
    });
  };
  getDict = (type, name) => {
    this.setState({ loading: true });
    getDict({ type, name })
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
    this.getPetList();
  };
  updateConfirmTooltipVisible = (status) => {
    let { currentPet } = this.state;
    currentPet.confirmTooltipVisible = status;
    this.setState({
      currentPet: currentPet
    });
  };
  onDateChange(date) {
    // const { form } = this.state
    // form['birthdate'] = moment(date).format("YYYY-MM-DD")
    this.setState({
      birthdate: moment(date).format('YYYY-MM-DD'),
      isDisabled: false
    });
  }
  render() {
    const { petList, currentPet } = this.state;
    return (
      <div className="petForm">
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
              {this.state.loading ? <Loading positionFixed="true" /> : null}
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
                      <span
                        onClick={() => this.add()}
                        className="tab-add tab--img"
                        role="tab"
                      >
                        <span className="rc-icon rc-plus rc-iconography plus-icon add_pet ui-cursor-pointer"></span>
                      </span>
                    </li>

                    {petList.map((item) => (
                      <li
                        className="rc-margin-x--xs pet-element"
                        key={item.petsId}
                      >
                        <span onClick={() => this.petsById(item.petsId)}>
                          <div
                            className={
                              'tab__img img--round img--round--md name--select text-center ' +
                              (item.petsId === this.state.currentPetId
                                ? 'active'
                                : '')
                            }
                          >
                            {item.petsName}
                          </div>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    this.state.errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                    role="alert"
                  >
                    <span className="pl-0">{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => {
                        this.setState({ errorMsg: '' });
                      }}
                      aria-label="Close"
                    >
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    this.state.successMsg ? '' : 'hidden'
                  }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    {this.state.successMsg}
                  </p>
                </aside>
                {this.state.showList ? (
                  <div className="pet-information js-pet-information rc-margin-bottom--md">
                    <h2 className="name-pet">{currentPet.petsName}</h2>
                    <div className="rc-layout-container">
                      <div className="rc-column">
                        <ul className="pet-data">
                          <li
                            className={
                              'breed ' +
                              (currentPet.petsType === 'dog' ? 'dog' : 'cat')
                            }
                          >
                            <span className="">{currentPet.petsBreed}</span>
                          </li>
                          <li className="birth">
                            <span className="">{currentPet.birthOfPets}</span>
                          </li>
                          <li
                            className={
                              'gender ' +
                              (currentPet.petsSex === 0 ? 'male' : 'female') +
                              ' sprite-pet'
                            }
                          >
                            <span className="">
                              {' '}
                              {currentPet.petsSex === 0 ? (
                                <FormattedMessage id="account.male"></FormattedMessage>
                              ) : (
                                <FormattedMessage id="account.female"></FormattedMessage>
                              )}
                            </span>
                          </li>
                          <li
                            className="weight"
                            style={{
                              display:
                                currentPet.petsType === 'dog' ? 'block' : 'none'
                            }}
                          >
                            <span className="">
                              {currentPet.petsSizeValueName}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="rc-column">
                        <div className="pet-special-need">
                          <FormattedMessage id="account.specialNeeds" />
                        </div>
                        <ul className="list-special-need">
                          {this.state.selectedSpecialNeeds.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="edit js-edit-pet">
                        <a onClick={() => this.edit(currentPet)}>
                          <img src={edit} className="img-success" alt="" />
                        </a>
                      </div>
                      <div className="delete">
                        <a
                          onClick={() => this.updateConfirmTooltipVisible(true)}
                        >
                          X
                        </a>
                        <ConfirmTooltip
                          containerStyle={{
                            transform: 'translate(-89%, 105%)'
                          }}
                          arrowStyle={{ left: '89%' }}
                          display={currentPet.confirmTooltipVisible}
                          confirm={(e) => this.delPets(currentPet)}
                          updateChildDisplay={(status) =>
                            this.updateConfirmTooltipVisible(status)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className="group-progress js-group-progress section-form-group"
                  style={{ display: !this.state.showList ? 'block' : 'none' }}
                >
                  <div className="bar-progress">
                    <div
                      className="progress-child red js-percent-step"
                      style={{
                        width: this.state.precent * this.state.step + '%'
                      }}
                    ></div>
                  </div>
                  <div className="step-progress">
                    <FormattedMessage id="account.step"></FormattedMessage>
                    <span className="js-step-number">{this.state.step}</span>
                    <FormattedMessage id="account.of"></FormattedMessage>8
                  </div>
                </div>
                <div
                  className="pet-form-create"
                  style={{ display: !this.state.showList ? 'block' : 'none' }}
                >
                  {this.state.currentStep === 'step1' ? (
                    <div id="step-1" className="section col-lg-9 col-12">
                      <h2>
                        <FormattedMessage id="account.catOrDog" />
                      </h2>
                      <div className="form-group  custom-checkbox col-lg-6 ui-cursor-pointer">
                        <img
                          src={cat}
                          className="animal-select"
                          alt=""
                          title=""
                          onClick={() => this.selectPetType('cat')}
                          style={
                            this.state.isCat === true ? selectedPet : noSelect
                          }
                        />
                        <div className="label-option">
                          <FormattedMessage id="account.cat" />
                        </div>
                      </div>

                      <div className="form-group custom-checkbox col-lg-6 ui-cursor-pointer">
                        <img
                          src={dog}
                          className="animal-select"
                          alt=""
                          title=""
                          onClick={() => this.selectPetType('dog')}
                          style={
                            this.state.isCat === false ? selectedPet : noSelect
                          }
                        />
                        <div className="label-option">
                          <FormattedMessage id="account.dog"></FormattedMessage>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.currentStep === 'step2' ? (
                    <div
                      id="step-2"
                      className="section col-lg-9 col-12 next-step"
                    >
                      <h2>
                        <FormattedMessage id="account.nickname"></FormattedMessage>
                      </h2>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder={this.props.intl.messages.enterNickname}
                          className="form-control input-pet"
                          name="dwfrm_miaaPet_petName"
                          required="required"
                          aria-required="true"
                          value={this.state.nickname}
                          onChange={this.inputNickname}
                          maxLength="2147483647"
                        />
                        <div className="invalid-feedback"></div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.currentStep === 'step3' ? (
                    <div id="step-3" className="section next-step">
                      <h2>
                        <FormattedMessage id="account.gender"></FormattedMessage>
                      </h2>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ui-cursor-pointer">
                        <label
                          className="pet-select-control select-gender-1 icon-rc"
                          onClick={() => this.selectSex('male')}
                          style={
                            this.state.isMale === true ? selectedPet : noSelect
                          }
                        ></label>
                        <div className="label-option">
                          <FormattedMessage id="account.male"></FormattedMessage>
                        </div>
                      </div>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ui-cursor-pointer">
                        <label
                          className="pet-select-control select-gender-2 icon-rc"
                          onClick={() => this.selectSex('female')}
                          style={
                            this.state.isMale === false ? selectedPet : noSelect
                          }
                        ></label>
                        <div className="label-option">
                          <FormattedMessage id="account.female"></FormattedMessage>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.currentStep === 'step4' ? (
                    <div
                      id="step-4"
                      className="section next-step not-hidden col-lg-9 col-12"
                    >
                      <h2>
                        <FormattedMessage
                          id="account.breed"
                          values={{ val: this.state.nickname }}
                        />
                      </h2>
                      <div className="content-section">
                        <div className="form-group relative">
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
                            {/* {this.state.showBreedListNoneTip && (
                              <span className="pl-2">
                                <FormattedMessage id="searchNoBreed" />
                              </span>
                            )} */}
                          </div>
                        </div>

                        <div className="form-group custom-control label-unknown">
                          <div
                            className="rc-input rc-input--inline"
                            style={{
                              margin: '15px 0 0 0',
                              pointerEvents: this.state.isUnknownDisabled
                                ? 'none'
                                : ''
                            }}
                            onClick={() => this.setUnknown()}
                          >
                            {this.state.isUnknown ? (
                              <input
                                type="checkbox"
                                className="rc-input__checkbox"
                                value={this.state.isUnknown}
                                key={1}
                                checked
                              />
                            ) : (
                              <input
                                type="checkbox"
                                className="rc-input__checkbox"
                                key={2}
                                value={this.state.isUnknown}
                              />
                            )}
                            <label className="rc-input__label--inline text-break">
                              <FormattedMessage id="account.unknownBreed" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.currentStep === 'step5' ? (
                    <div id="step-5" className="section next-step">
                      <h2>
                        <FormattedMessage
                          id="account.weight"
                          values={{ val: this.state.nickname }}
                        />
                      </h2>
                      <div className="group-size" style={{ width: '100%' }}>
                        {this.state.sizeArr.map((item, i) => (
                          <div
                            className="wrap__input wrap-size pull-left "
                            onClick={() => this.selectWeight(item.name)}
                          >
                            <input
                              type="radio"
                              className="radio input__radio"
                              name="dwfrm_miaaPet_neuteredPet"
                              value={item.name}
                            />
                            {this.state.weight === item.name ? (
                              <label className="label label__input sterilizedChecked">
                                {item.name}
                              </label>
                            ) : (
                              <label className="label label__input">
                                {item.name}
                              </label>
                            )}
                          </div>
                        ))}
                        {/* <div className="wrap__input wrap-size pull-left col-3">
                          <input id={"is-" + item}
                            type="radio" 
                            className="radio input__radio" 
                            name="dwfrm_miaaPet_petSize" 
                            value="X-Small"
                            onClick={()=>this.selectWeight("X-Small")}/>
                          <label className="label label__input" for="is-X-Small">X-Small (up to 4 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Small" type="radio" 
                          className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize"
                           value="Small"
                           onClick={()=>this.selectWeight("Small")}/>
                          <label className="label label__input" for="is-Small">Mini (4-10 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Medium" type="radio" 
                          className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize" 
                          value="Medium"
                          onClick={()=>this.selectWeight("Medium")}/>
                          <label className="label label__input" for="is-Medium">Medium (10-25 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Large" type="radio" className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize"
                           value="Large"
                           onClick={()=>this.selectWeight("Large")}/>
                          <label className="label label__input" for="is-Large">Maxi (25-45 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-X-Large" type="radio" className="radio input__radio" name="dwfrm_miaaPet_petSize" 
                          value="X-Large"
                          onClick={()=>this.selectWeight("X-Large")}/>
                          <label className="label label__input" for="is-X-Large">Giant (over 45 kg)</label>
                        </div>*/}
                      </div>
                    </div>
                  ) : null}
                  {this.state.currentStep === 'step6' ? (
                    <div id="step-6" className="section next-step">
                      <h2>
                        <FormattedMessage id="account.sterilized"></FormattedMessage>
                      </h2>
                      <div className="group-size">
                        <div
                          className="wrap__input col-6 pull-left text-center"
                          onClick={() => this.setSterilized(true)}
                        >
                          <input
                            id="is-true"
                            type="radio"
                            className="radio input__radio"
                            name="dwfrm_miaaPet_neuteredPet"
                            value="true"
                          />
                          {this.state.isSterilized === true ? (
                            <label className="label label__input sterilizedChecked">
                              <FormattedMessage id="sterilized"></FormattedMessage>
                            </label>
                          ) : (
                            <label className="label label__input">
                              <FormattedMessage id="sterilized"></FormattedMessage>
                            </label>
                          )}
                        </div>

                        <div
                          className="wrap__input col-6 pull-left text-center"
                          onClick={() => this.setSterilized(false)}
                        >
                          <input
                            id="is-true"
                            type="radio"
                            className="radio input__radio"
                            name="dwfrm_miaaPet_neuteredPet"
                            value="false"
                          />
                          {this.state.isSterilized === false ? (
                            <label className="label label__input sterilizedChecked">
                              <FormattedMessage id="notSterilized"></FormattedMessage>
                            </label>
                          ) : (
                            <label className="label label__input">
                              <FormattedMessage id="notSterilized"></FormattedMessage>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {
                    <div
                      id="step-7"
                      className="section next-step"
                      style={{
                        display:
                          this.state.currentStep === 'step7' ? 'block' : 'none'
                      }}
                    >
                      <h2>
                        <FormattedMessage id="account.enterBirthDare"></FormattedMessage>
                      </h2>
                      <DatePicker
                        className="receiveDate"
                        placeholder="Select Date"
                        dateFormat={curDatePickerCfg.format}
                        locale={curDatePickerCfg.locale}
                        maxDate={new Date()}
                        selected={
                          this.state.birthdate
                            ? new Date(this.state.birthdate)
                            : new Date()
                        }
                        onChange={(date) => this.onDateChange(date)}
                      />
                      {/* <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
                        <input
                          className="rc-input__date rc-js-custom rc-input__control birthdate"
                          id="birthdate"
                          data-js-dateformat="DD/MM/YYYY"
                          name="birthdate"
                          type="date"
                          value={this.state.birthdate}
                          onChange={e => this.handleInputChange(e)}
                          onBlur={e => this.inputBlur(e)} />

                        <label className="rc-input__label" htmlFor="birthdate"></label>
                      </span> */}
                      <div className="invalid-birthdate invalid-feedback">
                        <FormattedMessage id="account.dateTip" />
                      </div>
                    </div>
                  }
                  {this.state.currentStep === 'step8' ? (
                    <div id="step-8" className="section next-step not-hidden">
                      <h2>
                        <FormattedMessage id="account.features" />
                      </h2>
                      <div style={{ width: '88%', margin: '0 auto' }}>
                        {this.state.specialNeeds.map((item, i) => (
                          <div
                            className="rc-input rc-input--inline rc-margin-bottom--xs special-need-style"
                            onClick={() => this.selectFeatures(item.name)}
                          >
                            <input
                              type="checkbox"
                              className="rc-input__checkbox"
                              value={item.name}
                            />
                            {this.state.selectedSpecialNeeds.includes(
                              item.name
                            ) ? (
                              <label className="rc-input__label--inline petPropChecked">
                                {item.name}
                              </label>
                            ) : (
                              <label className="rc-input__label--inline ">
                                {item.name}
                              </label>
                            )}
                          </div>
                        ))}

                        <div
                          className="rc-input rc-input--inline rc-margin-bottom--xs special-need-style"
                          onClick={() =>
                            this.selectFeatures('Sin necesidades especiales')
                          }
                        >
                          <input
                            type="checkbox"
                            className="rc-input__checkbox"
                            value="Sin necesidades especiales"
                          />
                          {this.state.selectedSpecialNeeds.includes(
                            'Sin necesidades especiales'
                          ) ? (
                            <label className="rc-input__label--inline petPropChecked">
                              <FormattedMessage id="noSpecialNeeds" />
                            </label>
                          ) : (
                            <label className="rc-input__label--inline ">
                              <FormattedMessage id="noSpecialNeeds" />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <button
                      type="button"
                      style={{
                        margin: '20px',
                        display:
                          this.state.currentStep === 'success' ? 'none' : null
                      }}
                      className="rc-btn rc-btn--two btn-next btn-block js-btn-next"
                      onClick={this.cancel}
                    >
                      <FormattedMessage id="cancel"></FormattedMessage>
                    </button>
                    {this.state.currentStep !== 'success' ? (
                      <button
                        type="button"
                        name="next"
                        style={{ margin: '20px' }}
                        className="rc-btn rc-btn--one btn-next btn-block js-btn-next"
                        disabled={this.state.isDisabled ? 'disabled' : null}
                        onClick={this.nextStep}
                      >
                        {this.state.step === 8 ? (
                          <FormattedMessage id="save" />
                        ) : (
                          <FormattedMessage id="payment.further" />
                        )}
                      </button>
                    ) : null}
                  </div>

                  {this.state.currentStep === 'success' ? (
                    <div className="add-pet-success js-add-pet-success">
                      <img
                        alt=""
                        src={success}
                        className="img-success"
                        style={{ margin: '0 auto' }}
                      />
                      <div className="text-done">
                        <FormattedMessage id="account.fine" />
                      </div>
                      <div className="text-done">
                        <FormattedMessage id="account.welcome" defaultMessage={' '} />
                      </div>
                    </div>
                  ) : null}
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

export default injectIntl(PetForm);
