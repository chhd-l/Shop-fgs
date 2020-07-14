import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { inject } from 'mobx-react'
import Selection from '@/components/Selection'
import { getDictionary } from "@/utils/utils"

@inject("checkoutStore")
class SubscriptionSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      frequencyList: [],
      form: {
        buyWay: 'once', // once/frequency
        frequencyVal: '',
        frequencyId: -1
      }
    }
  }
  async componentDidMount () {
    let res = await getDictionary({ type: 'Frequency' })
    this.setState({
      frequencyList: res,
      form: Object.assign(this.state.form, { frequencyVal: res[0].valueEn, frequencyId: res[0].id })
    }, () => {
      this.props.updateSelectedData(this.state.form)
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
    this.setState({ form: form })
    this.props.updateSelectedData(this.state.form)
  }
  handleSelectedItemChange (data) {
    const { form } = this.state
    form.frequencyVal = data.value
    form.frequencyId = data.id
    this.setState({ form: form })
    this.props.updateSelectedData(this.state.form)
  }
  render () {
    const { form } = this.state
    return (<div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm pt-3 pb-2">
      Save your first <span className="rc-icon rc-refresh--xs rc-brand1"></span> Subscription order and save <span className="red">30%($ 18.5)</span> today!<br />
      Plus, save 5% on eligible items on future Subscription orders.
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
            You will save an additional $ 18.5 on this order!<br />
            <span className="font-weight-normal mt-1 inlineblock">
              <FormattedMessage id="payment.deliveryFrequency" />:
            </span>
          </label>
          <div style={{ marginLeft: '5%' }} className="d-flex align-items-center">
            <Selection
              selectedItemChange={data => this.handleSelectedItemChange(data)}
              optionList={this.computedList}
              selectedItemData={{
                value: form.frequencyVal
              }}
              customStyleType="select-one"
              customContainerStyle={{ minWidth: '20%' }} />
            <span className="ml-2 d-flex align-items-center flex-wrap">
              {
                this.props.checkoutStore.loginCartData
                  .filter(ele => ele.goods && ele.goods.subscriptionStatus)
                  .map((ele, i) => (
                    <img style={{ width: '8%', display: 'inline-block' }} key={i} src={ele.goodsInfoImg} />
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
                  onChange={event => this.handleInputChange(event)}
                  checked />
                : <input
                  className="rc-input__radio"
                  id="optsemail"
                  type="radio"
                  alt={txt}
                  name="buyWay"
                  value="once"
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