import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import "./index.less"

class FAQVersand extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="rc-layout-container rc-one-column footer-link2">
                <div className="rc-column">
                    <div className="margin-auto">
                        <h2 className="bold line-height50">HEADLINE: FAQ Versand</h2>
                        <p className="mb"><span className="bold">Text:</span>Hier finden Sie Informationen rund um den Versand unseres Online-Shops. Falls Sie weitere Fragen haben, wenden Sie sich gerne an unser Expertenteam.</p>

                        <h2 className="bold line-height50">Welche Versandkosten kommen bei Bestellungen auf mich zu?</h2>
                        <p>Gemeinsam für die Umwelt: Aus Gründen der Nachhaltigkeit möchten wir umdenken und sowohl die Menge an Verpackungsmaterialien, als auch die Wege des Logistikherstellers deutlich reduzieren. Folglich wird bei einer Bestellung unter einem Bestellwert von 15,00 € ein Nachhaltigkeitsbeitrag von 3,99 € berechnet.</p>

                        <h2 className="bold line-height50">Mit welchem Paketdienstleister werden die Produkte versandt?</h2>
                        <p>ROYAL CANIN versendet Produkte mit dem Paketdienstleister DPD.</p>

                        <h2 className="bold line-height50">Wie lange dauert der Versand meiner Bestellung?</h2>
                        <p>Normalerweise erhalten Sie Ihre Produkte 1-4 Werktage nachdem Sie Ihre Bestellung aufgegeben haben.</p>

                        <h2 className="bold line-height50">Kann ich eine alternative Lieferadresse angeben?</h2>
                        <p>Sie haben im Check-Out Prozess die Möglichkeit zwischen Rechnungs- und Lieferadresse zu unterscheiden.</p>

                        <h2 className="bold line-height50">Kann ich eine Bestellung ins Ausland versenden?</h2>
                        <p>Aktuell ist eine Bestellung ins Ausland nicht möglich.</p>

                        <h2 className="bold line-height50">Wo ist meine Bestellung?</h2>
                        <p>Bei Bestellung in unserem Online-Shop erhalten Sie eine Paketnummer von unserem Paketdienstleister DPD. Mit Hilfe dieser Nummer können Sie unter www.dpd.de Ihre Bestellung verfolgen.</p>

                        <h2 className="bold line-height50">Wie kann ich meine Bestellung zurückgeben?</h2>
                        <p>Für Anfragen zur Retoure wenden Sie sich bitte an unser Reklamations-Team unter der Telefonnummer: +49(0) 221 937060 610.Frisst ihr Tier Ihre gekaufte Nahrung nicht? Dann informieren Sie sich über unsere Akzeptanzgarantie. </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(FAQVersand);
