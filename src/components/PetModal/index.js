import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import NewPetModal from './components/NewPetModal';
import SelectPetModal from './components/SelectPetModal';
import { inject, observer } from 'mobx-react';
import './index.css';
import { getPetList } from '@/api/pet';

const localItemRoyal = window.__.localItemRoyal;

@injectIntl
@inject('loginStore')
@observer
class PetModal extends Component {
  // 新建Pet
  constructor() {
    super();
    this.state = {
      hasPet: false
    };
  }
  componentDidMount() {
    this.getPetList();
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
        this.setState({
          hasPet: true
        });
      } else {
        this.setState({
          hasPet: false
        });
      }
    } else {
    }
  }

  openNewPetModal() {
    this.props.close();
    this.props.openNew();
  }

  handelSelectModalClose() {
    this.props.close();
  }
  closeNewPetModal() {
    this.props.closeNew();
    this.props.close();
  }
  render() {
    return (
      <div className="pet-modal">
        <NewPetModal
          visible={
            (!this.state.hasPet || this.props.isAdd === 1) && this.props.visible
          }
          close={() => this.closeNewPetModal()}
          confirm={this.props.confirm}
        />
        <SelectPetModal
          visible={
            (this.state.hasPet &&
              this.props.visible &&
              this.props.isAdd !== 1) ||
            (this.state.hasPet && this.props.isAdd === 2)
          }
          productList={this.props.productList}
          addPet={() => this.openNewPetModal()}
          confirm={this.props.confirm}
          close={() => this.handelSelectModalClose()}
        />
      </div>
    );
  }
}
export default injectIntl(PetModal);
