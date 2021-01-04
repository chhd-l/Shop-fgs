import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import Skeleton from 'react-skeleton-loader';
import EditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import { getPaymentMethod, deleteCard } from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { loadJS } from '@/utils/utils';
import { scrollPaymentPanelIntoView } from '../modules/utils';
import LazyLoad from 'react-lazyload';
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
      {children}
    </div>
  );
}

@inject('loginStore', 'paymentStore')
@observer
class AdyenCreditCardList extends React.Component {
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
    this.handleClickConfirmDeleteBtn = this.handleClickConfirmDeleteBtn.bind(
      this
    );
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
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  queryList = async ({
    currentCardEncryptedSecurityCode,
    showListLoading = true
  } = {}) => {
    showListLoading && this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : '',
        storeId: process.env.REACT_APP_STOREID
      });
      let cardList = res.context;

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
          firstSaveCard.encryptedSecurityCode = currentCardEncryptedSecurityCode;
        }
        this.props.updateSelectedCardInfo(firstSaveCard);
      }
      // 给刚保存的卡默认加上CVV end

      const defaultItem = find(cardList, (ele) => ele.isDefaltAddress === 1);
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
      this.props.showErrorMsg(err.message);
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
        id: currentId,
        storeId: process.env.REACT_APP_STOREID
      })
        .then(() => {
          this.queryList();
        })
        .catch((err) => {
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
  hanldeClickCardItem(el, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { cardList, memberUnsavedCardList, selectedId } = this.state;
    if (el.id === selectedId) return false;
    this.setState(
      {
        cardList,
        memberUnsavedCardList,
        selectedId: el.id
      },
      () => this.hanldeUpdateSelectedCardInfo()
    );
  }
  hanldeUpdateSelectedCardInfo = () => {
    const { cardList, memberUnsavedCardList, selectedId } = this.state;
    const el =
      find(
        cardList.concat(memberUnsavedCardList),
        (ele) => ele.id === selectedId
      ) || null;
    this.props.updateSelectedCardInfo(el);
    // 被选中的卡，才加载cvv
    el && el.adyenPaymentMethod && this.loadCvv(el);
    this.updateFormValidStatus(el);
  };
  updateFormValidStatus = (el) => {
    this.props.updateFormValidStatus(
      el && el.encryptedSecurityCode ? true : false
    );
  };
  loadCvv = (el) => {
    const { updateFormValidStatus } = this;
    const { cardList } = this.state;
    var { updateSelectedCardInfo, paymentStore } = this.props;
    const {
      id,
      adyenPaymentMethod: { brand }
    } = el;
    //第一次绑定这张卡,不需要填写CVV start
    if (paymentStore.firstSavedCardCvv == id) {
      el.isLoadCvv = false;
      paymentStore.updateFirstSavedCardCvv('');
      return;
    }
    if (el.isLoadCvv && !el.encryptedSecurityCode) return; //不需要加载(已经加载过+cvv为空)
    if (!el.paymentToken) return; // 不保存的卡(即游客卡)，不需要加载cvv
    //第一次绑定这张卡,不需要填写CVV end

    // ****************************************************************
    //1 不加载cvv框的情况
    //1.1 已加载，并选中
    //1.2 已加载，并无加密cvv
    // if (el.isLoadCvv && (el.id === selectedId || !el.encryptedSecurityCode))
    //   return;
    //*****************************************************************

    el.encryptedSecurityCode = ''; //loadCvv的时候先清空cvv
    let element = '#cvv_' + id;
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: 'test',
            originKey: process.env.REACT_APP_AdyenOriginKEY,
            locale: process.env.REACT_APP_Adyen_locale
          });
          checkout
            .create('card', {
              brand: brand,
              onChange: (state) => {
                console.log(state);
                const tmpCode = state.data.paymentMethod.encryptedSecurityCode;
                if (!state.data.paymentMethod.encryptedSecurityCode) return;
                let result = find(cardList, (ele) => ele.id === id);
                result.encryptedSecurityCode = tmpCode;
                // ****************************************************************
                //el.encryptedSecurityCode = tmpCode;
                // ****************************************************************

                updateSelectedCardInfo(result);
                updateFormValidStatus(result);
                // ****************************************************************
                //_this.setState({ cardList: _this.state.cardList });
                // ****************************************************************
              },
              onLoad: (state) => {
                el.isLoadCvv = true;
              }
            })
            .mount(element);
        }
      }
    });
  };
  handleClickDeleteBtn(el, e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateConfirmTooltipVisible(el, true);
  }
  handleClickAddBtn = () => {
    this.setState({ formVisible: true, selectedId: '' }, () => {
      this.hanldeUpdateSelectedCardInfo();
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
  renderOneCard = ({ data, showLastFour = true }) => {
    let cvvId = data.id;
    return (
      <div className="row">
        <div className="col-6 col-sm-4 d-flex flex-column pb-1 pb-md-0">
          <LazyLoad>
            <img
              alt=""
              className="PayCardImgFitScreen"
              src={
                CREDIT_CARD_IMG_ENUM[
                  data.adyenPaymentMethod && data.adyenPaymentMethod.name
                    ? data.adyenPaymentMethod.name.toUpperCase()
                    : ''
                ]
                  ? CREDIT_CARD_IMG_ENUM[
                      data.adyenPaymentMethod && data.adyenPaymentMethod.name
                        ? data.adyenPaymentMethod.name.toUpperCase()
                        : ''
                    ]
                  : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
              }
              style={{ width: '89%' }}
            />
          </LazyLoad>
        </div>
        <div className="col-12 col-sm-8 flex-column justify-content-around d-flex pb-1 pb-md-0">
          <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
            <div className={`col-12 mb-1`}>
              <div className="row align-items-center">
                <div className="col-12">
                  {data.adyenPaymentMethod
                    ? data.adyenPaymentMethod.holderName
                    : ''}
                </div>
              </div>
              {!showLastFour && (
                <div className="row align-items-center">
                  <div className="col-12">
                    {data.adyenPaymentMethod
                      ? data.adyenPaymentMethod.brand
                      : ''}
                  </div>
                </div>
              )}
            </div>
          </div>
          {showLastFour && (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
              <div className="col-6">
                <span style={{ fontSize: '14px' }}>
                  <FormattedMessage id="payment.cardNumber2" />
                </span>
                <br />
                <span
                  className="creditCompleteInfo fontFitSCreen"
                  style={{ fontSize: '14px' }}
                >
                  xxxx xxxx xxxx{' '}
                  {(data.adyenPaymentMethod &&
                    data.adyenPaymentMethod.lastFour) ||
                    ''}
                </span>
              </div>
              <div className={`col-6 border-left`}>
                <span style={{ fontSize: '14px' }}>
                  <FormattedMessage id="payment.cardType" />
                </span>
                <br />
                <span className="creditCompleteInfo fontFitSCreen">
                  {data.adyenPaymentMethod ? data.adyenPaymentMethod.brand : ''}
                </span>
              </div>
            </div>
          )}
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
      if (el.adyenPaymentMethod !== null) {
        //判断是否是adyen支付
        // this.loadCvv(el);
      }

      return (
        <CardItemCover
          key={el.id}
          selectedSts={el.id === selectedId}
          hanldeClickCardItem={this.hanldeClickCardItem.bind(this, el)}
          el={el}
          savedToBackend={true}
        >
          {this.renderOneCard({ data: el })}
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
    if (data && !data.adyenPaymentMethod) {
      data.adyenPaymentMethod = {
        name: data.brand,
        holderName: data.hasHolderName,
        lastFour: '',
        brand: data.brand
      };
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
    if (this.editFormRef) {
      await this.editFormRef.current.handleSave();
      // this.setState({ formVisible: false });
    }
    this.setState({ saveLoading: false });
    scrollPaymentPanelIntoView();
  };
  renderEditForm = () => {
    const { showErrorMsg, subBuyWay } = this.props;
    const { cardList } = this.state;
    return (
      <EditForm
        ref={this.editFormRef}
        cardList={cardList}
        isCheckoutPage={true}
        showSaveBtn={false}
        isOnepageCheckout={true}
        enableStoreDetails={this.isLogin}
        mustSaveForFutherPayments={subBuyWay === 'frequency'} // 所有商品均不订阅 才能不绑卡
        key={subBuyWay}
        showCancelBtn={false}
        updateFormVisible={(val) => {
          this.setState({ formVisible: val });
        }}
        queryList={this.queryList}
        updateSelectedId={this.handleUpdateSelectedId}
        updateAdyenPayParam={this.updateAdyenPayParam}
        updateClickPayBtnValidStatus={this.props.updateFormValidStatus}
        showErrorMsg={showErrorMsg}
      />
    );
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
    const footerJSX = (
      <>
        {billingJSX}

        {/* 会员取消新增form操作按钮 */}
        {/* <>
          <span
            className="rc-styled-link editPersonalInfoBtn"
            name="contactInformation"
            onClick={this.handleClickCancel}
          >
            <FormattedMessage id="cancel" />
          </span>
          <span className="mr-1 ml-1">
            <FormattedMessage id="or" />
          </span>
        </> */}
      </>
    );
    return (
      <>
        {this.isLogin ? (
          listLoading ? (
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          ) : !formVisible &&
            (cardList.length || memberUnsavedCardList.length) ? (
            <>
              {this.renderList()}
              {footerJSX}
            </>
          ) : (
            <>
              {this.renderEditForm()} {footerJSX}
            </>
          )
        ) : (
          <>
            {!formVisible && this.renderList()}
            <div className={`${formVisible ? '' : 'hidden'}`}>
              {this.renderEditForm()}
            </div>
            {footerJSX}
          </>
        )}
      </>
    );
  }
}

export default AdyenCreditCardList;
