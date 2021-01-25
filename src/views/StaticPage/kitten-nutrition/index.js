import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Carouselem from '@/components/Carouselem';
import LazyLoad from 'react-lazyload';
import { list1 } from './goods';
import { Link } from 'react-router-dom';
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class PromotionRefuge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
       
    }

    render(h) {
        const event = {
            page: {
                error: 'none',
                filters: 'none',
                hitTimestamp: new Date(),
                path: location.pathname,
                theme: 'none',
                type: 'Other'
            }
        };
        return (
            <div className="recommendation">
                <GoogleTagManager additionalEvents={event} />
                <Header
                    showMiniIcons={true}
                    showUserIcon={true}
                    location={this.props.location}
                    history={this.props.history}
                    match={this.props.match}
                />
                <main className="rc-content--fixed-header rc-bg-colour--brand3">
                    <BannerTip />
                    <BreadCrumbs />
                    <div className="experience-region experience-main">
                        <div className="experience-component experience-layouts-1column">
                            <div className="row rc-margin-x--none">
                                <div className="rc-full-width">
                                    <div className="experience-component experience-assets-contentBlock">
                                        <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--xl">
                                            <a className="page-section-anchor" aria-hidden="true"></a>
                                            <div className="row align-items-md-center">
                                                <div className="col-12 col-lg-6 rc-padding-x--sm--desktop">
                                                    <picture data-rc-feature-objectfillpolyfill-setup="true">
                                                        <img className="w-100 lazyloaded" src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dw0c51547c/Breed-Cats-&-Dogs/kitten-pack-for-sol.jpg?sw=600&sh=400&sm=cut&sfrm=jpg"></img>
                                                    </picture>
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile"
                                                    >
                                                        <h2 className="rc-beta markup-text">Les aliments nutrition santé ROYAL CANIN® pour chatons</h2>
                                                        <p>Les aliments ROYAL CANIN® aident à soutenir le bon développement des chatons.</p>
                                                        <Link className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club" to='/cat-age/kitten/' title="Afficher tous les produits">
                                                            Afficher tous les produits
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-component experience-layouts-1column">
                            <div className="row rc-margin-x--none">
                                <div className="rc-full-width">
                                    <div className="experience-component experience-assets-importContentAsset">
                                        <div className="content-asset">
                                            <div className="product-reco">
                                                <div className="rc-max-width--lg">
                                                    <div className="rc-margin-bottom--sm rc-padding--none">
                                                        <h4 className="rc-gamma text-center">
                                                        Choisissez l'aliment ROYAL CANIN® le plus adapté à votre chaton
                            </h4>
                                                    </div>
                                                    <Carouselem
                                                     list={list1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-region experience-main">
                            <div className="row rc-margin-x--none">
                                <div className="rc-full-width">
                                    <div className="experience-component experience-assets-headingBlock">
                                        <div className="rc-max-width--md text-center rc-margin-y--md">
                                            <div className="rc-beta inherit-fontsize">
                                                <h3>Notre engagement en faveur de la qualité</h3>
                                            </div>
                                            <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                                                <p>La qualité nutritionnelle et la sécurité des aliments sont au cœur de tout ce que nous faisons dans le monde. </p>
                                                <Link to="/Quality-safety" className="rc-btn rc-btn--one ">
                                                    En savoir plus
                                    </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-component experience-layouts-1column">
                            <div className="row rc-margin-x--none">
                                <div className="rc-full-width">
                                    <div className="experience-component experience-assets-valueProposition">
                                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-y--sm rc-margin-y--lg--mobile value-proposition">
                                            <div id="why-choose-royal-canin" name="why-choose-royal-canin" className="page-section-anchor" aria-hidden="true"></div>
                                            <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">Pourquoi choisir Royal Canin ?</h4>
                                            <div className="value-proposition__container">
                                                <div className="row mx-0">
                                                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                                                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                                                            <img className="value-proposition__img lazyloaded" style={{ width: '90px' }} src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c03ad8b/Breed-Cats-&-Dogs/4B.png?sw=90&sh=90&sm=cut&sfrm=png"></img>
                                                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                                                <p className="rc-margin-bottom--none rc-intro">Livraison gratuite et rapide</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                                                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                                                            <img className="value-proposition__img lazyloaded" style={{ width: '90px' }} src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dw4bbb7d34/Breed-Cats-&-Dogs/4C.png?sw=90&sh=90&sm=cut&sfrm=png"></img>
                                                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                                                <p className="rc-margin-bottom--none rc-intro">Paiement sécurisé</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                                                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                                                            <img className="value-proposition__img lazyloaded" style={{ width: '90px' }} src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dw94e7b91f/Breed-Cats-&-Dogs/4D.png?sw=90&sh=90&sm=cut&sfrm=png"></img>
                                                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                                                <p className="rc-margin-bottom--none rc-intro">Qualité certifiée</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                                                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                                                            <img className="value-proposition__img lazyloaded" style={{ width: '90px' }} src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dw077bfc85/Breed-Cats-&-Dogs/4E.png?sw=90&sh=90&sm=cut&sfrm=png"></img>
                                                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                                                <p className="rc-margin-bottom--none rc-intro">La nutrition santé livrée à votre domicile</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-component experience-layouts-1column">
                            <div className="row rc-margin-x--none ">
                                <div className="rc-full-width">
                                    <div className="experience-component experience-assets-contentBlock">
                                        <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                                            <a className="page-section-anchor" aria-hidden="true">
                                                <div className="row align-items-md-center">
                                                    <div className="col-12 col-lg-6 rc-padding-x--sm--desktop">
                                                        <picture data-rc-feature-objectfillpolyfill-setup="true">
                                                            <img className="w-100 lazyloaded" alt="Les aliments Royal Canin pour chatons" title="Les aliments Royal Canin pour chatons" src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCMK_STG/on/demandware.static/-/Sites-FR-Library/fr_FR/dwdac1b4fd/Breed-Cats-&-Dogs/KITTEN 5A.jpg?sw=622&sfrm=png"></img>
                                                        </picture>
                                                    </div>
                                                    <div className='col-12 col-lg-6'>
                                                        <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                                                            <h2 className="rc-beta markup-text">Les chatons ont besoin d'une alimentation différente de celle des chats adultes</h2>
                                                            <p>Depuis plus de 50 ans, nous étudions les besoins nutritionnels et physiologiques de tous les chatons</p>
                                                            <Link className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club" title="En savoir plus" style={{ color: "#E2011B" }} to="/cats/kitten/kitten-feeding-and-nutrition">En savoir plus</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default PromotionRefuge;
