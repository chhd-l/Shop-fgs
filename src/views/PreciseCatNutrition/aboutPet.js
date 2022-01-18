import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';
import QuestionnaireForm from './modules/QuestionnaireForm';
import { getAllStep, getNextStep } from './api';
import { getRecommendationInfo } from '@/api/productFinder';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import ResultPage from './modules/resultPage';
import Skeleton from 'react-skeleton-loader';
import { getDeviceType } from '../../utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

function getScrollTop() {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

function AboutPet() {
  let history = useHistory();

  const childRef = useRef();

  const [stepList, setStepList] = useState([]); //当前题库
  const [step, setStep] = useState(1); //当前步骤
  const [finderNumber, setFinderNumber] = useState('');
  const [perStep, setPerStep] = useState([]); //保存上一步输入的值，点击back时使用
  const [defaultValue, setDefaultValue] = useState({}); //表单默认值

  const [result, setResult] = useState(''); //返回结果判断去到那个页面
  const [canNext, setCanNext] = useState(true); //是否可以点击下一步

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInit();
  }, []);

  /**
   * 移动端滚动
   * @param anchorName
   */
  const toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    let scrollTop = getScrollTop();
    if (5600 < scrollTop || scrollTop < 5100) {
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  /**
   * 初始化加载5道题
   */
  const getInit = async (isAgain = false) => {
    setLoading(true);
    const result = await getAllStep();
    let newSort = sortAll(result.context.steps);
    setStepList(newSort);
    if (isAgain) {
      setPerStep([]);
      setDefaultValue({});
    }
    setStep(result.context.steps[0]?.metadata.step);
    setResult('');
    setLoading(false);
  };
  /**
   * 判断是否可以进入下一步
   * @param canNext
   */
  const changeCanNext = (canNext) => {
    setCanNext(canNext);
  };
  /**
   * 对所有题进行排序
   */
  const sortAll = (arr) => {
    let array = [];
    arr.forEach((item) => {
      switch (item.name) {
        case 'name':
          array[0] = item;
          break;
        case 'genderCode':
          array[1] = item;
          break;
        case 'age':
          array[2] = item;
          break;
        case 'neutered':
          array[3] = item;
          break;
        case 'breedCode':
          array[4] = item;
          break;
      }
    });
    return array;
  };

  const toBool = (string) => {
    if (string === 'true') {
      return true;
    } else {
      return false;
    }
  };
  const goNext = async () => {
    setLoading(true);
    if (isMobile) toScroll('aboutPet');
    //改变字符串true false 为bool
    let questionParams = { ...childRef.current.formData };
    if (questionParams.neutered) {
      questionParams.neutered = toBool(questionParams.neutered);
    }
    let querySteps = [
      ...perStep,
      {
        stepNum: step.toString(),
        questionParams
      }
    ];
    let result = await getNextStep({
      finderNumber: finderNumber,
      steps: querySteps
    });

    setFinderNumber(result.context.finderNumber);
    setPerStep(result.context.steps);
    setStep(
      result.context.currentSteps &&
        result.context.currentSteps.length > 0 &&
        result.context.currentSteps[0]?.metadata.step
    );

    if (!result.context.isEndOfTree) {
      //返回答题 顺序处理
      if (
        result.context.currentSteps &&
        result.context.currentSteps[0]?.metadata.step === 2
      ) {
        let array = [];
        result.context.currentSteps.forEach((item) => {
          switch (item.name) {
            case 'weight':
              array[0] = item;
              break;
            case 'weightGain':
              array[2] = item;
              break;
            case 'petActivityCode':
              array[1] = JSON.parse(JSON.stringify(item));
              item.possibleValues.forEach((it) => {
                switch (it.key) {
                  case 'low':
                    array[1].possibleValues[0] = it;
                    break;
                  case 'moderate':
                    array[1].possibleValues[1] = it;
                    break;
                  case 'high':
                    array[1].possibleValues[2] = it;
                    break;
                }
              });
              break;
          }
        });
        console.log(array);
        setStepList(array);
      } else {
        setStepList(
          result.context.currentSteps ? result.context.currentSteps : []
        );
      }
    } else {
      if (result.context.next === 'printSPTProducts') {
        try {
          let res = await getRecommendationInfo({
            filters: result.context.filters
          });
          //跳转页面用
          sessionItemRoyal.set(
            'nutrition-recommendation-filter',
            res.context
              ? JSON.stringify({ nextPageIsReco: true, ...res.context })
              : ''
          );
          history.push('/precise-cat-nutrition-recommendation');
        } catch (err) {
          console.log(err);
          setResult('redirectToProductFinder');
          return;
        }
      }
      setResult(result.context.next);
      putDataLayer(result.context);
    }
    setDefaultValue({});
    setLoading(false);
  };

  const goBack = async () => {
    if (isMobile) toScroll('aboutPet');
    let querySteps = [...perStep];
    querySteps.splice(querySteps.length - 1, 1);

    let defaultValue = perStep[perStep.length - 1].questionParams;
    if (defaultValue.neutered === true || defaultValue.neutered === false) {
      defaultValue.neutered = String(defaultValue.neutered);
    }
    console.log(defaultValue);
    setDefaultValue(defaultValue);
    if (step > 2) {
      setLoading(true);
      let result = await getNextStep({
        finderNumber: finderNumber,
        steps: [...querySteps]
      });
      setFinderNumber(result.context.finderNumber);
      setStepList(result.context.currentSteps);
      setPerStep(result.context.steps);
      setStep(
        result.context.currentSteps &&
          result.context.currentSteps.length > 0 &&
          result.context.currentSteps[0].metadata.step
      );
      // setStep(result.context.currentSteps[0].metadata.step);
      setLoading(false);
    } else {
      getInit();
      setPerStep([]);
    }
  };

  const showResult = () => {
    switch (result) {
      case '':
        return Question;
      // break;
      case 'redirectToVet':
        return <ResultPage getInit={getInit} result="redirectToVet" />;
      // break;
      case 'redirectToProductFinder':
        return (
          <ResultPage getInit={getInit} result="redirectToProductFinder" />
        );
      // break;
      case 'printSPTProducts':
        return <Skeleton color="#f5f5f5" width="100%" height="3%" count={6} />;
      // break;
    }
  };

  const putDataLayer = (data) => {
    let filter = {};
    data.steps.forEach((item) => {
      filter = { ...filter, ...item.questionParams };
    });
    console.log(filter);
    let resultObj = {
      redirectToVet: 'Vet',
      redirectToProductFinder: 'Product Finder',
      printSPTProducts: 'Recommendation'
    };
    let sterilized = {
      true: 'Yes',
      false: 'No'
    };
    let breed = {
      mixed_breed: 'Mixed',
      unknown: 'Unknown'
    };
    window?.dataLayer?.push({
      event: 'individualizationLandingFormClick',
      result: resultObj[data.next], //value should be one the trees user journeys: 'Recommendation','Product Finder' or 'Vet'
      breed: breed[filter.breedCode]
        ? breed[filter.breedCode]
        : filter.breedCode, //All animal breeds associated with the product. Value can be 'Mixed' or 'Unknown'
      sterilized: sterilized[filter.neutered] //Value can be 'Yes' or 'No'
    });
    console.log(dataLayer);
  };
  const Question = (
    <>
      <div className="questionnaire-image-box">
        <img
          className="questionnaire-image"
          src={require('../../assets/images/preciseCatNutrition/cat.png')}
        />
        <div className="questionnaire-image-title">
          {/* TELL US ABOUT YOUR PET */}
          <FormattedMessage id="aboutPet" />
        </div>
        <div className="questionnaire-image-subTitle">
          {/* to get a precise nutritional recommendation. */}
          <FormattedMessage id="nutritionalRecommendation" />
        </div>
      </div>
      <div className="questionnaire-box" style={{ minWidth: 260 }}>
        {loading ? (
          <span className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="3%" count={6} />
          </span>
        ) : (
          <>
            <QuestionnaireForm
              ref={childRef}
              components={stepList}
              step={step}
              key={step}
              defaultValue={defaultValue}
              changeCanNext={changeCanNext}
            />
            <div className="button-box">
              <div>
                <button
                  className="rc-btn rc-btn--one question-button"
                  onClick={(e) => {
                    e.preventDefault();
                    goNext();
                  }}
                  disabled={canNext}
                >
                  <FormattedMessage id="next" />
                </button>
              </div>
              {step > 1 ? (
                <div
                  className="back-btn-box"
                  onClick={(e) => {
                    e.preventDefault();
                    goBack();
                  }}
                >
                  <span className="back-btn">
                    <FormattedMessage id="back" />
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="questionnaire-container" id="questionnaire-container">
      <div className="questionnaire-content">{showResult()}</div>
    </div>
  );
}

export default injectIntl(AboutPet);
