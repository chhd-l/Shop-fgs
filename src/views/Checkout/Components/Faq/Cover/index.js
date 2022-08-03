import React, { Component } from 'react';
import { faqClickDataLayerPushEvent } from '@/utils/GA';
import { FormattedMessage } from 'react-intl-phraseapp';
import cn from 'classnames';
import './index.css';

const isHubGA = window.__.env.REACT_APP_HUB_GA;

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
    return faqList.length > 0 ? (
      <div className="bg-white pb-10 md:pb-20">
        <div className="rc-max-width--md">
          <div className="rc-column">
            <div className="faq-title rc-delta mb-0">
              <FormattedMessage id="footer.FAQ2" />
            </div>
            <dl
              data-toggle-group=""
              data-toggle-effect="rc-expand--vertical"
              className="rc_faq_list grid grid-cols-12 gap-8"
            >
              {faqList.map((item, idx) => (
                <div
                  className={cn(
                    `rc-list__accordion-item col-span-12 md:col-span-6`,
                    {
                      active: activeIdx === idx,
                      'border-top-0': !idx
                    }
                  )}
                  key={idx}
                  onClick={this.toggleShow.bind(this, { idx, item })}
                >
                  <dt className="flex items-center justify-between hover:text-rc-red cursor-pointer">
                    <button
                      className={`rc-list__header md:pr-5 ui-after-hidden py-1.5`}
                      data-toggle={`content-${idx}`}
                      style={{ background: 'inherit' }}
                    >
                      {item.title}
                    </button>
                    <span
                      className={cn(
                        `iconfont`,
                        activeIdx === idx ? 'iconUp' : 'iconDown'
                      )}
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
          </div>
        </div>
      </div>
    ) : null;
  }
}
export default Faq;
