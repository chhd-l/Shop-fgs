import React, { useState, useEffect, useReducer } from 'react';
import { FormattedMessage } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';

const RadioAnswer = (props) => {
  const [form, setFormData] = useState('');

  function handleSelectChange(data) {
    setFormData(data.name);
  }

  useEffect(() => {
    props.updateFromData(form);
  }, [form]);

  return (
    <>
      <h4 className="mb-4 red">{props.config.title}</h4>
      <div className="row1 mb-4">
        <span className="rc-input rc-full-width">
          <FormattedMessage id="searchBreed">
            {(txt) => (
              <SearchSelection
                queryList={async ({ inputVal, pageNum }) => {
                  return props.config.list
                    .filter((el) => inputVal && el.includes(inputVal))
                    .map((ele) => ({ ...ele, name: ele }));
                }}
                selectedItemChange={(data) => handleSelectChange(data)}
                // defaultValue={this.props.defaultValue}
                // key={this.props.defaultValue}
                placeholder={txt}
                customStyle={true}
                isBottomPaging={false}
                prefixIcon={
                  <button
                    className="rc-input__submit rc-input__submit--search mt-1"
                    style={{ top: 0 }}
                    type="submit"
                  >
                    <span className="rc-screen-reader-text">Submit</span>
                  </button>
                }
              />
            )}
          </FormattedMessage>
        </span>
        <div className="content-section">
          <div className="form-group mt-3">
            <div
              className="rc-input rc-input--inline"
              onClick={() => this.setUnknown()}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                // value={this.state.isUnknown}
                key={1}
                // checked={this.state.isUnknown}
              />
              <label className="rc-input__label--inline text-break">
                <FormattedMessage id="account.mixBreed" />
              </label>
            </div>

            <div
              className="rc-input rc-input--inline"
              onClick={() => this.setUnknown()}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                // value={this.state.isUnknown}
                key={1}
                // checked={this.state.isUnknown}
              />
              <label className="rc-input__label--inline text-break">
                <FormattedMessage id="unkown" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioAnswer;
