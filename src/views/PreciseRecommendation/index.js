import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Helmet } from 'react-helmet';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';

const pageLink = window.location.href;

class PreciseRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
  }

  render() {
    const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
    const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
    const firstText = {
      content: <FormattedMessage id="preciseNutrition.Top.title" />
    };
    const list = {
      phone: {
        title: <FormattedMessage id="ClubLP.Help.call.title" />,
        desc: <FormattedMessage id="preciseNutrition.call.content" />,
        btnText: <FormattedMessage id="preciseNutrition.call.number" />
      },
      email: {
        title: <FormattedMessage id="ClubLP.Help.email.title" />,
        desc: <FormattedMessage id="ClubLP.Help.email.content" />,
        btnText: <FormattedMessage id="ClubLP.Help.email.address" />
      },
      faq: {
        desc: (
          <FormattedMessage
            id="ClubLP.Help.faq.content"
            values={{
              val: ru ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                  >
                    часто задаваемые вопросы:
                  </a>
                </DistributeHubLinkOrATag>
              ) : tr ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </DistributeHubLinkOrATag>
              ) : (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                  >
                    FAQ pour
                  </a>
                </DistributeHubLinkOrATag>
              )
            }}
          />
        )
      }
    };
    const lastText = {
      title: <FormattedMessage id="preciseNutrition.Address.title" />,
      fline: <FormattedMessage id="preciseNutrition.Address.firstLine" />,
      sline: <FormattedMessage id="preciseNutrition.Address.secondLine" />,
      tline: <FormattedMessage id="preciseNutrition.Address.thirdLine" />
    };
    const { history, match, location } = this.props;

    const event = {
      page: {
        type: 'Homepage',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

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
        <GoogleTagManager
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <HelpComponentsNew
            firstText={firstText}
            list={list}
            lastText={lastText}
          />
          <Footer />
        </main>
      </div>
    );
  }
}

export default PreciseRecommendation;
