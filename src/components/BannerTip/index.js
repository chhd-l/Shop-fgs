import React from 'react';
import { FormattedMessage } from 'react-intl';

class BannerTip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeVisible: true
    };
    this.hideNotice = this.hideNotice.bind(this);
  }
  hideNotice() {
    this.setState({
      noticeVisible: false
    });
  }
  render() {
    return this.state.noticeVisible &&
      process.env.REACT_APP_SHOW_BANNERTIP === 'true' ? (
      <div className="red font-weight-normal p-1 position-relative text-center pr-4 pl-4 rc-bg-colour--brand4" style={{height: '50px'}}>
        <span
          className="rc-icon rc-close--xs rc-iconography searchBtnToggle rc-stick-right rc-vertical-align"
          style={{ transform: 'translateY(-40%)' }}
          onClick={this.hideNotice}
        ></span>
        {process.env.REACT_APP_IS_PROMOTION === 'true' && (
          <div
            className="text-center"
            style={{ fontSize: '1.15em',fontWeight: '300', marginBottom: '-.4rem' }}
          >
            <span
              className="iconfont mr-2"
              style={{ fontSize: '1.3em' }}
            >
              &#xe675;
            </span>
            <FormattedMessage id="home.promotionTip" />
            {
              process.env.REACT_APP_HOMEPAGE === '/fr'?(<button class="rc-btn rc-btn--sm rc-btn--two" style={{marginLeft: '20px'}} onClick={() => {
                window.location.href = process.env.REACT_APP_ACCESS_PATH + 'subscription-landing'
              }}>En savoir plus</button>): ''
            }
          </div>
        )}
        <FormattedMessage id="home.note1" />{' '}
        <FormattedMessage id="home.note2" />
      </div>
    ) : null;
  }
}

export default BannerTip;
