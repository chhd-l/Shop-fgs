import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import logoAnimatedPng from '@/assets/images/logo--animated2.png';
import './index.less';
import { customerInfoSave } from '@/api/landing';
import Loading from '@/components/Loading';
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showSuccess: false,
      showFail: false,
      errMessage: '',
      inputType: [
        { name: 'Nombre', value: '', isRequired: true }, //姓名
        { name: 'Nombre de clínica', value: '', isRequired: true }, //诊所名字
        { name: 'Ciudad', value: '', isRequired: true }, //城市
        { name: 'Email', value: '', isRequired: true }
      ]
    };
  }
  gotoShop = () => {
    this.props.history.push('/');
  };
  startLoading() {
    this.setState({ loading: true });
  }
  endLoading() {
    this.setState({ loading: false });
  }
  changeEvent = (e) => {
    let copyArr = [...this.state.inputType];
    copyArr[e.target.name].value = e.target.value;
    this.setState({
      inputType: copyArr
    });
  };
  submitEvent = async () => {
    try {
      this.setState({
        showSuccess: false,
        showFail: false
      });
      let copyArr = [...this.state.inputType];
      this.isEmptyTest(copyArr);

      let name = this.state.inputType[0].value;
      let prescriberName = this.state.inputType[1].value;
      let city = this.state.inputType[2].value;
      let email = this.state.inputType[3].value;
      this.startLoading();
      const res = await customerInfoSave({
        name,
        prescriberName,
        city,
        email,
        storeId: 123456858
      });
      if (res.code === 'K-000000') {
        this.setState(
          {
            showSuccess: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                showSuccess: false
              });
            }, 3000);
          }
        );
      }
    } catch (err) {
      this.setState(
        {
          showFail: true,
          errMessage: err.message.message
        },
        () => {
          setTimeout(() => {
            this.setState({
              showFail: false
            });
          }, 3000);
        }
      );
    } finally {
      this.endLoading();
    }
  };
  //是否有没填的input框
  isEmptyTest(arr) {
    let emptyIndex;
    let isEmpty = arr.some((item, index) => {
      emptyIndex = index;
      return item.isRequired && !item.value;
    });
    if (isEmpty) {
      throw new Error(this.state.inputType[emptyIndex].name + ' empty');
    }
  }
  cal_clientWidth(clientWidth) {
    this.setState(
      {
        clientWidth
      },
      () => {
        console.log(this.state.clientWidth);
      }
    );
  }
  componentDidMount() {
    setSeoConfig()
    this.cal_clientWidth(document.body.clientWidth);
  }
  render() {
    window.onresize = () => {
      this.cal_clientWidth(document.body.clientWidth);
    };
    const event = {
      page: {
        type: 'Landing page',
        theme: ''
      }
    };
    return (
      <div className="landing-wrap">
        <GoogleTagManager additionalEvents={event} GTMID="GTM-NR3FWTQ" />
        {this.state.loading ? <Loading /> : null}
        <div className="rc-three-column">
          <div className="rc-column rc-double-width borderRight videoPadding">
            <video
              className="my-video"
              autoPlay={true}
              muted={true}
              loop={true}
              id="myVideo"
              poster="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw92b314b6/homepage/01_Slider_img_Desktop.jpg?sw=1400&amp;sfrm=png"
            >
              <source
                src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/01741c54b836d0547c5619cfd12f7b3a.mp4"
                type="video/mp4"
              />
            </video>

            {/* go to shop按钮 */}
            <div style={{ textAlign: 'center', marginTop: '-31px' }}>
              <button
                className="rc-btn rc-btn rc-btn--one"
                onClick={this.gotoShop}
              >
                Conoce la Tienda
              </button>
            </div>

            {/* 介绍 */}
            <p
              style={{
                textAlign: 'justify',
                color: '#000',
                fontSize: '14px',
                margin: '20px'
              }}
            >
              Te presentamos la innovación de Royal Canin México, eVet. La
              manera más fácil para tus pacientes de adquirir las dietas
              veterinarias y de prescripción de Royal Canin por medio de una
              plataforma exclusiva para veterinarios. Todo esto por medio de tu
              prescripción, ya que para nosotros lo más importante es el
              bienestar de los gatos y los perros, y tu Médico Veterinario
              tienes la batuta en el alimento a recomendar, por favor ponte en
              contacto con nosotros para saber cómo integrar tu clínica en esta
              nueva forma de estar en contacto con tus clientes y paciente.
            </p>
          </div>
          <div className="rc-column space" style={{ position: 'relative' }}>
            {this.state.showSuccess ? (
              <aside
                className="rc-alert rc-alert--success rc-alert--with-close"
                role="alert"
              >
                <span> Gracias! </span>
              </aside>
            ) : null}
            {this.state.showFail ? (
              <aside
                className="rc-alert rc-alert--error rc-alert--with-close"
                role="alert"
              >
                <span>{this.state.errMessage}</span>
              </aside>
            ) : null}

            <div className="rc-layout-container rc-five-column">
              <div className="rc-column rc-quad-width">
                {/* logo */}
                <Link
                  to="/"
                  className="header__nav__brand logo-home"
                  style={{ marginTop: '40px' }}
                >
                  <span className="rc-screen-reader-text"></span>
                  <LazyLoad>
                  <img
                    alt="Royal Canin"
                    src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                    style={{
                      background:
                        'url(' + logoAnimatedPng + ') no-repeat center center',
                      width: '105px',
                      height: '50px',
                      backgroundSize: 'cover'
                    }}
                  />
                  </LazyLoad>
                </Link>
                <div className="form-margin-top">
                  {/* form */}
                  {this.state.inputType.map((item, index) => {
                    return (
                      <div className="d-flex column input-margin">
                        <label>{item.name}</label>
                        <input
                          type="text"
                          name={index}
                          onChange={this.changeEvent}
                        ></input>
                      </div>
                    );
                  })}

                  {/* go to shop按钮 */}
                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                      className="rc-btn rc-btn--two"
                      onClick={this.submitEvent}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
              <div className="rc-column"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Landing);
