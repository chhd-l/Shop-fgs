import React from "react"
import { FormattedMessage } from 'react-intl'
import Loading from "@/components/Loading"
import { updateCustomerBaseInfo } from "@/api/user"
import { getAllPrescription } from '@/api/clinic'
import { STOREID } from "@/utils/constant"

export default class ClinicEditForm extends React.Component {
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
      loadingList: false
    }
    this.timer = null
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.state.form) {
      this.setState({
        form: Object.assign({}, nextProps.data)
      })
    }
  }
  handleInputChange (e) {
    e.nativeEvent.stopImmediatePropagation()
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getClinicList()
    }, 500)
  }
  async getClinicList () {
    this.setState({ loadingList: true })
    let res = await getAllPrescription({ storeId: STOREID, prescriberName: this.state.form.clinicName })
    this.setState({
      clinicList: res.context && res.context.prescriberVo || [],
      loadingList: false
    })
  }
  handleClickClinicItem (e, item) {
    e.nativeEvent.stopImmediatePropagation()
    const { form } = this.state
    form.clinicName = item.prescriberName
    form.clinicId = item.prescriberId
    this.setState({
      form: form,
      clinicList: []
    })
  }
  async handleSave () {
    const { form } = this.state
    this.setState({ loading: true })
    try {
      await updateCustomerBaseInfo(Object.assign({}, this.props.originData, {
        defaultClinics: {
          clinicsId: form.clinicId,
          clinicsName: form.clinicName
        }
      }))
      this.props.updateData(this.state.form)
      this.setState({
        successTipVisible: true
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
      this.setState({
        editFormVisible: false,
        loading: false
      })
    }
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
                  className={`editPersonalInfoBtn rc-styled-link ${editFormVisible ? 'hidden' : ''}`}
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
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Save successfullly</p>
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
                  placeholder="Enter clinic name"
                  className="form-control"
                  value={form.clinicName}
                  onChange={event => this.handleInputChange(event)}
                  name="clinicName"
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
                onClick={() => { this.setState({ editFormVisible: false }) }}>
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