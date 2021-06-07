import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import BreadCrumbs from '../../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';
import { ADDRESS_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';
import IMask from 'imask';
import Select from 'react-select';

import './index.less';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        cityId: '',
        city: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        postCode: '',
        phoneNumber: '+7 (923) 456 78 90',
        testText: ''
      },
      isValid: false,
      selectedOption: null,
      aaa: '',
      bbb: '11'
    };
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  componentWillUnmount() {}
  componentDidMount() {
    // 设置手机号输入限制
    let element = document.getElementById('testinput111');
    // mask: '+{7} (000) 000-00-00'
    let pval = IMask(element, {
      // mask: '(33) 0 00 00 00 00',
      mask: function (value) {
        console.log(value);
        if (value > 4) {
          return false;
        }
      }
      // mask: /^[1-6]\d{0,5}$/
      // mask: function (value) {
      //   return /^\([3][3]\)[\s][1-9].*$/.test(value)
      // }
      // mask: function (value) {
      //   return /^\d*$/.test(value) &&
      //     value.split('').every(function (ch, i) {
      //       var prevCh = value[i - 1];
      //       return !prevCh || prevCh < ch;
      //     });
      // }
      // prepare: function (str) {
      //   console.log('当前输入的内容: ', str);
      //   return str;
      // }
    });

    document.addEventListener('keyup', (e) => {
      // console.log(e.keyCode);
    });

    // setTimeout(() => {
    //   let elmt = document.getElementById('testinput');
    //   let pval = IMask(element, {
    //     mask: [
    //       {
    //         mask: '(+33) 0 00 00 00 00'
    //       },
    //       {
    //         mask: '(+33) 00 00 00 00 00'
    //       }
    //     ]
    //   });
    // }, 1000);
  }
  validData = async ({ data }) => {
    console.log('------------------- > validData data: ', data);
    try {
      await validData(ADDRESS_RULE, data);
      // this.setState({ isValid: true, form: data }, () => {
      //   this.props.updateFormValidStatus(this.state.isValid);
      // });
      this.setState({ isValid: true, form: data }, () => {
        console.log('------------------- > try isValid: ', this.state.isValid);
      });
    } catch (err) {
      // this.setState({ isValid: false, validationLoading: false }, () => {
      //   this.props.updateFormValidStatus(this.state.isValid);
      // });
      this.setState({ isValid: false }, () => {
        console.log(
          '------------------- > catch isValid: ',
          this.state.isValid
        );
      });
    }
  };
  handleEditFormChange = (data) => {
    this.validData({ data });
  };
  // 确认
  handleClickConfirm = () => {
    const { isValid } = this.state;
  };
  // 文本框输入改变
  inputChange = (e) => {
    const { form } = this.state;
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log('-------->  ', value);

    //   /i : 区分大小写，/g : 全局替换，/ig : 区分大小写且全局替换

    // regExp = /^\(\+[3][3]\)[\s][0-9][\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/;
    // value = value.replace(/(.{4}(?!$))/g, "$1<br/>");

    // console.log(222, '--------- value: ', value);
    // console.log(222, '--------- regExp: ', /^\(\+[3][3]\).*$/.test(value));

    if (!/^\(\+[3][3]\).*$/.test(value)) {
      value = value.replace(/(.{1})/, '(+33) ');
    } else {
      let varr = value.split('');
      if (varr[6]) {
        let element = document.getElementById('testinput');
        let imask = '';
        console.log(varr[6]);
        Number(varr[6]) > 0
          ? (imask = '(+33) 0 00 00 00 00')
          : (imask = '(+33) 00 00 00 00 00');
        let pval = IMask(element, {
          mask: imask
        });
        // pval.destroy();
        // if(Number(varr[6]) > 0){

        // }else{

        // }
      }
    }

    form[name] = value;
    this.setState({ form });
  };
  // 文本框失去焦点
  inputBlur = async (e) => {
    const { form } = this.state;
    const target = e?.target;
    const tname = target?.name;
    const value = target?.type === 'checkbox' ? target?.checked : target?.value;
    form[tname] = value;
    this.setState({ form }, () => {
      // console.log('333333--------- ', tname, ' : ', value);
    });
  };
  // 按回车键
  handleKeyUpConfirm = (e) => {
    // console.log('----------------- keyCode: ', e.keyCode);
    if (e.keyCode === 13) {
    }
  };
  render() {
    const { form, isValid, selectedOption } = this.state;
    return (
      <div style={{ padding: '30px' }}>
        <br />
        <br />
        <h1>0528</h1>
        <br />
        <br />
        <h1>2021-06-07 10:16:12</h1>
        <br />
        <br />
        <h2>{this.state.aaa && this.state.bbb}</h2>
        <br />
        <br />
        phoneNumber111:{' '}
        <input
          className={`rc-input__control testInputShipping`}
          id="testinput"
          type="text"
          name="testinput"
          maxLength="20"
          value={form['testinput']}
          style={{ border: '1px solid #000' }}
          onChange={(e) => this.inputChange(e)}
          onBlur={this.inputBlur}
        />
        <hr />
        <hr />
        phoneNumber222:{' '}
        <input
          className={`rc-input__control testInputShipping`}
          id="testinput111"
          type="text"
          name="testinput111"
          maxLength="20"
          style={{ border: '1px solid #000' }}
          onChange={(e) => this.inputChange(e)}
          onBlur={this.inputBlur}
        />
        <hr />
        <hr />
        <input
          className={`rc-input__control testInputShipping`}
          value={form.firstName}
          id="firstName"
          type="text"
          name="firstName"
          maxLength="18"
          style={{ border: '1px solid #000' }}
          onChange={(e) => this.inputChange(e)}
        />
        <hr />
        {/* <Form
          type="delivery"
          initData={form}
          isLogin={false}
          updateData={this.handleEditFormChange}
        /> */}
        <div className="d-flex justify-content-end mb-2">
          <button
            className="rc-btn rc-btn--one rc-btn--sm"
            onClick={this.handleClickConfirm}
            onKeyDown={(e) => this.handleKeyUpConfirm(e)}
            // disabled={!isValid}
          >
            <FormattedMessage id="clinic.confirm3" />
          </button>
        </div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isMulti
        />
      </div>
    );
  }
}

export default Test;
