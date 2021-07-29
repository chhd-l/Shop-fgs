import React from 'react';
import { FormattedMessage } from 'react-intl';

class DetailsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(<FormattedMessage id="ClubLP.Help.email.address" />);
  }

  render() {
    return (
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-region experience-main rc-padding-y--lg">
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--lg text-center rc-margin-y--md">
                        <div>
                          <h4
                            className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
                            style={{ fontWeight: '550' }}
                          >
                            <FormattedMessage id="preciseNutrition.Details.title" />
                          </h4>
                        </div>
                        <div className="rc-gamma rc-margin-bottom--sm heading-block-content">
                          <h4
                            className="text-center"
                            style={{
                              fontWeight: '550',
                              color: 'rgb(102, 102, 102)'
                            }}
                          >
                            <FormattedMessage id="preciseNutrition.Details.lititle1" />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm pt-0 rc-padding--none--mobile rc-margin-bottom--sm rc-margin-y--sm--mobile content-block rc-max-width--lg">
                        <div className="row align-items-md-center mx-0  rc-margin-x--none--mobile">
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-left--none--desktop rc-margin-bottom--sm--mobile rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
                              style={{ backgroundColor: '#eee' }}
                            >
                              <p>
                                <span style={{ fontWeight: '550' }}>
                                  <FormattedMessage id="preciseNutrition.Details.contitle1" />
                                </span>
                                <br />
                                <FormattedMessage id="preciseNutrition.Details.content1" />
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-right--none--desktop rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
                              style={{ backgroundColor: '#eee' }}
                            >
                              <p>
                                <span style={{ fontWeight: '550' }}>
                                  <FormattedMessage id="preciseNutrition.Details.contitle2" />
                                </span>
                                <br />
                                <FormattedMessage id="preciseNutrition.Details.content2" />
                                <br />
                                <span style={{ fontWeight: '550' }}>
                                  <FormattedMessage id="preciseNutrition.Details.content2.span" />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--lg text-center">
                        <div className="rc-gamma rc-margin-top--md--mobile heading-block-content">
                          <h4
                            className="text-center"
                            style={{
                              fontWeight: '550',
                              color: 'rgb(102, 102, 102)'
                            }}
                          >
                            <FormattedMessage id="preciseNutrition.Details.lititle2" />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm pt-0 rc-padding--none--mobile rc-margin-y--sm--mobile content-block rc-max-width--lg">
                        <div className="row align-items-md-center mx-0  rc-margin-x--none--mobile">
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-left--none--desktop rc-margin-bottom--sm--mobile rc-padding--none--mobile">
                            <div className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile">
                              <p>
                                <FormattedMessage id="preciseNutrition.Details.content3.1" />
                              </p>
                              <p>
                                <FormattedMessage id="preciseNutrition.Details.content3.2" />
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-right--none--desktop rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
                              style={{ backgroundColor: '#eee' }}
                            >
                              <p></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--lg text-left rc-margin-y--none rc-padding-x--sm--desktop">
                        <a
                          onClick={this.handleClick}
                          className="rc-padding-x--sm--desktop hidden-sm-down"
                          style={{
                            fontWeight: '550',
                            textDecoration: 'underline'
                          }}
                        >
                          <FormattedMessage id="preciseNutrition.Details.link" />
                        </a>
                        <p
                          className="rc-padding-x--sm heading-block-content"
                          style={{ color: 'rgb(102, 102, 102)' }}
                        >
                          <sapn>
                            <FormattedMessage id="preciseNutrition.Details.lastText1" />
                          </sapn>
                          <br />
                          <span>
                            <FormattedMessage id="preciseNutrition.Details.lastText2" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsDisplay;
