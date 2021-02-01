import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import './index.css'

class Tooltip extends React.Component {
    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.display) {
            setTimeout(() => {
                document.querySelector('.confirm-tool-content') && document.querySelector('.confirm-tool-content').focus()
            })
        }
    }
    render () {
        return (
            this.props.content ?
                <div
                    className="confirm-tool-container position-relative"
                    >
                    <div
                        className="confirm-tool-content2 p-3"
                        style={this.props.containerStyle}
                        tabIndex="1">
                        <div className="confirm-tool-arrow2" style={this.props.arrowStyle}></div>
                        <div >{this.props.content}</div>
                    </div>
                </div>
                : null
        )
    }
}
export default Tooltip
