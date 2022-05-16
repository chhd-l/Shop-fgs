import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';
import { Point } from '@/views/Payment/Point';

const convenienceStoreList = [
  {
    label: <FormattedMessage id="Lawson" />,
    value: 'Lawson'
  },
  {
    label: <FormattedMessage id="Seven-Eleven" />,
    value: 'Seven-Eleven'
  },
  {
    label: <FormattedMessage id="Family Mart" />,
    value: 'Family Mart'
  },
  {
    label: <FormattedMessage id="Seiko Mart" />,
    value: 'Seiko Mart'
  },
  {
    label: <FormattedMessage id="Ministop" />,
    value: 'Ministop'
  }
];

const ConvenienceStore = ({ convenienceStoreChange, supportPoint = false }) => {
  const [checkedBox, setCheckBox] = React.useState('');

  const conStoreChange = (e, value) => {
    setCheckBox(value);
    convenienceStoreChange && convenienceStoreChange(value);
  };

  return (
    <>
      <div id="convenience-store-container">
        <p>
          <FormattedMessage id="convenienceStore.tip1" />
        </p>
        <p>
          <FormattedMessage id="convenienceStore.tip2" />
        </p>
        <div className="flex flex-row flex-wrap my-4">
          {convenienceStoreList.map((item, index) => (
            <div
              className="w-full md:w-1/2 rc-input rc-input--inline mr-0 mt-2"
              key={index}
            >
              <input
                className="rc-input__checkbox ui-cursor-pointer-pure"
                id={`id-convenience-store-${index}`}
                onChange={(e) => conStoreChange(e, item.value)}
                type="checkbox"
                checked={item.value === checkedBox}
                name="checkedBox"
              />
              <label
                className="rc-input__label--inline text-lg convenience-store-checkbox text-break"
                htmlFor={`id-convenience-store-${index}`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <p>
          <FormattedMessage
            id="convenienceStore.tip3"
            values={{
              val: (
                <a
                  target="_blank"
                  href="/faq"
                  className="cursor-pointer inline-block rc-styled-link border-b border-black hover:border-rc-red"
                >
                  <FormattedMessage id="here2" />
                </a>
              )
            }}
          />
        </p>
        {supportPoint && <Point />}
      </div>
    </>
  );
};

export default ConvenienceStore;
