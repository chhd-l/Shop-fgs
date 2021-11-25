/*
 * Created By ZuoQin On 2021/11/16
 * cart survey : 1、guest  2、never answered the survey 的会员
 */
import React from 'react';
import './index.less';
import { querySurveyContent, recordSurveyReview } from '@/api/cart';
import { inject, observer } from 'mobx-react';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@observer
class CartSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedBox: false,
      surveyContent: null
    };
  }

  async componentDidMount() {
    this.setState({
      checkedBox: Boolean(sessionItemRoyal.get('rc-clicked-surveyId'))
    });
    await this.querySurveyContent();
    if (this.state.surveyContent?.isShow && !this.state.checkedBox) {
      await this.recordSurveyReview();
    }
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  //获取 survey content 和是否可以展示
  async querySurveyContent() {
    try {
      const res = await querySurveyContent({
        storeId: window.__.env.REACT_APP_STOREID,
        customerId: this.isLogin ? this.userInfo.customerId : ''
      });
      this.setState({
        surveyContent: res?.context
      });
    } catch (e) {
      console.log(e);
    }
  }

  //统计 survey 1 review
  async recordSurveyReview() {
    try {
      await recordSurveyReview({ id: this.state.surveyContent.id });
    } catch (e) {
      console.log(e);
    }
  }

  surveyClickChange = (e) => {
    sessionItemRoyal.set(
      'rc-clicked-surveyId',
      !this.state.checkedBox ? this.state.surveyContent.id : ''
    );
    this.setState({ checkedBox: !this.state.checkedBox });
  };

  render() {
    const { checkedBox, surveyContent } = this.state;
    return (
      <>
        {surveyContent?.isShow ? (
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
                {surveyContent?.title}
              </label>
            </div>
            <div className="cart-survey-content">
              {surveyContent?.description}
            </div>
          </div>
        ) : (
          <div />
        )}
      </>
    );
  }
}

export default CartSurvey;
