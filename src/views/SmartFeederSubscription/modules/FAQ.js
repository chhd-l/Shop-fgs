import React from 'react';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '../../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
const localItemRoyal = window.__.localItemRoyal;

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      // 当前展开的FAQ
      showCur: -1,
      loading: true
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig({
      pageName: 'FAQ page'
    }).then(res => {
      this.setState({seoConfig: res})
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    window.scrollTo({ top: 0 });
    getFaq({
      language: process.env.REACT_APP_LANG,
      storeId: process.env.REACT_APP_STOREID
    })
      .then((res) => {
        this.setState(
          {
            dataFAQ: res.context,
            loading: false
          },
          () => {
            // const widget = document.querySelector(
            //   `#${this.props.match.params.catogery}`
            // );
            // if (widget) {
            //   setTimeout(() => {
            //     window.scrollTo({ top: widget.offsetTop - 90 });
            //   });
            // }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleSelect(index) {
    if (index === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: index
      });
    }
  }

  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-padding-y--md rc-md-down" />
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none text-center">
                    <div className="rc-full-width rc-padding-x--sm rc- padding-left--none ">
                      <h1
                        className="text-center"
                        className="rc-alpha inherit-fontsize"
                      >
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p className="text-center">
                        <FormattedMessage
                          id="faq.title"
                          values={{
                            val1: (
                              <Link
                                rel="nofollow"
                                className="rc-styled-link ui-cursor-pointer"
                                target="_blank"
                                to="/help"
                                rel="nofollow"
                              >
                                <FormattedMessage id="here" />
                              </Link>
                            )
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <div className="pb-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              </div>
            ) : (
              this.state.dataFAQ.map((pitem, index) => (
                <>
                  <div className="rc-bg-colour--brand3" key={'p-' + index}>
                    <h2
                      name={`catogery-${index}`}
                      id={`catogery-${index}`}
                      className="text-center"
                    >
                      {pitem.faqType}
                    </h2>
                  </div>
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                  >
                    {pitem.storeFaqVo.map((item, index) => (
                      <div
                        key={item.id}
                        className={`rc-list__accordion-item test-color 
                  ${this.state.showCur === index ? 'showItem' : 'hiddenItem'}`}
                      >
                        <div
                          className="rc-list__header"
                          onClick={() => this.handleSelect(index)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: item.question }}
                          ></div>

                          <span
                            className={`icon-change ${
                              this.state.showCur === index
                                ? 'rc-icon rc-up rc-brand1'
                                : 'rc-icon rc-down rc-iconography'
                            }`}
                          ></span>
                        </div>
                        <div className={`rc-list__content `}>
                          <p
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          ></p>
                          <LazyLoad>
                            <img src={item.imgUl} alt="" />
                          </LazyLoad>
                        </div>
                      </div>
                    ))}
                  </dl>
                </>
              ))
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default FAQ;