import React, {Component} from 'react'
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
class Help extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidCatch(){
        setSeoConfig({
            goodsId: '',
            categoryId: '',
            pageName: 'Subscription Page'
          })
    }
    render() {
        return (
            <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
                <div className="rc-column rc-padding--none">
                    <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                        <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className='rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight'>
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                    <div>
                                        <b style={{color:"#00A4A6"}}>Par téléphone</b>
                                        <p>De 8h30 à 12h30 et de 14h à 17h du lundi au vendredi (appel non surtaxé)</p>
                                        <div className="rc-margin-top--xs">
                                            <a className='rc-numeric nowrap' style={{color:"#00A4A6"}} href="tel:0800-005-360">0800-005-360</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                    <LazyLoad>
                                    <img className="align-self-center widthAuto lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwbcba612c/promotion-refuge/customer-service@2x.png?sw=100&sh=100&sm=cut&sfrm=jpg"/>
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="rc-column rc-padding--none">
                    <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                        <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className='rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight'>
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                    <div>
                                        <b style={{color:"#0087BD"}}>Par mail</b>
                                        <p>Nous vous répondons sous deux jours ouvrés.</p>
                                        <div className="rc-margin-top--xs">
                                            <a href="mailto:suivi.dtc.france@royalcanin.com" className='rc-numeric nowrap' style={{color:"#0087BD"}}>Envoyer un email</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                    <LazyLoad>
                                    <img className="align-self-center widthAuto lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png"/>
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="rc-column rc-padding--none">
                    <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                        <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className='rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight'>
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                    <div>
                                        <b>Des questions?</b>
                                        <p>Vous pouvez également consulter notre rubrique
                                            <a style={{color:'rgb(236,0,26)',backgroundColor:'rgb(255,255,255)',padding:'0 3px'}} href={`${process.env.REACT_APP_ACCESS_PATH}FAQ/all`}>FAQ</a> 
                                            qui vous apportera de nombreuses réponses
                                        </p>
                                    </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                    <LazyLoad>
                                    <img className="align-self-center widthAuto lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png"/>
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        )
    }
}
export default Help