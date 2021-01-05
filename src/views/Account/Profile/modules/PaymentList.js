import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Loading from '@/components/Loading';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import {
  getPaymentMethod,
  deleteCard,
  getWays,
  setDefaltCard
} from '@/api/payment';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import PaymentEditForm from '../PaymentEditForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import find from 'lodash/find';

function CardItem(props) {
  const { data } = props;
  return (
    <div className="rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 h-100 d-flex align-items-center justify-content-between">
      <div
        className="position-absolute d-flex align-items-center"
        style={{ right: '2%', top: '2%', zIndex: 9 }}
      >
        {props.operateBtnJSX}
      </div>
      <div className={`pt-4 pt-md-2 pb-2 w-100`}>
        <div className="row">
          <div className={`col-4 d-flex flex-column justify-content-center`}>
            <LazyLoad>
              <img
                className="PayCardImgFitScreen mw-100"
                style={{ height: '5rem' }}
                src={
                  CREDIT_CARD_IMG_ENUM[data.paymentVendor.toUpperCase()] ||
                  'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                }
                alt=""
              />
            </LazyLoad>
          </div>
          <div className="col-6 pl-0 pr-0">
            <p className="mb-0">{data.holderName}</p>
            <p className="mb-0">
              ************
              {data.lastFourDigits}
            </p>
            <p className="mb-0">{data.cardType}</p>
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
      paymentType: 'PAYU',
      errorMsg: ''
    };

    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
    this.toggleSetDefault = this.toggleSetDefault.bind(this);
    this.timer = '';
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
  getPaymentMethodList = async ({ showLoading = true } = {}) => {
    try {
      showLoading && this.setState({ listLoading: true });
      const res = await getPaymentMethod();
      this.setState({ creditCardList: res.context || [] });
    } catch (err) {
      this.setState({ listErr: err.message });
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
    await deleteCard({ id: el.id })
      .then(() => {
        this.getPaymentMethodList();
      })
      .catch((err) => {
        this.setState({
          listLoading: false,
          errorMsg: err.message
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({
            errorMsg: ''
          });
        }, 2000);
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
    window.scroll({ top: 0, behavior: 'smooth' });
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
        className="rounded p-4 border h-100 d-flex align-items-center justify-content-center"
        onClick={this.handleClickAddBtn.bind(this, fromPage)}
        ref={(node) => {
          if (node) {
            node.style.setProperty('border-width', '.1rem', 'important');
            node.style.setProperty('border-style', 'dashed', 'important');
          }
        }}
        style={{ lineHeight: 0.4 }}
      >
        <div>
          <span className="rc-icon rc-plus--xs rc-iconography plus-icon" />
          <FormattedMessage id="addANewPaymentMethod" />
        </div>
      </div>
    );
  };
  async toggleSetDefault(item, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefault) {
      await setDefaltCard(item.id);
      this.getPaymentMethodList({ showLoading: false });
    }
  }
  render() {
    const {
      listVisible,
      editFormVisible,
      creditCardList,
      listLoading,
      loading,
      errorMsg
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
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                    role="alert"
                  >
                    <span className="pl-0">{errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => {
                        this.setState({ errorMsg: '' });
                      }}
                      aria-label="Close"
                    >
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>

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
                    {creditCardList.map((el) => (
                      <div className="col-12 col-md-6 p-2" key={el.id}>
                        <CardItem
                          data={el}
                          operateBtnJSX={
                            <>
                              {el.isDefault === 1 ? (
                                <div
                                  className="red"
                                  onClick={this.toggleSetDefault.bind(this, el)}
                                >
                                  <span className="iconfont mr-1">
                                    &#xe68c;
                                  </span>
                                  <span className="rc-styled-link red border-danger">
                                    <FormattedMessage id="default" />
                                  </span>
                                </div>
                              ) : (
                                <div
                                  className="ui-cursor-pointer"
                                  onClick={this.toggleSetDefault.bind(this, el)}
                                >
                                  <span className="iconfont mr-1">
                                    &#xe68c;
                                  </span>
                                  <span className="rc-styled-link">
                                    <FormattedMessage id="setAsDefault" />
                                  </span>
                                </div>
                              )}
                              <span
                                className={`position-relative p-2 ui-cursor-pointer-pure`}
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
                            </>
                          }
                        />
                      </div>
                    ))}
                    <div className="col-12 col-md-6 p-2 rounded text-center p-2 ui-cursor-pointer">
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
