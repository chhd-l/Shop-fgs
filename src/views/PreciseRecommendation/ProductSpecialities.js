import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';

class ProductSpecialities extends React.Component {
  render() {
    return (
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-threeColumnContentBlock">
              <div className="rc-max-width--xl rc-padding-x--md rc-padding-x--md--mobile rc-margin-y--sm rc-margin-top--lg--mobile three-column-content-block">
                <div>
                  <h4
                    className="rc-beta text-center rc-padding-top--sm rc-margin-y--md rc-margin-bottom--lg--mobile"
                    style={{ fontWeight: '550' }}
                  >
                    <FormattedMessage id="preciseNutrition.Product.title" />
                  </h4>
                </div>

                <div className="row rc-margin-x--none d-flex">
                  <div className="col-12 col-lg-5 text-center text-lg-right order-1 order-lg-0">
                    <span>
                      <FormattedMessage id="preciseNutrition.Product.list.title1" />
                    </span>
                    <p>
                      <FormattedMessage id="preciseNutrition.Product.list.content1" />
                    </p>
                  </div>

                  <div className="col-12 col-lg-2 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
                    <div className="image-container">
                      <LazyLoad>
                        <img
                          src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/kibble.png`}
                        />
                      </LazyLoad>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5 text-center text-lg-left align-items-center order-2">
                    <span>
                      <FormattedMessage id="preciseNutrition.Product.list.title2" />
                    </span>
                    <p>
                      <FormattedMessage id="preciseNutrition.Product.list.content2" />
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <div className="text-center col-12 col-lg-5">
                    <span>
                      <FormattedMessage id="preciseNutrition.Product.list.title3" />
                    </span>
                    <p>
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
