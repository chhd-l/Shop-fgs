import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { find } from 'lodash';
import Skeleton from 'react-skeleton-loader';
import EditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import { getPaymentMethod, deleteCard } from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { loadJS } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import './list.css';

function CardItemCover({
  selectedSts,
  hanldeClickCardItem = () => {},
  children
}) {
  return (
    <div
      className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
        selectedSts ? 'active border-blue' : ''
      }`}
      onClick={hanldeClickCardItem}
    >
      <div className={`pt-3 pb-3`}>{children}</div>
    </div>
  );
}

@inject('loginStore')
@observer
class AdyenCreditCardList extends React.Component {
  static defaultProps = {
    updateSelectedCardInfo: () => {},
    subBuyWay: '' // once/fre
  };
  constructor(props) {
    super(props);
    this.state = {
      listLoading: false,
      listErr: '',
      cardList: [],
      selectedId: '',
      formVisible: false,
      visitorAdyenFormData: null,
      memberUnsavedCardList: [] // 会员，选择不保存卡情况下，卡信息存储该字段中
    };
    this.handleClickConfirmDeleteBtn = this.handleClickConfirmDeleteBtn.bind(
      this
    );
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.hanldeClickCardItem = this.hanldeClickCardItem.bind(this);
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
  queryList = async () => {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : '',
        storeId: process.env.REACT_APP_STOREID
      });
      let cardList = res.context;
      const defaultItem = find(cardList, (ele) => ele.isDefaltAddress === 1);
      let tmpId =
        this.state.selectedId ||
        (defaultItem && defaultItem.id) ||
        (cardList.length && cardList[0].id) ||
        '';

      this.setState({ cardList, selectedId: tmpId }, () => () =>
        this.hanldeUpdateSelectedCardInfo()
      );
    } catch (err) {
      console.log(err);
      this.setState({ listErr: err.toString() });
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
      this.setState({
        listLoading: true,
        cardList
      });
      deleteCard({ id: el.id, storeId: process.env.REACT_APP_STOREID })
        .then(() => {
          this.queryList();
        })
        .catch((err) => {
          this.props.showErrorMsg(err.message);
          this.setState({
            listLoading: false
          });
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
  hanldeClickCardItem(el) {
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
    this.props.updateSelectedCardInfo(
      find(
        cardList.concat(memberUnsavedCardList),
        (ele) => ele.id === selectedId
      ) || null
    );
  };
  loadCvv = ({ id, adyenPaymentMethod: { brand }, isLoadCvv }) => {
    var { cardList } = this.state;
    var { updateSelectedCardInfo } = this.props;
    if (isLoadCvv) return; //防止重新加载
    let el = '#cvv_' + id;
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
                let result = find(cardList, (ele) => ele.id === id);
                result.encryptedSecurityCode =
                  state.data.paymentMethod.encryptedSecurityCode;
                updateSelectedCardInfo(
                  find(cardList, (ele) => ele.id === id) || null
                );
              }
            })
            .mount(el);
        }
      }
    });
  };
  handleClickDeleteBtn(el, e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateConfirmTooltipVisible(el, true);
  }
  handleClickEditBtn = (e) => {
    e.stopPropagation();
    this.props.paymentStore.setStsToEdit({ key: 'paymentMethod' });
    this.setState({ formVisible: true });
  };
  renderOneCard = ({ data, showLastFour = true }) => {
    let cvvId = data.id;
    return (
      <div className="row">
        <div
          className={`col-6 col-sm-3 d-flex flex-column justify-content-center `}
        >
          <LazyLoad>
          <img
            alt=""
            className={`PayCardImgFitScreen ${
              data.adyenPaymentMethod ? data.adyenPaymentMethod.name : ''
            }`}
            src={
              CREDIT_CARD_IMG_ENUM[
                data.adyenPaymentMethod
                  ? data.adyenPaymentMethod.name.toUpperCase()
                  : ''
              ]
                ? CREDIT_CARD_IMG_ENUM[
                    data.adyenPaymentMethod
                      ? data.adyenPaymentMethod.name.toUpperCase()
                      : ''
                  ]
                : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
            }
          />
          </LazyLoad>
        </div>
        <div
          className={`col-12 col-sm-9 flex-column justify-content-around d-flex`}
        >
          <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
            <div className={`col-12 color-999 mb-1`}>
              <div className="row align-items-center">
                <div className={`col-4`} style={{ fontSize: '14px' }}>
                  <FormattedMessage id="name2" />
                </div>
                <div className={`col-6 creditCompleteInfo`}>
                  {data.adyenPaymentMethod
                    ? data.adyenPaymentMethod.holderName
                    : ''}
                </div>
              </div>
              {!showLastFour && (
                <div className="row align-items-center">
                  <div className={`col-4`} style={{ fontSize: '14px' }}>
                    <FormattedMessage id="payment.cardType" />
                  </div>
                  <div className={`col-6 creditCompleteInfo`}>
                    {data.adyenPaymentMethod
                      ? data.adyenPaymentMethod.brand
                      : ''}
                  </div>
                </div>
              )}
            </div>
          </div>
          {showLastFour && (
            <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
              <div className="col-6 color-999">
                <span style={{ fontSize: '14px' }}>
                  <FormattedMessage id="payment.cardNumber2" />
                </span>
                <br />
                <span className="creditCompleteInfo fontFitSCreen">
                  xxxx xxxx xxxx{' '}
                  {(data.adyenPaymentMethod &&
                    data.adyenPaymentMethod.lastFour) ||
                    ''}
                </span>
              </div>
              <div className={`col-6 border-left color-999`}>
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
        <div id={`cvv_${cvvId}`} className="cvv"></div>
      </div>
    );
  };
  renderList = () => {
    let { visitorAdyenFormData, selectedId } = this.state;
    if (visitorAdyenFormData) {
      visitorAdyenFormData.adyenPaymentMethod = {
        name: visitorAdyenFormData.brand,
        holderName: visitorAdyenFormData.hasHolderName,
        lastFour: '',
        brand: visitorAdyenFormData.brand
      };
    }
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
        this.loadCvv(el);
        el.isLoadCvv = true;
      }

      return (
        <>
          <CardItemCover
            key={el.id}
            selectedSts={el.id === selectedId}
            hanldeClickCardItem={this.hanldeClickCardItem.bind(this, el)}
          >
            {this.renderOneCard({ data: el })}
            {this.renderCardDeleteBtnJSX({ el, idx })}
          </CardItemCover>
        </>
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
          onClick={() => {
            this.setState({ formVisible: true });
          }}
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
          right: '1%',
          top: '2%'
        }}
      >
        <span
          className={`pull-right position-relative pl-2 ui-cursor-pointer-pure`}
        >
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
          right: '1%',
          top: '2%'
        }}
        onClick={this.handleClickEditBtn}
      >
        <span className={`pull-right position-relative pl-2`}>
          <FormattedMessage id="edit" />
        </span>
      </div>
    );
  };
  updateAdyenPayParam = (data) => {
    let { cardList, memberUnsavedCardList } = this.state;
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
  handlUpdateSelectedId = (selectedId) => {
    this.setState({ selectedId }, () => {
      const { cardList, memberUnsavedCardList, selectedId } = this.state;
      this.props.updateSelectedCardInfo(
        find(
          cardList.concat(memberUnsavedCardList),
          (ele) => ele.id === selectedId
        ) || null
      );
    });
  };
  renderEditForm = () => {
    const { cardList } = this.state;
    const { isOnepageCheckout, showErrorMsg, subBuyWay } = this.props;
    return (
      <EditForm
        isCheckoutPage={true}
        isOnepageCheckout={isOnepageCheckout}
        enableStoreDetails={this.isLogin}
        mustSaveForFutherPayments={subBuyWay === 'frequency'} // 所有商品均不订阅 才能不绑卡
        showCancelBtn={cardList.length > 0}
        updateFormVisible={(val) => {
          this.setState({ formVisible: val }, () => {
            // if (!val) {
            //   //取消操作，重新刷列表才会出现cvv框
            //   this.queryList();
            // }
          });
        }}
        queryList={this.queryList}
        updateSelectedId={this.handlUpdateSelectedId}
        updateAdyenPayParam={this.updateAdyenPayParam}
        showErrorMsg={showErrorMsg}
      />
    );
  };
  render() {
    const {
      cardList,
      memberUnsavedCardList,
      formVisible,
      listLoading
    } = this.state;
    return (
      <>
        {this.isLogin ? (
          listLoading ? (
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          ) : !formVisible &&
            (cardList.length || memberUnsavedCardList.length) ? (
            this.renderList()
          ) : (
            this.renderEditForm()
          )
        ) : (
          <>
            {!formVisible && this.renderList()}
            <div className={`${formVisible ? '' : 'hidden'}`}>
              {this.renderEditForm()}
            </div>
          </>
        )}
      </>
    );
  }
}

export default AdyenCreditCardList;
