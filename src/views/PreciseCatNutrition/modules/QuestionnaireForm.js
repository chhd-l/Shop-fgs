import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect
} from 'react';
import './questionnaire.less';
import TextFiled from './TextFiled';
import RadioButton from './RadioButton/RadioButton';
import LifeStyle from './lifeStyle';
import AnimalBreeds from './AnimalBreeds/AnimalBreeds';
import QuestionnaireRadio from './QuestionnaireRadio';
import AgeSelect from './AgeSelect/AgeSelect';
import RadioGroup from './radioGroup';
import { FormattedMessage } from 'react-intl-phraseapp';
export const FormContext = React.createContext({});
function QuestionnaireForm(
  { components, changeCanNext, step, defaultValue },
  ref
) {
  const [formData, setFormData] = useState({ ...defaultValue });
  const [perStep, setPerStep] = useState(1); //上一步
  useImperativeHandle(ref, () => ({
    formData
  }));
  const handleQuestionConfigLogic = ({
    metadataQuestionDisplayType,
    defaultListData
  }) => {
    let tmpList = defaultListData;
    let tmpPlaceHolderList = [];
    switch (metadataQuestionDisplayType) {
      case 'ageSelect':
        tmpList = [
          Array.from({ length: 26 }).map((item, i) => {
            return {
              label: <FormattedMessage id="xYears" values={{ val: i }} />,
              key: (12 * i).toString()
            };
          }),
          Array.from({ length: 12 }).map((item, i) => {
            return {
              label: <FormattedMessage id="xMonths" values={{ val: i }} />,
              key: i.toString()
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
              key: i + 1
            };
          })
        ];
        tmpPlaceHolderList = [<FormattedMessage id="productFinder.weight" />];
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
  };

  const FormItem = (list) => {
    return list.map((item) => {
      switch (item.metadata.questionDisplayType) {
        case 'freeTextSkippable':
          return <TextFiled questionData={item} key={item.metadata.name} />;
        case 'weightSelect':
          return (
            <AgeSelect
              config={{
                list: handleQuestionConfigLogic({
                  metadataQuestionDisplayType: 'weightSelect',
                  defaultListData: []
                }).questionList,
                placeholderList: handleQuestionConfigLogic({
                  metadataQuestionDisplayType: 'weightSelect',
                  defaultListData: []
                }).holderList
              }}
              questionData={item}
            />
          );
        case 'singleSelect':
          if (item.name === 'lifestyle') {
            return <LifeStyle questionData={item} key={item.metadata.name} />;
          } else if (item.name === 'hairLength') {
            return <RadioGroup questionData={item} key={item.metadata.name} />;
          } else {
            return <RadioButton questionData={item} key={item.metadata.name} />;
          }
        case 'ageSelect':
          // return <AgeInput questionData={item} key={item.metadata.name}/>;
          return (
            <AgeSelect
              config={{
                list: handleQuestionConfigLogic({
                  metadataQuestionDisplayType: 'ageSelect',
                  defaultListData: []
                }).questionList,
                placeholderList: handleQuestionConfigLogic({
                  metadataQuestionDisplayType: 'ageSelect',
                  defaultListData: []
                }).holderList
              }}
              questionData={item}
            />
          );
        case 'breedSelect':
          return <AnimalBreeds questionData={item} key={item.metadata.name} />;
        case 'bcsSelect':
          return (
            <QuestionnaireRadio questionData={item} key={item.metadata.name} />
          );
        default:
          console.log('do nothing');
      }
    });
  };
  /**
   * 点击下一步，重置formData的值
   */
  useEffect(() => {
    setPerStep(step);
  }, [step]);

  /**
   * 当form组件下的子组件 值改变 修改formData,并判断是否可以进入下一步
   * @param id
   * @param data
   */
  const changeFormData = (id, data) => {
    formData[id] = data;
    let canGoNext = false;
    for (let k in formData) {
      if (!formData[k]) canGoNext = true;
    }
    changeCanNext(canGoNext);
    setFormData(formData);
  };
  return (
    <FormContext.Provider
      value={{
        changeFormData: changeFormData,
        formData
      }}
    >
      <div className="questionnaire-form">
        <form>
          <div className="questionnaire-form-content">
            {FormItem(components).map((item, index) => (
              <div className="questionnaire-form-item" key={index}>
                {item}
              </div>
            ))}
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
}
export default forwardRef(QuestionnaireForm);
