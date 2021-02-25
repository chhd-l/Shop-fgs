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
    const checkboxPadding = this.props.checkboxPadding || '20px';
    const url = this.props.url;
    //组件传参end
    const createMarkup = (text, isRequired) => {
      if (isRequired && text) {
        var textArray = text.split('</p>');
        if (textArray.length > 0) {
          textArray[0] =
            textArray[0] + '<span class="rc-text-colour--brand1">*</span>';
          text = textArray.join('</p>');
        }
      }
      return { __html: text };
    };
    return list.map((item, index) => {
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
          />
          <label
            className="rc-text--left"
            htmlFor={`id-checkbox-cat-${id}-${item.id}`}
            style={{ width: '100%' }}
          >
            <div className="d-flex flex-column" style={{ zoom: fontZoom }}>
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
                      item.isRequired
                    )}
                  />
                </div>
              </div>
              <div
                className="Checkbox-detail"
                style={{ marginLeft: `${checkboxPadding}` }}
                dangerouslySetInnerHTML={createMarkup(item.innerHtml, false)}
              />
            </div>
          </label>
        </div>
      );
    });
  }
}

export default injectIntl(Consent);
