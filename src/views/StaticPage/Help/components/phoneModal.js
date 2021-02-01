import React, {Component} from 'react'
import "./phoneModal.less"
import phoneImg from "./images/phone.png"

class PhoneModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            phone:'0800005360'
        }
    }
    cancelModal=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.props.cancelModal()
    }
    render() {
        return (
            <div className="phoneModal" onClick={()=>this.cancelModal}>
                <div>
                    <a className="phoneInfo" href={`tel:${this.state.phone}`} onClick={()=>this.cancelModal}>
                    <img src={phoneImg} className="phoneImage"></img>Appeler+0800005360
                    </a>
                    <a className="cancelPhone" onClick={this.cancelModal}>
                    Annuler
                    </a>
                </div>
            </div>
        )
    }
}
export default PhoneModal