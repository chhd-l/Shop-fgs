import React, {Component} from 'react'
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href

class FrFaq extends Component {
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
                    <div className='rc-layout-container rc-five-column rc-match-heights text-center text-md-left'>
                        <div className="rc-column rc-triple-width">
                            <div className="background-cover" style={{backgroundImage:"url('https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwbeb05de5/Help/02_help.jpg?sw=802&sh=336&sm=cut&sfrm=jpg')"}}>
                                <picture className="rc-card__image">
                                    <LazyLoad>
                                    <img className=" lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwbeb05de5/Help/02_help.jpg?sw=802&sh=336&sm=cut&sfrm=jpg"/>
                                    </LazyLoad>
                                </picture>
                            </div>
                        </div>
                        <div className="rc-column rc-double-width rc-padding--none">
                            <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                    <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                                        <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                            <p>Vous pouvez également consulter notre rubrique
                                                <a style={{textDecoration:'underline',color:'rgb(236,0,26)',backgroundColor:'rgb(255,255,255)',padding:'0 3px'}} href={`${process.env.REACT_APP_ACCESS_PATH}FAQ/all`}>FAQ</a> 
                                                qui vous apportera de nombreuses réponses. 
                                            </p>
                                        </div>
                                        <div className="rc-column rc-content-v-middle">
                                            <LazyLoad>
                                            <img className="lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwae640ffa/Help/FAQ_icon@2x.jpg?sw=90&sfrm=jpg"/>
                                            </LazyLoad>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FrFaq