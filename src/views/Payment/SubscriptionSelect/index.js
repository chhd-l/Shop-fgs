import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import Selection from '@/components/Selection'
import { getDictionary, formatMoney } from "@/utils/utils";
import { getMarketingDiscount } from "@/api/payment";
import './index.css'

@injectIntl
@inject("checkoutStore", "frequencyStore")
@observer
class SubscriptionSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      frequencyList: [],
      form: {
        buyWay: 'once', // once/frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      discountInfo: null
    }
  }
  async componentDidMount () {
    getMarketingDiscount({
      totalAmount: this.props.checkoutStore.loginCartData
        .filter(ele => ele.subscriptionStatus && ele.subscriptionPrice > 0)
        .reduce((total, item) => total + item.subscriptionPrice, 0),
      goodsInfoIds: this.props.checkoutStore.loginCartData
        .filter(ele => ele.subscriptionStatus && ele.subscriptionPrice > 0)
        .map(ele => ele.goodsInfoId)
    })
      .then(res => {
        this.setState({
          discountInfo: res.context
        })
      })
    Promise.all([
      getDictionary({ type: 'Frequency_week' }),
      getDictionary({ type: 'Frequency_month' })
    ]).then(dictList => {
      this.setState({
        frequencyList: [...dictList[0], ...dictList[1]],
        form: Object.assign(this.state.form, {
          frequencyVal: dictList[0][0].valueEn,
          frequencyName: dictList[0][0].name,
          frequencyId: dictList[0][0].id
        })
      }, () => {
        this.props.updateSelectedData(this.state.form)
      })
    })
  }
  get computedList () {
    return this.state.frequencyList.map(ele => {
      return {
        value: ele.valueEn,
        ...ele
      }
    })
  }
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form }, () => {
      this.props.updateSelectedData(this.state.form)
    })
  }
  handleSelectedItemChange (data) {
    const { form } = this.state
    form.frequencyVal = data.value
    form.frequencyName = data.name
    form.frequencyId = data.id
    this.setState({ form: form }, () => {
      this.props.updateSelectedData(this.state.form)
    })
  }
  render () {
    const { form } = this.state
    return (<div className="">
      {/* <FormattedMessage
        id="payment.subTip2"
        values={{
          icon: <span className="iconfont font-weight-bold red" style={{ fontSize: '.8em' }}>&#xe675;</span>,
          val: <span className="red">{this.state.discountInfo ? this.state.discountInfo.promotionDiscount : ''}</span>,
          val2: formatMoney(this.state.discountInfo && this.state.discountInfo.discountAmount ? this.state.discountInfo.discountAmount : 0)
        }} /> */}
      <br />
      <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
        <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width ml-2">
          {
            form.buyWay === 'frequency'
              ? <input
                className="rc-input__radio"
                id="optsmobile"
                type="radio"
                name="buyWay"
                value="frequency"
                key="1"
                onChange={event => this.handleInputChange(event)}
                checked />
              : <input
                className="rc-input__radio"
                id="optsmobile"
                type="radio"
                name="buyWay"
                value="frequency"
                key="2"
                onChange={event => this.handleInputChange(event)} />
          }
          <label className="rc-input__label--inline" htmlFor="optsmobile">
            <span className="red"><FormattedMessage id="payment.frequencyTip1" /></span><br />
            {/* <FormattedMessage
              id="payment.subTip1"
              values={{
                val: formatMoney(this.state.discountInfo && this.state.discountInfo.discountAmount ? this.state.discountInfo.discountAmount : 0)
              }} /> */}
            {/* <br /> */}
            <span className="font-weight-normal mt-1 inlineblock">
              <FormattedMessage id="payment.deliveryFrequency" />:
            </span>
          </label>
          <div style={{ marginLeft: '5%' }} className="d-flex align-items-center">
            <span className="position-relative" style={{ top: '-2px' }}>
              <FormattedMessage id="every" />
            </span> &nbsp;
            <Selection
              selectedItemChange={data => this.handleSelectedItemChange(data)}
              optionList={this.computedList}
              selectedItemData={{
                value: form.frequencyVal
              }}
              customStyleType="select-one" />
            <span className="ml-2 d-flex align-items-center flex-wrap">
              {
                this.props.checkoutStore.loginCartData
                  .filter(ele => ele.subscriptionStatus && ele.subscriptionPrice > 0)
                  .map((ele, i) => (
                    <div className="imgBoxForSelect">
                      <img className="width-sub-img  imgForSelect " style={{ display: 'inline-block' }} key={i} src={ele.goodsInfoImg} />
                    </div>
                  ))
              }
            </span>
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width ml-2 mt-4">
          <FormattedMessage id="email">
            {txt => (
              form.buyWay === 'once'
                ? <input
                  className="rc-input__radio"
                  id="optsemail"
                  type="radio"
                  alt={txt}
                  name="buyWay"
                  value="once"
                  key="1"
                  onChange={event => this.handleInputChange(event)}
                  checked />
                : <input
                  className="rc-input__radio"
                  id="optsemail"
                  type="radio"
                  alt={txt}
                  name="buyWay"
                  value="once"
                  key="2"
                  onChange={event => this.handleInputChange(event)} />
            )}
          </FormattedMessage>
          <label className="rc-input__label--inline" htmlFor="optsemail">
            <span className="red"><FormattedMessage id="payment.frequencyTip2" /></span><br />
            <FormattedMessage id="payment.frequencyTip3" />
          </label>
        </div>
      </div>
    </div>
    )
  }
}
export default SubscriptionSelect