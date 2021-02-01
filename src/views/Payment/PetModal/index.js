import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import NewPetModal from './components/NewPetModal';
import SelectPetModal from './components/SelectPetModal';
import './index.css';
import { getPetList } from '@/api/pet';
import { getCustomerInfo } from '@/api/user';

const localItemRoyal = window.__.localItemRoyal;

@inject(
  'loginStore'
)
@injectIntl
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
    console.log(this.props.loginStore, 'islogin')
    if(this.props.loginStore.isLogin) {
      this.getPetList();
    }
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

  async getPetList() {
    if (!this.getAccount()) {
      this.setState({
        loading: false
      });
      return false;
    }
    let params = {
      consumerAccount: this.getAccount()
    };
    let res = await getPetList(params);
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