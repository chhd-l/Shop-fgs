import React from 'react';
import './index.less';
import yes from '../image/yes.png';
import no from '../image/no.png';
import { Link } from 'react-router-dom';
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
      let show = EMAIL_REGEXP.test(e.target.value);
      this.setState({
        emailShow: show
      });
    }
  };
  render() {
    const { visible, children, handleUpdate } = this.props;
    return (
      <div
        className="my-models"
        style={{ display: visible ? 'block' : 'none' }}
      >
        {children}
        <div className="input-box">
          <input
            type="text"
            className="my-input"
            placeholder="Prénom"
            value={this.state.params.firstName}
            onChange={(e) => this.onChange(e, 'firstName')}
            name="firstName"
          />
          <input
            type="text"
            className="my-input"
            placeholder="Nom"
            value={this.state.params.lastName}
            onChange={(e) => this.onChange(e, 'lastName')}
            name="lastName"
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            className="my-input"
            placeholder="Email"
            value={this.state.params.email}
            onChange={(e) => this.onChange(e, 'email')}
            name="email"
          />
          <input
            type="text"
            maxLength="11"
            className="my-input"
            placeholder="Téléphone"
            value={this.state.params.phone}
            onChange={(e) => this.onChange(e, 'phone')}
            name="phone"
          />
        </div>
        {!this.state.emailShow ? (
          <div className="col-red">
            L'adresse e-mail ne correspond pas au format spécifié.
          </div>
        ) : null}
        <div className="cursor-pointer mt20" onClick={this.handleok}>
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
          <span style={{ fontSize: '15px' }}>
            Je confirme avoir lu et accepter les{' '}
            <Link to="/latelier/felin-terms-conditions" target="_blank">
              <span
                style={{
                  fontSize: '0.9375rem',
                  textDecoration: 'underline'
                }}
              >
                conditions générales de réservation
              </span>
            </Link>
          </span>
        </div>
        <div className="text-center">
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
              width: '16.875rem',
              marginTop: '1.25rem'
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    );
  }
}

export default MyModal;
