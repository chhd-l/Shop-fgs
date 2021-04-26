import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';
import { getPrescriberByCode } from '@/api/clinic';
import { searchNextConfirmPanel } from '../modules/utils';
import PropTypes from 'prop-types';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('clinicStore', 'configStore', 'paymentStore', 'checkoutStore')
@injectIntl
@observer
class ClinicForm extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    arrowStyle: PropTypes.object
  };
  static defaultProps = {
    content: <FormattedMessage id="confirmDelete" />,
    containerStyle: {},
    arrowStyle: {},
    cancelBtnVisible: true,
    confirmBtnVisible: true
  };
  constructor(props) {
    super(props);
    this.state = {
      form: {
        clinicName: '',
        clinicId: ''
      },
      toolTipVisible: false,
      isEdit: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {
    const nName = this.props.clinicStore.selectClinicName;
    const nId = this.props.clinicStore.selectClinicId;
    if (nName && nId) {
      this.setState({
        form: Object.assign(this.state.form, {
          clinicName: nName,
          clinicId: nId
        })
      });
    }
    this.setState({
      isEdit: !(nId && nName)
    });
    if (this.prescriberMap || (nName && nId)) {
      this.confirmToNextPanel();
    }

    // 监听回车键
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        if (this.state.isEdit && this.state.form.clinicName) {
          this.handleClickConfirm();
        }
      }
    });
  }
  get prescriberMap() {
    return this.props.configStore.prescriberMap;
  }
  gotoPrescriptionPage = (e) => {
    e.preventDefault();
    sessionItemRoyal.set('clinic-reselect', 'true');
    this.props.history.push('/prescription');
  };
  handleSelectedItemChange = (data) => {
    const { form } = this.state;
    form.clinicName = data.prescriberName;
    form.clinicId = data.id;
    this.setState({ form: form });
  };
  handleMouseOver() {
    this.flag = 1;
    this.setState({
      toolTipVisible: true
    });
  }
  handleMouseOut() {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.setState({
          toolTipVisible: false,
          errMsg: ''
        });
      }
    }, 500);
  }
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({ key: 'clinic', hideOthers: true });
    this.setState({ isEdit: true });
  };
  handleClickConfirm = () => {
    console.log(this.state.form.clinicName);
    if (!this.state.form.clinicName) {
      return false;
    }
    this.props.clinicStore.setSelectClinicId(this.state.form.clinicId);
    this.props.clinicStore.setSelectClinicName(this.state.form.clinicName);
    // this.props.clinicStore.setLinkClinicId(this.state.form.clinicId);
    // this.props.clinicStore.setLinkClinicName(this.state.form.clinicName);
    this.confirmToNextPanel();
    this.setState({ isEdit: false });
  };
  confirmToNextPanel() {
    const { paymentStore } = this.props;
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: 'clinic'
    });

    paymentStore.setStsToCompleted({ key: 'clinic' });
    paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
  }
  render() {
    const { isEdit } = this.state;
    const defaultJSX = (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <em className="rc-icon rc-vet--xs rc-iconography" />{' '}
            {this.isLogin ? (
              <FormattedMessage id="payment.clinicTitle2" />
            ) : (
              <FormattedMessage id="payment.clinicTitle" />
            )}
            <span className="iconfont font-weight-bold green ml-2">
              &#xe68c;
            </span>
          </h5>
          <p onClick={this.gotoPrescriptionPage} className="rc-styled-link">
            <FormattedMessage id="edit" />
          </p>
        </div>
        <div>{this.state.form.clinicName}</div>
      </div>
    );

    const searchJSX = (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className={`mb-0 ${isEdit ? 'red' : ''}`}>
            <em
              className={`rc-icon rc-vet--xs ${
                isEdit ? 'rc-brand1' : 'rc-iconography'
              }`}
            />{' '}
            {this.isLogin ? (
              <FormattedMessage id="payment.clinicTitle2" />
            ) : (
              <FormattedMessage id="payment.clinicTitle" />
            )}
            {!isEdit && (
              <span className="iconfont font-weight-bold green ml-2">
                &#xe68c;
              </span>
            )}
          </h5>
          {!isEdit && (
            <p
              onClick={this.handleClickEdit}
              className="rc-styled-link mb-1"
              style={{ whiteSpace: 'nowrap' }}
            >
              <FormattedMessage id="edit" />
            </p>
          )}
        </div>
        {isEdit ? (
          <div className="rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs">
            <div className="d-flex align-items-center justify-content-between">
              <SearchSelection
                queryList={async ({ inputVal }) => {
                  let res = await getPrescriberByCode({
                    code: inputVal,
                    storeId: process.env.REACT_APP_STOREID,
                    // auditAuthority: this.props.checkoutStore.autoAuditFlag
                    auditAuthority: true
                  });
                  return (
                    (res.context && res.context.prescriberVo) ||
                    []
                  ).map((ele) =>
                    Object.assign(ele, { name: ele.prescriberName })
                  );
                }}
                selectedItemChange={this.handleSelectedItemChange}
                defaultValue={this.state.form.clinicName}
                key={this.state.form.clinicName}
                placeholder={this.props.intl.messages.enterClinicName}
                customCls="flex-fill"
                inputCustomStyle={true}
              />
              <span className="ml-3">
                <span
                  className="info delivery-method-tooltip"
                  style={{ verticalAlign: 'unset' }}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                >
                  ?
                </span>
                {this.state.toolTipVisible ? (
                  <div
                    className="confirm-tool-container position-relative"
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                  >
                    <div
                      className="confirm-tool-content rc-bg-colour--brand4 p-3"
                      style={this.props.containerStyle}
                      tabIndex="1"
                    >
                      <div
                        className="confirm-tool-arrow"
                        style={this.props.arrowStyle}
                      />
                      <div className="pt-1">
                        <FormattedMessage
                          id="noClinicTip"
                          values={{
                            val: (
                              <Link
                                to="/prescriptionNavigate"
                                target="_blank"
                                rel="nofollow"
                                className="rc-styled-link font-italic"
                              >
                                <FormattedMessage id="clickHere3" />
                                <span className="warning_blank">
                                  Opens a new window
                                </span>
                              </Link>
                            )
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </span>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="rc-btn rc-btn--one rc-btn--sm"
                onClick={this.handleClickConfirm}
                disabled={!this.state.form.clinicName}
              >
                <FormattedMessage id="clinic.confirm" />
              </button>
            </div>
          </div>
        ) : (
          <div>{this.state.form.clinicName}</div>
        )}
      </div>
    );

    return <>{this.prescriberMap ? defaultJSX : searchJSX}</>;
  }
}

export default ClinicForm;
