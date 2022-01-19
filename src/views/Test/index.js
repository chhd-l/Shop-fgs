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
        <h1 className="mt-32">0111_sprint8</h1>
        <h1 className="my-12"> 2022-01-11 15:10:18</h1>
      </div>
    );
  }
}

export default Test;
