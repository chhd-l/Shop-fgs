import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import { getDeviceType } from '../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

class ProductSpecialities extends React.Component {
  render() {
    return (
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-threeColumnContentBlock">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-top--lg--mobile three-column-content-block">
                <div>
                  <h2
                    className="rc-beta font-weight-bold text-uppercase text-center rc-padding-top--sm rc-margin-y--md rc-margin-bottom--lg--mobile"
                    style={{ fontSize: isMobile ? '18px' : null }}
                  >
                    <FormattedMessage id="preciseNutrition.Product.title" />
                  </h2>
                </div>

                <div className="row rc-margin-x--none d-flex">
                  <div className="col-12 col-lg-5 rc-padding-left--xl--desktop rc-padding-x--none--mobile text-center text-lg-right order-1 order-lg-0">
                    <b className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.title1" />
                    </b>
                    <p className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.content1" />
                    </p>
                  </div>

                  <div className="col-12 col-lg-2 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
                    <div
                      className="image-container text-center rc-column"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                      }}
                    >
                      <LazyLoad>
                        <img
                          src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/kibble.png`}
                        />
                      </LazyLoad>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5 text-center rc-padding-right--xl--desktop rc-padding-x--none--mobile  text-lg-left align-items-center order-2">
                    <b className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.title2" />
                    </b>
                    <p className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.content2" />
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <div className="text-center col-12 col-lg-6 rc-padding-x--sm rc-padding-x--none--mobile">
                    <b className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.title3" />
                    </b>
                    <p className="font-18">
                      <FormattedMessage id="preciseNutrition.Product.list.content3" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rc-border-bottom rc-border-colour--brand4"
          style={{ borderBottomWidth: '8px' }}
        ></div>
      </div>
    );
  }
}

export default ProductSpecialities;
