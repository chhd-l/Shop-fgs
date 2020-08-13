import React from "react";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { getFaq } from "../../api/faq";
import { FormattedMessage } from "react-intl";
import Skeleton from "react-skeleton-loader";
import FAQ1 from "@/assets/images/FAQ1.jpg";
import { translateHtmlCharater } from "@/utils/utils";
import "./index.less";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: [],
      // 当前展开的FAQ
      showCur: -1,
      loading: true,
    };
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    this.getFAQList({
      language: process.env.REACT_APP_LANG,
      storeId: process.env.REACT_APP_STOREID,
    });
  }

  getFAQList (data) {
    getFaq(data)
      .then((res) => {
        this.setState({
          dataFAQ: res.context.storeFaqVo,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSelect (index) {
    if (index == this.state.showCur) {
      this.setState({
        showCur: -1,
      });
    } else {
      this.setState({
        showCur: index,
      });
    }
  }

  render (h) {
    const event = {
      page: {
        type: "Content",
        theme: "",
      },
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            style={{ maxWidth: "70%" }}
          >
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h1 style={{ textAlign: "center" }}>
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p style={{ textAlign: "center" }}>
                        <FormattedMessage id="faq.title" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rc-bg-colour--brand3">
              <h2>
                <FormattedMessage id="faq.title2" />
              </h2>
            </div>

            <dl
              data-toggle-group=""
              data-toggle-effect="rc-expand--vertical"
              className=""
            >
              {this.state.loading ? (
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
              ) : (
                  this.state.dataFAQ.map((item, index) => (
                    <div
                      key={item.id}
                      className={`rc-list__accordion-item test-color 
                  ${this.state.showCur == index ? "showItem" : "hiddenItem"}`}
                    >
                      <div
                        className="rc-list__header"
                        onClick={() => this.handleSelect(index)}
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.question }}
                        ></div>

                        <span
                          className={`icon-change ${
                            this.state.showCur == index
                              ? "rc-icon rc-up rc-brand1"
                              : "rc-icon rc-down rc-iconography"
                            }`}
                        ></span>
                      </div>
                      <div className={`rc-list__content `}>
                        <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                        <img src={item.imgUl}></img>
                      </div>
                    </div>
                  ))
                )}
            </dl>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default FAQ;
