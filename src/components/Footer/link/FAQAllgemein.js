import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
import {  Link } from 'react-router-dom'
// import store from "storejs";
import "./index.less"

class FAQAllgemein extends Component {
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
                        <h2 className="bold mb-10">Warum sind Diät-Nahrungen nicht für gesunde Tiere bestimmt?</h2>
                        <p className="mb-20">Diät-Nahrungen sind ausschließlich nach Beratung durch eine Tierärztin oder einen Tierarzt erhältlich und sollten nur nach Absprache mit dem behandelnden Tierarzt gefüttert werden. Denn um die Wirkung der Diätnahrung sicherzustellen, ist eine vorherige Untersuchung durch eine Tierarztin oder einen Tierarzt unerlässlich. Eine falsche Verwendung kann die Krankheitssymptome eines Tieres sogar verschlechtern und bei einem gesunden Tier zu gesundheitlichen Problemen führen.</p>

                        <h2 className="bold mb-10">Was ist der Unterschied zwischen Nahrungen, die im Fachhandel und bei einer Tierärztin oder einem Tierarzt erhältlich sind?</h2>
                        <p className="mb-20">In ausgewählten Zoofachhandlungen sind maßgeschneiderte ROYAL CANIN-Produkte erhältlich, die Alter, Rasse, Größe, Aktivität und Lebensstil Ihres Tieres berücksichtigen. </p>
                        <p className="mb-20">Darüber hinaus bieten wir ein spezielles Sortiment an Diätnahrungen an, die nur nach tierärztlicher Beratung erhältlich sind. Dabei kann es sich um Prophylaxe-Nahrungen oder um Diäten im Krankheitsfall handeln. Sprechen Sie Ihren Tierarzt an, er kann Sie fundiert beraten, welche Nahrung sich für Ihr Tier am besten eignet.</p>

                        <h2 className="bold mb-10">Was versteht man unter dem Begriff „Alleinfutter“?</h2>
                        <p className="mb-20">Als Alleinfuttermittel wird, nach den Maßgaben des Futtermittelrechts, ein Futter bezeichnet, welches Tiere bei ausschließlicher Fütterung mit allen lebensnotwendigen Nährstoffen versorgt. Alleinfutter für Hunde und Katzen sind als Trocken- und Feuchtnahrung oder auch als halbfeuchte Produkte erhältlich. Kann ich mein Tier ausschließlich mit Trockennahrung ernähren? Hund und Katzen können ausschließlich mit Trockennahrung ernährt werden, vorausgesetzt es handelt sich um ein Alleinfuttermittel. Für jedes Produkt, das auf der Verpackung als Alleinfutter ausgewiesen ist, übernimmt der Hersteller die Garantie, dass es ernährungsphysiologisch 100 % bedarfsdeckend und ausgewogen ist. Egal ob es sich um eine Feucht- , Trocken- oder halbfeuchte Nahrung handelt.</p>

                        <h2 className="bold mb-10">Wie groß sollte die tägliche Futterportion für meinen Hund/meine Katze sein?</h2>
                        <p className="mb-20">Die Fütterungsempfehlung auf der Packungsrückseite dient als Anhaltspunkt dafür, welche Menge des jeweiligen Futters eine Katze bzw. ein Hund täglich benötigt. Zum Abmessen der täglich benötigten Menge verwenden Sie am besten eine Küchenwaage. Bei der Frage, wie viele Kalorien Ihre Tier pro Tag tatsächlich zu sich nehmen sollte, kann Ihr Tierarzt Sie individuell beraten. Grundsätzlich hängt der tägliche Energiebedarf von mehreren Faktoren, wie zum Beispiel Größe, Alter, Aktivität sowie Gesundheitszustand ab. Wiegen Sie Ihr Tier regelmäßig: Wenn es sein Normalgewicht hält, können Sie sicher sein, dass die Kalorienzufuhr zum Bedarf passt.</p>

                        <h2 className="bold mb-10">Was bedeutet Mischfütterung?</h2>
                        <p className="mb-20">Mischfütterung bezeichnet das gemischte Füttern von Feucht- und Trockennahrung und eignet sich sowohl für Katzen als auch für Hunde. In der kombinierten Fütterung lassen sich die positiven Eigenschaften von Trocken- und Feuchtnahrung vereinen?</p>

                        <h2 className="bold mb-10">Muss Trockennahrung mit Wasser vermengt werden?</h2>
                        <p className="mb-20">Nein, das Trockenfutter muss nicht mit Wasser eingeweicht werden. Viele Tiere verweigern das eingeweichte Futter, da sie eine Trennung von Wasser und Trockenfutter bevorzugen. Trinkwasser muss dem Tier jedoch immer unbegrenzt zur Verfügung stehen. Das Wasser sollte immer frisch sein und mehrmals am Tag erneuert werden.</p>

