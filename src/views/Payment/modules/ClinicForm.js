import React from 'react'
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import SearchSelection from "@/components/SearchSelection"
import { getPrescriberByCode } from '@/api/clinic'
import ConfirmTooltip from "@/components/ConfirmTooltip";

@inject("clinicStore", "configStore")
@observer
@injectIntl
class ClinicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        clinicName: '',
        clinicId: ''
      },
      toolTipVisible: false
    }
  }
  componentDidMount () {
    this.setState({
      form: Object.assign(this.state.form, { clinicName: this.props.clinicStore.clinicName })
    })
  }
  gotoPrescriptionPage = e => {
    e.preventDefault();
    sessionStorage.setItem("clinic-reselect", true);
    this.props.history.push("/prescription");
  }
  handleSelectedItemChange = data => {
    const { form } = this.state
    form.clinicName = data.prescriberName
    form.clinicId = data.id
    this.setState({ form: form }, () => {
      this.props.clinicStore.setSelectClinicId(this.state.form.clinicId)
      this.props.clinicStore.setSelectClinicName(this.state.form.clinicName)
    })
  }
  render () {
    const defaultJSX = <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
      <div className="card-header bg-transparent pt-0 pb-0">
        <h5 className="pull-left">
          <i className="rc-icon rc-health--xs rc-iconography"></i>{' '}
          {this.isLogin ?
            <FormattedMessage id="payment.clinicTitle2" />
            : <FormattedMessage id="payment.clinicTitle" />}
        </h5>
        <p
          onClick={this.gotoPrescriptionPage}
          className="rc-styled-link rc-margin-top--xs pull-right m-0">
          <FormattedMessage id="edit" />
        </p>
      </div>
      <div>
        {this.props.clinicStore.clinicName}
      </div>
    </div>

    const searchJSX = <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
      <div className="card-header bg-transparent pt-0 pb-0">
        <h5 className="pull-left">
          <i className="rc-icon rc-health--xs rc-iconography"></i>{' '}
          {this.isLogin ?
            <FormattedMessage id="payment.clinicTitle2" />
            : <FormattedMessage id="payment.clinicTitle" />}
        </h5>
      </div>
      <div className="rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex align-items-center justify-content-between">
        <SearchSelection
          queryList={async inputVal => {
            let res = await getPrescriberByCode({ code: inputVal, storeId: process.env.REACT_APP_STOREID })
            return ((res.context && res.context.prescriberVo) || []).map(ele => Object.assign(ele, { name: ele.prescriberName }))
          }}
          selectedItemChange={data => this.handleSelectedItemChange(data)}
          defaultValue={this.state.form.clinicName}
          placeholder={this.props.intl.messages.enterClinicName}
          customCls="flex-fill" />
        <span className="ml-3"
                    onClick={() => {
                      this.setState({
                        toolTipVisible: !this.state.toolTipVisible
                      },()=>{
                        console.log("鼠标进入",this.state.toolTipVisible)
                      });
                      
                    }}
                    onMouseLeave={() => {
                      this.setState({
                        toolTipVisible: false
                      },()=>{
                        console.log("鼠标移出",this.state.toolTipVisible)
                      });
                      
                    }}
        >
         
          <span
            className="info delivery-method-tooltip"
            style={{ verticalAlign: "unset" }}
            >?</span>
            <span 

            >
          <ConfirmTooltip

            containerStyle={{ transform: "translate(-91%, 112%)" }}
            arrowStyle={{ left: "92%" }}
            display={this.state.toolTipVisible}
            cancelBtnVisible={false}
            confirmBtnVisible={false}
            updateChildDisplay={(status) =>
              this.setState({
                toolTipVisible: status,
              })
            }
            content={
              <FormattedMessage
                id="noClinicTip"
                values={{
                  val: <Link
                    to="/prescriptionNavigate"
                    className="rc-styled-link font-italic">
                    <FormattedMessage id="clickHere" />
                  </Link>
                }} />
            }
          />
          </span>
        </span>
      </div>
    </div>

    return (
      <>
        {this.props.configStore.prescriberMap
          ? defaultJSX
          : searchJSX}
      </>
    )
  }
}

export default ClinicForm