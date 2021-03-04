import React, { Component, Fragment } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { faqClickDataLayerPushEvent } from "@/utils/GA";
import { Link } from 'react-router-dom';
import './faq.css'

const isHubGA = process.env.REACT_APP_HUB_GA
const FaqItem = [
    { item: 'How to contact customer service', isExpand: false, clickType: 'Collapse' },
    { item: 'Would you like free delivery', isExpand: false, clickType: 'Collapse' },
    { item: 'How secure is my payment information', isExpand: false, clickType: 'Collapse' },
    { item: 'Free return', isExpand: false, clickType: 'Collapse' },
]

class Faq extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    faqItemClick = (index) => {
        if (isHubGA) {
            FaqItem[index].isExpand = !FaqItem[index].isExpand
            FaqItem[index].isExpand ? FaqItem[index]['clickType'] = 'Expand' : FaqItem[index]['clickType'] = 'Collapse'
            faqClickDataLayerPushEvent({ item: FaqItem[index]["item"], clickType: FaqItem[index]["clickType"] })
        }
    }
    render() {
        return (
            <Fragment>
                <div className="fr-faq">
                    <div><span className="icon icon1"></span>100% secure payment</div>
                    <div><span className="icon icon2"></span>Satisfaction guaranteed</div>
                    <div><span className="icon icon3"></span>Premium nutrition</div>
                    <div><span className="icon icon4"></span>Free shipping</div>
                </div>
                <div className="faq-title rc-delta" style={{marginBottom:'0 !important'}}>FAQ</div>
                <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" className="rc_faq_list">
                    <div className="rc-list__accordion-item" style={{ borderTop: 'none' }} onClick={() => this.faqItemClick(0)}>
                        <dt>
                            <button className="rc-list__header" id="heading-73" data-toggle="content-73" style={{ background: '#f6f6f6' }}>
                                <p style={{ width: '280px' }}><FormattedMessage id="checkout.faq.contactCustomer" /> ?</p>
                            </button>
                        </dt>
                        <dd className="rc-list__content" id="content-73" aria-labelledby="heading-73">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>You can reach one of our customer care representatives toll-free at 1-844-673-3772. We’re available Monday through Friday, 8:00 AM – 4:30 PM CT.</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(1)}>
                        <dt>
                            <button className="rc-list__header" id="heading-250" data-toggle="content-250" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.freeDelivery"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content rc_list_content" id="content-250" aria-labelledby="heading-250">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>Royal Canin offers free shipping on all orders. Your package should arrive within 3-5 days.</p>
                            <ul>
                                <li>A message to our valued customers regarding COVID-19: Royal Canin’s top priority is the health and wellness of our Associates, partners, and cats and dogs we serve. While we are doing our best to maintain the level of service you have come to expect, you may experience slight delays. We appreciate your patience during this time.</li>
                            </ul>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(2)}>
                        <dt>
                            <button className="rc-list__header" id="heading-529" data-toggle="content-529" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}>
                                <FormattedMessage id="checkout.faq.paymentInformation" values={{
                                    val: (
                                        <br />
                                    )
                                }} />?
                            </p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-529" aria-labelledby="heading-529">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>Purchases are 100% secure through the Royal Canin checkout process. Our site uses a Secure Sockets Layer (SSL) protocol to encrypt all personal information sent during the checkout process. For more information on how we secure and use your information, please consult our Privacy Policy.</p>
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>We currently accept Visa, Mastercard, American Express and Discover as payment methods.</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(3)}>
                        <dt>
                            <button className="rc-list__header" id="heading-530" data-toggle="content-530" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.FreeReturn"
                            /> ?</p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-530" aria-labelledby="heading-530">
                            <p style={{ padding: '0 1.5rem 1rem 0.5rem' }}>Please see our return policy in our <a href="https://shop.royalcanin.com/terms_conditions.html" target="_blank" rel="nofollow noopener" data-tab-init="true"><span style={{ color: '#6888c9' }}>Terms and Conditions</span></a>&nbsp;or <Link to="/help/contact" target="_blank" ><span style={{ color: '#6888c9' }}>contact us</span></Link> for further assistance.</p>
                        </dd>
                    </div>
                </dl>
            </Fragment>

        )
    }
}
export default Faq