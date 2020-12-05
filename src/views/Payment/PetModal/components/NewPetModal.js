import React, { Component } from 'react';
import Modal from '@/components/Modal';
import { FormattedMessage, injectIntl } from 'react-intl';
import findIndex from 'lodash/findIndex';
import '../index.css';
import { addPet } from '@/api/pet';
import { getCustomerInfo } from '@/api/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDict } from '@/api/dict';
import moment from 'moment';
import SearchSelection from '@/components/SearchSelection';
import { inject, observer } from 'mobx-react';
import './NewPetModal.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
@injectIntl
class NewPetModal extends Component {
  // 新建Pet

  constructor() {
    super();
    this.state = {
      petForm: {
        petName: '',
        petType: 'cat',
        // birthday: moment(new Date()).format('YYYY-MM-DD'),
        birthday: '',
        breed: ''
      },
      selectModalVisible: false,
      isShowBirthErorr: false,
      isShowPetNameErorr: false,
      isShowBreedErorr: false
    };
  }
  componentDidMount() {}

  handelSelectPet(data) {
    this.setState({
      selectedPet: data
    });
  }
  handelClose() {
    this.props.close();
  }
  hanldeConfirm() {
    this.addPet();
    // this.openSelectPetModal()
  }
  handelSelectModalClose() {
    this.setState({
      selectModalVisible: false
    });
  }
  openSelectPetModal() {
    this.setState({
      selectModalVisible: true
    });
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.visible) {
      this.setState({
        petForm: {
          petName: '',
          petType: 'cat',
          // birthday: moment(new Date()).format('YYYY-MM-DD'),
          birthday: '',
          breed: ''
        }
      });
    }
  }
  inputBlur(e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  }
  handleInputChange(e) {
    const target = e.target;
    const { petForm } = this.state;
    const name = target.name;
    const value = target.value;
    console.log(name, value);
    petForm[name] = value;
    this.setState({ petForm: petForm });
    this.inputBlur(e);
  }
  getUserInfo() {
    let userinfo = {};
    if (localItemRoyal.get('rc-userinfo')) {
      userinfo = localItemRoyal.get('rc-userinfo');
    }
    return userinfo;
  }

  getAccount = () => {
    let consumerAccount = '';
    if (this.getUserInfo() && this.getUserInfo().customerAccount) {
      consumerAccount = this.getUserInfo().customerAccount;
    } else {
      getCustomerInfo().then((res) => {
        const context = res.context;
        localItemRoyal.set('rc-userinfo', context);
        consumerAccount = context.consumerAccount;
      });
    }

    return consumerAccount;
  };

  async addPet() {
    let isFillAll = true;
    for (let k in this.state.petForm) {
      if (!this.state.petForm[k]) {
        isFillAll = false;
        if (k === 'petName') {
          this.setState({ isShowPetNameErorr: true });
        }
        if (k === 'birthday') {
          this.setState({ isShowBirthErorr: true });
        }
        if (k === 'breed') {
          this.setState({ isShowBreedErorr: true });
        }
      }
    }
    if (!isFillAll) {
      return false;
    }
    if (!this.props.loginStore.isLogin) {
      this.props.confirm(this.state.petForm);
      return;
    }
    const pets = {
      birthOfPets: this.state.petForm.birthday,
      petsName: this.state.petForm.petName,
      petsType: this.state.petForm.petType, // 'cat' : 'dog'
      petsBreed: this.state.petForm.breed
    };
    const parmas = {
      customerPets: pets,
      userId: this.getAccount()
    };
    let res = await addPet(parmas);
    if (res.code === 'K-000000') {
      console.log('add pet success.', res);
      this.props.confirm({ value: res.context.result, name: pets.petsName });
      this.props.close();
    } else {
    }
  }
  inputBreed = (e) => {
    const { petForm } = this.state;
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
      showBreedList: showBreedList
    });
    this.getDict(
      petForm.type === 'cat' ? 'catBreed_mx' : 'dogBreed_mx',
      e.target.value
    );
  };
  getDict = (type, name) => {
    this.setState({ loading: true });
    getDict({ type, name })
      .then((res) => {
        if (res.code === 'K-000000') {
          this.setState({
            breedList: res.context.sysDictionaryVOS,
            loading: false
          });
        }
        // this.showErrorMsg(
        //   res.message || this.props.intl.messages.getDataFailed
        // );
      })
      .catch((err) => {
        // this.showErrorMsg(
        //   err.toString() || this.props.intl.messages.getDataFailed
        // );
        // this.setState({ loading: false });
      });
  };
  onDateChange(date) {
    console.log(date);
    let { petForm, isShowBirthErorr } = this.state;
    if (date) {
      petForm['birthday'] = moment(date).format('YYYY-MM-DD');
      isShowBirthErorr = false;
    } else {
      petForm['birthday'] = date;
      isShowBirthErorr = true;
    }
    this.setState({ petForm, isShowBirthErorr });
  }
  render() {
    const form = this.state.petForm;
    return (
      <div className="pet-modal">
        <Modal
          overflowVisible={true}
          visible={this.props.visible}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
          close={() => this.handelClose()}
          hanldeClickConfirm={() => this.hanldeConfirm()}
        >
          <div className="rc-padding-left--lg rc-padding-right--lg">
            <div className="row">
              <div className="form-group col-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="address"
                >
                  <FormattedMessage id="petName" />
                </label>
                <span
                  className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control"
                    id="petName"
                    name="petName"
                    required=""
                    aria-required="true"
                    value={form.petName}
                    onChange={(e) => this.handleInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    maxLength="50"
                    autoComplete="address-line"
                  />
                  <label className="rc-input__label" htmlFor="petName"></label>
                </span>
                <div
                  className="invalid-feedback"
                  style={{
                    display: this.state.isShowPetNameErorr ? 'block' : 'none'
                  }}
                >
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="petName" />
                    }}
                  />
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group col-lg-12 pull-left no-padding required">
                  <label className="form-control-label" htmlFor="petType">
                    <FormattedMessage id="petType" />
                  </label>
                  <span
                    className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                    style={{ marginTop: '0' }}
                    data-loc="addressTypeSelect"
                  >
                    <select
                      data-js-select=""
                      id="petType"
                      value={form.petType}
                      onChange={(e) => this.handleInputChange(e)}
                      onBlur={(e) => this.inputBlur(e)}
                      name="petType"
                    >
                      <option value="cat"> Cat</option>
                      <option value="dog"> Dog</option>
                    </select>
                  </span>
                  <div className="invalid-feedback"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="birthdate"
                >
                  <FormattedMessage id="account.birthDate" />
                </label>
                <DatePicker
                  id="receiveBirthDate"
                  className="receiveDate"
                  placeholder="Select Date"
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  selected={form.birthday ? new Date(form.birthday) : ''}
                  onChange={(date) => this.onDateChange(date)}
                />
                <div
                  className="invalid-feedback"
                  style={{
                    display: this.state.isShowBirthErorr ? 'block' : 'none'
                  }}
                >
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="account.birthDate" />
                    }}
                  />
                </div>
              </div>
              <div className="form-group col-lg-6" id="inputBreed">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="breed"
                >
                  <FormattedMessage id="breed" />
                </label>
                {this.props.visible && (
                  <SearchSelection
                    queryList={async ({ inputVal, pageNum }) => {
                      console.log({ type: form.petType, name: inputVal });
                      let res = await getDict({
                        type:
                          form.petType === 'cat'
                            ? 'catBreed_mx'
                            : 'dogBreed_mx',
                        name: inputVal
                      });
                      if (res.code === 'K-000000') {
                        console.log(res.context.sysDictionaryVOS);
                        return (
                          (res.context && res.context.sysDictionaryVOS) ||
                          []
                        ).map((ele) => Object.assign(ele, { name: ele.name }));
                      }
                    }}
                    selectedItemChange={(data) => {
                      form.breed = data.name;
                      this.setState({ petForm: form, isShowBreedErorr: false });
                    }}
                  />
                )}
                <div
                  className="invalid-feedback"
                  style={{
                    display: this.state.isShowBreedErorr ? 'block' : 'none'
                  }}
                >
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="breed" />
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NewPetModal;
