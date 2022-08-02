import React from 'react';
import './index.less';
import { EMAIL_REGEXP } from '@/utils/constant';
import { Button } from '@/components/Common';
import { inject, observer } from 'mobx-react';
import { postUpdateUser, getAppointByApptNo } from '@/api/felin';

// felin补全用户信息弹框
@inject('loginStore')
@observer
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      params: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      emailShow: true
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    const { appointNo } = this.props;
    if (appointNo) {
      if (this.isLogin) {
        this.getDeatalData();
        this.setState({
          params: {
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            email: this.userInfo.email,
            phone: this.userInfo.phone
          }
        });
      }
    }
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  async getDeatalData() {
    const { context } = await getAppointByApptNo({
      apptNo: this.props.appointNo
    });
    if (
      !context.consumerFirstName ||
      !context.consumerEmail ||
      !context.consumerLastName ||
      !context.consumerName ||
      !context.consumerPhone
    ) {
      this.setState({
        visible: true
      });
    }
  }

  onChange = (e, key) => {
    this.setState({
      params: {
        ...this.state.params,
        [key]: e.target.value
      }
    });
    if (key === 'email') {
      let show = EMAIL_REGEXP.test(e.target.value);
      this.setState({
        emailShow: show
      });
    }
  };

  async handleConfirm() {
    if (!this.userInfo) return;
    const { params } = this.state;
    await postUpdateUser({
      apptNo: this.props.appointNo,
      consumerName: params.firstName + ' ' + params.lastName,
      consumerFirstName: params.firstName,
      consumerLastName: params.lastName,
      consumerEmail: params.email,
      consumerPhone: params.phone
    });
    this.setState({
      visible: false
    });
  }

  render() {
    const { userInfo } = this;
    const { children } = this.props;
    const { visible } = this.state;
    return visible ? (
      <div>
        <div className="modal-box"></div>
        <div className="my-models">
          {children}
          <div className="input-box">
            <input
              disabled={userInfo.firstName}
              type="text"
              autoComplete="off"
              className="my-input"
              placeholder="FirstName"
              value={this.state.params.firstName}
              name="firstName"
              onChange={(e) => this.onChange(e, 'firstName')}
            />
            <input
              disabled={userInfo.lastName}
              type="text"
              autoComplete="off"
              className="my-input"
              placeholder="LastName"
              name="LastName"
              value={this.state.params.lastName}
              onChange={(e) => this.onChange(e, 'lastName')}
            />
          </div>
          <div className="input-box">
            <input
              disabled={userInfo.email}
              type="email"
              className="my-input"
              placeholder="Email"
              name="Email"
              value={this.state.params.email}
              onChange={(e) => this.onChange(e, 'email')}
            />
            <input
              disabled={userInfo.phone}
              type="text"
              autoComplete="off"
              maxLength="11"
              className="my-input"
              placeholder="Phone"
              name="Phone"
              value={this.state.params.phone}
              onChange={(e) => this.onChange(e, 'phone')}
            />
          </div>
          {!this.state.emailShow ? (
            <div className="col-red">
              L'adresse e-mail ne correspond pas au format spécifié.
            </div>
          ) : null}
          <div className="text-center">
            <Button
              onClick={this.handleConfirm}
              disabled={
                !this.state.params.firstName ||
                !this.state.params.lastName ||
                !this.state.params.email ||
                !this.state.params.phone ||
                !this.state.emailShow
              }
              type="primary"
              className="rc-margin-bottom--xs"
              style={{
                width: '16.875rem',
                marginTop: '1.25rem'
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default MyModal;
