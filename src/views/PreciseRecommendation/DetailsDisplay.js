// import { Modal } from 'bootstrap';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from '@/components/Modal';
import kittenimgone from '../DedicatedLandingPage/img/kittenimgone.png';
import kittenimgtwo from '../DedicatedLandingPage/img/kittenimgtwo.png';

class DetailsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // this.handleClick=this.handleClick.bind(this)

  handleClick = () => {
    this.setState({
      modalShow: !this.state.modalShow
    });
  };

  // handleClick(){
  //   return (
  //
  //       <Modal
  //         visible={true}
  //         type="fullscreen"
  //         visible={true}
  //         footerVisible={false}
  //         confirmBtnText={<div>shdiadopwqd</div>}
  //       >
  //         <div>tanchuang</div>
  //       </Modal>
  //   );
  // }

  render() {
    const { productComposition } = this.props.productInfo;
    const { intl } = this.props;
    let productComposition1 = productComposition.analyticalConsitituentsTitle.slice(
      0,
      5
    );
    let productComposition2 = productComposition.analyticalConsitituentsTitle.slice(
      5
    );
    const modalShow = this.state.modalShow;

    return (
      <div className="experience-component experience-layouts-1column">
        <div
          className={'modal'}
          style={
            modalShow
              ? {
                  width: '100vw',
                  height: '780vh',
                  position: 'absolute',
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
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
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
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
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
                                {/* <span style={{ fontWeight: '550' }}>
                                  <FormattedMessage id="preciseNutrition.Details.content2.span" />
                                </span> */}
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
                        <div className="row rc-full-width mx-0  rc-margin-x--none--mobile">
                          <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1 rc-padding-left--none--desktop rc-margin-bottom--sm--mobile rc-padding--none--mobile">
                            <div
                              className="text-center text-lg-left rc-padding-x--sm rc-padding-y--sm rc-padding-y--md--mobile"
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
                                          .analyticalConsitituentsDes[idx]
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
                          className="rc-padding-x--sm--desktop hidden-sm-down"
                          style={{
                            fontWeight: '550',
                            textDecoration: 'underline'
                          }}
                          onClick={() => this.handleClick()}
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

              <div
                className="rc-layout-container rc-news-article-card--sidebar-present "
                style={{
                  display: modalShow ? 'block' : 'none',
                  position: 'absolute',
                  top: '300%',
                  left: '50%',
                  transform: 'translate(-50%,0%)',
                  opacity: '100',
                  zIndex: '1100'
                }}
              >
                <div className="rc-column " style={{ width: '950px' }}>
                  <article className="rc-card rc-card--a">
                    <div className="rc-card__body">
                      <div
                        className="flex "
                        style={{ justifyContent: 'flex-end', fontSize: '20px' }}
                        onClick={() => this.handleClick()}
                      >
                        <span
                          className="rc-icon rc-close rc-iconography"
                          style={{ width: '15px' }}
                        ></span>
                      </div>
                      <div>
                        <h1>shidabdadl</h1>
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
