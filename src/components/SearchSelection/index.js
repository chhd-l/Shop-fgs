import React from 'react'
import { FormattedMessage } from "react-intl";

/**
 * 带有远程搜索功能的下拉选择组件
 */
class SearchSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optionList: [],
      form: {
        value: ''
      },
      loadingList: false,
      placeholder: '',
      searchForNoResult: true
    }
    this.timer = null
  }
  componentDidMount () {
    this.setState({
      form: Object.assign(this.state.form, { value: this.props.defaultValue }),
      placeholder: this.props.placeholder
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.form.value !== nextProps.defaultValue) {
      this.setState({
        form: Object.assign(this.state.form, { value: nextProps.defaultValue })
      })
    }
  }
  handleInputChange = e => {
    e.nativeEvent.stopImmediatePropagation()
    const target = e.target
    const { form } = this.state
    form.value = target.value
    this.setState({ form: form, searchForNoResult: true })
    if (!target.value) {
      return false
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.queryList()
    }, 500)
  }
  handleInputFocus = e => {
    const tmpVal = this.state.form.value
    if (tmpVal) {
      this.setState({
        placeholder: tmpVal,
        form: Object.assign(this.state.form, { value: '' }),
        currentItem: tmpVal
      })
    }
  }
  handleInputBlur = e => {
    setTimeout(() => {
      // 没有选择有效item时，回填之前的值
      this.setState({
        form: Object.assign(this.state.form, { value: this.state.currentItem }),
        searchForNoResult: true
      })
    }, 500)
  }
  async queryList () {
    this.setState({ loadingList: true })
    try {
      let res = await this.props.queryList(this.state.form.value)
      this.setState({
        optionList: res,
        loadingList: false,
        searchForNoResult: res.length > 0
      })
    } catch (err) {
      this.setState({
        optionList: [],
        loadingList: false
      })
    }
  }
  handleClickClinicItem = (e, item) => {
    e.nativeEvent.stopImmediatePropagation()
    const { form } = this.state
    form.value = item.name
    this.setState({
      form: form,
      optionList: [],
      currentItem: item.name
    })
    this.props.selectedItemChange(item)
  }
  render () {
    const { optionList, form } = this.state
    return (
      <>
        {/* // <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column"> */}
        <div className="rc-input rc-input--inline rc-margin-y--xs"
          onBlur={() => { setTimeout(() => { this.setState({ optionList: [] }) }, 500) }}>
          <input
            type="text"
            placeholder={this.state.placeholder}
            className="form-control"
            value={form.value}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          {
            this.state.loadingList
              ?
              <div className="clnc-overlay border mt-1 position-absolute w-100">
                <div className="text-center p-2">
                  <span className="ui-btn-loading ui-btn-loading-border-red" />
                </div>
              </div>
              : optionList.length
                ? <div className="clnc-overlay border mt-1 position-absolute w-100">
                  <ul className="m-0 clinic-item-container">
                    {
                      optionList.map((item, idx) => (
                        <li
                          className={`clinic-item pl-2 pr-2 ${idx !== optionList.length - 1 ? 'border-bottom' : ''}`}
                          key={idx}
                          onClick={(e) => this.handleClickClinicItem(e, item)}>{item.name}</li>
                      ))
                    }
                  </ul>
                </div>
                : null
          }
        </div>
        {/* // </div> */}
        {!this.state.searchForNoResult && optionList.length === 0 && this.props.nodataTipSlot}
      </>
    )
  }
}

export default SearchSelection