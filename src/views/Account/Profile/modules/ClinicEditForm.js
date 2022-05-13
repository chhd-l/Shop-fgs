import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Loading from '@/components/Loading';
import SearchSelection from '@/components/SearchSelection';
import { updateCustomerBaseInfo } from '@/api/user';
import { getPrescriberByKeyWord, getPrescriberByCode } from '@/api/clinic';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { withOktaAuth } from '@okta/okta-react';

@inject('configStore', 'clinicStore')
@injectIntl
@observer
class ClinicEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      form: {
        clinicName: '',
        clinicId: '',
        recommendationCode: ''
      },
      oldForm: {
        clinicName: '',
        clinicId: '',
        recommendationCode: ''
      },
      isValid: false
    };
    this.timer = null;
  }
  componentDidMount() {
    const { data } = this.props;
    let form = {
      clinicName: data.clinicName,
      clinicId: data.clinicId,
      recommendationCode: data.recommendationCode || ''
    };
    let oldForm = {
      clinicName: data.clinicName,
      clinicId: data.clinicId,
      recommendationCode: data.recommendationCode || ''
    };
    this.setState({
      form: form,
      oldForm: oldForm,
      isValid: !!form.clinicName
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.form) {
      const { data } = nextProps;
      let form = {
        clinicName: data.clinicName,
        clinicId: data.clinicId,
        recommendationCode: data.recommendationCode || ''
      };
      let oldForm = {
        clinicName: data.clinicName,
        clinicId: data.clinicId,
        recommendationCode: data.recommendationCode || ''
      };
      this.setState({
        form,
        oldForm,
        isValid: !!form.clinicName
      });
    }
  }
  handleSave = async () => {
    const { form } = this.state;
    this.setState({ loading: true });
    try {
      const oktaTokenString =
        this.props.authState && this.props.authState.accessToken
          ? this.props.authState.accessToken.value
          : '';
      let oktaToken = 'Bearer ' + oktaTokenString;
      await updateCustomerBaseInfo(
        Object.assign({}, this.props.originData, {
          defaultClinics: {
            clinicsId: form.clinicId,
            clinicsName: form.clinicName,
            recommendationCode: form.recommendationCode || ''
          },
          oktaToken: oktaToken
        })
      );

      this.props.updateData(this.state.form);
      //根据prescriber最新原则，更新账户里面的clinic信息也要更新缓存的clinic信息
      if (
        (form.recommendationCode !== this.state.oldForm.recommendationCode &&
          window.__.env.REACT_APP_COUNTRY === 'de') ||
        (form.clinicId !== this.state.oldForm.clinicId &&
          window.__.env.REACT_APP_COUNTRY !== 'de')
      ) {
        this.props.clinicStore.setSelectClinicId(form.clinicId);
        this.props.clinicStore.setSelectClinicName(form.clinicName);
        this.props.clinicStore.setSelectClinicCode(form.recommendationCode);
      }
      let oldForm = {
        clinicId: form.clinicId,
        clinicName: form.clinicName,
        recommendationCode: form.recommendationCode || ''
      };
      this.setState({
        // successTipVisible: true,
        oldForm: oldForm
      });
      // setTimeout(() => {
      //   this.setState({
      //     successTipVisible: false
      //   });
      // }, 2000);
      this.changeEditFormVisible(false);
    } catch (err) {
      this.setState({
        errorMsg: err.message
      });
      setTimeout(() => {
        this.setState({
          errorMsg: ''
        });
      }, 3000);
    } finally {
      const { oldForm } = this.state;
      let form = {
        clinicId: oldForm.clinicId,
        clinicName: oldForm.clinicName,
        recommendationCode: oldForm.recommendationCode || ''
      };
      this.setState({
        form,
        loading: false
      });
    }
  };
  cancelClinic = () => {
    const { oldForm } = this.state;
    let form = {
      clinicName: oldForm.clinicName,
      clinicId: oldForm.clinicId,
      recommendationCode: oldForm.recommendationCode || ''
    };
    this.setState({
      form
    });
    this.changeEditFormVisible(false);
  };
  handleSelectedItemChange = (data) => {
    const { form } = this.state;
    form.clinicName = data.prescriberName;
    form.clinicId = data.id;
    form.recommendationCode = data.recommendationCode || '';
    this.setState({ form: form, isValid: !!form.clinicName });
  };
  handleClickEditBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeEditFormVisible(true);
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'Clinic' : '');
  };
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
  };
  render() {
    const {
      configStore: { info, prescriberSelectTyped },
      intl
    } = this.props;
    const { editFormVisible, form, errorMsg } = this.state;
    const curPageAtCover = !editFormVisible;
    return (
      <div className={classNames({ border: curPageAtCover })}>
        {/* {this.state.loading ? <Loading positionAbsolute="true" /> : null} */}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            <h5
              className="mb-0 text-xl"
              style={{ display: curPageAtCover ? 'block' : 'none' }}
            >
              <img
                className="account-info-icon align-middle mr-3 ml-1 inline-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/clinic.svg`}
                alt="icons communication"
                style={{ width: '1.3em', height: '1.3em' }}
              />
              <FormattedMessage id="account.clinicTitle2" />
            </h5>
            <h5
              className="ui-cursor-pointer text-xl"
              style={{ display: curPageAtCover ? 'none' : 'block' }}
              onClick={this.handleClickGoBack}
            >
              <span>&larr; </span>
              <FormattedMessage id="account.clinicTitle2" />
            </h5>

            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0 ${
                    editFormVisible ? 'hidden' : ''
                  }`}
                  name="contactPreference"
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
            <aside
              className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                this.state.successTipVisible ? '' : 'hidden'
              }`}
              role="alert"
            >
              <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                <FormattedMessage id="saveSuccessfullly" />
              </p>
            </aside>
            <div
              className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
                editFormVisible ? 'hidden' : ''
              }`}
            >
              <div className="col-lg-6">{form.clinicName || '--'}</div>
            </div>
            <div className={`${editFormVisible ? '' : 'hidden'}`}>
              <SearchSelection
                queryList={async ({ inputVal }) => {
                  const param = {
                    storeId: window.__.env.REACT_APP_STOREID,
                    keyWord: inputVal,
                    code: inputVal
                  };

                  const res = await (prescriberSelectTyped === 'PRESCRIBER_MAP'
                    ? getPrescriberByKeyWord
                    : getPrescriberByCode)(param);
                  const prescriber =
                    (res.context && res.context.prescriberVo) || [];
                  if (
                    prescriber.length === 0 &&
                    prescriberSelectTyped === 'RECOMMENDATION_CODE'
                  ) {
                    this.setState({
                      errorMsg:
                        intl.messages['myAccount.dePrescriberCodeErrMsg']
                    });
                    setTimeout(() => {
                      this.setState({
                        errorMsg: ''
                      });
                    }, 3000);
                  }
                  return prescriber.map((ele) =>
                    Object.assign(ele, {
                      name: ele.prescriberName,
                      recommendationCode:
                        prescriberSelectTyped === 'PRESCRIBER_MAP'
                          ? ''
                          : inputVal
                    })
                  );
                }}
                selectedItemChange={this.handleSelectedItemChange}
                defaultValue={this.state.form.clinicName}
                key={this.state.form.clinicName}
                placeholder={this.props.intl.messages.enterClinicName}
              />
              <div className="text-right mt-4">
                <span
                  className="rc-styled-link"
                  name="contactPreference"
                  onClick={this.cancelClinic}
                >
                  <FormattedMessage id="cancel" />
                </span>
                &nbsp;
                <FormattedMessage id="or" />
                &nbsp;
                <button
                  className={classNames('rc-btn', 'rc-btn--one', 'submitBtn', {
                    'ui-btn-loading': this.state.loading
                  })}
                  name="contactPreference"
                  type="submit"
                  disabled={!this.state.isValid}
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
export default withOktaAuth(ClinicEditForm);
