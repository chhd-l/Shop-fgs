import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import logoAnimatedPng from '@/assets/images/logo--animated2.png';
import './index.css';
import { findUserConsentList, userBindConsent } from '@/api/consent';
import Consent from '@/components/Consent';
import { withOktaAuth } from '@okta/okta-react';
import LoginButton from '@/components/LoginButton';
import Skeleton from 'react-skeleton-loader';
import Loading from '@/components/Loading';
import { bindSubmitParam } from '@/utils/utils';
import Modal from '@/components/Modal';
import { addEventListenerArr } from './addEventListener';
import loginRedirection from '@/lib/login-redirection';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function ErrMsg({ msg }) {
  return (
    <div className={`text-break mt-2 mb-2 ${msg ? '' : 'hidden'}`}>
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close"
        role="alert"
      >
        <span className="pl-0">{msg}</span>
      </aside>
    </div>
  );
}

@inject(
  'loginStore',
  'configStore',
  'checkoutStore',
  'clinicStore',
  'paymentStore'
)
@observer
class RegisterRequired extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowRequired: false,
      isLoading: true,
      innerHtml: '',
      width: '',
      zoom: '',
      fontZoom: '',
      circleLoading: true,
      styleObj: { display: 'none' },
      errMsg: ''
    };
  }
  async componentDidMount() {
    //定义变量获取屏幕视口宽度
    var windowWidth = document.body.clientWidth;
    if (windowWidth < 640) {
      this.setState({
        width: '300px',
        zoom: '120%',
        fontZoom: '100%'
      });
    }
    if (windowWidth >= 640) {
      this.setState({
        width: '500px',
        zoom: '150%',
        fontZoom: '120%'
      });
    }
    document.getElementById('wrap').addEventListener('click', (e) => {
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
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  //属性变为true，time定时后变为false
  showAlert(attr, time) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.setState(
      {
        [attr]: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            [attr]: false
          });
        }, time);
      }
    );
  }
  //会员提交
  submitLogin = async () => {
    this.setState({
      circleLoading: true
    });
    const oktaTokenString =
      this.props.authState && this.props.authState.accessToken
        ? this.props.authState.accessToken.value
        : '';
    let oktaToken = 'Bearer ' + oktaTokenString;
    try {
      const isRequiredChecked = this.state.list
        .filter((item) => item.isRequired)
        .every((item) => item.isChecked);
      if (isRequiredChecked) {
        //组装submit参数
        let submitParam = bindSubmitParam(this.state.list);
        let customerId = this.userInfo && this.userInfo.customerId;
        await userBindConsent({
          ...submitParam,
          ...{ oktaToken },
          customerId
        });

        this.redirectPage();
      } else {
        this.showAlert('isShowRequired', 2000);
      }
    } catch (err) {
    } finally {
      this.setState({
        circleLoading: false
      });
    }
  };
  computedIsCheck(list) {
    //必填项全部被check
    return list
      .filter((item) => {
        return item.isRequired == true;
      })
      .every((item2) => {
        return item2.isChecked == true;
      });
  }
  // 重定向页面
  redirectPage = () => {
    loginRedirection({
      configStore: this.props.configStore,
      clinicStore: this.props.clinicStore,
      checkoutStore: this.props.checkoutStore,
      history: this.props.history,
      isLogin: this.isLogin
    });
  };
  //从子组件传回
  sendList = (list) => {
    this.setState({ list });
  };
  init = async () => {
    const { history, configStore, clinicStore } = this.props;
    this.setState({
      circleLoading: true,
      styleObj: { display: 'none' },
      isLoading: true
    });
    try {
      let customerId = this.userInfo && this.userInfo.customerId;
      if (!customerId) {
        return;
      }
      const result = await findUserConsentList({
        customerId,
        oktaToken: localItemRoyal.get('oktaToken')
      });
      //没有必选项，直接跳回
      if (result.context.requiredList.length === 0) {
        this.redirectPage();
      }

      const optioalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList
        };
      });

      const requiredList = result.context.requiredList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ? true : false,
          isRequired: true,
          detailList: item.detailList,
          noChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ? true : false
        };
      });

      //把非必填和必填的项目组装成一个数组list，用于渲染
      let list = this.state.list;
      list = [...requiredList, ...optioalList];

      if (list.length > 0) {
        this.setState({
          //这个判断 关乎闪现，不要删
          styleObj: { display: 'block' },
          isLoading: false,
          circleLoading: false
        });
      }

      this.setState({
        list
      });
    } catch (err) {
      this.setState({
        errMsg: err.message
      });
    }
  };
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
  render() {
    const { errMsg } = this.state;
    const url = this.props.match.url;

    return (
      <div className="rc-padding-bottom--sm rc-padding-bottom--xl--mobile">
        <div>
          <div className="text-center rc-column rc-padding-bottom--none">
            {/*全局loading */}
            {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
            {/* 加载token */}
            <div style={{ visibility: 'hidden' }}>
              <LoginButton history={this.props.history} init={this.init} />
            </div>

            <div style={this.state.styleObj}>
              <div
                className="required-wrap"
                id="wrap"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                {/* Logo */}
                <div className="rc-margin-bottom--sm">
                  {/* <DistributeHubLinkOrATag
                    href=""
                    to="/home"
                    className="logo-home d-inline-block"
                    title="Commerce Cloud
                    Storefront Reference Architecture Accueil"
                  >
                    <span className="rc-screen-reader-text">
                      Commerce Cloud Storefront Reference Architecture
                    </span>
                    <div className="content-asset">
                      <img
                        src={logoAnimatedPng}
                        width="205"
                        height="90"
                        alt="Royal Canin Flagship Store"
                      />
                    </div>
                  </DistributeHubLinkOrATag> */}
                  <div
                    className="content-asset"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <img
                      src={logoAnimatedPng}
                      width="205"
                      height="90"
                      alt="Royal Canin Flagship Store"
                    />
                  </div>
                </div>
                <ErrMsg msg={errMsg} />
                {/* Header title */}
                <h2
                  className="rc-text-colour--brand1"
                  style={{ textAlign: 'center', marginTop: '.9375rem' }}
                >
                  <FormattedMessage id="required.logoTitle" />
                </h2>
                <p
                  style={{
                    textAlign: 'center',
                    color: '#5F5F5F',
                    fontSize: '1.3rem',
                    marginTop: '25px'
                  }}
                >
                  <FormattedMessage id="required.complete" />
                </p>
                {/* 没有勾选完必填项的alert提示 */}
                {this.state.isShowRequired ? (
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    <span>
                      <FormattedMessage id="required.checkRequired" />
                    </span>
                  </aside>
                ) : null}
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="rc-layout-container rc-one-column">
                    <div className="rc-column" style={{ paddingBottom: '0' }}>
                      {this.state.isLoading ? (
                        <div className="pt-2 pb-2">
                          <Skeleton color="#f5f5f5" width="100%" count={4} />
                        </div>
                      ) : (
                        <Consent
                          url={url}
                          list={this.state.list}
                          sendList={this.sendList}
                          width={this.state.width}
                          zoom={this.state.zoom}
                          fontZoom={this.state.fontZoom}
                          auto={true}
                          key={'required'}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Required fields */}
                <p
                  className="pizhu flex"
                  style={{ padding: '0px', fontSize: '1.1em', width: '580px' }}
                >
                  <span className="pl-2 pr-2 rc-text-colour--brand1">*</span>
                  <FormattedMessage id="required.fields" />
                </p>
                {/* Continu按钮 */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '60px',
                    marginBottom: '30px'
                  }}
                >
                  {
                    <button
                      className="rc-btn rc-btn--lg rc-btn--one px-5"
                      disabled={!this.computedIsCheck(this.state.list)}
                      onClick={this.submitLogin}
                    >
                      <FormattedMessage id="required.continue" />
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          type="fullscreen"
          visible={true}
          footerVisible={false}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
        />
      </div>
    );
  }
}
export default withOktaAuth(RegisterRequired);
