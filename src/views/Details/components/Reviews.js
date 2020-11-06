import React from 'react';
import Pagination from '@/components/Pagination';
import Rate from '@/components/Rate';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getLoginGoodsEvaluate, getUnLoginGoodsEvaluate } from '@/api/details';
import Selection from '@/components/Selection';
import '../index.css';
import Skeleton from 'react-skeleton-loader';
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
      showPicIndex: -1,
      imgList: -1,
      total: 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.id && nextProps.id !== this.state.id) {
      this.setState(
        {
          id: nextProps.id
        },
        () => {
          this.getGoodsEvaluates(1, 5, null);
        }
      );
    }
  }

  sortByChange(e) {
    this.setState(
      {
        selectedSortBy: e.value
      },
      () => {
        this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5, null);
      }
    );
  }

  evaluatesPrePage() {
    let currentPage = this.state.evaluatesCurrentPage;
    if (currentPage > 1) {
      currentPage--;
      this.getGoodsEvaluates(currentPage, 5, null);
    }
  }

  evaluatesNextPage() {
    let currentPage = this.state.evaluatesCurrentPage;
    if (currentPage < this.state.valuatesTotalPages) {
      currentPage++;
      this.getGoodsEvaluates(currentPage, 5, null);
    }
  }

  hanldePageNumChange(params) {
    this.setState(
      {
        evaluatesCurrentPage: params.currentPage
      },
      () => this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5)
    );
  }

  async getGoodsEvaluates(pageNum = 1, pageSize = 5, sort) {
    let parmas = {
      pageNum: pageNum - 1,
      pageSize: pageSize,
      goodsId: this.state.id,
      sortColumn: '',
      sortRole: ''
    };
    this.setState({
      loading: true,
      goodsEvaluatesList: []
    });
    switch (Number(this.state.selectedSortBy)) {
      case 0:
        parmas.sortColumn = 'evaluateTime';
        parmas.sortRole = 'desc';
        break;
      case 1:
        parmas.sortColumn = 'evaluateScore';
        parmas.sortRole = 'asc';
        break;
      case 2:
        parmas.sortColumn = 'evaluateScore';
        parmas.sortRole = 'desc';
        break;
      default:
        break;
    }
    let res;
    if (this.props.isLogin) {
      res = await getLoginGoodsEvaluate(parmas);
    } else {
      res = await getUnLoginGoodsEvaluate(parmas);
    }
    if (res.context && res.context.goodsEvaluateVOPage) {
      let obj = res.context.goodsEvaluateVOPage;
      let list = obj.content;
      this.setState({total: obj.total})
      if (list.length > 0) {
        list.forEach((item) => {
          item.commentator = item.customerName;
          item.commentTime = new Date(item.evaluateTime)
            .toGMTString()
            .split(' ')
            .splice(1, 3)
            .join(' ');
          item.title = item.evaluateContent;
          item.description = item.evaluateAnswer;
          item.rate = item.evaluateScore;
        });
        this.setState({
          // evaluatesCurrentPage: obj.number ? obj.number : 0,
          loading: false,
          noData: false,
          valuatesTotalPages: obj.total ? obj.totalPages : 0,
          goodsEvaluatesList: list
        });
      } else {
        this.setState({
          noData: true
        });
      }
    }
  }

  handleImgClick(j, imgList) {
    console.log('被点击的是：', j);
    this.setState({
      showPicIndex: j,
      imgList
    });
  }

  handleCancelMask() {
    this.setState({
      showPicIndex: -1,
      imgList: -1
    });
  }

  handleDirectionClick(direction) {
    console.log('点击方向是：', direction);
    console.log('当前是第', this.state.showPicIndex);
    if (direction > 0) {
      if (this.state.showPicIndex + 1 === this.state.imgList.length) {
        this.setState({
          showPicIndex: 0
        });
      } else {
        this.setState({
          showPicIndex: this.state.showPicIndex + direction
        });
      }
    } else {
      if (this.state.showPicIndex === 0) {
        this.setState({
          showPicIndex: this.state.imgList.length - 1
        });
      } else {
        this.setState({
          showPicIndex: this.state.showPicIndex + direction
        });
      }
    }
  }

  computedList() {
    const list = [
      {
        value: 0,
        // name: 'Most Recent'
        name: this.props.intl.messages.ratingGrade1
      },
      {
        value: 1,
        // name: 'Lowest to Highest Rating'
        name: this.props.intl.messages.ratingGrade2
      },
      {
        value: 2,
        // name: 'Hightest to Lowest Rating'
        name: this.props.intl.messages.ratingGrade3
      }
    ];
    return list;
  }

  render() {
    const data = this.state;
    return (
      <div>
        {this.state.showPicIndex >= 0 && this.state.imgList ? (
          <div>
            <div className="showBigImg">
              <div
                className="direction rc-icon rc-left rc-iconography  "
                onClick={() => this.handleDirectionClick(-1)}
              ></div>
              <img
                alt=""
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src={this.state.imgList[this.state.showPicIndex].artworkUrl}
              ></img>
              {/* <span className="desc" style={{position:"absolute",width:"100%",bottom:'10%'}}>{this.state.showPicIndex + 1} of {this.state.imgList.length}</span> */}
              <div
                className="cancelIcon rc-icon rc-close--sm rc-iconography  "
                onClick={this.handleCancelMask.bind(this)}
              ></div>
              <div
                className="direction rc-icon rc-right rc-iconography  "
                onClick={() => this.handleDirectionClick(1)}
              ></div>
            </div>
            <div
              className="Mask"
              onClick={this.handleCancelMask.bind(this)}
            ></div>
          </div>
        ) : null}
        {!data.noData ? (
          <div className="commentBox">
            {/* <div>
              <div className="rc-padding-bottom--xs rc-bg-colour--brand4 "></div>
            </div> */}
            <div>
              {
                !/Android|webOS|iPhone|iPod|BlackBerry/i.test(
                  navigator.userAgent
                ) && (
                  <div className="rc-max-width--xl rc-padding-x--sm">
                    <div
                      className="rc-column padl0"
                      style={{ marginBottom: '2rem' }}
                    >
                      <div className="red-text text-center" style={{ fontSize: '26px' }}>
                        <FormattedMessage id="customerReviews" />
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="rc-max-width--xl rc-margin-x--sm" style={{maxWidth: '1400px !important', padding: '0 2rem'}}>
                {/* <div className="rc-column padl0">
                  <form>
                    <span className="rc-select rc-select-processed">
                      <label
                        className="rc-select__label"
                        htmlFor="id-single-select"
                        style={{ fontSize: '16px', top: '-1.6rem' }}
                      >
                        <FormattedMessage id="sortBy" />
                      </label>
                      <Selection
                        selectedItemChange={(data) => this.sortByChange(data)}
                        optionList={this.computedList()}
                        selectedItemData={{
                          value: this.state.selectedSortBy
                        }}
                        key={this.state.selectedSortBy}
                      />
                    </span>
                  </form>
                </div> */}
                <div className="commentNum">{this.state.total} Reviews</div>
              </div>

              <div
                className="rc-one-column rc-max-width--lg"
                style={{ maxWidth: '1400px', padding: '0 2rem' }}
              >
                <div className="rc-margin-bottom--sm padl0">
                  <div className="rc-stacked">
                    <div className="rc-padding-x--none--desktop">
                      {this.state.loading ? (
                        <Skeleton color="#f5f5f5" width="100%" height="100%" />
                      ) : (
                        data.goodsEvaluatesList.map((item, i) => (
                          <div
                            className="rc-border-bottom rc-border-colour--interface"
                            key={i}
                            style={{ paddingBottom: '20px' }}
                          >
                            <div className="rc-column padl0 padr0">
                              <div style={{height: '40px', lineHeight: '40px'}}>
                                <span style={{display: 'inline-block', height: '100%', verticalAlign: 'middle', marginTop: '-60px'}}><Rate
                                  def={item.evaluateScore}
                                  disabled={true}
                                  marginSize="maxRate"
                                  color="yellow"
                                /></span>
                                
                                <span
                                  className="commentTitle"
                                >
                                  {item.title}
                                </span>
                                {/*rc-padding--xs--desktop rc-padding--sm--mobile*/}
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontSize: '14px',
                                    marginTop: '.3rem'
                                  }}
                                >
                                  by {item.commentator} &nbsp; on {item.commentTime}
                                </span>
                              </div>
                              <div className="img-box rc-margin-bottom--xs rc-margin-top--xs flex-wrap align-items-start">
                                  {item.evaluateImageList &&
                                  item.evaluateImageList.length > 0
                                    ? item.evaluateImageList.map((img, j) => {
                                        if (j < 3) {
                                          // 评论显示九宫格
                                          return (
                                            <img
                                              alt=""
                                              className="rc-img--square rc-img--square-custom mr-1"
                                              src={img.artworkUrl}
                                              key={j}
                                              style={{
                                                width: '120px',
                                                height: '120px'
                                              }}
                                              onClick={this.handleImgClick.bind(
                                                this,
                                                j,
                                                item.evaluateImageList
                                              )}
                                            />
                                          );
                                        } else {
                                          return null;
                                        }
                                      })
                                    : null}
                                </div>
                                {item.evaluateAnswer ? (
                                  <div>
                                    <div className="rc-padding-top--xs">
                                      {item.evaluateAnswer}
                                    </div>
                                  </div>
                                ) : null}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {/*分頁*/}
                    <div className="rc-column rc-margin-top--md">
                      <Pagination
                        loading={false}
                        defaultCurrentPage={data.evaluatesCurrentPage}
                        key={data.evaluatesCurrentPage}
                        totalPage={data.valuatesTotalPages}
                        onPageNumChange={(params) =>
                          this.hanldePageNumChange(params)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Reviews;
