import React from 'react';
import './index.less';

class MyModal extends React.Component {
  handleTo(val) {
    if (val === 1) {
      window.open('https://www.facebook.com/RoyalCaninFrance');
    } else {
      window.open('https://www.instagram.com/royalcaninfrance');
    }
  }
  render() {
    const { children } = this.props;
    return (
      <div className="my-model">
        {children}
        <div className="modal-box">
          <div
            className="size24 col0 modal-size"
            style={{ marginBottom: '1rem', paddingTop: '1.25rem' }}
          >
            Informations pratiques
          </div>
          <div className="modeal-cont">
            Contactez-nous pour en savoir plus sur l’Atelier Félin et
            <br />
            notre mission.
            <br />
            <br />
            latelierfelin@royalcanin.com
            <br />
            STILL WAITING
            <br />
            <br />
            142 Bld Saint Germain 75006 PARIS
            <br />
            <br />
            Horaires d’ouverture :<br />
            mar. - ven.: 12:00 - 20:00
            <br />
            sam.: 10:00 - 20:00
            <br />
            dim.: 10:00 - 18:00
          </div>
          <div className="img-link">
            <div className="img1" onClick={() => this.handleTo(1)} />
            <div className="img2" onClick={() => this.handleTo(2)} />
          </div>
        </div>
      </div>
    );
  }
}

export default MyModal;
