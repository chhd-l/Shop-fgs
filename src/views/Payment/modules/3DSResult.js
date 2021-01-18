import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { adyen3DSResult, Adyen3DSResultParam } from '@/api/payment';
import { inject, observer } from 'mobx-react';
import axios from "axios"
const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore')
@observer
class Adyen3DSResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="checkout--padding"></div>;
  }
  async UNSAFE_componentWillMount() {
    try {
      axios.post(`https://shopstg.royalcanin.com/api/Adyen3DSResult`)
        .then(res => {
          console.log('res=>', res);
        })
      // const result = await Adyen3DSResultParam()
      // console.log({result})
      const res = await adyen3DSResult({
        md: sessionItemRoyal.get('md'),
        paRes: sessionItemRoyal.get('paRes')
      });

      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DSResult);
