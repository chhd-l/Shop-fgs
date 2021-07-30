import React, { useEffect, useState } from 'react';
import './index.less';
import QuestionnaireForm from './modules/QuestionnaireForm';
import RadioButton from './modules/RadioButton/RadioButton';
import TextFiled from './modules/TextFiled';
import AgeInput from './modules/AgeInput/AgeInput';
import AnimalBreeds from './modules/AnimalBreeds/AnimalBreeds';
import { indexList, stepList1, stepList2 } from './json';
import QuestionnaireRadio from './modules/QuestionnaireRadio';
import { getAllStep } from './api';

import Veterinarian from './modules/Veterinarian/Veterinarian';

export default function PreciseCatNutrition() {
  const [stepList, setStepList] = useState([]);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(0);
  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await getAllStep();
    // };
    // fetchData();
    setStepList(FormItem(indexList));
  }, []);

  const FormItem = (list) => {
    return list.map((item) => {
      switch (item.metadata.questionDisplayType) {
        case 'freeTextSkippable':
          return <TextFiled questionData={item} />;
          break;
        case 'singleSelect':
          return <RadioButton questionData={item} />;
          break;
        case 'ageSelect':
          return <AgeInput questionData={item} />;
          break;
        case 'breedSelect':
          return <AnimalBreeds questionData={item} />;
          break;
        case 'bcsSelect':
          return <QuestionnaireRadio questionData={item} />;
          break;
        default:
          console.log('do nothing');
      }
    });
  };

  const getNext = (stepNumber) => {
    setStep(stepNumber);
    switch (stepNumber) {
      case 1:
        setStepList(FormItem(indexList));
        break;
      case 2:
        setStepList(FormItem(stepList1));
        break;
      case 3:
        setStepList(FormItem(stepList2));
        break;
      case 4:
        setResult(1);
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
      <div>
        <QuestionnaireForm components={stepList} />
        <div style={{ textAlign: 'center' }}>
          <button
            className="rc-btn rc-btn--one question-button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              getNext(step + 1);
            }}
          >
            Next
          </button>
        </div>
        {step > 1 ? (
          <div
            style={{ textAlign: 'center', marginTop: 20, cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              getNext(step - 1);
            }}
          >
            <span>Back</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );

  const showResult = () => {
    switch (result) {
      case 0:
        return Question;
        break;
      case 1:
        return <Veterinarian />;
        break;
    }
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content">{showResult()}</div>
    </div>
  );
}
