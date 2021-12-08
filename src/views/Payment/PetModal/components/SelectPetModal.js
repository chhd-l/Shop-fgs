import React, { Component } from 'react';
import Modal from '@/components/Modal';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { getPetList } from '@/api/pet';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import findIndex from 'lodash/findIndex';

import '../index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class SelectPetModal extends Component {
  // 新建Pet

  constructor() {
    super();
    this.state = {
      productList: [],
      pets: [],
      selectedPet: null
    };
  }

  componentDidMount() {
    if (this.props.loginStore.isLogin) {
      this.getPetList();
    }
  }
  newPet() {
    this.props.addPet();
  }
  handelSelectPet(data) {
    this.setState({
      selectedPet: data
    });
  }
  handelClose() {
    this.props.close();
  }
  hanldeConfirm() {
    //调用创建宠物和产品的接口
    // console.log('产品，宠物关联成功', this.state.selectedPet)
    // console.log(this.state)
    const { pets, selectedPet } = this.state;
    let currentPet = pets.filter((el) => el.value === selectedPet)[0];
    this.props.confirm(currentPet);
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  async getPetList() {
    if (!this.userInfo || !this.userInfo.customerAccount) {
      // this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed)
      this.setState({
        loading: false
      });
      return false;
    }
    let res = await getPetList({
      customerId: this.userInfo.customerId,
      consumerAccount: this.userInfo.customerAccount
    });
    if (res) {
      let petList = res.context.context;
      if (petList.length > 0) {
        const list = [];
        petList.forEach((item) => {
          const { petsName, petsId } = item;
          const obj = {
            value: petsId,
            name: petsName
          };
          list.push(obj);
        });
        this.setState({
          pets: list,
          selectedPet: list[0].value
        });
      }
    } else {
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
    const value = target.value;
    this.setState({
      selectedPet: value
    });
    this.inputBlur(e);
  }
  render() {
    const productList = this.props.productList ? this.props.productList : [];
    return (
      <div className="pet-modal">
        <Modal
          visible={this.props.visible}
          overflowVisible={true}
          modalTitle={<FormattedMessage id="petInfo" />}
          confirmBtnText={<FormattedMessage id="continue" />}
          cancelBtnVisible={false}
          close={() => this.handelClose()}
          hanldeClickConfirm={() => this.hanldeConfirm()}
        >
          <div>
            <div className="img-box">
              {productList.length > 0
                ? productList.map((item, i) => (
                    <div className="img-wrapper" key={i}>
                      <LazyLoad>
                        <img
                          className="rc-img--square rc-img--square-custom "
                          src={item.goodsInfoImg}
                          alt="goods information"
                        />
                      </LazyLoad>
                    </div>
                  ))
                : null}
            </div>
            <div className="rc-layout-container rc-one-column">
              <div className="rc-column">
                <div className="address-add-btn">
                  <span
                    className="red font-weight-normal ui-cursor-pointer"
                    onClick={() => this.newPet()}
                  >
                    <span className="d-flex align-items-center">
                      <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
                      <span>
                        <FormattedMessage id="addPet" />
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="rc-layout-container rc-three-column">
              <div className="rc-column">
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="form-group col-lg-12 pull-left no-padding required">
                      <label className="form-control-label" htmlFor="petType">
                        <FormattedMessage id="selectPet" />
                      </label>
                      <span
                        className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                        style={{ marginTop: '.625rem' }}
                        data-loc="addressTypeSelect"
                      >
                        <select
                          data-js-select=""
                          id="petType"
                          value={this.state.selectedPet}
                          onChange={(e) => this.handleInputChange(e)}
                          onBlur={(e) => this.inputBlur(e)}
                          name="petType"
                        >
                          {this.state.pets.map((item, i) => (
                            <option value={item.value} key={i}>
                              {' '}
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </span>
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SelectPetModal;
