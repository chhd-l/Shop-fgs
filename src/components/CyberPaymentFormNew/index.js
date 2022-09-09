import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Selection from '@/components/Selection';
import jwt_decode from 'jwt-decode';
import { loadJS, dynamicLoadCss } from '@/utils/utils';
import './index.less';
import {
  usGuestPaymentInfo,
  usPaymentInfo,
  usPayCardSubscription,
  usGuestPayCardSubscription,
  cyberClient
} from '@/api/payment';

const monthList = [
  { name: 'month', value: '' },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 }
];
// Array.from({ length: 12 }).map((item, i) => {
//   return {
//     label: <FormattedMessage id="xMonths" values={{ val: i }} />,
//     key: i.toString(),
//     value: i
//   };
// }),

const yearList = [
  { name: 'year', value: '' },
  { name: '2021', value: 2021 },
  { name: '2022', value: 2022 },
  { name: '2023', value: 2023 },
  { name: '2024', value: 2024 },
  { name: '2025', value: 2025 },
  { name: '2026', value: 2026 },
  { name: '2027', value: 2027 },
  { name: '2028', value: 2028 },
  { name: '2029', value: 2029 },
  { name: '2030', value: 2030 }
];

@inject('paymentStore', 'loginStore')
@observer
class CyberPaymentForm extends React.Component {
  static defaultProps = {
    cyberFormTitle: {
      cardHolderName: 'cyber.form.cardHolderName',
      cardNumber: 'cyber.form.cardNumber',
      EXPMonth: 'cyber.form.EXPMonth',
      EXPYear: 'cyber.form.EXPYear',
      secureCode: 'cyber.form.secureCode'
    },
    setCyberLoading: () => {},
    curPayWayInfo: {},
    CyberSaveCardCheckboxJSX: null,
    billingJSX: null,
    securityCodeTipsJSX: null,
    backToSavedPaymentsJSX: null,
    form: {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    },
    errMsgObj: {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      microform: null
    };
    this.microform = null;
    this.flexresponse = '';
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  componentDidMount() {
    console.info('..........===', this.isLogin);
    if (this.isLogin) {
      loadJS({
        url: 'https://flex.cybersource.com/cybersource/assets/microform/0.11/flex-microform.min.js',
        callback: () => {
          this.initCyberClient();
        }
      });
    }
  }
  // 监听变化
  // 初始化 MicroForm 支付表单
  initCyberClient = async () => {
    let pspItemId = this.props.curPayWayInfo?.id;
    if (!pspItemId) {
      return;
    }
    let { context } = await cyberClient(pspItemId);
    console.info('...', context);
    // let context = `eyJraWQiOiJ6dSIsImFsZyI6IlJTMjU2In0.eyJmbHgiOnsicGF0aCI6Ii9mbGV4L3YyL3Rva2VucyIsImRhdGEiOiIxenFFYmFJcTVHOU9YVFVRSFRVRUtSQUFFUFhqc25wK292dUJlcWhodng3TXBGUTJjTUp2cXo2cHlTelVOdmJSV0d4UlRYclpZVkhZSUFUbWkwL2t0dU1ZTVdEa2VyMWNwdVJIZzh0MUxtazFCNUlcdTAwM2QiLCJvcmlnaW4iOiJodHRwczovL3Rlc3RmbGV4LmN5YmVyc291cmNlLmNvbSIsImp3ayI6eyJrdHkiOiJSU0EiLCJlIjoiQVFBQiIsInVzZSI6ImVuYyIsIm4iOiJ1QU5NeFpTeTEtbkEzeTUzN1ctTFNJR0JNOGZXYmU5dkdxdy1LNWRiSTl0dkJhdkFLakVlSGVvTXFTTGtocXJwX0RRY0p4MUowWEN0VGlISVZ2QU5jODdOZ2FQQU1EbTdsQnBBdmVQdU1RaWREOVVfUEctQnQ2YXNrR0NBTS1DeUQ5aHhNNUZyYjhxcmtZVjhaT1pYNV84cWhZNE93dXJRRG9XdE5WaTJwYVQxem9HVnZ3RDZ2TmdERUt1RXZvdmtJOHV5Y1pqWWdtUTgxU2FzWncwWEJVcEtvQ291LXlabS1KSVk3MEFTaVpXMElNOHozdm1USlA0UUZIcHlBeEU1ZUNRNmFDeFZGYTF0N05teld6bHA1M19wd3ZEaEVtQS1vUVBPYnBFQlIxUklYOEdUQnJYVmc3eVdpZl9UUDZDV0hEOFFfQnh6bXpoVnRCTXNDcHRpbHciLCJraWQiOiIwOEFUWVFNZ0Y2dGNnZzQ3Q3d0SU9uazZXUm5KZGhNYiJ9fSwiY3R4IjpbeyJkYXRhIjp7InRhcmdldE9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sIm1mT3JpZ2luIjoiaHR0cHM6Ly90ZXN0ZmxleC5jeWJlcnNvdXJjZS5jb20ifSwidHlwZSI6Im1mLTAuMTEuMCJ9XSwiaXNzIjoiRmxleCBBUEkiLCJleHAiOjE2NjI2MjU3NTcsImlhdCI6MTY2MjYyNDg1NywianRpIjoiR3B5UmZONERuUjZtQ3lraCJ9.LSXZ_NlbLOmXTNXgngqiKkwIF1dt1d0o0_4lPfVz_GztW4MT5AOiXBqppkMKbEO8Q5YAgOuBOhtzbg0wWuzGgstbV9fZAQQpTra9lYwDo2ONpwIp8q-ldvuTUhwO3n1x5_H2wWB3RqZeiCbI2NsHJomr_HJ4mokHlsiSF1f_kxKspnXB23Vt28TPGjfC472oyHU6f2-8w1ZiVWdotr6hBYbEnYBFW4aTcdpfdHKLYS3uhaSy1g8PtRMYlj3gdWMQGJEUlS0xqEqerqajARJbJt5oK__jo9OaJqmPgA5b8Mv3ATzMitYJ4R5kkywdj2ZDCAT6dSJAcptwzcoACyglzQ`
    var captureContext = context;

    // custom styles that will be applied to each field we create using Microform
    var myStyles = {
      input: {
        'font-size': '16px',
        'font-family':
          "'RC TYPE', Roboto, Avenir, Helvetica, Arial,'sans-serif'",
        color: '#000'
      },
      // ':focus': { color: 'blue' },
      ':disabled': { cursor: 'not-allowed' }
      // valid: { color: '#3c763d' },
      // invalid: { color: '#a94442' }
    };
    let that = this;
    // setup
    // @ts-ignore
    // eslint-disable-next-line no-undef
    var flex = new Flex(captureContext);
    var microform = flex.microform({ styles: myStyles });
    this.microform = microform;
    var number = microform.createField('number', {
      placeholder: ''
    });
    var securityCode = microform.createField('securityCode', {
      placeholder: ''
    });

    number.load('#number-container');
    number.on('change', (data) => {
      let mockVal = '';
      if (data.empty) {
        mockVal = '';
      } else {
        mockVal = 'xx';
      }
      if (data.valid) {
        mockVal = '4111111111111111';
      } else {
        mockVal = 'xx';
      }
      this.props.form.cardNumber = mockVal;
      this.onChange({
        target: {
          name: 'cardNumber',
          value: mockVal,
          cybsCardType: data.card?.[0]?.cybsCardType
        }
      });
      // this.props.handleSelectedItemChange('expirationMonth', data)
      console.log(data);
    });
    securityCode.load('#securityCode-container');
    securityCode.on('change', (data) => {
      console.log(data);
      let mockVal = '';
      if (data.empty) {
        mockVal = '';
      } else {
        mockVal = 'x';
      }
      if (data.valid) {
        mockVal = 'xxx';
      } else {
        mockVal = 'x';
      }
      this.props.form.securityCode = mockVal;
      this.onChange({ target: { name: 'securityCode', value: mockVal } });
    });
  };
  cyberTokenGet = (cb) => {
    if (!this.microform) {
      return;
    }
    const {
      cardholderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      securityCode
    } = this.props.form;
    var options = {
      expirationMonth: (expirationMonth < 10 ? '0' : '') + expirationMonth, //处理格式化日期02
      expirationYear: expirationYear?.toString()
      // expirationMonth: document.querySelector('#expMonth').value,
      // expirationYear: document.querySelector('#expYear').value
    };
    console.info(this.props.form, options, 'this.props.formthis.props.form');
    let that = this;
    console.info(
      cardholderName,
      expirationMonth,
      expirationYear,
      cardNumber.length >= 16,
      securityCode.length >= 3,
      '...........'
    );
    this.microform.createToken(options, function (err, token) {
      if (err) {
        // handle error
        console.error(err);
        that.flexresponse = '';
        throw new Error(err.message);
        // errorsOutput.textContent = err.message;
      } else {
        console.log(JSON.stringify(token), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        that.flexresponse = token;
        let decodedCardInfo = jwt_decode(token);
        console.info('decodedCardInfo', decodedCardInfo);
        cb && cb(decodedCardInfo.data);
      }
    });
  };
  // 监听事件变化
  onChange = async (e, type = 'input', name) => {
    if (!this.microform) {
      return;
    }
    if (type == 'input') {
      this.props.handleInputChange(e);
    }
    if (type == 'select') {
      // e就是data
      this.props.handleSelectedItemChange(name, e);
    }
    // const {
    //   cardholderName,
    //   cardNumber,
    //   expirationMonth,
    //   expirationYear,
    //   securityCode
    // } = this.props.form;
    // var options = {
    //   expirationMonth: (expirationMonth < 10 ? '0' : '') + expirationMonth, //处理格式化日期02
    //   expirationYear: expirationYear?.toString()
    //   // expirationMonth: document.querySelector('#expMonth').value,
    //   // expirationYear: document.querySelector('#expYear').value
    // };
    // console.info(this.props.form, options, 'this.props.formthis.props.form');
    // let that = this;
    // console.info(
    //   cardholderName,
    //   expirationMonth,
    //   expirationYear,
    //   cardNumber.length >= 16,
    //   securityCode.length >= 3,
    //   '...........'
    // );
    // if (
    //   cardholderName &&
    //   expirationMonth &&
    //   expirationYear &&
    //   cardNumber.length >= 16 &&
    //   securityCode.length >= 3
    // ) {
    //   this.props.setCyberLoading();
    //   this.microform.createToken(options, function (err, token) {
    //     if (err) {
    //       // handle error
    //       console.error(err);
    //       that.flexresponse = '';
    //       // throw new Error(err.message);
    //       // errorsOutput.textContent = err.message;
    //     } else {
    //       console.log(JSON.stringify(token), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //       that.flexresponse = token;
    //     }
    //     if (type == 'input') {
    //       that.props.handleInputChange(e);
    //     }
    //     if (type == 'select') {
    //       // e就是data
    //       that.props.handleSelectedItemChange(name, e);
    //     }
    //     // At this point you may pass the token back to your server as you wish.
    //     // In this example we append a hidden input to the form and submit it.
    //   });
    // } else {
    //   if (type == 'input') {
    //     this.props.handleInputChange(e);
    //   }
    //   if (type == 'select') {
    //     // e就是data
    //     this.props.handleSelectedItemChange(name, e);
    //   }
    // }
  };
  //游客绑卡
  usGuestPaymentInfoEvent = async (params) => {
    try {
      const res = await usGuestPaymentInfo(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //会员绑卡
  usPaymentInfoEvent = async (params) => {
    try {
      let decodedCardInfo = jwt_decode(this.flexresponse);
      console.info('decodedCardInfo', decodedCardInfo);
      let { expirationYear, number, expirationMonth, type } =
        decodedCardInfo.data;
      const newParams = Object.assign({}, params, {
        expirationYear,
        expirationMonth,
        cardNumber: number,
        cardTypeValue: type
      });
      const res = await usPaymentInfo(newParams);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //查询卡类型-会员
  queryCyberCardTypeEvent = async (params) => {
    console.info('this.flexresponse', this.flexresponse);
    if (!this.flexresponse) {
      return;
    }
    try {
      let decodedCardInfo = jwt_decode(this.flexresponse);
      console.info('decodedCardInfo', decodedCardInfo);
      let { expirationYear, number, expirationMonth, type } =
        decodedCardInfo.data;
      let param = Object.assign({}, params, {
        flexResponse: this.flexresponse,
        microFormEnabled: true,
        cardNumber: number
      });
      const res = await usPayCardSubscription(param);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // //查询卡类型-游客
  queryGuestCyberCardTypeEvent = async (params) => {
    try {
      const res = await usGuestPayCardSubscription(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  nameOnCardJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id={cyberFormTitle.cardHolderName} />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
          <input
            type="cardholderName"
            className="rc-input__control"
            id="cardNumberJSX"
            value={form.cardholderName}
            // onChange={this.props.handleInputChange}
            onChange={(e) => this.onChange(e, 'input', 'cardholderName')}
            onBlur={this.props.inputBlur}
            name="cardholderName"
            maxLength="254"
          />
          <label className="rc-input__label" htmlFor="cardholderName" />
        </span>
        {errMsgObj.cardholderName && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  cardNumberJSX = () => {
    const {
      form,
      errMsgObj,
      cyberFormTitle,
      paymentStore: { currentCardTypeInfo }
      //currentCardTypeInfo.cardTypeValue ==>001
    } = this.props;
    return (
      <div className="form-group required">
        <label id="cardNumber-label" className="form-control-label">
          <FormattedMessage id={cyberFormTitle.cardNumber} />
        </label>
        <div
          id="number-container"
          className="form-control card-number-style"
        ></div>
        {errMsgObj.cardNumber && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}

        {/* <label className="form-control-label">
          <FormattedMessage id={cyberFormTitle.cardNumber} />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
          <input
            type="cardNumber"
            className="rc-input__control"
            id="cardNumber"
            value={form.cardNumber}
            onChange={this.props.handleInputChange}
            onBlur={this.props.inputBlur}
            name="cardNumber"
            //maxLength={currentCardTypeInfo?.cardLength || 19}
            maxLength={19}
            placeholder=""
          />
          <label className="rc-input__label" htmlFor="cardNumber" />
        </span>
        {errMsgObj.cardNumber && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )} */}
      </div>
    );
  };

  expirationMonthJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
        <label className="form-control-label" htmlFor="month">
          <FormattedMessage id={cyberFormTitle.EXPMonth} />
        </label>
        <span
          className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
          data-loc="countrySelect"
        >
          <Selection
            key={form.expirationMonth}
            selectedItemChange={
              (data) => this.onChange(data, 'select', 'expirationMonth')
              // this.props.handleSelectedItemChange('expirationMonth', data)
            }
            optionList={monthList}
            selectedItemData={{
              value: form.expirationMonth
            }}
          />
        </span>
        {errMsgObj.expirationMonth && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  expirationYearJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
        <label className="form-control-label" htmlFor="year">
          <FormattedMessage id={cyberFormTitle.EXPYear} />
        </label>
        <span
          className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
          data-loc="countrySelect"
        >
          <Selection
            key={form.expirationYear}
            selectedItemChange={
              (data) => this.onChange(data, 'select', 'expirationYear')
              // this.props.handleSelectedItemChange('expirationYear', data)
            }
            optionList={yearList}
            selectedItemData={{
              value: form.expirationYear
            }}
          />
        </span>
        {errMsgObj.expirationYear && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  securityCodeJSX = () => {
    const {
      form,
      errMsgObj,
      cyberFormTitle,
      securityCodeTipsJSX,
      paymentStore: { currentCardTypeInfo }
    } = this.props;
    return (
      <>
        <div className="form-group required">
          <label
            className="form-control-label"
            htmlFor="securityCode-container"
          >
            <FormattedMessage id="cyber.form.secureCode" />
          </label>
          <div
            id="securityCode-container"
            className="form-control card-number-style  security-code-style"
          ></div>
          {errMsgObj.securityCode && (
            <div className="text-danger-2">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          )}
          {/* <label className="form-control-label" htmlFor="month">
            <FormattedMessage id="cyber.form.secureCode" />
          </label>
          <span className="rc-input rc-input--full-width" input-setup="true">
            <input
              type="securityCode"
              className="rc-input__control"
              id="securityCode"
              value={form.securityCode}
              onChange={this.props.handleInputChange}
              onBlur={this.props.inputBlur}
              name="securityCode"
              //maxLength={currentCardTypeInfo?.cvvLength || 3}
              maxLength={4}
            />
            <label className="rc-input__label" htmlFor="securityCode" />
          </span>
          {errMsgObj.securityCode && (
            <div className="text-danger-2">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          )} */}
          {securityCodeTipsJSX}
        </div>
      </>
    );
  };

  render() {
    const {
      CyberSaveCardCheckboxJSX,
      billingJSX,
      backToSavedPaymentsJSX,
      errMsgObj,
      securityCodeTipsJSX
    } = this.props;
    return (
      <div>
        <form action="/status/success" id="my-sample-form" method="post">
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">{this.nameOnCardJSX()}</div>
            </div>

            <div className="row">
              <div className="col-sm-12">{this.cardNumberJSX()}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">{this.expirationMonthJSX()}</div>
            <div className="col-sm-4">{this.expirationYearJSX()}</div>
            <div className="col-sm-4">
              {this.securityCodeJSX()}
              {/* {securityCodeTipsJSX} */}
            </div>
          </div>
        </form>
        {/* <div className="row">
          <div className="col-sm-12">{this.nameOnCardJSX()}</div>
        </div>
        <div className="row">
          <div className="col-sm-12">{this.cardNumberJSX()}</div>
        </div> */}

        {backToSavedPaymentsJSX}
        {CyberSaveCardCheckboxJSX}
        {billingJSX}
      </div>
    );
  }
}
export default CyberPaymentForm;
