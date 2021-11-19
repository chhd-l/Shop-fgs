import React from 'react';
import Pagination from '@/components/Pagination';
import Selection from '@/components/Selection';
import Rate from '@/components/Rate';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import './index.css';
import Skeleton from 'react-skeleton-loader';
import { getDeviceType } from '@/utils/utils';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
@injectIntl
class Reviews extends React.Component {
  static defaultProps = {
    id: null,
    visible: false,
    onClose: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
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
    this.state.id && this.getGoodsEvaluates(1, 5, null);
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
      case 3:
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

    // 测试数据
    const getAllReviews = (params) => {
      console.log(params);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            context: {
              goodsEvaluateVOPage: {
                total: 3,
                totalPages: 1,
                content: [
                  {
                    customerName: 'Zhang Sange',
                    evaluateTime: '2021/11/11',
                    evaluateContent: 'Test title this is good item',
                    evaluateAnswer:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.',
                    evaluateScore: 4,
                    evaluateImageList: [
                      {
                        artworkUrl:
                          'https://vsassetscdn.azure.cn/ext/ms.vss-tfs-web/platform-content/Nav-Dashboard.S24hPDN9_BLImMxi.png'
                      },
                      {
                        artworkUrl:
                          'https://vsassetscdn.azure.cn/ext/ms.vss-tfs-web/platform-content/Nav-Dashboard.S24hPDN9_BLImMxi.png'
                      },
                      {
                        artworkUrl:
                          'https://vsassetscdn.azure.cn/ext/ms.vss-tfs-web/platform-content/Nav-Dashboard.S24hPDN9_BLImMxi.png'
                      }
                    ]
                  },
                  {
                    customerName: 'Niersen',
                    evaluateTime: '2021/11/11',
                    evaluateContent: 'Test title',
                    evaluateAnswer:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.',
                    evaluateScore: 3,
                    evaluateImageList: []
                  },
                  {
                    customerName: 'Lin Junjie',
                    evaluateTime: '2021/11/11',
                    evaluateContent: 'evaluateContent',
                    evaluateAnswer:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.',
                    evaluateScore: 5,
                    evaluateImageList: []
                  }
                ]
              }
            }
          });
        }, 500);
      });
    };
    let res = await getAllReviews(parmas);

    if (res.context && res.context.goodsEvaluateVOPage) {
      let obj = res.context.goodsEvaluateVOPage;
      let list = obj.content;
      this.setState({ total: obj.total });
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
        {!noData ? (
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
            <div style={{ padding: '0 1rem' }}>
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
                  <div style={{ marginLeft: '1rem' }}>
                    <Skeleton color="#f5f5f5" width="100%" height="200px" />
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
                            <div className="reviews-item-title">
                              {item.title}
                            </div>
                          ) : null}
                          {item.evaluateAnswer ? (
                            <div className="reviews-item-content">
                              {item.evaluateAnswer}
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
              <div className="rc-column rc-margin-top--md">
                <Pagination
                  loading={false}
                  defaultCurrentPage={evaluatesCurrentPage}
                  key={evaluatesCurrentPage}
                  totalPage={valuatesTotalPages}
                  onPageNumChange={this.hanldePageNumChange}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Reviews;
