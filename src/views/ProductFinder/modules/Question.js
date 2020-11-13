import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressWithTooptip from '@/components/ProgressWithTooptip';
import helpImg from '@/assets/images/product-finder-help.png';
import RadioAnswer from './RadioAnswer';
import SelectAnswer from './SelectAnswer';
import SearchAnswer from './SearchAnswer';
import TextAnswer from './TextAnswer';
import { query, submit, matchProducts } from '@/api/productFinder';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';

const sessionItemRoyal = window.__.sessionItemRoyal;

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      progress: 0,
      questionCfg: null,
      isPageLoading: false,
      form: null,
      stepOrder: 1,
      finderNumber: '',
      questionParams: null,
      qListVisible: false,
      iconToolTipVisible: false,
      btnToolTipVisible: false,
      errMsg: '',
      currentStepName: '',
      answerdQuestionList: [],
      placeholderList: [],
      valid: false
    };
    this.setIconToolTipVisible = this.setIconToolTipVisible.bind(this);
    this.setBtnToolTipVisible = this.setBtnToolTipVisible.bind(this);
  }
  componentDidMount() {
    const { match } = this.props;
    this.setState(
      {
        type: match.params.type,
        questionParams: { speciesCode: match.params.type }
      },
      () => {
        this.queryAnswers();
      }
    );
  }
  toggleShowQList = () => {
    this.setState((curState) => ({ qListVisible: !curState.qListVisible }));
  };
  setIconToolTipVisible(status) {
    this.setState({ iconToolTipVisible: status });
  }
  setBtnToolTipVisible(status) {
    this.setState({ iconToolTipVisible: status });
  }
  updateFromData = (data) => {
    this.setState({ form: data });
  };
  updateSaveBtnStatus = (status) => {
    this.setState({ valid: status });
  };
  handleClickNext = () => {
    // 根据当前answer，请求题目
    this.queryAnswers();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  queryAnswers = async () => {
    try {
      const {
        stepOrder,
        currentStepName,
        form,
        questionType,
        questionParams,
        finderNumber,
        type
      } = this.state;
      this.setState({ isPageLoading: true });
      debugger;
      let tmpQuestionParams = Object.assign({}, questionParams);
      if (currentStepName) {
        debugger;
        let tmpFormParam;
        switch (questionType) {
          case 'text':
            tmpFormParam = form;
            break;
          case 'radio':
          case 'search':
            tmpFormParam = encodeURI(form.key);
            break;
          case 'select':
            tmpFormParam = form.reduce((cur, prev) => cur + prev) + '';
            break;
          default:
            break;
        }
        tmpQuestionParams = Object.assign(tmpQuestionParams, {
          [currentStepName]: tmpFormParam
        });
        this.setState({ questionParams: tmpQuestionParams });
      }
      const res = await query({
        finderNumber,
        questionParams: tmpQuestionParams,
        stepOrder
      });
      const resContext = res.context;
      const statistics = res.context.statistics;
      debugger;
      if (!resContext.isEndOfTree) {
        const metadataQuestionDisplayType =
          resContext.step.metadataQuestionDisplayType;
        let tmpList = resContext.step.answers;
        let tmpPlaceHolderList = [];
        // 前端定义年龄候选项
        switch (metadataQuestionDisplayType) {
          case 'ageSelect':
            tmpList = [
              Array.from({ length: 26 }).map((item, i) => {
                return {
                  label: <FormattedMessage id="xYears" values={{ val: i }} />,
                  key: 12 * i
                };
              }),
              Array.from({ length: 12 }).map((item, i) => {
                return {
                  label: <FormattedMessage id="xMonths" values={{ val: i }} />,
                  key: 12 * i
                };
              })
            ];
            tmpPlaceHolderList = [
              <FormattedMessage id="year" />,
              <FormattedMessage id="month" />
            ];
            break;
          case 'weightSelect':
            tmpList = [
              Array.from({ length: 49 }).map((item, i) => {
                return {
                  label: `${i + 1} Kg`,
                  key: i + i
                };
              })
            ];
            tmpPlaceHolderList = [<FormattedMessage id="weight" />];
            break;
          default:
            break;
        }
        this.setState({
          questionCfg: {
            title: resContext.step.label,
            list: tmpList,
            placeholderList: tmpPlaceHolderList
          },
          questionType:
            {
              singleSelect: 'radio',
              ageSelect: 'select',
              weightSelect: 'select',
              breedSelect: 'search',
              freeTextSkippable: 'text'
            }[metadataQuestionDisplayType] || '',
          progress: Math.round(
            (statistics.nbStepPassed /
              (statistics.nbStepPassed + statistics.maximumNbOfStepRemaining)) *
              100
          ),
          currentStepName: resContext.step.name,
          stepOrder: resContext.stepOrder,
          finderNumber: resContext.finderNumber,
          answerdQuestionList: resContext.answerdQuestionList
        });
      } else {
        // 所有问题回答结束，进行查找产品
        const proRes = await matchProducts({
          finderNumber,
          questionParams: tmpQuestionParams
        });

        let tmpUrl;
        if (proRes.context && proRes.context.mainProduct) {
          sessionItemRoyal.set(
            'product-finder-result',
            JSON.stringify(proRes.context)
          );
          sessionItemRoyal.set(
            'product-finder-questionlist',
            JSON.stringify(this.state.answerdQuestionList)
          );
          tmpUrl = `/product-finder/result/${type}`;
        } else {
          tmpUrl = `/product-finder/noresult/${type}`;
        }
        this.props.history.push(tmpUrl);
      }
    } catch (err) {
      this.setState({ errMsg: err.message });
    } finally {
      this.setState({
        isPageLoading: false
      });
    }
  };
  render() {
    const { match, history, location } = this.props;
    const {
      type,
      progress,
      form,
      questionCfg,
      btnToolTipVisible,
      isPageLoading,
      qListVisible,
      iconToolTipVisible,
      questionType,
      errMsg,
      answerdQuestionList
    } = this.state;
    let event;
    if (type) {
      event = {
        page: {
          type: 'Product Finder',
          theme: type
        }
      };
    }

    return (
      <div>
        {event ? <GoogleTagManager additionalEvents={event} /> : null}
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <div className="rc-content--fixed-header rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
          <ProgressWithTooptip value={progress} style={{ height: '.4rem' }} />
          <div className="row justify-content-center justify-content-md-between mb-4">
            <div className="col-8 col-md-4 mt-2">
              {answerdQuestionList.length > 0 && (
                <div
                  className="pt-2 pb-2 rc-bg-colour--brand4 text-center rounded ui-cursor-pointer-pure"
                  onClick={this.toggleShowQList}
                >
                  {qListVisible ? (
                    <span className="rc-icon rc-down--xs rc-iconography" />
                  ) : (
                    <span className="rc-icon rc-right--xs rc-iconography" />
                  )}
                  <FormattedMessage id="answeredQuestions" />
                </div>
              )}
              {qListVisible && (
                <div className="mt-2 rc-bg-colour--brand4 rounded text-center">
                  {answerdQuestionList.map((ele) => (
                    <div
                      className="ml-2 mr-2 pt-2 pb-2 border-bottom"
                      key={ele.id}
                      ref={(node) => {
                        if (node) {
                          node.style.setProperty(
                            'border-bottom',
                            '2px solid #fff',
                            'important'
                          );
                        }
                      }}
                    >
                      {ele.answer}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-2 col-md-1 rc-md-up">
              <img
                className="ui-cursor-pointer"
                src={helpImg}
                onMouseEnter={this.setIconToolTipVisible.bind(this, true)}
                onMouseLeave={this.setIconToolTipVisible.bind(this, false)}
                alt=""
              />
              <ConfirmTooltip
                arrowDirection="right"
                arrowStyle={{ top: '25%' }}
                display={iconToolTipVisible}
                cancelBtnVisible={false}
                confirmBtnVisible={false}
                updateChildDisplay={this.setIconToolTipVisible}
                content={<FormattedMessage id="productFinder.helpTip3" />}
                key="1"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 order-1 order-md-0 mt-4 mt-md-0">
              {isPageLoading ? (
                <span className="mt-4">
                  <Skeleton
                    color="#f5f5f5"
                    width="100%"
                    height="3%"
                    count={5}
                  />
                </span>
              ) : errMsg ? (
                <>
                  <i className="rc-icon rc-incompatible--sm rc-iconography" />
                  {errMsg}
                </>
              ) : (
                <>
                  {questionType === 'radio' && (
                    <RadioAnswer
                      config={questionCfg}
                      updateFromData={this.updateFromData}
                      updateSaveBtnStatus={this.updateSaveBtnStatus}
                    />
                  )}
                  {questionType === 'select' && (
                    <SelectAnswer
                      config={questionCfg}
                      updateFromData={this.updateFromData}
                      updateSaveBtnStatus={this.updateSaveBtnStatus}
                    />
                  )}
                  {questionType === 'search' && (
                    <SearchAnswer
                      config={questionCfg}
                      updateFromData={this.updateFromData}
                      updateSaveBtnStatus={this.updateSaveBtnStatus}
                    />
                  )}
                  {questionType === 'text' && (
                    <TextAnswer
                      config={questionCfg}
                      updateFromData={this.updateFromData}
                      updateSaveBtnStatus={this.updateSaveBtnStatus}
                    />
                  )}

                  {questionType ? (
                    <div className="row text-center text-md-left">
                      <div className="col-12 col-md-3">
                        <button
                          className="rc-btn rc-btn--one rc-btn--sm"
                          disabled={!this.state.valid}
                          onClick={this.handleClickNext}
                        >
                          <FormattedMessage id="next" />
                        </button>
                      </div>
                      <div className="col-12 col-md-7 mt-2 mb-4 mt-md-0 mb-md-0">
                        <div className="position-relative inlineblock">
                          <p
                            className="rc-styled-link mb-0 mt-2"
                            onMouseEnter={this.setBtnToolTipVisible.bind(
                              this,
                              true
                            )}
                            onMouseLeave={this.setBtnToolTipVisible.bind(
                              this,
                              false
                            )}
                          >
                            <FormattedMessage id="productFinder.whyAreWeAskingThis" />
                          </p>
                          <div className="rc-md-up">
                            <ConfirmTooltip
                              arrowDirection="left"
                              arrowStyle={{ top: '50%' }}
                              display={btnToolTipVisible}
                              cancelBtnVisible={false}
                              confirmBtnVisible={false}
                              updateChildDisplay={this.setBtnToolTipVisible}
                              content={
                                <FormattedMessage id="productFinder.helpTip3" />
                              }
                              key="2"
                            />
                          </div>
                          <div className="rc-md-down">
                            <ConfirmTooltip
                              arrowDirection="bottom"
                              arrowStyle={{ top: '-14%' }}
                              containerStyle={{
                                transform: 'translate(-50%, 120%)'
                              }}
                              display={btnToolTipVisible}
                              cancelBtnVisible={false}
                              confirmBtnVisible={false}
                              updateChildDisplay={this.setBtnToolTipVisible}
                              content={
                                <FormattedMessage id="productFinder.helpTip3" />
                              }
                              key="3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <div className="col-12 col-md-6 order-0 order-md-1">
              <img
                src={{ cat: catImg, dog: dogImg }[type]}
                className="p-f-q-avatar"
                alt=""
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Question;
