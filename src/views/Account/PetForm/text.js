import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import ConfirmTooltip from '@/components/ConfirmTooltip';
// import './index.css';
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
import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/semantic.min.css'

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

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
    this.setState({loading: false})
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    // this.getPetList();

    // getDictionary({ type: 'dogSize' })
    //   .then((res) => {
    //     this.setState({
    //       sizeArr: res
    //     });
    //   })
    //   .catch((err) => {
    //     this.showErrorMsg(
    //       err.message.toString() || this.props.intl.messages.getDataFailed
    //     );
    //   });
    // getDictionary({ type: 'specialNeeds' })
    //   .then((res) => {
    //     this.setState({
    //       specialNeeds: res
    //     });
    //   })
    //   .catch((err) => {
    //     this.showErrorMsg(
    //       err.message.toString() || this.props.intl.messages.getDataFailed
    //     );
    //   });
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
    }).then((res) => {
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
        <Dropdown placeholder='Skills'  multiple selection options={options} />
      </div>
    );
  }
}

export default injectIntl(PetForm);
