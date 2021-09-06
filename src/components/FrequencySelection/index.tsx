import React, { useEffect, useState } from 'react';
import {
  getFrequencyDict,
  matchNamefromDict,
  getDeviceType
} from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types.ts';
import Selection from '@/components/Selection/index.js';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

interface Props {
  frequencyType: SubscriptionType
  currentFrequencyId: string
  handleConfirm: Function,
  disabled: Boolean,
  className: string,
  textStyle?:any,
  wrapStyle?:any,
  selectionStyle?:any
}

const FrequencyMatch = ({ frequencyType, currentFrequencyId,disabled=false,className='',textStyle={},wrapStyle={},selectionStyle={}, handleConfirm = () => {} }: Props) => {
  const [frequencyList, setFrequencyList] = useState([]);
  const [handledCurrent, setHandledCurrent] = useState(false)
  // useEffect(() => {
  //   getFrequencyList()
  // }, []);

  useEffect(()=>{
    if(!handledCurrent){
      getFrequencyList()
    }
  },[currentFrequencyId])
  const getFrequencyList =  ()=>{
    getFrequencyDict(currentFrequencyId).then((res: any) => {
      let frequencyList = res
        .filter(
          (el: any) =>
            el.goodsInfoFlag === SubScriptionStatusNumber[frequencyType]
        )
        .map((ele: any) => {
          delete ele.value;
          return {
            value: ele.id,
            ...ele
          };
        });
      setFrequencyList(frequencyList);
    });
  }
  return (
    <div style={wrapStyle} className={`freqency order-3 order-md-2 col-12 col-md-4 text-center ${className} nowrap`}>
      <span style={textStyle}>
        <FormattedMessage id="subscription.frequency" />
      </span>
      <Selection
        disabled={disabled}
        customContainerStyle={{
          display: 'inline-block',
          marginLeft: isMobile ? '50px' : '1.5rem',
          height: isMobile ? '70px' : 'auto',
          ...selectionStyle
        }}
        customCls="text-left"
        selectedItemChange={(data: any) => {
          setHandledCurrent(true)
          handleConfirm(data)
        }}
        optionList={frequencyList}
        wider={true}
        selectedItemData={{
          value: currentFrequencyId
        }}
        key={currentFrequencyId}
      />
    </div>
  );
};
export default FrequencyMatch;
