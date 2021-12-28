import React, { useState, useEffect } from 'react';
import SearchSelection from '@/components/SearchSelection';
import { FormattedMessage } from 'react-intl-phraseapp';
import classNames from 'classnames';

export default function BreedSelect(
  {
    label='Breed', // 表单标题
    options= [],
    value={}, // BreedSelect的已选择的值,
    mixedBreedValue=false,
    isBreedDisabled=false, // 是否禁止选择breed
    isPreselected= false, // 是否是预选产品
    ...rest
  }
  ){
  let {
    onChange
  } = rest;
  const [inputValue, setInputValue] = useState(value?.name ?? undefined)
  const [checked, setChecked] = useState(mixedBreedValue);

  useEffect(() => {
    const defaultValue = options.find((item) => item.breedCode === value.key)
    setInputValue(defaultValue ? defaultValue.localName : undefined)
  }, [value])
  useEffect(()=>{
    setChecked(mixedBreedValue)
  }, [mixedBreedValue])


  const handleSelectChange = (val) => {
    onChange && onChange(val, false)
  }

  const handleSelectMixedBreedChange = (e) => {
    let bool = e.target.checked;
    setChecked(bool)
    if (bool){
      onChange && onChange(undefined, true)
    }else {
      const defaultValue = options.find((item) => item.localName === value.name)
      onChange && onChange(defaultValue, false)
    }
  }

  return (
    <div>
      <div className="question-title">
        { label }
      </div>
      <div>
        <span className="rc-input rc-full-width">
          <FormattedMessage id="searchBreed">
            {(placeholder) => (
              <SearchSelection
                disabled={checked || isPreselected}
                queryList={async ({ inputVal }) => {
                  let reg = new RegExp(`${inputVal}`, 'i')
                  return options
                    .filter((item) => reg.test(item.localName))
                    .map((item) => ({
                      key: item.breedCode,
                      name: item.localName,
                    }))
                }}
                selectedItemChange={handleSelectChange}
                defaultValue={inputValue}
                placeholder={placeholder}
                customStyle={true}
                isBottomPaging={false}
              />
            )}
          </FormattedMessage>
        </span>
        <div className={classNames("content-section", {
          'hidden': isPreselected
        })}>
          {/*form-group*/}
          <div className="mt-3">
            <div className="rc-input rc-input--inline">
              <input
                id="pf-checkbox-mixbreed"
                type="checkbox"
                className="rc-input__checkbox"
                // value="mixed_breed"
                checked={checked}
                onChange={handleSelectMixedBreedChange}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor="pf-checkbox-mixbreed"
              >
                <FormattedMessage id="dailyPortion.breed.UnknownMixedBreed" />
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


