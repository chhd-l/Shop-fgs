import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { findUserSelectedList, userBindConsent } from '@/api/consent';
import { withOktaAuth } from '@okta/okta-react';
import Consent from '@/components/Consent';
import Skeleton from 'react-skeleton-loader';
import classNames from 'classnames';
import { myAccountActionPushEvent } from '@/utils/GA';
import { inject, observer } from 'mobx-react';
import { addEventListenerArr } from './addEventListener';
import ConsentAdditionalText from '@/components/Consent/ConsentAdditionalText';

const localItemRoyal = window.__.localItemRoyal;
const SPECAIL_CONSENT_ENUM =
  {
    de: ['RC_DF_DE_FGS_OPT_EMAIL'],
    us: [
      'RC_DF_US_PREF_CENTER_OFFERS_OPT_MAIL',
      'RC_DF_US_PREF_CENTER_PRODUCTS_OPT_MAIL',
      'RC_DF_US_PREF_CENTER_NL_OPT_MAIL',
      'RC_DF_HQ_MARS_PRIVACY_POLICY'
    ],
    fr: ['RC_DF_FR_FGS_OPT_MOBILE', 'RC_DF_FR_FGS_OPT_EMAIL'],
    ru: ['RC_DF_RU_FGS_OPT_EMAIL', 'RC_DF_RU_FGS_OPT_MOBILE'],
    tr: ['RC_DF_TR_FGS_OPT_EMAIL', 'RC_DF_TR_FGS_OPT_MOBILE'],
    uk: ['RC_DF_UK_CLIXRAY_OPT_EMAIL'],
    se: ['RC_SE_B2C_OPT'],
    mx: ['RC_MX_B2C_OPT'],
    tr: ['RC_DF_TR_FGS_OPT_EMAIL_MOBILE_PRINT']
  }[window.__.env.REACT_APP_COUNTRY] || [];

