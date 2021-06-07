import React from 'react';
import LazyLoad from 'react-lazyload';
import line from '../../deimage/Line@4x.png';

const StoreCode = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile ">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center">
                <div>
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    Empfehlungscode Ihrer Tierarztpraxis
                  </h4>
                </div>
                <p style={{ margin: '0' }}>
                  Um eine Bestellung in unserem Shop zu tätigen, benötigen Sie
                  einen individuellen
                </p>
                <p style={{ margin: '0' }}>
                  <a style={{ fontWeight: 'bolder' }}>
                    Empfehlungscode Ihrer Tierarztpraxis
                  </a>
                  . So können wir sicherstellen, dass Ihrem Produktkauf
                </p>
                <p style={{ margin: '0' }}>
                  eine fachgerechte Empfehlung vorausgeht.
                </p>
              </div>

              <div
                style={{ display: 'flex', justifyContent: 'center' }}
                className="deflexcolumn"
              >
                <div>
                  <p style={{ fontWeight: 'bolder' }}>
                    Bitte geben Sie Ihren individuellen Empfehlungscode ein:
                  </p>
                  <div style={{ display: 'flex' }} className="deflexcolumn">
                    <span className="rc-input rc-input--inline rc-input--label demarginleft">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                      />
                    </span>
                    <button
                      className="rc-btn rc-btn--one"
                      style={{ marginTop: '3vh' }}
                    >
                      Code speichern
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: '2vw',
                    marginRight: '3vw',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  className="decenter deimagetranslate"
                >
                  <LazyLoad>
                    <img src={line} style={{ height: '10vh' }} />
                  </LazyLoad>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column' }}
                  className="detextcenter"
                >
                  <p style={{ fontWeight: 'bolder' }}>
                    Sie haben noch keinen Empfehlungscode?
                  </p>
                  <p>Fragen Sie bei unseren teilnehmenden Tierärzt*innen.</p>
                  <button className="rc-btn rc-btn--two button20vw">
                    Tierarztpraxen anzeigen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCode;
