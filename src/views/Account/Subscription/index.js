import React from "react";
import Skeleton from "react-skeleton-loader";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import Selection from "@/components/Selection";
import Pagination from "@/components/Pagination";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { getSubList } from "@/api/subscription"
import { getDictionary } from "@/utils/utils";
import { IMG_DEFAULT } from "@/utils/constant";
import "./index.css";

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      subList: [],
      form: {
        subscribeId: "",
        subscribeStatus: "0"
      },
      loading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: "",
      subList: [],
      frequencyList: [],
      subStatus: [
        { value: '', name: <FormattedMessage id="all" /> },
        { value: '0', name: <FormattedMessage id="active" values={{ val: 0 }} /> },
        { value: '2', name: <FormattedMessage id="inactive" values={{ val: 2 }} /> }
      ]
    };
    this.pageSize = 6;
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
    getDictionary({ type: "Frequency" }).then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    this.getSubList();
  }

  handleInputChange (e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSubList();
    }, 500);
  }

  hanldeStatusChange (data) {
    const { form } = this.state
    form.subscribeStatus = data.value
    this.setState({
      form: form,
      currentPage: 1
    }, () => this.getSubList())
  }

  getSubList () {
    const { form, initing, currentPage } = this.state;
    if (!initing) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 0);
    }

    this.setState({ loading: true })
    let param = {
      pageNum: currentPage - 1,
      pageSize: this.pageSize,
      subscribeId: form.subscribeId,
      subscribeStatus: form.subscribeStatus,
      // customerAccount: JSON.parse(localStorage.getItem('rc-userinfo'))['customerAccount']
    }
    getSubList(param)
      .then((res) => {
        this.setState({
          subList: res.context.subscriptionResponses,
          loading: false,
          initing: false,
          currentPage: res.context.currentPage + 1,
          totalPage: Math.ceil(res.context.total / this.pageSize)
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          loading: false,
          initing: false
        })
      });
  }

  hanldePageNumChange (params) {
    this.setState(
      {
        currentPage: params.currentPage,
      },
      () => this.getSubList()
    );
  }

  render () {
    const event = {
      page: {
        type: "Account",
        theme: "",
      },
    };
    return (
      <div className="subscription">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Subscription" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none pb-2">
                    <FormattedMessage id="subscription" />
                  </h4>
                </div>
                <div className="row justify-content-around">
                  <div className="col-12 col-md-6 row align-items-center mt-2 mt-md-0">
                    <div className="col-md-4">
                      <FormattedMessage id="subscription.number" />
                    </div>
                    <div className="col-md-8">
                      <span className="rc-input rc-input--inline rc-full-width">
                        <FormattedMessage id="subscription.subscriptionNumberTip" >
                          {
                            txt => (
                              <input
                                className="rc-input__control"
                                id="id-text8"
                                type="text"
                                name="subscribeId"
                                maxLength="20"
                                value={this.state.form.subscribeId}
                                onChange={(e) => this.handleInputChange(e)}
                                placeholder={txt}
                              />
                            )
                          }
                        </FormattedMessage>
                        <label className="rc-input__label" htmlFor="id-text8">
                          {/* <span className="rc-input__label-text">
                            <FormattedMessage id="subscription.subscriptionNumberTip" />
                          </span> */}
                        </label>
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 row align-items-center mt-2 mt-md-0">
                    <div className="col-md-4">
                      {/* Subscription status */}
                      <FormattedMessage id="subscription.status" />
                    </div>
                    <div className="col-md-8">
                      <Selection
                        optionList={this.state.subStatus}
                        selectedItemChange={el => this.hanldeStatusChange(el)}
                        selectedItemData={{
                          value: this.state.form.subscribeStatus
                        }}
                        customStyleType="select-one" />
                    </div>
                  </div>
                </div>
                <div className="order__listing">
                  <div className="order-list-container">
                    {this.state.loading ? (
                      <div className="mt-4">
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={4}
                        />
                      </div>
                    ) : this.state.errMsg ? (
                      <div className="text-center mt-5">
                        <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                        {this.state.errMsg}
                      </div>
                    ) : this.state.subList.length ? (
                      <>
                        {this.state.subList.map((subItem, i) => (
                          <div className="card-container" key={subItem.subscribeId}>
                            <div className="card rc-margin-y--none ml-0">
                              <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0">
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="subscription.product" />
                                    <br className="d-none d-md-block" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="subscription.number" />
                                    <br className="d-none d-md-block" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="subscription.date" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="subscription.frequency" />
                                    <br className="d-none d-md-block" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-2">
                                  <p><FormattedMessage id="subscription.status" /></p>
                                </div>

                                <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                  <Link
                                    className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                    onClick={() => localStorage.setItem('subDetail', JSON.stringify(subItem))}
                                    to={`/account/subscription-detail/${subItem.subscribeId}`}
                                  >
                                    <span className="medium pull-right--desktop rc-styled-link">
                                      <FormattedMessage id="subscription.detail" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row rc-margin-x--none row align-items-center"
                              style={{ padding: "1rem 0" }}
                            >
                              <div className="col-12 col-md-2 d-flex flex-wrap">
                                {subItem.goodsInfo && subItem.goodsInfo.map((item) => (
                                  <img
                                    className="img-fluid"
                                    key={item.spuId}
                                    src={item.goodsPic || IMG_DEFAULT}
                                    alt={item.goodsName}
                                    title={item.goodsName}
                                  />
                                ))}
                              </div>
                              <div className="col-12 col-md-2">
                                {subItem.subscribeId}
                              </div>
                              <div className="col-12 col-md-2">{subItem.createTime.split(' ')[0]}</div>
                              <div className="col-12 col-md-2">
                                {subItem.frequency}
                              </div>
                              <div className="col-12 col-md-2">{subItem.subscribeStatus === '0' ? <FormattedMessage id="active" /> : <FormattedMessage id="inactive" />}</div>
                              {/* <div className="col-12 col-md-2"># {i + 1}</div> */}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                            <div className="text-center mt-5">
                              <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                              <FormattedMessage id="subscription.noDataTip" />
                            </div>
                          )}
                    {
                      !this.state.errMsg && this.state.subList.length
                        ? <div className="grid-footer rc-full-width mt-2">
                          <Pagination
                            loading={this.state.loading}
                            totalPage={this.state.totalPage}
                            currentPage={this.state.currentPage}
                            onPageNumChange={(params) =>
                              this.hanldePageNumChange(params)
                            }
                          />
                        </div>
                        : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Subscription)