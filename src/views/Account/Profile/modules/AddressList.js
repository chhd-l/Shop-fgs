import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import { getDictionary, matchNamefromDict, getDeviceType } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { getAddressList, deleteAddress, setDefaltAddress } from '@/api/address';
import { queryCityNameById } from '@/api/address';
import AddressEditForm from '../ShippingAddressForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { myAccountPushEvent, myAccountActionPushEvent } from '@/utils/GA';

const isPad = getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const addressFormNull = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  region: '',
  postCode: '',
  entrance: '',
  apartment: '',
  phoneNumber: '',
  comment: ''
};

function CardItem(props) {
  const { data } = props;
  // 获取本地存储的需要显示的地址字段
  const localAddressForm =
    sessionItemRoyal.get('rc-address-form') || addressFormNull;

  return (
    <div
      className="rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 ui-cursor-pointer-pure h-100"
      onClick={props.handleClickCoverItem}
    >
      <div
        className="position-absolute d-flex align-items-center"
        style={{ right: '4%', top: '7%', zIndex: 9 }}
      >
        {props.operateBtnJSX}
      </div>

      <div className="font-weight-normal mt-4 pt-2 mt-md-0 pt-md-0">
        {data.type === 'DELIVERY' ? (
          <FormattedMessage id="deliveryAddress" />
        ) : (
          <FormattedMessage id="billingAddress" />
        )}
      </div>
      <div>
        {/* 姓名 */}
        <div className="ccard-phone-title word-break">
          <div className="address-name mp_mb_name">
            <span>{data.firstName + ' ' + data.lastName}</span>
          </div>
        </div>
        {/* 电话 */}
        <p className="mb-0 mp_mb_tel">{data.consigneeNumber}</p>
        {/* 国家 */}
        {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
          <p className="mb-0 mp_mb_country">{props.countryName}</p>
        )}
        {/* 地址 */}
        <p className="mb-0 mp_mb_address1">{data.address1}</p>

        {localAddressForm['address2'] && data.address2 && (
          <p className="mb-0 mp_mb_address2">{data.address2}</p>
        )}

        <p className="mb-0 mp_mb_cpp">
          {/* 城市 */}
          {localAddressForm['city'] && data.city + ', '}
          {localAddressForm['region'] && data.area + ', '}
          {/* 省份 */}
          {localAddressForm['state'] && data.province + ' '}
          {/* 邮编 */}
          {localAddressForm['postCode'] && data.postCode}
        </p>
      </div>
    </div>
  );
}
@inject('checkoutStore', 'configStore')
@injectIntl
@observer
class AddressList extends React.Component {
  static defaultProps = {
    hideBillingAddr: false
  };
  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
      editFormVisible: false,
      loading: false,
      listLoading: false,
      addressList: [],
      currentAddressList: [],
      curAddressId: '',
      fromPage: 'cover',

