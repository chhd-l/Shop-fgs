import React from 'react';
import './steps.less';
const Steps = ({ stepsList }) => {
  return (
    <div className="smartfeeder-steps-container">
      {stepsList.map((item, index) => {
        return (
            <div class="smartfeeder-steps-item smartfeeder-steps-status-process">
              <div
                class="smartfeeder-steps-tail"
                style={{ paddingRight: '0px' }}
              >
                <i></i>
              </div>
              <div class="smartfeeder-steps-step">
                <div class="smartfeeder-steps-head">
                  <div class="smartfeeder-steps-head-inner">
                    <span class="smartfeeder-steps-icon">{index + 1}</span>
                  </div>
                </div>
                <div class="smartfeeder-steps-main">
                  <div class="smartfeeder-steps-title">{item.title}</div>
                  <div class="smartfeeder-steps-description">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
        );
      })}
    </div>
  );
};
export default Steps;
