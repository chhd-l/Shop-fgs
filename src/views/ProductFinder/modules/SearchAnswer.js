import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';

class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: ''
    };
  }
  componentDidMount() {
    const { form } = this.state;
    this.props.updateSaveBtnStatus(form && form.key);
  }
  handleSelectChange = (data) => {
    this.setState({ form: data }, () => {
      this.props.updateFromData(this.state.form);
    });
  };
  setUnknown = () => {
    this.setState({ form: { key: 'unknown' } }, () => {
      const { form } = this.state;
      this.props.updateSaveBtnStatus(form && form.key);
      this.props.updateFromData(form);
    });
  };
  setMixBreed = () => {
    this.setState({ form: { key: 'mix breed' } }, () => {
      this.props.updateFromData(this.state.form);
    });
  };
  render() {
    const { form } = this.state;
    const { config } = this.props;
    return (
      <>
        <h4 className="mb-4 red">{config.title}</h4>
        <div className="row1 mb-4">
          <span className="rc-input rc-full-width">
            <FormattedMessage id="searchBreed">
              {(txt) => (
                <SearchSelection
                  queryList={async ({ inputVal, pageNum }) => {
                    return config.list
                      .filter((el) => inputVal && el.label.includes(inputVal))
                      .map((ele) => ({ ...ele, name: ele.label }));
                  }}
                  selectedItemChange={this.handleSelectChange}
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
                onClick={this.setMixBreed}
              >
                <input
                  type="checkbox"
                  className="rc-input__checkbox"
                  // value={this.state.isUnknown}
                  key={1}
                  checked={form && form.key === 'mix breed'}
                />
                <label className="rc-input__label--inline text-break">
                  <FormattedMessage id="account.mixBreed" />
                </label>
              </div>

              <div
                className="rc-input rc-input--inline"
                onClick={this.setUnknown}
              >
                <input
                  type="checkbox"
                  className="rc-input__checkbox"
                  // value={this.state.isUnknown}
                  key={1}
                  checked={form && form.key === 'unknown'}
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
  }
}

export default RadioAnswer;
