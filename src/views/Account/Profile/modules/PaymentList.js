import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { getPaymentMethod, deleteCard, getWays } from '@/api/payment';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import PaymentEditForm from '../PaymentEditForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { find } from 'lodash';

function CardItem(props) {
  const { data } = props;
  return (
    <div
      className="rc-bg-colour--brand4 rounded p-2 pl-3 pr-4 ui-cursor-pointer-pure h-100 d-flex align-items-center justify-content-between"
      onClick={props.hanldeClickCardItem}
    >
      {props.removeBtnJSX}
      <div className={`pt-3 pb-3`}>
        <div className="row">
          <div className={`col-6 d-flex flex-column justify-content-center`}>
            <img
              className="PayCardImgFitScreen"
              src={
                CREDIT_CARD_IMG_ENUM[
                  data.paymentMethod
                    ? data.paymentMethod.vendor.toUpperCase()
                    : ''
                ] ||
                'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
              }
              alt=""
            />
          </div>
          <div className="col-6">
            <p className="mb-0">
              {data.paymentMethod
                ? data.paymentMethod.holder_name
                : data.cardOwner}
            </p>
            <p className="mb-0">
              ************
              {data.paymentMethod ? data.paymentMethod.last_4_digits : ''}
            </p>
            <p className="mb-0">
              {data.paymentMethod ? data.paymentMethod.card_type : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

@inject('loginStore')
@injectIntl
@observer
class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
      editFormVisible: false,
      loading: false,
      listLoading: false,
      creditCardList: [],
      fromPage: 'cover',
      paymentType: 'PAYU'
    };

    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
  }
  componentDidMount() {
    this.getPaymentMethodList();
    getWays().then((res) => {
      if (
        find(res.context || [], (ele) => ele.isOpen && ele.name === 'ADYEN')
      ) {
        this.setState({ paymentType: 'ADYEN' });
      }
    });
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  getPaymentMethodList = async () => {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : '',
        storeId: process.env.REACT_APP_STOREID
      });

      let tmpList = (res.context || []).filter(
        (ele) => ele.payuPaymentMethod || ele.adyenPaymentMethod
      );

      tmpList = tmpList.map((el) => {
        const tmpPaymentMethod = el.payuPaymentMethod || el.adyenPaymentMethod;
        return Object.assign(el, {
          paymentMethod: {
            vendor: tmpPaymentMethod.vendor || tmpPaymentMethod.name,
            holder_name:
              tmpPaymentMethod.holder_name || tmpPaymentMethod.holderName,
            last_4_digits:
              tmpPaymentMethod.last_4_digits || tmpPaymentMethod.lastFour,
            card_type: tmpPaymentMethod.card_type || tmpPaymentMethod.brand
          }
        });
      });
      this.setState({ creditCardList: tmpList });
    } catch (err) {
      console.log(err);
      this.setState({ listErr: err.message.toString() });
    } finally {
      this.setState({
        loading: false,
        listLoading: false
      });
    }
  };
  async deleteCard(el, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      listLoading: true,
      creditCardList
    });
    await deleteCard({ id: el.id, storeId: process.env.REACT_APP_STOREID })
      .then(() => {
        this.getPaymentMethodList();
      })
      .catch((err) => {
        // this.showErrorMsg(err.message);
        this.setState({
          listLoading: false
        });
      });
  }
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My payments' : '');
  };
  changeListVisible = (status) => {
    this.setState({ listVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My payments' : '');
  };
  getDictValue(list, id) {
    if (list && list.length > 0) {
      let item = list.find((item) => {
        return item.id === id;
      });
      if (item) {
        return item.name;
      } else {
        return id;
      }
    } else {
      return id;
    }
  }
  handleClickEditBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeListVisible(true);
  };
  handleHideEditForm = ({ closeListPage }) => {
    this.changeEditFormVisible(false);
    this.changeListVisible(!closeListPage);
  };
  handleClickAddBtn(fromPage) {
    this.changeEditFormVisible(true);
    this.setState({ fromPage });
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList
    });
  }
  handleClickDeleteBtn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.updateConfirmTooltipVisible(data, true);
  }
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
    this.changeListVisible(this.state.fromPage === 'list');
    // 最后一次返回cover
    this.setState({ fromPage: 'cover' });
  };
  addBtnJSX = ({ fromPage }) => {
    return (
      <div
        className="rounded p-4 border"
        onClick={this.handleClickAddBtn.bind(this, fromPage)}
        ref={(node) => {
          if (node) {
            node.style.setProperty('border-width', '.1rem', 'important');
            node.style.setProperty('border-style', 'dashed', 'important');
          }
        }}
      >
        <span className="rc-icon rc-plus--xs rc-iconography plus-icon" />
        <FormattedMessage id="addANewPaymentMethod" />
      </div>
    );
  };
  render() {
    const {
      listVisible,
      editFormVisible,
      creditCardList,
      listLoading,
      loading
    } = this.state;
    const curPageAtCover = !listVisible && !editFormVisible;
    return (
      <>
        {' '}
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className={classNames({ border: curPageAtCover })}>
            {loading ? <Loading positionAbsolute="true" /> : null}
            <div className="personalInfo">
              <div className="profileSubFormTitle pl-3 pr-3 pt-3">
                {curPageAtCover ? (
                  <h5 className="mb-0">
                    <svg
                      className="svg-icon account-info-icon align-middle mr-3 ml-1"
                      aria-hidden="true"
                      style={{ width: '1.4em', height: '1.4em' }}
                    >
                      <use xlinkHref="#iconpayments"></use>
                    </svg>
                    <FormattedMessage id="account.myPayments" />
                  </h5>
                ) : (
                  <h5
                    className="ui-cursor-pointer"
                    onClick={this.handleClickGoBack}
                  >
                    <span>&larr; </span>
                    <FormattedMessage id="account.myPayments" />
                  </h5>
                )}

                <FormattedMessage id="edit">
                  {(txt) => (
                    <button
                      className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0 ${
                        listVisible || editFormVisible ? 'hidden' : ''
                      }`}
                      name="personalInformation"
                      id="personalInfoEditBtn"
                      title={txt}
                      alt={txt}
                      onClick={this.handleClickEditBtn}
                    >
                      {txt}
                    </button>
                  )}
                </FormattedMessage>
              </div>
              <hr
                className={classNames('account-info-hr-border-color', {
                  'border-0': listVisible || editFormVisible
                })}
              />
              <div
                className={classNames(
                  'pb-3',
                  { 'pl-3': curPageAtCover },
                  { 'pr-3': curPageAtCover }
                )}
              >
                {/* preview form */}
                <div
                  className={classNames('row', 'ml-0', 'mr-0', {
                    hidden: editFormVisible || listVisible
                  })}
                >
                  {creditCardList.slice(0, 2).map((el, i) => (
                    <div className="col-12 col-md-4 p-2" key={i}>
                      <CardItem data={el} />
                    </div>
                  ))}
                  {creditCardList.slice(0, 2).length < 2 && (
                    <div className="col-12 col-md-4 p-2 rounded text-center p-2 ui-cursor-pointer">
                      {this.addBtnJSX({ fromPage: 'cover' })}
                    </div>
                  )}
                </div>

                {/* list panel */}
                <div
                  className={classNames({
                    hidden: !listVisible || editFormVisible
                  })}
                >
                  <div className={classNames('row', 'ml-0', 'mr-0')}>
                    {creditCardList.map((el, i) => (
                      <div className="col-12 col-md-4 p-2" key={i}>
                        <CardItem
                          data={el}
                          removeBtnJSX={
                            <div
                              className="position-absolute"
                              style={{ right: '2%', top: '1%', zIndex: 9 }}
                            >
                              <span
                                className={`pull-right position-relative p-2 ui-cursor-pointer-pure`}
                              >
                                <span
                                  className="rc-styled-link"
                                  onClick={this.handleClickDeleteBtn.bind(
                                    this,
                                    el
                                  )}
                                >
                                  <FormattedMessage id="delete" />
                                </span>
                                <ConfirmTooltip
                                  containerStyle={{
                                    transform: 'translate(-89%, 105%)'
                                  }}
                                  arrowStyle={{ left: '89%' }}
                                  display={el.confirmTooltipVisible}
                                  confirm={this.deleteCard.bind(this, el)}
                                  updateChildDisplay={(status) =>
                                    this.updateConfirmTooltipVisible(el, status)
                                  }
                                />
                              </span>
                            </div>
                          }
                        />
                      </div>
                    ))}
                    <div className="col-12 col-md-4 p-2 rounded text-center p-2 ui-cursor-pointer">
                      {this.addBtnJSX({ fromPage: 'list' })}
                    </div>
                  </div>
                </div>

                {/* edit form panel  */}
                {editFormVisible && (
                  <PaymentEditForm
                    backPage={this.state.fromPage}
                    hideMyself={this.handleHideEditForm}
                    refreshList={this.getPaymentMethodList}
                    paymentType={this.state.paymentType}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AddressList;
