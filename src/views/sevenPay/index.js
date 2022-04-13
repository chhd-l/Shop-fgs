import React from 'react';
import { seoHoc } from '@/framework/common';
// import axios from '@/utils/request';
import { renderScriptOrLinkHtmlStr } from '@/utils/utils';
import Loading from '@/components/Loading';
import qs from 'qs';
import { sevenPayApi } from '@/api/payment';

@seoHoc('sevenPay')
class sevenPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenPayText: '',
      isLoad: false
    };
  }
  componentWillUnmount() {}

  componentDidMount() {
    // let tid=this.props.location.search.location;
    // let tid = 'SIRCFJP000001048' 获取链接问号后面部分的数据，生成一个对象
    const tidObj = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    let tid = tidObj.tid;
    sevenPayApi(tid)
      .then((res) => {
        this.setState({
          sevenPayText: res.context,
          isLoad: true
        });
        renderScriptOrLinkHtmlStr({ htmlStr: res.context });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { sevenPayText, isLoad } = this.state;
    return (
      <>
        <div>
          {isLoad ? null : <Loading bgColor={'#fff'} opacity={1} />}
          <p dangerouslySetInnerHTML={{ __html: sevenPayText }} />
        </div>
      </>
    );
  }
}

export default sevenPay;
