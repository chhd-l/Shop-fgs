import React, { useEffect, useState } from 'react';
import { getFrequencyDict } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types';
import Selection from '@/components/Selection/index.js';
import cn from 'classnames';
interface Props {
  frequencyType: SubscriptionType;
  currentFrequencyId: string;
  handleConfirm: Function;
  disabled?: boolean;
  className?: string;
  textStyle?: any;
  wrapStyle?: any;
  selectionStyle?: any;
}

const FrequencyMatch = ({
  frequencyType,
  currentFrequencyId,
  disabled = false,
  className = '',
  textStyle = {},
  wrapStyle = {},
  selectionStyle = {},
  handleConfirm = () => {}
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
      className={cn(
        'freqency order-3 md:order-2 col-12 col-md-4 text-center nowrap px-0 justify-between flex-wrap flex items-center',
        className
      )}
    >
      <span style={textStyle} className="frequency-delivery">
        <FormattedMessage id="subscription.frequencyDelivery" />
      </span>
      <div className="text-right delivery-every">
        <FormattedMessage id="subscription.deliveryEvery" />
        <Selection
          disabled={disabled}
          customContainerStyle={{
            display: 'inline-block',
            marginLeft: '0.5rem',
            ...selectionStyle
          }}
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
