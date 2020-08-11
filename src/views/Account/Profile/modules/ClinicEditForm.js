import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import Loading from "@/components/Loading"
import SearchSelection from "@/components/SearchSelection"
import { updateCustomerBaseInfo } from "@/api/user"
import { getPrescriberByKeyWord, getPrescriberByCode } from '@/api/clinic'
import { inject, observer } from "mobx-react";

@inject("clinicStore", "configStore")
@observer
class ClinicEditForm extends React.Component {
  constructor(props) {
    super(props)
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
      }
    }
    this.timer = null
  }
  componentDidMount () {
    const { data } = this.props
    let form = {
      clinicName: data.clinicName,
      clinicId: data.clinicId
    }
    let oldForm = {
      clinicName: data.clinicName,
      clinicId: data.clinicId
    }
    this.setState({
      form: form,
      oldForm: oldForm
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.state.form) {
      const { data } = nextProps
      let form = {
        clinicName: data.clinicName,
        clinicId: data.clinicId
      }
      let oldForm = {
        clinicName: data.clinicName,
        clinicId: data.clinicId
      }
      this.setState({
        form: form,
        oldForm: oldForm
      })
    }
  }
  async handleSave () {
    const { form } = this.state
    this.setState({ loading: true })
    try {
      if (!form.clinicId) {
        this.setState({
          errorMsg: this.props.intl.messages.choosePrescriber
        })
        setTimeout(() => {
          this.setState({
            errorMsg: ''
          })
        }, 5000)
        return false
      }
      await updateCustomerBaseInfo(Object.assign({}, this.props.originData, {
        defaultClinics: {
          clinicsId: form.clinicId,
          clinicsName: form.clinicName
        }
      }))

      this.props.updateData(this.state.form)
      let oldForm = {
        clinicId: form.clinicId,
        clinicName: form.clinicName
      }
      this.setState({
        successTipVisible: true,
        oldForm: oldForm
      })
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
    } catch (err) {
      this.setState({
        errorMsg: err.toString()
      })
      setTimeout(() => {
        this.setState({
          errorMsg: ''
        })
      }, 5000)
    } finally {
      const { oldForm } = this.state
      let form = {
        clinicId: oldForm.clinicId,
        clinicName: oldForm.clinicName
      }
      this.setState({
        form: form,
        editFormVisible: false,
        loading: false
      })
    }
  }
  cancelClinic = () => {
    const { oldForm } = this.state
    let form = {
      clinicName: oldForm.clinicName,
      clinicId: oldForm.clinicId
    }
    this.setState({
      form: form,
      editFormVisible: false
    })
  }
  handleSelectedItemChange = data => {
    const { form } = this.state
    form.clinicName = data.prescriberName
    form.clinicId = data.id
    this.setState({ form: form })
  }
  render () {
    const { editFormVisible, form } = this.state
    const { data } = this.props
    return (
      <div>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="payment.clinicTitle2" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${editFormVisible ? 'hidden' : ''}`}
                  name="contactPreference"
                  id="contactPrefEditBtn"
                  title={txt}
                  alt={txt}
                  onClick={() => { this.setState({ editFormVisible: true }) }}>
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr />
          <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
            <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
              <span>{this.state.errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                aria-label="Close"
                onClick={() => { this.setState({ errorMsg: '' }) }}>
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
            role="alert">
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none"><FormattedMessage id="saveSuccessfullly" /></p>
          </aside>
          <div className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6">{form.clinicName || '--'}</div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <SearchSelection
              queryList={async inputVal => {
                const res = await (this.props.configStore.prescriberMap
                  ? getPrescriberByKeyWord({ storeId: process.env.REACT_APP_STOREID, keyWord: inputVal })
                  : getPrescriberByCode({ storeId: process.env.REACT_APP_STOREID, code: inputVal }))
                return ((res.context && res.context.prescriberVo) || []).map(ele => Object.assign(ele, { name: ele.prescriberName }))
              }}
              selectedItemChange={data => this.handleSelectedItemChange(data)}
              defaultValue={this.state.form.clinicName}
              placeholder={this.props.intl.messages.enterClinicName} />
            <div className="text-right">
              <a
                className="rc-styled-link"
                name="contactPreference"
                onClick={() => { this.cancelClinic() }}>
                <FormattedMessage id="cancel" />
              </a>
              &nbsp;<FormattedMessage id="or" />&nbsp;
                <button
                className="rc-btn rc-btn--one submitBtn"
                name="contactPreference"
                type="submit"
                onClick={() => this.handleSave()}>
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
export default injectIntl(ClinicEditForm)