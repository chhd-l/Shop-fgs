import React from 'react'
import { FormattedMessage } from 'react-intl'

class BannerTip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeVisible: true
    }
    this.hideNotice = this.hideNotice.bind(this)
  }
  hideNotice () {
    this.setState({
      noticeVisible: false
    })
  }
  render () {
    return (this.state.noticeVisible
      ? <div className="red font-weight-normal p-1 position-relative text-center pr-4 pl-4" style={{ background: '#f6f6f6' }}>
        <span
          className="rc-icon rc-close--xs rc-iconography searchBtnToggle rc-stick-right rc-vertical-align"
          style={{ transform: 'translateY(-40%)' }} onClick={this.hideNotice}></span>
        <div className="text-center" style={{ fontSize: '1.15em', marginBottom: '-.4rem' }}>
          <span className="rc-icon rc-refresh--xs rc-brand1"></span>
          <FormattedMessage id="home.promotionTip" />
        </div>
        <FormattedMessage id="home.note1" />{' '}
        <FormattedMessage id="home.note2" />
      </div>
      : null)
  }
}

export default BannerTip
