import React from 'react';
import { FormattedMessage } from 'react-intl';
import Logo from '../../../../components/Logo';

const GetMoreAd = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
              <div>
                <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                  <FormattedMessage id="club.subscription.titile" />
                </h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    height: '60vh',
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #DCDCDE',
                    marginTop: '10vh'
                  }}
                >
                  <div
                    style={{
                      height: '30vh',
                      marginLeft: '5vh',
                      marginTop: '10vh'
                    }}
                  >
                    <Logo />
                  </div>
                  <div style={{ height: '30vh' }}></div>
                </div>
                <div
                  style={{
                    height: '80vh',
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #ed001a'
                  }}
                >
                  nihaouayayyyyyyyyyyyyyuuuuu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMoreAd;
