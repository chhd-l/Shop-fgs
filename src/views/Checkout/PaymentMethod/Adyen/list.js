import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import Skeleton from 'react-skeleton-loader';
import { AdyenEditForm as EditForm } from '@/components';
import getCardImg from '@/lib/get-card-img';
import { getPaymentMethod, deleteCard } from '@/api/payment';
import { Popover } from '@/components/Common';
import { scrollPaymentPanelIntoView } from '../../Modules/utils';
import LazyLoad from 'react-lazyload';
import getPaymentConf from '@/lib/get-payment-conf';
import './list.css';
import { Point } from '@/views/Checkout/Components';

const sessionItemRoyal = window.__.sessionItemRoyal;

function CardItemCover({
  selectedSts,
  hanldeClickCardItem = () => {},
  el,
  savedToBackend = false,
  children
}) {
  return (
    <div
      className={`adyen rounded-lg creditCompleteInfoBox position-relative cursor-pointer mb-2 border p-4 ${
        selectedSts ? 'active border-333' : 'border-transparent'
      }`}
      style={{ backgroundColor: '#F6F6F6' }}
      onClick={hanldeClickCardItem}
    >
      {selectedSts && (!savedToBackend || el.encryptedSecurityCode) && (
        <span className="position-absolute iconfont font-weight-bold green card-cvv-checked">
          &#xe68c;
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}

@inject('loginStore', 'paymentStoreNew')
@observer
class AdyenCreditCardList extends React.Component {
  static defaultProps = {
    updateFormValidStatus: () => {},
    updateSelectedCardInfo: () => {},
    billingJSX: null,
    supportPoint: false
  };
  constructor(props) {
    super(props);
    this.state = {
      listLoading: false,
      cardList: [],
      selectedId: '',
      formVisible: false,
      formAddressValid: false,
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
  componentDidUpdate() {
    if (this.props.paymentStoreNew.isRreshList) {
      if (this.isLogin) {
        this.queryList();
      }
      this.props.paymentStoreNew.setRreshCardList(false);
    }
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
  get curPayWayVal() {
    return this.props.paymentStoreNew.curPayWayVal;
  }
  queryList = async ({
    currentCardEncryptedSecurityCode,
    showListLoading = true
  } = {}) => {
    showListLoading && this.setState({ listLoading: true });
    //this.props.checkoutStore.setInputPoint(0);
    try {
      let res;
      res = await getPaymentMethod({}, true);
      let cardList = res.context;
      //根据curPayWayVal筛选对应支付的绑卡信息
      switch (this.curPayWayVal) {
        case 'adyen_credit_card':
          cardList = cardList.filter(
            (item) => item.paymentItem.toLowerCase() === 'adyen_credit_card'
          );
          break;
        default:
          break;
      }

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
  hanldeUpdateSelectedCardInfo = async () => {
    const { cardList, memberUnsavedCardList, selectedId } = this.state;
    const el =
      find(
        cardList.concat(memberUnsavedCardList),
        (ele) => ele.id === selectedId
      ) || null;
    this.props.updateSelectedCardInfo(el);
    // 被选中的卡，才加载cvv
    if (el) {
      await this.loadCvv(el);
    }
    this.updateFormValidStatus(el);
  };
  updateFormValidStatus = (el) => {
    this.props.updateFormValidStatus(
      el && el.encryptedSecurityCode ? true : false
    );
  };
  getBrowserInfo(state) {
    this.props.paymentStoreNew.setBrowserInfo(state.data.browserInfo);
  }
  loadCvv = async (el) => {
    const _this = this;
    const { updateFormValidStatus } = this;
    const { cardList } = this.state;
    var { updateSelectedCardInfo, paymentStoreNew } = this.props;
    const { curPayWayInfo } = paymentStoreNew;
    const { id, cardType: brand } = el;
    //第一次绑定这张卡,不需要填写CVV start
    if (paymentStoreNew.firstSavedCardCvv == id) {
      el.isLoadCvv = false;
      paymentStoreNew.updateFirstSavedCardCvv('');
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
    const tmpConfArr = await getPaymentConf();
    const adyenOriginKeyConf = tmpConfArr.filter(
      (t) => t.pspItemCode === curPayWayInfo?.code
    )[0];

    const configuration = {
      environment: adyenOriginKeyConf?.environment,
      clientKey: adyenOriginKeyConf?.openPlatformSecret,
      locale: adyenOriginKeyConf?.locale || 'en-US'
    };
    const AdyenCheckout = (await import('@adyen/adyen-web')).default;
    const checkout = await AdyenCheckout(configuration);
    const card = checkout
      .create('card', {
        // brands: brand,
        onChange: (state) => {
          console.log(state);
          _this.getBrowserInfo(state);
          const tmpCode = state.data.paymentMethod.encryptedSecurityCode;
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
    this.props.paymentStoreNew.setStsToEdit({
      key: 'paymentMethod',
      hideOthers: true
    });
    this.setState({ formVisible: true, selectedId: '' }, () => {
      this.hanldeUpdateSelectedCardInfo();
    });
  };
  renderOneCard = ({ data, showLastFour = true }, idx, type) => {
    let cvvId = data.id;
    return (
      <div className="row items-center">
        <div className="col-4 col-sm-3 d-flex  pb-1 md:pb-0">
          <div className="flex items-center">
            <input
              className="rc-input__radio hidden"
              id="type_once"
              type="radio"
              name="buyWay"
              value="0"
              key="0"
              // checked
              checked={data.id === this.state.selectedId}
            />
            <label
              className="rc-input__label--inline"
              htmlFor="type_once"
              style={{
                height: '1.5rem',
                marginBottom: ' 0 !important',
                verticalAlign: 'middle',
                marginRight: '5px',
                marginBottom: 0,
                overflow: 'hidden'
              }}
              // onClick={(e) => e.stopPropagation()}
            >
              {/* <span
              style={{
                fontWeight: 400,
                color: '#333'
              }}
            >
            </span> */}
            </label>
          </div>
          <LazyLoad>
            <img
              alt="card background"
              className="PayCardImgFitScreen w-full md:w-4/5"
              src={getCardImg({
                supportPaymentMethods: this.props.supportPaymentMethods,
                currentVendor: data.paymentVendor
              })}
              // style={{ width: '80%' }}
            />
          </LazyLoad>
        </div>
        <div className="col-8 col-sm-7 flex-column d-flex pb-1 md:pb-0">
          {!showLastFour && (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
              <div className={`col-12 mb-1`}>
                (
                <div className="row align-items-center">
                  <div className="col-12">{data.cardType}</div>
                </div>
                )
              </div>
            </div>
          )}

          {showLastFour && (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin text-break">
              <div className="col-12 col-sm-6 flex items-center">
                {/* <span style={{ fontSize: '.875rem' }}>
                  <FormattedMessage id="payment.cardNumber2" />
                </span>
                <br /> */}
                <span
                  className="creditCompleteInfo fontFitSCreen"
                  // style={{ fontSize: '.875rem' }}
                >
                  xxxx xxxx xxxx {data.lastFourDigits}
                </span>
              </div>
              <div className={`col-12 col-sm-6 md:border-left`}>
                {/* <span style={{ fontSize: '.875rem' }}>
                  <FormattedMessage id="payment.cardType" />
                </span>
                <br /> */}
                <div className="row align-items-center">
                  <div className="col-12 text-xs md:text-base">
                    {data.holderName || 'holderName'}
                  </div>
                </div>
                <span className="creditCompleteInfo fontFitSCreen">
                  {data.cardType}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="col-2 rc-md-up" style={{ paddingLeft: 0 }}>
          {type == 2 ? this.renderCardEditBtnJSX() : null}
          {type == 1 ? this.renderCardDeleteBtnJSX({ el: data, idx }) : null}
        </div>
        <div className="col-4 col-sm-3" />
        <div
          className={`col-6 col-sm-8 ${
            data.id === this.state.selectedId ? 'pt-3' : ''
          }`}
        >
          <div id={`cvv_${cvvId}`} className="cvv" />
        </div>
        <div className="col-8" />
        <div className="col-4 rc-md-down pt-3" style={{ paddingLeft: 0 }}>
          {type == 2 ? this.renderCardEditBtnJSX() : null}
          {type == 1 ? this.renderCardDeleteBtnJSX({ el: data, idx }) : null}
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
            {this.renderOneCard(
              {
                data: visitorAdyenFormData,
                showLastFour: false
              },
              idx,
              2
            )}
            {/* {this.renderCardEditBtnJSX()} */}
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
        {this.renderOneCard(
          {
            data: el,
            showLastFour: false
          },
          idx,
          1
        )}
        {/* {this.renderCardDeleteBtnJSX({ el, idx })} */}
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
          {this.renderOneCard({ data: el }, idx, 1)}
          {/* {this.renderCardDeleteBtnJSX({ el, idx })} */}
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
      // className="position-absolute"
      // style={{
      //   right: '3%',
      //   top: '2%'
      // }}
      >
        <span className={`position-relative pl-2 cursor-pointer`}>
          <Popover
            display={el.confirmTooltipVisible}
            confirm={this.handleClickConfirmDeleteBtn.bind(this, { el, idx })}
            updateChildDisplay={(status) =>
              this.updateConfirmTooltipVisible(el, status)
            }
          >
            <span
              onClick={this.handleClickDeleteBtn.bind(this, el)}
              className={
                'border-b text-gray-600 hover:border-red-600  font-medium pb-0.5'
              }
            >
              <FormattedMessage id="delete" />
            </span>
          </Popover>
        </span>
      </div>
    );
  };
  renderCardEditBtnJSX = () => {
    return (
      <div
        className="position-absolute cursor-pointer"
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
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    console.log(flag);
    this.setState({
      formAddressValid: flag
    });
  };
  renderEditForm = () => {
    const {
      showErrorMsg,
      supportPaymentMethodsVisibleAtForm,
      paymentStoreNew: { curPayWayInfo, subForm }
    } = this.props;
    const { cardList } = this.state;
    return (
      <EditForm
        {...this.props}
        showSetAsDefaultCheckobx={false}
        ref={this.editFormRef}
        cardList={cardList}
        isCheckoutPage={true}
        showSaveBtn={false}
        isOnepageCheckout={true}
        isShowEnableStoreDetails={this.isLogin}
        mustSaveForFutherPayments={subForm.buyWay === 'frequency'} // 所有商品均不订阅 才能不绑卡
        key={`${subForm.buyWay}|${curPayWayInfo?.code}`}
        showCancelBtn={false}
        updateFormVisible={(val) => {
          this.setState({ formVisible: val });
        }}
        queryList={this.queryList}
        updateSelectedId={this.handleUpdateSelectedId}
        updateAdyenPayParam={this.updateAdyenPayParam}
        updateClickPayBtnValidStatus={this.props.updateFormValidStatus}
        showErrorMsg={showErrorMsg}
        supportPaymentMethods={this.props.supportPaymentMethods}
        getFormAddressValidFlag={this.getFormAddressValidFlag}
        supportPaymentMethodsVisible={supportPaymentMethodsVisibleAtForm}
      />
    );
  };
  render() {
    const { billingJSX, supportPoint } = this.props;
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
              <span>{this.renderList()}</span>
              {supportPoint && <Point />}
            </>
          ) : (
            <>
              <span>{this.renderEditForm()}</span>
              {supportPoint && <Point />}
            </>
          )
        ) : (
          <>
            {!formVisible && this.renderList()}
            <div className={`${formVisible ? '' : 'hidden'}`}>
              <span>{this.renderEditForm()}</span>
              {supportPoint && <Point />}
            </div>
          </>
        )}
        <span>{footerJSX}</span>
      </>
    );
  }
}

export default AdyenCreditCardList;
