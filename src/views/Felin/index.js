import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyLoad from 'react-lazyload';
import dateIcon from '@/assets/images/date.png';
import { getFormatDate, datePickerConfig } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import Selection from '@/components/Selection';
import DatePicker from 'react-datepicker';
import { ADDRESS_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';
import { Link } from 'react-router-dom';

function Divider() {
  return (
    <div
      className="rc-border-bottom rc-border-colour--brand4"
      style={{ borderBottomWidth: '4px' }}
    />
  );
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

function scrollIntoView(element) {
  const headerElement = document.querySelector(`.Felin`);
  if (element && headerElement) {
    // console.log(getElementTop(element) headerElement.offsetHeight)
    window.scroll({
      top: getElementTop(element) - 80,
      behavior: 'smooth'
    });
  }
}

function scrollPaymentPanelIntoView(id) {
  scrollIntoView(document.querySelector(`#${id}`));
}

export default class Felin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      loading: false,
      saveLoading: false,
      showModal: false,
      isAdd: true,
      errorMsg: '',
      successMsg: '',
      userInfo: {
        username: '',
        phoneNumber: '',
        email: ''
      },
      countryList: [],
      isValid: false,
      curType: 'delivery',
      errMsgObj: {},
      selectedDate: new Date(),
      step: 1,
      selectedTimeObj: {
        name: '',
        value: ''
      },
      nextBtnEnable: false,
      nextBtnShow: true,
      felinType: 0,
      consentChecked: false
    };
  }
  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    let { userInfo } = this.state;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    userInfo[name] = value;
    this.setState({ userInfo });
  };
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState(
        {
          errMsgObj: Object.assign({}, errMsgObj, {
            [target.name]: ''
          })
        },
        () => {
          this.updateButtonState();
        }
      );
    } catch (err) {
      console.log(err, 'err');
      this.setState(
        {
          errMsgObj: Object.assign({}, errMsgObj, {
            [target.name]: err.message
          })
        },
        () => {
          this.updateButtonState();
        }
      );
    }
  };
  goNextStep() {
    let { step, selectedTimeObj } = this.state;
    this.setState({ step: step + 1 }, () => {
      if (step === 2) {
        this.setState({ nextBtnShow: false });
      }
      this.updateButtonState();
    });
  }
  updateButtonState() {
    let {
      step,
      selectedTimeObj,
      consentChecked,
      selectedDate,
      felinType
    } = this.state;
    if (step === 1 && selectedTimeObj.value && selectedDate) {
      this.setState({ nextBtnEnable: true });
    } else if (step === 2) {
      this.setState({ nextBtnEnable: true });
    } else if (
      step === 4 &&
      Object.values(this.state.errMsgObj).every((el) => el === '') &&
      consentChecked
    ) {
      this.setState({ nextBtnEnable: true });
    } else {
      this.setState({ nextBtnEnable: false });
    }
  }
  render() {
    let { userInfo, errMsgObj, nextBtnEnable, nextBtnShow } = this.state;
    return (
      <div className="Felin">
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div className="rc-bg-colour--brand3 pt-4 pb-4">
            <div className="d-flex justify-content-center">
              <span
                className="ui-cursor-pointer"
                onClick={() => {
                  scrollPaymentPanelIntoView('section5');
                }}
              >
                En savoir plus
              </span>
              <span
                className="ui-cursor-pointer"
                onClick={() => {
                  scrollPaymentPanelIntoView('felinFooter');
                }}
              >
                Réserver un rendez-vous
              </span>
              {/* <Link to="/help/contact"> */}
              <span
                className="ui-cursor-pointer"
                style={{ color: '#666' }}
                onClick={() => {
                  scrollPaymentPanelIntoView('felinFooter');
                }}
              >
                Contacter L'Atelier Félin
              </span>
              {/* </Link> */}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="contactUs">
              <div className="rc-gamma inherit-fontsize">
                <h3>Contacter l’Atelier Félin</h3>
              </div>
              <p className="mb-20">
                Nous cherchons à apporter le meilleur pour votre chat. Contactez-nous pour en savoir plus sur l’Atelier Félin et notre mission.
              </p>
              <p>latelierfelin@royalcanin.com</p>
              <p className="mb-20">(555) 555-5555</p>
              <p>6 Rue des Coutures Saint-Gervais</p>
              <p className="mb-20">75003 Paris</p>
              <p>Horaires d’ouverture :</p>
              <p className="mb-20">Mardi - Dimanche, 10h - 20h</p>
            </div>
            <div class="rc-layout-container rc-two-column rc-content-h-middle">
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/logoAtelier felin.png`}
                    />
                  </LazyLoad>
                  <div className="rc-gamma inherit-fontsize mt-2">
                    <h3>
                      Un nouveau lieu d’échanges sur la santé et le bien-être de
                      votre chat, au coeur de Paris
                    </h3>
                  </div>

                  <button
                    className="rc-btn rc-btn--one"
                    onClick={() => {
                      scrollPaymentPanelIntoView('felinFooter');
                    }}
                  >
                    Venez rencontrer nos comportementalistes félins
                  </button>
                  <p className="mt-3">
                    L'Atelier Félin est ouvert du 20 avril au 12 juin 2021
                  </p>
                </h1>
              </div>
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/cat.jpeg`}
                    />
                  </LazyLoad>
                </h1>
              </div>
            </div>
            <div class="rc-layout-container rc-two-column rc-content-h-middle">
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <div className="content">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>
                        Vous partagez votre vie avec un chat en appartement ?
                        Posez toutes vos questions à nos experts
                      </h3>
                    </div>
                    <p className="mb-20">
                      L’Atelier Félin est fait pour vous : venez rencontrer des
                      experts, posez-leur vos questions sur le comportement de
                      votre chat, ses habitudes, ses soins et la nourriture la
                      plus appropriée à ses besoins…
                    </p>
                    <p className="mb-20">
                      Des comportementalistes félins et vétérinaires vous
                      accueillent pour établir le profil de votre chat et vous
                      apporter gratuitement des conseils personnalisés et
                      spécifiques à la vie en appartement.
                    </p>
                    <button
                      className="rc-btn rc-btn--two"
                      onClick={() => {
                        scrollPaymentPanelIntoView('felinFooter');
                      }}
                    >
                      Venez rencontrer nos experts
                    </button>
                  </div>
                </h1>
              </div>
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/person.jpeg`}
                    />
                  </LazyLoad>
                </h1>
              </div>
            </div>
            <Divider />
            <div class="rc-layout-container rc-two-column rc-content-h-middle">
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/grid.jpeg`}
                    />
                  </LazyLoad>
                </h1>
              </div>
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <div className="content">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>
                        Obtenez une recommandation personnalisée pour son
                        alimentation
                      </h3>
                    </div>
                    <p className="mb-20">
                      Chaque chat est unique et a des besoins spécifiques selon
                      sa race, son âge, ses sensibilités et son mode de vie.
                    </p>
                    <p className="mb-20">
                      En nous communiquant le profil de votre chat,  nous
                      déterminerons ensemble l'aliment qui lui  conviendra le
                      mieux.
                    </p>
                    <button
                      className="rc-btn rc-btn--two"
                      onClick={() => {
                        scrollPaymentPanelIntoView('section5');
                      }}
                    >
                      Venez découvrir l’univers du chat dans notre magasin
                    </button>
                  </div>
                </h1>
              </div>
            </div>
            <Divider />
            <div class="rc-layout-container rc-two-column rc-content-h-middle">
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <div className="content">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>
                        Faites l’expérience  de notre nouveau service  de
                        distribution de croquettes personnalisé et plus durable
                      </h3>
                    </div>
                    <p className="mb-20">
                      Toutes nos croquettes sont distribuées à la demande et
                      servies dans un contenant réutilisable et consigné.
                      Lorsque votre contenant est vide, vous pouvez le recharger
                      en boutique, ou vous faire livrer une nouvelle dose. Notre
                      livreur repartira avec le contenant vide qui sera
                      reconditionné pour un nouvel usage.
                    </p>
                    <button
                      className="rc-btn rc-btn--two"
                      onClick={() => {
                        scrollPaymentPanelIntoView('section5');
                      }}
                    >
                      Venez découvrir l’univers du chat dans notre magasin
                    </button>
                  </div>
                </h1>
              </div>
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/box.jpeg`}
                    />
                  </LazyLoad>
                </h1>
              </div>
            </div>
            <Divider />
            <div
              id="section5"
              class="rc-layout-container rc-two-column rc-content-h-middle"
            >
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/store.jpeg`}
                    />
                  </LazyLoad>
                </h1>
              </div>
              <div class="rc-column">
                <h1 class="rc-espilon">
                  <div className="content">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>Découvrez l’Atelier Félin</h3>
                    </div>
                    <p className="mb-20">
                      L’Atelier Félin est un lieu unique de Royal Canin,
                      spécialiste de la santé animale et de la nutrition.
                    </p>
                    <p className="mb-20">
                      Nous vous accueillons au coeur du marais, au 6 Rue des
                      Coutures Saint-Gervais, du 20 avril au 12 juin 2021.
                    </p>
                    <p className="mb-20">
                      Venez rencontrer nos associations partenaires pour adopter
                      des chats (le weekend exclusivement).
                    </p>
                  </div>
                </h1>
              </div>
            </div>
            <Divider />

            <div className="rc-padding--sm rc-max-width--xl">
              <div className="row">
                <div
                  id="felinFooter"
                  className="col-12 text-center"
                  style={{ paddingTop: '50px' }}
                >
                  <div className="rc-gamma inherit-fontsize">
                    <h3 style={{ display: 'inline-block' }}>
                      Réservez un rendez-vous  avec un de nos experts dès à
                      présent.
                    </h3>
                  </div>
                  <div
                    style={{
                      width: '300px',
                      display: 'inline-block',
                      textAlign: 'left'
                    }}
                  >
                    {this.state.step === 1 ? (
                      <>
                        <p style={{ fontWeight: '500' }}>
                          Choisissez un rendez-vous
                        </p>
                        <div style={{ borderBottom: '2px solid #' }}>
                          <h1
                            className="rc-card__meta order-Id"
                            style={{
                              marginTop: '10px',
                              display: 'inline-block',
                              width: '283px'
                            }}
                          >
                            <DatePicker
                              className="receiveDate"
                              placeholder="Select Date"
                              dateFormat={datePickerConfig.format}
                              locale={datePickerConfig.locale}
                              minDate={new Date()}
                              selected={this.state.selectedDate}
                              // selected={new Date()}
                              onChange={(date) => {
                                this.setState(
                                  { selectedDate: new Date(date) },
                                  () => {
                                    this.updateButtonState();
                                  }
                                );
                              }}
                            />
                          </h1>
                          <span class="icon iconfont iconfont-date">
                            &#xe6b3;
                          </span>
                        </div>
                        <div>
                          <Selection
                            placeholder="Choose a time slot"
                            optionList={[
                              { name: '10:00 – 10:20 AM', value: '111' },
                              { name: '10:30 – 10:50 AM', value: '222' },
                              {
                                name: '11:00 – 11:20 AM',
                                value: '333',
                                disabled: true
                              },
                              { name: '11:30 – 11:50 AM', value: '444' }
                            ]}
                            selectedItemChange={(data) => {
                              console.log(data);
                              this.setState({ selectedTimeObj: data }, () => {
                                this.updateButtonState();
                              });
                            }}
                            selectedItemData={{
                              value: this.state.selectedTimeObj.value
                            }}
                            enableBlur={false}
                          />
                        </div>
                      </>
                    ) : null}
                    {this.state.step === 2 ? (
                      <>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          Mon redenz-vous
                        </p>
                        <div style={{ padding: '.5rem 0' }}>
                          <div style={{ position: 'relative' }}>
                            <input
                              className="rc-input__radio"
                              id="female"
                              value="1"
                              checked={this.state.felinType}
                              type="radio"
                              name="gender"
                              onChange={(e) => {
                                this.setState({ felinType: 1 });
                              }}
                            />
                            <label
                              className="rc-input__label--inline"
                              htmlFor="female"
                            >
                              <FormattedMessage id="Virtual appointment" />
                            </label>
                          </div>
                          <div style={{ position: 'relative' }}>
                            <input
                              className="rc-input__radio"
                              id="male"
                              value="0"
                              checked={!this.state.felinType}
                              type="radio"
                              name="gender"
                              onChange={(e) => {
                                this.setState({ felinType: 0 });
                              }}
                              // onChange={(e) => this.genderChange(e)}
                            />
                            <label
                              className="rc-input__label--inline"
                              htmlFor="male"
                            >
                              <FormattedMessage id="Face-to-face appointment" />
                            </label>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {this.state.step === 3 ? (
                      <>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          Mon redenz-vous
                        </p>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          Consultation expert
                        </p>
                        <p
                          className="text-center"
                          style={{ margin: '10px 0 20px' }}
                        >
                          {this.state.selectedTimeObj.name}
                        </p>
                        <button
                          className="rc-btn rc-btn--one"
                          style={{ width: '100%' }}
                          onClick={() => {
                            this.setState({ step: this.state.step + 1 });
                          }}
                        >
                          <FormattedMessage id="Continuer en tant qu'invité" />
                        </button>
                        <button
                          className="rc-btn rc-btn--two"
                          style={{ margin: '5px 0', width: '100%' }}
                        >
                          <FormattedMessage id="Se connecter" />
                        </button>
                      </>
                    ) : null}
                    {this.state.step === 4 ? (
                      <>
                        <div className="row">
                          <div className="form-group col-lg-12 pull-left required">
                            {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="address"
                              >
                                <FormattedMessage id="payment.firstName" />
                              </label> */}
                            <span
                              className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                type="text"
                                className="rc-input__control"
                                id="username"
                                name="username"
                                required=""
                                aria-required="true"
                                value={userInfo.username}
                                onChange={this.handleInputChange}
                                onBlur={this.inputBlur}
                                maxLength="50"
                                autoComplete="address-line"
                                placeholder="Votre nom (obligatoire)"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="username"
                              />
                            </span>
                            {errMsgObj.username && (
                              <div className="text-danger-2">
                                {errMsgObj.username}
                              </div>
                            )}
                          </div>
                          <div className="form-group col-lg-12 pull-left required">
                            {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="lastName"
                              >
                                <FormattedMessage id="payment.lastName" />
                              </label> */}
                            <span
                              className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                type="text"
                                className="rc-input__control"
                                id="email"
                                name="email"
                                required=""
                                aria-required="true"
                                value={userInfo.email}
                                onChange={this.handleInputChange}
                                onBlur={this.inputBlur}
                                maxLength="50"
                                autoComplete="address-line"
                                placeholder="Votre adresse e-mail (obligatoire)"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="email"
                              />
                            </span>
                            {errMsgObj.email && (
                              <div className="text-danger-2">
                                {errMsgObj.email}
                              </div>
                            )}
                          </div>
                          <div className="form-group col-lg-12 pull-left required">
                            {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="address"
                              >
                                <FormattedMessage id="payment.address1" />
                              </label> */}
                            <span
                              className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                type="text"
                                className="rc-input__control"
                                id="phoneNumber"
                                name="phoneNumber"
                                required=""
                                aria-required="true"
                                value={userInfo.phoneNumber}
                                onChange={this.handleInputChange}
                                onBlur={this.inputBlur}
                                maxLength="50"
                                autoComplete="address-line"
                                placeholder="Votre numéro de téléphone (obligatoire)"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="phoneNumber"
                              />
                            </span>
                            {errMsgObj.phoneNumber && (
                              <div className="text-danger-2">
                                {errMsgObj.phoneNumber}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="rc-input rc-input--stacked">
                          <input
                            class="rc-input__checkbox"
                            id="id-checkbox-cat-2"
                            value="Cat"
                            type="checkbox"
                            name="checkbox-2"
                            checked={this.state.consentChecked}
                            onClick={() => {
                              this.setState({
                                consentChecked: !this.state.consentChecked
                              });
                            }}
                          />
                          <label
                            class="rc-input__label--inline"
                            for="id-checkbox-cat-2"
                          >
                            Les données personnelles, que vous renseignez sont
                            traitées aux fins de confirmer et assurer le suivi
                            du rendez-vous Elles seront conservées en accord
                            avec les règles de gestion des données privées que
                            vous pourrez retrouver en ligne sur
                            https://www.mars.com/privacy-policy-france
                          </label>
                        </div>
                        <button
                          className="rc-btn rc-btn--two"
                          style={{ width: '100%' }}
                          disabled={!nextBtnEnable}
                          onClick={() => {
                            this.setState({ step: this.state.step + 1 });
                          }}
                        >
                          <FormattedMessage id="Confirmer mes informations" />
                        </button>
                      </>
                    ) : null}
                    {this.state.step === 1 || this.state.step === 2 ? (
                      <p style={{ textAlign: 'center' }}>
                        L'Atelier Félin est ouvert du 20 avril au 12 juin 2021,
                        tous les jours de 10h à 20h. Fermé le lundi. Toutes les
                        réservations, abonnements  et données seront annulés
                        après cette date.
                      </p>
                    ) : null}
                    {this.state.step === 5 ? (
                      <>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          Mon redenz-vous
                        </p>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          Consultation expert
                        </p>
                        <p
                          className="text-center"
                          style={{ margin: '10px 0 20px' }}
                        >
                          {this.state.selectedTimeObj.name}
                        </p>
                        <p
                          className="text-center"
                          style={{ fontWeight: '500' }}
                        >
                          {userInfo.username}
                        </p>
                        <p className="text-center">{userInfo.email}</p>
                        <p
                          className="text-center"
                          style={{ margin: '10px 0 20px' }}
                        >
                          {userInfo.phoneNumber}
                        </p>
                        <button
                          className="rc-btn rc-btn--one"
                          style={{ width: '100%' }}
                          onClick={() => {
                            this.setState({ step: this.state.step + 1 });
                          }}
                        >
                          <FormattedMessage id="Confirmer le rendez-vous" />
                        </button>
                        <button
                          className="rc-btn rc-btn--two"
                          style={{ margin: '5px 0', width: '100%' }}
                          onClick={() => {
                            this.setState({ step: 1, nextBtnShow: true });
                          }}
                        >
                          <FormattedMessage id="Go back for modification" />
                        </button>
                      </>
                    ) : null}
                  </div>
                  {nextBtnShow ? (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                      <button
                        className="rc-btn rc-btn--two"
                        onClick={this.goNextStep.bind(this)}
                        disabled={!nextBtnEnable}
                      >
                        <FormattedMessage id="next" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
