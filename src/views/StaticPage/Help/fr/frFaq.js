import React, {Component} from 'react'

class FrFaq extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className='rc-layout-container rc-five-column rc-match-heights text-center text-md-left'>
                        <div className="rc-column rc-triple-width">
                            <div className="background-cover" style={{backgroundImage:"url('https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwbeb05de5/Help/02_help.jpg?sw=802&sh=336&sm=cut&sfrm=jpg')"}}>
                                <picture className="rc-card__image">
                                    <img className=" lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwbeb05de5/Help/02_help.jpg?sw=802&sh=336&sm=cut&sfrm=jpg"></img>
                                </picture>
                            </div>
                        </div>
                        <div className="rc-column rc-double-width rc-padding--none">
                            <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                    <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                                        <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                            <p>Vous pouvez également consulter notre rubrique
                                                <a> qui vous apportera de nombreuses réponses. </a>
                                            </p>
                                        </div>
                                        <div className="rc-column rc-content-v-middle">
                                            <img className="lazyloaded" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwae640ffa/Help/FAQ_icon@2x.jpg?sw=90&sfrm=jpg"></img>
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