      countryList: [],
      errorMsg: '',
      successMsg: ''
    };

    this.handleClickCoverItem = this.handleClickCoverItem.bind(this);
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
    this.toggleSetDefault = this.toggleSetDefault.bind(this);
  }
  componentDidMount() {
    this.getAddressList();
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  getAddressList = async ({ showLoading = false } = {}) => {
    try {
      const { hideBillingAddr } = this.props;
      showLoading && this.setState({ listLoading: true });
      let res = await getAddressList();
      let addressList = res.context;
      //不显示billing address
      if (hideBillingAddr) {
        addressList = res.context.filter((item) => {
          return item.type === 'DELIVERY' && item.receiveType != 'PICK_UP';
        });
      }

      this.setState({
        addressList,
        listLoading: false
      });
    } catch (err) {
      this.showErrorMsg(err.message);
      this.setState({ listLoading: false });
    }
  };
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 4000);
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status, curAddressId: '' });
    this.props.updateEditOperationPanelName(status ? 'My addresses' : '');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  changeListVisible = (status) => {
    this.setState({ listVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My addresses' : '');
  };
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  handleClickEditBtn = () => {
    this.scrollToTop();
    this.changeListVisible(true);
    this.setState({ fromPage: 'cover' });
  };
  handleClickCoverItem(item, fromPage) {
    this.changeEditFormVisible(true);
    this.setState({ curAddressId: item.deliveryAddressId, fromPage });
  }
  handleHideEditForm = ({ closeListPage }) => {
    this.changeEditFormVisible(false);
    this.changeListVisible(!closeListPage); // 是否关闭list页面，如果是从封面过来
  };
  // 获取保存地址返回的提示成功信息
  getSuccessMsg = (msg) => {
    this.setState({
      successMsg: msg
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 5000);
  };
  handleClickAddBtn(fromPage) {
    myAccountPushEvent('Addresses');
    this.changeEditFormVisible(true);
    this.setState({ fromPage });
  }
  updateConfirmTooltipVisible = (el, status) => {
    let { addressList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      addressList
    });
  };
  handleClickDeleteBtn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.updateConfirmTooltipVisible(data, true);
  }
  async deleteCard(el, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { addressList } = this.state;
    el.confirmTooltipVisible = false;
    this.scrollToTop();
    this.setState({
      listLoading: true,
      addressList
    });
    await deleteAddress({ id: el.deliveryAddressId })
      .then(() => {
        this.getSuccessMsg(this.props.intl.messages.deleteSuccessFullly);
        this.getAddressList();
        myAccountActionPushEvent('Delete Address');
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
        this.setState({
          listLoading: false
        });
      });
  }
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
    this.changeListVisible(this.state.fromPage === 'list');
    // 最后一次返回cover
    this.setState({ fromPage: 'cover' });
  };
  // 添加地址按钮
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
      >
        <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-1" />
        <FormattedMessage id="addANewAddress" />
      </div>
    );
  };
  async toggleSetDefault(item, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefaltAddress) {
      await setDefaltAddress({ deliveryAddressId: item.deliveryAddressId });
      this.getAddressList({ showLoading: false });
    }
  }
  render() {
    const {
      listVisible,
      editFormVisible,
      addressList,
      listLoading,
      loading,
      countryList,
      errorMsg
    } = this.state;
    const curPageAtCover = !listVisible && !editFormVisible;
    return (
      <div>
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className={classNames({ border: curPageAtCover })}>
            {loading ? <Loading positionAbsolute="true" /> : null}
            <div className="personalInfo">
              <div className="profileSubFormTitle pl-3 pr-3 pt-3">
                <h5
                  className="mb-0"
                  style={{ display: curPageAtCover ? 'block' : 'none' }}
                >
                  <svg
                    className="svg-icon account-info-icon align-middle mr-3 ml-1"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#iconaddresses"></use>
                  </svg>
                  <FormattedMessage id="account.myAddresses" />
                </h5>
                <h5
                  className="ui-cursor-pointer"
                  style={{ display: curPageAtCover ? 'none' : 'block' }}
                  onClick={this.handleClickGoBack}
                >
                  <span>&larr; </span>
                  <FormattedMessage id="account.myAddresses" />
                </h5>

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

                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    this.state.successMsg ? '' : 'hidden'
                  }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    {this.state.successMsg}
                  </p>
                </aside>

                {/* preview form */}
                <div
                  className={classNames('row', 'ml-0', 'mr-0', {
                    hidden: editFormVisible || listVisible
                  })}
                >
                  {addressList.slice(0, 2).map((item, i) => (
                    <div
                      className="col-12 col-md-4 pt-2 pb-3 pl-3 pr-2"
                      key={item.deliveryAddressId}
                    >
                      <CardItem
                        data={item}
                        handleClickCoverItem={this.handleClickCoverItem.bind(
                          this,
                          item,
                          'cover'
                        )}
                        countryName={matchNamefromDict(
                          countryList,
                          item.countryId
                        )}
                      />
                    </div>
                  ))}
                  {addressList.slice(0, 2).length < 2 && (
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
                    {addressList.map((item, i) => (
                      <div
                        className="col-12 col-md-6 pt-2 pb-3 pl-3 pr-2"
                        key={item.deliveryAddressId}
                      >
                        <CardItem
                          data={item}
                          operateBtnJSX={
                            <div className="d-flex align-items-center">
                              {item.isDefaltAddress === 1 ? (
                                <div
                                  className="red"
                                  onClick={this.toggleSetDefault.bind(
                                    this,
                                    item
                                  )}
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
                                  onClick={this.toggleSetDefault.bind(
                                    this,
                                    item
                                  )}
                                >
                                  {/* <span className="iconfont mr-1">
                                    &#xe68c;
                                  </span> */}
                                  <span className="rc-styled-link">
                                    <FormattedMessage id="setAsDefault" />
                                  </span>
                                </div>
                              )}
                              <span className="position-relative p-2 ui-cursor-pointer-pure pdl-1">
                                <span
                                  className="rc-styled-link"
                                  onClick={this.handleClickDeleteBtn.bind(
                                    this,
                                    item
                                  )}
                                  style={
                                    isPad
                                      ? {
                                          position: 'absolute',
                                          top: '1.25rem',
                                          right: '1.5rem'
                                        }
                                      : {}
                                  }
                                >
                                  <FormattedMessage id="delete" />
                                </span>
                                <ConfirmTooltip
                                  containerStyle={{
                                    transform: 'translate(-89%, 105%)'
                                  }}
                                  arrowStyle={{ left: '89%' }}
                                  display={item.confirmTooltipVisible}
                                  confirm={this.deleteCard.bind(this, item)}
                                  updateChildDisplay={(status) =>
                                    this.updateConfirmTooltipVisible(
                                      item,
                                      status
                                    )
                                  }
                                  content={
                                    <FormattedMessage id="confirmDeleteAddress" />
                                  }
                                />
                              </span>
                            </div>
                          }
                          handleClickCoverItem={this.handleClickCoverItem.bind(
                            this,
                            item,
                            'list'
                          )}
                          countryName={matchNamefromDict(
                            countryList,
                            item.countryId
                          )}
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
                  <AddressEditForm
                    hideBillingAddr={this.props.hideBillingAddr}
                    addressId={this.state.curAddressId}
                    backPage={this.state.fromPage}
                    hideMyself={this.handleHideEditForm}
                    refreshList={this.getAddressList}
                    upateSuccessMsg={this.getSuccessMsg}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddressList;
