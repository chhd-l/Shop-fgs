/*
 * Created By ZuoQin On 2021/11/16
 * cart survey : 1、guest  2、never answered the survey 的会员
 */
import React from 'react';
import './index.less';
import {
  querySurveyContent,
  accountHasClickSurvey,
  recordSurveyReview
} from '@/api/cart';
import { inject, observer } from 'mobx-react';

@inject('checkoutStore', 'loginStore')
@observer
class CartSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedBox: false,
      surveyContent: null,
      isCanReviewSurvey: true
    };
  }

  async componentDidMount() {
    // await this.querySurveyContent();
    // if (this.state.isCanReviewSurvey) {
    //   await this.recordSurveyReview();
    // }
    const { checkoutStore } = this.props;
    const cartData = this.props.isLogin
      ? checkoutStore.loginCartData
      : checkoutStore.cartData;
    console.log('cartData,', cartData);
    const isChecked = cartData.filter(
      (el) => el.surveyId && el.surveyId !== ''
    );
    this.setState({ checkedBox: isChecked.length > 0 });
  }

  //获取 survey content
  async querySurveyContent() {
    try {
      const res = await querySurveyContent();
      if (this.props.isLogin) {
        const result = await accountHasClickSurvey();
        if (!result?.context) {
          //会员未点击过survey
          this.setState({ surveyContent: res?.context });
        } else {
          this.setState({ isCanReviewSurvey: false });
        }
      } else {
        this.setState({ surveyContent: res?.context });
      }
    } catch (e) {
      console.log(e);
    }
  }

  //统计 survey 1 review
  async recordSurveyReview() {
    try {
      await recordSurveyReview();
    } catch (e) {
      console.log(e);
    }
  }

  surveyClickChange = (e) => {
    this.props.surveyCheckedChange(!this.state.checkedBox, '111');
    this.setState({ checkedBox: !this.state.checkedBox });
  };

  render() {
    const { checkedBox } = this.state;
    return (
      <div className="mb-4 cart-survey p-4">
        <div className="rc-input rc-input--inline mw-100">
          <input
            className="rc-input__checkbox ui-cursor-pointer-pure"
            id={`id-checkbox-survey`}
            onChange={(e) => this.surveyClickChange(e)}
            type="checkbox"
            checked={checkedBox}
            value={checkedBox}
          />
          <label
            className="rc-input__label--inline text-break"
            htmlFor={`id-checkbox-survey`}
          >
            11111
          </label>
        </div>
        <div className="cart-survey-content">
          PO can no longer see the survey if he tick the survey and placed an
          order succefully in the same time
        </div>
      </div>
    );
  }
}

export default CartSurvey;
