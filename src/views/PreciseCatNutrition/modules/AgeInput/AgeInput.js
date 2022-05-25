import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import Selection from '@/components/Selection';
import { FormattedMessage } from 'react-intl-phraseapp';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';

export default function InputNumber({ questionData }) {
  const [number, setNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(11);

  const [ageType, setAgeType] = useState('month');

  const Context = useContext(FormContext);
  /**
   * 当选择或者输入变动同步到formdata
   */
  useEffect(() => {
    let monthNumber = number;
    if (ageType === 'year') {
      monthNumber = monthNumber * 12;
    }
    Context.changeFormData(questionData.name, monthNumber);
  }, [number, ageType]);
  /**
   * 校验数字正确性
   * @param number
   * @returns {number}
   */
  const isCorrect = (number) => {
    let tmp = parseInt(number);
    if (isNaN(tmp) || tmp < 1) {
      tmp = 1;
    }
    if (tmp > maxNumber) {
      tmp = maxNumber;
    }
    return tmp;
  };
  /**
   * 修改数字输入框的值
   * @param e
   */
  const changeNumber = (e) => {
    setNumber(isCorrect(e.target.value));
  };
  /**
   * 点击按钮修改number的值
   * @param type 1为减 2为加
   */
  const buttonChangeNumber = (type) => {
    let nowNumber;
    if (type === 1) {
      nowNumber = number - 1;
    } else {
      nowNumber = number + 1;
    }
    setNumber(isCorrect(nowNumber));
  };
  /**
   * 下拉框选择
   * @param data
   */
  const handleSelectChange = (data) => {
    setAgeType(data.value);
    switch (data.value) {
      case 'year':
        setMaxNumber(25);
        break;
      case 'month':
        setMaxNumber(11);
        if (number > 11) setNumber(11);
        break;
      default:
    }
  };
  return (
    <div>
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <Tooltips description={questionData.metadata.description} />
        ) : (
          ''
        )}
      </div>
      <div className="d-flex">
        <div className="rc-quantity flex-center">
          <span
            className="rc-icon rc-minus--xs rc-brand1 rc-iconography rc-quantity__btn js-qty-minus"
            onClick={() => {
              buttonChangeNumber(1);
            }}
          />
          <span className="number-input-box">
            <input
              className="number-input"
              min="1"
              max="10"
              value={number}
              onChange={changeNumber}
            />
            <span className="number-input-border"></span>
          </span>
          <span
            className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
            onClick={() => {
              buttonChangeNumber(2);
            }}
          />
        </div>
        <div className="age-select">
          <Selection
            hasBorder={true}
            optionList={[
              {
                value: 'month',
                name: 'Month'
              },
              {
                value: 'year',
                name: 'Year'
              }
            ]}
            selectedItemData={{
              value: 'month'
            }}
            selectedItemChange={(data) => handleSelectChange(data)}
            placeholder="{config.placeholderList[i]}"
          />
        </div>
      </div>
    </div>
  );
}
