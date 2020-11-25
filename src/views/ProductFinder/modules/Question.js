import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Modal from '@/components/Modal';
import Skeleton from 'react-skeleton-loader';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import ProgressWithTooptip from '@/components/ProgressWithTooptip';
import helpImg from '@/assets/images/product-finder-help.png';
import RadioAnswer from './RadioAnswer';
import SelectAnswer from './SelectAnswer';
import SearchAnswer from './SearchAnswer';
import TextAnswer from './TextAnswer';
import { query, edit, matchProducts } from '@/api/productFinder';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';
import veterinaryImg from '@/assets/images/veterinary.png';
import veterinaryProductImg from '@/assets/images/veterinary_product.png';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
class Question extends React.Component {
  static defaultProps = {
    type: '', // cat dog
    defaultQuestionData: null, // 初始化答题信息，缓存的上一次答题信息
    defaultStep: -1
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      questionCfg: null,
      isPageLoading: false,
      form: null,
      breedSizeform: null,
      stepOrder: -1,
      finderNumber: '',
      questionParams: null,
      qListVisible: false,
      iconToolTipVisible: false,
      btnToolTipVisible: false,
      errMsg: '',
      currentStepName: '',
      answerdQuestionList: [],
      placeholderList: [],
      valid: false,
      isEdit: false, // 是否处于编辑状态
      initDataFromFreshPage: false,
      configSizeAttach: null // when breed，attached size data
    };
    this.setIconToolTipVisible = this.setIconToolTipVisible.bind(this);
    this.setBtnToolTipVisible = this.setBtnToolTipVisible.bind(this);
    this.setSickModalVisible = this.setSickModalVisible.bind(this);
    this.handleClickQItem = this.handleClickQItem.bind(this);
  }
  componentDidMount() {
    const {
      type,
      defaultStep: tmpOrder,
      defaultQuestionData: cachedQuestionData
    } = this.props;
    this.setState(
      {
        questionParams: { speciesCode: type }
      },
      () => {
        // 从缓存中读取上次答题进度缓存
        if (cachedQuestionData) {
          const {
            finderNumber,
            stepOrder,
            questionParams
          } = cachedQuestionData;
          this.setState(
            {
              finderNumber,
              stepOrder,
              questionParams,
              initDataFromFreshPage: true
            },
            () => this.queryAnswers()
          );
        } else {
          // 编辑状态下无须重新请求接口，从其他地方带初始值过来
          if (tmpOrder && Number(tmpOrder) > 1) {
            this.handleEditOneQuestion(tmpOrder);
          } else {
            // 正常第一次答题
            this.queryAnswers();
          }
        }
      }
    );
  }
  handleEditOneQuestion(tmpOrder) {
    const { answerdQuestionList, progress } = this.state;
    const editStopOrder = Number(tmpOrder);
    const tmpList = answerdQuestionList.length
      ? answerdQuestionList
      : sessionItemRoyal.get('pf-questionlist')
      ? JSON.parse(sessionItemRoyal.get('pf-questionlist'))
      : [];
    const targetItem = tmpList.filter(
      (ele) => ele.stepOrder === editStopOrder
    )[0];
    const qRes = this.handleQuestionConfigLogic({
      stepName: targetItem.questionName,
      metadataQuestionDisplayType: targetItem.selectType,
      defaultListData: targetItem.answerList
    });
    this.setState({
      progress: progress || 100,
      stepOrder: editStopOrder,
      finderNumber: targetItem.finderNumber,
      answerdQuestionList: tmpList,
      currentStepName: targetItem.questionName,
      questionParams: tmpList
        .filter((ele) => ele.stepOrder <= editStopOrder)
        .reduce((prev, cur) => {
          return Object.assign(prev, {
            [cur.questionName]: cur.answer
          });
        }, this.state.questionParams),
      questionCfg: {
        title: targetItem.question,
        list: qRes.questionList,
        placeholderList: qRes.holderList
      },
      questionType: qRes.questionType,
      isEdit: true
    });
  }
  toggleShowQList = () => {
    this.setState((curState) => ({ qListVisible: !curState.qListVisible }));
  };
  setIconToolTipVisible(status) {
    this.setState({ iconToolTipVisible: status });
  }
  setBtnToolTipVisible(status) {
    this.setState({ btnToolTipVisible: status });
  }
  updateFormData = (data) => {
    this.setState({ form: data });
  };
  updateBreedSizeFormData = (data) => {
    this.setState({ breedSizeform: data });
  };
  updateSaveBtnStatus = (status) => {
    this.setState({ valid: status });
  };
  handleClickNext = () => {
    // 当选择我的宠物生病了 不能进行下一步，需要弹出弹框
    const { form } = this.state;
    if (form && form.key === 'healthIssues') {
      this.setSickModalVisible(true);
      return false;
    }
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
        breedSizeform,
        questionType,
        questionParams,
        finderNumber,
        initDataFromFreshPage,
        configSizeAttach
      } = this.state;
      const { type } = this.props;
      this.setState({ isPageLoading: true });
      let tmpQuestionParams = Object.assign({}, questionParams);
      if (currentStepName) {
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
        // 特殊处理breed size
        if (breedSizeform) {
          tmpQuestionParams = Object.assign(tmpQuestionParams, {
            [configSizeAttach.name]: encodeURI(breedSizeform.key)
          });
        }
        this.setState({ questionParams: tmpQuestionParams });
      }
      let params = {
        finderNumber,
        questionParams: tmpQuestionParams
      };
      if (stepOrder > 0) {
        params.stepOrder = stepOrder;
      }
      if (initDataFromFreshPage) {
        params.freshPage = 1;
      }

      const res = await (this.state.isEdit ? edit : query)(params);
      const resContext = res.context;
      const statistics = res.context.statistics;
      if (!resContext.isEndOfTree) {
        const tmpStep = resContext.step;
        const qRes = this.handleQuestionConfigLogic({
          stepName: tmpStep.name,
          metadataQuestionDisplayType: tmpStep.metadataQuestionDisplayType
            ? tmpStep.metadataQuestionDisplayType
            : tmpStep.name === 'lifestagesCat'
            ? 'singleSelect'
            : '',
          defaultListData: tmpStep.answers
        });
        if (resContext.sizeStep) {
          this.setState({
            configSizeAttach: resContext.sizeStep
          });
        }
        this.setState(
          {
            questionCfg: {
              title: resContext.step.label,
              list: qRes.questionList,
              placeholderList: qRes.holderList
            },
            questionType: qRes.questionType,

            progress: Math.round(
              (statistics.nbStepPassed /
                (statistics.nbStepPassed +
                  statistics.maximumNbOfStepRemaining)) *
                100
            ),
            currentStepName: resContext.step.name,
            stepOrder: resContext.stepOrder,
            finderNumber: resContext.finderNumber,
            answerdQuestionList: resContext.answerdQuestionList || [],
            isEdit: false, // 编辑一次问题后，剩余问题使用正常回答流程
            initDataFromFreshPage: false
          },
          () => {
            const { finderNumber, stepOrder, questionParams } = this.state;
            if (stepOrder - 1 > 0) {
              localItemRoyal.set(`pf-cache-type`, type);
              localItemRoyal.set(`pf-cache-${type}-question`, {
                finderNumber,
                stepOrder: stepOrder - 1,
                questionParams
              });
            }
          }
        );
      } else {
        // 所有问题回答结束，进行查找产品
        const proRes = await matchProducts({
          finderNumber,
          questionParams: tmpQuestionParams
        });
        localItemRoyal.remove(`pf-cache-${type}-question`);
        sessionItemRoyal.set(
          'pf-questionlist',
          JSON.stringify(this.state.answerdQuestionList)
        );
        let tmpUrl;
        if (proRes.context && proRes.context.mainProduct) {
          sessionItemRoyal.set('pf-result', JSON.stringify(proRes.context));
          tmpUrl = '/product-finder-recommendation';
        } else {
          tmpUrl = '/product-finder-noresult';
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
  handleQuestionConfigLogic({
    stepName,
    metadataQuestionDisplayType,
    defaultListData
  }) {
    let tmpList = defaultListData;
    let tmpPlaceHolderList = [];
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
              key: i
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
    switch (stepName) {
      case 'reasonForDiet':
        tmpList.sort((a) => {
          return a.key === 'none' ? 1 : a.key === 'healthIssues' ? 1 : -1;
        });
        break;
      default:
        break;
    }
    let questionType =
      {
        singleSelect: 'radio',
        ageSelect: 'select',
        weightSelect: 'select',
        breedSelect: 'search',
        freeTextSkippable: 'text'
      }[metadataQuestionDisplayType] || '';
    return {
      questionList: tmpList,
      holderList: tmpPlaceHolderList,
      questionType
    };
  }
  setSickModalVisible(status) {
    this.setState({ sickModalVisible: status });
  }
  handleClickQItem(ele) {
    this.handleEditOneQuestion(ele.stepOrder);
  }
  render() {
    const { type } = this.props;
    const {
      progress,
      questionCfg,
      btnToolTipVisible,
      isPageLoading,
      qListVisible,
      iconToolTipVisible,
      questionType,
      errMsg,
      answerdQuestionList,
      sickModalVisible,
      configSizeAttach
    } = this.state;
    let computedConfigSizeAttach = null;
    if (configSizeAttach) {
      computedConfigSizeAttach = {
        title: configSizeAttach.label,
        list: configSizeAttach.answers
      };
    }
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
                    className="ml-2 mr-2 pt-2 pb-2 border-bottom ui-cursor-pointer"
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
                    onClick={this.handleClickQItem.bind(this, ele)}
                  >
                    {ele.productFinderAnswerDetailsVO.prefix}
                    {ele.productFinderAnswerDetailsVO.prefix ? ' ' : null}
                    <span className="red">
                      {ele.productFinderAnswerDetailsVO.suffix}
                    </span>
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
          <div className="col-12 col-md-6 order-1 order-md-0 mt-4 mt-md-0 mb-4">
            {isPageLoading ? (
              <span className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="3%" count={5} />
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
                    updateFormData={this.updateFormData}
                    updateSaveBtnStatus={this.updateSaveBtnStatus}
                  />
                )}
                {questionType === 'select' && (
                  <SelectAnswer
                    config={questionCfg}
                    updateFormData={this.updateFormData}
                    updateSaveBtnStatus={this.updateSaveBtnStatus}
                  />
                )}
                {questionType === 'search' && (
                  <SearchAnswer
                    config={questionCfg}
                    updateFormData={this.updateFormData}
                    updateBreedSizeFormData={this.updateBreedSizeFormData}
                    updateSaveBtnStatus={this.updateSaveBtnStatus}
                    queryAnswers={this.queryAnswers}
                    configSizeAttach={computedConfigSizeAttach}
                  />
                )}
                {questionType === 'text' && (
                  <TextAnswer
                    config={questionCfg}
                    updateFormData={this.updateFormData}
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

        <Modal
          footerVisible={false}
          visible={sickModalVisible}
          modalTitle={''}
          modalText={
            <div className="row ml-3 mr-3">
              <div className="col-12 col-md-6">
                <h2 className="rc-beta markup-text">
                  <FormattedMessage id="productFinder.healthTitle" />
                </h2>
                <p>
                  <FormattedMessage id="productFinder.healthTip1" />
                </p>
                <p>
                  <FormattedMessage id="productFinder.healthTip2" />
                </p>
                <div className="rc-btn-group mb-3">
                  <a
                    className="rc-btn rc-btn--one"
                    href="https://shop.royalcanin.fr/dog-range/veterinary-care-nutrition/"
                    target="_blank"
                    rel="nofollow"
                  >
                    <FormattedMessage id="learnMore" />
                  </a>
                  <Link
                    className="rc-btn rc-btn--two"
                    to="/help"
                    target="_blank"
                    rel="nofollow"
                  >
                    <FormattedMessage id="contactUs" />
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <img
                  src={veterinaryImg}
                  className="rc-md-up"
                  style={{ width: '20%', margin: '0 auto' }}
                  alt=""
                />
                <img
                  className="mt-3 rc-full-width"
                  src={veterinaryProductImg}
                  alt=""
                />
              </div>
            </div>
          }
          close={this.setSickModalVisible.bind(this, false)}
          hanldeClickConfirm={this.setSickModalVisible.bind(this, false)}
        />
      </div>
    );
  }
}

export default Question;
