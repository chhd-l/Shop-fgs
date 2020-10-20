import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';

const localItemRoyal = window.__.localItemRoyal;

class TermUse extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  render(h) {
    return (
      <div className="TermsAndConditions">
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2 className="text-center">
                        Allgemeine Geschäftsbedingungen
                        <br />
                        für den Royal Canin Onlineshop
                      </h2>
                    </div>
                  </div>
                </div>
                <p>
                  <div className="mb-2 dark bold">
                    <span className="pr-3">1.</span>Geltungsbereich
                  </div>
                  <div className="pl-4">
                    Diese Allgemeinen Geschäftsbedingungen für den Royal Canin
                    Onlineshop (nachfolgend: „<span className="bold">AGB</span>
                    “) gelten für sämtliche Bestellungen, die über den Royal
                    Canin Onlineshop, aufrufbar unter shop.royalcanin.de
                    (nachfolgend: „<span className="bold">Onlineshop“</span>)
                    erfolgen.
                  </div>
                </p>
                <p>
                  <div className="mb-2 dark bold">
                    <span className="pr-3">2.</span>Vertragspartner und
                    Vertragsschluss
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.1</span>Die über den Onlineshop
                    geschlossenen Verträge werden mit der ROYAL CANIN
                    Tiernahrung GmbH & Co. KG, Habsburgerring 2, 50674 Köln
                    (nachfolgend: „<span className="bold">Royal Canin</span>“),
                    geschlossen.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.2</span>Der Onlineshop richtet sich
                    ausschließlich an Tierhalter*innen, die Verbraucher gem. §
                    13 BGB, also an natürliche Personen, die zu einem Zweck
                    handeln, der weder ihrer gewerblichen noch ihrer
                    selbständigen beruflichen Tätigkeit zugerechnet werden kann
                    (nachfolgend: „
                    <span className="bold">Tierhalter*innen</span>“).
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.3</span>Tierhalter*innen können bei
                    bestimmten Produkten bzw. Produktsegmenten im Onlineshop
                    verbindliche Bestellungen nur dann aufgeben, wenn eine
                    entsprechende Fütterungsempfehlung eines Tierarztes/einer
                    Tierärztin vorliegt, der/die als Partner von Royal Canin an
                    dem Onlineshop teilnimmt. Die Tierhalter*innen können die
                    Fütterungsempfehlung von der empfehlenden Tierärztin / dem
                    empfehlenden Tierarzt per Zahlencode, Link oder QR-Code
                    erhalten. Sie ist nicht übertragbar.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.4</span>Die Darstellung der
                    Produkte im Onlineshop stellt kein bindendes Angebot,
                    sondern einen unverbindlichen Produktkatalog dar.
                    Tierhalter*innen können unsere Produkte zunächst
                    unverbindlich in den Warenkorb legen und die Eingaben vor
                    dem Absenden der verbindlichen Bestellung jederzeit
                    korrigieren, indem sie den „Zurück“-Button ihres Browsers
                    nutzen. Royal Canin stellt den Tierhalter*innen im Rahmen
                    des Bestellablaufs zudem technische Mittel in Form einer
                    üblichen Vollständigkeits- und Plausibilitätskontrolle
                    (Kontrolle, ob auch alle Pflichtfelder befüllt wurden und ob
                    die eingetragenen Zeichen zu dem entsprechenden Pflichtfeld
                    passen) zur Verfügung, mit deren Hilfe die Tierhalter*innen
                    Eingabefehler erkennen können. Durch Anklicken der
                    Schaltfläche „jetzt kaufen“ geben die Tierhalter*innen eine
                    verbindliche Bestellung der im Warenkorb enthaltenen
                    Produkte ab. Die Bestätigung des Eingangs der Bestellung
                    erfolgt per E-Mail. Mit dieser E-Mail-Bestätigung kommt noch
                    kein Kaufvertrag zustande. Ein Kaufvertrag kommt entweder
                    durch eine ausdrückliche Annahme der Bestellung oder durch
                    Versand der bestellten Produkte zustande. Erfolgt die
                    Annahme des Angebots nicht innerhalb von 10 Werktagen, liegt
                    hierin eine Ablehnung des Angebots.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.5</span>Ein bindender Vertrag kann
                    auch bereits zuvor wie folgt zustande kommen:
                    <br />
                    <div className="pl-5 mt-3">
                      - Wenn als Zahlungsart „KlarnaPayLater“, „KlarnaPayNow“
                      oder „Sofort“ gewählt wurde, kommt der Vertrag zum
                      Zeitpunkt der Bestätigung der Zahlungsanweisung an die
                      Klarna Bank AB (publ) zustande.
                    </div>
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.6</span>Die Produkte werden nur in
                    haushaltsüblichen Mengen verkauft. Diese Beschränkung
                    bezieht sich sowohl auf die Anzahl der bestellten Produkte
                    im Rahmen einer Bestellung als auch auf die Anzahl der
                    insgesamt bestellten Produkte bei der Aufgabe mehrerer
                    Bestellungen desselben Produkts.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">2.7</span>Die für den Vertragsschluss
                    zur Verfügung stehende Sprache ist Deutsch. Royal Canin
                    speichert den Vertragstext und sendet den Tierhalter*innen
                    zudem die Bestelldaten und die AGB nach einer Bestellung per
                    E-Mail zu. Die AGB können ferner jederzeit auch über den
                    Onlineshop eingesehen und heruntergeladen werden.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">3.</span>Registrierung und Nutzerkonto
                </div>
                <p>
                  <div>
                    <span className="pr-3">3.1</span>Die Tierhalter*innen können
                    sich ein eigenes Nutzerkonto für den Onlineshop anlegen. Für
                    die Registrierung müssen die Pflichtfelder der für die
                    Registrierung vorgesehenen Anmeldemaske vollständig und
                    korrekt ausgefüllt werden. Zu ihrer Wirksamkeit bedarf die
                    Registrierung der Bestätigung durch Royal Canin. Nach
                    erfolgreicher Registrierung wird für die betreffenden
                    Tierhalter*innen ein Nutzerkonto angelegt, das nicht
                    übertragbar ist.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">3.2</span>Persönliche Zugangsdaten
                    sind vor dem Zugriff durch Dritte geschützt aufzubewahren.
                    Sollten Dritte dennoch Kenntnis von den Zugangsdaten
                    erlangen, müssen die Tierhalter*innen uns dies umgehend
                    melden und ihre Zugangsdaten ändern. Die Tierhalter*innen
                    haben zudem dafür Sorge zu tragen, dass die von ihnen
                    angegebenen Daten dem aktuellen Stand entsprechen. Royal
                    Canin behält sich vor, Nutzerkonten, welche für einen
                    Zeitraum von 12 Monaten inaktiv waren, zu löschen.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">4.</span>Lieferbedingungen und
                  Zahlungsmethoden
                </div>
                <p>
                  <div>
                    <span className="pr-3">4.1</span>Royal Canin liefert nur im
                    Versandweg an die von den Tierhalter*innen angegebene
                    Lieferadresse. Eine andere Versandart, insbesondere eine
                    Selbstabholung der Ware, ist leider nicht möglich. Zu den
                    angegebenen Produktpreisen können noch Versandkosten
                    hinzukommen. Etwaige Versandkosten werden bei der
                    Darstellung der Produkte angegeben [und sind unter
                    https://shopstg.royalcanin.com/FAQ/catogery-0 einsehbar].
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">4.2</span>Im Royal Canin Onlineshop
                    stehen den Tierhalter*innen folgende Zahlungsarten zur
                    Verfügung: <br />
                    <div className="pl-5 mt-3">
                      - Kreditkarte: Die Belastung der Kreditkarte erfolgt zu
                      dem Zeitpunkt, zu dem Royal Canin Bestellung annimmt.
                    </div>
                    <div className="pl-5 mt-3">
                      - Klarna: In Kooperation mit Klarna Bank AB (publ) ,
                      Sveavägen 46, 111 34 Stockholm, Schweden (nachfolgend
                      „Klarna“), bietet Royal Canin die folgenden
                      Zahlungsoptionen an, wobei die Zahlung erfolgt jeweils an
                      Klarna erfolgt.
                    </div>
                    <div className="pl-5 mt-3">
                      <div className="pl-5 mt-3">
                        ○ (Wenn Sie den Vertrag widerrufen wollen, dann füllen
                        Sie bitte dieses Formular aus und senden Sie es zurück.)
                        Kauf auf Rechnung: Die Zahlungsfrist beträgt 14 Tage ab
                        Versand der Ware. Die vollständigen Rechnungsbedingungen
                        für die Länder in denen diese Zahlart verfügbar ist
                        finden sich hier: Deutschland [etc.].
                      </div>
                      <div className="pl-5 mt-3">
                        ○ Ratenkauf: Mit dem Finanzierungsservice von Klarna
                        können die Tierhalter*innen ihren Einkauf in festen oder
                        flexiblen monatlichen Raten zu den in der Kasse
                        angegebenen Bedingungen bezahlen. Die Ratenzahlung ist
                        jeweils zum Ende des Monats nach Übersendung einer
                        Monatsrechnung durch Klarna fällig. Weitere
                        Informationen zum Ratenkauf einschließlich der
                        Allgemeinen Geschäftsbedingungen und der europäischen
                        Standardinformationen für Verbraucherkredite für die
                        Länder, in denen diese Zahlart verfügbar ist, sind hier
                        einsehbar: Deutschland [etc.].
                      </div>
                      <div className="pl-5 mt-3">
                        ○ Sofort bezahlen: Hier erfolgt die Belastung des
                        angegebenen Kontos unmittelbar nach Abgabe der
                        Bestellung.
                      </div>
                    </div>
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">5.</span>Eigentumsvorbehalt
                </div>
                <p>
                  <div>
                    <span className="pr-4"></span>Bis zur vollständigen
                    Bezahlung verbleiben die gelieferten Produkte im Eigentum
                    von Royal Canin.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">6.</span>Gewährleistung
                </div>
                <p>
                  <div>
                    <span className="pr-3">6.1</span>Es gelten die gesetzlichen
                    Vorschriften zur Gewährleistung.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">6.2</span>Im Falle eines Mangels
                    werden Tierhalter*innen um Kontaktaufnahme unter [Tel.: 0221
                    937060 600 oder per Mail an: info.de@royalcanin.com]
                    gebeten. Auf die gesetzlichen Ansprüche den Tierhalter*innen
                    hat dies keine nachteiligen Auswirkungen.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">7.</span>Haftung
                </div>
                <p>
                  <div>
                    <span className="pr-3">7.1</span>Royal Canin haftet nicht
                    dafür, dass die von der Tierärztin/vom Tierarzt gegebenen
                    Fütterungsempfehlungen für die betreffenden Haustiere der
                    Tierhalter*innen und ihre spezifischen Ernährungsbedürfnisse
                    geeignet sind.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">7.2</span>Für Ansprüche aufgrund von
                    Schäden, die durch Royal Canin, ihre gesetzlichen Vertreter
                    oder Erfüllungsgehilfen verursacht wurden, haftet Royal
                    Canin stets im gesetzlichen Umfang
                    <div className="pl-5 mt-3">
                      - bei der schuldhaften Verletzung des Lebens, des Körpers
                      oder der Gesundheit
                    </div>
                    <div className="pl-5 mt-3">
                      - bei vorsätzlicher oder grob fahrlässiger
                      Pflichtverletzung
                    </div>
                    <div className="pl-5 mt-3">
                      - bei Garantieversprechen oder der Übernahme eines
                      Beschaffungsrisikos, soweit vereinbart
                    </div>
                    <div className="pl-5 mt-3">
                      - soweit der Anwendungsbereich des Produkthaftungsgesetzes
                      eröffnet ist.
                    </div>
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">7.3</span>Bei Verletzung wesentlicher
                    Vertragspflichten, deren Erfüllung die ordnungsgemäße
                    Durchführung des Vertrages überhaupt erst ermöglicht und auf
                    deren Einhaltung der Vertragspartner regelmäßig vertrauen
                    darf (sog. Kardinalpflichten) durch leichte Fahrlässigkeit
                    von Royal Canin, ihrer gesetzlichen Vertreter oder
                    Erfüllungsgehilfen, ist die Haftung der Höhe nach auf den
                    bei Vertragsschluss vorhersehbaren Schaden begrenzt, mit
                    dessen Entstehung typischerweise gerechnet werden muss.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">7.4</span>Im Übrigen sind Ansprüche
                    auf Schadensersatz ausgeschlossen.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">8.</span>Widerrufsrecht
                </div>
                <p>
                  <div>
                    <span className="pr-3">8.1</span>Tierhalter*innen steht ein
                    Widerrufsrecht zu.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">8.2</span>Widerrufsbelehrung
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">8.3</span>Muster-Widerrufsformular
                  </div>
                  <div className="pl-5 mt-3">
                    (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie
                    bitte dieses Formular aus und senden Sie es zurück.)
                  </div>
                  <div className="pl-5 mt-3">
                    - An ROYAL CANIN Tiernahrung GmbH & Co. KG, Habsburgerring
                    2, 50674 Köln
                    <br />
                    Tel.: +49 (0) 221 937060-610, Fax: +49 (0) 221 937060-800
                  </div>
                  <div className="pl-5 mt-3">
                    - Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                    abgeschlossenen Vertrag über den Kauf der folgenden Waren
                    (*)
                  </div>
                  <div className="pl-5 mt-3">
                    - Bestellt am (*)/erhalten am (*)
                  </div>
                  <div className="pl-5 mt-3">- Name des/der Verbraucher(s)</div>
                  <div className="pl-5 mt-3">
                    - Anschrift des/der Verbraucher(s)
                  </div>
                  <div className="pl-5 mt-3">
                    - Unterschrift des/der Verbraucher(s) (nur bei Mitteilung
                    auf Papier)
                  </div>
                  <div className="pl-5 mt-3">- Datum</div>
                  <div className="pl-5 mt-3">(*) Unzutreffendes streichen.</div>
                </p>
                <p>
                  <div>
                    <div className="mb-1">
                      <span className="pr-3">8.4</span>Kein Widerrufsrecht
                      <br />
                    </div>
                    <span className="pr-4 ml-3"></span>Das Widerrufsrecht
                    besteht nicht bei folgenden Verträgen:
                    <br />
                    <div className="pl-5 mt-3">
                      Verträgen zur Lieferung von Waren, die nicht vorgefertigt
                      sind und für deren Herstellung eine individuelle Auswahl
                      oder Bestimmung durch den Verbraucher maßgeblich ist oder
                      die eindeutig auf die persönlichen Bedürfnisse des
                      Verbrauchers zugeschnitten sind,
                    </div>
                    <div className="pl-5 mt-3">
                      Verträgen zur Lieferung von Waren, die schnell verderben
                      können oder deren Verfallsdatum schnell überschritten
                      würde,
                    </div>
                    <div className="pl-5 mt-3">
                      Verträgen zur Lieferung versiegelter Waren, die aus
                      Gründen des Gesundheitsschutzes oder der Hygiene nicht zur
                      Rückgabe geeignet sind, wenn ihre Versiegelung nach der
                      Lieferung entfernt wurde.
                    </div>
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">9.</span>Online-Streitbeilegung
                </div>
                <p>
                  <div>
                    <span className="pr-3">9.1</span>Royal Canin nimmt nicht am
                    Verfahren zur alternativen Streitbeilegung in
                    Verbrauchersachen gemäß § 36 VSBG teil.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">9.2</span>Hinweis zur
                    Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO: Die
                    Europäische Kommission stellt unter{' '}
                    <a
                      className="rc-styled-link"
                      href="http://ec.europa.eu/consumers/odr/"
                    >
                      http://ec.europa.eu/consumers/odr/
                    </a>{' '}
                    eine Plattform zur Online-Streitbeilegung (OS) bereit. Royal
                    Canin ist nicht bereit oder verpflichtet, an einem
                    Streitbeilegungsverfahren teilzunehmen.
                  </div>
                </p>
                <div className="mb-2 dark bold">
                  <span className="pr-3">10.</span>Schlussbestimmungen
                </div>
                <p>
                  <div>
                    <span className="pr-3">10.1</span>Es findet das Recht der
                    Bundesrepublik Deutschland unter Ausschluss des
                    UN-Kaufrechts Anwendung. Diese Rechtswahl gilt nur insoweit,
                    als nicht der durch zwingende Bestimmungen des Rechts des
                    Staates, in dem die Tierhalter*innen ihren gewöhnlichen
                    Aufenthalt haben, gewährte Schutz entzogen wird.
                  </div>
                </p>
                <p>
                  <div>
                    <span className="pr-3">10.2</span>Sollten einzelne
                    Bestimmungen dieser Nutzungsbedingungen ganz oder teilweise
                    nichtig oder unwirksam sein oder werden, so wird dadurch die
                    Wirksamkeit der übrigen Bestimmungen nicht berührt.
                  </div>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default TermUse;
