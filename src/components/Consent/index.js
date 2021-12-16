import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import ConsentAdditionalText from '@/components/Consent/ConsentAdditionalText';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import './index.css';

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
        className={`required-component ${autoClass}`}
        style={{ width: `${width}` }}
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
    console.log(list, 'listtt--==');
    return (
      <>
        {list?.map((item, index) => {
          return (
            <div>
              {index === 1 &&
              window.__.env.REACT_APP_COUNTRY === 'us' &&
              this.props.pageType === 'register' ? (
                <div style={{ marginLeft: '-30px' }}>
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
                        <span
                          className={
                            zoom === '150%'
                              ? 'footer-checkbox-title mt'
                              : 'footer-checkbox-title'
                          }
                          dangerouslySetInnerHTML={createMarkup(
                            item.consentTitle,
                            item.isRequired,
                            item.noChecked
                          )}
                        />
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
            </div>
          );
        })}
      </>
    );
  }
}

export default injectIntl(Consent);
