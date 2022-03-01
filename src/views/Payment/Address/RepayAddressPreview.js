import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getDictionary, matchNamefromDict } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import { formatMoney } from '@/utils/utils';

const hideBillingAddr = Boolean(
  +window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
);

@inject('checkoutStore', 'configStore')
@observer
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
  }
  get deliveryAdrrItemList() {
    const { details } = this.props;
    const tmpList = [
      {
        title: <FormattedMessage id="payment.firstName" />,
        value: details?.consignee.firstName,
        fieldKey: 'firstName'
      },
      {
        title: <FormattedMessage id="payment.lastName" />,
        value: details?.consignee.lastName,
        fieldKey: 'lastName'
      },
      {
        title: <FormattedMessage id="payment.address1" />,
        value: details?.consignee.detailAddress1,
        fieldKey: 'address1'
      },
      {
        title: <FormattedMessage id="payment.address2" />,
        value: details?.consignee.detailAddress2,
        fieldKey: 'address2'
      },
      {
        title: <FormattedMessage id="payment.country" />,
        value: matchNamefromDict(
          this.state.countryList,
          details?.consignee.countryId
        ),
        fieldKey: 'country'
      },
      {
        title: <FormattedMessage id="payment.city" />,
        value: details?.consignee.city,
        fieldKey: 'city'
      },
      {
        title: <FormattedMessage id="payment.region" />,
        value: details?.consignee.area,
        fieldKey: 'region'
      },
      {
        title: <FormattedMessage id="payment.state" />,
        value: details?.consignee.province,
        fieldKey: 'state'
      },
      {
        title: <FormattedMessage id="payment.county" />,
        value: details?.consignee.county,
        fieldKey: 'county'
      },
      {
        title: <FormattedMessage id="payment.postCode" />,
        value: details?.consignee.postCode,
        fieldKey: 'postCode'
      },
      {
        title: <FormattedMessage id="payment.phoneNumber" />,
        value: details?.consignee.phone,
        fieldKey: 'phoneNumber'
      },

      {
        title: <FormattedMessage id="payment.rfc" />,
        value: details?.consignee.rfc,
        fieldKey: 'comment'
      },
      {
        title: <FormattedMessage id="payment.normalDelivery2" />,
        value: details?.tradePrice.deliveryPrice ? (
          formatMoney(details?.tradePrice.deliveryPrice)
        ) : (
          <FormattedMessage id="payment.forFree" />
        )
      }
    ];

    return this.handleSortAndFilter(tmpList);
  }
  get billingAdrrItemList() {
    const { details } = this.props;
    const tmpList = [
      {
        title: <FormattedMessage id="payment.firstName" />,
        value: details?.invoice.firstName,
        fieldKey: 'firstName'
      },
      {
        title: <FormattedMessage id="payment.lastName" />,
        value: details?.invoice.lastName,
        fieldKey: 'lastName'
      },
      {
        title: <FormattedMessage id="payment.address1" />,
        value: details?.invoice.address1,
        fieldKey: 'address1'
      },
      {
        title: <FormattedMessage id="payment.address2" />,
        value: details?.invoice.address2,
        fieldKey: 'address2'
      },
      {
        title: <FormattedMessage id="payment.country" />,
        value: matchNamefromDict(
          this.state.countryList,
          details?.invoice.countryId
        ),
        fieldKey: 'country'
      },
      {
        title: <FormattedMessage id="payment.city" />,
        value: details?.invoice.city,
        fieldKey: 'city'
      },
      {
        title: <FormattedMessage id="payment.region" />,
        value: details?.invoice.area,
        fieldKey: 'region'
      },
      {
        title: <FormattedMessage id="payment.state" />,
        value: details?.invoice.province,
        fieldKey: 'state'
      },
      {
        title: <FormattedMessage id="payment.county" />,
        value: details?.invoice.county,
        fieldKey: 'county'
      },
      {
        title: <FormattedMessage id="payment.postCode" />,
        value: details?.invoice.postCode,
        fieldKey: 'postCode'
      },
      {
        title: <FormattedMessage id="payment.phoneNumber" />,
        value: details?.invoice.phone,
        fieldKey: 'phoneNumber'
      },

      {
        title: <FormattedMessage id="payment.commentOnDelivery" />,
        value: details?.buyerRemark,
        fieldKey: 'comment'
      }
    ];

    return this.handleSortAndFilter(tmpList);
  }
  /**
   * 根据接口字段设置，进行排序/过滤，然后显示到页面
   * @param {*} list 需要排序的列表
   * @returns 排序后的列表
   */
  handleSortAndFilter(list) {
    const {
      configStore: {
        localAddressForm: { fieldKeyEnableStatus, settings }
      }
    } = this.props;

    const ret = list
      .sort((a, b) => {
        const targetA = settings.find((ele) => ele.fieldKey === a.fieldKey);
        const targetB = settings.find((ele) => ele.fieldKey === b.fieldKey);
        return targetA?.sequence - targetB?.sequence;
      })
      .filter(
        (ele) =>
          !ele.fieldKey || (fieldKeyEnableStatus[ele.fieldKey] && ele.value)
      );
    return ret;
  }
  render() {
    const { details } = this.props;

    return (
      <div className="card mb-3 shipping-summary checkout--padding">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-xl">
            <em className="rc-icon rc-indoors--xs rc-iconography rc-margin-right--xs" />{' '}
            <FormattedMessage id="payment.addressTitle" />
          </h5>
        </div>

        {details ? (
          <div className="card-body rc-padding--none">
            <div className="single-shipping">
              <div className="rounded rc-border-all rc-border-colour--interface checkout--padding">
                <div className="summary-details shipping rc-margin-bottom--xs">
                  <div className="address-summary row">
                    <div className="col-12 deliveryAddress">
                      <h5 className="font-normal mb-1">
                        <FormattedMessage id="payment.deliveryTitle" />
                      </h5>
                      <div className="grid grid-cols-2">
                        {this.deliveryAdrrItemList.map((ele, i) => (
                          <Fragment key={i}>
                            <div className="col-span-2 md:col-span-1">
                              {ele.title}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                              {ele.value}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    {details.invoice && !hideBillingAddr ? (
                      <div className="col-12 address-summary-left">
                        <h5 className="font-normal mb-1">
                          <FormattedMessage id="payment.billTitle" />
                        </h5>

                        <div className="grid grid-cols-2">
                          {this.billingAdrrItemList.map((ele, i) => (
                            <Fragment key={i}>
                              <div className="col-span-2 md:col-span-1">
                                {ele.title}
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                {ele.value}
                              </div>
                            </Fragment>
                          ))}
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
