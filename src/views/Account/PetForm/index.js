import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import dog from '@/assets/images/animal-1.jpg'
import cat from '@/assets/images/animal-2.jpg'
import success from '@/assets/images/check-success.svg'
import { Link } from 'react-router-dom';
import edit from "@/assets/images/edit.svg"
import { getPetList, addPet, petsById, delPets, editPets } from '@/api/pet'
import Loading from "@/components/Loading"
import { getDictionary } from '@/utils/utils'
import { MINIMUM_AMOUNT, STOREID } from "@/utils/constant"

const selectedPet = {
  border: "3px solid #ec001a",
}
const noSelect = {
  border: "3px solid #d7d7d7",
}
export default class PetForm extends React.Component {
  constructor(props) {
    super(props)
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
      nickname: "",
      isUnknown: false,
      breed: "",
      weight: "",
      isSterilized: null,
      birthdate: '',
      sizeArr: [
        "Xsmall",
        "Mini",
        "Medium",
        "Maxi",
        "Giant"
      ],
      specialNeeds: [
        'Age support',
        'Cardiac support',
        'Diabetes support',
        'Digestive support',
        'Joint support',
        'Oral/Dental hygiene',
        'Food sensitivities',
        'Kidney support',
        'Liver support',
        'Skin and Coat support',
        'Urinary support',
        'Weight management',
        'Convalescence',
        'Skin sensitivity',
        'Digestive sensitivity',
        'Joint sensitivity',
      ],

      selectedSpecialNeeds: [],



      showBreedList: false,
      breedList: [],
      petList: [],
      currentPet: {},
      isEdit: false,
      errorMsg: "",
      successMsg: "",
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    this.nextStep = this.nextStep.bind(this)
    this.selectPetType = this.selectPetType.bind(this)
    this.selectSex = this.selectSex.bind(this)
    this.selectWeight = this.selectWeight.bind(this)
    this.setSterilized = this.setSterilized.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.selectFeatures = this.selectFeatures.bind(this)

  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    this.getPetList()

    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }

    try {
      let timer = setInterval(() => {
        const datePickerOptions = {
          maxDate: new Date()
        }
        if (window.RCDL.features.Datepickers && document.querySelector('.birthdate')) {
          document.querySelector('.birthdate').setAttribute("datepicker-setup", "false")
          window.RCDL.features.Datepickers.init('.birthdate', null, datePickerOptions)
          clearInterval(timer)
        }
      }, 1000)
    } catch (e) {
      console.log(e)
    }

