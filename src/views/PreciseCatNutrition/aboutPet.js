import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';
import QuestionnaireForm from './modules/QuestionnaireForm';
import { getAllStep, getNextStep } from './api';

import Veterinarian from './modules/Veterinarian/Veterinarian';
import Fgs from './modules/Veterinarian/fgs';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';

const sessionItemRoyal = window.__.sessionItemRoyal;

export default function AboutPet() {
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
      ...perStep,
      {
        stepNum: step.toString(),
        questionParams: {
          ...childRef.current.formData
        }
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
        result.context.currentSteps[0].metadata.step
    );

    if (!result.context.isEndOfTree) {
      setStepList(
        result.context.currentSteps ? result.context.currentSteps : []
      );
    } else {
      if (result.context.next === 'printSPTProducts') {
        //跳转页面用
        sessionItemRoyal.set(
          'nutrition-recommendation-filter',
          result.context.filter
        );
      }
      setResult(result.context.next);
      putDataLayer(result.context);
    }
    setDefaultValue({});
    setLoading(false);
  };

  const goBack = async () => {
    setLoading(true);
    let querySteps = [...perStep];
    perStep.forEach((item, index) => {
      if (item.stepNum == step - 1) {
        querySteps.splice(index, 1);
      }
    });
    setDefaultValue(perStep[perStep.length - 1].questionParams);
    if (step > 2) {
      let result = await getNextStep({
        finderNumber: finderNumber,
        steps: [...querySteps]
      });
      setFinderNumber(result.context.finderNumber);
      setStepList(result.context.currentSteps);
      setPerStep(result.context.steps);
      setStep(result.context.currentSteps[0].metadata.step);
    } else {
      getInit();
      setPerStep([]);
    }

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
      case 'printSPTProducts':
        history.push('/precise-cat-nutrition-recommendation');
        return <Skeleton color="#f5f5f5" width="100%" height="3%" count={6} />;
        break;
    }
  };

  const putDataLayer = (data) => {
    let filter = {};
    data.steps.forEach((item) => {
      filter = { ...filter, ...item.questionParams };
    });
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
    dataLayer.push({
      event: 'individualizationLandingFormClick',
      result: resultObj[data.next], //value should be one the trees user journeys: 'Recommendation','Product Finder' or 'Vet'
      breed: breed[filter.breed] ? breed[filter.breed] : filter.breed, //All animal breeds associated with the product. Value can be 'Mixed' or 'Unknown'
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
                style={{ textAlign: 'center', marginTop: '20px' }}
                onClick={(e) => {
                  e.preventDefault();
                  goBack(step);
                }}
              >
                <span className="back-btn">Back</span>
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
