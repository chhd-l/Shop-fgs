import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.css'

class ConfirmTooltip extends React.Component {
  static defaultProps = {
    content: <FormattedMessage id="confirmDelete" />,
    containerStyle: {},
    arrowStyle: {}
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.display) {
      setTimeout(() => {
        document.querySelector('.confirm-tool-content') && document.querySelector('.confirm-tool-content').focus()
      })
    }
  }
  onBlur (e) {
    e.nativeEvent.stopImmediatePropagation();
    this.props.updateChildDisplay(false)
  }
  cancel (e) {
    e.nativeEvent.stopImmediatePropagation();
    this.props.updateChildDisplay(false)
  }
  render () {
    return (
      this.props.display ?
        <div
          className="confirm-tool-container position-relative"
          onBlur={(e) => this.onBlur(e)}>
          <div
            className="confirm-tool-content rc-bg-colour--brand4 p-3"
            style={this.props.containerStyle}
            tabIndex="1">
            <div className="confirm-tool-arrow" style={this.props.arrowStyle}></div>
            <div className="pt-1 pb-3">{this.props.content}</div>
            <div className="d-flex justify-content-between">
              <div className="rc-btn rc-btn--two rc-btn--sm" onClick={(e) => { this.cancel(e) }}>
                <FormattedMessage id="cancel" />
              </div>
              <div className="rc-btn rc-btn--one rc-btn--sm mgl10" onClick={(e) => { this.props.confirm(e) }}>
                <FormattedMessage id="clinic.confirm" />
              </div>
            </div>
          </div>
        </div>
        : null
    )
  }
}
export default ConfirmTooltip
