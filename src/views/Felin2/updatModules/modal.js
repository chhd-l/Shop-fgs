import React from 'react';
import './index.less';
import yes from '../image/yes.png';
import no from '../image/no.png';
class MyModal extends React.Component {
  render() {
    const { visible, children } = this.props;
    return (
      <div className="my-model" style={{ display: visible ? 'block' : 'none' }}>
        {children}
        <div style={{ padding: '0 3.75rem' }} className="input-box">
          <input type="text" className="my-input" />
          <input type="text" className="my-input" />
        </div>
        <div style={{ padding: '0 3.75rem' }} className="input-box mt50">
          <input type="text" className="my-input" />
          <input type="text" className="my-input" />
        </div>
        <div style={{ padding: '0 3.75rem' }} className="mt50">
          <img src={yes} alt="" />
          <img src={no} alt="" />
        </div>
      </div>
    );
  }
}

export default MyModal;
