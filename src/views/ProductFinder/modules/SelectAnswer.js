import React from 'react';
import Selection from '@/components/Selection';
import { FormattedMessage } from 'react-intl';

class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: Array(this.props.config.list.length).fill(-1)
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    const { form } = this.state;
    this.props.updateSaveBtnStatus(form.every((ele) => ele > -1));
  }
  handleSelectChange(data, idx) {
    let { form } = this.state;
    form.splice(idx, 1, data.value);
    this.props.updateSaveBtnStatus(form.every((ele) => ele > -1));
    this.props.updateFromData(form);
  }
  render() {
    const { form } = this.state;
    const { config } = this.props;
    return (
      <>
        <h4 className="mb-4 red">{config.title}</h4>
        <div className="row mb-4">
          {config.list.map((ele, i) => (
            <span
              className={`rc-select rc-full-width rc-input--full-width rc-select-processed col-6`}
              key={i}
            >
              <Selection
                optionList={ele.map((item) => ({
                  value: item.key,
                  name: item.label
                }))}
                selectedItemChange={(data) => this.handleSelectChange(data, i)}
                selectedItemData={{
                  value: form[i]
                }}
                key={`${i}-${form}`}
                placeholder={config.placeholderList[i]}
              />
            </span>
          ))}
        </div>
      </>
    );
  }
}

export default RadioAnswer;
