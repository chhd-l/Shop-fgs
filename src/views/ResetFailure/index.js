import React from 'react';
import { Footer } from '@/react-components';
import './index.less';
import { FormattedMessage } from 'react-intl';

class ResetFailure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="ResetFailure text-center">
          <img
            className="align-self-center m-auto img-pc md:img-md mt-10"
            alt=""
            title=""
            srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_failure.jpg`}
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_failure.jpg`}
          />
          <div className="title my-5">
            <FormattedMessage id="resetFailureTitle" />
          </div>
          <div>
            <FormattedMessage id="resetFailureText1" />
          </div>
          <div className="button mt-10 mb-14">
            <button
              id="button1"
              onClick={() => {
                this.props.history.push('/forgot');
              }}
            >
              <FormattedMessage id="resetFailureText2" />
            </button>
            <button
              id="button2"
              onClick={() => {
                this.props.history.push('/contact-us');
              }}
            >
              <FormattedMessage id="resetFailureText3" />
            </button>
          </div>
        </div>
        <Footer showFooter={false} />
      </div>
    );
  }
}

export default ResetFailure;
