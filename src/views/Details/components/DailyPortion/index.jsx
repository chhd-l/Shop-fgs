import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BreedSelect from './components/BreedSelect';
import DailyPortion_icon from '@/assets/images/salesCategory_cat.png';

import './index.less';

/**
 * questionDisplayType / name
 *
 * singleSelect: genderCode petActivityCode
 * date: age 没有下拉值 year 0-25， month 0-11
 * breed: breedCode
 * radio: neutered
 * weightSelect: weight 没有下拉值 1-49
 * bcsSelect: bcs
 **/
export default function DailyPortion({
  isShow = true, // 是否展示计算工具
  isCalculateDisabled = false, // calculate 按钮是否禁止点击
  isBreedDisabled = false, // Breed问题是否禁止选择
  ...rest
}){

  if (!isShow) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShowQuestion, setShowQuestion] = useState(false)
  const [breedData, setBreedData] = useState({});
  const [isMixedBreed, setMixedBreed] = useState(false)
  const handleBreedData = (data, isMixedBreed=false) => {
    setBreedData(data)
    setMixedBreed(!!isMixedBreed)
  }

  const showQuestion = () => {
    setShowQuestion(true)
  }

  return (
    <div className='DailyPortion-wrap container '>
      <div className='lg:flex'>
        <div className='w-full lg:w-1/5 p-4'>
          <LazyLoad>
            <img src={DailyPortion_icon} alt={'Daily Portion'}/>
          </LazyLoad>
        </div>
        <div className='w-full lg:w-4/5 p-4'>
          <p className='py-8'>
            <FormattedMessage id='dailyPortion.title'/>
          </p>
          <div className='flex justify-center lg:justify-start'>
            <button
              disabled={isCalculateDisabled}
              onClick={showQuestion}
              className={classNames(
                'rc-btn rc-btn--one rc-margin-right--xs--mobile',
                {'rc-btn-solid-disabled': isCalculateDisabled},
                {
                  'invisible': isShowQuestion
                }
              )}
            >
              <FormattedMessage id='dailyPortion.calculatePortion'/>
            </button>
          </div>

        </div>
      </div>
      <main className={classNames(
        'w-full p-4',
        {
          'hidden': !isShowQuestion
        }
      )}>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-1/3'>
            <BreedSelect
              value={breedData}
              onChange={handleBreedData}
            />
          </div>
          <div className='w-full lg:w-1/3'>

          </div>
          <div className='w-full lg:w-1/3'>

          </div>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-1/3'>

          </div>
          <div className='w-full lg:w-1/3'>

          </div>
          <div className='w-full lg:w-1/3'>

          </div>
        </div>
      </main>
    </div>
  )
}
