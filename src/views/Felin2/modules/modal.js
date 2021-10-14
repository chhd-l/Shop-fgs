import React from 'react';
import './index.less';
import frame from '../image/frame.png';
class MyModal extends React.Component {
  render() {
    const { visible, handleCancel, children } = this.props;
    return (
      <div className="my-model" style={{ display: visible ? 'block' : 'none' }}>
        {children}
        <div style={{ padding: '0 3.75rem' }}>
          <div className="size24 col0" style={{ marginBottom: '1rem' }}>
            Contacter l’Atelier Félin
          </div>
          <div>
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
            X Rue XXX
            <br />
            XXX Paris
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
