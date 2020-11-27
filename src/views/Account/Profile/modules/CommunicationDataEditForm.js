import React from 'react';
import { FormattedMessage } from 'react-intl';
import { findUserSelectedList, userBindConsent } from '@/api/consent';
import { withOktaAuth } from '@okta/okta-react';
import Consent from '@/components/Consent';
import Loading from '@/components/Loading';
import classNames from 'classnames';

class CommunicationDataEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      list: [],
      isLoading: false,
      saveLoading: false
    };
  }
  componentDidMount() {
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
    try {
      this.setState({
        saveLoading: true
      });
      let oktaToken = 'Bearer ' + this.props.authState.accessToken;
      let submitParam = this.bindSubmitParam(this.state.list);
      await userBindConsent({ ...submitParam, ...{ oktaToken } });
      await this.init();
      this.handleCancel();
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({
        saveLoading: false
      });
    }
  };
  handleCancel = () => {
    this.changeEditFormVisible(false);
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
  render() {
    const { editFormVisible } = this.state;
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
                <FormattedMessage id="account.consents" />
              </h5>
            ) : (
              <h5
                className="ui-cursor-pointer"
                onClick={this.handleClickGoBack}
              >
                <span>&larr; </span>
                <FormattedMessage id="account.consents" />
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
          <div class="pl-3 pr-3 pb-3">
            <span className="rc-meta">
              <b>
                <FormattedMessage id="account.consentsDetail" />
              </b>
            </span>
            <div
              className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
                editFormVisible ? 'hidden' : ''
              }`}
            ></div>
            <div id="wrap" style={{ marginLeft: '30px' }}>
              {/* checkbox组 */}
              <Consent
                list={this.state.list}
                sendList={this.sendList}
                disabled={!this.state.editFormVisible}
                checkboxPadding={'10px'}
                zoom={'150%'}
                key={'profile'}
              />
              {/* 取消和保存 按钮 */}
              <div
                className={`text-right contactPreferenceFormBtn ${
                  editFormVisible ? '' : 'hidden'
                }`}
              >
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
