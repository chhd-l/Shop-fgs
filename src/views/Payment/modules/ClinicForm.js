import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import SearchSelection from '@/components/SearchSelection';
import { getPrescriberByCode } from '@/api/clinic';
import PropTypes from 'prop-types';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('clinicStore', 'configStore')
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
      toolTipVisible: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {
    this.setState({
      form: Object.assign(this.state.form, {
        clinicName: this.props.clinicStore.clinicName
      })
    });
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
    this.setState({ form: form }, () => {
      this.props.clinicStore.setSelectClinicId(this.state.form.clinicId);
      this.props.clinicStore.setSelectClinicName(this.state.form.clinicName);
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
  render() {
    const defaultJSX = (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="rc-icon rc-vet--xs rc-iconography"></i>{' '}
            {this.isLogin ? (
              <FormattedMessage id="payment.clinicTitle2" />
            ) : (
              <FormattedMessage id="payment.clinicTitle" />
            )}
          </h5>
          <p
            onClick={this.gotoPrescriptionPage}
            className="rc-styled-link mb-1"
          >
            <FormattedMessage id="edit" />
          </p>
        </div>
        <div>{this.props.clinicStore.selectClinicName}</div>
      </div>
    );

    const searchJSX = (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="rc-icon rc-vet--xs rc-iconography"></i>{' '}
            {this.isLogin ? (
              <FormattedMessage id="payment.clinicTitle2" />
            ) : (
              <FormattedMessage id="payment.clinicTitle" />
            )}
          </h5>
        </div>
        <div className="rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex align-items-center justify-content-between">
          <SearchSelection
            queryList={async ({ inputVal }) => {
              let res = await getPrescriberByCode({
                code: inputVal,
                storeId: process.env.REACT_APP_STOREID
              });
              return (
                (res.context && res.context.prescriberVo) ||
                []
              ).map((ele) => Object.assign(ele, { name: ele.prescriberName }));
            }}
            selectedItemChange={this.handleSelectedItemChange}
            defaultValue={this.state.form.clinicName}
            key={this.state.form.clinicName}
            placeholder={this.props.intl.messages.enterClinicName}
            customCls="flex-fill"
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
                  ></div>
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
                            <FormattedMessage id="clickHere2" />
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
      </div>
    );

    return <>{this.props.configStore.prescriberMap ? defaultJSX : searchJSX}</>;
  }
}

export default ClinicForm;
