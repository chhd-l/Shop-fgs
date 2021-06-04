import React from 'react';
import { bannerTips } from './bannerTips';

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
      process.env.REACT_APP_SHOW_BANNERTIP === 'true'
      ? bannerTips()
      : null;
  }
}

export default BannerTip;
