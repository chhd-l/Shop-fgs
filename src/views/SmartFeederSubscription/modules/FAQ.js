import React from 'react';
import faqJson from './faq.json';
// import { getFaq } from '../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: faqJson.data,
      // 当前展开的FAQ
      showCur: -1,
      // loading: true
      loading: false
    };
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // getFaq({
    //   language: process.env.REACT_APP_LANG,
    //   storeId: process.env.REACT_APP_STOREID
    // })
    //   .then((res) => {
    //     this.setState(
    //       {
    //         dataFAQ: res.context,
    //         loading: false
    //       },
    //       () => {
    //         const widget = document.querySelector(
    //           `#${this.props.match.params.catogery}`
    //         );
    //         if (widget) {
    //           setTimeout(() => {
    //             window.scrollTo({ top: widget.offsetTop - 90 });
    //           });
    //         }
    //       }
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({
    //       loading: false
    //     });
    //   });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleSelect(id) {
    if (id === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: id
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
          <div>
            {/* <div className="rc-bg-colour--brand3">
              <div>
                <div className="rc-padding-y--md rc-md-down" />
                <div className="rc-one-column">
                  <div>
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <h1
                        className="text-center"
                        className="rc-alpha inherit-fontsize"
                      >
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p
                        className="text-center"
                        style={{ marginBottom: '4rem' }}
                      >
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
            </div> */}
            {this.state.loading ? (
              <div className="pb-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              </div>
            ) : (
              this.state.dataFAQ.map((pitem, index) => (
                <>
                  <div
                    className="rc-bg-colour--brand3 rc-margin-y--sm"
                    style={{ marginTop: '3rem' }}
                    key={'p-' + index}
                  >
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
                    // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                  >
                    <div className="experience-region experience-questions">
                      {pitem.storeFaqVo.map((item) => (
                        <div
                          key={item.id}
                          className={`rc-list__accordion-item test-color
                        ${
                          this.state.showCur === item.id
                            ? 'showItem'
                            : 'hiddenItem'
                        }`}
                        >
                          <div
                            className="rc-list__header"
                            onClick={this.handleSelect.bind(this, item.id)}
                            style={{
                              display: 'flex',
                              padding: '1rem 2.5rem 1rem 0.5rem',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.question
                              }}
                            ></div>

                            <span
                              className={`scalemin rc-vertical-align icon-change ${
                                this.state.showCur === item.id
                                  ? 'rc-icon rc-up rc-brand1'
                                  : 'rc-icon rc-down rc-iconography'
                              }`}
                              style={{ right: '9.5rem', height: '28px' }}
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
                    </div>
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
