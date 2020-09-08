import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Selection from '@/components/Selection';
import { getDictionary, formatMoney } from '@/utils/utils';
import { getMarketingDiscount } from '@/api/payment';
import './index.css';

@injectIntl
@inject('checkoutStore', 'frequencyStore')
@observer
class SubscriptionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyList: [],
      form: {
        buyWay: 'once', // once/frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      discountInfo: null,
      recommend_data: null
    };
  }
  async componentWillReceiveProps(nextProps) {
    if(nextProps.data.length > 0){
      this.updateFirstOrderDiscount(nextProps.data);
      this.setState({recommend_data: nextProps.data})
    }
  }
  async componentDidMount() {
    this.updateFirstOrderDiscount();
    Promise.all([
      getDictionary({ type: 'Frequency_week' }),
      getDictionary({ type: 'Frequency_month' })
    ]).then((dictList) => {
      this.setState(
        {
          frequencyList: [...dictList[0], ...dictList[1]],
          form: Object.assign(this.state.form, {
            frequencyVal: dictList[0][0].valueEn,
            frequencyName: dictList[0][0].name,
            frequencyId: dictList[0][0].id
          })
        },
        () => {
          this.props.updateSelectedData(this.state.form);
        }
      );
    });
  }
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  updateFirstOrderDiscount(data) {
    let param = this.props.checkoutStore.loginCartData
    .filter((ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0)
    .map((ele) => {
      return {
        goodsInfoId: ele.goodsInfoId,
        buyCount: ele.buyCount
      };
    })
    if(data) {
      console.log(data, 'propsdata')
      param = data
      .filter((ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0)
      .map((ele) => {
        return {
          goodsInfoId: ele.goodsInfoId,
          buyCount: ele.buyCount
        };
      })
    }
    getMarketingDiscount({
      
      goodsInfos: param,
      subscriptionFlag: this.state.form.buyWay === 'frequency'
    }).then((res) => {
      this.setState({
        discountInfo: res.context
      });
    });
  }
  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form }, () => {
      this.props.updateSelectedData(this.state.form);
      this.updateFirstOrderDiscount();
    });
  }
  handleSelectedItemChange(data) {
    const { form } = this.state;
    form.frequencyVal = data.value;
    form.frequencyName = data.name;
    form.frequencyId = data.id;
    this.setState({ form: form }, () => {
      this.props.updateSelectedData(this.state.form);
    });
  }
  render() {
    const { form } = this.state;
    return (
      <div className="">
        {/* <FormattedMessage
          id="payment.subTip2"
          values={{
            icon: (
              <span
                className="iconfont font-weight-bold red"
                style={{ fontSize: '.8em' }}
              >
                &#xe675;
              </span>
            ),
            val: (
              <span className="red">
                {this.state.discountInfo
                  ? this.state.discountInfo.promotionDiscount
                  : ''}
              </span>
            ),
            val2: formatMoney(
              this.state.discountInfo && this.state.discountInfo.discountAmount
                ? this.state.discountInfo.discountAmount
                : 0
            )
          }}
        /> */}
        <div style={{ fontSize: '1.15em' }}>
          <FormattedMessage
            id="payment.subTip1"
            values={{
              val: (
                <span className="red" style={{ fontSize: '1.2em' }}>
                  {formatMoney(
                    this.state.discountInfo &&
                      this.state.discountInfo.discountAmount
                      ? this.state.discountInfo.discountAmount
                      : 0
                  )}
                </span>
              )
            }}
          />
        </div>
        <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs">
          <div className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2 border-bottom bt-2">
            {form.buyWay === 'frequency' ? (
              <input
                className="rc-input__radio"
                id="optsmobile"
                type="radio"
                name="buyWay"
                value="frequency"
                key="1"
                onChange={(event) => this.handleInputChange(event)}
                checked
              />
            ) : (
              <input
                className="rc-input__radio"
                id="optsmobile"
                type="radio"
                name="buyWay"
                value="frequency"
                key="2"
                onChange={(event) => this.handleInputChange(event)}
              />
            )}
            <label className="rc-input__label--inline" htmlFor="optsmobile">
              <span className="red">
                <FormattedMessage id="payment.frequencyTip1" />
              </span>
              <br />
              <span className="font-weight-normal mt-1 inlineblock">
                <FormattedMessage id="payment.deliveryFrequency" />:
              </span>
            </label>
            <div
              style={{ marginLeft: '5%' }}
              className="d-flex align-items-center fit-screen-d-flex"
            >
              <div className="choose-frequency">
                <span
                  className="position-relative choose-frequency-choosies mr-2"
                  style={{ top: '-2px' }}
                >
                  <FormattedMessage id="every" />
                </span>
                <Selection
                  selectedItemChange={(data) =>
                    this.handleSelectedItemChange(data)
                  }
                  optionList={this.computedList}
                  selectedItemData={{
                    value: form.frequencyVal
                  }}
                  customStyleType="select-one"
                />
              </div>
              <span className="ml-2 d-flex align-items-center flex-wrap fit-screen-ml-2">
                {this.state.recommend_data.length? 
                  this.state.recommend_data.filter(
                    (ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0
                  )
                  .map((ele, i) => (
                    <div className="imgBoxForSelect ">
                      <img
                        className="width-sub-img  imgForSelect "
                        style={{ display: 'inline-block' }}
                        key={i}
                        src={ele.goodsInfoImg}
                      />
                    </div>
                  )) : this.props.checkoutStore.loginCartData
                  .filter(
                    (ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0
                  )
                  .map((ele, i) => (
                    <div className="imgBoxForSelect ">
                      <img
                        className="width-sub-img  imgForSelect "
                        style={{ display: 'inline-block' }}
                        key={i}
                        src={ele.goodsInfoImg}
                      />
                    </div>
                  ))}
              </span>
            </div>
          </div>
          <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width ml-2 mt-4">
            <FormattedMessage id="email">
              {(txt) =>
                form.buyWay === 'once' ? (
                  <input
                    className="rc-input__radio"
                    id="optsemail"
                    type="radio"
                    alt={txt}
                    name="buyWay"
                    value="once"
                    key="1"
                    onChange={(event) => this.handleInputChange(event)}
                    checked
                  />
                ) : (
                  <input
                    className="rc-input__radio"
                    id="optsemail"
                    type="radio"
                    alt={txt}
                    name="buyWay"
                    value="once"
                    key="2"
                    onChange={(event) => this.handleInputChange(event)}
                  />
                )
              }
            </FormattedMessage>
            <label className="rc-input__label--inline" htmlFor="optsemail">
              <span className="red">
                <FormattedMessage id="payment.frequencyTip2" />
              </span>
              <br />
              <FormattedMessage id="payment.frequencyTip3" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}
export default SubscriptionSelect;
