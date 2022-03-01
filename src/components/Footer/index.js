import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import FooterHub from './footer_hub';
import { withRouter } from 'react-router-dom';
import DynamicFooter from './DynamicFooter';
import { queryApiFromSessionCache, loadJS } from '@/utils/utils';
import { getFooter } from '@/api/hub';
import cn from 'classnames';
import { FooterWrapper } from './style';

const localItemRoyal = window.__.localItemRoyal;
const isHub = window.__.env.REACT_APP_HUB;

/**
 * footer控制
 * 1.hub环境，且hub footer有数据，显示hub footer(三方hub接口);
 * 2.否则显示fgs footer(storepotal配置footer html)
 * 3. Onetrust cookie settings button显示控制为环境变量REACT_APP_COOKIE_SETTINGS_BTN_VISIBLE
 * 注: footer html配置, 包括基本footer链接、营业时间、联系邮箱/电话、本店铺支持的支付方式容器
 */
@inject('configStore', 'loginStore')
@injectIntl
@observer
class Footer extends React.Component {
  static defaultProps = { showFooter: true };
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: -1,
      hubFooterInfo: null, // hub footer info
      isInitdQueryHubFooter: false
    };
  }
  async componentDidMount() {
    const {
      configStore: { queryConfig, getSystemFormConfig },
      intl: { messages }
    } = this.props;

    if (isHub) {
      queryApiFromSessionCache({
        sessionKey: 'footer-hub',
        api: getFooter
      })
        .then((res) => {
          this.setState({
            hubFooterInfo: res,
            isInitdQueryHubFooter: true
          });
        })
        .catch(() => {
          this.setState({ isInitdQueryHubFooter: true });
        });
    } else {
      this.setState({ isInitdQueryHubFooter: true });
    }

    queryConfig();

    getSystemFormConfig(); // 查询address form表单配置开关

    // 地址错误提示信息
    localItemRoyal.set(
      'rc-wrongAddressMsg',
      JSON.stringify({
        title: messages['payment.pleaseInput'],
        wrongAddress: messages['payment.wrongAddress'],
        streets: messages['payment.streets'],
        postCode: messages['payment.postCode'],
        house: messages['payment.house'],
        city: messages['payment.city'],
        county: messages['payment.county'],
        districtCode: messages['payment.province'],
        settlement: messages['payment.settlement'],
        address1: messages['payment.address1'],
        address2: messages['payment.address2'],
        apartment: messages['payment.apartment'],
        comment: messages['payment.comment'],
        country: messages['payment.country'],
        entrance: messages['payment.entrance'],
        firstName: messages['payment.firstName'],
        lastName: messages['payment.lastName'],
        phoneNumber: messages['payment.phoneNumber'],
        consigneeNumber: messages['payment.phoneNumber'],
        area: messages['payment.region'],
        province: messages['payment.state']
      })
    );

    // 手机端交互实现
    window.addEventListener('click', (e) => {
      let currentTargetDom = e.target;
      if (!currentTargetDom.classList.contains('J_rc-list__header')) {
        currentTargetDom = e.target.closest('.J_rc-list__header');
      }
      if (!currentTargetDom) {
        return false;
      }

      // 需要打开时，指定父级rc-list下的，所有子节点rc-list，全部关闭;同级的指定兄弟节点,打开
      // 需要关闭时，同级的指定兄弟节点，关闭
      const needToOpen = !currentTargetDom.classList.contains(
        'rc-list__header-open'
      );
      currentTargetDom
        .closest('ul.rc-list')
        .querySelectorAll('.rc-list__item--group')
        .forEach((el) => {
          el.querySelector('.J_rc-list__header').classList.remove(
            'rc-list__header-open'
          );
        });

      if (needToOpen) {
        currentTargetDom.classList.add('rc-list__header-open');
      } else {
        currentTargetDom.classList.remove('rc-list__header-open');
      }
    });
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get showHubFooter() {
    const { hubFooterInfo } = this.state;
    return isHub && hubFooterInfo;
  }
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  toggleExpand = (index) => {
    this.setState((cur) => ({
      activeIdx: cur.activeIdx === index ? -1 : index
    }));
  };

  render() {
    const { showHubFooter } = this;
    const { hubFooterInfo, isInitdQueryHubFooter } = this.state;
    const { showFooter } = this.props;
    return showFooter ? (
      <FooterWrapper
        className={cn('rc-bg-colour--interface-dark')}
        id="footer"
        data-tms="Footer"
      >
        <div
          className={cn('rc-max-width--xl rc-scroll--y grid grid-cols-12', {
            'hub-footer': isHub
          })}
        >
          {isInitdQueryHubFooter ? (
            showHubFooter ? (
              <FooterHub
                footerInfo={hubFooterInfo}
                isLogin={this.isLogin}
                history={this.props.history}
              />
            ) : (
              <>
                <div className="rc-layout-container rc-three-column rc-md-up col-span-12">
                  <div className="rc-column rc-text--right">
                    <span
                      className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 text-white ui-cursor-pointer"
                      onClick={this.scrollToTop}
                      role="back to top"
                    >
                      <FormattedMessage id="footer.toTheTop" />
                    </span>
                  </div>
                </div>
                <DynamicFooter {...this.props} />
              </>
            )
          ) : null}
        </div>

        {/* <!-- OneTrust Cookies Settings button start --> */}
        {Boolean(window.__.env.REACT_APP_COOKIE_SETTINGS_BTN_VISIBLE) && (
          <div
            className="cookieSettingBox bg-white"
            style={{ visibility: 'hidden' }}
          >
            <button id="ot-sdk-btn" className="ot-sdk-show-settings">
              <FormattedMessage id="footer.cookieSettings" />
            </button>
          </div>
        )}
        {/* <!-- OneTrust Cookies Settings button end --> */}
      </FooterWrapper>
    ) : null;
  }
}

export default withRouter(Footer);
