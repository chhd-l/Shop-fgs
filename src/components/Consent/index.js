import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import ConsentAdditionalText from '@/components/Consent/ConsentAdditionalText';
import ConsentToolTip from '@/components/Consent/ConsentToolTip';
import { Link } from 'react-router-dom';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import './index.css';

const DeTextInfo = () => {
  return (
    <>
      <a style={{ color: '#7F6666', cursor: 'default' }}>
        Mit Klicken des Buttons Kaufen wird Ihre Bestellung verbindlich. Weitere
        Informationen zum Vertragsschluss erhalten Sie in unseren{' '}
        <Link
          target="_blank"
          rel="nofollow"
          to="/Terms-And-Conditions "
          className="rc-styled-link"
        >
          allgemeinen Geschäftsbedingungen.
          {Boolean(window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW) && (
            <span className="warning_blank">
              <FormattedMessage id="opensANewWindow" />
            </span>
          )}
        </Link>
      </a>
      <div style={{ paddingLeft: '0px', marginTop: '1.25rem' }}>
        <a style={{ color: '#7F6666', cursor: 'default' }}>
          Informationen zu Ihrem Widerrufsrecht finden Sie{' '}
          <Link
            target="_blank"
            rel="nofollow"
            to="/Widerrufsbelehrung"
            className="rc-styled-link"
          >
            hier
            {Boolean(
              window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
            ) && (
              <span className="warning_blank">
                <FormattedMessage id="opensANewWindow" />
              </span>
            )}
          </Link>
        </a>
      </div>
    </>
  );
};

