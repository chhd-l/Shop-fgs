import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Link } from 'react-router-dom';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

@seoHoc()
class Widerrufsbelehrung extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前展开的FAQ
      showCur: -1,
      loading: true
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    window.scrollTo({ top: 0 });
  }

  render() {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            style={{ maxWidth: '70%' }}
          >
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h1 style={{ textAlign: 'center' }}>
                        Widerrufsbelehrung
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <dl
              data-toggle-group=""
              data-toggle-effect="rc-expand--vertical"
              className=""
            >
              <div className="rc-list__accordion-item">
                <dt>
                  <button
                    className="rc-list__header"
                    id="heading-73"
                    data-toggle="content-73"
                    data-js-open="true"
                  >
                    Widerrufsrecht{' '}
                  </button>
                </dt>
                <dd
                  className="rc-list__content"
                  id="content-73"
                  aria-labelledby="heading-73"
                >
                  <p>
                    Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                    Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist
                    beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von
                    Ihnen benannter Dritter, der nicht der Beförderer ist, die
                    letzte Ware in Besitz genommen haben bzw. hat.{' '}
                  </p>
                  <p>
                    Sie könenn dafür das Muster-Wiederrufsformular unten
                    verwenden, das jedoch nicht vorgeschrieben ist. Alternativ
                    gehen Sie bitte vor wie in Ziffer 8.3 der{` `}
                    <Link
                      className="rc-styled-link"
                      to="/Terms-And-Conditions"
                    >{` allgemeinen Geschäftsbedingungen `}</Link>
                    {` `}
                    beschrieben.{' '}
                  </p>
                </dd>
              </div>
              <div className="rc-list__accordion-item">
                <dt>
                  <button
                    className="rc-list__header"
                    id="heading-250"
                    data-toggle="content-250"
                  >
                    Der Widerruf ist zu richten an{' '}
                  </button>
                </dt>
                <dd
                  className="rc-list__content"
                  id="content-250"
                  aria-labelledby="heading-250"
                >
                  <p>
                    ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring 2,
                    50674 Köln
                  </p>
                  <p>Die Rücksendung hat zu erfolgen an: </p>
                  <p>Royal Canin, Alfred-Nobel-Straße 21, 50226 Frechen </p>
                  <p>
                    Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
                    Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf
                    der Widerrufsfrist absenden.
                  </p>
                </dd>
              </div>
              <div className="rc-list__accordion-item">
                <dt>
                  <button
                    className="rc-list__header"
                    id="heading-529"
                    data-toggle="content-529"
                  >
                    Folgen des Widerrufs{' '}
                  </button>
                </dt>
                <dd
                  className="rc-list__content"
                  id="content-529"
                  aria-labelledby="heading-529"
                >
                  <p>
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                    Zahlungen, die wir von Ihnen erhalten haben, einschließlich
                    der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die
                    sich daraus ergeben, dass Sie eine andere Art der Lieferung
                    als die von uns angebotene, günstigste Standardlieferung
                    gewählt haben), unverzüglich und spätestens binnen vierzehn
                    Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
                    Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für
                    diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
                    Sie bei der ursprünglichen Transaktion eingesetzt haben, es
                    sei denn, mit Ihnen wurde ausdrücklich etwas anderes
                    vereinbart; in keinem Fall werden Ihnen wegen dieser
                    Rückzahlung Entgelte berechnet. Wir können die Rückzahlung
                    verweigern, bis wir die Waren wieder zurückerhalten haben
                    oder bis Sie den Nachweis erbracht haben, dass Sie die Waren
                    zurückgesandt haben, je nachdem, welches der frühere
                    Zeitpunkt ist.
                  </p>
                  <p>
                    Sie haben die Waren unverzüglich und in jedem Fall
                    spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns
                    über den Widerruf dieses Vertrags unterrichten, an uns
                    zurückzusenden oder zu übergeben. Die Frist ist gewahrt,
                    wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
                    absenden. Sie tragen die unmittelbaren Kosten der
                    Rücksendung der Waren. Sie müssen für einen etwaigen
                    Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust
                    auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
                    Funktionsweise der Waren nicht notwendigen Umgang mit ihnen
                    zurückzuführen ist.
                  </p>
                </dd>
              </div>
              <div className="rc-list__accordion-item">
                <dt>
                  <button
                    className="rc-list__header"
                    id="heading-530"
                    data-toggle="content-530"
                  >
                    Muster-Widerrufsformular
                  </button>
                </dt>
                <dd
                  className="rc-list__content"
                  id="content-530"
                  aria-labelledby="heading-530"
                >
                  <p>
                    (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie
                    bitte dieses Formular aus und senden Sie es zurück.){' '}
                  </p>
                  <p>
                    – An ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring
                    2, 50674 Köln
                  </p>
                  <p>
                    Tel.: +49 (0) 221 937060-650, Fax: +49 (0) 221 937060-820
                    oder per E-Mail an service.de@royalcanin.com
                  </p>
                  <p>
                    – Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                    abgeschlossenen Vertrag über den Kauf der folgenden Waren
                    (*)
                  </p>
                  <p>– Bestellt am (*)/erhalten am (*)</p>
                  <p>– Name des/der Verbraucher(s)</p>
                  <p>– Anschrift des/der Verbraucher(s)</p>
                  <p>
                    – Unterschrift des/der Verbraucher(s) (nur bei Mitteilung
                    auf Papier)
                  </p>
                  <p>– Datum</p>
                  <p>(*) Unzutreffendes streichen.</p>
                </dd>
              </div>
            </dl>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default Widerrufsbelehrung;
