import React, { useEffect, useState } from 'react';
import { getFrequencyDict } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types';
import { Selection } from '@/components';
import cn from 'classnames';
interface Props {
  frequencyType: SubscriptionType;
  currentFrequencyId: string;
  handleConfirm: Function;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  textClassName?: string;
  textStyle?: any;
  contentStyle?: any;
  wrapStyle?: any;
  selectionStyle?: any;
  selectionCustomInnerStyle?: any;
  childrenGridCls?: any;
  dataAutoTestid?:string;
  handleNoShowValue?:Function;
}

const FrequencyMatch = ({
  frequencyType,
  currentFrequencyId,
  dataAutoTestid,
  disabled = false,
  className = '',
  contentClassName = '',
  textClassName = '',
  childrenGridCls = ['col-span-12', 'col-span-12'],
  textStyle = {},
  contentStyle = {},
  wrapStyle = {},
  selectionStyle = {},
  selectionCustomInnerStyle = {},
  handleConfirm = () => {},
  handleNoShowValue=()=>{},
}: Props) => {
  const [frequencyList, setFrequencyList] = useState([]);
  const [handledCurrent, setHandledCurrent] = useState(false);
  // useEffect(() => {
  //   getFrequencyList()
  // }, []);

  useEffect(() => {
    if (!handledCurrent) {
      getFrequencyList();
    }
  }, [currentFrequencyId]);

  useEffect(()=>{
    const leng = frequencyList?.filter(
      (ele:any) => ele.value == currentFrequencyId
    ).length;
    console.log(leng,frequencyList,currentFrequencyId,'currentFrequencyId')
    handleNoShowValue(!Boolean(leng))
  },[frequencyList])
  const getFrequencyList = () => {
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
  };
  return (
    <div
      style={wrapStyle}
      className={cn('grid grid-cols-12 items-center', className)}
    >
      <span
        style={textStyle}
        className={cn('frequency-delivery', childrenGridCls[0], textClassName)}
      >
        <FormattedMessage id="subscription.frequencyDelivery" />
      </span>
      <div
        className={cn(
          'delivery-every flex items-center',
          childrenGridCls[1],
          contentClassName
        )}
        style={contentStyle}
      >
        <FormattedMessage id="subscription.deliveryEvery" />
        <Selection
          disabled={disabled}
          dataAutoTestid={dataAutoTestid}
          customContainerStyle={{
            flex: 1,
            marginLeft: '.3rem',
            ...selectionStyle
          }}
          customInnerStyle={selectionCustomInnerStyle}
          customCls="text-left frequency-selection"
          selectedItemChange={(data: any) => {
            setHandledCurrent(true);
            handleConfirm(data);
          }}
          optionList={frequencyList}
          wider={true}
          selectedItemData={{
            value: currentFrequencyId
          }}
          key={currentFrequencyId}
        />
      </div>
    </div>
  );
};
export default FrequencyMatch;
