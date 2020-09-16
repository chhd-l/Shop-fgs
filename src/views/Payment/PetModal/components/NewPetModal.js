import React, { Component } from 'react';
import Modal from '@/components/Modal';
import { FormattedMessage } from 'react-intl';
import { findIndex } from 'lodash';
import Selection from '@/components/Selection';
import '../index.css';
import { addPet } from '@/api/pet';
import { getCustomerInfo } from '@/api/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const localItemRoyal = window.__.localItemRoyal;

export default class NewPetModal extends Component {
  // 新建Pet

  constructor() {
    super();
    this.state = {
      petForm: {
        petName: '',
        petType: 'cat',
        birthday: moment(new Date()).format('YYYY-MM-DD'),
      },
      selectModalVisible: false
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
    console.log(name, value)
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
    const pets = {
      birthOfPets: this.state.petForm.birthday,
      petsName: this.state.petForm.petName,
      petsType: this.state.petForm.petType // 'cat' : 'dog'
    };
    const parmas = {
      customerPets: pets,
      userId: this.getAccount()
    };
    let res = await addPet(parmas);
    if (res.code === 'K-000000') {
      console.log('add pet success.');
      this.props.confirm();
      this.props.close();
    } else {
    }
  }
  onDateChange(date) {
    const { petForm } = this.state;
    petForm['birthday'] = moment(date).format('YYYY-MM-DD');
    this.setState({ petForm });
  }
  render() {
    const form = this.state.petForm;
    return (
      <div className="pet-modal">
        <Modal
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
                <div className="invalid-feedback" style={{ display: 'none' }}>
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
                    style={{ marginTop: '10px' }}
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
                  className="receiveDate"
                  placeholder="Select Date"
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  selected={
                    form.birthday ? new Date(form.birthday) : new Date()
                  }
                  onChange={(date) => this.onDateChange(date)}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
