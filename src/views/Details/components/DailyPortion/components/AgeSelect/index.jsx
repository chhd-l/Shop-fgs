import React, {useState, useEffect} from 'react';
import Selection from '@/components/Selection';
import { FormattedMessage } from 'react-intl-phraseapp';


import './index.less';
const optionList = [
  {
    name: <FormattedMessage id={'year'}/>,
    value: 'year',
  },
  {
    name: <FormattedMessage id={'month'}/>,
    value: 'month',
  },
]
export default function AgeSelect(
  {
    label='How old is your pet ? ', // 表单标题
    yearValue=0,
    monthValue=0,
    ...rest
  }
){
  let {
    onChangeYear,
    onChangeMonth
  } = rest;
  let [year, setYear] = useState(0);
  let [month, setMonth] = useState(0);
  const [type, setType] = useState('month');

  useEffect(() => {
    setYear(yearValue)
  },[yearValue])

  useEffect(() => {
    setMonth(monthValue)
  },[monthValue])

  const selectedChange = (data) => {
    setType(data.value)

    switch (data.value) {
      case 'year': return onChangeMonth(0);
      case 'month': return onChangeYear(0);
      default: return;
    }
  }

  const handleSubtract = () => {

    if (type === 'year'){
      if (year === 0) return;
      onChangeYear(--year)
    }else {
      if (month === 0) return;
      onChangeMonth(--month);
    }
  }

  const handleAddition = () => {
    if (type === 'year'){
      if (year >= 25) return;
      onChangeYear(++year)
    }else {
      if (month >= 12) return;
      onChangeMonth(++month);
    }
  }

  return (
    <div className='ageSelect-wrap'>
      <div className="question-title">
        { label }
      </div>
      <div className='flex items-center'>
        <div className='flex w-1/3 btn-wrap'>
          <div className='downBtn flex-1 hover:shadow' onClick={handleSubtract}>-</div>
          <div className='flex-1'>{type === 'year' ? year : month }</div>
          <div className='addBtn flex-1 hover:shadow' onClick={handleAddition}>+</div>
        </div>
        <div className='w-2/3 '>
          <span className={`rc-select rc-full-width rc-input--full-width rc-select-processed col-6`}>
            <Selection
              optionList={optionList}
              selectedItemChange={selectedChange}
              selectedItemData={{
                value: type
              }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
