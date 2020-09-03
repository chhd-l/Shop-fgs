import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import "./index.less"

class Widerrufsbelehrung extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="rc-layout-container rc-one-column footer-link">
                <div className="rc-column margin-auto">
                    <header>
                        <h1> Widerrufsbelehrung </h1>
                        <p>Verbrauchern steht ein Widerrufsrecht nach folgender Maßgabe zu, wobei Verbraucher jede natürliche Person ist, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können.</p>
                    </header>
                    <main>
                        <h2>Widerrufsrecht</h2>
                        <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
                        <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
                        <div className="main-div">
                            <p>ROYAL CANIN Tiernahrung GmbH & Co. KG</p>
                            <p>Habsburgerring 2</p>
                            <p>50674 Köln</p>
                        </div>
                        <div className="main-div">
                            <p>Telefon: +49 (0) 221 – 937060-0</p>
                            <p>Telefax: +49 (0) 221 – 937060-800</p>
                            <p>E-Mail: <a href="info.de@royalcanin.com" style={{color:'#0000FF',textDecoration:'underline'}}>info.de@royalcanin.com</a></p>
                        </div>
                        <div className="main-div">
                            <p>Sitz: Köln Handelsregister B 14789</p>
                            <p>Geschäftsführer: Charles Nuez, Michael Kunze </p>
                        </div>
                        <p>
                            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
                    </p>
                        <p>
                            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                    </p>
                        <h2>
                            Folgen des Widerrufs
                    </h2>
                        <p>
                            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Im Falle der Zahlungsweise „Kreditkarte“ benötigen wir Ihre Bankverbindung. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
                    </p>
                        <p>
                            Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen 14 Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von 14 Tagen absenden.
                    </p>
                        <p>
                            Sie tragen die unmittelbaren Kosten der Rücksendung paketversandfähiger Waren.
                    </p>
                        <p>
                            Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umfang mit ihnen zurückzuführen ist.
                    </p>
                        <h2>
                            Erlöschensgründe
                    </h2>
                        <p>
                            Das Widerrufsrecht erlischt vorzeitig bei Verträgen zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde; zur Lieferung von Waren, wenn diese nach der Lieferung aufgrund ihrer Beschaffenheit untrennbar mit anderen Gütern vermischt wurden.
                    </p>
                        <h2>
                            Muster-Widerrufsformular
                    </h2>
                        <p>
                            Der Widerruf Ihres Vertrages kann mündlich, telefonisch oder in Textform erfolgen. Wollen Sie den Widerruf in Textform ausüben, so hat der Gesetzgeber den nachfolgenden Formulartext empfohlen, welcher allerdings für Sie nicht verbindlich ist, so dass Sie Ihren Widerruf auch in anderer Form mit der entsprechenden Bestimmtheit der Widerrufsaussage vornehmen können.
                    </p>
                        <p>
                            Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.
                    </p>
                    </main>
                    <footer>
                        <ul>
                            <li>
                                <dl>
                                    <dt>1. An</dt>
                                    <dd>ROYAL CANIN Tiernahrung GmbH & Co. KG</dd>
                                    <dd>Postfach 103045</dd>
                                    <dd>50470 Köln</dd>
                                </dl>
                                <ul>
                                    <li>Telefon: +49 (0) 221 – 937060-0</li>
                                    <li>Telefax: +49 (0) 221 – 937060-800</li>
                                    <li>E-Mail: <a href="info.de@royalcanin.com">info.de@royalcanin.com</a></li>
                                </ul>
                            </li>
                            <li>
                                <div className="italic">
                                    2. Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren / die Erbringung der folgenden Dienstleistung:
                                </div>
                                <div>
                                    ………………………………………………………………..
                                </div>
                                <div>
                                    ………………………………………………………………..
                                </div>
                                <div className="italic">
                                    (Name der Ware, ggf. Bestellnummer und Preis)
                                </div>
                            </li>
                            <li className="d-flex">
                                <div className="d-flex column pr-5">
                                    <span className="italic">3. Bestellt am:</span>
                                    <span className="line-height50">………………… </span>
                                    <span>(Datum)</span>
                                </div>
                                <div className="d-flex column">
                                    <span className="italic">4. Erhalten am:</span>
                                    <span className="line-height50">………………… </span>
                                    <span>(Datum)</span>
                                </div>
                            </li>
                            <li>
                                <div className="italic">5.(Name, Anschrift des Verbrauchers)</div>
                                <div className="line-height50">..........……………………………..</div>
                                <div className="line-height50">..........……………………………..</div>
                                <div className="line-height50">..........……………………………..</div>
                                <div className="line-height50">..........……………………………..</div>
                            </li>
                            <li>
                                <div className="italic">6. Datum</div>
                                <div>..........……………………………..</div>
                            </li>
                            <li>
                                <div className="italic">7. Unterschrift Kunde</div>
                                <div className="italic">(nur bei Mitteilung auf Papier)</div>
                            </li>
                        </ul>
                    </footer>
                </div>
            </div>
        );
    }
}

export default injectIntl(Widerrufsbelehrung);
