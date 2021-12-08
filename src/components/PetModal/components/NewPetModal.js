import React, { Component } from 'react';
import Modal from '@/components/Modal';
import { FormattedMessage } from 'react-intl-phraseapp';
import findIndex from 'lodash/findIndex';
import '../index.css';
import { addPet } from '@/api/pet';
import { getCustomerInfo } from '@/api/user';

const localItemRoyal = window.__.localItemRoyal;

export default class NewPetModal extends Component {
  // 新建Pet

  constructor() {
    super();
    this.state = {
      petForm: {
        petName: '',
        petType: '',
        birthday: ''
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
    petForm[name] = value;
    this.setState({ petForm: petForm });
    this.inputBlur(e);
  }

  get getUserInfo() {
    return this.props.loginStore.userInfo;
  }

  async addPet() {
    const pets = {
      birthOfPets: this.state.petForm.birthday,
      petsName: this.state.petForm.petName,
      petsType: this.state.petForm.petType // 'cat' : 'dog'
    };
    const parmas = {
      customerPets: pets,
      userId: this.getUserInfo.customerAccount
    };
    let res = await addPet(parmas);
    this.props.confirm();
    this.props.close();
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
              <div className="form-group col-lg-12 pull-left required">
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
            </div>
            <div className="row">
              <div className="col-lg-12 ">
                <div
                  className="form-group col-lg-12 pull-left no-padding required"
                  id="petType"
                >
                  <label className="form-control-label" htmlFor="petType">
                    <FormattedMessage id="petType" />
                  </label>
                  <span
                    className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                    style={{ marginTop: '.625rem' }}
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
              <div className="form-group col-lg-12 pull-left">
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
                  <input
                    // type="text"
                    className="rc-input__control"
                    id="birthday"
                    name="birthday"
                    // data-js-dateformat="YYYY/MM/DD"
                    type="date"
                    required=""
                    aria-required="true"
                    value={form.birthday}
                    onChange={(e) => this.handleInputChange(e)}
                    maxLength="50"
                  />
                  <label className="rc-input__label" htmlFor="birthday"></label>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
