import React from 'react';
import './index.less';
import frame from '../image/frame.png';
class MyModal extends React.Component {
  render() {
    const { visible, handleCancel, children } = this.props;
    return (
      <div className="my-model" style={{ display: visible ? 'block' : 'none' }}>
        {children}
        <div className="modal-box">
          <div
            className="size24 col0 modal-size"
            style={{ marginBottom: '1rem' }}
          >
            Contacter l’Atelier Félin
          </div>
          <div className="modeal-cont">
            Contactez-nous pour en savoir plus sur l’Atelier Félin et
            <br />
            notre mission.
            <br />
            <br />
            latelierfelin@royalcanin.com
            <br />
            NUM XXXX
            <br />
            <br />
            142 Bld Saint Germain 75006 PARIS
            <br />
            <br />
            Horaires d’ouverture :<br />
            Mardi - Dimanche, 10h - 20h
          </div>
          <div className="img-link">
            <div className="img1" />
            <div className="img2" />
          </div>
        </div>
      </div>
    );
  }
}

export default MyModal;
