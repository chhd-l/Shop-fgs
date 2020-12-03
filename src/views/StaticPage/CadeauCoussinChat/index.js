import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class CadeauCoussinChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {

  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand'
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
                  <div className="experience-component experience-assets-pawListBlock">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="rc-max-width--lg rc-padding-y--sm">
                        <div className="rc-max-width--md text-center rc-padding-x--sm">
                          <h2 className="rc-beta text-center">Recevez en cadeau un coussin pour votre chat*</h2>
                          <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                            <p>Avec le code promotionnel qui vous a été communiqué vous pouvez à la fin de votre commande obtenir un cadeau spécial pour votre chat : un super coussin parfait pour les longues siestes de votre félin.</p>
                            <p><br/></p>
                            <h3>
                              <strong>Comment obtenir votre cadeau ?</strong>
                            </h3>
                            <p>
                              <span style={{color:'rgb(0,0,0,0)'}}>Comment obtenir votre cadeau ?</span>
                            </p>
                          </div>
                          <div className="d-block d-md-none rc-text--center"></div>
                        </div>
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                          <div className="rc-column">
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item">
                                  <LazyLoad>
                                  <img style={{display:"inline-block",marginRight:'10px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAIAAAAA3/ihAAAACXBIWXMAABJ0AAASdAHeZh94AAAB00lEQVR42u2WMW+CQBTH+RiEuR+Aka3p0MGBkaGDQ5MupulkHDRx0MGhQ5P2C3Rj6MDQhKWJnUgcysZgYgdTQQ9Rg0jwMAxWBFEQFJS2aSJ50727+x3v/u+fQ+a/+CEn2B/A9JZyX5KoEmBaxs/CoAAIrIO4IVZ56KUsbdxgFYYfqynBJvSNR1oGKQvO7/LgAncH0VulnQZsVMX8MEyi+/O5OSzivvFc3UgKswYcyBAd9Fx6EpxyDcthMLXeRQLjj6OEMG1w550Xl176kWUUnsUADE0M48Hm+kt6HCUQwEoBWJGDCWGCjIdVJkT6mpLbuDNXIOZU1aYw9p2pD+R6C4qZ7Go+Qb46t6dlKkrThE26e+aAKfBhxlPjYguKcNc01mtgk+lRq3MQ+a3u9pekzFvxpQ/91bA+6aAcFpGlVX01IzChJhxsV32F2iI5Yqm57WF3AopFNXgCGHyrhJKWkVcGXp1ZcE1JBXoIDnYQne/hWDTMvh6YkhF/KVl8F2mj94+EmaMquY+034XjwbY9Ykf45ZccFir3qChys+PKKMhETBjefdWOFciszbgOhOAdsgTo+vCdWwYrF/LiKiXWeCOlZ4HtrYZqWlEp/fSUO8H+E+wbiCxAG+yItlwAAAAASUVORK5CYII="/>
                                  </LazyLoad>
                                  <span>Choisissez l'aliment adapté à votre chat et ajoutez-le à votre panier</span>
                                </li>
                                <li className="rc-list__item">
                                  <LazyLoad>
                                  <img style={{display:"inline-block",marginRight:'10px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAIAAAAA3/ihAAAACXBIWXMAABJ0AAASdAHeZh94AAAB00lEQVR42u2WMW+CQBTH+RiEuR+Aka3p0MGBkaGDQ5MupulkHDRx0MGhQ5P2C3Rj6MDQhKWJnUgcysZgYgdTQQ9Rg0jwMAxWBFEQFJS2aSJ50727+x3v/u+fQ+a/+CEn2B/A9JZyX5KoEmBaxs/CoAAIrIO4IVZ56KUsbdxgFYYfqynBJvSNR1oGKQvO7/LgAncH0VulnQZsVMX8MEyi+/O5OSzivvFc3UgKswYcyBAd9Fx6EpxyDcthMLXeRQLjj6OEMG1w550Xl176kWUUnsUADE0M48Hm+kt6HCUQwEoBWJGDCWGCjIdVJkT6mpLbuDNXIOZU1aYw9p2pD+R6C4qZ7Go+Qb46t6dlKkrThE26e+aAKfBhxlPjYguKcNc01mtgk+lRq3MQ+a3u9pekzFvxpQ/91bA+6aAcFpGlVX01IzChJhxsV32F2iI5Yqm57WF3AopFNXgCGHyrhJKWkVcGXp1ZcE1JBXoIDnYQne/hWDTMvh6YkhF/KVl8F2mj94+EmaMquY+034XjwbY9Ykf45ZccFir3qChys+PKKMhETBjefdWOFciszbgOhOAdsgTo+vCdWwYrF/LiKiXWeCOlZ4HtrYZqWlEp/fSUO8H+E+wbiCxAG+yItlwAAAAASUVORK5CYII="/>
                                  </LazyLoad>
                                  <span>Rendez-vous dans votre panier pour finaliser votre commande</span>
                                </li>
                                <li className="rc-list__item">
                                  <LazyLoad>
                                  <img style={{display:"inline-block",marginRight:'10px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAIAAAAA3/ihAAAACXBIWXMAABJ0AAASdAHeZh94AAAB00lEQVR42u2WMW+CQBTH+RiEuR+Aka3p0MGBkaGDQ5MupulkHDRx0MGhQ5P2C3Rj6MDQhKWJnUgcysZgYgdTQQ9Rg0jwMAxWBFEQFJS2aSJ50727+x3v/u+fQ+a/+CEn2B/A9JZyX5KoEmBaxs/CoAAIrIO4IVZ56KUsbdxgFYYfqynBJvSNR1oGKQvO7/LgAncH0VulnQZsVMX8MEyi+/O5OSzivvFc3UgKswYcyBAd9Fx6EpxyDcthMLXeRQLjj6OEMG1w550Xl176kWUUnsUADE0M48Hm+kt6HCUQwEoBWJGDCWGCjIdVJkT6mpLbuDNXIOZU1aYw9p2pD+R6C4qZ7Go+Qb46t6dlKkrThE26e+aAKfBhxlPjYguKcNc01mtgk+lRq3MQ+a3u9pekzFvxpQ/91bA+6aAcFpGlVX01IzChJhxsV32F2iI5Yqm57WF3AopFNXgCGHyrhJKWkVcGXp1ZcE1JBXoIDnYQne/hWDTMvh6YkhF/KVl8F2mj94+EmaMquY+034XjwbY9Ykf45ZccFir3qChys+PKKMhETBjefdWOFciszbgOhOAdsgTo+vCdWwYrF/LiKiXWeCOlZ4HtrYZqWlEp/fSUO8H+E+wbiCxAG+yItlwAAAAASUVORK5CYII="/>
                                  </LazyLoad>
                                  <span>Ajoutez votre code promotionnel en dessous du panier et cliquez sur "Appliquer"</span>
                                </li>
                                <li className="rc-list__item">
                                  <LazyLoad>
                                  <img style={{display:"inline-block",marginRight:'10px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAIAAAAA3/ihAAAACXBIWXMAABJ0AAASdAHeZh94AAAB00lEQVR42u2WMW+CQBTH+RiEuR+Aka3p0MGBkaGDQ5MupulkHDRx0MGhQ5P2C3Rj6MDQhKWJnUgcysZgYgdTQQ9Rg0jwMAxWBFEQFJS2aSJ50727+x3v/u+fQ+a/+CEn2B/A9JZyX5KoEmBaxs/CoAAIrIO4IVZ56KUsbdxgFYYfqynBJvSNR1oGKQvO7/LgAncH0VulnQZsVMX8MEyi+/O5OSzivvFc3UgKswYcyBAd9Fx6EpxyDcthMLXeRQLjj6OEMG1w550Xl176kWUUnsUADE0M48Hm+kt6HCUQwEoBWJGDCWGCjIdVJkT6mpLbuDNXIOZU1aYw9p2pD+R6C4qZ7Go+Qb46t6dlKkrThE26e+aAKfBhxlPjYguKcNc01mtgk+lRq3MQ+a3u9pekzFvxpQ/91bA+6aAcFpGlVX01IzChJhxsV32F2iI5Yqm57WF3AopFNXgCGHyrhJKWkVcGXp1ZcE1JBXoIDnYQne/hWDTMvh6YkhF/KVl8F2mj94+EmaMquY+034XjwbY9Ykf45ZccFir3qChys+PKKMhETBjefdWOFciszbgOhOAdsgTo+vCdWwYrF/LiKiXWeCOlZ4HtrYZqWlEp/fSUO8H+E+wbiCxAG+yItlwAAAAASUVORK5CYII="/>
                                  </LazyLoad>
                                  <span>Créez votre compte et passez votre commande</span>
                                </li>
                              </ul>    
                            </div>
                          </div>
                          <div className="rc-column">
                            <LazyLoad>
                                <img className="w-100 lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=534" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=1068 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=1068 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw69ae4919/Social-promotion-landing-page/CAT-ANTIBACTERIAL-MAT.png?sw=534"/>
                            </LazyLoad>
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
                  <div className="experience-component experience-assets-textContent">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  ">
                      <p>
                        <em>*Offre valable uniquement en France métropolitaine hors îles françaises et uniquement sur le site </em>
                        <a href="/" target="_self" data-link-type="external" data-link-label="/">
                          <strong>
                            <em>https://shop.royalcanin.fr</em>
                          </strong>
                        </a>
                        <em>, Code valable du 23/11/2020 au 23/12/2020 pour l'achat au minimum d'un aliment chat. Dans la limite des stocks disponibles. Code promotionnel non-cumulable avec d’autres offres promotionnelles en cours.</em>
                      </p>
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

export default CadeauCoussinChat;
