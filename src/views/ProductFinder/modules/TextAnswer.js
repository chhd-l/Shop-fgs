import React from 'react';

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
  handleTextChange = (e) => {
    this.setState({ form: e.target.value }, () => {
      const { form } = this.state;
      this.props.updateSaveBtnStatus(!!form);
      this.props.updateFromData(form);
    });
  };
  render() {
    const { config } = this.props;
    const { form } = this.state;
    return (
      <>
        <h4 className="mb-4 red">{config.title}</h4>
        <div className="rc-input rc-margin-y--xs rc-input--full-width ml-2 mb-4">
          <input
            id="product-finder-text"
            className="rc-input__control"
            value={form}
            onChange={this.handleTextChange}
          />
          <label className="rc-input__label" htmlFor="product-finder-text" />
        </div>
      </>
    );
  }
}

export default RadioAnswer;
