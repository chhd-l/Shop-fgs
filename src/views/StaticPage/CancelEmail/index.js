import React from 'react';
import { setSeoConfig } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import { FormattedMessage } from 'react-intl';
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
      consumerAccount: ''
    };
  }

  async componentDidMount() {
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    const consumerAccount = funcUrl({ name: 'consumerAccount' });
    const storeId = funcUrl({ name: 'storeId' });
    this.setState({
      consumerAccount: consumerAccount
    });
    const res = await cancelEmailBind({
      consumerAccount: consumerAccount,
      storeId
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <div className="p-md-2rem cancel-email-main">
            <p>
              <FormattedMessage
                id="cancelEmail.content"
                values={{ val: this.state.consumerAccount }}
              />
            </p>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default CancelEmail;
