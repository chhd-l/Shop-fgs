import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SearchSelection from '../../../../components/SearchSelection';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';

export default function AnimalBreeds({ questionData }) {
  const [breed, setBreed] = useState('');
  const [breedLabel, setBreedLabel] = useState('');
  const Context = useContext(FormContext);

  useEffect(() => {
    if (Context.formData[questionData.name]) {
      setBreed(Context.formData[questionData.name]);
      let label = filterLabel(Context.formData[questionData.name])[0];
      if (label) {
        setBreedLabel(label.label);
      }
    } else {
      setBreed('');
      Context.changeFormData(questionData.name, '');
    }
  }, [questionData.name]);

  /**
   * 搜索选中回调
   * @param val
   */
  const handleSelectChange = (val) => {
    setBreed(val.key);
    setBreedLabel(filterLabel(val.key)[0].label);
    Context.changeFormData(questionData.name, val.key);
  };
  const toggleCheckbox = (e) => {
    e.persist();
    if (e.target.defaultValue === breed) {
      setBreed('');
      Context.changeFormData(questionData.name, '');
    } else {
      setBreed(e.target.defaultValue);
      Context.changeFormData(questionData.name, e.target.defaultValue);
    }
  };
  const filterLabel = (val) => {
    let array = questionData.possibleValues.filter((item) => {
      return item.key === val;
    });
    return array;
  };

  return (
    <>
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <Tooltips
            description={questionData.metadata.description}
            // isIdea={true}
          />
        ) : (
          ''
        )}
      </div>
      <div className="row1">
        <span className="rc-input rc-full-width">
          <FormattedMessage id="searchBreed">
            {(txt) => (
              <SearchSelection
                queryList={async ({ inputVal, pageNum }) => {
                  return questionData.possibleValues
                    .filter((el) => {
                      let inputText = inputVal && inputVal.toLocaleLowerCase();
                      let labelLower = el.label && el.label.toLocaleLowerCase();
                      return inputVal && labelLower.includes(inputText);
                    })
                    .map((ele) => ({ ...ele, name: ele.label }));
                }}
                selectedItemChange={handleSelectChange}
                defaultValue={
                  breed !== 'mixed_breed' && breed !== 'unknown'
                    ? breedLabel
                    : ''
                }
                key={breed}
                placeholder={txt}
                customStyle={true}
                isBottomPaging={false}
                prefixIcon={
                  <button
                    className="rc-input__submit rc-input__submit--search mt-1"
                    style={{ top: 0, minWidth: '3rem', height: '3rem' }}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="rc-screen-reader-text">Submit</span>
                  </button>
                }
              />
            )}
          </FormattedMessage>
        </span>
        <div className="content-section">
          {/*form-group*/}
          <div className="mt-3">
            <div className="rc-input rc-input--inline">
              <input
                id="pf-checkbox-mixbreed"
                type="checkbox"
                className="rc-input__checkbox"
                value="mixed_breed"
                key={1}
                checked={breed === 'mixed_breed'}
                onChange={toggleCheckbox}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor="pf-checkbox-mixbreed"
              >
                <FormattedMessage id="productFinder.mixBreed" />
              </label>
            </div>

            <div className="rc-input rc-input--inline">
              <input
                id="pf-checkbox-unkown"
                type="checkbox"
                className="rc-input__checkbox"
                value="unknown"
                key={2}
                checked={breed === 'unknown'}
                onChange={toggleCheckbox}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor="pf-checkbox-unkown"
              >
                <FormattedMessage id="unkown" />
                {/*Unknown*/}
              </label>
            </div>
          </div>
        </div>
        {/* 存在mix breed/unkown附加选项时，才显示 */}
        {/*{configSizeAttach && (*/}
        {/*  <div*/}
        {/*    className={`content-section ${*/}
        {/*      form && (form.key === 'mixed_breed' || form.key === 'undefined')*/}
        {/*        ? ''*/}
        {/*        : 'hidden'*/}
        {/*    }`}*/}
        {/*  >*/}
        {/*    <RadioAnswer*/}
        {/*      config={configSizeAttach}*/}
        {/*      updateFormData={this.updateSizeFormData}*/}
        {/*      // updateSaveBtnStatus={this.updateSaveBtnStatus}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </>
  );
}
