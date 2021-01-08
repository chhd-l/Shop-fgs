import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';
import RadioAnswer from './RadioAnswer';

class SearchAnswer extends React.Component {
  static defaultProps = { configSizeAttach: null, defaultData: null };
  constructor(props) {
    super(props);
    this.state = {
      form: '',
      sizeForm: null,
      hasSizeRadio: !!this.props.configSizeAttach
    };
  }
  componentDidMount() {
    this.setState({ form: this.props.defaultData }, () => {
      const { form } = this.state;
      this.props.updateFormData(form);
      this.props.updateSaveBtnStatus(form && form.key);
    });
  }
  handleSelectChange = (data) => {
    this.setState({ form: data }, () => {
      const { form } = this.state;
      this.props.updateFormData(form);
      this.props.updateSaveBtnStatus(form && form.key);
    });
  };
  toggleCheckbox = (e) => {
    const unknownText = this.props.intl.formatMessage({ id: 'unkown' });
    const mixedRaceText = this.props.intl.formatMessage({
      id: 'account.mixBreed'
    });
    // 选择按钮的时候datalayer可能改变
    if (this.props.configSizeAttach) {
      this.props.updateStepCurrent('size');
    }
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
        (form.key === 'mixed_breed' || form.key === 'undefined')
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
    const { form } = this.state;
    this.setState(
      { sizeForm: Object.assign(data, { type: form && form.key }) },
      () => {
        const { sizeForm } = this.state;
        let sts = false;
        if (sizeForm && sizeForm.key) {
          sts = true;
        }
        this.props.updateSaveBtnStatus(sts);
        this.props.updateBreedSizeFormData(sizeForm);
      }
    );
  };

  render() {
    const { form } = this.state;
    const { config, configSizeAttach } = this.props;
    const { intl } = this.props;
    const unknownText = intl.formatMessage({ id: 'unkown' });
    const mixedRaceText = intl.formatMessage({ id: 'account.mixBreed' });
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
                      .filter((el) => {
                        let inputText =
                          inputVal && inputVal.toLocaleLowerCase();
                        let lableLower =
                          el.label && el.label.toLocaleLowerCase();
                        return inputVal && lableLower.includes(inputText);
                      })
                      .map((ele) => ({ ...ele, name: ele.label }));
                  }}
                  selectedItemChange={this.handleSelectChange}
                  defaultValue={
                    form &&
                    form.key !== 'mixed_breed' &&
                    form.key !== 'undefined'
                      ? form.label
                      : ''
                  }
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
                  value="mixed_breed"
                  key={1}
                  checked={form && form.key === 'mixed_breed'}
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
                  value="undefined"
                  key={2}
                  checked={form && form.key === 'undefined'}
                  onChange={this.toggleCheckbox}
                />
                <label
                  className="rc-input__label--inline text-break"
                  htmlFor="pf-checkbox-unkown"
                >
                  {unknownText}
                </label>
              </div>
            </div>
          </div>
          {/* 存在mix breed/unkown附加选项时，才显示 */}
          {configSizeAttach && (
            <div
              className={`content-section ${
                form && (form.key === 'mixed_breed' || form.key === 'undefined')
                  ? ''
                  : 'hidden'
              }`}
            >
              <RadioAnswer
                config={configSizeAttach}
                updateFormData={this.updateSizeFormData}
                // updateSaveBtnStatus={this.updateSaveBtnStatus}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default injectIntl(SearchAnswer);
