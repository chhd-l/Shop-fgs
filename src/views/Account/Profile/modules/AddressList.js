import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import { getDictionary } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import {
  getAddressList,
  deleteAddress,
  editAddress,
  setDefaltAddress
} from '@/api/address';
import { queryCityNameById } from '@/api';
import AddressEditForm from '../ShippingAddressForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';

function CardItem(props) {
  const { data } = props;
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
        <div className="ccard-phone-title word-break">
          <div className="address-name">
            <span>{data.firstName + ' ' + data.lastName}</span>
            {/* {data.isDefaltAddress === 1 ? (
              <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                <FormattedMessage id="default" />
              </span>
            ) : null} */}
          </div>
        </div>
        <p className="mb-0">{data.consigneeNumber}</p>
        <p className="mb-0">{props.countryName}</p>
        <p className="mb-0">{data.cityName}</p>
        <p className="mb-0">{data.address1}</p>
      </div>
    </div>
  );
}

@injectIntl
class AddressList extends React.Component {
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

      countryList: []
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
    showLoading && this.setState({ listLoading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context;
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
        addressList,
        listLoading: false
      });
    } catch (err) {
      // this.showErrorMsg(err.message);
      this.setState({ listLoading: false });
    }
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
  handleClickAddBtn(fromPage) {
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
        this.getAddressList();
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
      countryList
    } = this.state;
    const curPageAtCover = !listVisible && !editFormVisible;
    return (
      <>
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
                    >
                      <use xlinkHref="#iconaddresses"></use>
                    </svg>
                    <FormattedMessage id="account.myAddresses" />
                  </h5>
                ) : (
                  <h5
                    className="ui-cursor-pointer"
                    onClick={this.handleClickGoBack}
                  >
                    <span>&larr; </span>
                    <FormattedMessage id="account.myAddresses" />
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
                  {addressList.slice(0, 2).map((item, i) => (
                    <div
                      className="col-12 col-md-4 p-2"
                      key={item.deliveryAddressId}
                    >
                      <CardItem
                        data={item}
                        handleClickCoverItem={this.handleClickCoverItem.bind(
                          this,
                          item,
                          'cover'
                        )}
                        countryName={this.getDictValue(
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
                        className="col-12 col-md-6 p-2"
                        key={item.deliveryAddressId}
                      >
                        <CardItem
                          data={item}
                          operateBtnJSX={
                            <>
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
                                  <span className="iconfont mr-1">
                                    &#xe68c;
                                  </span>
                                  <span className="rc-styled-link">
                                    <FormattedMessage id="setAsDefault" />
                                  </span>
                                </div>
                              )}
                              <span className="position-relative p-2 ui-cursor-pointer-pure">
                                <span
                                  className="rc-styled-link"
                                  onClick={this.handleClickDeleteBtn.bind(
                                    this,
                                    item
                                  )}
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
                                />
                              </span>
                            </>
                          }
                          handleClickCoverItem={this.handleClickCoverItem.bind(
                            this,
                            item,
                            'list'
                          )}
                          countryName={this.getDictValue(
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
                    addressId={this.state.curAddressId}
                    backPage={this.state.fromPage}
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

export default AddressList;
