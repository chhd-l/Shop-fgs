import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '@/components/Modal';

import veterinaryImg from '@/assets/images/veterinary.png';
import veterinaryProductImg from '@/assets/images/veterinary_product.png';

const RadioAnswer = (props) => {
  const [sickModalVisible, setSickModalVisible] = useState(true);
  const [form, setFormData] = useState('');
  // setInterval(() => {
  //   if (progress < 101) {
  //     setProgress((c) => c + 1);
  //   }
  // }, 3000);

  function handleRadioChange(item, idx) {
    if (item.includes('health problems')) {
      setSickModalVisible(true);
    }
    setFormData(idx + '');
  }

  useEffect(() => {
    props.updateFromData(form);
  }, [form, props]);

  return (
    <>
      <h4 className="mb-4 red">{props.config.title}</h4>
      {props.config.list.map((ele, i) => (
        <div
          key={i}
          className="rc-input rc-margin-y--xs rc-input--full-width ml-2"
        >
          <input
            className="rc-input__radio"
            id={`pro-finder-answer-${i}`}
            type="radio"
            name="buyWay"
            value={i}
            onChange={(event) => handleRadioChange(ele, i)}
            checked={ele.selected}
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`pro-finder-answer-${i}`}
          >
            {ele}
          </label>
        </div>
      ))}
      <Modal
        footerVisible={false}
        visible={sickModalVisible}
        modalTitle={''}
        modalText={
          <div className="row ml-3 mr-3">
            <div className="col-12 col-md-6">
              <h2 className="rc-beta markup-text">
                <FormattedMessage id="productFinder.healthTitle" />
              </h2>
              <p>
                <FormattedMessage id="productFinder.healthTip1" />
              </p>
              <p>
                <FormattedMessage id="productFinder.healthTip2" />
              </p>
              <div className="rc-btn-group mb-3">
                <button className="rc-btn rc-btn--one">
                  <FormattedMessage id="learnMore" />
                </button>
                <button className="rc-btn rc-btn--two">
                  <FormattedMessage id="contactUs" />
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img
                src={veterinaryImg}
                className="rc-md-up"
                style={{ width: '20%', margin: '0 auto' }}
                alt=""
              />
              <img
                className="mt-3 rc-full-width"
                src={veterinaryProductImg}
                alt=""
              />
            </div>
          </div>
        }
        close={() => {
          setSickModalVisible(false);
        }}
        hanldeClickConfirm={() => {
          setSickModalVisible(false);
        }}
      />
    </>
  );
};

export default RadioAnswer;
