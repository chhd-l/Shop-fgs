import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import Skeleton from 'react-skeleton-loader';
import getCardImg from '@/lib/get-card-img';
import { getPaymentMethod, deleteCard } from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { loadJS } from '@/utils/utils';
import { scrollPaymentPanelIntoView } from '../../modules/utils';
import LazyLoad from 'react-lazyload';
import { usPaymentInfo } from '@/api/payment';
import './list.css';

function CardItemCover({
  selectedSts,
  hanldeClickCardItem = () => {},
  el,
  savedToBackend = false,
  children
}) {
  return (
    <div
      className={`rounded creditCompleteInfoBox position-relative ui-cursor-pointer-pure border p-4 ${
        selectedSts ? 'active border-blue' : ''
      }`}
      onClick={hanldeClickCardItem}
    >
      {selectedSts && (!savedToBackend || el.encryptedSecurityCode) && (
        <span
          className="position-absolute iconfont font-weight-bold green"
          style={{
            right: '3%',
            bottom: '4%'
          }}
        >
          &#xe68c;
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}

@inject('loginStore', 'paymentStore')
@observer
class CyberCardList extends React.Component {
  static defaultProps = {
    updateFormValidStatus: () => {},
    updateSelectedCardInfo: () => {},
    subBuyWay: '', // once/fre
    billingJSX: null
  };
  constructor(props) {
    super(props);
    this.state = {
      listLoading: false,
      cardList: [],
      selectedId: '',
      formVisible: false,
      visitorAdyenFormData: null,
      memberUnsavedCardList: [], // 会员，选择不保存卡情况下，卡信息存储该字段中
      saveLoading: false
    };
    this.handleClickConfirmDeleteBtn =
      this.handleClickConfirmDeleteBtn.bind(this);
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.hanldeClickCardItem = this.hanldeClickCardItem.bind(this);
    this.editFormRef = React.createRef();
  }
  componentDidMount() {
    if (this.isLogin) {
      this.queryList();
    } else {
      this.setState({ formVisible: true });
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }

  //会员绑卡
  usPaymentInfoEvent = async (params) => {
    try {
      const newCardNumber = params?.cardNumber?.replace(/\s*/g, '') || '';
      const newParams = Object.assign({}, params, {
        cardNumber: newCardNumber?.replace(/\d(?=\d{4})/g, 'X')
      });
      const res = await usPaymentInfo(newParams);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  currentCvvChange(el, e) {
    let { cardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    el.cardCvv = value;
    this.setState(
      {
        cardList
      },
      () => {
        this.hanldeUpdateSelectedCardInfo();
      }
    );
  }
  queryList = async ({
    currentCardEncryptedSecurityCode,
    showListLoading = true
  } = {}) => {
    showListLoading && this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod();
      let cardList = res.context;

      if (cardList.length == 0) {
        this.props.showCyberForm();
        this.props.setCardListToEmpty();
      }

      //清空cardList中的每项cardCvv
      cardList.forEach((item) => {
        item.cardCvv = '';
      });

      // 初始化时，重置保存卡列表的isLoadCvv状态
      Array.from(cardList, (c) => {
        c.isLoadCvv = false;
        return c;
      });

      // 给刚保存的卡默认加上CVV start
      if (currentCardEncryptedSecurityCode) {
        const firstSaveCard = find(
          cardList,
          (ele) => ele.id === this.state.selectedId
        );
        if (!!firstSaveCard) {
          firstSaveCard.encryptedSecurityCode =
            currentCardEncryptedSecurityCode;
        }
        this.props.updateSelectedCardInfo(firstSaveCard);
      }
      // 给刚保存的卡默认加上CVV end

      const defaultItem = find(cardList, (ele) => ele.isDefault === 1);
      let tmpId =
        this.state.selectedId ||
        (defaultItem && defaultItem.id) ||
        (cardList.length && cardList[0].id) ||
        '';
      this.setState(
        {
          cardList,
          selectedId: tmpId,
          formVisible:
            cardList.concat(this.state.memberUnsavedCardList).length === 0
        },
        () => {
          this.hanldeUpdateSelectedCardInfo();
        }
      );
    } catch (err) {
      console.log(err);
      //this.props.showErrorMsg(err.message);
    } finally {
      this.setState({
        listLoading: false
      });
    }
  };
  updateConfirmTooltipVisible(el, status) {
    let { cardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      cardList
    });
  }
  async handleClickConfirmDeleteBtn({ el, idx }) {
    let { cardList } = this.state;
    // 从数据库删除卡信息/从本地存储中删除卡信息
    if (el.paymentToken) {
      el.confirmTooltipVisible = false;
      const currentId = el.id;
      el.isLoadCvv = false;
      this.setState(
        {
          listLoading: true,
          cardList,
          selectedId: ''
        },
        () => {
          scrollPaymentPanelIntoView();
          this.hanldeUpdateSelectedCardInfo();
        }
      );
      deleteCard({
        id: currentId
      })
        .then(() => {
          this.queryList();
        })
        .catch((err) => {
          this.queryList();
          this.props.showErrorMsg(err.message);
          this.setState(
            {
              listLoading: false,
              selectedId: currentId
            },
            () => {
              this.hanldeUpdateSelectedCardInfo();
            }
          );
        });
    } else {
      let { memberUnsavedCardList, selectedId, cardList } = this.state;
      let tmpSelectedId = selectedId;
      el.confirmTooltipVisible = false;
      memberUnsavedCardList.splice(idx, 1);
      // 删除了卡后，seletedId还是否存在于列表中，不存在则默认选中第一个了，否则选择为空了
      const allCardList = memberUnsavedCardList.concat(cardList);
      const selectedCard = allCardList.filter(
        (ele) => ele.id === selectedId
      )[0];
      if (!selectedCard) {
        tmpSelectedId = allCardList[0] ? allCardList[0].id : '';
      }
      this.setState(
        {
          memberUnsavedCardList,
          selectedId: tmpSelectedId
        },
        () => this.hanldeUpdateSelectedCardInfo()
      );
    }
  }
  //切换卡
  hanldeClickCardItem(el, e) {
    e.preventDefault();
    e.stopPropagation();
    //e.nativeEvent.stopImmediatePropagation();
    let { cardList, selectedId } = this.state;
    if (el.id === selectedId) return false;
    this.setState(
      {
        cardList,
        selectedId: el.id
      },
      () => this.hanldeUpdateSelectedCardInfo()
    );
  }
  hanldeUpdateSelectedCardInfo = () => {
    const { cardList, selectedId } = this.state;
    const el = find(cardList, (ele) => ele.id === selectedId) || null;
    //debugger
    this.props.updateSelectedCardInfo(el);
    this.updateFormValidStatus(el);
  };
  updateFormValidStatus = (el) => {
    this.props.updateFormValidStatus(
      el && el.encryptedSecurityCode ? true : false
    );
  };
  getBrowserInfo(state) {
    this.props.paymentStore.setBrowserInfo(state.data.browserInfo);
  }
  handleClickDeleteBtn(el, e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateConfirmTooltipVisible(el, true);
  }
  handleClickAddBtn = () => {
    this.setState({ formVisible: true, selectedId: '' }, () => {
      this.hanldeUpdateSelectedCardInfo();
      this.props.showCyberForm();
    });

    scrollPaymentPanelIntoView();
  };
  handleClickEditBtn = (e) => {
    e.stopPropagation();
    this.props.paymentStore.setStsToEdit({
      key: 'paymentMethod',
      hideOthers: true
    });
    this.setState({ formVisible: true, selectedId: '' }, () => {
      this.hanldeUpdateSelectedCardInfo();
    });
  };
  renderOneCard = ({ data, showLastFour = true, selectedSts }) => {
    let cvvId = data.id;
    return (
      <div className="row">
        <div className="col-6 col-sm-4 d-flex flex-column pb-1 md:pb-0">
          <LazyLoad>
            <img
              alt="card background"
              className="PayCardImgFitScreen"
              src={getCardImg({
                supportPaymentMethods:
                  this.props.paymentStore.supportPaymentMethods,
                currentVendor: data.paymentVendor
              })}
              style={{ width: '89%' }}
            />
          </LazyLoad>
        </div>
        <div className="col-12 col-sm-8 flex-column justify-content-around d-flex pb-1 md:pb-0">
          <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
            <div className={`col-12 mb-1`}>
              <div className="row align-items-center">
                <div className="col-12">{data.holderName}</div>
              </div>
              {!showLastFour && (
                <div className="row align-items-center">
                  <div className="col-12">{data.paymentVendor}</div>
                </div>
              )}
            </div>
          </div>
          {showLastFour && (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
              <div className="col-6">
                <span style={{ fontSize: '.875rem' }}>
                  <FormattedMessage id="payment.cardNumber2" />
                </span>
                <br />
                <span
                  className="creditCompleteInfo fontFitSCreen"
                  style={{ fontSize: '.875rem' }}
                >
                  xxxx xxxx xxxx {data.lastFourDigits}
                </span>
              </div>
              <div className={`col-6 border-left`}>
                <span style={{ fontSize: '.875rem' }}>
                  <FormattedMessage id="payment.cardType" />
                </span>
                <br />
                <span className="creditCompleteInfo fontFitSCreen">
                  {data.paymentVendor}
                </span>
              </div>
            </div>
          )}
          {selectedSts ? (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break mt-2">
              <div className={`col-12 color-999 mb-1`}>
                <div className="row align-items-center">
                  <div className={`col-4`} style={{ fontSize: '.875rem' }}>
                    <FormattedMessage id="CVV" />
                  </div>
                  <div
                    className={`col-4 color-999 text-left creditCompleteInfo`}
                  >
                    <input
                      onChange={this.currentCvvChange.bind(this, data)}
                      type="password"
                      autoComplete="new-password"
                      maxLength="4"
                      className="w-100"
                      name="new-password"
                      //value={data.cardCvv}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-sm-4" />
        <div className="col-12 col-sm-8">
          <div id={`cvv_${cvvId}`} className="cvv" />
        </div>
      </div>
    );
  };
  renderList = () => {
    let { visitorAdyenFormData, selectedId } = this.state;
    return this.isLogin ? (
      this.renderMemberCardPanel()
    ) : (
      <>
        {visitorAdyenFormData && (
          <CardItemCover
            selectedSts={visitorAdyenFormData.id === selectedId}
            key={0}
          >
            {this.renderOneCard({
              data: visitorAdyenFormData,
              showLastFour: false
            })}
            {this.renderCardEditBtnJSX()}
          </CardItemCover>
        )}
      </>
    );
  };
  renderMemberCardPanel = () => {
    const { cardList, memberUnsavedCardList, selectedId } = this.state;
    const unSavedCardListJSX = memberUnsavedCardList.map((el, idx) => (
      <CardItemCover
        key={el.id}
        selectedSts={el.id === selectedId}
        hanldeClickCardItem={this.hanldeClickCardItem.bind(this, el)}
      >
        {this.renderOneCard({
          data: el,
          showLastFour: false
        })}
        {this.renderCardDeleteBtnJSX({ el, idx })}
      </CardItemCover>
    ));
    const cardListJSX = cardList.map((el, idx) => {
      return (
        <CardItemCover
          key={el.id}
          selectedSts={el.id === selectedId}
          hanldeClickCardItem={this.hanldeClickCardItem.bind(this, el)}
          el={el}
          savedToBackend={true}
        >
          {this.renderOneCard({ data: el, selectedSts: el.id === selectedId })}
          {this.renderCardDeleteBtnJSX({ el, idx })}
        </CardItemCover>
      );
    });
    return (
      <>
        {unSavedCardListJSX}
        {cardListJSX}
        <div
          className="p-4 border text-center mt-2 rounded ui-cursor-pointer font-weight-normal"
          ref={(node) => {
            if (node) {
              node.style.setProperty('border-width', '.1rem', 'important');
              node.style.setProperty('border-style', 'dashed', 'important');
            }
          }}
          onClick={this.handleClickAddBtn}
        >
          <a className="rc-styled-link">
            <FormattedMessage id="addNewCreditCard" />
          </a>
        </div>
      </>
    );
  };
  renderCardDeleteBtnJSX = ({ el, idx = -1 }) => {
    return (
      <div
        className="position-absolute"
        style={{
          right: '3%',
          top: '2%'
        }}
      >
        <span className={`position-relative pl-2 ui-cursor-pointer-pure`}>
          <span onClick={this.handleClickDeleteBtn.bind(this, el)}>
            <FormattedMessage id="delete" />
          </span>
          <ConfirmTooltip
            containerStyle={{
              transform: 'translate(-89%, 105%)'
            }}
            arrowStyle={{ left: '89%' }}
            display={el.confirmTooltipVisible}
            content={
              <FormattedMessage
                id="confirmDelete2"
                values={{
                  val1: <br />,
                  val2: '************' + el.lastFourDigits
                }}
              />
            }
            confirm={this.handleClickConfirmDeleteBtn.bind(this, { el, idx })}
            updateChildDisplay={(status) =>
              this.updateConfirmTooltipVisible(el, status)
            }
          />
        </span>
      </div>
    );
  };
  renderCardEditBtnJSX = () => {
    return (
      <div
        className="position-absolute ui-cursor-pointer-pure"
        style={{
          right: '3%',
          top: '2%'
        }}
        onClick={this.handleClickEditBtn}
      >
        <span
          className={`position-relative pl-2 font-weight-normal`}
          style={{ color: '#444' }}
        >
          <FormattedMessage id="edit" />
        </span>
      </div>
    );
  };
  updateAdyenPayParam = (data) => {
    let { cardList, memberUnsavedCardList } = this.state;
    if (data && !data.holderName) {
      data = Object.assign(data, {
        holderName: data.hasHolderName,
        paymentVendor: data.adyenBrands,
        cardType: data.brand
      });
    }
    // 会员，选择不保存卡情况下，卡信息存储data字段中
    if (!data.storePaymentMethod) {
      this.setState({
        memberUnsavedCardList: [data, ...memberUnsavedCardList]
      });
    }
    this.setState({
      visitorAdyenFormData: data,
      cardList
    });
  };
  handleUpdateSelectedId = (selectedId) => {
    this.setState({ selectedId }, () => {
      this.hanldeUpdateSelectedCardInfo();
    });
  };
  handleClickCancel = () => {
    if (this.editFormRef) {
      this.editFormRef.current.handleClickCancel();
      this.setState({ formVisible: false });
    }
    scrollPaymentPanelIntoView();
  };
  clickConfirm = async () => {
    this.setState({ saveLoading: true });
    try {
      if (this.editFormRef) {
        await this.editFormRef.current.handleSavePromise();
        // this.setState({ formVisible: false });
      }
    } catch (err) {
      throw new Error(err.message);
    }
    this.setState({ saveLoading: false });
    scrollPaymentPanelIntoView();
  };
  render() {
    const { billingJSX } = this.props;
    const {
      cardList,
      memberUnsavedCardList,
      formVisible,
      listLoading,
      saveLoading
    } = this.state;
    const footerJSX = <>{billingJSX}</>;
    return (
      <>
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
        ) : cardList.length ? (
          <span>
            {this.renderList()}
            {footerJSX}
          </span>
        ) : null}
      </>
    );
  }
}

export default CyberCardList;
