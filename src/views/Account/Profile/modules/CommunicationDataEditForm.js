import React from 'react';
import { FormattedMessage } from 'react-intl';
import { findUserSelectedList, userBindConsent } from '@/api/consent';
import { withOktaAuth } from '@okta/okta-react';
import Consent from '@/components/Consent';
import { updateCustomerBaseInfo } from '@/api/user';
import classNames from 'classnames';

class CommunicationDataEditForm extends React.Component {
  static defaultProps = {
    originData: null
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      editFormVisible: false,
      list: [],
      isLoading: false,
      saveLoading: false,
      form: { communicationPhone: '', communicationEmail: '' },
      errorMsg: ''
    };
    this.handleCommunicationCheckBoxChange = this.handleCommunicationCheckBoxChange.bind(
      this
    );
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({
      form: Object.assign({}, data)
    });
    document.getElementById('wrap').addEventListener('click', (e) => {
      if (e.target.localName === 'span') {
        let keyWords = e.target.innerText;
        let index = Number(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
        );
        const { list } = this.state;
        let arr = (list[index] || []).detailList.filter((item) => {
          return item.contentTitle === keyWords;
        });

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
    this.setState({
      isLoading: true
    });
    try {
      let result = await findUserSelectedList({});

      const optioalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: item.selectedFlag,
          isRequired: false,
          detailList: item.detailList
        };
      });

      let list = [...optioalList];
      this.setState({
        list
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
  bindSubmitParam = (list) => {
    let obj = { optionalList: [] };
    list
      .filter((item) => !item.isRequired)
      .forEach((item) => {
        obj.optionalList.push({ id: item.id, selectedFlag: item.isChecked });
      });

    return obj;
  };
  //保存
  handleSave = async () => {
    const { form } = this.state;
    this.setState({
      saveLoading: true
    });
    let oktaToken = 'Bearer ' + this.props.authState.accessToken;
    let submitParam = this.bindSubmitParam(this.state.list);
    Promise.all([
      updateCustomerBaseInfo(
        Object.assign({}, this.props.originData, {
          communicationEmail: form.communicationEmail,
          communicationPhone: form.communicationPhone
        })
      ),
      userBindConsent({ ...submitParam, ...{ oktaToken } })
    ])
      .then(async (res) => {
        await this.init();
        this.handleCancel();
        this.setState({
          saveLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          errorMsg: err.message,
          saveLoading: false
        });
        setTimeout(() => {
          this.setState({
            errorMsg: ''
          });
        }, 3000);
      });
  };
  handleCancel = () => {
    this.changeEditFormVisible(false);
    this.setState({ form: Object.assign({}, this.props.data) });
  };
  //从子组件传回
  sendList = (list) => {
    this.setState({ list });
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'Communication' : '');
  };
  handleClickEditBtn = () => {
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
    this.setState({ form });
  }
  render() {
    const { editFormVisible, list, form, errorMsg } = this.state;
    const createMarkup = (text) => ({ __html: text });
    const curPageAtCover = !editFormVisible;
    return (
      <div className={classNames({ border: curPageAtCover })}>
        {/* {this.state.isLoading ? (
          <Loading positionAbsolute="true" customStyle={{ zIndex: 9 }} />
        ) : null} */}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            {curPageAtCover ? (
              <h5 className="mb-0">
                <svg
                  className="svg-icon account-info-icon align-middle mr-3 ml-1"
                  aria-hidden="true"
                  style={{ width: '1.2em', height: '1.2em' }}
                >
                  <use xlinkHref="#iconcommunication" />
                </svg>
                <FormattedMessage id="account.myCommunicationPreferencesTitle" />
              </h5>
            ) : (
              <h5
                className="ui-cursor-pointer"
                onClick={this.handleClickGoBack}
              >
                <span>&larr; </span>
                <FormattedMessage id="account.myCommunicationPreferencesTitle" />
              </h5>
            )}

            <FormattedMessage id="edit">
              {(txt) => (
                <button
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
            className={classNames('account-info-hr-border-color', {
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
              <b>
                <FormattedMessage id="account.myCommunicationPreferencesDesc" />
              </b>
            </span>
            <div
              className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
                editFormVisible ? 'hidden' : ''
              }`}
            />
            <div className={`${editFormVisible ? '' : 'hidden'}`}>
              <span className={`rc-meta`}>
                <b>
                  <FormattedMessage id="account.myCommunicationPreferencesContent1" />
                </b>
              </span>
              <div>
                <label className="form-control-label rc-input--full-width w-100">
                  <FormattedMessage id="account.preferredMethodOfCommunication" />
                </label>
                {[
                  { type: 'communicationPhone', langKey: 'phone' },
                  { type: 'communicationEmail', langKey: 'email' }
                ].map((ele, idx) => (
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

              <span className={`rc-meta`}>
                <b>
                  <FormattedMessage id="account.myCommunicationPreferencesContent2" />
                </b>
              </span>
              <div id="wrap" style={{ marginLeft: '30px' }}>
                {/* checkbox组 */}
                <Consent
                  list={list}
                  sendList={this.sendList}
                  disabled={!editFormVisible}
                  checkboxPadding={'10px'}
                  zoom={'150%'}
                  key={'profile'}
                />
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
                    className={classNames(
                      'rc-btn',
                      'rc-btn--one',
                      'submitBtn',
                      {
                        'ui-btn-loading': this.state.saveLoading
                      }
                    )}
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
      </div>
    );
  }
}
export default withOktaAuth(CommunicationDataEditForm);