                        <h2 className="bold mb-10">Was sollte bei der Lagerung von Nahrung beachtet werden?</h2>
                        <p className="mb-20">Damit Trockenfutter lange schmackhaft bleibt und beispielsweise vor Insekten geschützt ist, sollte es in einer luftdicht geschlossenen Futtertonne gelagert werden. Wählen Sie am besten eine Packungsgröße, die Sie innerhalb von sechs bis acht Wochen verfüttern, oder zweigen Sie von einem größeren Vorrat die Wochenration ab und lagern Sie diese Menge in einem weiteren Vorratsbehältnis, aus dem Sie die tägliche Futterration entnehmen. Auf diese Weise müssen Sie nur selten an Ihren Nahrungsvorrat und das Risiko, das Fremdkörper in den Vorrat gelangen, kann erheblich verringert werden.</p>
                        <p className="mb-20">Bei Feuchtnahrung ist darauf zu achten, dass jede Portion frisch verzehrt wird. Angetrocknete Futterreste können schnell verderben und zu Durchfall und Magenverstimmungen führen.</p>

                        <h2 className="bold mb-10">Wie lange sind die Produkte von ROYAL CANIN® haltbar?</h2>
                        <p className="mb-20">Das Mindesthaltbarkeitsdatum finden Sie in der Regel auf der Rückseite der Verpackung.</p>
                        <p className="mb-20">Nach dem Öffnen sollte Trockennahrung innerhalb von sechs bis acht Wochen aufgebraucht werden. Bewahren Sie geöffnete Feuchtnahrungen gekühlt für maximal zwei Tage auf. Feuchtnahrung sollte nicht länger bei Raumtemperatur stehen gelassen werden, spätestens nach zwei Stunden - besser schon 20 min nach der Fütterung - sollten Futterreste entsorgt werden.</p>

                        <h2 className="bold mb-10">Was ist die ROYAL CANIN® Akzeptanzgarantie?</h2>
                        <p className="mb-20">Seit 1968 genießen ROYAL CANIN Produkte eine ausgezeichnete Akzeptanz bei Katzen und Hunden. Dies liegt nicht zuletzt an den qualitativ hochwertigen Rohstoffen und dem fachspezifischen Know-How unserer Mitarbeiter, das tagtäglich in die Entwicklung und die Verarbeitung unserer Produkte miteinfließt.</p>
                        <p className="mb-20">Da jedoch jedes Tier anders ist und sich die individuellen Bedürfnisse von Tier zu Tier unterscheiden können, ist es in vereinzelten Fällen möglich, dass Ihr Haustier seine Nahrung nicht frisst. Sollte Ihre Katze oder Ihr Hund eines unserer Produkte bei der Erstfütterung nicht fressen, können Sie dieses an uns zurücksenden. Selbstverständlich übernehmen wir die Versandkosten. Erfahren Sie hier alles zur <a href="Akzeptanzgarantie" className="underline">Akzeptanzgarantie</a>. </p>

                        <h2 className="bold mb-10">Wie wird die hohe Qualität der Produkte sichergestellt?</h2>
                        <p className="mb-20">ROYAL CANIN ist nicht nur eine Marke, sondern auch ein Hersteller. Wir besitzen eigene Produktionsstätten, die ausschließlich ROYAL CANIN Nahrung fertigen und in unserer Hand liegen. So können wir neben den rechtlich vorgeschriebenen auch eigene, zusätzliche Standards einhalten und unsere Ansprüche an eine Premium-Nahrung für Hunde und Katzen erfüllen. Außerdem gewährleisten wir auf diese Weise weltweit eine gleichbleibend hohe Qualität der ROYAL CANIN Nahrungen, egal wo sie produziert werden. </p>
                        <p className="mb-20">Vor dem Verkauf werden alle Produkte von ROYAL CANIN einem intensiven Qualitätssicherungsprogramm unterzogen, um absolute Sicherheit zu gewährleisten. Da Katzen und Hunde die beste Ernährung verdienen, setzen wir uns für Folgendes ein: </p>
                        <ol> 
                            <li><span className="pr10">•</span>Auswahl der Rohstofflieferanten nach sehr strengen Vorgaben</li>
                            <li><span className="pr10">•</span>Qualitätskontrolle vom Moment des Rohstoffeintritts bis zur Verpackung durch systematische Maßnahmen und Analysen in allen wichtigen Phasen</li>
                            <li><span className="pr10">•</span>Vollständige Rückverfolgbarkeit und Identifizierung aller Inhaltsstoffe</li>
                        </ol>

                        <h2 className="bold mb-10">Kann ich bei ROYAL CANIN® gratis Futterproben bestellen?</h2>
                        <p className="mb-20">ROYAL CANIN® bietet anstelle von Proben eine Akzeptanzgarantie an. Damit können Sie mit mehr als einer einmaligen Probenfütterung herausfinden, ob Ihre Katze oder Ihr Hund unsere Nahrung wirklich gerne fressen mag.</p>
                        <p className="mb-20">Da jedoch jedes Tier anders ist und sich die individuellen Bedürfnisse von Tier zu Tier unterscheiden können, ist es in vereinzelten Fällen möglich, dass Ihr Haustier seine Nahrung nicht frisst. Sollte Ihre Katze oder Ihr Hund eines unserer Produkte bei der Erstfütterung nicht fressen, können Sie dieses an uns zurücksenden. Selbstverständlich übernehmen wir die Versandkosten. <a href="https://www.royalcanin.com/de/about-us/acceptance-guarantee" className="underline">Erfahren Sie hier alles zur Akzeptanzgarantie. </a></p>