    // window.RCDL.features.Datepickers.init('birthday', null, datePickerOptions);
  }
  getUserInfo () {
    let userinfo = {}
    if (sessionStorage.getItem('rc-userinfo')) {
      userinfo = JSON.parse(sessionStorage.getItem('rc-userinfo'))

    }
    return userinfo
  }
  getPetList = async () => {
    let consumerAccount = ''
    if (this.getUserInfo() && this.getUserInfo().customerAccount) {
      consumerAccount = this.getUserInfo().customerAccount
    }
    else {
      this.showErrorMsg('Get Consumer Account Failed')
      this.setState({
        loading: false
      })
      return
    }
    let params = {
      "consumerAccount": consumerAccount
    }
    await getPetList(params).then(res => {
      if (res.code === 'K-000000') {
        let petList = res.context.context
        if (petList.length > 0) {
          let currentPet = petList[0]
          this.setState({
            loading: false,
            showList: true,
            petList: petList,
            currentPetId: currentPet.petsId,
            currentPet: currentPet
          })
          this.getSpecialNeeds(currentPet.petsPropRelations)
        }
        else {
          this.setState({
            loading: false,
            showList: false,
            petList: petList
          })
          this.add()

        }
      }
      else {
        this.setState({
          loading: false,
          showList: false,
        })
        this.showErrorMsg(res.message || 'Get Data Failed')
      }
    }).catch(err => {
      this.setState({
        loading: false
      })
      console.log(err);

      this.showErrorMsg('Get Data Failed')
    })
  }


  petsById = async (id) => {
    let params = {
      "petsId": id
    }
    this.setState({
      loading: true
    })
    const res = await petsById(params)
    if (res.code === 'K-000000') {
      let currentPet = res.context.context
      this.setState({
        currentPet: currentPet,
        showList: true,
        loading: false,
        currentPetId: currentPet.petsId
      })
      this.getSpecialNeeds(currentPet.petsPropRelations)
    }
  }
  delPets = async (id) => {
    let params = {
      "petsIds": [
        id
      ]
    }
    this.setState({
      loading: true
    })
    const res = await delPets(params)
    if (res.code === 'K-000000') {
      this.getPetList()
    }
  }
  savePet = async () => {
    let consumerAccount = ''
    if (this.getUserInfo() && this.getUserInfo().customerAccount) {
      consumerAccount = this.getUserInfo().customerAccount
    }
    else {
      this.showErrorMsg('Get Consumer Account Failed')
      return
    }
    this.setState({
      loading: true
    })

    const { selectedSpecialNeeds } = this.state
    let petsPropRelations = []
    let propId = 100
    for (let i = 0; i < selectedSpecialNeeds.length; i++) {

      let prop = {
        "delFlag": 0,
        "detailId": 0,
        "indexFlag": 0,
        "petsId": this.state.currentPetId,
        "propId": propId,
        "propName": selectedSpecialNeeds[i],
        "relationId": "10086",
        "sort": 0,
      }
      petsPropRelations.push(prop)
      propId += 1

    }


    let pets = {
      "birthOfPets": this.state.birthdate,
      "petsBreed": this.state.isUnknown ? "unknown Breed" : this.state.breed,
      "petsId": this.state.currentPetId,
      "petsImg": "10086",
      "petsName": this.state.nickname,
      "petsSex": this.state.isMale ? "0" : "1",
      "petsSizeValueId": "10086",
      "petsSizeValueName": this.state.weight,
      "petsType": this.state.isCat ? 'cat' : 'dog',
      "sterilized": this.state.isSterilized ? "0" : "1",
      "storeId": STOREID
    }
    let param = {
      "pets": pets,
      "petsPropRelations": petsPropRelations,
      "storeId": STOREID,
      "userId": consumerAccount
    }
    if (pets.petsId) {
      await editPets(param).then(res => {
        if (res.code === 'K-000000') {
          let currentStep = "success"
          this.setState({
            currentStep: currentStep,
          })
          setTimeout(() => {
            this.petsById(pets.petsId)
          }, 3000);

        }
        else {
          this.showErrorMsg(res.message || 'Save Failed')

          this.setState({
            loading: false
          })
        }
      }).catch(err => {
        this.showErrorMsg('Save Failed')
        this.setState({
          loading: false
        })
      })

    }
    else {
      await addPet(param).then(res => {
        if (res.code === 'K-000000') {
          let currentStep = "success"
          this.setState({
            currentStep: currentStep,
          })
          setTimeout(() => {
            this.getPetList()
          }, 3000);

        }
        else {
          this.showErrorMsg(res.message || 'Save Failed')

          this.setState({
            loading: false
          })
        }
      }).catch(err => {
        this.showErrorMsg('Save Failed')
        this.setState({
          loading: false
        })
      })
    }


  }
  nextStep () {
    let step = this.state.step
    let isEdit = this.state.isEdit
    let currentStep
    if (step >= 8) {
      this.savePet()
    }
    else {
      step += 1
      if (this.state.isCat && step === 5) {
        step += 1
      }
      currentStep = 'step' + step
    }
    this.setState({
      step: step,
      currentStep: currentStep,
      isDisabled: isEdit ? false : true,
    })
  };
  selectPetType (type) {
    if (type === "cat") {
      this.setState({
        isCat: true,
        isDisabled: false,
      })
    }
    else if (type === "dog") {
      this.setState({
        isCat: false,
        isDisabled: false,
      })
    }
  }
  selectSex (type) {
    if (type === "male") {
      this.setState({
        isMale: true,
        isDisabled: false,
      })
    }
    else if (type === "female") {
      this.setState({
        isMale: false,
        isDisabled: false,
      })
    }
  };
  inputNickname = (e) => {
    let isDisabled = true
    if (e.target.value !== "") {
      isDisabled = false
    }
    else {
      isDisabled = true
    }
    this.setState({
      nickname: e.target.value,
      isDisabled: isDisabled
    })
  };
  setUnknown = () => {
    let isUnknown = !this.state.isUnknown
    let inputBreed = this.state.inputBreed
    let isDisabled = this.state.isDisabled
    let isInputDisabled = this.state.isInputDisabled
    if (isUnknown) {
      inputBreed = ""
      isDisabled = false
      isInputDisabled = true
    }
    else {
      isDisabled = true
      isInputDisabled = false
    }
    this.setState({
      isUnknown: isUnknown,
      inputBreed: inputBreed,
      isDisabled: isDisabled,
      isInputDisabled: isInputDisabled
    })
  }
  inputBreed = (e) => {
    let isDisabled = true
    let isUnknownDisabled = false
    let showBreedList = false
    if (e.target.value !== "") {


      isDisabled = false
      isUnknownDisabled = true
      showBreedList = true
    }
    else {
      isDisabled = true
      isUnknownDisabled = false
      showBreedList = false
    }
    this.setState({
      breed: e.target.value,
      isDisabled: isDisabled,
      isUnknownDisabled: isUnknownDisabled,
      showBreedList: showBreedList
    })
    this.getDict(this.state.isCat ? 'catBreed' : 'dogBreed', e.target.value)
  };
  selectWeight (val) {
    this.setState({
      weight: val,
      isDisabled: false
    })
  }
  setSterilized (val) {
    this.setState({
      isSterilized: val,
      isDisabled: false
    })
  }
  handleInputChange (e) {

    console.log(this.state.birthdate);

    console.log(e.target.value);

  }
  inputBlur (e) {
    if (e.target.value && e.target.value !== "") {
      this.setState({
        birthdate: e.target.value,
        isDisabled: false
      })
    }
  }
  selectFeatures = (val) => {
    //如果包含传入元素，则移除
    if (this.state.selectedSpecialNeeds.includes(val)) {
      let tempArr = this.state.selectedSpecialNeeds.filter(item => {
        return item !== val
      })
      this.setState({
        selectedSpecialNeeds: tempArr,
        isDisabled: false
      })
    }
    else {
      //如果是没有特殊需求
      if (val === 'No special needs') {
        let tempArr = ['No special needs']
        this.setState({
          selectedSpecialNeeds: tempArr,
          isDisabled: false
        })
      }
      else {
        //先排除'No special needs'
        let tempArr = this.state.selectedSpecialNeeds.filter(item => {
          return item !== 'No special needs'
        })
        tempArr.push(val)
        this.setState({
          selectedSpecialNeeds: tempArr,
          isDisabled: false
        })
      }
    }

  }
  selectedBreed = (item) => {
    this.setState({
      breed: item.name,
      showBreedList: false
    })

  }
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
      nickname: "",
      isUnknown: false,
      breed: "",
      weight: "",
      isSterilized: null,
      birthdate: '',
      selectedSpecialNeeds: [],
      isUnknownDisabled: false,
      isInputDisabled: false
    })
  }
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
      isUnknown: currentPet.petsBreed === "unknown Breed" ? true : false,
      isInputDisabled: currentPet.petsBreed === "unknown Breed" ? true : false,
      isUnknownDisabled: currentPet.petsBreed === "unknown Breed" ? false : true,
      breed: currentPet.petsBreed === "unknown Breed" ? "" : currentPet.petsBreed,
      weight: "",
      isSterilized: currentPet.sterilized === 0 ? true : false,
      birthdate: currentPet.birthOfPets,

    })
  }
  getDict = (type, name) => {
    this.setState({ loading: true })
    getDictionary({ type, name })
      .then(res => {
        this.setState({
          breedList: res,
          loading: false
        })
      })
      .catch(err => {
        this.showErrorMsg(err.toString() || 'get data failed')
        this.setState({ loading: false })
      })
  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 3000)
  }

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        successMsg: ''
      })
    }, 2000)
  }

  //定位
  scrollToErrorMsg () {
    const widget = document.querySelector('.rc-layout-container')
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      })
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }

  getSpecialNeeds = (array) => {
    if (array && array.length > 0) {
      let needs = []
      for (let index = 0; index < array.length; index++) {
        needs.push(array[index].propName)
      }
      this.setState({
        selectedSpecialNeeds: needs
      })

    }


  }
  cancel = () => {
    this.setState({
      loading: true
    })
    this.getPetList()

  }
  render () {
    const { petList, currentPet } = this.state
    return (
      <div>
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">

                <div class="list-select-pet js-list-pet" data-toggle-group="">
                  <ul class="scroll--x list list--inline list--align list--blank flex--middle" role="tablist">
                    <li class="pet-element">
                      <a onClick={() => this.add()} class="tab-add tab--img" role="tab">
                        <span class="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                      </a>
                    </li>

                    {
                      petList.map(item => (
                        <li class="rc-margin-x--xs pet-element">
                          <a onClick={() => this.petsById(item.petsId)}>
                            <div className={"tab__img img--round img--round--md name--select text-center " + (item.petsId === this.state.currentPetId ? "active" : "")}>
                              {item.petsName}
                            </div>
                          </a>
                        </li>
                      )
                      )}

                  </ul>
                </div>
                <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
                  <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
                    <span>{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => { this.setState({ errorMsg: '' }) }}
                      aria-label="Close">
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successMsg ? '' : 'hidden'}`}
                  role="alert">
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">{this.state.successMsg}</p>
                </aside>
                {
                  this.state.showList ? (
                    <div class="pet-information js-pet-information rc-margin-bottom--md">
                      <h2 class="name-pet">{currentPet.petsName}</h2>
                      <div class="rc-layout-container">
                        <div class="rc-column">
                          <ul class="pet-data">
                            <li class={"breed " + (currentPet.petsType === 'dog' ? "dog" : "cat")}>
                              <span class="">{currentPet.petsBreed}</span>
                            </li>
                            <li class="birth">
                              <span class="">{currentPet.birthOfPets}</span>
                            </li>
                            <li class={"gender " + (currentPet.petsSex === 0 ? "male" : "female") + " sprite-pet"}>
                              <span class=""> {currentPet.petsSex === 0 ? 'Male' : 'Female'}</span>
                            </li>
                            <li class="weight" style={{ display: (currentPet.petsType === 'dog' ? 'block' : 'none') }}>
                              <span class="">{currentPet.petsSizeValueName}</span>
                            </li>
                          </ul>
                        </div>
                        <div class="rc-column">
                          <div class="pet-special-need">Special needs</div>
                          <ul class="list-special-need">
                            {
                              this.state.selectedSpecialNeeds.map(item => (
                                <li>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                        <div class="edit js-edit-pet">
                          <a onClick={() => this.edit(currentPet)} >
                            <img src={edit} class="img-success" alt="" />
                          </a>
                        </div>
                        <div class="delete">
                          <a onClick={() => this.delPets(currentPet.petsId)}>
                            X
                        </a>
                        </div>
                      </div>
                    </div>
                  ) : null
                }
                <div className="group-progress js-group-progress section-form-group" style={{ display: !this.state.showList ? 'block' : 'none' }}>
                  <div className="bar-progress">
                    <div className="progress-child red js-percent-step" style={{ width: ((this.state.precent * this.state.step) + '%') }}>
                    </div>
                  </div>
                  <div className="step-progress">
                    <FormattedMessage id="account.step"></FormattedMessage>

                    <span className="js-step-number">
                      {this.state.step}
                    </span>
                    <FormattedMessage id="account.of"></FormattedMessage>
                        8
                  </div>
                </div>
                <div className="pet-form-create" style={{ display: !this.state.showList ? 'block' : 'none' }}>
                  {
                    this.state.currentStep === 'step1' ?
                      <div id="step-1" className="section col-lg-9 col-12">

                        <h2>
                          <FormattedMessage id="account.catOrDog"></FormattedMessage>
                        </h2>
                        <div className="form-group  custom-checkbox col-lg-6">
                          <img src={cat} className="animal-select" alt="" title=""
                            onClick={() => this.selectPetType('cat')}
                            style={this.state.isCat === true ? selectedPet : noSelect} />
                          <div className="label-option">
                            <FormattedMessage id="account.cat"></FormattedMessage>
                          </div>
                        </div>

                        <div className="form-group custom-checkbox col-lg-6">
                          <img src={dog} className="animal-select" alt="" title=""
                            onClick={() => this.selectPetType('dog')}
                            style={this.state.isCat === false ? selectedPet : noSelect} />
                          <div className="label-option">
                            <FormattedMessage id="account.dog"></FormattedMessage>
                          </div>
                        </div>
                      </div>
                      : null
                  }
                  {
                    this.state.currentStep === 'step2' ?
                      <div id="step-2" className="section col-lg-9 col-12 next-step">
                        <h2><FormattedMessage id="account.nickname"></FormattedMessage></h2>
                        <div className="form-group">
                          <input type="text" placeholder="Enter your pet's nickname" className="form-control input-pet"
                            name="dwfrm_miaaPet_petName"
                            required="required"
                            aria-required="true"
                            value={this.state.nickname}
                            onChange={this.inputNickname}
                            maxLength="2147483647" />
                          <div className="invalid-feedback"></div>
                        </div>

                      </div> : null
                  }
                  {
                    this.state.currentStep === 'step3' ?

                      <div id="step-3" className="section next-step">
                        <h2><FormattedMessage id="account.gender"></FormattedMessage></h2>
                        <div className="form-group custom-control custom-checkbox col-lg-6 ">
                          <label className="pet-select-control select-gender-1 icon-rc"
                            onClick={() => this.selectSex('male')}
                            style={this.state.isMale === true ? selectedPet : noSelect}>
                          </label>
                          <div className="label-option">
                            <FormattedMessage id="account.male"></FormattedMessage>
                          </div>
                        </div>
                        <div className="form-group custom-control custom-checkbox col-lg-6 ">

                          <label className="pet-select-control select-gender-2 icon-rc"
                            onClick={() => this.selectSex('female')}
                            style={this.state.isMale === false ? selectedPet : noSelect}></label>
                          <div className="label-option">
                            <FormattedMessage id="account.female"></FormattedMessage>
                          </div>
                        </div>
                      </div> : null
                  }
                  {
                    this.state.currentStep === 'step4' ?
                      <div id="step-4" className="section next-step not-hidden col-lg-9 col-12">
                        <h2><FormattedMessage id="account.breed"></FormattedMessage> {this.state.nickname}?</h2>
                        <div className="content-section">
                          <div className="form-group relative">
                            <input type="text" id="dog-breed"
                              placeholder="Enter your dog's breed"
                              className="form-control input-pet breed"
                              value={this.state.breed}
                              onChange={this.inputBreed}
                              style={{ display: (this.state.isCat ? "none" : null) }}
                              disabled={this.state.isInputDisabled ? "disabled" : null} />

                            <input type="text" id="cat-breed"
                              placeholder="Enter the breed of your cat"
                              className="form-control input-pet breed"
                              value={this.state.breed}
                              onChange={this.inputBreed}
                              style={{ display: (!this.state.isCat ? "none" : null) }}
                              disabled={this.state.isInputDisabled ? "disabled" : null} />

                            <div className="select-breed" style={{ display: (this.state.showBreedList ? 'block' : 'none') }}>
                              {
                                this.state.breedList.map(item => (
                                  <option value={item.value} key={item.value} onClick={() => this.selectedBreed(item)}>{item.name}</option>
                                ))
                              }
                            </div>
                          </div>



                          <div className="form-group custom-control label-unknown">

                            <div className="rc-input rc-input--inline"
                              style={{ margin: "15px 0 0 0", pointerEvents: this.state.isUnknownDisabled ? 'none' : "" }}
                              onClick={() => this.setUnknown()}
                            >
                              <input type="checkbox"
                                id="defaultAddress"
                                className="rc-input__checkbox"
                                value={this.state.isUnknown} />
                              {
                                this.state.isUnknown ?
                                  <label className="rc-input__label--inline petPropChecked" >
                                    <FormattedMessage id="account.unknownBreed"></FormattedMessage>
                                  </label> :
                                  <label className="rc-input__label--inline ">
                                    <FormattedMessage id="account.unknownBreed"></FormattedMessage>
                                  </label>
                              }
                            </div>

                          </div>
                        </div>
                      </div> : null
                  }
                  {
                    this.state.currentStep === 'step5' ?
                      <div id="step-5" className="section next-step">
                        <h2><FormattedMessage id="account.weight"></FormattedMessage> {this.state.nickname} ?</h2>
                        <div className="group-size" style={{ width: '100%' }}>
                          {
                            this.state.sizeArr.map(item => (

                              <div className="wrap__input wrap-size pull-left " onClick={() => this.selectWeight(item)}>
                                <input type="radio" className="radio input__radio"
                                  name="dwfrm_miaaPet_neuteredPet"
                                  value={item}
                                />
                                {
                                  this.state.weight === item ?
                                    <label className="label label__input sterilizedChecked" >
                                      {item}
                                    </label> :
                                    <label className="label label__input">
                                      {item}
                                    </label>
                                }
                              </div>
                            ))
                          }
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
                      </div> : null
                  }
                  {
                    this.state.currentStep === 'step6' ?
                      <div id="step-6" className="section next-step">
                        <h2><FormattedMessage id="account.sterilized"></FormattedMessage></h2>
                        <div className="group-size">

                          <div className="wrap__input col-6 pull-left text-center" onClick={() => this.setSterilized(true)}>
                            <input id="is-true" type="radio" className="radio input__radio"
                              name="dwfrm_miaaPet_neuteredPet"
                              value="true"
                            />
                            {
                              this.state.isSterilized === true ?
                                <label className="label label__input sterilizedChecked" >
                                  <FormattedMessage id="sterilized"></FormattedMessage>
                                </label> :
                                <label className="label label__input">
                                  <FormattedMessage id="sterilized"></FormattedMessage>
                                </label>
                            }
                          </div>

                          <div className="wrap__input col-6 pull-left text-center" onClick={() => this.setSterilized(false)}>
                            <input id="is-true" type="radio" className="radio input__radio"
                              name="dwfrm_miaaPet_neuteredPet"
                              value="false"
                            />
                            {
                              this.state.isSterilized === false ?
                                <label className="label label__input sterilizedChecked" >
                                  <FormattedMessage id="notSterilized"></FormattedMessage>
                                </label> :
                                <label className="label label__input">
                                  <FormattedMessage id="notSterilized"></FormattedMessage>
                                </label>
                            }
                          </div>
                        </div>
                      </div> : null
                  }
                  {

                    <div id="step-7" className="section next-step" style={{ display: this.state.currentStep === 'step7' ? 'block' : 'none' }}>
                      <h2><FormattedMessage id="account.enterBirthDare"></FormattedMessage></h2>
                      <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
                        <input
                          className="rc-input__date rc-js-custom rc-input__control birthdate"
                          id="birthdate"
                          data-js-dateformat="DD/MM/YYYY"

                          max="2020-05-29"
                          name="birthdate"
                          type="date"
                          value={this.state.birthdate}
                          onChange={e => this.handleInputChange(e)}
                          onBlur={e => this.inputBlur(e)} />

                        <label className="rc-input__label" htmlFor="birthdate"></label>
                      </span>
                      <div className="invalid-birthdate invalid-feedback">Please select a past date.</div>
                    </div>
                  }
                  {
                    this.state.currentStep === 'step8' ?
                      <div id="step-8" className="section next-step not-hidden">
                        <h2><FormattedMessage id="account.features"></FormattedMessage></h2>
                        <div style={{ width: "88%", margin: "0 auto" }}>
                          {
                            this.state.specialNeeds.map(item => (
                              <div className="rc-input rc-input--inline rc-margin-bottom--xs special-need-style"

                                onClick={() => this.selectFeatures(item)}
                              >
                                <input type="checkbox"
                                  className="rc-input__checkbox"
                                  value={item} />
                                {
                                  this.state.selectedSpecialNeeds.includes(item) ?
                                    <label className="rc-input__label--inline petPropChecked" >
                                      {item}
                                    </label> :
                                    <label className="rc-input__label--inline ">
                                      {item}
                                    </label>
                                }
                              </div>
                            ))
                          }

                          <div className="rc-input rc-input--inline rc-margin-bottom--xs special-need-style"
                            onClick={() => this.selectFeatures("No special needs")}
                          >
                            <input type="checkbox"
                              className="rc-input__checkbox"
                              value="No special needs" />
                            {
                              this.state.selectedSpecialNeeds.includes('No special needs') ?
                                <label className="rc-input__label--inline petPropChecked" >
                                  No special needs
                                </label> :
                                <label className="rc-input__label--inline ">
                                  No special needs
                                </label>
                            }
                          </div>
                        </div>
                      </div> : null
                  }

                  <div>
                    {
                      this.state.currentStep !== 'success' ?
                        <button type="button" name="next"
                          style={{ marginBottom: '20px' }}
                          className="rc-btn rc-btn--one btn-next btn-block js-btn-next"
                          disabled={(this.state.isDisabled) ? "disabled" : null}
                          onClick={this.nextStep}>
                          {this.state.step === 8 ? 'Save' : 'Further'}
                        </button>
                        : null
                    }
                    <button type="button" name="next"
                      style={{ margin: "0 0 20px 30px", display: (this.state.currentStep === 'success' ? "none" : null) }}
                      className="rc-btn rc-btn--two btn-next btn-block js-btn-next"
                      onClick={this.cancel}>
                      <FormattedMessage id="cancel"></FormattedMessage>
                    </button>
                  </div>

                  {
                    this.state.currentStep === 'success' ?
                      <div className="add-pet-success js-add-pet-success" >
                        <img src={success} className="img-success" alt="" title="" style={{ margin: "0 auto" }} />
                        <div className="text-done"><FormattedMessage id="account.fine"></FormattedMessage> </div>
                        <div className="text-done"><FormattedMessage id="account.welcome"></FormattedMessage> </div>
                      </div> : null
                  }


                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}