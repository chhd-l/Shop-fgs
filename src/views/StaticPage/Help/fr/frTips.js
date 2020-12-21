import React, {Component} from 'react'
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

class FrTips extends Component {
    constructor(props){
        super(props)
        this.state = {
            seoConfig: {
                title: '',
                metaKeywords: '',
                metaDescription: ''
            }
        }
    }
    componentDidMount(){
        setSeoConfig({
            goodsId: '',
            categoryId: '',
            pageName: 'Contact Us Page'
          }).then(res => {
            this.setState({seoConfig: res})
          });
    }
    render() {
        return (
            <div>
                <Helmet>
                <title>{this.state.seoConfig.title}</title>
                <meta name="description" content={this.state.seoConfig.metaDescription}/>
                <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
                </Helmet>
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-layout-container rc-three-column rc-match-heights text-center text-md-left">
                        <div className="rc-column align-self-center">
                            <h3 className="rc-gamma rc-margin--none rc-padding--sm rc-padding--lg--mobile">Voici quelques sujets sur lesquels nous vous accompagnons:</h3>
                        </div>
                        <div className="rc-column">
                            <article className="rc-card rc-card--a rc-padding--sm">
                                <picture className="rc-card__image rc-card__image--balanced">
                                    <LazyLoad>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ab75a25/Help/onlineshop_90x90.jpg?sw=100&sfrm=jpg"/>
                                    </LazyLoad>
                                </picture>
                                <div className="rc-text--center">
                                    <header>
                                        <div className="rc-card__title rc-delta rc-padding-y--sm rc-margin--none children-nomargin inherit-fontsize">
                                            <h5>Expérience d'achat en ligne</h5>
                                        </div>
                                        <div className="children-nomargin">
                                            <p>
                                                <span style={{color:"#000"}}>Nous répondons à toutes vos questions concernant votre prise de commande, expérience d'achat en ligne ou gestion d'un retour.</span>
                                            </p>
                                        </div>
                                    </header>
                                </div>
                            </article>
                        </div>
                        <div className="rc-column">
                            <article className="rc-card rc-card--a rc-padding--sm">
                                <picture className="rc-card__image rc-card__image--balanced">
                                    <LazyLoad>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw27a53e96/Help/PETnutri_90x90.jpg?sw=100&sfrm=jpg"/>
                                    </LazyLoad>
                                </picture>
                                <div className="rc-text--center">
                                    <header>
                                        <div className="rc-card__title rc-delta rc-padding-y--sm rc-margin--none children-nomargin inherit-fontsize">
                                            <h5>Solutions nutritionnelles</h5>
                                        </div>
                                        <div className="children-nomargin">
                                            <p>
                                                <span style={{color:"#000"}}>Nous partageons notre expertise afin d'assurer à votre animal de compagnie la meilleure recommandation nutritionnelle.</span>
                                            </p>
                                        </div>
                                    </header>
                                </div>
                            </article>
                        </div>
                        <div className="rc-column">
                            <article className="rc-card rc-card--a rc-padding--sm">
                                <picture className="rc-card__image rc-card__image--balanced">
                                    <LazyLoad>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2d75a203/Help/PETCARE_90x90.jpg?sw=100&sfrm=jpg"/>
                                    </LazyLoad>
                                </picture>
                                <div className="rc-text--center">
                                    <header>
                                        <div className="rc-card__title rc-delta rc-padding-y--sm rc-margin--none children-nomargin inherit-fontsize">
                                            <h5>Santé et bien-être</h5>
                                        </div>
                                        <div className="children-nomargin">
                                            <p>
                                                <span style={{color:"#000"}}>Nous sommes également à votre disposition pour vous guider au mieux dans la gestion du bien-être et de la santé de votre animal.</span>
                                            </p>
                                        </div>
                                    </header>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FrTips