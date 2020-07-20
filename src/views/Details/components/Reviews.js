import React from 'react'
import Pagination from '@/components/Pagination'
import Rate from '@/components/Rate'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getLoginGoodsEvaluate, getUnLoginGoodsEvaluate } from '@/api/details'
import Selection from '@/components/Selection'
import "../index.css";
import Skeleton from "react-skeleton-loader";
@injectIntl
class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            goodsEvaluatesList: [],
            evaluatesCurrentPage: 1,
            valuatesTotalPages: 0,
            selectedSortBy: 0,
            loading: false,
            noData: true
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.id && nextProps.id !== this.state.id) {
            this.setState({
                id: nextProps.id
            },() => {
                this.getGoodsEvaluates(1, 5,null)
            })

        }
    }

    sortByChange(e) {
        this.setState({
            selectedSortBy: e.value
        },() => {
            this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5, null)
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
    hanldePageNumChange (params) {
        this.setState({
            evaluatesCurrentPage: params.currentPage
        }, () => this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5))
    }
    async getGoodsEvaluates (pageNum = 1, pageSize = 5, sort) {
        let parmas = {
            pageNum: pageNum-1,
            pageSize: pageSize,
            goodsId: this.state.id,
            sortColumn: '',
            sortRole: ''
        }
        this.setState({
            loading: true,
            goodsEvaluatesList: []
        })
        switch (Number(this.state.selectedSortBy)) {
            case 0:
                parmas.sortColumn = 'evaluateTime'
                parmas.sortRole = 'desc'
                break;
            case 1:
                parmas.sortColumn = 'evaluateScore'
                parmas.sortRole = 'asc'
                break
            case 2:
                parmas.sortColumn = 'evaluateScore'
                parmas.sortRole = 'desc'
                break
            default:
                break
        }
        let res
        if (this.props.isLogin) {
             res = await getLoginGoodsEvaluate(parmas)
        } else {
             res = await getUnLoginGoodsEvaluate(parmas)
        }
        if(res.context && res.context.goodsEvaluateVOPage ) {
            let obj = res.context.goodsEvaluateVOPage
            let list = obj.content
            if (list.length > 0) {
                list.forEach(item => {
                    item.commentator = item.customerName
                    item.commentTime = new Date(item.evaluateTime ).toGMTString().split(' ').splice(1, 3).join(' ')
                    item.title = item.evaluateContent
                    item.description = item.evaluateAnswer
                    item.rate = item.evaluateScore
                })
                console.log(list, 'review list')
                this.setState({
                    // evaluatesCurrentPage: obj.number ? obj.number : 0,
                    loading: false,
                    noData: false,
                    valuatesTotalPages: obj.total ? obj.totalPages : 0 ,
                    goodsEvaluatesList: list
                })
            } else {
                this.setState({
                    noData: true
                })
            }
        }
    }
    computedList() {
        const list = [
            {
                value: 0,
                name: 'Most Recent'
            },  {
                value: 1,
                name: 'Lowest to Highest Rating'
            },
            {
                value: 2,
                name: 'Hightest to Lowest Rating'
            }
        ]
        return list
    }
    render () {
        const data = this.state
        return (
            <div>
                {
                    !data.noData ?
                        <div>
                            <div>
                                <div className="rc-padding-bottom--xs rc-bg-colour--brand4 "></div>
                            </div>
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
                                {/*<select data-js-select="" id="id-single-select"*/}
                                {/*        onChange={(e) => this.sortByChange(e)}*/}
                                {/*        value = {this.state.selectedSortBy}>*/}
                                {/*  <option value={0}>Most Recent</option>*/}
                                {/*  <option value={1}>Lowest to Highest Rating</option>*/}
                                {/*  <option value={2}>Hightest to Lowest Rating</option>*/}
                                {/*</select>*/}
                                  <Selection
                                       selectedItemChange={data => this.sortByChange(data)}
                                       optionList={this.computedList()}
                                       selectedItemData={{
                                           value: this.state.selectedSortBy
                                       }} />
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
                                                {
                                                    this.state.loading ?
                                                        (
                                                            <Skeleton
                                                                color="#f5f5f5"
                                                                width="100%"
                                                                height="100%"
                                                            />
                                                        ) :
                                                        (
                                                            data.goodsEvaluatesList.map(item => (
                                                                    <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-bottom rc-border-colour--interface">
                                                                        <div className="rc-column">
                                                                            <div className="rc-padding--md--desktop rc-padding--sm--mobile">
                                                                                <div className="red-text">{item.commentator}</div>
                                                                                <div style={{'fontSize': '14px'}}>{item.commentTime}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rc-column rc-quad-width">
                                                                            <div className="rc-padding--md--desktop rc-padding--sm--mobile">
                                                                                <Rate def={item.evaluateScore} disabled={true}/>
                                                                                <div className="break">{item.title}</div>
                                                                                {/*{item.description}*/}
                                                                                <div className="img-box rc-margin-bottom--xs rc-margin-top--xs">
                                                                                    {
                                                                                        item.evaluateImageList && item.evaluateImageList.length > 0 ?
                                                                                            item.evaluateImageList.map((img) =>
                                                                                                <div className="img-wrapper"><img className="rc-img--square rc-img--square-custom height70" src={img.artworkUrl}/></div>
                                                                                            )
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    item.evaluateAnswer?
                                                                                        <div>
                                                                                            <div>
                                                                                                <span className="red-text rc-margin-right--xs" style={{'fontWeight': '400'}}><FormattedMessage id="replyComments" /></span>
                                                                                                <span style={{'fontSize': '14px'}}>{new Date(item.evaluateAnswerTime).toGMTString().split(' ').splice(1, 3).join(' ')}</span>
                                                                                            </div>
                                                                                            <div className="rc-padding-top--xs">
                                                                                                {item.evaluateAnswer}
                                                                                            </div>
                                                                                        </div> : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )
                                                        )
                                                }
                                            </div>
                                            {/*分頁*/}
                                            <div className="rc-column rc-margin-top--md">
                                                <Pagination
                                                    loading={false}
                                                    currentPage={data.evaluatesCurrentPage}
                                                    totalPage={data.valuatesTotalPages}
                                                    onPageNumChange={params => this.hanldePageNumChange(params)} />
                                                {/*<nav className="rc-pagination" data-pagination="" data-pages={data.valuatesTotalPages}*/}
                                                {/*     data-rc-feature-pagination-setup="true" data-rc-pagination-active="true">*/}
                                                {/*    <form action="#" method="POST" className="rc-pagination__form">*/}
                                                {/*        <button*/}
                                                {/*            className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography "*/}
                                                {/*            disabled={data.evaluatesCurrentPage===0}*/}
                                                {/*            type="submit" data-prev="" aria-label="Previous step" onClick={this.evaluatesPrePage.bind(this)}></button>*/}
                                                {/*        <div className="rc-pagination__steps">*/}
                                                {/*            <input type="text" className="rc-pagination__step rc-pagination__step--current"*/}
                                                {/*                   aria-label="Current step" value={data.evaluatesCurrentPage + 1}></input>*/}
                                                {/*            <div className="rc-pagination__step rc-pagination__step--of">of <span*/}
                                                {/*                data-total-steps-label="">{data.valuatesTotalPages}</span></div>*/}
                                                {/*        </div>*/}
                                                {/*        <button*/}
                                                {/*            className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"*/}
                                                {/*            disabled={data.evaluatesCurrentPage+1 >= data.valuatesTotalPages}*/}
                                                {/*            type="submit" data-next="" aria-label="Previous step" onClick={this.evaluatesNextPage.bind(this)} ></button>*/}
                                                {/*    </form>*/}
                                                {/*</nav>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
            </div>

        )
    }
}
export default Reviews
