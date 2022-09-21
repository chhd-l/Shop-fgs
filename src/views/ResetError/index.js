import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Footer from '@/components/Footer';

class ResetError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="flex flex-col items-center mt-12 mb-24 px-4 text-center">
          <LazyLoad>
            <img
              className="align-self-center w-48 md:w-80"
              alt="forget password images"
              title="forget password"
              srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_error_page.jpg`}
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_error_page.jpg`}
            />
          </LazyLoad>
          <p className="red mt-8 text-2xl md:text-3xl font-light">
            <FormattedMessage id="resetErrorTitle" />
          </p>
          <p className="mt-2 text-lg font-light">
            <FormattedMessage id="resetErrorText" />
          </p>
          <p className="mt-2 text-lg font-light">
            <a
              href="mailto:Royal%20Canin%20<ciam@royalcanin.zendesk.com>"
              className={'border-b hover:border-red-600'}
            >
              <FormattedMessage id="resetErrorText2" />
            </a>
          </p>
          <p className="mt-2 text-lg font-light">
            <Link to="/register" className={'border-b hover:border-red-600'}>
              <FormattedMessage id="resetErrorText3" />
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
export default injectIntl(ResetError);
