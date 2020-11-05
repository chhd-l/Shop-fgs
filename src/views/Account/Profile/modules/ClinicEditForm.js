import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import SearchSelection from '@/components/SearchSelection';
import { updateCustomerBaseInfo } from '@/api/user';
import { getPrescriberByKeyWord, getPrescriberByCode } from '@/api/clinic';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

@inject('configStore')
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
        clinicId: ''
      },
      loadingList: false,
      oldForm: {
        clinicName: '',
        clinicId: ''
      },
      haveNoDefaultClinic: true
    };
    this.timer = null;
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    let form = {
      clinicName: data.clinicName,
      clinicId: data.clinicId
    };
    let oldForm = {
      clinicName: data.clinicName,
      clinicId: data.clinicId
    };
    this.setState({
      form: form,
      oldForm: oldForm
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.form) {
      const { data } = nextProps;
      let form = {
        clinicName: data.clinicName,
        clinicId: data.clinicId
      };
      let oldForm = {
        clinicName: data.clinicName,
        clinicId: data.clinicId
      };
      this.setState({
        form,
        oldForm,
        haveNoDefaultClinic: !form.clinicName
      });
    }
  }
  handleRadioChange(status) {
    this.setState({ haveNoDefaultClinic: status });
  }
  handleSave = async () => {
    const { form } = this.state;
    this.setState({ loading: true });
    try {
      // 必须要选择一个，才能保存？
      if (!form.clinicId) {
        this.setState({
          errorMsg: this.props.intl.messages.choosePrescriber
        });
        setTimeout(() => {
          this.setState({
            errorMsg: ''
          });
        }, 5000);
        return false;
      }
      await updateCustomerBaseInfo(
        Object.assign({}, this.props.originData, {
          defaultClinics: {
            clinicsId: form.clinicId,
            clinicsName: form.clinicName
          }
        })
      );

      this.props.updateData(this.state.form);
      let oldForm = {
        clinicId: form.clinicId,
        clinicName: form.clinicName
      };
      this.setState({
        successTipVisible: true,
        oldForm: oldForm
      });
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        });
      }, 2000);
    } catch (err) {
      this.setState({
        errorMsg: err.message.toString()
      });
      setTimeout(() => {
        this.setState({
          errorMsg: ''
        });
      }, 5000);
    } finally {
      const { oldForm } = this.state;
      let form = {
        clinicId: oldForm.clinicId,
        clinicName: oldForm.clinicName
      };
      this.setState({
        form,
        loading: false
      });
      this.changeEditFormVisible(false);
    }
  };
  cancelClinic = () => {
    const { oldForm } = this.state;
    let form = {
      clinicName: oldForm.clinicName,
      clinicId: oldForm.clinicId
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
    this.setState({ form: form });
  };
  handleClickEditBtn = () => {
    this.changeEditFormVisible(true);
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'Clinic' : '');
  };
  render() {
    const { editFormVisible, form, haveNoDefaultClinic } = this.state;
    return (
      <div className={classNames({ border: !editFormVisible })}>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            <h5 className="rc-margin--none">
              <span className="iconfont title-icon">&#xe6a4;</span>
              <FormattedMessage id="payment.clinicTitle2" />
            </h5>
            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${
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
          <hr />
          <div className="pl-3 pr-3 pb-3">
            <div
              className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                this.state.errorMsg ? '' : 'hidden'
              }`}
            >
              <aside
                className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                role="alert"
              >
                <span className="pl-0">{this.state.errorMsg}</span>
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
              <div className="rc-input rc-input--inline">
                <input
                  className="rc-input__radio"
                  id="account-info-ihaveADefaultClinic"
                  checked={!haveNoDefaultClinic}
                  name="account-info-defaultClinic"
                  type="radio"
                  onChange={this.handleRadioChange.bind(this, false)}
                />
                <label
                  className="rc-input__label--inline"
                  for="account-info-ihaveADefaultClinic"
                >
                  <FormattedMessage id="ihaveADefaultClinic" />
                </label>
              </div>
              <SearchSelection
                queryList={async ({ inputVal }) => {
                  const res = await (this.props.configStore.prescriberMap
                    ? getPrescriberByKeyWord({
                        storeId: process.env.REACT_APP_STOREID,
                        keyWord: inputVal
                      })
                    : getPrescriberByCode({
                        storeId: process.env.REACT_APP_STOREID,
                        code: inputVal
                      }));
                  return (
                    (res.context && res.context.prescriberVo) ||
                    []
                  ).map((ele) =>
                    Object.assign(ele, { name: ele.prescriberName })
                  );
                }}
                selectedItemChange={(data) =>
                  this.handleSelectedItemChange(data)
                }
                defaultValue={this.state.form.clinicName}
                key={this.state.form.clinicName}
                placeholder={this.props.intl.messages.enterClinicName}
              />
              <div className="rc-input rc-input--inline">
                <input
                  className="rc-input__radio"
                  id="account-info-noDefaultClinic"
                  checked={haveNoDefaultClinic}
                  name="account-info-defaultClinic"
                  type="radio"
                  onChange={this.handleRadioChange.bind(this, true)}
                />
                <label
                  className="rc-input__label--inline"
                  for="account-info-noDefaultClinic"
                >
                  <FormattedMessage id="noDefaultClinic" />
                </label>
              </div>
              <div className="text-right">
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
                  className="rc-btn rc-btn--one submitBtn"
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
export default ClinicEditForm;
