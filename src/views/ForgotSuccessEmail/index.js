import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { forgetPassword, forgetPassworSendEmail } from '@/api/login';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { EMAIL_REGEXP, LOGO_PRIMARY_RU, LOGO } from '@/utils/constant';
import Footer from '@/components/Footer';
import { Button, Input } from '@/components/Common';

class ForgotSuccessEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const email = this.props.location?.state?.email || '';
    return (
      <div>
        <div className="flex flex-col items-center mt-12 mb-28 px-4 text-center">
          <LazyLoad>
            <img
              className="align-self-center w-48 md:w-80"
              alt="forget password images"
              title="forget password"
              srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/forget-password-success.jpg`}
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/forget-password-success.jpg`}
            />
          </LazyLoad>
          <h1 className="red mt-8 mb-12 text-2xl md:text-3xl">
            <FormattedMessage id="forgetPassword.resetPasswordTip" />
          </h1>
          <p className="text-lg font-light">
            <FormattedMessage id="forgetPassword.forgotSuccessEmailp1" />
          </p>
          <p className="text-lg font-medium mb-4">{email}</p>
          <p className="text-lg font-light mb-4">
            <FormattedMessage id="forgetPassword.forgotSuccessEmailp2" />
          </p>
          <p className="text-lg font-light">
            <FormattedMessage id="forgetPassword.forgotSuccessEmailp3" />
          </p>
          <p className="text-lg font-light mb-10">
            <FormattedMessage id="forgetPassword.forgotSuccessEmailp4" />
          </p>
          <Button
            type="primary"
            // size="small"
            disabled={!email}
            onClick={() => {
              this.props.history.push('/forgot');
            }}
          >
            <FormattedMessage id="forgetPassword.retry" />
          </Button>
        </div>
        <Footer showFooter={false} />
      </div>
    );
  }
}
export default injectIntl(ForgotSuccessEmail);