class Consent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: true
    };
    this.renderCheckBox = this.renderCheckBox.bind(this);
  }
  componentDidMount() {}
  render() {
    //组件传参start
    const list = this.props.list;
    const width = this.props.width;
    const auto = this.props.auto || false;
    let autoClass = '';
    auto ? (autoClass = 'm-auto') : (autoClass = '');
    return (
      <div
        className={`required-component break-words ${autoClass}`}
        style={{ width: `${width}`, wordBreak: 'break-word' }}
      >
        {this.renderCheckBox(list)}
      </div>
    );
  }

  renderCheckBox(list) {
    const id = this.props.id || 9999;
    const disabled = this.props.disabled || false;
    const zoom = this.props.zoom || '120%';
    const fontZoom = this.props.fontZoom || '100%';
    const checkboxPadding = this.props.checkboxPadding || '1.25rem';
    const url = this.props.url;
    const { pageType = '', isLogin } = this.props;
    const Fr = window.__.env.REACT_APP_COUNTRY === 'fr';
    const Us = window.__.env.REACT_APP_COUNTRY === 'us';
    const De = window.__.env.REACT_APP_COUNTRY === 'de';
    //组件传参end
    const createMarkup = (text, isRequired, isNoChecked) => {
      if (isRequired && text && !isNoChecked) {
        var textArray = text.split('</p>');
        if (textArray.length > 0) {
          textArray[0] =
            textArray[0] + '<span className="rc-text-colour--brand1">*</span>';
          text = textArray.join('</p>');
        }
      }
      return { __html: text };
    };
    const noIsRequired = list?.findIndex((_item) => _item?.isRequired == false);
    const showText =
      ['account', 'register', 'checkout', 'required'].indexOf(pageType) > -1;
    // se支付页面已登录不展示consent包括 text
    const hiddenText =
      pageType === 'checkout' &&
      window.__.env.REACT_APP_COUNTRY === 'se' &&
      isLogin;
    return (
      <>
        {list?.map((item, index) => {
          return (
            <div key={item.id}>
              {noIsRequired > -1 &&
              noIsRequired == index &&
              pageType === 'checkout' &&
              window.__.env.REACT_APP_COUNTRY === 'de' ? (
                <div style={{ marginLeft: '-28px', marginBottom: '24px' }}>
                  <DeTextInfo />
                </div>
              ) : null}
              {noIsRequired > -1 &&
              noIsRequired == index &&
              showText &&
              !hiddenText ? (
                <div style={{ marginLeft: '-28px' }}>
                  <ConsentAdditionalText textPosition="top" />
                </div>
              ) : null}

              <div
                key={index}
                id={index}
                style={{ display: item.notShow ? 'none' : 'flex' }}
              >
                <input
                  style={{ zoom: zoom }}
                  className={[
                    'form-check-input',
                    'ui-cursor-pointer-pure',
                    item.noChecked ? 'rc-hidden' : ''
                  ].join(' ')}
                  id={`id-checkbox-${id}-${item.id}`}
                  value=""
                  type="checkbox"
                  name="checkbox-2"
                  disabled={disabled}
                  onChange={() => {
                    console.log('this.state.list', this.state.list);
                    if (item.noChecked) return; //此项不需要check事件
                    //勾选checkbox
                    this.props.list.map((x) => {
                      if (x.id === item.id) {
                        x.isChecked = !item.isChecked;
                      }
                      return x;
                    });
                    //传回给父组件
                    this.props.sendList(this.props.list);
                  }}
                  checked={item.isChecked}
                  autoComplete="new-password"
                />
                <label
                  className="rc-text--left"
                  htmlFor={`id-checkbox-${id}-${item.id}`}
                  style={{ width: '100%' }}
                >
                  <div
                    className="d-flex flex-column"
                    style={{ zoom: fontZoom }}
                  >
                    <div className="footer-checkbox" key={index}>
                      <div className="d-flex">
                        {/* se consent */}
                        {item.consentDesc == 'MARS_PETCARE_SE_B2C_OPT' ? (
                          <>
                            <ConsentToolTip
                              consentInnerHtml={createMarkup(
                                item.consentTitle,
                                item.isRequired,
                                item.noChecked
                              )}
                              pageType={pageType}
                            />
                          </>
                        ) : (
                          <span
                            className={` ${
                              zoom === '150%'
                                ? 'footer-checkbox-title mt'
                                : 'footer-checkbox-title'
                            } ${
                              window.__.env.REACT_APP_COUNTRY == 'se'
                                ? 're2001acolor'
                                : ''
                            } ${
                              window.__.env.REACT_APP_COUNTRY == 'jp'
                                ? 'nore2001acolor'
                                : ''
                            }`}
                            dangerouslySetInnerHTML={createMarkup(
                              item.consentTitle,
                              item.isRequired,
                              item.noChecked
                            )}
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className="Checkbox-detail"
                      style={{ marginLeft: `${checkboxPadding}` }}
                      dangerouslySetInnerHTML={createMarkup(
                        item.innerHtml,
                        false
                      )}
                    />
                  </div>
                </label>
              </div>
              {showText &&
              !hiddenText &&
              window.__.env.REACT_APP_COUNTRY === 'jp' &&
              index == 2 ? (
                <div style={{ marginLeft: '-28px', marginBottom: '24px' }}>
                  <p>
                    私は、マイアカウントページで、いつでも上記の選択を変更できることを理解しています。
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
        {noIsRequired === -1 &&
        pageType === 'checkout' &&
        window.__.env.REACT_APP_COUNTRY === 'de' ? (
          <div style={{ marginLeft: '-28px', marginBottom: '24px' }}>
            <DeTextInfo />
          </div>
        ) : null}
        {noIsRequired === -1 && pageType === 'checkout' && !hiddenText ? (
          <div style={{ marginLeft: '-28px', marginBottom: '24px' }}>
            <ConsentAdditionalText textPosition="top" />
          </div>
        ) : null}
        {showText && !hiddenText ? (
          <div style={{ marginLeft: '-28px' }}>
            <ConsentAdditionalText textPosition="bottom" />
          </div>
        ) : null}
        {pageType === 'checkout' &&
        window.__.env.REACT_APP_COUNTRY === 'se' &&
        !isLogin ? (
          <p
            style={{ marginLeft: '-28px' }}
            className="rc-body rc-margin-bottom--lg rc-margin-bottom--sm--desktop rc-text--left"
          >
            <span
              style={{ marginRight: '.625rem' }}
              className="rc-text-colour--brand1"
            >
              *
            </span>
            <FormattedMessage id="registerMandatory" />
          </p>
        ) : null}
      </>
    );
  }
}

export default injectIntl(Consent);
