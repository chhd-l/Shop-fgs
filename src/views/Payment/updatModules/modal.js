import React from 'react';
import './index.less';
import { EMAIL_REGEXP } from '@/utils/constant';

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
  }

  componentDidMount() {
    this.setState({
      params: {
        firstName: this.props.userInfo.firstName,
        lastName: this.props.userInfo.lastName,
        email: this.props.userInfo.email,
        phone: this.props.userInfo.phone
      }
    });
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
  render() {
    const { visible, children, handleUpdate, userInfo } = this.props;
    return (
      <div style={{ display: visible ? 'block' : 'none' }}>
        <div className="modal-box"></div>
        <div className="my-models">
          {children}
          <div className="input-box">
            <input
              disabled={userInfo.firstName}
              type="text"
              autocomplete="off"
              className="my-input"
              placeholder="FirstName"
              value={this.state.params.firstName}
              name="firstName"
              onChange={(e) => this.onChange(e, 'firstName')}
            />
            <input
              disabled={userInfo.lastName}
              type="text"
              autocomplete="off"
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
              autocomplete="off"
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
            <button
              onClick={() => handleUpdate(this.state.params)}
              disabled={
                !this.state.params.firstName ||
                !this.state.params.lastName ||
                !this.state.params.email ||
                !this.state.params.phone ||
                !this.state.emailShow
              }
              className="rc-btn rc-btn--one  rc-margin-bottom--xs"
              style={{
                width: '16.875rem',
                marginTop: '1.25rem'
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyModal;
