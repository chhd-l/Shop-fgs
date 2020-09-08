import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
import {  Link } from 'react-router-dom'
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
                        <h2 className="bold mb-10">HEADLINE: FAQ Versand</h2>
                        <p className="mb-50">Hier finden Sie Informationen rund um den Versand unseres Online-Shops. Falls Sie weitere Fragen haben, wenden Sie sich gerne an unser <Link to="/help" className="underline" >Expertenteam</Link>.</p>

                        <h2 className="bold mb-10">Welche Versandkosten kommen bei Bestellungen auf mich zu?</h2>
                        <p className="mb-20">Gemeinsam für die Umwelt: Aus Gründen der Nachhaltigkeit möchten wir umdenken und sowohl die Menge an Verpackungsmaterialien, als auch die Wege des Logistikherstellers deutlich reduzieren. Folglich wird bei einer Bestellung unter einem Bestellwert von 15,00 € ein Nachhaltigkeitsbeitrag von 3,99 € berechnet.</p>

                        <h2 className="bold mb-10">Mit welchem Paketdienstleister werden die Produkte versandt?</h2>
                        <p className="mb-20">ROYAL CANIN versendet Produkte mit dem Paketdienstleister DPD.</p>

                        <h2 className="bold mb-10">Wie lange dauert der Versand meiner Bestellung?</h2>
                        <p className="mb-20">Normalerweise erhalten Sie Ihre Produkte 1-4 Werktage nachdem Sie Ihre Bestellung aufgegeben haben.</p>

                        <h2 className="bold mb-10">Kann ich eine alternative Lieferadresse angeben?</h2>
                        <p className="mb-20">Sie haben im Check-Out Prozess die Möglichkeit zwischen Rechnungs- und Lieferadresse zu unterscheiden.</p>

                        <h2 className="bold mb-10">Kann ich eine Bestellung ins Ausland versenden?</h2>
                        <p className="mb-20">Aktuell ist eine Bestellung ins Ausland nicht möglich.</p>

                        <h2 className="bold mb-10">Wo ist meine Bestellung?</h2>
                        <p className="mb-20">Bei Bestellung in unserem Online-Shop erhalten Sie eine Paketnummer von unserem Paketdienstleister DPD. Mit Hilfe dieser Nummer können Sie unter <a href="www.dpd.de" className="underline link">www.dpd.de </a>Ihre Bestellung verfolgen.</p>

                        <h2 className="bold mb-10">Wie kann ich meine Bestellung zurückgeben?</h2>
                        <p className="mb-20">Für Anfragen zur Retoure wenden Sie sich bitte an unser Reklamations-Team unter der Telefonnummer: +49(0) 221 937060 610.Frisst ihr Tier Ihre gekaufte Nahrung nicht? Dann informieren Sie sich über unsere <a href="https://www.royalcanin.com/de/about-us/acceptance-guarantee" className="underline">Akzeptanzgarantie</a>. </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(FAQVersand);
