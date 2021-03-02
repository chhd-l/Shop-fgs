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
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';

function Divider() {
  return (
    <div
      className="rc-border-bottom rc-border-colour--brand4"
      style={{ borderBottomWidth: '4px' }}
    />
  );
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
      addressForm: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID,
        city: '',
        cityName: '',
        postCode: '',
        phoneNumber: '',
        rfc: '',
        isDefalt: false,
        deliveryAddressId: '',
        customerId: '',
        addressType: 'DELIVERY',
        email: ''
      },
      countryList: [],
      isValid: false,
      curType: 'delivery',
      errMsgObj: {},
      selectedDate: new Date()
    };
  }
  handleInputChange = (e) => {
    const target = e.target;
    const { addressForm } = this.state;
    const name = target.name;
    let value = target.value;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    addressForm[name] = value;
    this.setState({ addressForm }, () => {
      this.validFormData();
    });
  };
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: err.message
        })
      });
    }
  };
  render() {
    let { addressForm, errMsgObj } = this.state;
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
              <span className="mr-4 ui-cursor-pointer">dsfadsf</span>
              <span className="mr-4 ui-cursor-pointer">dasfdsaf</span>
              <span className="ui-cursor-pointer">dafdfsa</span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-4 offset-2">
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

                <button className="rc-btn rc-btn--one">
                  Venez rencontrer nos comportementalistes félins
                </button>
                <p className="mt-3">
                  L'Atelier Félin est ouvert du 20 avril au 12 juin 2021
                </p>
              </div>
              <div className="col-6">
                <LazyLoad>
                  <img
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/cat.jpeg`}
                  />
                </LazyLoad>
              </div>
            </div>
            <div className="rc-padding--sm rc-max-width--xl">
              <div className="row">
                <div className="col-6">
                  <div className="">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>
                        Vous partagez votre vie avec un chat en appartement ?
                        Posez toutes vos questions à nos experts
                      </h3>
                    </div>
                    <p>
                      L’Atelier Félin est fait pour vous : venez rencontrer des
                      experts, posez-leur vos questions sur le comportement de
                      votre chat, ses habitudes, ses soins et la nourriture la
                      plus appropriée à ses besoins… Des comportementalistes
                      félins et vétérinaires vous accueillent pour établir le
                      profil de votre chat et vous apporter gratuitement des
                      conseils personnalisés et spécifiques à la vie en
                      appartement.
                    </p>
                    <button className="rc-btn rc-btn--two">
                      Venez rencontrer nos experts
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/person.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/grid.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>
                      Obtenez une recommandation personnalisée pour son
                      alimentation
                    </h3>
                  </div>
                  <p>
                    Chaque chat est unique et a des besoins spécifiques selon sa
                    race, son âge, ses sensibilités et son mode de vie. En nous
                    communiquant le profil de votre chat, nous déterminerons
                    ensemble l'aliment qui lui conviendra le mieux.
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>
                      Faites l’expérience de notre nouveau service de
                      distribution de croquettes personnalisé et plus durable
                    </h3>
                  </div>
                  <p>
                    Toutes nos croquettes sont distribuées à la demande et
                    servies dans un contenant réutilisable et consigné. Lorsque
                    votre contenant est vide, vous pouvez le recharger en
                    boutique, ou vous faire livrer une nouvelle dose. Notre
                    livreur repartira avec le contenant vide qui sera
                    reconditionné pour un nouvel usage.
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/box.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/store.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>Découvrez l’Atelier Félin</h3>
                  </div>
                  <p>
                    L’Atelier Félin est un lieu unique de Royal Canin,
                    spécialiste de la santé animale et de la nutrition. Nous
                    vous accueillons au coeur du marais, au 6 Rue des Coutures
                    Saint-Gervais, du 20 avril au 12 juin 2021. Venez rencontrer
                    nos associations partenaires pour adopter des chats (le
                    weekend exclusivement).
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-12 text-center">
                  <div className="rc-gamma inherit-fontsize">
                    <h3 style={{ width: '500px', display: 'inline-block' }}>
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
                    <p>Choisissez un rendez-vous</p>
                    <div>
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
                            this.setState({selectedDate: new Date(date)})
                            console.log(date);
                          }}
                        />
                      </h1>
                      <span class="icon iconfont iconfont-date">&#xe6b3;</span>
                    </div>
                    <div>
                      <Selection
                        placeholder="Choose a time slot"
                        optionList={[
                          { name: '111', value: '111' },
                          { name: '222', value: '222' },
                          { name: '333', value: '333' }
                        ]}
                        selectedItemChange={() => {
                          console.log(11);
                        }}
                      />
                    </div>
                    <p>Mon redenz-vous</p>
                    <div style={{ padding: '.5rem 0' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          className="rc-input__radio"
                          id="female"
                          value="1"
                          // checked={!this.state.isMale}
                          type="radio"
                          name="gender"
                          // onChange={(e) => this.genderChange(e)}
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
                          // checked={this.state.isMale}
                          type="radio"
                          name="gender"
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
                    <p>Consultation expert</p>
                    <p>1111</p>
                    <button
                      className="rc-btn rc-btn--one"
                      style={{ width: '100%' }}
                    >
                      <FormattedMessage id="Continuer en tant qu'invité" />
                    </button>
                    <button
                      className="rc-btn rc-btn--two"
                      style={{ margin: '5px 0', width: '100%' }}
                    >
                      <FormattedMessage id="Se connecter" />
                    </button>

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
                            id="firstName"
                            name="firstName"
                            required=""
                            aria-required="true"
                            value={addressForm.firstName}
                            onChange={this.handleInputChange}
                            onBlur={this.inputBlur}
                            maxLength="50"
                            autoComplete="address-line"
                            placeholder="Votre nom (obligatoire)"
                          />
                          <label
                            className="rc-input__label"
                            htmlFor="firstName"
                          />
                        </span>
                        {errMsgObj.firstName && (
                          <div className="text-danger-2">
                            {errMsgObj.firstName}
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
                            id="lastName"
                            name="lastName"
                            required=""
                            aria-required="true"
                            value={addressForm.lastName}
                            onChange={this.handleInputChange}
                            onBlur={this.inputBlur}
                            maxLength="50"
                            autoComplete="address-line"
                            placeholder="Votre adresse e-mail (obligatoire)"
                          />
                          <label
                            className="rc-input__label"
                            htmlFor="lastName"
                          />
                        </span>
                        {errMsgObj.lastName && (
                          <div className="text-danger-2">
                            {errMsgObj.lastName}
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
                            id="address1"
                            name="address1"
                            required=""
                            aria-required="true"
                            value={addressForm.address1}
                            onChange={this.handleInputChange}
                            onBlur={this.inputBlur}
                            maxLength="50"
                            autoComplete="address-line"
                            placeholder="Votre numéro de téléphone (obligatoire)"
                          />
                          <label
                            className="rc-input__label"
                            htmlFor="address1"
                          />
                        </span>
                        {errMsgObj.address1 && (
                          <div className="text-danger-2">
                            {errMsgObj.address1}
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="rc-input rc-input--stacked">
                      <input class="rc-input__checkbox" id="id-checkbox-cat-2" value="Cat" type="checkbox" name="checkbox-2" />
                      <label class="rc-input__label--inline" for="id-checkbox-cat-2">Les données personnelles, que vous renseignez sont
                            traitées aux fins de confirmer et assurer le suivi
                            du rendez-vous Elles seront conservées en accord
                            avec les règles de gestion des données privées que
                            vous pourrez retrouver en ligne sur
                            https://www.mars.com/privacy-policy-france</label>
                    </div>
                    <button
                      className="rc-btn rc-btn--two"
                      style={{ width: '100%' }}
                    >
                      <FormattedMessage id="Confirmer mes informations" />
                    </button>
                    <p>
                      L'Atelier Félin est ouvert du 20 avril au 12 juin 2021,
                      tous les jours de 10h à 20h. Fermé le lundi. Toutes les
                      réservations, abonnements  et données seront annulés après
                      cette date.
                    </p>
                  </div>
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
