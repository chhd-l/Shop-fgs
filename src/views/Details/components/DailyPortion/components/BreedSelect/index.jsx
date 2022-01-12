import React, { useState, useEffect } from 'react';
import SearchSelection from '@/components/SearchSelection';
import Selection from '@/components/Selection';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

export default function BreedSelect(
  {
    defaultValue='', // breed的默认值
    isMixedBreedPossibleValues=false,
    label='Breed', // 表单标题
    options= [],
    mixedBreedPossibleOptions=[],
    value={}, // BreedSelect的已选择的值,
    mixedBreedPossibleValue={}, // mixedBreedPossibleValue的值
    mixedBreedValue=false,
    isBreedDisabled=false, // 是否禁止选择breed
    isPreselected= false, // 是否是预选产品
    ...rest
  }
  ){
  const intl = useIntl();
  let {
    onChangeMixedBreedPossible,
    onChange
  } = rest;
  const [inputValue, setInputValue] = useState(value?.name ?? '')
  const [inputMixedBreedPossibleValue, setInputMixedBreedPossibleValue] = useState(mixedBreedPossibleValue?.value ?? undefined)

  const [checked, setChecked] = useState(mixedBreedValue);

  const [isHiddenWaring, setHiddenWaring] = useState(true);

  useEffect(() => {
    const defaultValue = options.find((item) => item.breedCode === value?.key)
    setInputValue(defaultValue ? defaultValue?.localName : '')
  }, [value])

  useEffect(() =>{
    const defaultValue = mixedBreedPossibleOptions.find((item) => item.value === mixedBreedPossibleValue?.value)
    setInputMixedBreedPossibleValue(defaultValue ? defaultValue?.value : undefined)

  }, [mixedBreedPossibleValue])

  useEffect(()=>{
    setChecked(mixedBreedValue)
  }, [mixedBreedValue])


  const handleSelectChange = (val) => {
    onChange && onChange(val, false)
    // 当用户选的那个Breed，跟这个产品本身所针对的Breed不匹配的时候，显示提示语
    if (!!defaultValue){
      const value = options.find((item) => item.breedCode === val?.key)
      setHiddenWaring(value?.nameInEnglish?.toLocaleUpperCase() === defaultValue?.toLocaleUpperCase())
    }
  }

  const handleSelectMixedBreedPossible = (val) => {
    onChangeMixedBreedPossible && onChangeMixedBreedPossible(val)
  }

  const handleSelectMixedBreedChange = (e) => {
    let bool = e.target.checked;
    setChecked(bool)
    if (bool){
      onChange && onChange(undefined, true)
      setHiddenWaring(true)
    }else {
      const defaultValue = options.find((item) => item.localName === value?.name)
      onChange && onChange(defaultValue, false)
      if (isMixedBreedPossibleValues){
        onChangeMixedBreedPossible({});
      }
    }
  }

  return (
    <div>
      <div className="question-title">
        { label }
      </div>
      <div>
        <span className="rc-input rc-full-width">
          {
            isMixedBreedPossibleValues
              ? (
                <div className='flex items-center'>
                  <span className={'red pr-2'}>*</span>
                  <FormattedMessage id={'dailyPortion.breed.searchBreedSize'}>
                    {(placeholder) => (
                      <Selection
                        optionList={mixedBreedPossibleOptions}
                        selectedItemChange={handleSelectMixedBreedPossible}
                        selectedItemData={{
                          value: inputMixedBreedPossibleValue
                        }}
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
            )
              : (
                <div>
                  <FormattedMessage id={'searchBreed'}>
                    {(placeholder) => (
                      <SearchSelection
                        disabled={checked}
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
                  <p className={classNames('', {
                    'hidden': isHiddenWaring
                  })}>
                    <i className="iconfont iconinfo"/>
                    <span className='text-sm lg:text-base'>{intl.formatMessage({id: 'dailyPortion.breed.waring'})}</span>
                  </p>
                </div>

              )
          }
        </span>
        <div className={classNames("content-section")}>
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


