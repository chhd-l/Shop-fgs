import React, { Component } from 'react';
import Modal from '@/components/Modal';
import { inject, observer } from 'mobx-react';
import './css/LimitLoginModal.less';
import bgImg from '@/assets/images/bg-modal-header.png';

const headerStyle = {
  background: '#D81E07',
  backgroundImage: 'url(' + bgImg + ')',
  backgroundSize: '100% 100%',
  color: '#fff'
};
const buttonStyle = {
  border: '0 none',
  outline: 'none',
  width: '100%',
  height: '40px',
  lineHeight: '40px',
  margin: '10px 40px 50px',
  background: '#D81E07',
  color: '#fff',
  borderRadius: '5px',
  fontSize: '18px'
};

const contentStyle = {
  padding: '10px 30px',
  textAlign: 'justify',
  color: '#C92414',
  fontSize: '18px'
};

@inject('loginStore')
@observer
export default class LimitLoginModal extends Component {
  static defaultProps = {};
  constructor() {
    super();
    this.state = {};
  }
  handelClose = () => {
    this.props.loginStore.changeLimitLoginModal(false);
  };
  confirmBtnFrag() {
    return (
      <button style={buttonStyle} onClick={this.handelClose}>
        ok
      </button>
    );
  }
  contentFrag() {
    return (
      <div style={contentStyle}>
        Maintenance is planned for April 17th, 2021 from 8am-4pm CST.  Checkout
        and account access may be unavailable during this time. Please check
        back after 4pm CST.  We apologize for the inconvenience. Thank you!
      </div>
    );
  }
  render() {
    const { limitLoginModal } = this.props.loginStore;
    return (
      <div className="limitLoginModal">
        <Modal
          visible={limitLoginModal}
          closeButton={false}
          headerCenter={true}
          headerStyle={headerStyle}
          footerCenter={true}
          cancelBtnVisible={false}
          confirmBtnFrag={this.confirmBtnFrag()}
          modalTitle="Important Notice"
        >
          {this.contentFrag()}
        </Modal>
      </div>
    );
  }
}
