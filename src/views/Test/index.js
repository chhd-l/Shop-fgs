import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';

@injectIntl
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rc-content--fixed-header rc-bg-colour--brand4 p-40 text-4xl">
        <h1 className="mt-32">feature_0401_sprint11</h1>
      </div>
    );
  }
}

export default Test;
