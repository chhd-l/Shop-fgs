import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
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
  }
  componentDidMount() {}
  render() {
    //组件传参start
    const id = this.props.id || 9999;
    const list = this.props.list;
    const width = this.props.width;
    const disabled = this.props.disabled || false;
    const zoom = this.props.zoom || '120%';
    const fontZoom = this.props.fontZoom || '100%';
    const checkboxPadding = this.props.checkboxPadding || '20px';
    const url = this.props.url;
    const auto = this.props.auto || false;
    let autoClass = '';
    auto ? (autoClass = 'm-auto') : (autoClass = '');
    //组件传参end
    const createMarkup = (text) => ({ __html: text });
    return (
      <div
        className={`required-component ${autoClass}`}
        style={{ width: `${width}px` }}
      >
        {list.map((item, index) => {
          return (
            <div key={index} id={index} style={{ display: 'flex' }}>
              <input
                style={{ zoom: zoom }}
                className="form-check-input ui-cursor-pointer-pure"
                id={`id-checkbox-cat-${id}-${item.id}`}
                value=""
                type="checkbox"
                name="checkbox-2"
                disabled={disabled}
                onChange={() => {
                  //勾选checkbox
                  let itemObj = Object.assign(item, {
                    isChecked: !item.isChecked
                  });
                  list.splice(index, 1, itemObj);
                  //传回给父组件
                  this.props.sendList(list);
                }}
                checked={item.isChecked}
              />
              <label htmlFor={`id-checkbox-cat-${id}-${item.id}`}>
                <div className="d-flex flex-column" style={{ zoom: fontZoom }}>
                  <div className="footer-checkbox" key={index}>
                    <div className="d-flex">
                      <div className="rc-text-colour--brand1">
                        <p style={{ width: `${checkboxPadding}` }}>
                          {item.isRequired ? '*' : ''}
                        </p>
                      </div>
                      <div
                        className={
                          zoom == '150%'
                            ? 'footer-checkbox-title mt'
                            : 'footer-checkbox-title'
                        }
                        style={{ width: `${width}px` }}
                        dangerouslySetInnerHTML={createMarkup(
                          item.consentTitle
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className="Checkbox-detail"
                    style={{ marginLeft: `${checkboxPadding}` }}
                    dangerouslySetInnerHTML={createMarkup(item.innerHtml)}
                  />
                  {item.isRequired && !item.isChecked && (
                    <div className="d-flex">
                      <div>
                        <p style={{ width: '20px' }} />
                      </div>
                      <em
                        className="red"
                        style={{ fontSize: '.9em', fontStyle: 'normal' }}
                      >
                        <FormattedMessage id="requiredConsentCheckedTip" />
                      </em>
                    </div>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default injectIntl(Consent);
