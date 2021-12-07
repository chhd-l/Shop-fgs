import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { withOktaAuth } from '@okta/okta-react';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import deleteMyAccountImg from './images/icon_deletemyaccount2.png';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;

class DeleteMyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editFormVisible: false,
      errorMsg: ''
    };
  }
  componentDidMount() {}

  // 注销账户
  handelDeleteMyAccount = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  render() {
    const { editFormVisible, errorMsg } = this.state;
    const curPageAtCover = !editFormVisible;

    return (
      <div className={classNames({ border: curPageAtCover })}>
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            <h5
              className="mb-0 text-xl"
              style={{ display: curPageAtCover ? 'block' : 'none' }}
            >
              <div
                className="svg-icon account-info-icon align-middle mr-3 ml-1"
                style={{
                  width: '1.2em',
                  height: '1.2em',
                  display: 'inline-table'
                }}
              >
                <img src={deleteMyAccountImg} alt="delete My Accout" />
              </div>
              <FormattedMessage id="account.deleteMyaccountTitle" />
            </h5>
            <h5
              className="ui-cursor-pointer text-xl"
              style={{ display: curPageAtCover ? 'none' : 'block' }}
              onClick={this.handleClickGoBack}
            >
              <span>&larr; </span>
              <FormattedMessage id="account.deleteMyaccountTitle" />
            </h5>

            {/* delete my account 按钮 */}
            <FormattedMessage id="proceedToTheDeletion">
              {(txt) => (
                // <button
                //   style={{ minWidth: '52px' }}
                //   className="editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0"
                //   title={txt}
                //   alt={txt}
                //   onClick={this.handelDeleteMyAccount}
                // >
                //   {txt}
                // </button>
                <a
                  className="editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0"
                  style={{
                    // minWidth: '52px',
                    lineHeight: 'inherit'
                  }}
                  onClick={(e) => {
                    localItemRoyal.remove('rc-token');
                  }}
                  href={window.__.env.REACT_APP_DELETE_My_ACCOUNT_URL}
                >
                  {txt}
                </a>
              )}
            </FormattedMessage>
          </div>

          <hr className="account-info-hr-border-color my-4" />

          <div className="pl-3 pr-3 pb-3">
            {/* 错误提示 */}
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
            {/* 文本内容 */}
            <span className="rc-meta">
              <strong>
                <FormattedMessage id="account.deleteMyaccountDesc" />
              </strong>
            </span>
            <div className="row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer" />
          </div>
        </div>
      </div>
    );
  }
}
export default withOktaAuth(DeleteMyAccount);
