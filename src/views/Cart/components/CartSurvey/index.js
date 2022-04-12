/**
 * Created By ZuoQin On 2021/11/16
 * show the survey to: everyone/Breeder customers(recommendation link Breeder Id always start with BRD)/Shelter customers(recommendation link Shelter Id always start with BRM)
 * shop cart isShow the survey : 1、guest  2、never answered the survey 的会员
 */
import React from 'react';
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
    await this.initSurveyPanel();
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  async initSurveyPanel() {
    try {
      const breedOrShelterId = sessionItemRoyal.get('BreedOrShelterId') || '';
      const params = {
        storeId: window.__.env.REACT_APP_STOREID,
        customerId: this.isLogin ? this.userInfo.customerId : '',
        breedOrShelter: breedOrShelterId.startsWith('BRD')
          ? 'Breeder'
          : breedOrShelterId.startsWith('BRM')
          ? 'Shelter'
          : 'Everyone'
      };
      //获取 survey content 和会员是否可以看到survey
      const res = await querySurveyContent(params);
      const surveyContent = res?.context;
      this.setState({
        surveyContent: surveyContent,
        checkedBox:
          sessionItemRoyal.get('rc-clicked-surveyId') === surveyContent?.id
      });
      if (
        surveyContent?.id &&
        surveyContent?.isShow &&
        sessionItemRoyal.get('rc-review-surveyId') !== surveyContent?.id
      ) {
        //如果可以展示并且当前survey没有review,统计 survey 1 review
        await recordSurveyReview({ id: surveyContent.id });
        sessionItemRoyal.set('rc-review-surveyId', surveyContent.id);
      }
    } catch (err) {
      console.log(err);
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
          <div
            className="mb-4 border border-rc-green p-4"
            style={{ background: 'rgb(226, 244, 228)' }}
          >
            <div className="rc-input rc-input--inline mw-100">
              <input
                className="rc-input__checkbox ui-cursor-pointer-pure"
                id={`id-checkbox-survey`}
                onChange={(e) => this.surveyClickChange(e)}
                type="checkbox"
                checked={checkedBox}
                value={checkedBox}
                nem="checkedBox"
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor={`id-checkbox-survey`}
              >
                {surveyContent?.title}
              </label>
            </div>
            <div className="text-rc-green">{surveyContent?.description}</div>
          </div>
        ) : (
          <div />
        )}
      </>
    );
  }
}

export default CartSurvey;
