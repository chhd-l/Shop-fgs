import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { getPrescriberByCode } from '@/api/clinic';
import './index.less';
import { getDeviceType } from '@/utils/utils';
import cn from 'classnames';

const isMobile = getDeviceType() === 'H5';

@inject('clinicStore')
@injectIntl
@observer
class PrescriberCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      errMsg: '',
      showSuccessPanel: false
    };
  }
  inputSearchValue = (e) => {
    if (e.target.value === '') {
      this.setState({ errMsg: '' });
    }
    this.setState({
      keywords: e.target.value
    });
  };
  searchPrescriberCode = async () => {
    let res = await getPrescriberByCode({
      code: this.state.keywords,
      storeId: window.__.env.REACT_APP_STOREID
    });
    let prescriberVo = (res.context && res.context.prescriberVo) || [];
    if (prescriberVo.length > 0) {
      const { clinicStore } = this.props;
      clinicStore.setSelectClinicId(prescriberVo[0].id);
      clinicStore.setSelectClinicName(prescriberVo[0].prescriberName);
      clinicStore.setSelectClinicCode(this.state.keywords);
      this.setState({ showSuccessPanel: true, errMsg: '' });
    } else {
      this.setState({
        errMsg: this.props.intl.messages.dePrescriberCodeErrMsg
      });
    }
  };
  render() {
    const { errMsg } = this.state;
    const { intl } = this.props;
    return (
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-cardcarousel">
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile ">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center de-prescriber-code">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="deLandingPage.prescriberCode.title" />
                  </h4>
                  <p>
                    <FormattedMessage id="deLandingPage.prescriberCode.tip1" />
                  </p>
                  <p>
                    <FormattedMessage
                      id="deLandingPage.prescriberCode.tip2"
                      values={{
                        val: (
                          <a className="de-prescriber-code-weight">
                            <FormattedMessage id="deLandingPage.prescriberCode.title" />
                          </a>
                        )
                      }}
                    />
                  </p>
                  <p>
                    <FormattedMessage id="deLandingPage.prescriberCode.tip3" />
                  </p>
                </div>
                {!this.state.showSuccessPanel ? (
                  <div className="grid grid-cols-11 relative">
                    <div className="de-prescriber-code-input-search col-span-12 md:col-span-5">
                      <p
                        className="de-prescriber-code-weight"
                        style={{ textAlign: 'center' }}
                      >
                        <FormattedMessage id="deLandingPage.prescriberCode.tip4" />
                      </p>
                      <div className="grid grid-cols-12">
                        <div className="col-span-12 md:col-span-7 order-1 flex justify-center">
                          <span
                            style={{
                              position: 'relative',
                              marginRight: isMobile ? '0' : '1.5rem'
                            }}
                            className={cn(
                              'rc-input rc-input--inline rc-input--label',
                              { 'rc-input--error': errMsg }
                            )}
                            input-setup="true"
                          >
                            <input
                              className={`form-control ${
                                errMsg ? 'rc-input--error' : ''
                              }`}
                              id="shippingLastName"
                              type="text"
                              placeholder={intl.messages.dePrescriberCodeTxt}
                              value={this.state.keywords}
                              onChange={this.inputSearchValue}
                              maxLength="50"
                              name="keywords"
                              // onFocus={() => {
                              //   this.setState({ errMsg: '' });
                              // }}
                            />
                            {errMsg && (
                              <span
                                style={{
                                  right: '.2rem',
                                  zIndex: 2
                                }}
                                className="iconfont iconchahao font-bold text-2xl absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => {
                                  this.setState({ keywords: '', errMsg: '' });
                                }}
                              />
                            )}
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-5 order-3 text-center">
                          <button
                            style={{
                              marginTop: '16px'
                            }}
                            className="rc-btn rc-btn--one mobilemargin3vh"
                            onClick={this.searchPrescriberCode}
                          >
                            <FormattedMessage id="deLandingPage.prescriberCode.searchBtn" />
                          </button>
                        </div>
                        {errMsg && (
                          <div className="col-span-12 order-2 md:order-4">
                            <span
                              className="text-danger-2 text-center md:text-left inline-block"
                              dangerouslySetInnerHTML={{
                                __html: errMsg
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-1 flex justify-center">
                      <div className="border-t-2 w-2/5 md:border-t-0 md:w-auto md:border-r-2 md:h-20 my-5 md:my-0 md:mx-10" />
                    </div>

                    <div className="detextcenter de-prescriber-code-column col-span-12 md:col-span-5">
                      <p className="de-prescriber-code-weight">
                        <FormattedMessage id="deLandingPage.prescriberCode.tip5" />
                      </p>
                      <p>
                        <FormattedMessage id="deLandingPage.prescriberCode.tip6" />
                      </p>
                      <Link
                        to="/prescriptionNavigate"
                        target="_blank"
                        rel="nofollow"
                      >
                        <button className="rc-btn rc-btn--two button20vw">
                          <FormattedMessage id="deLandingPage.prescriberCode.navigateBtn" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center">
                    <div className="rc-self-h-middle rc-content-v-middle rc-padding-x--md">
                      <span className="iconfont iconduigoux font-bold bg-green rounded-full text-white leading-normal text-xl inline-block w-8 h-8" />
                    </div>
                    <div className="de-prescriber-code-weight">
                      <FormattedMessage id="deLandingPage.prescriberCode.successTip" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrescriberCode;
