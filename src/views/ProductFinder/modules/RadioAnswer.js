import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '@/components/Modal';

import veterinaryImg from '@/assets/images/veterinary.png';
import veterinaryProductImg from '@/assets/images/veterinary_product.png';

class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sickModalVisible: false,
      form: null
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.setSickModalVisible = this.setSickModalVisible.bind(this);
  }
  componentDidMount() {
    const { form } = this.state;
    this.props.updateSaveBtnStatus(form && form.key);
  }
  handleRadioChange(item, idx) {
    if (item.key.includes('healthIssues')) {
      this.setSickModalVisible(true);
    }
    this.setState({ form: item }, () => {
      const { form } = this.state;
      this.props.updateSaveBtnStatus(form && form.key);
      this.props.updateFromData(form);
    });
  }
  setSickModalVisible(status) {
    this.setState({ sickModalVisible: status });
  }
  render() {
    const { sickModalVisible } = this.state;
    const { config } = this.props;
    return (
      <>
        <h4 className="mb-4 red">{config.title}</h4>
        {config.list.map((ele, i) => (
          <div
            key={i}
            className="rc-input rc-margin-y--xs rc-input--full-width ml-2"
          >
            <input
              className="rc-input__radio"
              id={`pro-finder-answer-${i}`}
              type="radio"
              name="buyWay"
              value={i}
              onChange={this.handleRadioChange.bind(this, ele, i)}
              checked={ele.selected}
            />
            <label
              className="rc-input__label--inline"
              htmlFor={`pro-finder-answer-${i}`}
            >
              {ele.label}
            </label>
          </div>
        ))}
        <Modal
          footerVisible={false}
          visible={sickModalVisible}
          modalTitle={''}
          modalText={
            <div className="row ml-3 mr-3">
              <div className="col-12 col-md-6">
                <h2 className="rc-beta markup-text">
                  <FormattedMessage id="productFinder.healthTitle" />
                </h2>
                <p>
                  <FormattedMessage id="productFinder.healthTip1" />
                </p>
                <p>
                  <FormattedMessage id="productFinder.healthTip2" />
                </p>
                <div className="rc-btn-group mb-3">
                  <button className="rc-btn rc-btn--one">
                    <FormattedMessage id="learnMore" />
                  </button>
                  <button className="rc-btn rc-btn--two">
                    <FormattedMessage id="contactUs" />
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <img
                  src={veterinaryImg}
                  className="rc-md-up"
                  style={{ width: '20%', margin: '0 auto' }}
                  alt=""
                />
                <img
                  className="mt-3 rc-full-width"
                  src={veterinaryProductImg}
                  alt=""
                />
              </div>
            </div>
          }
          close={this.setSickModalVisible.bind(this, false)}
          hanldeClickConfirm={this.setSickModalVisible.bind(this, false)}
        />
      </>
    );
  }
}

export default RadioAnswer;
