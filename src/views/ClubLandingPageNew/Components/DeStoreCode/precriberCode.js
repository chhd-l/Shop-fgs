import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { getPrescriberByCode } from '@/api/clinic';
import LazyLoad from 'react-lazyload';
import line from '../../deimage/Line@4x.png';
import successImg from '../../image/bingo-blue.png';
import './index.less';
import { getDeviceType } from '@/utils/utils';

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
    this.setState({
      keywords: e.target.value
    });
  };
  searchPrescriberCode = async () => {
    let res = await getPrescriberByCode({
      code: this.state.keywords,
      storeId: process.env.REACT_APP_STOREID
    });
    let prescriberVo = (res.context && res.context.prescriberVo) || [];
    if (prescriberVo.length > 0) {
      const { clinicStore } = this.props;
      clinicStore.setSelectClinicId(prescriberVo[0].id);
      clinicStore.setSelectClinicName(prescriberVo[0].name);
      this.setState({ showSuccessPanel: true });
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
                  <div
                    style={{ display: 'flex', justifyContent: 'center' }}
                    className="deflexcolumn"
                  >
                    <div className="de-prescriber-code-input-search">
                      <p
                        className="de-prescriber-code-weight"
                        style={{ textAlign: 'center' }}
                      >
                        <FormattedMessage id="deLandingPage.prescriberCode.tip4" />
                      </p>
                      <div
                        style={{ display: 'flex', alignItems: 'flex-start' }}
                        className="deflexcolumn"
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column'
                          }}
                        >
                          <span
                            className={[
                              'rc-input',
                              'rc-input--inline',
                              'rc-input--label',
                              errMsg ? 'rc-input--error' : ''
                            ].join(' ')}
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
                              onFocus={() => {
                                this.setState({ errMsg: '' });
                              }}
                            />
                          </span>
                          {errMsg && (
                            <span
                              style={{ textAlign: 'left' }}
                              className="text-danger-2"
                              dangerouslySetInnerHTML={{
                                __html: errMsg
                              }}
                            />
                          )}
                        </div>
                        <button
                          className="rc-btn rc-btn--one mobilemargin3vh"
                          onClick={this.searchPrescriberCode}

                        >
                          <FormattedMessage id="deLandingPage.prescriberCode.searchBtn" />
                        </button>
                      </div>
                    </div>
                    <div className="line decenter deimagetranslate">
                      <LazyLoad>
                        <img src={line} style={{ height: '10vh' }} />
                      </LazyLoad>
                    </div>
                    <div className="detextcenter de-prescriber-code-column">
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
                      <LazyLoad style={{ width: '2rem', height: '2rem' }}>
                        <img src={successImg} />
                      </LazyLoad>
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
