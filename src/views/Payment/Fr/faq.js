import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl';
import {faqClickDataLayerPushEvent} from "@/utils/GA"
import './faq.css'

const isHubGA = process.env.REACT_APP_HUB_GA
const FaqItem = [
    {item:'How to contact customer service',isExpand:false,clickType:'Collapse'},
    {item:'Would you like free delivery',isExpand:false,clickType:'Collapse'},
    {item:'How secure is my payment information',isExpand:false,clickType:'Collapse'},
    {item:'Free return',isExpand:false,clickType:'Collapse'},
]

class Faq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    faqItemClick = (index) => {
        if (isHubGA) {
            FaqItem[index].isExpand =!FaqItem[index].isExpand
            FaqItem[index].isExpand ? FaqItem[index]['clickType'] = 'Expand' : FaqItem[index]['clickType'] = 'Collapse'
            faqClickDataLayerPushEvent({item:FaqItem[index]["item"],clickType: FaqItem[index]["clickType"]})
        }
    }
    render() {
        return (
            <Fragment>
                <div className="fr-faq">
                    <div><span className="icon icon1"></span>Achat 100% sécurisé</div>
                    <div><span className="icon icon2"></span>Satisfait ou remboursé</div>
                    <div><span className="icon icon3"></span>Qualité Premium</div>
                    <div><span className="icon icon4"></span>Livraison rapide</div>
                </div>
                <div className="faq-title rc-delta">FAQ</div>
                <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" className="">
                    <div className="rc-list__accordion-item" onClick={()=>this.faqItemClick(0)}>
                        <dt>
                            <button className="rc-list__header" id="heading-73" data-toggle="content-73" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.contactCustomer"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-73" aria-labelledby="heading-73">
                            <p>Vous pouvez joindre un de nos représentants du service clientèle au numéro gratuit 0 800 005 360. Nous sommes à votre disposition du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={()=>this.faqItemClick(1)}>
                        <dt>
                            <button className="rc-list__header" id="heading-250" data-toggle="content-250" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.freeDelivery"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-250" aria-labelledby="heading-250">
                            <p>Royal Canin offre la livraison gratuite pour toutes les commandes. Votre colis arrivera dans les 3 jours ouvrables.</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={()=>this.faqItemClick(2)}>
                        <dt>
                            <button className="rc-list__header" id="heading-529" data-toggle="content-529" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.paymentInformation"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-529" aria-labelledby="heading-529">
                            <p>Les achats sont sécurisés à 100 % grâce au processus de paiement de Royal Canin. Notre site utilise un protocole SSL pour crypter toutes les informations personnelles envoyées pendant la procédure de paiement. Pour plus d'informations sur la manière dont nous sécurisons et utilisons vos informations, veuillez consulter notre politique de confidentialité.</p>
                            <p>Nous acceptons les cartes Visa et Mastercard comme moyens de paiement. </p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={()=>this.faqItemClick(3)}>
                        <dt>
                            <button className="rc-list__header" id="heading-530" data-toggle="content-530" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.FreeReturn"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-530" aria-labelledby="heading-530">
                            <p>Quel que soit votre motif d'insatisfaction, vous pouvez nous retourner les marchandises pour être intégralement remboursé. Dès réception, nous vous rembourserons le montant total, y compris les frais de retour. Nous utiliserons les mêmes moyens de remboursement que ceux de la transaction initiale, sauf si vous avez expressément convenu d'autre chose. Vous recevrez un e-mail une fois votre colis reçu et le remboursement effectué.</p>
                        </dd>
                    </div>
                </dl>
            </Fragment>

        )
    }
}
export default Faq