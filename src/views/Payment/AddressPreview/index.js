import React from 'react';
import { inject } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { getDictionary, matchNamefromDict } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
@inject('checkoutStore', 'configStore')
class InfosPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: []
    };
  }
  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    console.log('19    AddressPreview: ', this.props.details);
  }
  render() {
    const { details } = this.props;
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore?.localAddressForm;

    return (
      <div className="card mb-3 shipping-summary checkout--padding">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <em className="rc-icon rc-indoors--xs rc-iconography" />{' '}
            <FormattedMessage id="payment.addressTitle" />
          </h5>
        </div>

        {details ? (
          <div className="card-body rc-padding--none">
            <div className="single-shipping">
              <div className="rounded rc-border-all rc-border-colour--interface checkout--padding">
                <div className="summary-details shipping rc-margin-bottom--xs">
                  <div className="address-summary row">
                    <div className="col-md-12 deliveryAddress">
                      <h5 className="center">
                        <FormattedMessage id="payment.deliveryTitle" />
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <FormattedMessage id="payment.firstName" />
                        </div>
                        <div className="col-md-6">
                          &nbsp;{details.consignee.firstName}
                        </div>

                        <div className="col-md-6">
                          <FormattedMessage id="payment.lastName" />
                        </div>
                        <div className="col-md-6">
                          &nbsp;{details.consignee.lastName}
                        </div>

                        <div className="col-md-6">
                          <FormattedMessage id="payment.address1" />
                        </div>
                        <div className="col-md-6">
                          &nbsp;{details.consignee.detailAddress1}
                        </div>

                        {localAddressForm['address2'] &&
                          details.consignee.detailAddress2 && (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.address2" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.consignee.detailAddress2}
                              </div>
                            </>
                          )}

                        {process.env.REACT_APP_COUNTRY == 'US' ? null : (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.country" />
                            </div>

                            <div className="col-md-6">
                              &nbsp;
                              {matchNamefromDict(
                                this.state.countryList,
                                details.consignee.countryId
                              )}
                            </div>
                          </>
                        )}

                        {localAddressForm['city'] && (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.city" />
                            </div>
                            <div className="col-md-6">
                              &nbsp;{details.consignee.city}
                            </div>
                          </>
                        )}

                        {/* {localAddressForm['region'] && (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.region" />
                            </div>
                            <div className="col-md-6">
                              &nbsp;{details.consignee.area}
                            </div>
                          </>
                        )} */}

                        {localAddressForm['state'] && (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.state" />
                            </div>
                            <div className="col-md-6">
                              &nbsp;{details.consignee.province}
                            </div>
                          </>
                        )}

                        {localAddressForm['postCode'] && (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.postCode" />
                            </div>
                            <div className="col-md-6">
                              &nbsp;{details.consignee.postCode}
                            </div>
                          </>
                        )}

                        <div className="col-md-6">
                          <FormattedMessage id="payment.phoneNumber" />
                        </div>
                        <div className="col-md-6">
                          &nbsp;{details.consignee.phone}
                        </div>

                        {details.consignee.rfc ? (
                          <>
                            <div className="col-md-6">
                              <FormattedMessage id="payment.rfc" />
                            </div>
                            <div className="col-md-6">
                              &nbsp;{details.consignee.rfc}
                            </div>
                          </>
                        ) : null}
                        <div className="col-md-6">
                          <FormattedMessage id="payment.normalDelivery2" />
                        </div>
                        <div className="col-md-6">
                          <FormattedMessage id="payment.forFree" />
                        </div>
                      </div>
                    </div>
                    {details.invoice ? (
                      <div className="col-md-12 address-summary-left">
                        <h5 className="center">
                          <FormattedMessage id="payment.billTitle" />
                        </h5>

                        <div className="row">
                          <div className="col-md-6">
                            <FormattedMessage id="payment.firstName" />
                          </div>
                          <div className="col-md-6">
                            &nbsp;{details.invoice.firstName}
                          </div>

                          <div className="col-md-6">
                            <FormattedMessage id="payment.lastName" />
                          </div>
                          <div className="col-md-6">
                            &nbsp;{details.invoice.lastName}
                          </div>

                          <div className="col-md-6">
                            <FormattedMessage id="payment.address1" />
                          </div>
                          <div className="col-md-6">
                            &nbsp;{details.invoice.address1}
                          </div>

                          {localAddressForm['address2'] &&
                            details.invoice.detailAddress2 && (
                              <>
                                <div className="col-md-6">
                                  <FormattedMessage id="payment.address2" />
                                </div>
                                <div className="col-md-6">
                                  &nbsp;{details.invoice.address2}
                                </div>
                              </>
                            )}

                          {process.env.REACT_APP_COUNTRY == 'US' ? null : (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.country" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;
                                {matchNamefromDict(
                                  this.state.countryList,
                                  details.invoice.countryId
                                )}
                              </div>
                            </>
                          )}

                          {localAddressForm['city'] && (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.city" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.invoice.city}
                              </div>
                            </>
                          )}

                          {/* {localAddressForm['region'] && (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.region" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.invoice.area}
                              </div>
                            </>
                          )} */}

                          {localAddressForm['state'] && (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.state" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.invoice.province}
                              </div>
                            </>
                          )}

                          {localAddressForm['postCode'] && (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.postCode" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.invoice.postCode}
                              </div>
                            </>
                          )}

                          <div className="col-md-6">
                            <FormattedMessage id="payment.phoneNumber" />
                          </div>
                          <div className="col-md-6">
                            &nbsp;{details.invoice.phone}
                          </div>

                          {details.invoice.rfc ? (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.rfc" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.invoice.rfc}
                              </div>
                            </>
                          ) : null}
                          {details.buyerRemark ? (
                            <>
                              <div className="col-md-6">
                                <FormattedMessage id="payment.commentOnDelivery" />
                              </div>
                              <div className="col-md-6">
                                &nbsp;{details.buyerRemark}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span className="ml-3 mr-3">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          </span>
        )}
      </div>
    );
  }
}

export default InfosPreview;
