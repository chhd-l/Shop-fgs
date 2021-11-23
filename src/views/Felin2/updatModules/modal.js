import React from 'react';
import './index.less';
import yes from '../image/yes.png';
import no from '../image/no.png';

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

  handleok = () => {
    this.setState({
      visible: !this.state.visible
    });
  };
  onChange = (e, key) => {
    this.setState({
      params: {
        ...this.state.params,
        [key]: e.target.value
      }
    });
    if (key === 'email') {
      var emailReg = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
      let show = emailReg.test(e.target.value);
      this.setState({
        emailShow: show
      });
    }
  };
  render() {
    const { visible, children, handleUpdate } = this.props;
    return (
      <div className="my-model" style={{ display: visible ? 'block' : 'none' }}>
        {children}
        <div style={{ padding: '0 3.75rem' }} className="input-box">
          <input
            type="text"
            className="my-input"
            placeholder="FirstName"
            value={this.state.params.firstName}
            onChange={(e) => this.onChange(e, 'firstName')}
          />
          <input
            type="text"
            className="my-input"
            placeholder="LastName"
            value={this.state.params.lastName}
            onChange={(e) => this.onChange(e, 'lastName')}
          />
        </div>
        <div style={{ padding: '0 3.75rem' }} className="input-box mt50">
          <input
            type="email"
            className="my-input"
            placeholder="Email"
            value={this.state.params.email}
            onChange={(e) => this.onChange(e, 'email')}
          />
          <input
            type="text"
            maxLength="11"
            className="my-input"
            placeholder="Phone"
            value={this.state.params.phone}
            onChange={(e) => this.onChange(e, 'phone')}
          />
        </div>
        {!this.state.emailShow ? (
          <div style={{ padding: '0 3.75rem' }} className="col-red">
            L'adresse e-mail ne correspond pas au format spécifié.
          </div>
        ) : null}
        <div
          style={{ padding: '0 3.75rem' }}
          className="mt50 cursor-pointer"
          onClick={this.handleok}
        >
          <img
            src={yes}
            alt=""
            style={{ display: this.state.visible ? 'block' : 'none' }}
            className="mr20"
          />
          <img
            src={no}
            alt=""
            style={{ display: !this.state.visible ? 'block' : 'none' }}
            className="mr20"
          />
          <span>dsadsadsddsaxxxxxx</span>
        </div>
        <div style={{ padding: '0 3.75rem' }} className="mt50 text-center">
          <button
            onClick={() => handleUpdate(this.state.params)}
            disabled={
              !this.state.visible ||
              !this.state.params.firstName ||
              !this.state.params.lastName ||
              !this.state.params.email ||
              !this.state.params.phone ||
              !this.state.emailShow
            }
            className="rc-btn rc-btn--one  rc-margin-bottom--xs"
            style={{
              width: '16.875rem'
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default MyModal;
