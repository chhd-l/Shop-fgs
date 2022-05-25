import React from 'react';
import { seoHoc } from '@/framework/common';
import { funcUrl } from '@/lib/url-utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage } from 'react-intl-phraseapp';
import { cancelEmailBind } from '@/api';
import Canonical from '@/components/Canonical';

@seoHoc()
class CancelEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consumerAccount: '',
      errMessage: ''
    };
  }

  async componentDidMount() {
    try {
      const consumerAccount = funcUrl({ name: 'consumerAccount' });
      const storeId = funcUrl({ name: 'storeId' });
      const res = await cancelEmailBind({
        consumerAccount: consumerAccount,
        storeId
      });
      this.setState({
        consumerAccount: consumerAccount
      });
      console.log(res);
    } catch (err) {
      console.log('err', err);
      this.setState({ errMessage: err.message });
    }
  }

  render() {
    const { errMessage, consumerAccount } = this.state;
    return (
      <div>
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <div
            className="md:p-8 inline-flex items-center justify-center w-full"
            style={{ minHeight: '500px' }}
          >
            {!errMessage && consumerAccount ? (
              <p className="w-1/2 text-16 text-center font-medium">
                <FormattedMessage
                  id="cancelEmail.content"
                  values={{ val: consumerAccount }}
                />
              </p>
            ) : (
              <p className="w-1/2 text-16 text-center font-medium">
                {errMessage}
              </p>
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default CancelEmail;