                        <h2 className="bold mb-10">Warum ist in einigen Produkten von ROYAL CANIN® Zucker als Inhaltsstoff angegeben?</h2>
                        <p className="mb-20">Manche Tierhalter sind beunruhigt darüber, dass einigen der ROYAL CANIN Produkte Zucker (Saccharose) zugesetzt wird, da sie eine schädliche Wirkung auf Ihr Tier befürchten. Die Verwendung von Zucker in so geringen Mengen (max. 0,5%) in Feuchtnahrungs-Produkten hat jedoch keinerlei nachteilige Wirkung auf Katze oder Hund. Bei der Futtermittelherstellung dient der Zucker als technischer Hilfsstoff, nur so können sich unter Erhitzung Röststoffe bilden. Diese Röststoffe erhöhen die Akzeptanz der Nahrung. Im Anschluss an die Erhitzung ist kein Zucker mehr im Endprodukt enthalten. </p>

                        <h2 className="bold mb-10">Ist ein hoher Fleischanteil wichtig für hochwertige Tiernahrung?</h2>
                        <p className="mb-20">Immer wieder liest man, dass ein hoher Fleischanteil in Katzen- und Hundefutter ein Qualitätsmerkmal sei. Katzen und Hunde haben keinen Bedarf an Fleisch, sondern an den darin enthaltenen Proteinen (= Eiweiß), bzw. deren Einzelbausteinen, den Aminosäuren. Proteine sind lebenswichtige Baustoffe des Körpers. Sie sind notwendig für den Aufbau der Muskulatur, ein stabiles Immunsystems sowie ein gesundes Fell u.v.m. Proteine bestehen wiederum aus Aminosäuren und können entweder tierischen oder pflanzlichen Ursprungs sein.</p>

                        <h2 className="bold mb-10">Was verbirgt sich hinter der Bezeichnung „Fleisch und tierische Nebenerzeugnisse“ als Zutat in der Tiernahrung?</h2>
                        <p className="mb-20">„Fleisch und tierische Nebenerzeugnisse“ ist eine sogenannte Gruppenbezeichnung gemäß Futtermittelrecht, unter der tierische Rohstoffe in der Deklaration zusammengefasst werden. Es kann sich dabei um ganz unterschiedliche Nebenprodukte der Schlachtung handeln, wie z.B. Leber, Niere, Herz, Lunge, Teile des Verdauungstraktes oder Harnblase und Euter etc. Je nach Kulturkreis mag es befremdlich erscheinen, sich diese Produkte als Lebensmittel vorzustellen, für Katzen und Hunde sind sie jedoch äußerst schmackhaft und von hohem Nährwert. Fleisch und tierische Nebenerzeugnisse können von unterschiedlichen Schlachttieren stammen (Schwein, Huhn, Rind, Schaf, Fisch), denen jedoch eines gemeinsam ist: Jedes Tier wurde amtstierärztlich untersucht und für den menschlichen Verzehr als tauglich beurteilt.</p>

                        <h2 className="bold mb-10">Warum kann man nicht zwischen verschiedenen Geschmacksrichtungen wählen?</h2>
                        <p className="mb-20">Nicht der Geschmack, sondern der Geruch und die Textur entscheiden bei Hunden und Katzen darüber, ob sie ein Futter gern fressen. Darüber hinaus sind die bedarfsgerechten Inhaltstoffe entscheidend, um Ihren Vierbeiner rundum zu versorgen und die Gesundheit zu fördern. Wir kooperieren mit Tierärzten und Züchtern, um so die bestmögliche Nahrung für Hunde und Katzen zu entwickeln. Ausgangspunkt für unsere Innovationen sind die tatsächlichen Bedürfnisse von Hunden und Katzen und nicht etwa Trends oder menschliche Erwartungen.</p>

                        <h2 className="bold mb-10">Wie unterscheiden sich die RENAL Produkte voneinander?</h2>
                        <p className="mb-20">Unsere Diätnahrungen von RENAL wurden speziell für Katzen mit chronischer Niereninsuffizienz entwickelt. Ein reduzierter Phosphorgehalt sowie ein moderater, hochverdaulicher Proteinanteil können helfen, die Funktion chronisch erkrankter Nieren zu entlasten und die weitere Zerstörung des Nierengewebes zu verlangsamen. Außerdem zeichnen sich alle Renal-Nahrungen durch Ihre besonders hohe Schmackhaftigkeit aus, um die oft appetitlosen Tiere zum Fressen anzuregen.</p>
                        <p className="mb-20">Wir bieten von RENAL sowohl Trocken- als auch Feuchtnahrungen an.</p>
                        <p className="mb-20">Die RENAL Trocken-Produkte unterscheiden sich im Aromaprofil. Da Katzen oft an Appetitlosigkeit leiden, hat ROYAL CANIN verschiedene Aromaprofile entwickelt.</p>

                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(FAQAllgemein);
