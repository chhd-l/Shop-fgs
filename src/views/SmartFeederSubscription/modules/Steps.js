import React from 'react';
import './steps.less';
const Steps = ({ stepsList }) => {
  return (
    <div className="smartfeeder-steps-container">
      {stepsList.map((item, index) => {
        return (
          <div className="smartfeeder-steps-item smartfeeder-steps-status-process">
            <div
              className="smartfeeder-steps-tail"
              style={{ paddingRight: '0px' }}
            >
              <em></em>
            </div>
            <div className="smartfeeder-steps-step">
              <div className="smartfeeder-steps-head">
                <div className="smartfeeder-steps-head-inner">
                  <span className="smartfeeder-steps-icon">{index + 1}</span>
                </div>
              </div>
              <div className="smartfeeder-steps-main">
                <div className="smartfeeder-steps-title">{item.title}</div>
                <div className="smartfeeder-steps-description">
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
