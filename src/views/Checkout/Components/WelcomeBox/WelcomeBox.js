/*
 * Created By ZuoQin On 2021/07/02
 * First order Welcome Box:1、会员 2、首单 3、未填写学生购student promotion 50% discount
 */
import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { isFirstOrder } from '@/api/user';

@inject('paymentStoreNew', 'loginStore')
@injectIntl
@observer
class InfosPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeList: [
        {
          label: this.props.intl.messages['firstOrderWelcomeBox.yes'],
          value: 'yes'
        },
        {
          label: this.props.intl.messages['firstOrderWelcomeBox.no'],
          value: 'no'
        }
      ],
      checkedBox: 'yes',
      isFirstOrder: false //是否是首单
    };
  }
  componentDidMount() {
    if (this.isLogin) {
      //判断该会员是否是第一次下单
      isFirstOrder().then((res) => {
        if (res.context == 0) {
          this.setState({ isFirstOrder: true });
        }
      });
    }
    this.props.paymentStoreNew.setWelcomeBoxValue(this.state.checkedBox);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  welcomeBoxCheckedChange = (e, value) => {
    this.setState({ checkedBox: value });
    this.props.paymentStoreNew.setWelcomeBoxValue(value);
  };
  render() {
    const {
      paymentStoreNew: { isStudentPurchase }
    } = this.props;
    const { welcomeList, checkedBox, isFirstOrder } = this.state;

    return !!+window.__.env.REACT_APP_SHOW_CHECKOUT_WELCOMEBOX &&
      this.isLogin &&
      isFirstOrder &&
      !isStudentPurchase ? (
      <div className="mb-4 bg-white shadow-lg rounded checkout--padding">
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.intl.messages['firstOrderWelcomeBox.title']
          }}
        />
        <div className="flex flex-row mt-1">
          {welcomeList.map((item, index) => (
            <div className="rc-input rc-input--inline mw-100" key={index}>
              <input
                className="rc-input__checkbox cursor-pointer"
                id={`id-checkbox-welcome-box-${index}`}
                name={`id-checkbox-welcome-box-${index}`}
                onChange={(e) => this.welcomeBoxCheckedChange(e, item.value)}
                type="checkbox"
                checked={item.value === checkedBox}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor={`id-checkbox-welcome-box-${index}`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
}

export default InfosPreview;
