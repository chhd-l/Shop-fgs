import React from 'react';
import BannerTips from './bannerTips';

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
      <BannerTips />
    ) : null;
  }
}

export default BannerTip;
