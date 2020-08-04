import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import Loading from "@/components/Loading"
import { updateCustomerBaseInfo } from "@/api/user"
import { getAllPrescription } from '@/api/clinic'


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
      clinicList: [],
      loadingList: false,
      oldForm:{
        clinicName: '',
        clinicId: ''
      }
    }
    this.timer = null
  }
  componentDidMount () {
    const { data } = this.props
    let form={
      clinicName: data.clinicName,
      clinicId: data.clinicId
    }
    let oldForm ={
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
      let form={
        clinicName: data.clinicName,
        clinicId: data.clinicId
      }
      let oldForm ={
        clinicName: data.clinicName,
        clinicId: data.clinicId
      }
      this.setState({
        form: form,
        oldForm: oldForm
      })
    }
  }
  handleInputChange (e) {
    e.nativeEvent.stopImmediatePropagation()
    const target = e.target
    const { form } = this.state
    form[target.dataset.name] = target.value
    form['clinicId'] = null
    this.setState({ form: form })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getClinicList()
    }, 500)
  }
  async getClinicList () {
    this.setState({ loadingList: true })
    let res = await getAllPrescription({ storeId: process.env.REACT_APP_STOREID, prescriberName: this.state.form.clinicName })
    this.setState({
      clinicList: (res.context && res.context.prescriberVo) || [],
      loadingList: false
    })
  }
  handleClickClinicItem (e, item) {
    e.nativeEvent.stopImmediatePropagation()
    const { form } = this.state
    form.clinicName = item.prescriberName
    form.clinicId = item.id
    this.setState({
      form: form,
      clinicList: []
    })
  }
  async handleSave () {
    const { form } = this.state
    this.setState({ loading: true })
    try {   
      if(!form.clinicId){
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
        oldForm:oldForm
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
      const {oldForm} = this.state
      let form = {
        clinicId: oldForm.clinicId,
        clinicName: oldForm.clinicName
      }
      this.setState({
        form:form,
        editFormVisible: false,
        loading: false
      })
    }
  }
  cancelClinic=()=>{
    const {oldForm} = this.state
    let form ={
      clinicName:oldForm.clinicName,
      clinicId :oldForm.clinicId
    }
    this.setState({ 
      form:form,
      editFormVisible: false 
    })
  }
  render () {
    const { editFormVisible, form, clinicList } = this.state
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
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none"><FormattedMessage id="saveSuccessfullly"/></p>
          </aside>
          <div className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6">{form.clinicName || '--'}</div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              <div className="rc-input rc-input--inline rc-margin-y--xs"
                onBlur={() => { setTimeout(() => { this.setState({ clinicList: [] }) }, 500) }}>
                <input
                  type="text"
                  placeholder={this.props.intl.messages.enterClinicName}
                  className="form-control"
                  value={form.clinicName}
                  onChange={event => this.handleInputChange(event)}
                  data-name="clinicName"
                />
                {
                  this.state.loadingList
                    ?
                    <div className="clnc-overlay border mt-1 position-absolute w-100">
                      <div className="text-center p-2">
                        <span className="ui-btn-loading ui-btn-loading-border-red" />
                      </div>
                    </div>
                    : clinicList.length
                      ? <div className="clnc-overlay border mt-1 position-absolute w-100">
                        <ul className="m-0 clinic-item-container">
                          {
                            clinicList.map((item, idx) => (
                              <li
                                className={`clinic-item pl-2 pr-2 ${idx !== clinicList.length - 1 ? 'border-bottom' : ''}`}
                                key={idx}
                                onClick={(e) => this.handleClickClinicItem(e, item)}>{item.prescriberName}</li>
                            ))
                          }
                        </ul>
                      </div>
                      : null
                }
              </div>
            </div>
            <div className="text-right">
              <a
                className="rc-styled-link"
                name="contactPreference"
                onClick={() =>  { this.cancelClinic() }}>
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