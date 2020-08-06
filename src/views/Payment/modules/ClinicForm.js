import React from 'react'
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import SearchSelection from "@/components/SearchSelection"
import { getPrescriberByKeyWord } from '@/api/clinic'

const moduleMap = {
  es: <div></div>,
  de: <div></div>
}

@inject("clinicStore")
@observer
@injectIntl
class ClinicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      form: {
        clinicName: '',
        clinicId: ''
      }
    }
  }
  componentDidMount () {
    this.setState({
      form: Object.assign(this.state.form, { clinicName: this.props.clinicStore.clinicName }),
      isEdit: !this.props.clinicStore.clinicName
    })
  }
  gotoPrescriptionPage = e => {
    e.preventDefault();
    sessionStorage.setItem("clinic-reselect", true);
    this.props.history.push("/prescription");
  }
  handleClickEditClinicAtLocalPage = () => {
    this.setState({
      isEdit: true
    })
  }
  handleSelectedItemChange = data => {
    const { form } = this.state
    form.clinicName = data.prescriberName
    form.clinicId = data.id
    this.setState({ form: form })
  }
  handleCancel () {
    this.setState({
      form: Object.assign(this.state.form, { clinicName: this.props.clinicStore.clinicName }),
      isEdit: false
    })
  }
  handleSave () {
    this.props.clinicStore.setSelectClinicId(this.state.form.clinicId)
    this.props.clinicStore.setSelectClinicName(this.state.form.clinicName)
    this.setState({
      isEdit: false
    })
  }
  render () {
    const defaultMXJSX = <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-4">
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

    const renderMap = {
      es: defaultMXJSX,
      en: defaultMXJSX,
      de: <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-4">
        <div className="card-header bg-transparent pt-0 pb-0">
          <h5 className="pull-left">
            <i className="rc-icon rc-health--xs rc-iconography"></i>{' '}
            {this.isLogin ?
              <FormattedMessage id="payment.clinicTitle2" />
              : <FormattedMessage id="payment.clinicTitle" />}
          </h5>
          {
            !this.state.isEdit && <p
              onClick={this.handleClickEditClinicAtLocalPage}
              className="rc-styled-link rc-margin-top--xs pull-right m-0">
              <FormattedMessage id="edit" />
            </p>
          }
        </div>
        {this.state.isEdit
          ? <>
            <div className="rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              <SearchSelection
                queryList={async inputVal => {
                  let res = await getPrescriberByKeyWord({ keyWord: inputVal })
                  return ((res.context && res.context.prescriberVo) || []).map(ele => Object.assign(ele, { name: ele.prescriberName }))
                }}
                selectedItemChange={data => this.handleSelectedItemChange(data)}
                defaultValue={this.state.form.clinicName}
                placeholder={this.props.intl.messages.enterClinicName}
                nodataTipSlot={<div className="red">
                  <FormattedMessage
                    id="noClinicTip"
                    values={{
                      val: <a
                        to="/prescription"
                        onClick={this.gotoPrescriptionPage}
                        className="rc-styled-link font-italic">
                        <FormattedMessage id="clickHere" />
                      </a>
                    }} />
                </div>} />
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <a
                className="rc-styled-link"
                name="contactPreference"
                onClick={() => this.handleCancel()}>
                <FormattedMessage id="cancel" />
              </a>
          &nbsp;<FormattedMessage id="or" />&nbsp;
          <button
                className="rc-btn rc-btn--one submitBtn"
                type="submit"
                disabled={this.state.form.clinicName && this.state.form.clinicId ? false : true}
                onClick={() => this.handleSave()}>
                <FormattedMessage id="save" />
              </button>
            </div>
          </>
          : <div>
            {this.state.form.clinicName}
          </div>}
      </div>
    }

    return (
      <>
        {renderMap[process.env.REACT_APP_LANG]}
      </>
    )
  }
}

export default ClinicForm