// import { Modal } from 'bootstrap';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';

let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

class DetailsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({
      modalShow: !this.state.modalShow
    });
  };

  render() {
    const { productComposition } = this.props.productInfo;
    const { intl } = this.props;
    const modalShow = this.state.modalShow;

    let productComposition1 = productComposition.analyticalConsitituentsTitle.slice(
      0,
      5
    );
    let productComposition2 = productComposition.analyticalConsitituentsTitle.slice(
      5
    );
    return (
      <div className="experience-component experience-layouts-1column">
        <div
          className={'modal'}
          style={
            modalShow
              ? {
                  width: '100vw',
                  height: '780vh',
                  position: 'fixed',
                  display: 'block',
                  background: '#000',
                  opacity: '0.80'
                }
              : {}
          }
        ></div>
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
                        <div className="row mx-0 rc-margin-x--none--mobile">
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-left--none--desktop rc-margin-bottom--sm--mobile rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile rc-padding-x--md--mobile"
                              style={{
                                backgroundColor: '#eee',
                                height: '100%'
                              }}
                            >
                              <p>
                                <div style={{ fontWeight: '550' }}>
                                  <FormattedMessage
                                    id={productComposition.compositionTitle}
                                  />
                                </div>
                                <p>
                                  <FormattedMessage
                                    id={productComposition.compositionDes}
                                  />
                                </p>
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 align-items-center order-2  orderJoin1 rc-padding-right--none--desktop  rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile rc-padding-x--md--mobile"
                              style={{
                                backgroundColor: '#eee',
                                height: '100%'
                              }}
                            >
                              <p>
                                <div style={{ fontWeight: '550' }}>
                                  <FormattedMessage
                                    id={productComposition.additivesTitle}
                                  />
                                </div>

                                <p>
                                  <FormattedMessage
                                    id={productComposition.additives}
                                  />
                                </p>
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
                            className="text-center rc-margin-bottom--sm"
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
                        <div className="row rc-full-width mx-0  rc-margin-x--none--mobile">
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-left--none--desktop rc-margin-bottom--sm--mobile rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm--mobile rc-padding-y--md--mobile rc-padding-x--md--mobile"
                              style={{ height: '100%' }}
                            >
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
                              className="row col-12 mx-0 text-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
                              style={{
                                backgroundColor: '#eee',
                                height: '100%'
                              }}
                            >
                              <div className="col-md-6 col-12 px-0">
                                {productComposition1?.map((el, idx) => (
                                  <div>
                                    <FormattedMessage id={el} />:{' '}
                                    <FormattedMessage
                                      id={
                                        productComposition
                                          .analyticalConsitituentsDes[idx]
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="col-md-6 col-12 px-0">
                                {productComposition2?.map((el, idx) => (
                                  <div>
                                    <FormattedMessage id={el} />:{' '}
                                    <FormattedMessage
                                      id={
                                        productComposition
                                          .analyticalConsitituentsDes[idx + 5]
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
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
                          type="button"
                          className="mb-3 hidden-sm-down"
                          style={{
                            fontWeight: '550',
                            textDecoration: 'underline'
                          }}
                          onClick={() => this.handleClick()}
                        >
                          <FormattedMessage id="preciseNutrition.Details.link" />
                        </a>
                        {isMobile ? (
                          <p
                            className="heading-block-content rc-padding-x--md"
                            style={{
                              color: 'rgb(102, 102, 102)',
                              fontSize: '14px'
                            }}
                          >
                            <div>
                              <FormattedMessage id="preciseNutrition.Details.lastText3" />
                            </div>
                          </p>
                        ) : (
                          <p
                            className="heading-block-content"
                            style={{
                              color: 'rgb(102, 102, 102)',
                              fontSize: '14px'
                            }}
                          >
                            <div>
                              <FormattedMessage id="preciseNutrition.Details.lastText1" />
                            </div>
                            <div>
                              <FormattedMessage id="preciseNutrition.Details.lastText2" />
                            </div>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rc-layout-container rc-news-article-card--sidebar-present "
                style={{
                  display: modalShow ? 'block' : 'none',
                  position: 'fixed',
                  top: '20%',
                  left: '50%',
                  // position: 'relative',
                  // top: '-90%',
                  // left: '70%',
                  transform: 'translate(-50%,0%)',
                  opacity: '100',
                  zIndex: '1100'
                }}
              >
                <div className="rc-column " style={{ width: '950px' }}>
                  <article className="rc-card rc-card--a">
                    <div
                      className="rc-full-width"
                      style={{ padding: '20px 40px 50px 0px' }}
                    >
                      <div
                        className="flex "
                        style={{ justifyContent: 'flex-end' }}
                        onClick={() => this.handleClick()}
                      >
                        <span
                          className="rc-icon rc-close rc-iconography"
                          style={{ width: '15px' }}
                        ></span>
                      </div>
                      <div>
                        <div className="row col-12 my-2 px-1">
                          <div className="col-md-1 px-2 text-right">1.</div>
                          <div className="col-md-11 px-0">
                            <FormattedMessage
                              id={'preciseNutrition.Details.list1'}
                            />
                          </div>
                        </div>
                        <div className="row col-12 my-2 px-1">
                          <div className="col-md-1 px-2 text-right">2.</div>
                          <div className="col-md-11 px-0">
                            <FormattedMessage
                              id={'preciseNutrition.Details.list2'}
                            />
                          </div>
                        </div>
                        <div className="row col-12 my-2 px-1">
                          <div className="col-md-1 px-2 text-right">3.</div>
                          <div className="col-md-11 px-0">
                            <FormattedMessage
                              id={'preciseNutrition.Details.list3'}
                            />
                          </div>
                        </div>
                        <div className="row col-12 my-2 px-1">
                          <div className="col-md-1 px-2 text-right">4.</div>
                          <div className="col-md-11 px-0">
                            <FormattedMessage
                              id={'preciseNutrition.Details.list4'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(DetailsDisplay);
