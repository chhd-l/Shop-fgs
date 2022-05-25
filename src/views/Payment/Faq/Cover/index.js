import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { faqClickDataLayerPushEvent } from '@/utils/GA';
import './index.css';

const isHubGA = window.__.env.REACT_APP_HUB_GA;

let benifitList = [
  {
    iconCls: 'rc-lock--xs rc-iconography--xs',
    text: <FormattedMessage id="payment.benifit.fullSecurePayment" />
  },
  {
    iconCls: 'rc-loading--xs rc-iconography--xs',
    text: <FormattedMessage id="payment.benifit.satisfactionGuaranteed" />
  },
  {
    iconCls: 'rc-low-maintenance--xs rc-iconography',
    text: <FormattedMessage id="payment.benifit.premiumNutrition" />
  },
  {
    iconCls: 'rc-shop--xs rc-iconography--xs',
    text: <FormattedMessage id="payment.benifit.shopTip" />
  }
];

if (['se', 'jp'].includes(window.__.env.REACT_APP_COUNTRY)) {
  benifitList.pop();
}

class Faq extends Component {
  static defaultProps = {
    faqList: []
  };
  constructor(props) {
    super(props);
    this.state = { activeIdx: -1 };
    this.toggleShow = this.toggleShow.bind(this);
  }
  toggleShow({ idx, item }) {
    const { activeIdx } = this.state;
    let tmpId = idx;
    if (activeIdx === idx) {
      tmpId = -1;
    }
    this.setState({ activeIdx: tmpId }, () => {
      if (isHubGA) {
        const { activeIdx } = this.state;
        faqClickDataLayerPushEvent({
          item: item.gaContext,
          clickType: activeIdx === idx ? 'Expand' : 'Collapse'
        });
      }
    });
  }
  render() {
    const { faqList } = this.props;
    const { activeIdx } = this.state;
    return (
      <>
        <div className="rc-padding-top--md rc-content-v-middle faq-cover">
          <ul className="rc-list rc-list--blank">
            {benifitList.map((item, idx) => (
              <li
                className={`rc-list__item rc-icon rc-margin-bottom--xs ${item.iconCls}`}
                key={idx}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        {faqList.length > 0 ? (
          <>
            <div className="faq-title rc-delta mb-0">
              <FormattedMessage id="footer.FAQ2" />
            </div>
            <dl
              data-toggle-group=""
              data-toggle-effect="rc-expand--vertical"
              className="rc_faq_list"
            >
              {faqList.map((item, idx) => (
                <div
                  className={`rc-list__accordion-item ${
                    activeIdx === idx ? 'active' : ''
                  } ${idx ? '' : 'border-top'}`}
                  key={idx}
                  onClick={this.toggleShow.bind(this, { idx, item })}
                >
                  <dt className="flex items-center justify-between hover:text-rc-red cursor-pointer">
                    <button
                      className={`rc-list__header md:pr-5 ui-after-hidden`}
                      data-toggle={`content-${idx}`}
                      style={{ background: 'inherit' }}
                    >
                      {item.title}
                    </button>
                    <span
                      className={`iconfont ${
                        activeIdx === idx ? 'iconUp' : 'iconDown'
                      }`}
                    />
                  </dt>
                  <dd
                    className="rc-list__content rc-list__content_faq"
                    aria-labelledby={`heading-${idx}`}
                  >
                    <div
                      className="pb-4"
                      dangerouslySetInnerHTML={{ __html: item.context }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </>
    );
  }
}
export default Faq;
