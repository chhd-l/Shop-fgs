import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import SearchSelection from '@/components/SearchSelection';
import { getPrescriberByCode } from '@/api/clinic';
import { searchNextConfirmPanel } from '../modules/utils';
import PropTypes from 'prop-types';
import ClinicPanelContainer from './ClinicPanelContainer';

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
    confirmBtnVisible: true,
    needPrescriber: false
  };
  constructor(props) {
    super(props);
    this.state = {
      form: {
        clinicName: '',
        clinicId: '',
        clinicCode: ''
      },
      toolTipVisible: false,
      isEdit: false,
      tempPrescriberData: null // 临时存放查询到的 prescriber
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {
    const { clinicStore } = this.props;
    const nName = clinicStore.selectClinicName;
    const nId = clinicStore.selectClinicId;
    const nCode = clinicStore.selectClinicCode;
    if (nName && nId) {
      this.setState({
        form: Object.assign(this.state.form, {
          clinicName: nName,
          clinicId: nId,
          clinicCode: nCode
        })
      });
    }
    this.setState({
      isEdit: !(nId && nName)
    });
    if (!this.checkoutWithClinic || (nName && nId)) {
      this.updatePanelStatus({ setToCompleted: true });
    } else {
      this.updatePanelStatus({ setToEdit: true });
    }

    // 监听回车键
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        if (
          this.state.isEdit &&
          this.state.form.clinicName &&
          !this.state.tempPrescriberData
        ) {
          this.handleClickConfirm();
        }

        // 如果有查询出数据，按下回车键选中查询的数据
        if (this.state.isEdit && this.state.tempPrescriberData) {
          this.handleSelectedItemChange(this.state.tempPrescriberData);
        }
      }
    });
  }
  get checkoutWithClinic() {
    return (
      window.__.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' &&
      this.props.needPrescriber
    );
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
    form.clinicCode = data.recommendationCode || '';
    this.setState({
      form: form,
      tempPrescriberData: null
    });
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
    const { form } = this.state;
    if (!form.clinicName) {
      return false;
    }
    this.props.clinicStore.setSelectClinicId(form.clinicId);
    this.props.clinicStore.setSelectClinicName(form.clinicName);
    this.props.clinicStore.setSelectClinicCode(form.clinicCode);
    this.updatePanelStatus({ setToCompleted: true });
    this.setState({
      isEdit: false
    });
  };
  updatePanelStatus({ setToCompleted, setToEdit }) {
    const { paymentStore } = this.props;
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: 'clinic'
    });
    if (setToCompleted) {
      paymentStore.setStsToCompleted({ key: 'clinic' });
      paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    }
    if (setToEdit) {
      paymentStore.setStsToEdit({ key: 'clinic' });
      paymentStore.setStsToPrepare({ key: nextConfirmPanel.key });
    }
  }
  render() {
    const {
      configStore: { prescriberSelectTyped },
      paymentStore: { clinicPanelStatus }
    } = this.props;
    const { isEdit } = this.state;
    const defaultJSX = (
      <>
        <ClinicPanelContainer
          {...this}
          panelStatus={clinicPanelStatus}
          onEdit={this.gotoPrescriptionPage}
          previewJSX={<div>{this.state.form.clinicName}</div>}
        />
      </>
    );

    const searchJSX = (
      <>
        <ClinicPanelContainer
          {...this}
          panelStatus={clinicPanelStatus}
          onEdit={this.handleClickEdit}
          previewJSX={<div>{this.state.form.clinicName}</div>}
        >
          {isEdit ? (
            <div className="rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs">
              <div className="d-flex align-items-center justify-content-between">
                <SearchSelection
                  queryList={async ({ inputVal }) => {
                    let res = await getPrescriberByCode({
                      code: inputVal,
                      storeId: window.__.env.REACT_APP_STOREID
                    });
                    let resobj = (
                      (res.context && res.context.prescriberVo) ||
                      []
                    ).map((ele) =>
                      Object.assign(ele, {
                        name: ele.prescriberName,
                        recommendationCode: inputVal
                      })
                    );
                    let temp = null;
                    if (resobj) {
                      temp = resobj[0];
                    }
                    this.setState({
                      tempPrescriberData: temp
                    });
                    return resobj;
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
                                  {Boolean(
                                    window.__.env
                                      .REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                                  ) && (
                                    <span className="warning_blank">
                                      <FormattedMessage id="opensANewWindow" />
                                    </span>
                                  )}
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
              <div className="d-flex justify-content-end mt-3 rc_btn_clinic_form">
                <button
                  className="rc-btn rc-btn--one rc-btn--sm"
                  onClick={this.handleClickConfirm}
                  disabled={!this.state.form.clinicName}
                >
                  <FormattedMessage id="clinic.confirm" />
                </button>
              </div>
            </div>
          ) : null}
        </ClinicPanelContainer>
      </>
    );

    return (
      <>
        {this.checkoutWithClinic
          ? prescriberSelectTyped === 'PRESCRIBER_MAP'
            ? defaultJSX
            : searchJSX
          : null}
      </>
    );
  }
}

export default ClinicForm;
