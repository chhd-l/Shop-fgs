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
                    <div><span className="icon icon1"></span>100% безопасный платеж</div>
                    <div><span className="icon icon2"></span>Гарантия возврата</div>
                    <div><span className="icon icon3"></span>Премиум качество</div>
                    <div><span className="icon icon4"></span>Бесплатная доставка</div>
                </div>
                <div className="faq-title rc-delta" style={{marginBottom:'0 !important'}}>FAQ</div>
                <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" className="rc_faq_list">
                    <div className="rc-list__accordion-item" style={{ borderTop: 'none' }} onClick={() => this.faqItemClick(0)}>
                        <dt>
                            <button className="rc-list__header" id="heading-73" data-toggle="content-73" style={{ background: '#f6f6f6' }}>
                                <p style={{ width: '280px' }}><FormattedMessage id="checkout.faq.contactCustomer" /></p>
                            </button>
                        </dt>
                        <dd className="rc-list__content" id="content-73" aria-labelledby="heading-73">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>Наши эксперты рады помочь Вам каждый день с 9:00 до 21:00 через форму обратной связи и по телефону 8 800 200 37 35</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(1)}>
                        <dt>
                            <button className="rc-list__header" id="heading-250" data-toggle="content-250" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.freeDelivery"
                            /></p></button>
                        </dt>
                        <dd className="rc-list__content rc_list_content" id="content-250" aria-labelledby="heading-250">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>С условиями доставки Вы можете ознакомиться <a href="https://www.royalcanin.com/ru/about-us/shipment-conditions?_ga=2.27641788.1844098167.1615354817-365708936.1615354813" data-tab-init="true"><u>здесь</u></a></p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(2)}>
                        <dt>
                            <button className="rc-list__header" id="heading-529" data-toggle="content-529" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}>
                                <FormattedMessage id="checkout.faq.paymentInformation" />
                            </p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-529" aria-labelledby="heading-529">
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>ROYAL CANIN гарантирует 100% безопасную онлайн-оплату. Платежная информация защищена с ипользованием технологии SSL.</p>
                            <p style={{ padding: '0 0.5rem 1rem 0' }}>Мы принимаем карты МИР, VISA и Mastercard</p>
                        </dd>
                    </div>
                    <div className="rc-list__accordion-item" onClick={() => this.faqItemClick(3)}>
                        <dt>
                            <button className="rc-list__header" id="heading-530" data-toggle="content-530" style={{ background: '#f6f6f6' }}><p style={{ width: '280px' }}><FormattedMessage
                                id="checkout.faq.FreeReturn"
                            /></p></button>
                        </dt>
                        <dd className="rc-list__content" id="content-530" aria-labelledby="heading-530">
                            <p style={{ padding: '0 1.5rem 1rem 0.5rem' }}><a href="https://www.shop.royal-canin.ru/ru/general-terms-conditions.html#anchor6" data-tab-init="true">С условиями возврата Вы можете ознакомиться здесь</a></p>
                        </dd>
                    </div>
                </dl>
            </Fragment>

        )
    }
}
export default Faq