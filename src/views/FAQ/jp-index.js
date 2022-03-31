import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '@/api/staticPageApi';
import { FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import BreadCrumbs from '@/components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { seoHoc } from '@/framework/common';
import { funcUrl } from '@/lib/url-utils';
import './index.less';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

@seoHoc('FAQ page')
class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: [],
      // 当前展开的FAQ
      showCur: -1,
      loading: true
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillUnmount() {}
  componentDidMount() {
    window.scrollTo({ top: 0 });
    getFaq()
      .then((res) => {
        // console.log('arr:', this.getitems(res.context));
        const arr = this.getitems(res.context);
        this.setState(
          {
            dataFAQ: arr,
            loading: false
          },
          () => {
            const catogeryType = funcUrl({ name: 'type' });
            const { state } = this.props.history.location;
            const widget =
              document.querySelector(`#${state?.catogery}`) ||
              document.querySelector(`#${catogeryType}`);
            if (widget) {
              setTimeout(() => {
                window.scrollTo({ top: widget.offsetTop - 90 });
              });
            }
            console.log(document.getElementById('aaa'));
            // 锚点跳转
            document.getElementById('4652-x').addEventListener('click', (e) => {
              console.log('e', e.target.dataset.id);
              this.scrollToAnchor(e.target.dataset.id + '');
            });
            document.getElementById('4649-x').addEventListener('click', (e) => {
              console.log('e', e.target.dataset.id);
              this.scrollToAnchor(e.target.dataset.id + '');
            });
            document.getElementById('4609-x').addEventListener('click', (e) => {
              console.log('e', e.target.dataset.id);
              this.scrollToAnchor(e.target.dataset.id + '');
            });
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
  // 分类
  getitems(arr) {
    const newArr = arr.map((item) => {
      const arr2 = [...new Set(item.storeFaqVo.map((item) => item.subType))];
      item.childrens = [];
      arr2.forEach((it) => {
        const arr3 = item.storeFaqVo.filter((items) => it === items.subType);
        item.childrens.push({ type: it, items: arr3 });
      });
      return item;
    });

    return newArr;
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleSelect(id) {
    // debugger;
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
  scrollToAnchor(anchorName) {
    console.log('anchorName', anchorName);
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        console.log('anchorElement', anchorElement);
        // debugger;
        anchorElement.scrollIntoViewIfNeeded();
        // anchorElement.scrollIntoView(false);
        this.handleSelect(anchorName - 0);
        // anchorElement.offsetTop = 433 + 'px';
      }
    }
  }

  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: 'Brand',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          {/* <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"> */}
          <div
          // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
          >
            <div className="rc-bg-colour--brand3">
              <div>
                <div className="rc-padding-y--md rc-md-down" />
                <div className="rc-one-column rc-padding-x--md--mobile">
                  <div>
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <h1 className="text-left md:text-center rc-alpha text-22 leading-7 md:text-30 md:leading-10  font-semibold">
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p
                        className="rc-alpha md:text-center text-left text-20 leading-7 font-medium mt-0 md:mt-4r md:text-26 md:leading-56"
                        style={{ fontSize: 'large' }}
                      >
                        <FormattedMessage id="faq.title" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-920 m-auto pl-4 pr-4">
              <h1 className="font-semibold text-16 leading-26 mb-4 md:text-26  text-primary-gray">
                よくあるお問合せ
              </h1>
              <p className="text-primary-gray text-18 leading-26">
                配送について <br />
                お支払について <br />
                返品・交換について <br />
                ポイントプログラムについて <br />
                定期購入について <br />
              </p>
            </div>
            <div className="md:w-920 m-auto md:mt-80 pl-4 pr-4">
              <h1 className="font-semibold  text-20 leading-26 md:text-26 mt-14 md:mt-64 md:leading-26 text-primary-gray">
                ショッピングに関するご利用ガイド
              </h1>
            </div>
            {this.state.loading ? (
              <div className="pb-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              </div>
            ) : (
              this.state.dataFAQ.map((pitem, index) => (
                <div className="md:w-920 m-auto pl-4 pr-4">
                  <div
                    className="rc-bg-colour--brand3 mt-4 md:mt-8"
                    key={'p-' + index}
                  >
                    <h2
                      name={`catogery-${index}`}
                      id={`catogery-${index}`}
                      className={`text-primary-gray md:font-medium font-semibold text-18 md:text-20 leading-26 ${
                        index === 0 ? '' : 'mt-20'
                      }`}
                    >
                      {pitem.faqType}
                    </h2>
                  </div>
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    className=""
                  >
                    <div className="experience-region experience-questions">
                      {pitem.childrens.map((it, index) => (
                        <>
                          <div
                            className={`topBotBorder  md:pb-10 md:font-medium font-semibold text-18  leading-26 text-primary-gray ${
                              index === 0
                                ? 'pb-8 md:pb-16'
                                : 'pb-4 md:leading-60 pt-10 topBotBorder'
                            }`}
                          >
                            {it.type}
                          </div>
                          {it.items.map((item) => (
                            <div
                              key={item.id}
                              id={item.id}
                              className={`rc-list__accordion-item test-color
                      ${
                        this.state.showCur === item.id
                          ? 'showItem'
                          : 'hiddenItem'
                      }`}
                            >
                              <div
                                className="rc-list__header"
                                // id={item.id}
                                onClick={this.handleSelect.bind(this, item.id)}
                                style={{
                                  display: 'flex',
                                  padding: '2rem 2.5rem 2rem 0.5rem',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <div
                                  className={`font-medium text-16 leading-6 md:text-18 md:leading-60 ${
                                    this.state.showCur === item.id
                                      ? 'text-primary'
                                      : 'text-primary-gray'
                                  }`}
                                  dangerouslySetInnerHTML={{
                                    __html: item.question
                                  }}
                                />
                                {this.state.showCur === item.id ? (
                                  <span
                                    className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                    style={{ right: '1rem', height: '28px' }}
                                  >
                                    &#xe604;
                                  </span>
                                ) : (
                                  <span
                                    className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                    style={{ right: '1rem', height: '28px' }}
                                  >
                                    &#xe60f;
                                  </span>
                                )}
                              </div>
                              <div className={`rc-list__content `}>
                                <p
                                  className="text-primary-gray text-16 leading-6 md:text-18 md:leading-34 md:mb-10"
                                  dangerouslySetInnerHTML={{
                                    __html: item.answer
                                  }}
                                />
                                {item.imgUl ? (
                                  <LazyLoad>
                                    <img
                                      src={item.imgUl}
                                      alt="storeFaq image"
                                    />
                                  </LazyLoad>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </>
                      ))}
                      {/* {pitem.storeFaqVo.map((item) => (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`rc-list__accordion-item test-color
                        ${
                          this.state.showCur === item.id
                            ? 'showItem'
                            : 'hiddenItem'
                        }`}
                        >
                          <div
                            className="rc-list__header"
                            // id={item.id}
                            onClick={this.handleSelect.bind(this, item.id)}
                            style={{
                              display: 'flex',
                              padding: '2rem 2.5rem 2rem 0.5rem',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div
                              className={`font-medium md:text-18 md:leading-60 ${
                                this.state.showCur === item.id
                                  ? 'text-primary'
                                  : 'text-primary-gray'
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: item.question
                              }}
                            />
                            {this.state.showCur === item.id ? (
                              <span
                                className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe604;
                              </span>
                            ) : (
                              <span
                                className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe60f;
                              </span>
                            )}
                          </div>
                          <div className={`rc-list__content `}>
                            <p
                              className="text-primary-gray md:text-18 md:leading-34 md:mb-10"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                            {item.imgUl ? (
                              <LazyLoad>
                                <img src={item.imgUl} alt="storeFaq image" />
                              </LazyLoad>
                            ) : null}
                          </div>
                        </div>
                      ))} */}
                    </div>
                  </dl>
                </div>
              ))
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default FAQ;
