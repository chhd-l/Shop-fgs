import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import logoAnimatedPng from "@/assets/images/logo--animated.png";
import "./index.css"
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType: [
                { name: 'Nombre', value: '' },
                { name: 'Nombre de clínica', value: '' },
                { name: 'Ciudad', value: '' },
                { name: 'Email', value: '' },
            ]
        };
    }
    render() {
        return (
            <div className="landing-wrap">
                <Link to="/" className="header__nav__brand logo-home pt-2">
                    <span className="rc-screen-reader-text"></span>
                    <img
                        alt="Royal Canin"
                        src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                        style={{ background: "url(" + logoAnimatedPng + ") no-repeat center center", width: '105px', height: '40px', backgroundSize: 'cover' }}
                    />
                </Link>
                <div style={{ marginTop: '100px' }}>
                    <Link to="/" style={{display:'flex',justifyContent:'center',height:'300px'}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/Yiktt8SkL3A?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Link>

                    <p style={{ textAlign: 'justify', color: '#000', fontSize: '14px', marginTop: '30px' }}>Te presentamos la innovación de Royal Canin México, eVet. La manera más fácil para tus pacientes de adquirir las dietas veterinarias y de prescripción de Royal Canin por medio de una plataforma exclusiva para veterinarios. Todo esto por medio de tu prescripción, ya que para nosotros lo más importante es el bienestar de los gatos y los perros, y tu Médico Veterinario tienes la batuta en el alimento a recomendar, por favor ponte en contacto con nosotros para saber cómo integrar tu clínica en esta nueva forma de estar en contacto con tus clientes y paciente.</p>

                    {
                        this.state.inputType.map(item => {
                            return (
                                <div class="rc-two-column" style={{ alignItems: 'baseline' }}>
                                    <div class="rc-column" style={{ padding: 0 }}>
                                        <div class="rc-content-v-right" style={{ paddingTop: '10px' }}>
                                            <h4 class="rc-delta" style={{ fontSize: '12px' }}>{item.name}:</h4>
                                        </div>
                                    </div>
                                    <div class="rc-column" style={{ padding: '0 0 0 20px' }}>
                                        <div class="rc-content-v-left">
                                            <span class="rc-input rc-input--inline rc-input--label">
                                                <input class="rc-input__control" id="id-textsuffix" type="text" name="text" style={{ fontSize: '12px',paddingBottom:0 }} />
                                                <label class="rc-input__label" for="id-textsuffix" style={{ fontSize: '12px' }}>
                                                    <span class="rc-input__label-text">Text input</span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                    {/* 按钮 */}
                    <div style={{ textAlign: 'center', margin: '30px 0 ' }}>
                        <button className="rc-btn rc-btn rc-btn--one px-5">Submit</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default injectIntl(Landing);
