// 条款组件
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import './index.css';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Consent from '@/components/Consent';
import { addEventListenerArr } from './addEventListener';

@inject('paymentStore', 'loginStore')
class TermsCommon extends Component {
  static defaultProps = {
    updateValidStatus: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidUpdate() {
    if (window.__.env.REACT_APP_COUNTRY == 'tr') {
      this.addEventListenerFunTr();
    }
  }
  addEventListenerFunTr() {
    const { setTrConsentModal } = this.props.paymentStore;
    for (let i = 0; i < addEventListenerArr.length; i++) {
      document
        .getElementById(addEventListenerArr[i].id)
        ?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          setTrConsentModal(addEventListenerArr[i].modal, true);
        });
    }
  }
  componentDidMount() {
    document
      .getElementById(`${this.props.id}`)
      .addEventListener('click', (e) => {
        if (e.target.localName === 'font') {
          let keyWords = e.target.innerText;
          let index = Number(
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.id
          );
          let arr = this.state.list[index].detailList.filter((item) => {
            return item.contentTitle === keyWords;
          });

          let tempArr = [...this.state.list];
          tempArr[index].innerHtml = tempArr[index].innerHtml
            ? ''
            : arr[0]
            ? arr[0].contentBody
            : '';

          this.setState({ list: tempArr });
        }
      });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        list: nextProps.listData
      },
      () => {
        // this.valid();
      }
    );
  }
  valid() {
    this.props.updateValidStatus(
      this.state.list
        .filter((ele) => ele.isRequired)
        .every((el) => el.isChecked)
    );
  }
  //从子组件传回
  sendList = (list) => {
    // if(window.__.env.REACT_APP_COUNTRY=='tr'){
    //   list.forEach((item)=>{
    //     if(item.id=='tr_A'){
    //       if(item.isChecked){
    //         item.consentTitle ='Mesafeli ön satış bilgilendirme formunu okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline" id="tr_consent_a">Formu incele</span></span><br/><span style="color:#C03344">Bu alan gereklidir.'
    //       }else{
    //         item.consentTitle ='Mesafeli ön satış bilgilendirme formunu okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline" id="tr_consent_a">Formu incele</span></span>'
    //       }
    //     }
    //     if(item.id=='tr_B'){
    //       if(item.isChecked){
    //         item.consentTitle ='Mesafeli satış sözleşmesini okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline" id="tr_consent_b">Formu incele</span></span><br/><span style="color:#C03344">Bu alan gereklidir.'
    //       }else{
    //         item.consentTitle ='Mesafeli satış sözleşmesini okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline" id="tr_consent_b">Formu incele</span></span>'
    //       }
    //     }
    //   })
    // }

    this.setState({ list }, () => {
      this.valid();
    });
  };
  render() {
    return (
      <div
        className="required-wrap text-break"
        id={`${this.props.id}`}
        style={{ marginTop: '.625rem', marginLeft: '25px' }}
      >
        {/* checkbox组 */}
        <Consent
          list={this.state.list}
          sendList={this.sendList}
          key="payment"
          id={this.props.id}
          pageType="checkout"
          isLogin={this.props.loginStore.isLogin}
        />
      </div>
    );
  }
}

export default injectIntl(TermsCommon);
