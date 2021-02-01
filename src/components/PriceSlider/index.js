import React from 'react';
import ReactSlider from 'react-slider';
import './index.less';

export default class PriceSlider extends React.Component {
  static defaultProps = {
    max: 100,
    defaultValue: [0, 100],
    onChange: () => {}
  };
  render() {
    return (
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={this.props.defaultValue}
        max={this.props.max}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => (
          <div {...props}>
            <span>{state.valueNow}</span>
          </div>
        )}
        pearling
        minDistance={10}
        onChange={this.props.onChange}
      />
    );
  }
}
