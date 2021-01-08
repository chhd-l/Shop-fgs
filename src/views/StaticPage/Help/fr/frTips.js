import React, {Component} from 'react'
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href

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
                  <link rel="canonical" href={pageLink} />
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
                                    <LazyLoad style={{width: '100%'}}>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne"
                                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/onlineshop_90x90.jpg`} />
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
                                    <LazyLoad style={{width: '100%'}}>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne"
                                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/PETnutri_90x90.jpg`} />
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
                                    <LazyLoad style={{width: '100%'}}>
                                    <img className=" lazyloaded" alt="Expérience d'achat en ligne" 
                                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/PETCARE_90x90.jpg`}/>
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