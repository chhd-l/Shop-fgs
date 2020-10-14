import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { find } from 'lodash';
import Skeleton from 'react-skeleton-loader';
import EditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import { getPaymentMethod, deleteCard } from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';

@inject('loginStore')
@observer
class AdyenCreditCardList extends React.Component {
  static defaultProps = {
    updateSelectedCardInfo: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      listLoading: false,
      listErr: '',
      cardList: [],
      selectedId: '',
      formVisible: false,
      visitorAdyenFormData: null
    };
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
  async queryList() {
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
      Array.from(cardList, (ele) => (ele.selected = ele.id == tmpId));

      this.setState({ cardList, selectedId: tmpId }, () => {
        this.props.updateSelectedCardInfo(
          find(this.state.cardList, (ele) => ele.id === tmpId) || null
        );
      });
    } catch (err) {
      console.log(err);
      this.setState({ listErr: err.toString() });
    } finally {
      this.setState({
        listLoading: false
      });
    }
  }
  updateConfirmTooltipVisible(el, status) {
    let { cardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      cardList
    });
  }
  deleteCard = async (el) => {
    let { cardList } = this.state;
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
  };
  hanldeClickCardItem = (el) => {
    let { cardList } = this.state;
    if (el.selected) return;
    cardList.map((el) => (el.selected = false));
    el.selected = true;
    this.setState({
      cardList
    });
    this.props.updateSelectedCardInfo(el);
  };
  _renderOneCard = (el, showLastFour = true) => {
    return (
      <div className="row">
        <div
          className={`col-6 col-sm-3 d-flex flex-column justify-content-center `}
        >
          <img
            className="PayCardImgFitScreen"
            src={
              CREDIT_CARD_IMG_ENUM[
                el.adyenPaymentMethod
                  ? el.adyenPaymentMethod.name.toUpperCase()
                  : ''
              ]
                ? CREDIT_CARD_IMG_ENUM[
                    el.adyenPaymentMethod
                      ? el.adyenPaymentMethod.name.toUpperCase()
                      : ''
                  ]
                : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
            }
          />
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
                  {el.adyenPaymentMethod
                    ? el.adyenPaymentMethod.holderName
                    : ''}
                </div>
              </div>
              {!showLastFour && (
                <div className="row align-items-center">
                  <div className={`col-4`} style={{ fontSize: '14px' }}>
                    <FormattedMessage id="payment.cardType" />
                  </div>
                  <div className={`col-6 creditCompleteInfo`}>
                    {el.adyenPaymentMethod ? el.adyenPaymentMethod.brand : ''}
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
                  {(el.adyenPaymentMethod && el.adyenPaymentMethod.lastFour) ||
                    ''}
                </span>
              </div>
              <div className={`col-6 border-left color-999`}>
                <span style={{ fontSize: '14px' }}>
                  <FormattedMessage id="payment.cardType" />
                </span>
                <br />
                <span className="creditCompleteInfo fontFitSCreen">
                  {el.adyenPaymentMethod ? el.adyenPaymentMethod.brand : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  _renderList = () => {
    return this.isLogin
      ? this._renderMemberCardPanel()
      : this._renderVisitorCardPrev();
  };
  _renderMemberCardPanel = () => {
    const { cardList } = this.state;
    const cardListJSX = cardList.map((el, idx) => {
      return (
        <div
          className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
            el.selected ? 'active border-blue' : ''
          } ${idx !== cardList.length - 1 ? 'border-bottom-0' : ''}`}
          key={idx}
          onClick={() => this.hanldeClickCardItem(el)}
        >
          <div className={`pt-3 pb-3`}>
            <div
              className="position-absolute"
              style={{ right: '1%', top: '2%' }}
            >
              <span
                className={`pull-right position-relative pl-2 ui-cursor-pointer-pure`}
              >
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.updateConfirmTooltipVisible(el, true);
                  }}
                >
                  <FormattedMessage id="delete" />
                </span>
                <ConfirmTooltip
                  containerStyle={{
                    transform: 'translate(-89%, 105%)'
                  }}
                  arrowStyle={{ left: '89%' }}
                  display={el.confirmTooltipVisible}
                  confirm={() => this.deleteCard(el)}
                  updateChildDisplay={(status) =>
                    this.updateConfirmTooltipVisible(el, status)
                  }
                />
              </span>
            </div>
            {this._renderOneCard(el)}
          </div>
        </div>
      );
    });

    return (
      <>
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
  _renderVisitorCardPrev = () => {
    let { visitorAdyenFormData } = this.state;
    if (visitorAdyenFormData) {
      visitorAdyenFormData.adyenPaymentMethod = {
        name: visitorAdyenFormData.brand,
        holderName: visitorAdyenFormData.hasHolderName,
        lastFour: '',
        brand: visitorAdyenFormData.brand
      };
    }

    return visitorAdyenFormData ? (
      <div
        className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border`}
      >
        <div className={`pt-3 pb-3`}>
          <div className="position-absolute" style={{ right: '1%', top: '2%' }}>
            <span
              className={`pull-right position-relative pl-2 ui-cursor-pointer-pure`}
            >
              <span
                onClick={(e) => {
                  this.setState({ formVisible: true });
                }}
              >
                <FormattedMessage id="edit" />
              </span>
            </span>
          </div>
          {this._renderOneCard(visitorAdyenFormData, false)}
        </div>
      </div>
    ) : null;
  };
  _renderEditForm = () => {
    const { cardList } = this.state;
    return (
      <EditForm
        isCheckoutPage={true}
        isOnepageCheckout={this.props.isOnepageCheckout}
        enableStoreDetails={this.isLogin}
        isSaveToBackend={this.isLogin}
        showCancelBtn={cardList.length > 0}
        updateFormVisible={(val) => {
          this.setState({ formVisible: val });
        }}
        queryList={() => this.queryList()}
        updateSelectedId={(selectedId) => {
          this.setState({ selectedId });
        }}
        updateAdyenPayParam={(data) => {
          this.setState({ visitorAdyenFormData: data });
          this.props.updateSelectedCardInfo(data);
        }}
        showErrorMsg={this.props.showErrorMsg}
      />
    );
  };
  render() {
    const { cardList, formVisible } = this.state;
    return (
      <>
        {this.isLogin ? (
          this.state.listLoading ? (
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          ) : !formVisible && cardList.length ? (
            this._renderList()
          ) : (
            this._renderEditForm()
          )
        ) : (
          <>
            {!formVisible && this._renderList()}
            <div className={`${formVisible ? '' : 'hidden'}`}>
              {this._renderEditForm()}
            </div>
          </>
        )}
      </>
    );
  }
}

export default AdyenCreditCardList;
