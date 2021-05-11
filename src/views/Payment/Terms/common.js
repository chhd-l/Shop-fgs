// 条款组件
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './index.css';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Consent from '@/components/Consent';

@inject('paymentStore')
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
  //监听土耳其consent
  addEventListenerFunTr() {
    const { setTrConsentModal } = this.props.paymentStore;
    window.onload = () => {
      document.getElementById('tr_consent_a').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTrConsentModal('fullScreenModalA', true);
        //document.getElementById('tr_consent_a').removeEventListener('click',function(){})
      });
      document.getElementById('tr_consent_b').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTrConsentModal('fullScreenModalB', true);
        //document.getElementById('tr_consent_b').removeEventListener('click',function(){})
      });
    };
  }
  componentDidMount() {
    if (process.env.REACT_APP_LANG == 'tr') {
      this.addEventListenerFunTr();
    }

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
    // if(process.env.REACT_APP_COUNTRY=='TR'){
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
        />

        {process.env.REACT_APP_COUNTRY === 'DE' ? (
          <>
            <a style={{ color: '#7F6666', cursor: 'default' }}>
              Mit Klicken des Buttons Kaufen wird Ihre Bestellung verbindlich.
              Weitere Informationen zum Vertragsschluss erhalten Sie in unseren
              allgemeinen{' '}
              <Link
                target="_blank"
                rel="nofollow"
                to="/Terms-And-Conditions "
                className="rc-styled-link"
              >
                Geschäftsbedingungen.
                <span className="warning_blank">Opens a new window</span>
              </Link>
            </a>
            <div style={{ paddingLeft: '0px', marginTop: '1.25rem' }}>
              <a style={{ color: '#7F6666', cursor: 'default' }}>
                Informationen zu Ihrem Widerrufsrecht finden Sie{' '}
                <Link
                  target="_blank"
                  rel="nofollow"
                  to="/Widerrufsbelehrung"
                  className="rc-styled-link"
                >
                  hier
                  <span className="warning_blank">Opens a new window</span>
                </Link>
              </a>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default injectIntl(TermsCommon);
