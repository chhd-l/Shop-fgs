import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { handleEmailShow } from '@/utils/utils';
import { getBanks } from '@/api/payment';
import './index.less';

const Ideal = ({ billingJSX, updateBank }) => {
  const [bank, setBank] = useState('');
  const [bankList, setBankList] = useState([]);
  const [errFlag, setErrFlag] = useState(false);
  const [clickFlag, setClickFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    getBankList();
  }, []);

  const getBankList = () => {
    getBanks({
      allowedPaymentMethods: ['ideal'],
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      storeId: 123457929,
      idealFlag: true
    })
      .then((res) => {
        const items = res?.context?.paymentMethods.filter(
          (item) => item.name == 'iDEAL'
        )[0].details[0].items;
        // console.log('res', res);
        if (!currentItem) {
          setCurrentItem(items[0].name);
          updateBank(`${items[0].id}`);
        }
        setBankList(items);
        setTempbankList(items);
      })
      .catch((err) => {});
  };

  // const handleChange = (e) => {
  //   let val = e.target.value;
  //   setBank(val);
  //   updateBank(val);
  // };
  const ChioceBank = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.nodeName === 'UL') {
    } else {
      if (clickFlag) {
        setBank(`${e.target?.dataset?.id}`);
        updateBank(`${e.target?.dataset?.id}`);
        // const arr = bankList.filter(item => item.id !== e.target?.dataset?.id)
        const obj = bankList.filter(
          (item) => item.id === e.target?.dataset?.id
        )[0];
        // arr.unshift(obj)
        // setBankList(arr)
        setCurrentItem(obj.name);
        setClickFlag(false);
      } else {
        setClickFlag(true);
      }
    }
    console.log('e', { a: e.target });
    console.log(e.target?.dataset?.id);
  };

  return (
    <>
      <div id="ideal-container" className="ideal-container">
        <div className="text-lg text-gray-500 font-medium mb-4 mt-6">
          Choose Your preferred bank
        </div>
        <div style={{ position: 'relative' }}>
          <div
            className={`w-2/3 border-b-2 pt-2 pb-4 mb-4 border-gray-500 currentItem ${
              errFlag ? 'redcolor' : ''
            }`}
            onClick={() => {
              if (bankList.length > 0) {
                setClickFlag(!clickFlag);
                setCurrentItem('');
                setErrFlag(false);
              } else {
                setCurrentItem('NO Data');
                setErrFlag(true);
              }
            }}
          >
            {currentItem}
          </div>
          <ul
            className={`w-2/3 border-b-2 pt-2 pb-4 mb-4 ${
              clickFlag ? 'block' : 'hidden'
            }`}
            style={{
              position: 'absolute',
              top: '2.9rem',
              left: '0rem',
              zIndex: '999',
              height: clickFlag ? '24rem' : '3rem',
              overflowY: clickFlag ? 'auto' : 'hidden',
              border: clickFlag ? '1px solid #f1f1f1' : '',
              backgroundColor: '#fff'
            }}
            // onClick={ChioceBank}
          >
            {bankList.length > 0 &&
              bankList.map((item) => (
                <li
                  key={item.id}
                  data-id={item.id}
                  className="h-12 hover:bg-gray-100"
                  style={{
                    lineHeight: '2.5rem',
                    backgroundColor: '#fff',
                    paddingLeft: '0.5rem'
                  }}
                  onClick={ChioceBank}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>

        {/* <select
          className="w-2/3 border-b-2 pt-2 pb-4 mb-4 border-gray-500"
          name="bank"
          value={bank}
          onChange={handleChange}
        >
          {bankList.length > 0 &&
            bankList.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>

            ))}
        </select> */}
        <br />
        {/* <FormattedMessage id="swish.bref" /> */}
      </div>
      {billingJSX}
    </>
  );
};

export default Ideal;
