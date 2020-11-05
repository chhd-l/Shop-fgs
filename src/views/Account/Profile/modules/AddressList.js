import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import { getDictionary } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { getAddressList } from '@/api/address';
import { queryCityNameById } from '@/api';
import AddressEditForm from '../ShippingAddressForm';

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
      curPage: 'cover',

      countryList: []
    };

    this.handleClickCoverItem = this.handleClickCoverItem.bind(this);
  }
  componentDidMount() {
    this.getAddressList();
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  getAddressList = async () => {
    this.setState({ listLoading: true });
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
      this.showErrorMsg(err.message);
      this.setState({ listLoading: false });
    }
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My addresses' : '');
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
    this.setState({ listVisible: closeListPage });
  };
  handleClickAddBtn = () => {
    this.changeEditFormVisible(true);
    this.setState({ curPage: 'list' });
  };
  render() {
    const {
      listVisible,
      editFormVisible,
      addressList,
      listLoading,
      loading
    } = this.state;
    return (
      <>
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

export default AddressList;
