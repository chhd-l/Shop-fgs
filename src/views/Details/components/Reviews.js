import React from 'react'
import Pagination from '@/components/Pagination'
import Rate from '@/components/Rate'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getLoginGoodsEvaluate, getUnLoginGoodsEvaluate } from '@/api/details'
import Selection from '@/components/Selection'
import Mask from '@/components/Mask'
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
            noData: true,
            showPicIndex:-1,
            imgList:-1,
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
    handleImgClick(j,imgList){
        console.log("被点击的是：",j)
        this.setState({
            showPicIndex:j,
            imgList
        })
    }
    handleCancelMask(){
        this.setState({
            showPicIndex:-1,
            imgList:-1
        })
    }
    handleDirectionClick(direction){console.log()
        console.log("点击方向是：",direction)
        console.log("当前是第",this.state.showPicIndex)
        if(direction>0){
            if(this.state.showPicIndex+1==this.state.imgList.length-1){
                this.setState({
                    showPicIndex:0
                })
            }
            else{
                this.setState({
                    showPicIndex:this.state.showPicIndex+direction
                })
            }
        }
        else{
            if(this.state.showPicIndex==0){
                this.setState({
                    showPicIndex:this.state.imgList.length-2
                })
            }
            else{
                this.setState({
                    showPicIndex:this.state.showPicIndex+direction
                })
            }
        }

    }
    render () {
        const data = this.state
        return (
            <div>

            {
                this.state.showPicIndex>=0&&this.state.imgList? (
                    <div>
                        <div className="showBigImg">
                            <div className="direction" onClick={()=>this.handleDirectionClick(-1)}> 《 </div>
                            <div className="ImgBox">
                            <img src={this.state.imgList[this.state.showPicIndex].artworkUrl}></img>
                            <span className="desc">{this.state.showPicIndex+1} of {this.state.imgList.length}</span>
                            </div>
                            <div className="direction" onClick={()=>this.handleDirectionClick(1)}> 》 </div>
                       
                        </div>                   
                        <div className="Mask" onClick={this.handleCancelMask.bind(this)}></div>
                    </div>
                ):null
            }
                {
                    !data.noData ?
                        <div>
                            <div>
                                <div className="rc-padding-bottom--xs rc-bg-colour--brand4 "></div>
                            </div>
                            <div>
                                <div className="rc-max-width--xl rc-padding-x--sm">
                                    <div className="rc-column padl0">
                                        <h5 className="red-text">
                                            <FormattedMessage id="customerReviews" />
                                        </h5>
                                    </div>
                                </div>
                                <div className="rc-max-width--xl rc-padding-x--sm">
                                    <div className="rc-column padl0">
                                        <form>
                              <span className="rc-select rc-select-processed">
                                <label className="rc-select__label" htmlFor="id-single-select"><FormattedMessage id="sortBy" /></label>
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
                                    <div className="rc-column rc-margin-bottom--sm padl0">
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
                                                            data.goodsEvaluatesList.map((item,i) => (
                                                                    <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-bottom rc-border-colour--interface" key={i}>
                                                                        <div className="rc-column padl0 padr0">
                                                                            <div className="">
                                                                                {/*rc-padding--xs--desktop rc-padding--sm--mobile*/}
                                                                                <div className="red-text">{item.commentator}</div>
                                                                                <div style={{'fontSize': '14px'}}>{item.commentTime}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rc-column rc-quad-width padl0">
                                                                            <div className="">
                                                                                <Rate def={item.evaluateScore} disabled={true}/>
                                                                                <h3 style={{marginTop:'1%',marginBottom:'6%'}}>Title{item.evaluateReviewTitle}</h3>
                                                                                <div className="break mgt-10 mgb-3">{item.title}</div>
                                                                                {/*{item.description}*/}
                                                                                <div className="img-box rc-margin-bottom--xs rc-margin-top--xs flex-wrap"
                                                                                
                                                                                >
                                                                                    {
                                                                                        item.evaluateImageList && item.evaluateImageList.length > 0 ?
                                                                                            item.evaluateImageList.map((img,j) =>{
                                                                                                if(j<3){
                                                        
                                                                                                    // 评论显示九宫格
                                                                                                   return  <div className="img-wrapper mb-2 mr-2 mt-1" key={j} style={{width:"26%",height:"170px"}}>
                                                                                                       <img className="rc-img--square rc-img--square-custom" src={img.artworkUrl}
                                                                                                        style={{width:'100%',height:'100%'}} onClick={this.handleImgClick.bind(this,j,item.evaluateImageList)} /></div>
                                                                                                }
                                                                                                else{
                                                                                                    return null
                                                                                                }
                                                                                            }
                                                                                                
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
