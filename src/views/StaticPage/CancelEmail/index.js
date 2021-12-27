import React from 'react';
import { setSeoConfig } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import { FormattedMessage } from 'react-intl-phraseapp';
import { cancelEmailBind } from '@/api';

const pageLink = window.location.href;

class CancelEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      consumerAccount: '',
      errMessage: ''
    };
  }

  async componentDidMount() {
    try {
      setSeoConfig().then((res) => {
        this.setState({ seoConfig: res });
      });
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
    const { seoConfig, errMessage, consumerAccount } = this.state;
    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{seoConfig.title}</title>
          <meta name="description" content={seoConfig.metaDescription} />
          <meta name="keywords" content={seoConfig.metaKeywords} />
        </Helmet>
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <div className="md:p-8 cancel-email-main">
            {!errMessage && consumerAccount ? (
              <p>
                <FormattedMessage
                  id="cancelEmail.content"
                  values={{ val: consumerAccount }}
                />
              </p>
            ) : (
              <p>{errMessage}</p>
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default CancelEmail;
