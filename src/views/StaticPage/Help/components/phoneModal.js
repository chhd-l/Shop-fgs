import React, {Component} from 'react'
import "./phoneModal.less"

class PhoneModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            phone:'默认电话'
        }
    }
    static getDerivedStateFromProps(props, state) {
        const {phone} = props
        if (phone !== state.phone) {
          return {
            phone,
          };
        }
        return null;
    }
    cancelModal=(e)=>{
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        this.props.cancelModal()
    }
    render() {
        return (
            <div className="phoneModal" onClick={this.cancelModal}>
                {this.state.phone}
            </div>
        )
    }
}
export default PhoneModal