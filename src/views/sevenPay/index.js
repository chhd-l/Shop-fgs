import React from 'react';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
// import axios from '@/utils/request';
import { renderScriptOrLinkHtmlStr } from '@/utils/utils';
import axios from 'axios';
import Loading from '@/components/Loading';

import { sevenPayApi } from '@/api/payment';

@seoHoc('sevenPay')
class sevenPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenPaytext: ''
    };
  }
  componentWillUnmount() {}

  componentDidMount() {
    //   var url = 'https://shopsit.royalcanin.com/api/pay/voucher/SIRCFJP000001048';    // 设置请求的地址
    //   axios.get(url)
    //   // axios({
    //   //   url: 'https://shopsit.royalcanin.com/api/pay/voucher/123',
    //   //   method:'GET',
    //   //   params: {},
    //   // })
    //   .then(res => {
    //   console.log(res.data.context)
    //   this.setState({
    //     sevenPaytext: res.data.context
    //   }
    //   )
    //   renderScriptOrLinkHtmlStr({ htmlStr: res.data.context })
    // }).catch((err) => {
    //   console.log(err)
    // })

    sevenPayApi()
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        // console.log(res.context)
        this.setState({
          sevenPaytext: res.context
        });
        renderScriptOrLinkHtmlStr({ htmlStr: res.context });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { sevenPaytext } = this.state;

    return (
      <>
        <div>
          {/* <h1>sevenPay</h1> */}
          <Loading bgColor={'#fff'} opacity={1} />
          <p dangerouslySetInnerHTML={{ __html: sevenPaytext }} />
          {/* <p>{{sevenPaytext}}</p> */}
        </div>
      </>
    );
  }
}

export default sevenPay;
