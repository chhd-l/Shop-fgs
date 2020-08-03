import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { inject, observer } from 'mobx-react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import "./index.css";
import paymentImg from "./img/payment.jpg";
import Loading from "@/components/Loading";
import PaymentComp from "@/components/PaymentComp"
import { CREDIT_CARD_IMGURL_ENUM } from '@/utils/constant'

@inject("loginStore")
@observer
class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      isAdd: true,
      addressList: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      creditCardInfo: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
      },
      payosdata: {},
      creditCardList: [],
      paymentCompShow: false,
      isAddNewCard: false
    };
  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  
  render () {
    const event = {
      page: {
        type: "Account",
        theme: "",
      },
    };
    const { creditCardInfo, creditCardList, paymentCompShow, isAddNewCard } = this.state;
    return (
      <div>
        <div>
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
                {this.state.loading ? <Loading positionFixed="true" /> : null}
                <SideMenu type="PaymentMethod" />
                <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                  <div className="rc-border-bottom rc-border-colour--interface mb-3">
                    <h4 className="rc-delta rc-margin--none">
                      <FormattedMessage id="paymentMethod"></FormattedMessage>
                    </h4>
                  </div>
                  <div className="content-asset" style={{display: paymentCompShow? 'block': 'none'}}>
                    <PaymentComp noCardCallback={(isZero) => this.setState({paymentCompShow: !isZero})} isAddNewCard={isAddNewCard}/>
                  </div>
                  <div className="content-asset" style={{display: paymentCompShow? 'none': 'block'}}>
                    <div class="rc-layout-container rc-two-column">
                      <div class="rc-column" style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                        <div>
                        <p>
                          You have no saved payment methods. Add your payment information here to speed up checkout. It's easy, private, and secure!
                        </p>
                        <button class="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>Add Payment</button>
                        </div>
                      </div>
                      <div class="rc-column">
                        <img src={paymentImg} style={{width: '100%'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
export default injectIntl(PaymentMethod)