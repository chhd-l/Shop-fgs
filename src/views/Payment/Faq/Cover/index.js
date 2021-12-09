import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { faqClickDataLayerPushEvent } from '@/utils/GA';
import './index.css';

const isHubGA = window.__.env.REACT_APP_HUB_GA;

class Faq extends Component {
  static defaultProps = {
    benifitList: [],
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
    const { benifitList, faqList } = this.props;
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
              <dt>
                <button
                  className={`rc-list__header md:pr-5 ${
                    activeIdx === idx ? 'rc-icon--rotate' : ''
                  }`}
                  data-toggle={`content-${idx}`}
                  style={{ background: '#f6f6f6' }}
                >
                  {item.title}
                </button>
              </dt>
              <dd
                className="rc-list__content rc-list__content_faq"
                aria-labelledby={`heading-${idx}`}
                dangerouslySetInnerHTML={{ __html: item.context }}
              />
            </div>
          ))}
        </dl>
      </>
    );
  }
}
export default Faq;
