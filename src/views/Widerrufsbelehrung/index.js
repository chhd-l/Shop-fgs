import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFaq } from '../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import './index.less';

const localItemRoyal = window.__.localItemRoyal;

class Widerrufsbelehrung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFAQ: [],
            // 当前展开的FAQ
            showCur: -1,
            loading: true
        };
    }
    componentWillUnmount() {
        localItemRoyal.set('isRefresh', true);
    }
    componentDidMount() {
        // if (localItemRoyal.get('isRefresh')) {
        //   localItemRoyal.remove('isRefresh');
        //   window.location.reload();
        //   return false;
        // }
        window.scrollTo({ top: 0 });
        getFaq({
            language: process.env.REACT_APP_LANG,
            storeId: process.env.REACT_APP_STOREID
        })
            .then((res) => {
                this.setState(
                    {
                        dataFAQ: res.context,
                        loading: false
                    },
                    () => {
                        console.log(111, this.props)
                        const widget = document.querySelector(
                            `#${this.props.match.params.catogery}`
                        );
                        if (widget) {
                            setTimeout(() => {
                                window.scrollTo({ top: widget.offsetTop - 90 });
                            });
                        }
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    }
    getElementToPageTop(el) {
        if (el.parentElement) {
            return this.getElementToPageTop(el.parentElement) + el.offsetTop;
        }
        return el.offsetTop;
    }
    handleSelect(index) {
        if (index === this.state.showCur) {
            this.setState({
                showCur: -1
            });
        } else {
            this.setState({
                showCur: index
            });
        }
    }

    render(h) {
        const event = {
            page: {
                type: 'Content',
                theme: ''
            }
        };
        return (
            <div>
                <GoogleTagManager additionalEvents={event} />
                <Header history={this.props.history} match={this.props.match} />
                <main className="rc-content--fixed-header rc-bg-colour--brand3">
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

                        <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" class="">
                            <div class="rc-list__accordion-item">
                                <dt>
                                    <button class="rc-list__header" id="heading-73" data-toggle="content-73" data-js-open="true">Widerrufsrecht </button>
                                </dt>
                                <dd class="rc-list__content" id="content-73" aria-labelledby="heading-73">
                                    <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen haben bzw. hat. </p>
                                    <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring 2, 50674 Köln, Tel.: +49 (0) 221 937060-610 Fax: +49 (0) 221 937060-800) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist oder wie unten in Ziffer 8.3 beschrieben vorgehen.  </p>
                                </dd>
                            </div>
                            <div class="rc-list__accordion-item">
                                <dt>
                                    <button class="rc-list__header" id="heading-250" data-toggle="content-250">Der Widerruf ist zu richten an </button>
                                </dt>
                                <dd class="rc-list__content" id="content-250" aria-labelledby="heading-250">
                                    <p>ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring 2, 50674 Köln</p>
                                    <p>Die Rücksendung hat zu erfolgen an: </p>
                                    <p>Royal Canin, Alfred-Nobel-Straße 21, 50226 Frechen </p>
                                    <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
                                </dd>
                            </div>
                            <div class="rc-list__accordion-item">
                                <dt>
                                    <button class="rc-list__header" id="heading-529" data-toggle="content-529">Folgen des Widerrufs </button>
                                </dt>
                                <dd class="rc-list__content" id="content-529" aria-labelledby="heading-529">
                                    <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.</p>
                                    <p>
                                        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
                                    </p>
                                </dd>
                            </div>
                            <div class="rc-list__accordion-item">
                                <dt>
                                    <button class="rc-list__header" id="heading-530" data-toggle="content-530">Muster-Widerrufsformular</button>
                                </dt>
                                <dd class="rc-list__content" id="content-530" aria-labelledby="heading-530">
                                    <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.) </p>
                                    <p>– An ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring 2, 50674 Köln</p>
                                    <p>Tel.: +49 (0) 221 937060-610, Fax: +49 (0) 221 937060-800</p>
                                    <p>– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)</p>
                                    <p>– Bestellt am (*)/erhalten am (*)</p>
                                    <p>– Name des/der Verbraucher(s)</p>
                                    <p>– Anschrift des/der Verbraucher(s)</p>
                                    <p>– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
                                    <p>– Datum</p>
                                    <p>(*) Unzutreffendes streichen.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Widerrufsbelehrung;
