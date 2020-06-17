import React from 'react'
import './index.css'
import Filter from "../Filters";

class ConfirmTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
        console.log(this.state.dispaly)
    }
    componentDidMount(){
        console.log('enter child')
    }

    onBlur(e) {
        console.log('onBlur')
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateChildDisplay(false)
    }
    cancel (e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateChildDisplay(false)
        console.log(e, 'cancel')
    }
    render() {
        return (
            <div >
                { this.props.display ? (
                    <div className="container" onBlur={(e) => this.onBlur(e)}>
                        <div className='content' tabIndex='1234'>
                            <div>{this.state.content}</div>
                            <div className='footer'>
                                <div className='btns-wrapper'>
                                    <button className="rc-btn rc-btn--two rc-btn--sm" onClick={(e) => {this.cancel(e)}}>取消</button>
                                    <button className="rc-btn rc-btn--one rc-btn--sm mgl10" onClick={(e) => {this.props.confirm(e)}}>确认</button>
                                </div>
                            </div>
                        </div>
                </div>
                    ) : null
                }
            </div>
        )
    }
}
export default ConfirmTooltip
