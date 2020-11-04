import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { findIndex } from 'lodash';
import Loading from '@/components/Loading';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import { getDictionary, validData } from '@/utils/utils';
import { updateCustomerBaseInfo } from '@/api/user';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import classNames from 'classnames';
import {
  getAddressList,
  setDefaltAddress,
  deleteAddress,
  getAddressById
} from '@/api/address';
import { queryCityNameById } from '@/api';
import AddressEditForm from '../ShippingAddressForm';

@injectIntl
class PaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
      editFormVisible: false,
      loading: false,
      listLoading: false,
      addressList: [],
      currentType: 'DELIVERY',
      currentAddressList: [],
      curAddressId: '',
      curPage: 'cover',

      successTipVisible: false,
      errorMsg: '',
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        country: '',
        phoneNumber: '',
        rfc: ''
      },
      oldForm: {},
      countryList: [],
      isValid: false
    };

    this.handleClickCoverItem = this.handleClickCoverItem.bind(this);
  }
  componentDidMount() {
    this.getAddressList();
  }
  getAddressList = async () => {
    this.setState({ listLoading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context;
      let total = addressList.length;
      let cityRes = await queryCityNameById({
        id: addressList.map((ele) => ele.cityId)
      });
      cityRes = cityRes.context.systemCityVO || [];
      Array.from(addressList, (ele) => {
        ele.cityName = cityRes.filter((c) => c.id === ele.cityId).length
          ? cityRes.filter((c) => c.id === ele.cityId)[0].cityName
          : ele.cityId;
        return ele;
      });
      this.setState({
        addressList: addressList,
        total: total
      });
      this.switchAddressType(this.state.currentType);
      this.setState({ listLoading: false });
    } catch (err) {
      this.showErrorMsg(err.message);
      this.setState({ listLoading: false });
    }
  };
  switchAddressType = (type) => {
    const { addressList } = this.state;
    let currentAddressList = addressList.filter((item) => {
      return item.type === type;
    });
    this.setState({
      currentType: type,
      currentAddressList
    });
  };
  inputBlur = (e) => {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  };
  handleInputChange = (e) => {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form }, () => {
      this.validFormData();
    });
    this.inputBlur(e);
  };
  showErrMsg(msg) {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  }
  handleCancel() {
    const { oldForm } = this.state;
    this.setState({
      form: Object.assign({}, oldForm),
      errorMsg: ''
    });
    this.changeEditFormVisible(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
  handleSave = async () => {
    try {
      const { form } = this.state;
      this.setState({ loading: true });
      let param = Object.assign({}, this.props.originData, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        birthDay: form.birthdate
          ? form.birthdate.split('/').join('-')
          : form.birthdate,
        countryId: form.country,
        contactPhone: form.phoneNumber,
        reference: form.rfc
      });

      await updateCustomerBaseInfo(param);
      this.props.updateData(this.state.form);
      this.setState({
        successTipVisible: true
      });
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        });
      }, 2000);
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.changeEditFormVisible(false);
      this.setState({
        loading: false
      });
    }
  };
  validFormData = async () => {
    try {
      await validData(PRESONAL_INFO_RULE, this.state.form);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
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
  onDateChange(date) {
    const { form } = this.state;
    form['birthdate'] = moment(date).format('YYYY-MM-DD');
    this.setState({ form: form }, () => {
      this.validFormData();
    });
  }
  computedList(key) {
    let tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id.toString(),
        name: c.name
      };
    });
    tmp.unshift({ value: '', name: '' });
    return tmp;
  }
  handleSelectedItemChange(key, data) {
    const { form } = this.state;
    form[key] = data.value;
    this.setState({ form: form }, () => {
      this.validFormData();
    });
  }
  handleClickEditBtn = () => {
    // this.changeEditFormVisible(true);
    this.changeListVisible(true);
  };
  handleClickCoverItem(item, curPage) {
    this.changeEditFormVisible(true);
    this.setState({ curAddressId: item.deliveryAddressId, curPage });
  }
  handleHideEditForm = ({ closeListPage }) => {
    this.changeEditFormVisible(false);
    this.setState({ listVisible: !closeListPage });
  };
  handleClickAddBtn = () => {
    this.changeEditFormVisible(true);
    this.setState({ curPage: 'list' });
  };
  render() {
    const {
      listVisible,
      editFormVisible,
      form,
      isValid,
      currentAddressList,
      addressList,
      listLoading,
      loading
    } = this.state;
    const { data } = this.props;
    return (
      <>
        {' '}
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div
            className={classNames({ border: !listVisible && !editFormVisible })}
          >
            {loading ? <Loading positionAbsolute="true" /> : null}
            <div className="personalInfo">
              <div className="profileSubFormTitle pl-3 pr-3 pt-3">
                <h5 className="rc-margin--none">
                  <span className="iconfont title-icon">&#xe6a3;</span>
                  <FormattedMessage id="account.myAddresses" />
                </h5>
                <FormattedMessage id="edit">
                  {(txt) => (
                    <button
                      className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${
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
                className={classNames({
                  'border-0': listVisible || editFormVisible
                })}
              />
              <div className={classNames('pl-3', 'pr-3', 'pb-3')}>
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    this.state.errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                    role="alert"
                  >
                    <span className="pl-0">{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      aria-label="Close"
                      onClick={() => {
                        this.setState({ errorMsg: '' });
                      }}
                    >
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    this.state.successTipVisible ? '' : 'hidden'
                  }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    <FormattedMessage id="saveSuccessfullly" />
                  </p>
                </aside>
                {/* preview form */}
                <div
                  className={classNames('row', 'ml-0', 'mr-0', {
                    hidden: editFormVisible || listVisible
                  })}
                >
                  {addressList.slice(0, 2).map((item, i) => (
                    <div className="col-12 col-md-4 p-2" key={i}>
                      <div
                        className="rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 ui-cursor-pointer-pure"
                        onClick={this.handleClickCoverItem.bind(
                          this,
                          item,
                          'cover'
                        )}
                      >
                        <div className="font-weight-normal">
                          {item.type === 'DELIVERY' ? (
                            <FormattedMessage id="deliveryAddress" />
                          ) : (
                            <FormattedMessage id="billingAddress" />
                          )}
                        </div>
                        <div>
                          <div className="ccard-phone-title word-break">
                            <div className="address-name">
                              <span>
                                {item.firstName + ' ' + item.lastName}
                              </span>
                              {item.isDefaltAddress === 1 ? (
                                <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                                  <FormattedMessage id="default" />
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <p className="mb-0">{item.consigneeNumber}</p>
                          <p className="mb-0">
                            {this.getDictValue(
                              this.state.countryList,
                              item.countryId
                            )}
                          </p>
                          <p className="mb-0">{item.cityName}</p>
                          <p className="mb-0">{item.address1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* list panel */}
                <div
                  className={classNames({
                    hidden: !listVisible || editFormVisible
                  })}
                >
                  <div className={classNames('row', 'ml-0', 'mr-0')}>
                    {addressList.map((item, i) => (
                      <div className="col-12 col-md-4 p-2" key={i}>
                        <div
                          className="rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 ui-cursor-pointer-pure"
                          onClick={this.handleClickCoverItem.bind(
                            this,
                            item,
                            'list'
                          )}
                        >
                          <div className="font-weight-normal">
                            {item.type === 'DELIVERY' ? (
                              <FormattedMessage id="deliveryAddress" />
                            ) : (
                              <FormattedMessage id="billingAddress" />
                            )}
                          </div>
                          <div>
                            <div className="ccard-phone-title word-break">
                              <div className="address-name">
                                <span>
                                  {item.firstName + ' ' + item.lastName}
                                </span>
                                {item.isDefaltAddress === 1 ? (
                                  <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                                    <FormattedMessage id="default" />
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <p className="mb-0">{item.consigneeNumber}</p>
                            <p className="mb-0">
                              {this.getDictValue(
                                this.state.countryList,
                                item.countryId
                              )}
                            </p>
                            <p className="mb-0">{item.cityName}</p>
                            <p className="mb-0">{item.address1}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row ml-0 mr-0">
                    <div className="col-12 col-md-4 p-2 rounded text-center p-2 ui-cursor-pointer">
                      <div
                        className="rounded p-4 border"
                        onClick={this.handleClickAddBtn}
                        ref={(node) => {
                          if (node) {
                            node.style.setProperty(
                              'border-width',
                              '.1rem',
                              'important'
                            );
                            node.style.setProperty(
                              'border-style',
                              'dashed',
                              'important'
                            );
                          }
                        }}
                      >
                        <span className="rc-icon rc-plus--xs rc-iconography plus-icon" />
                        <FormattedMessage id="addANewAddress" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* edit form panel  */}
                {editFormVisible && (
                  <AddressEditForm
                    addressId={this.state.curAddressId}
                    backPage={this.state.curPage}
                    hideMyself={this.handleHideEditForm}
                    refreshList={this.getAddressList}
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

export default PaymentList;
