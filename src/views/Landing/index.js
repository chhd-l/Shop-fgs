import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import logoAnimatedPng from "@/assets/images/logo--animated.png";
import "./index.css"
import {
    customerInfoSave
} from "@/api/landing";
import Loading from "@/components/Loading";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            clientWidth:0,//屏幕宽度
            inputType: [
                { name: 'Nombre', value: '',isRequired:true },//姓名
                { name: 'Nombre de clínica', value: '',isRequired:true },//诊所名字
                { name: 'Ciudad', value: '',isRequired:true },//城市
                { name: 'Email', value: '',isRequired:true },
            ],
            inputSuccessClass:["rc-input", "rc-input--inline", "rc-input--label","rc-input--success"],
            inputClass:["rc-input", "rc-input--inline", "rc-input--label"],
        };
    }
    startLoading () {
        this.setState({ loading: true });
    }
    endLoading () {
        this.setState({ loading: false });
    }
    changeEvent=(e)=>{
        let copyArr = [...this.state.inputType]
        copyArr[e.target.name].value = e.target.value
        this.setState({
            inputType: copyArr
        })
    }
    submitEvent= async ()=>{
        try {
            let copyArr = [...this.state.inputType]
            this.isEmptyTest(copyArr)

            let name = this.state.inputType[0].value
            let prescriberName = this.state.inputType[1].value
            let city = this.state.inputType[2].value
            let email = this.state.inputType[3].value
            this.startLoading()
            await customerInfoSave({                     
                name,
                prescriberName,
                city,  
                email,
                "storeId": 123456858
            })
        }catch(err){
            console.log(err.message)
            alert(err.message)
        }finally{
            this.endLoading()     
        }
    }
    //是否有没填的input框
    isEmptyTest(arr){
       let emptyIndex
       let isEmpty = arr.some((item,index)=>{
            emptyIndex = index
            return item.isRequired&&(!item.value)
        })
        if (isEmpty) {
            throw new Error(this.state.inputType[emptyIndex].name+' wrong')
        }
    }
    cal_clientWidth(clientWidth){
        this.setState({
            clientWidth
        },()=>{
            console.log(this.state.clientWidth)
        })
    }
    componentDidMount(){
        this.cal_clientWidth(document.body.clientWidth)
    }
    render() {
        window.onresize = ()=>{
           this.cal_clientWidth(document.body.clientWidth)
        }
        
        return (
            <div className="landing-wrap">
                {this.state.loading ? <Loading /> : null}
                {/* logo */}
                <Link to="/" className="header__nav__brand logo-home pt-2">
                    <span className="rc-screen-reader-text"></span>
                    <img
                        alt="Royal Canin"
                        src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                        style={{ background: "url(" + logoAnimatedPng + ") no-repeat center center", width: '105px', height: '40px', backgroundSize: 'cover' }}
                    />
                </Link>
                <div style={{ marginTop: '100px' }}>
                    {/* banger视频 */}
                    <Link to="/" style={{display:'flex',justifyContent:'center',height:'300px'}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/Yiktt8SkL3A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Link>

                    {/* 介绍 */}
                    <p style={{ textAlign: 'justify', color: '#000', fontSize: '14px', marginTop: '30px' }}>Te presentamos la innovación de Royal Canin México, eVet. La manera más fácil para tus pacientes de adquirir las dietas veterinarias y de prescripción de Royal Canin por medio de una plataforma exclusiva para veterinarios. Todo esto por medio de tu prescripción, ya que para nosotros lo más importante es el bienestar de los gatos y los perros, y tu Médico Veterinario tienes la batuta en el alimento a recomendar, por favor ponte en contacto con nosotros para saber cómo integrar tu clínica en esta nueva forma de estar en contacto con tus clientes y paciente.</p>

                    {/* form */}
                    {
                        this.state.inputType.map((item,index) => {
                            return (
                                <div class="rc-two-column" style={{ alignItems: 'baseline' }}>
                                    <div class="rc-column" style={{ padding: 0 }}>
                                        <div class={this.state.clientWidth>769?'rc-content-v-right':'rc-content-v-left'} style={{ paddingTop: '10px' }}> 
                                            <h4 class="rc-delta" style={{ fontSize: '12px' }}>{item.name}:</h4>
                                        </div>
                                    </div>
                                    <div class={this.state.clientWidth>769?'rc-column pr20':'rc-column p0'}> 
                                        <div class="rc-content-v-left">
                                            <span className={item.value?this.state.inputSuccessClass.join(" "):this.state.inputClass.join(" ")}>
                                                <input class="rc-input__control" id="id-textsuffix" type="text" name="text" style={{ fontSize: '12px',paddingBottom:0 }} name={index} onChange={this.changeEvent} />
                                                <label class="rc-input__label" for="id-textsuffix" style={{ fontSize: '12px'}}>
                                                    <span class="rc-input__label-text">Text input</span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                    {/* submit按钮 */}
                    <div style={{ textAlign: 'center', margin: '30px 0 ' }}>
                        <button className="rc-btn rc-btn rc-btn--one px-5" onClick={this.submitEvent}>Submit</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default injectIntl(Landing);
