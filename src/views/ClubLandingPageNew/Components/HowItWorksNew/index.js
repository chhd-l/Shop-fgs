import React from 'react';
import Rectangleone from './Rectangleone@4x.png';

const HowItWorksNew = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div>NIhaoya</div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <img src={Rectangleone}></img>
              </div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksNew;
