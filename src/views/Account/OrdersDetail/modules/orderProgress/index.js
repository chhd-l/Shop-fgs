import React from 'react';
import { formatDate } from '@/utils/utils';

const OrderProgress = ({ progressList, currentProgressIndex }) => {
  return (
    <div className="od-prg-container mx-2 md:mx-4">
      <div className="od-prg d-flex align-items-center px-3">
        {progressList.map((item, i) => (
          <>
            <span
              className={`od-prg-text position-relative ${!i ? 'ml-3' : ''} ${
                i <= currentProgressIndex ? 'compelete red' : ''
              }`}
            >
              {i <= currentProgressIndex ? (
                <img
                  className="align-middle w-6 h-6 inline-block"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/wancheng.svg`}
                  alt="icons wancheng"
                />
              ) : (
                <span className="od-prg-icon inlineblock text-white">
                  {i + 1}
                </span>
              )}
              <span className="ml-1 rc-md-up">{item.flowStateDesc}</span>
              <span className="od-prg-name position-absolute rc-md-down">
                {item.flowStateDesc}
              </span>
              <span className="od-prg-time position-absolute">
                <span className="rc-md-up">
                  {formatDate({ date: item.time1 })} {item.time2}
                </span>
                <span className="rc-md-down">
                  {formatDate({ date: item.time1 })}
                  <br />
                  {item.time2 || (
                    <span style={{ color: 'transparent' }}>&nbsp;</span>
                  )}
                </span>
              </span>
            </span>
            {i !== progressList.length - 1 ? (
              <span
                className={`od-prg-line position-relative flex-fill mx-2 ${
                  i < currentProgressIndex
                    ? 'complete'
                    : i === currentProgressIndex
                    ? 'ing'
                    : ''
                }`}
              />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
