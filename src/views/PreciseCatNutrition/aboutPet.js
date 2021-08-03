import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import QuestionnaireForm from './modules/QuestionnaireForm';
import { getAllStep, getNextStep } from './api';

import Veterinarian from './modules/Veterinarian/Veterinarian';
import Fgs from './modules/Veterinarian/fgs';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';

export default function AboutPet() {
  const childRef = useRef();

  const [stepList, setStepList] = useState([]); //当前题库
  const [step, setStep] = useState(1); //当前步骤

  const [perStep, setPerStep] = useState([]); //保存上一步输入的值，点击back时使用
  const [defaultValue, setDefaultValue] = useState({}); //表单默认值

  const [steps, setSteps] = useState([]); //所有步骤请求集合

  const [result, setResult] = useState(''); //返回结果判断去到那个页面
  const [canNext, setCanNext] = useState(true); //是否可以点击下一步

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInit();
  }, []);

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
    setStep(result.context.steps[0].metadata.step);
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

  const goNext = async () => {
    setLoading(true);

    let querySteps = [
      ...steps,
      {
        stepNum: step,
        questionParams: {
          ...childRef.current.formData
        }
      }
    ];
    let result = await getNextStep({
      finderNumber: '',
      steps: querySteps
    });
    setSteps(querySteps);
    setPerStep(result.context.steps);
    setStep(result.context.currentStep.metadata.step);
    if (!result.context.isEndOfTree) {
      setStepList([result.context.currentStep]);
    } else {
      setResult(result.context.next);
    }
    setDefaultValue({});
    setLoading(false);
  };

  const goBack = async () => {
    setLoading(true);
    let querySteps = [...steps];
    console.log(step);
    steps.forEach((item, index) => {
      if (item.stepNum === step) {
        querySteps.splice(index, 1);
      }
    });
    if (step > 2) {
      let result = await getNextStep({
        finderNumber: '',
        steps: [...querySteps]
      });
      setStepList([result.context.currentStep]);
      setStep(result.context.currentStep.metadata.step);
    } else {
      getInit();
      setStep(1);
    }
    setDefaultValue(perStep[0].questionParams);
    setLoading(false);
  };
  const showResult = () => {
    switch (result) {
      case '':
        return Question;
        break;
      case 'redirectToVet':
        return <Veterinarian getInit={getInit} />;
        break;
      case 'redirectToProductFinder':
        return <Fgs getInit={getInit} />;
        break;
    }
  };

  const Question = (
    <>
      <div className="questionnaire-image-box">
        <img
          className="questionnaire-image"
          src={require('../../assets/images/preciseCatNutrition/cat.png')}
        />
        <div className="questionnaire-image-title">TELL US ABOUT YOUR PET</div>
        <div className="questionnaire-image-subTitle">
          to get a precise nutritional recommendation.
        </div>
      </div>
      <div style={{ minWidth: 320 }}>
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
            <div style={{ textAlign: 'center' }}>
              <button
                className="rc-btn rc-btn--one question-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  goNext();
                }}
                disabled={canNext}
              >
                Next
              </button>
            </div>
            {step > 1 ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  goBack(step);
                }}
              >
                <span>Back</span>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content">{showResult()}</div>
    </div>
  );
}
