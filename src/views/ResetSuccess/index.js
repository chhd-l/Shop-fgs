import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Footer from '@/components/Footer';

class ResetSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/login');
    }, 5000);
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
              srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_success.jpg`}
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_success.jpg`}
            />
          </LazyLoad>
          <h1 className="red mt-8 mb-12 text-2xl md:text-3xl">
            <FormattedMessage id="resetSuccessTip" />
          </h1>
          <p className="text-lg font-light">
            <FormattedMessage id="resetSuccessText" />
          </p>
          <p>
            <FormattedMessage id="resetSuccess.NoRedirection" />
            <Link
              to="/login"
              className={'ml-2 border-b black hover:border-red-600'}
            >
              <FormattedMessage id="resetSuccess.goToLogin" />
            </Link>
          </p>
        </div>
        <Footer showFooter={false} />
      </div>
    );
  }
}
export default injectIntl(ResetSuccess);
