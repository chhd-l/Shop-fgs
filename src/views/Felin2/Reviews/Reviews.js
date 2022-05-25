import React from 'react';
import Pagination from '@/components/Pagination';
import Selection from '@/components/Selection';
import Rate from '@/components/Rate';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import './index.css';
import Skeleton from 'react-skeleton-loader';

import { getServiceEvaluate, gitDict } from '@/api/felin';

@injectIntl
class Reviews extends React.Component {
  static defaultProps = {
    visible: false,
    onClose: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      goodsEvaluatesList: [],
      evaluatesCurrentPage: 1,
      valuatesTotalPages: 0,
      selectedSortBy: 3,
      loading: false,
      noData: true,
      showPicIndex: -1,
      imgList: -1,
      total: 0
    };
    this.handleDirectionClick = this.handleDirectionClick.bind(this);
  }
  componentDidMount() {
    this.getGoodsEvaluates(1, 5);
  }

  sortByChange(e) {
    this.setState(
      {
        selectedSortBy: e.value
      },
      () => {
        this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5);
      }
    );
  }

  evaluatesPrePage() {
    let currentPage = this.state.evaluatesCurrentPage;
    if (currentPage > 1) {
      currentPage--;
      this.getGoodsEvaluates(currentPage, 5);
    }
  }

  evaluatesNextPage() {
    let currentPage = this.state.evaluatesCurrentPage;
    if (currentPage < this.state.valuatesTotalPages) {
      currentPage++;
      this.getGoodsEvaluates(currentPage, 5);
    }
  }

  hanldePageNumChange = (params) => {
    this.setState(
      {
        evaluatesCurrentPage: params.currentPage
      },
      () => {
        this.getGoodsEvaluates(this.state.evaluatesCurrentPage, 5);
      }
    );
  };

  async getGoodsEvaluates(pageNum = 1, pageSize = 5) {
    let parmas = {
      pageNum: pageNum - 1,
      pageSize: pageSize,
      storeId: window.__.env.REACT_APP_STOREID
    };
    this.setState({
      loading: true,
      goodsEvaluatesList: []
    });

    let res = await getServiceEvaluate(parmas);

    this.setState({
      loading: false
    });
    if (res.context && res.context.goodsEvaluateVOPage) {
      let obj = res.context.goodsEvaluateVOPage;
      let list = obj.content || [];
      this.setState({ total: obj.total });
      if (list.length > 0) {
        list.forEach((item) => {
          item.commentator = item.customerName;
          item.commentTime = new Date(item.evaluateTime)
            .toGMTString()
            .split(' ')
            .splice(1, 3)
            .join(' ');
          item.title = item.evaluateReviewTitle;
          item.description = item.evaluateContent;
          item.rate = item.evaluateScore;
        });
        this.setState({
          noData: false,
          valuatesTotalPages: obj.total ? obj.totalPages : 0,
          goodsEvaluatesList: list
        });
      }
      this.props.onList(list);
    }
  }

  handleImgClick(j, imgList) {
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
        value: 3,
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
    const { visible, onClose } = this.props;
    const {
      imgList,
      showPicIndex,
      total,
      goodsEvaluatesList,
      evaluatesCurrentPage,
      valuatesTotalPages,
      noData
    } = this.state;
    return (
      <div style={{ display: visible ? 'block' : 'none' }}>
        {showPicIndex >= 0 && imgList ? (
          <div>
            <div className="showBigImg">
              <div
                className="direction rc-icon rc-left rc-iconography  "
                onClick={this.handleDirectionClick.bind(this, -1)}
              />
              <LazyLoad height={200}>
                <img
                  alt="artwork image"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src={imgList[showPicIndex].artworkUrl}
                />
              </LazyLoad>

              <div
                className="cancelIcon rc-icon rc-close--sm rc-iconography  "
                onClick={this.handleCancelMask.bind(this)}
              />
              <div
                className="direction rc-icon rc-right rc-iconography  "
                onClick={this.handleDirectionClick.bind(this, 1)}
              />
            </div>
            <div className="Mask" onClick={this.handleCancelMask.bind(this)} />
          </div>
        ) : null}
        <div className="reviews-modal">
          <div
            className="reviews-header"
            style={{ fontSize: '26px', padding: '1rem 1rem 2rem' }}
          >
            <FormattedMessage id="customerReviews" />
            <span
              className="rc-icon rc-close rc-iconography"
              style={{ cursor: 'pointer' }}
              onClick={onClose}
            />
          </div>
          <div style={{ padding: '0 1rem', display: 'none' }}>
            <form>
              <span className="rc-select rc-select-processed">
                <label
                  className="rc-select__label"
                  htmlFor="id-single-select"
                  style={{ fontSize: '1rem', top: '-1.6rem' }}
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
            <div className="reviews-total">{total} Reviews</div>
          </div>

          <div className="reviews-list">
            <div className="rc-padding-x--none--desktop">
              {this.state.loading ? (
                <div style={{ margin: '0 1rem' }}>
                  <Skeleton
                    color="#f5f5f5"
                    width="100%"
                    height="50px"
                    count={2}
                    widthRandomness={0}
                  />
                </div>
              ) : (
                goodsEvaluatesList.map((item, i) => (
                  <div
                    className="rc-border-bottom rc-border-colour--interface"
                    key={i}
                  >
                    <div className="reviews-item">
                      <div className="reviews-item-left">
                        <div className="reviews-item-name">
                          {item.commentator}
                        </div>
                        <div className="reviews-item-time">
                          {item.commentTime}
                        </div>
                      </div>
                      <div className="reviews-item-right">
                        <div className="reviews-item-star">
                          <Rate
                            def={item.evaluateScore}
                            disabled={true}
                            marginSize="maxRate"
                            color="yellow"
                          />
                        </div>
                        {item.title ? (
                          <div className="reviews-item-title">{item.title}</div>
                        ) : null}
                        {item.description ? (
                          <div className="reviews-item-content">
                            {item.description}
                          </div>
                        ) : null}
                        <div className="reviews-item-imgs">
                          {item.evaluateImageList &&
                          item.evaluateImageList.length > 0
                            ? item.evaluateImageList.map((img, j) => {
                                if (j < 3) {
                                  // 评论显示九宫格
                                  return (
                                    <LazyLoad height={200} key={j}>
                                      <img
                                        alt="artwork image"
                                        className="rc-img--square rc-img--square-custom mr-1"
                                        src={img.artworkUrl}
                                        key={j}
                                        style={{
                                          width: '80px',
                                          height: '80px'
                                        }}
                                        onClick={this.handleImgClick.bind(
                                          this,
                                          j,
                                          item.evaluateImageList
                                        )}
                                      />
                                    </LazyLoad>
                                  );
                                } else {
                                  return null;
                                }
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/*分頁*/}
            {goodsEvaluatesList.length ? (
              <div className="rc-column rc-margin-top--md">
                <Pagination
                  loading={false}
                  defaultCurrentPage={evaluatesCurrentPage}
                  key={evaluatesCurrentPage}
                  totalPage={valuatesTotalPages}
                  onPageNumChange={this.hanldePageNumChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
