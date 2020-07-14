import React from 'react'
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import ImageMagnifier from '@/components/ImageMagnifier'
import Selection from '@/components/Selection'
import LoginButton from '@/components/LoginButton'
import Rate from '@/components/Rate'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getLoginGoodsEvaluate } from '@/api/details'
import Details from "../index";
@injectIntl
class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsEvaluatesList: [],
            evaluatesCurrentPage: 0,
            valuatesTotalPages: 0,
            selectedSortBy: 0
        }
    }
    componentDidMount() {
        this.getGoodsEvaluates(1, 10,null)
    }
    sortByChange(e) {
        this.setState({
            selectedSortBy: e.target.value
        })
    }
    evaluatesPrePage() {
        let currentPage = this.state.evaluatesCurrentPage
        if(currentPage > 1) {
            currentPage--
            this.getGoodsEvaluates(currentPage, 5, null)
        }
    }
    evaluatesNextPage() {
        let currentPage = this.state.evaluatesCurrentPage
        if(currentPage < this.state.valuatesTotalPages) {
            currentPage++
            this.getGoodsEvaluates(currentPage, 5, null)
        }
    }
    async getGoodsEvaluates (pageNum = 1, pageSize = 5, sort) {
        let parmas = {
            pageNum: 1,
            pageSize: 5,
            goodsInfoId: this.props.id,
            sortColumn: '',
            sortRole: ''
        }
        switch (this.state.selectedSortBy) {
            case 0:
                parmas.sortColumn = 'createTime'
                parmas.sortRole = 'asc'
                break;
            case 1:
                parmas.sortColumn = 'evaluateScore'
                parmas.sortRole = 'desc'
                break
            case 2:
                parmas.sortColumn = 'evaluateScore'
                parmas.sortRole = 'asc'
                break
            default:
                break
        }
        let res = await getLoginGoodsEvaluate(parmas)
        if(res.context && res.context.goodsEvaluateVOPage ) {
            let obj = res.context.goodsEvaluateVOPage
            let list = obj.content
            list.forEach(item => {
                item.commentator = item.isAnonymous ? 'Anonymous' : item.evaluateAnswerAccountName
                item.commentTime = item.evaluateAnswerTime
                item.title = item.evaluateContent
                item.description = item.evaluateAnswer
                item.rate = item.evaluateScore
            })
            console.log(list, 'review list')
            this.setState({
                evaluatesCurrentPage: obj.number,
                valuatesTotalPages: obj.totalPages,
                goodsEvaluatesList: list
            }, () => {
                if(this.state.goodsEvaluatesList.length === 0 ) {
                    this.setState({
                        goodsEvaluatesList: [
                            {
                                commentator: 'John Doe',
                                commentTime: '02 Nov 2018',
                                title: 'Excellent recommendation from Breeder and Vet.',
                                description: 'We switched our boxer to Royal Canin 2 weeks ago and she is the happiest dog ever! Her coat is now so shiny and soft, she is constantly going to her food bowl to eat, the shape of the food makes it so much easier for her to eat. ',
                                rate: 5
                            },
                            {
                                commentator: 'John Doe1',
                                commentTime: '02 Nov 2018',
                                title: 'Excellent recommendation from Breeder and Vet.',
                                description: 'We switched our boxer to Royal Canin 2 weeks ago and she is the happiest dog ever! Her coat is now so shiny and soft, she is constantly going to her food bowl to eat, the shape of the food makes it so much easier for her to eat. ',
                                rate: 5
                            },
                            {
                                commentator: 'John Doe2',
                                commentTime: '02 Nov 2018',
                                title: 'Excellent recommendation from Breeder and Vet.',
                                description: 'We switched our boxer to Royal Canin 2 weeks ago and she is the happiest dog ever! Her coat is now so shiny and soft, she is constantly going to her food bowl to eat, the shape of the food makes it so much easier for her to eat. ',
                                rate: 4
                            }
                        ]
                    })
                }
            })
        }
    }
    render () {
        const data = this.state
        return (
            <div>
                <div>
                    <div className="rc-layout-container rc-two-column rc-max-width--lg rc-padding-top--sm">
                        <div className="rc-column ">
                            <h5 className="red-text">
                                Customer reviews
                            </h5>
                        </div>
                    </div>
                    <div className="rc-layout-container rc-padding-bottom--xs rc-max-width--lg">
                        <div className="rc-column">
                            <form>
                              <span className="rc-select rc-select-processed">
                                <label className="rc-select__label" htmlFor="id-single-select">Sort by</label>
                                <select data-js-select="" id="id-single-select"
                                        onChange={(e) => this.sortByChange(e)}
                                        value = {this.state.selectedSortBy}>
                                  <option value={0}>Most Recent</option>
                                  <option value={1}>Lowest to Highest Rating</option>
                                  <option value={2}>Hightest to Lowest Rating</option>
                                </select>
                              </span>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rc-layout-container rc-one-column rc-max-width--lg">
                        <div className="rc-column rc-margin-bottom--sm">
                            <div className="rc-layout-container rc-margin-top--md rc-stacked">
                                <div className="rc-column rc-padding-x--none--desktop">
                                    {/*list*/}
                                    {
                                        data.goodsEvaluatesList.map(item => (
                                                <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-bottom rc-border-colour--interface">
                                                    <div className="rc-column">
                                                        <div className="rc-padding--md--desktop rc-padding--sm--mobile">
                                                            <div className="red-text">{item.commentator}</div>
                                                            <div>{item.commentTime}</div>
                                                        </div>
                                                    </div>
                                                    <div className="rc-column rc-quad-width">
                                                        <div className="rc-padding--md--desktop rc-padding--sm--mobile">
                                                            <Rate def={5} disabled={true}/>
                                                            <div className="rc-padding-bottom--xs">{item.title}</div>
                                                            {/*{item.description}*/}
                                                            <div className="img-box">
                                                                {
                                                                    item.evaluateImageList && item.evaluateImageList.length > 0 ?
                                                                        item.evaluateImageList.map((img) =>
                                                                            <div className="img-wrapper"><img className="rc-img--square rc-img--square-custom " src={img.goodsInfoImg}/></div>
                                                                        )
                                                                        : null
                                                                }
                                                            </div>
                                                            {
                                                                !item.evaluateAnswer?
                                                                    <div>
                                                                        <div>
                                                                            <span className="red-text"><FormattedMessage id="replyComments" /></span>
                                                                        </div>
                                                                        <div className="rc-padding-top--xs">
                                                                        </div>
                                                                    </div> : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                                {/*分頁*/}
                                <div className="rc-column rc-margin-top--md">
                                    <nav className="rc-pagination" data-pagination="" data-pages={data.valuatesTotalPages}
                                         data-rc-feature-pagination-setup="true" data-rc-pagination-active="true">
                                        <form action="#" method="POST" className="rc-pagination__form">
                                            <button
                                                className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography "
                                                disabled={data.evaluatesCurrentPage===1}
                                                type="submit" data-prev="" aria-label="Previous step" onClick={this.evaluatesPrePage.bind(this)}></button>
                                            <div className="rc-pagination__steps">
                                                <input type="text" className="rc-pagination__step rc-pagination__step--current"
                                                       aria-label="Current step" value={data.evaluatesCurrentPage}></input>
                                                <div className="rc-pagination__step rc-pagination__step--of">of <span
                                                    data-total-steps-label="">{data.valuatesTotalPages}</span></div>
                                            </div>
                                            <button
                                                className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                                                disabled={data.evaluatesCurrentPage >= data.valuatesTotalPages}
                                                type="submit" data-next="" aria-label="Previous step" onClick={this.evaluatesNextPage.bind(this)} ></button>
                                        </form>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Reviews