const ukTipInfoConsentEnum = ['RC_DF_UK_CLIXRAY_OPT_EMAIL'];
@inject('paymentStore')
@observer
class CommunicationDataEditForm extends React.Component {
  static defaultProps = {
    originData: null,
    needPhone: true,
    needMessengers: true
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      editFormVisible: false,
      list: [],
      isLoading: false,
      saveLoading: false,
      form: {
        communicationPhone: '',
        communicationEmail: '',
        communicationPrint: ''
      },
      errorMsg: '',
      showWarningTip: false
    };
    this.handleCommunicationCheckBoxChange =
      this.handleCommunicationCheckBoxChange.bind(this);
  }
  componentDidUpdate() {
    if (window.__.env.REACT_APP_COUNTRY == 'tr') {
      this.addEventListenerFunTr();
    }
  }
  //监听土耳其consent
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
    // this.setState({
    //   form: Object.assign({}, this.props.data)
    // });
    document.getElementById('wrap').addEventListener('click', (e) => {
      if (e.target.localName === 'font') {
        let keyWords = e.target.innerText;
        let index = Number(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
        );
        const { list } = this.state;
        let arr = [];
        if (list[index]) {
          arr = list[index].detailList.filter((item) => {
            return item.contentTitle === keyWords;
          });
        }

        let tempArr = [...list];
        //tempArr[index].innerHtml = arr.length!=0 ? arr[0].contentBody:''
        if (tempArr[index]) {
          tempArr[index].innerHtml = tempArr[index].innerHtml
            ? ''
            : arr[0]
            ? arr[0].contentBody
            : '';
        }

        this.setState({ list: tempArr });
      }
    });
    this.init();
  }
  init = async () => {
    try {
      const { userInfo } = this.props;
      this.setState({
        isLoading: true
      });
      const result = await findUserSelectedList({
        customerId: (userInfo && userInfo.customerId) || '',
        oktaToken: localItemRoyal.get('oktaToken')
      });
      const optioalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: item.selectedFlag,
          isRequired: false,
          detailList: item.detailList,
          consentDesc: item.consentDesc
        };
      });

      const list = [...optioalList];
      const { communicationEmail, communicationPhone, communicationPrint } =
        result.context?.customerDetailVO || {};
      this.setState({
        list,
        form: Object.assign(
          {},
          { communicationEmail, communicationPhone, communicationPrint }
        )
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  };
  //组装submit参数
  bindOptionSubmitParam = (list) => {
    let obj = { optionalList: [] };
    list
      .filter((item) => !item.isRequired)
      .forEach((item) => {
        obj.optionalList.push({ id: item.id, selectedFlag: item.isChecked });
      });

    return obj;
  };
  showErrMsg(err) {
    this.setState({ errorMsg: err });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  }
  //保存
  handleSave = async () => {
    try {
      const { userInfo, needPhone, needMessengers } = this.props;
      const { form, list } = this.state;
      let errMsg = null;
      const theConset = list.filter((l) =>
        SPECAIL_CONSENT_ENUM.includes(l.consentDesc)
      ).length;
      const hasCheckedTheConsent = list.filter(
        (l) => SPECAIL_CONSENT_ENUM.includes(l.consentDesc) && l.isChecked
      ).length;

      // 1 勾选了某条特殊consent情况下，phone/email/messengers不能同时取消
      // 2 勾选了phone/email/messengers，必须勾选某条特殊consent

      // us/uk/de/se隐藏了 email 勾选框，所以选择邮件沟通时需要赋值 communicationEmail = 1
      if (
        hasCheckedTheConsent &&
        ['us', 'uk', 'de', 'se', 'mx', 'tr'].indexOf(
          window.__.env.REACT_APP_COUNTRY
        ) > -1
      ) {
        form.communicationEmail = 1;
      }
      if (
        !hasCheckedTheConsent &&
        ['us', 'uk', 'de', 'se', 'mx', 'tr'].indexOf(
          window.__.env.REACT_APP_COUNTRY
        ) > -1
      ) {
        form.communicationEmail = 0;
      }
      // sprint6~7直接的紧急需求：fr新的consent隐藏了email和phone,但是勾选了第一个consent，默认勾选选中email和phone
      if (hasCheckedTheConsent && window.__.env.REACT_APP_COUNTRY === 'fr') {
        form.communicationEmail = 1;
        form.communicationPhone = 1;
      }
      if (!hasCheckedTheConsent && window.__.env.REACT_APP_COUNTRY === 'fr') {
        form.communicationEmail = 0;
        form.communicationPhone = 0;
      }
      if (
        hasCheckedTheConsent &&
        !+form.communicationEmail &&
        (!needPhone || !+form.communicationPhone) &&
        (!needMessengers || !+form.communicationPrint)
      ) {
        errMsg = <FormattedMessage id="mustChooseACommunicationMethodTip" />;
      } else if (
        theConset &&
        (+form.communicationEmail ||
          (needPhone && +form.communicationPhone) ||
          (needMessengers && +form.communicationPrint)) &&
        !hasCheckedTheConsent
      ) {
        errMsg = <FormattedMessage id="mustChooseTheConsentTip" />;
      }

      if (errMsg) {
        this.showErrMsg(errMsg);
        return false;
      }

      this.setState({
        saveLoading: true
      });
      const oktaTokenString =
        this.props.authState && this.props.authState.accessToken
          ? this.props.authState.accessToken.value
          : '';
      let oktaToken = 'Bearer ' + oktaTokenString;
      let submitParam = this.bindOptionSubmitParam(this.state.list);

      await userBindConsent({
        ...submitParam,
        ...{ oktaToken },
        customerId: (userInfo && userInfo.customerId) || '',
        consentPage: 'myAccount',
        communicationEmail: form.communicationEmail,
        communicationPhone: needPhone ? form.communicationPhone : null,
        communicationPrint: needMessengers ? form.communicationPrint : null
      });
      // await updateCustomerBaseInfo(
      //   Object.assign({}, this.props.originData, {
      //     communicationEmail: form.communicationEmail,
      //     communicationPhone: form.communicationPhone,
      //     communicationPrint: form.communicationPrint,
      //     oktaToken
      //   })
      // );

      await this.init();
      // this.props.updateData();
      this.handleCancel();
      this.setState({
        saveLoading: false
      });
    } catch (err) {
      this.showErrMsg(err.message);
      this.setState({
        saveLoading: false
      });
    }
  };
  handleCancel = () => {
    this.changeEditFormVisible(false);
    // this.setState({ form: Object.assign({}, this.props.data) });
  };
  //从子组件传回
  sendList = (list) => {
    this.setState({ list }, () => {
      // this.ukConsentInfoTip();
    });
  };

  // uk的提示
  ukConsentInfoTip = () => {
    if (window.__.env.REACT_APP_COUNTRY != 'uk') return;
    const { form, list } = this.state;
    const ukTipInfoCheckedConsent = list.filter(
      (l) => ukTipInfoConsentEnum.includes(l.consentDesc) && l.isChecked
    ).length;
    if (
      ukTipInfoCheckedConsent &&
      window.__.env.REACT_APP_COUNTRY === 'uk' &&
      form.communicationEmail === '0'
    ) {
      this.setState({
        showWarningTip: true
      });
    } else {
      this.setState({
        showWarningTip: false
      });
    }
  };

  changeEditFormVisible = async (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'Communication' : '');
    if (status) {
      // 回置初始状态值
      // this.setState({
      //   form: Object.assign({}, this.props.data)
      // });
      await this.init();
    }
  };
  handleClickEditBtn = () => {
    myAccountActionPushEvent('Edit contact info');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeEditFormVisible(true);
  };
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
  };
  handleCommunicationCheckBoxChange(item) {
    let { form } = this.state;
    form[item.type] = !+form[item.type] ? '1' : '0';
    this.setState({ form }, () => {
      // this.ukConsentInfoTip();
    });
  }
  render() {
    const { editFormVisible, list, form, errorMsg, isLoading } = this.state;
    const curPageAtCover = !editFormVisible;
    const communicationPreferencesList = [
      {
        type: 'communicationPhone',
        langKey: 'phone',
        visible: this.props.needPhone
      },
      {
        type: 'communicationEmail',
        langKey:
          window.__.env.REACT_APP_COUNTRY === 'uk'
            ? 'communicationEmail'
            : 'email',
        visible: this.props.needEmail
      },
      {
        type: 'communicationPrint',
        langKey: 'messengers',
        visible: this.props.needMessengers
      }
    ].filter((c) => c.visible);
    return (
      <div className={classNames({ border: curPageAtCover })}>
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            <h5
              className="mb-0 text-lg md:text-xl"
              style={{ display: curPageAtCover ? 'block' : 'none' }}
            >
              <img
                className="account-info-icon align-middle mr-3 ml-1 inline-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/communication.svg`}
                alt="icons communication"
                style={{ width: '1.3em', height: '1.3em' }}
              />
              <FormattedMessage id="account.myCommunicationPreferencesTitle" />
            </h5>
            <h5
              className="ui-cursor-pointer text-xl"
              style={{ display: curPageAtCover ? 'none' : 'block' }}
              onClick={this.handleClickGoBack}
            >
              <span>&larr; </span>
              <FormattedMessage id="account.myCommunicationPreferencesTitle" />
            </h5>

            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  // style={{ minWidth: '52px' }}
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0 ${
                    editFormVisible ? 'hidden' : ''
                  }`}
                  title={txt}
                  alt={txt}
                  onClick={this.handleClickEditBtn}
                >
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr
            className={classNames('account-info-hr-border-color my-4', {
              'border-0': editFormVisible
            })}
          />
          <div className="pl-3 pr-3 pb-3">
            <div
              className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                errorMsg ? '' : 'hidden'
              }`}
            >
              <aside
                className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                role="alert"
              >
                <span className="pl-0">{errorMsg}</span>
                <button
                  className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                  aria-label="Close"
                  onClick={() => {
                    this.setState({ errorMsg: '' });
                  }}
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="close" />
                  </span>
                </button>
              </aside>
            </div>

            <span className={`rc-meta ${editFormVisible ? 'hidden' : ''}`}>
              <strong>
                <FormattedMessage id="account.myCommunicationPreferencesDesc" />
              </strong>
            </span>
            <div
              className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
                editFormVisible ? 'hidden' : ''
              }`}
            />
            {isLoading && editFormVisible ? (
              <Skeleton color="#f5f5f5" width="100%" height="10%" count={3} />
            ) : null}
            <div className={`${!isLoading && editFormVisible ? '' : 'hidden'}`}>
              <span className={`rc-meta`}></span>
              {['fr', 'de', 'se', 'mx', 'tr'].indexOf(
                window.__.env.REACT_APP_COUNTRY
              ) < 0 ? (
                <div className="mb-3">
                  {communicationPreferencesList.length > 0 ? (
                    <label className="form-control-label rc-input--full-width w-100">
                      <FormattedMessage id="account.preferredMethodOfCommunication" />
                    </label>
                  ) : null}

                  {communicationPreferencesList.map((ele, idx) => (
                    <div className="rc-input rc-input--inline" key={idx}>
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        id={`basicinfo-communication-checkbox-${ele.type}`}
                        onChange={this.handleCommunicationCheckBoxChange.bind(
                          this,
                          ele
                        )}
                        checked={+form[ele.type] || false}
                      />
                      <label
                        className="rc-input__label--inline text-break"
                        htmlFor={`basicinfo-communication-checkbox-${ele.type}`}
                      >
                        <FormattedMessage id={ele.langKey} />
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
              {['se', 'mx', 'tr'].indexOf(window.__.env.REACT_APP_COUNTRY) <
              0 ? (
                <span className={`rc-meta`}>
                  <strong>
                    <FormattedMessage id="account.myCommunicationPreferencesContent2" />
                  </strong>
                </span>
              ) : null}
              {/* <ConsentAdditionalText textPosition="top" /> */}
              <div id="wrap" style={{ marginLeft: '30px' }}>
                {/* checkbox组 */}
                <Consent
                  list={list}
                  sendList={this.sendList}
                  disabled={!editFormVisible}
                  checkboxPadding={'.625rem'}
                  zoom={'150%'}
                  key={'profile'}
                  pageType={'account'}
                />
              </div>
              {/* <ConsentAdditionalText textPosition="bottom" /> */}
              {this.state.showWarningTip ? (
                <aside
                  className="rc-alert rc-alert--warning mb-4 mt-2"
                  role="alert"
                >
                  <span className="pl-0">
                    <FormattedMessage id="doNotChooseCommunicationTip" />
                  </span>
                </aside>
              ) : null}
              {/* 取消和保存 按钮 */}
              <div className={`text-right contactPreferenceFormBtn`}>
                <span
                  className="rc-styled-link editPersonalInfoBtn"
                  name="contactPreference"
                  onClick={this.handleCancel}
                >
                  <FormattedMessage id="cancel" />
                </span>
                &nbsp;
                <FormattedMessage id="or" />
                &nbsp;
                <button
                  className={classNames('rc-btn', 'rc-btn--one', 'submitBtn', {
                    'ui-btn-loading': this.state.saveLoading
                  })}
                  name="contactPreference"
                  type="submit"
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withOktaAuth(CommunicationDataEditForm);
