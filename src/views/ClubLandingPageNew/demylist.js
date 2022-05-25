import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import Logo from '../../components/Logo';
import online1 from './deimage/onlinepic1.png';
import online2 from './deimage/onlinepic2.png';
import online3 from './deimage/onlinepic3.png';
import online4 from './deimage/onlinepic4.png';

const DeMyList = () => {
  const [showCur1, setShowCur1] = useState(false);
  const [showCur2, setShowCur2] = useState(false);
  const [showCur3, setShowCur3] = useState(false);
  const [showCur4, setShowCur4] = useState(false);

  return (
    <>
      <dl
        data-toggle-group=""
        data-toggle-effect="rc-expand--vertical"
        className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
        // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
      >
        <div className="experience-region experience-questions">
          <div
            className={`rc-list__accordion-item test-color
                                  `}
          >
            <div
              className="rc-list__header"
              style={{
                display: 'flex',
                padding: '1rem 2.5rem 1rem 0.5rem',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p>
                  Auswahl aus dem gesamten VET Diäten Sortiment von ROYAL CANIN®
                </p>
              </div>

              <span
                className={`rc-vertical-align icon-change ${
                  showCur1 === false
                    ? 'rc-icon rc-down rc-iconography'
                    : 'rc-icon rc-up rc-brand1'
                }`}
                style={{ right: '1rem', height: '28px' }}
                onClick={() => {
                  setShowCur1(!showCur1);
                }}
              ></span>
            </div>
            {showCur1 ? (
              <div
                className={`rc-list__content flex`}
                style={{ justifyContent: 'space-between' }}
              >
                <div>
                  <p>
                    Cette alimentation sur mesure est fabriquée selon la
                    recommandation de votre vétérinaire. Sa formulation est
                    adaptée au fil du temps, selon l'évolution des besoins de
                    votre animal.
                  </p>
                </div>
                <LazyLoad>
                  <img src={online1} />
                </LazyLoad>
              </div>
            ) : null}
          </div>
          <div
            className={`rc-list__accordion-item test-color
                                 `}
          >
            <div
              className="rc-list__header "
              style={{
                display: 'flex',
                padding: '1rem 2.5rem 1rem 0.5rem',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p>Direkter Kontakt zu unserem Service-Team</p>
              </div>

              <span
                className={`rc-vertical-align icon-change ${
                  showCur2 === false
                    ? 'rc-icon rc-down rc-iconography'
                    : 'rc-icon rc-up rc-brand1'
                }`}
                style={{ right: '1rem', height: '28px' }}
                onClick={() => {
                  setShowCur2(!showCur2);
                }}
              ></span>
            </div>
            {showCur2 ? (
              <div
                className={`rc-list__content flex`}
                style={{ justifyContent: 'space-between' }}
              >
                <div>
                  <p>
                    Unser erfahrenes Service-Team steht Ihnen bei Fragen rund um
                    den Bestellprozess oder unsere Nahrungen gerne persönlich
                    mit Rat und Tat zur Seite.
                  </p>
                </div>
                <LazyLoad>
                  <img src={online2} />
                </LazyLoad>
              </div>
            ) : null}
          </div>
          <div
            className={`rc-list__accordion-item test-color
                                  `}
          >
            <div
              className="rc-list__header"
              style={{
                display: 'flex',
                padding: '1rem 2.5rem 1rem 0.5rem',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p>Regelmäßige Lieferung</p>
              </div>

              <span
                className={`rc-vertical-align icon-change ${
                  showCur3 === false
                    ? 'rc-icon rc-down rc-iconography'
                    : 'rc-icon rc-up rc-brand1'
                }`}
                style={{ right: '1rem', height: '28px' }}
                onClick={() => {
                  setShowCur3(!showCur3);
                }}
              ></span>
            </div>
            {showCur3 ? (
              <div
                className={`rc-list__content flex`}
                style={{ justifyContent: 'space-between' }}
              >
                <div>
                  <p>
                    Profitieren Sie von unserem flexiblen Angebot der
                    regelmäßigen Lieferung und sparen Sie 10% auf alle Ihre
                    Bestellungen!
                  </p>
                </div>
                <LazyLoad>
                  <img
                    src={online3}
                    style={{ width: '80%', transform: 'translateX(6vw)' }}
                  />
                </LazyLoad>
              </div>
            ) : null}
          </div>
          <div
            className={`rc-list__accordion-item test-color
                                  `}
          >
            <div
              className="rc-list__header"
              style={{
                display: 'flex',
                padding: '1rem 2.5rem 1rem 0.5rem',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p>Schneller und kostenloser Versand</p>
              </div>

              <span
                className={`rc-vertical-align icon-change ${
                  showCur4 === false
                    ? 'rc-icon rc-down rc-iconography'
                    : 'rc-icon rc-up rc-brand1'
                }`}
                style={{ right: '1rem', height: '28px' }}
                onClick={() => {
                  setShowCur4(!showCur4);
                }}
              ></span>
            </div>
            {showCur4 ? (
              <div
                className={`rc-list__content flex`}
                style={{ justifyContent: 'space-between' }}
              >
                <div>
                  <p>
                    Bestellungen im ROYAL CANIN® Shop sind frei von
                    Versandkosten oder Mindestbestellmengen. Dazu liefern wir
                    Ihre bestellte Nahrung bei Lagerbestand innerhalb von 1-3
                    Werktagen!
                  </p>
                </div>
                <LazyLoad>
                  <img src={online4} />
                </LazyLoad>
              </div>
            ) : null}
          </div>
        </div>
      </dl>
    </>
  );
};

export default DeMyList;
