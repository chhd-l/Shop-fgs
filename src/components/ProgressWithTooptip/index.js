import React from 'react';

const ProgressWithTooptip = (props) => {
  
  return (
    <div
      className="rc-progress rc-progress--a noUi-target noUi-ltr noUi-horizontal ml-0 mr-0"
      style={{ ...props.style }}
      id="animated-progress-bar"
      // data-js-progress=""
      data-js-min="0"
      data-js-max="100"
      data-js-value="0"
      data-js-step="1"
      data-js-tooltip="true"
      data-js-labels='{"0":"0","50":"50","100":"100"}'
      data-progress-setup="true"
    >
      <input type="text" id="slider-result" style={{ display: 'none' }} />
      <div className="noUi-base">
        <div className="noUi-connects">
          <div
            className="noUi-connect"
            style={{
              backgroundColor: '#e2001a',
              transform: `translate(0%, 0px) scale(${props.value / 100}, 1)`
            }}
          />
        </div>
        <div
          className="noUi-origin"
          style={{
            transform: `translate(-${100 - props.value}%, 0px)`,
            zIndex: 4
          }}
        >
          <div
            className="noUi-handle noUi-handle-lower"
            data-handle="0"
            tabindex="0"
            role="slider"
            aria-orientation="horizontal"
            aria-valuemin="0.0"
            aria-valuemax="100.0"
            aria-valuenow="10.0"
            aria-valuetext={`${props.value}%`}
          >
            <div className="noUi-tooltip">{props.value}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWithTooptip;
