import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { seoHoc } from '@/framework/common';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
@injectIntl
@inject('configStore')
@seoHoc('general terms conditions page')
@observer
class FelinTermsConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',

      mailAddress: ''
    };
  }

  componentDidMount() {
    const {
      configStore: { storeContactPhoneNumber, storeContactEmail }
    } = this.props;

    this.setState({
      tel: 'tel:' + storeContactPhoneNumber,
      mailAddress: 'mailto:' + storeContactEmail
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
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
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          {window.__.env.REACT_APP_COUNTRY == 'fr' ? null : <BannerTip />}
          <BreadCrumbs />
          {/* <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile"> */}
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  noParagraphMargin">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2
                        className="text-center"
                        style={{
                          color: '#E2001A',
                          marginTop: '1.25rem',
                          fontSize: '2.5rem'
                        }}
                      >
                        CONDITIONS GÉNÉRALES DE RESERVATION
                      </h2>
                    </div>
                  </div>
                </div>

                <p>
                  {' '}
                  Les présentes conditions générales de réservation (les{' '}
                  <strong>"Conditions"</strong>), ainsi que la Politique de
                  Confidentialité régissent la relation et déterminent les
                  conditions juridiques dans lesquelles Royal Canin fournit ses
                  services sur son Site (tel que défini plus bas). Veuillez-vous
                  assurer que vous les avez lues et comprises avant de confirmer
                  votre réservation sur le Site.
                </p>

                <p>
                  Royal Canin se réserve le droit de réviser et de modifier les
                  présentes Conditions pour tenir compte de l'évolution de la
                  technologie, des changements dans les méthodes de paiement,
                  des modifications des lois et des exigences réglementaires
                  pertinentes, ainsi que des changements dans les capacités du
                  système, étant précisé que les Conditions applicables à votre
                  réservation sont celles que vous acceptez au moment de la
                  confirmation de la commande, qui sont accessibles sur le Site
                  et en vigueur.
                </p>

                <p>Les présentes Conditions sont applicables entre</p>

                <p style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
                  Royal Canin France{' '}
                </p>
                <p>
                  Société par actions simplifiée immatriculée au RCS de Nîmes
                  sous le numéro 380 824 888
                </p>
                <p>
                  Dont le siège social se situe 650 avenue de la petite
                  Camargue, 30470 Aimargues
                </p>
                <p>Numéro de téléphone : [to be completed]; </p>
                <p>Adresse email : [to be completed] ; </p>
                <p>
                  Capital social : <strong>917 986€ </strong>; Numéro de TVA :{' '}
                  <strong>FR43380824888</strong>
                </p>

                <p>
                  {' '}
                  (ci-après dénommée <strong>"Royal Canin")</strong>{' '}
                </p>
                <br />
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>et </p>
                <p>
                  les consommateurs qui utilisent le site Internet "L’Atelier
                  Félin" de Royal Canin accessible à l’adresse [hyperlink to be
                  completed] (ci-après dénommé le "Site") pour réserver un
                  rendez-vous avec un spécialiste de la santé animale et de la
                  nutrition (comportementaliste, expert en nutrition, ostéopathe
                  ou toiletteur) pour les guider pour prendre soin de leur chat
                  (ci-après la "Réservation").
                </p>
                <br />
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  1.Réservation, acceptation et confirmation de la commande
                </p>
                <p>
                  Vous pouvez passer une commande directement sur le Site pour
                  réserver un rendez-vous avec un spécialiste. Selon votre
                  choix, le rendez-vous se déroulera dans la boutique de
                  l’Atelier Félin situé au 142 boulevard Saint-Germain, 75006
                  Paris ou par appel vidéo sur une application de messagerie
                  (par exemple, WhatsApp). Au moment de la Réservation, il vous
                  sera demandé de renseigner vos coordonnées ou de vous
                  connecter si vous disposez d’un compte Royal Canin sur le site
                  www.royalcanin.com/fr.{' '}
                </p>
                <br></br>
                <p>
                  Une fois votre panier validé, vous devrez valider votre moyen
                  de paiement le cas échéant puis confirmer votre Réservation,
                  cette dernière étape formalisant le contrat avec Royal Canin.
                </p>
                <br></br>
                <p>
                  Royal Canin accusera réception de votre commande dès sa
                  validation en vous envoyant un email de confirmation de
                  commande.
                </p>
                <br></br>
                <p>
                  Dans certains cas, notamment pour défaut de paiement, adresse
                  erronée ou tout autre problème lié à votre compte, Royal Canin
                  se réserve le droit de bloquer votre commande jusqu'à la
                  résolution du problème.
                </p>
                <br></br>
                <p>
                  Dans le cas où le spécialiste est indisponible, vous en serez
                  informé sans délai. Vous aurez la possibilité de modifier
                  votre Réservation ou de l’annuler, auquel cas le montant que
                  vous avez payé vous sera remboursé par le moyen de paiement
                  utilisé lors de votre commande.
                </p>
                <br />
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  2.Prix et paiement{' '}
                </p>
                <p>
                  Royal Canin se réserve le droit de modifier ses prix à tout
                  moment à sa seule discrétion. De telles modifications
                  n’affecteront pas les commandes déjà passées, et vous serez
                  toujours facturé au prix affiché au moment de votre commande.
                </p>
                <br></br>
                <div style={{ marginLeft: 20 }}>
                  <p>2.1 Prix</p>
                  <p>
                    Tous les prix affichés sur le Site sont en Euros et incluent
                    le montant de la TVA applicable en France.
                  </p>
                  <br></br>
                  <p>2.2 Paiement</p>
                  <p>
                    Vous pouvez effectuer le paiement de votre commande par
                    carte bancaire : Carte Bleue, e-carte bleue, Visa,
                    Mastercard, carte American Express, Discover. Votre compte
                    sera débité lors de la confirmation de la commande.
                  </p>
                  <br></br>
                  <p>Le paiement doit être effectué en Euros.</p>
                  <br></br>
                  <p>
                    Afin d'offrir un système de paiement sécurisé, Royal Canin
                    utilise les systèmes de paiement sécurisé des principales
                    institutions financières.
                  </p>
                </div>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  3.Modifier et annuler la Réservation
                </p>
                <p>
                  Vous pouvez modifier ou annuler votre Réservation jusqu’à
                  vingt-quatre (24) heures avant l’heure prévue :
                </p>
                <p style={{ marginLeft: 20 }}>
                  -en utilisant votre compte Royal Canin sur le Site, ou
                </p>
                <p style={{ marginLeft: 20 }}>
                  -en contactant Royal Canin par email à l’adresse [to be
                  completed] ou par téléphone au [to be completed].
                </p>

                <p>
                  En cas d’annulation, Royal Canin vous remboursera dans des
                  conditions identiques à celles décrites à l’article 5.4
                  ci-dessous.
                </p>

                <p>
                  AUCUN REMBOURSEMENT NE SERA EFFECTUE EN CAS DE TENTATIVE
                  D'ANNULATION DE LA RESERVATION MOINS DE 24 HEURES AVANT
                  L’HEURE PREVUE.
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  4.Retard ou empêchement de votre part
                </p>
                <p>
                  En dehors des cas d’annulation et de modification dans les
                  conditions de l’Article 3 « Modifier et annuler la
                  Réservation » :
                </p>
                <p style={{ marginLeft: 20 }}>
                  -En cas de retard de votre part la durée du rendez-vous sera
                  diminuée proportionnellement au temps de retard ;
                </p>
                <p style={{ marginLeft: 20 }}>
                  -En cas d’empêchement de votre part, la Réservation sera
                  considérée comme annulée et ne sera pas remboursée ;
                </p>
                <p style={{ marginLeft: 20 }}>
                  -Si votre retard ou annulation résultent d’un cas de force
                  majeure (au sens de l’article 1218 du code civil), il pourra
                  vous être proposé de reporter la Réservation ou de l’annuler
                  contre remboursement, et si le rendez-vous doit avoir lieu
                  dans la boutique de l’Atelier Félin, il pourra vous être
                  proposé d’effectuer le rendez-vous par appel vidéo sur une
                  application de messagerie (par exemple, WhatsApp).
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  5.Droit de rétractation
                </p>
                <div style={{ marginLeft: 20 }}>
                  <p>5.1 Qu’est-ce que le droit de rétraction ? </p>
                  <p>
                    Conformément à l’article L.221-18 du Code de la consommation
                    et sous réserve de l’Article 5.2 des présentes, vous avez le
                    droit de vous rétracter de votre commande sans avoir à
                    donner de motif et sans pénalités, dans un délai de quatorze
                    (14) jours à compter de la conclusion du contrat objet de
                    votre commande.{' '}
                  </p>
                  <br></br>
                  <p>
                    Le jour de la commande (et donc de l’acceptation des
                    présentes Conditions) n’est pas inclus dans le délai de 14
                    jours. Le délai de 14 jours commence à courir au début de la
                    première heure du premier jour et prend fin à l'expiration
                    de la dernière heure du dernier jour du délai. Si ce délai
                    expire un samedi, un dimanche ou un jour férié ou chômé, il
                    est prorogé jusqu'au premier jour ouvrable suivant.
                  </p>
                  <br></br>
                  <p>5.2 Cas où le droit de rétractation ne peut être exercé</p>
                  <p>
                    Conformément à l’article L.221-28 du Code de la
                    consommation, l’exercice du droit de rétractation ne peut
                    être exercé pour les contrats de fourniture de services
                    pleinement exécutés avant la fin du délai de rétractation et
                    dont l'exécution a commencé après accord préalable exprès du
                    consommateur et renoncement exprès à son droit de
                    rétractation.
                  </p>
                  <br></br>
                  <p>
                    Ainsi, au moment du processus de commande, vous devez avoir
                    confirmé que vous acceptez que le service soit exécuté avant
                    la fin du délai légal de rétractation (le cas échéant) et
                    que vous renoncez à votre droit de rétractation.
                  </p>
                  <br></br>
                  <p>
                    Cette renonciation est sans préjudice du droit d’annulation
                    visé à l’Article 3 « Modifier et annuler la Réservation »,
                    que Royal Canin vous offre, à titre commercial.{' '}
                  </p>
                  <br></br>
                  <p>
                    5.3 Conditions d’exercice du droit de rétractation
                    (lorsqu’applicable) :{' '}
                  </p>
                  <p>
                    Pour exercer votre droit de rétractation, vous devez
                    notifier à Royal Canin votre décision de rétractation au
                    moyen d’une déclaration dénuée d’ambiguïté avant
                    l'expiration du délai de rétractation :{' '}
                  </p>
                  <p>
                    -Par courrier à l’adresse Royal Canin France SAS Service
                    Clients 650 Av de la Petite Camargue 30470 AIMARGUES ;{' '}
                  </p>
                  <p>-Par email à l’adresse [to be completed] ; </p>
                  <p>
                    -En nous renvoyant le formulaire de rétractation ci-dessous.{' '}
                  </p>
                  <br></br>
                  <p>Formulaire de rétractation</p>
                  <br></br>
                  <p>
                    A l'attention de ROYAL CANIN France Service Clients 650 Av
                    de la Petite Camargue 30470 AIMARGUES ou [email address to
                    be completed].{' '}
                  </p>
                  <br></br>
                  <p>
                    Je/nous [*] vous notifie/notifions [*] par la présente
                    ma/notre [*] rétractation du contrat portant sur la
                    prestation de service ci-dessous :
                  </p>
                  <br></br>
                  <p>Commandée le : </p>
                  <br></br>
                  <p>Nom du (des) consommateur(s) : </p>
                  <br></br>
                  <p>Adresse du (des) consommateur(s) : </p>
                  <br></br>
                  <p>
                    Signature du (des) consommateur(s) (uniquement en cas de
                    notification du présent formulaire sur papier) :{' '}
                  </p>
                  <br></br>
                  <p>Date : </p>
                  <br></br>
                  <p>(*) Rayez la mention inutile. </p>
                </div>
                <br></br>

                <p>
                  5.4 Effets de l’exercice du droit de rétractation
                  (lorsqu’applicable) :{' '}
                </p>
                <p>
                  En cas de rétractation de votre part du présent contrat, Royal
                  Canin vous remboursera tous les paiements reçus de votre part.
                  Le remboursement interviendra sans retard excessif et, en tout
                  état de cause, au plus tard 14 jours à compter du jour où
                  Royal Canin est informé de votre décision de rétractation du
                  présent contrat.
                </p>
                <br></br>
                <p>
                  Le délai dans lequel le remboursement de ce montant sera
                  répercuté sur votre carte de crédit / débit peut varier en
                  fonction des pratiques de votre banque, et Royal Canin ne peut
                  être tenu pour responsable à cet égard. Royal Canin procèdera
                  au remboursement en utilisant le même moyen de paiement que
                  celui que vous aurez utilisé pour la transaction initiale,
                  sauf si vous convenez expressément d’un moyen différent ; en
                  tout état de cause, ce remboursement n’occasionnera pas de
                  frais pour vous.{' '}
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  6.Limitation de la responsabilité
                </p>
                <p>
                  Royal Canin ne sera pas responsable des dommages indirects qui
                  pourraient découler de toute violation des Conditions, de tout
                  délit ou de toute autre raison, en raison de l'accès au Site,
                  de l'utilisation du Site ou de toute autre donnée ou programme
                  sur le Site, ainsi que des dommages indirects qui pourraient
                  découler de la Réservation.
                </p>
                <br></br>
                <p>
                  Royal Canin n'assume aucune responsabilité pour toute
                  inexécution contractuelle, interruption des transactions
                  effectuées via le Site, toute défaillance ou négligence qui
                  est imputable au consommateur ou au fait imprévisible et
                  insurmontable d’un tiers au contrat ou à un cas de force
                  majeure.{' '}
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  7.Service Client{' '}
                </p>
                <p>
                  En cas de problème avec votre Réservation ou de question, vous
                  pouvez contacter Royal Canin par email à [to be completed], au
                  [to be completed] [days and time of availability to be
                  completed] (coût d’un appel local). {' '}
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  8.Données personnelles
                </p>
                <p>
                  Royal Canin peut collecter et traiter plusieurs catégories de
                  données personnelles que vous fournissez. Royal Canin
                  conservera vos données personnelles de manière sécurisée. Pour
                  plus d’informations, veuillez consulter la Politique de
                  confidentialité https://www.mars.com/privacy-policy-france.{' '}
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>9.Médiation</p>
                <p>
                  Conformément aux dispositions du Code de la consommation
                  concernant le règlement amiable des litiges, Royal Canin
                  adhère au Service du Médiateur du e-commerce de la FEVAD
                  (Fédération du e-commerce et de la vente à distance) dont les
                  coordonnées sont les suivantes : 60 Rue La Boétie – 75008
                  Paris – http://www.mediateurfevad.fr. Après démarche préalable
                  écrite des consommateurs vis-à-vis de Royal Canin, le Service
                  du Médiateur peut être saisi pour tout litige de consommation
                  dont le règlement n’aurait pas abouti. Pour connaître les
                  modalités de saisie du Médiateur, cliquer ici.
                </p>
                <p>En toutes hypothèses, Royal Canin vous :</p>
                <p>fera part de son incapacité à résoudre le litige, et</p>
                <p>
                  fournira à ce moment-là les informations prévues par la loi
                  concernant le médiateur, y compris ses coordonnées, telles
                  qu'exposées ci-dessus.
                </p>
                <br></br>
                <p>
                  Vous pouvez également utiliser la plateforme de résolution des
                  litiges en ligne afin de résoudre le litige via
                  :  https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR.
                </p>
                <br></br>
                <p>
                  Le fait de consentir à la médiation n'affectera pas votre
                  droit de voir le litige porté devant un tribunal.
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  10.Propriété intellectuelle
                </p>
                <p>
                  Royal Canin reste seule propriétaire et titulaire des droits
                  sur tous les documents et informations fournis sur ou par le
                  biais du Site, y compris toutes les illustrations, graphiques,
                  textes, clips vidéo et audio, marques, logos et autres
                  contenus (collectivement appelés "Contenu Royal Canin").
                </p>
                <br></br>
                <p>
                  Si vous acceptez les présentes Conditions (et toute condition
                  supplémentaire relative à un Contenu Royal Canin spécifique),
                  vous pouvez télécharger, imprimer et/ou copier le Contenu
                  Royal Canin pour votre usage personnel uniquement.
                </p>
                <br></br>
                <p>
                  Sauf autorisation écrite de Royal Canin, vous ne pouvez
                  effectuer aucune des actions suivantes :
                </p>
                <br></br>
                <p>
                  -Incorporer le Contenu Royal Canin dans une autre œuvre (comme
                  sur votre propre site web) ou utiliser le Contenu Royal Canin
                  à des fins publiques ou commerciales,
                </p>
                <p>
                  -Copier, modifier, reproduire, adapter, désosser, distribuer,
                  encadrer, republier, télécharger, afficher, montrer, publier,
                  transmettre, transférer, concéder sous licence ou vendre le
                  contenu Royal Canin sous quelque forme et par quelque moyen
                  que ce soit,
                </p>
                <p>
                  -Modifier une information concernant les droits d'auteur, les
                  marques de commerce ou tout autre droit de propriété
                  intellectuelle relatif au Contenu Royal Canin, ou
                </p>
                <p>
                  -Établir un "lien invisible" vers une page du Site
                  (c'est-à-dire un lien vers une page différente de la page
                  d'accueil du Site).
                </p>
                <br></br>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>
                  11.Droit applicable et tribunal compétent
                </p>
                <p>
                  En cas de litige pouvant découler des présentes Conditions et
                  de l'utilisation du Site, les dispositions des présentes
                  Conditions seront applicables en priorité, et si les présentes
                  Conditions ne contiennent aucune disposition pertinente, la
                  législation française sera applicable. Tout litige découlant
                  de ou en relation avec ces Conditions et l'utilisation du Site
                  sera soumis aux tribunaux français compétents.
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default FelinTermsConditions;
