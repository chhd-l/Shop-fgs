import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';
import RadioAnswer from './RadioAnswer';

class SearchAnswer extends React.Component {
  static defaultProps = { configSizeAttach: null };
  constructor(props) {
    super(props);
    this.state = {
      form: '',
      sizeForm: null,
      hasSizeRadio: !!this.props.configSizeAttach
    };
  }
  componentDidMount() {
    const { form } = this.state;
    this.props.updateSaveBtnStatus(form && form.key);
  }
  handleSelectChange = (data) => {
    this.setState({ form: data }, () => {
      const { form } = this.state;
      this.props.updateFormData(form);
      this.props.updateSaveBtnStatus(form && form.key);
    });
  };
  toggleCheckbox = (e) => {
    let tmp = null;
    const target = e.target;
    if (target.checked) {
      tmp = { key: target.value };
    }

    this.setState({ form: tmp }, () => {
      const { form, hasSizeRadio, sizeForm } = this.state;
      this.props.updateFormData(form);
      let sts = false;
      // 当存在size radio时，且打开size radio时，校验sizeForm数据
      if (
        hasSizeRadio &&
        form &&
        (form.key === 'mixed race' || form.key === 'unknown')
      ) {
        if (sizeForm && sizeForm.key) {
          sts = true;
        }
      } else {
        if (form && form.key) {
          sts = true;
        }
      }
      this.props.updateSaveBtnStatus(sts);
    });
  };

  updateSizeFormData = (data) => {
    this.setState({ sizeForm: data }, () => {
      const { sizeForm } = this.state;
      let sts = false;
      if (sizeForm && sizeForm.key) {
        sts = true;
      }
      this.props.updateSaveBtnStatus(sts);
      this.props.updateBreedSizeFormData(sizeForm);
    });
  };

  render() {
    const { form } = this.state;
    const { config, configSizeAttach } = this.props;
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
                  defaultValue={form && form.label}
                  key={form && form.label}
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
              <div className="rc-input rc-input--inline">
                <input
                  id="pf-checkbox-mixbreed"
                  type="checkbox"
                  className="rc-input__checkbox"
                  value={'mixed race'}
                  key={1}
                  checked={form && form.key === 'mixed race'}
                  onChange={this.toggleCheckbox}
                />
                <label
                  className="rc-input__label--inline text-break"
                  htmlFor="pf-checkbox-mixbreed"
                >
                  <FormattedMessage id="account.mixBreed" />
                </label>
              </div>

              <div className="rc-input rc-input--inline">
                <input
                  id="pf-checkbox-unkown"
                  type="checkbox"
                  className="rc-input__checkbox"
                  value={'unknown'}
                  key={2}
                  checked={form && form.key === 'unknown'}
                  onChange={this.toggleCheckbox}
                />
                <label
                  className="rc-input__label--inline text-break"
                  htmlFor="pf-checkbox-unkown"
                >
                  <FormattedMessage id="unkown" />
                </label>
              </div>
            </div>
          </div>
          {/* 存在mix breed/unkown附加选项时，才显示 */}
          {configSizeAttach && (
            <div
              className={`content-section ${
                form && (form.key === 'mixed race' || form.key === 'unknown')
                  ? ''
                  : 'hidden'
              }`}
            >
              (
              <RadioAnswer
                config={configSizeAttach}
                updateFormData={this.updateSizeFormData}
                // updateSaveBtnStatus={this.updateSaveBtnStatus}
              />
              )
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SearchAnswer;
