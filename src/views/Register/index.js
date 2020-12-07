import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consent from '@/components/Consent';
import { getStoreOpenConsentList } from '@/api/consent';
import Loading from '@/components/Loading';
import './index.less';
import SocialRegister from './components/socialRegister'

export default class Register extends Component {
  static propTypes = {
    prop: PropTypes
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      circleLoading: true,
      styleObj: { display: 'none' },
      list: [],
      width: '',
      zoom: '',
      fontZoom: ''
    };
    this.sendList = this.sendList.bind(this);
    this.init = this.init.bind(this);  
    this.register = this.register.bind(this);   
  }

  componentDidMount() {
    this.init();
    var windowWidth = document.body.clientWidth;
    if (windowWidth < 640) {
      this.setState({
        width: '80%',
        zoom: '120%',
        fontZoom: '100%'
      });
    }
    if (windowWidth >= 640) {
      this.setState({
        width: '90%',
        zoom: '150%',
        fontZoom: '120%'
      });
    }
    document.getElementById('wrap').addEventListener('click', (e) => {
      if (e.target.localName === 'span') {
        let keyWords = e.target.innerText;
        let index = Number(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.id
        );
        let arr = this.state.list[index].detailList.filter((item) => {
          return item.contentTitle === keyWords;
        });

        let tempArr = [...this.state.list];
        tempArr[index].innerHtml = tempArr[index].innerHtml
          ? ''
          : arr[0]
          ? arr[0].contentBody
          : '';

        this.setState({ list: tempArr });
      }
    });
  }

  init = async () => {
    this.setState({
      circleLoading: true,
      styleObj: { display: 'none' },
      isLoading: true
    });
    try {
      const result = await getStoreOpenConsentList({});
      const optioalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList
        };
      });

      const requiredList = result.context.requiredList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: true,
          detailList: item.detailList
        };
      });

      let list = this.state.list;
      list = [...requiredList, ...optioalList];
      this.setState({
        list
      });
    } catch (err) {
    } finally {
      this.setState({
        circleLoading: false,
        styleObj: { display: 'block' },
        isLoading: false
      });
    }
  };

  sendList = (list) => {
    this.setState({ list });
  };

  register = async () => {

  }

  render() {
    const url = this.props.match.url;
    return (
      <div>
        {/*全局loading */}
        {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
        <div id="register" class="page" style={this.state.styleObj}>
          <div class="rc-layout-container rc-padding--sm rc-reverse-layout-mobile rc-bg-colour--brand3 rc-margin-bottom--xs">
            <div class="rc-column rc-padding-top--lg--mobile">
              <div class="text-center">
                <a
                  href="/home"
                  class="logo-home d-inline-block"
                  title="Commerce Cloud Storefront Reference Architecture Accueil"
                >
                  <span class="rc-screen-reader-text">
                    Commerce Cloud Storefront Reference Architecture
                  </span>
                  <div class="content-asset">
                    <img
                      src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw66c24d73/Logo R-C/logo--secondary.png?sw=220&amp;sh=102&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=220&amp;ch=102&amp;sfrm=png"
                      width="164"
                      height="60"
                      alt="Royal Canin Flagship Store"
                    />
                  </div>
                </a>
              </div>
              <div class="rc-layout-container rc-one-column rc-self-h-middle rc-flex-direction--reverse--md-down rc-max-width--lg">
                <div class="rc-column rc-max-width--md rc-text--center">
                  <div class="rc-margin-top--md rc-margin-bottom--sm">
                    <aside
                      aria-hidden="true"
                      class="ciam-alert-error-popin rc-alert rc-alert--error rc-padding--sm rc-alert--with-close rc-margin-y--sm hidden"
                      role="alert"
                    >
                      <p>
                        Une erreur est survenue lors de la création de votre
                        compte. Veuillez réessayer plus tard ou utiliser une
                        adresse e-mail différente.
                        <b>
                          <a
                            href="https://shop.royalcanin.fr/help/contact"
                            class="rc-text-colour--brand1"
                          >
                            {' '}
                            Contactez-nous
                          </a>
                        </b>
                      </p>
                      <button
                        class="rc-btn rc-alert__close rc-close--xs rc-iconography"
                        data-close=""
                        aria-label=""
                      >
                        <span class="rc-screen-reader-text"></span>
                      </button>
                      <button
                        class="ciam-alert-close-error-popin rc-alert__close rc-icon rc-alert__close rc-close--xs rc-iconography"
                        data-close=""
                      >
                        <span class="rc-screen-reader-text"></span>
                      </button>
                    </aside>
                    <h2 class="text-center rc-margin-bottom--sm">
                      Bienvenue chez Royal Canin
                    </h2>
                    <p class="rc-margin-bottom--none text-center">
                      Afin de créer votre compte, veuillez compléter le
                      formulaire ci-dessous.
                    </p>
                    <p class="rc-margin-bottom--md text-center align-bottom">
                      Vous avez déjà un compte ?{' '}
                      <a
                        href="https://shop.royalcanin.fr/on/demandware.store/Sites-FR-Site/fr_FR/Login-OAuthLogin?oauthProvider=OktaProvider_FR&amp;oauthLoginTargetEndPoint=1"
                        class="rc-styled-link"
                      >
                        Connectez-vous
                      </a>
                    </p>
                    <SocialRegister/>
                    <div class="rc-column">
                      <p class="rc-margin-bottom--none text-center rc-padding--xs">
                        By continuing, you agree to our MARS privacy policy. We
                        will collect and use your first name, last name, and
                        email address to offer you a personalized experience.
                      </p>
                    </div>
                    <div class="rc-column rc-padding-left--lg rc-padding-right--lg">
                      <div class="auth-divider">
                        <span
                          class="auth-divider-text"
                          data-i18n="loginPage_or"
                        >
                          OU
                        </span>
                      </div>
                    </div>
                    <div class="rc-column">
                      <form
                        id="registrationForm"
                        class="registration-form rc-margin-bottom--xl--mobile"
                        encoding="off"
                      >
                        <div class="rc-margin-bottom--xs">
                          <div class="form-group rc-margin-bottom--md required">
                            <div
                              class="rc-input rc-input--full-width"
                              data-rc-feature-forms-setup="true"
                            >
                              <input
                                class="rc-input__control"
                                id="registerName"
                                type="text"
                                name="dwfrm_registrationForm_registerName"
                                aria-required="true"
                                maxlength="50"
                                data-missing-error="Ce champs est requis."
                              />
                              <label class="rc-input__label" for="registerName">
                                <span class="rc-input__label-text">Nom</span>
                              </label>
                            </div>
                            <div class="invalid-feedback">
                              Merci de remplir ce champ
                            </div>
                          </div>
                          <div
                            class="form-group rc-margin-bottom--md required"
                            data-js-warning-message="Please enter a valid email"
                          >
                            <div
                              class="rc-input rc-input--full-width"
                              data-rc-feature-forms-setup="true"
                            >
                              <input
                                class="rc-input__control"
                                id="registerEmail"
                                type="email"
                                data-pattern-mismatch="L'adresse e-mail ne correspond pas au format spécifié."
                                data-missing-error="Ce champs est requis."
                                name="dwfrm_registrationForm_registerEmail"
                                aria-required="true"
                                maxlength="50"
                                pattern="^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$"
                              />
                              <label
                                class="rc-input__label"
                                for="registerEmail"
                              >
                                <span class="rc-input__label-text">
                                  Adresse e-mail
                                </span>
                              </label>
                            </div>
                            <div class="invalid-feedback">
                              Merci de remplir ce champ
                            </div>
                          </div>
                          <div
                            class="form-group rc-margin-bottom--md relative required"
                            data-js-warning-message="Must be at least 8 characters"
                          >
                            <div
                              class="rc-input rc-input--full-width"
                              data-rc-feature-forms-setup="true"
                            >
                              <input
                                class="rc-input__control rc-input__password"
                                id="registerPassword"
                                type="password"
                                data-missing-error="Ce champs est requis."
                                data-pattern-mismatch="Le mot de passe n'est pas valide."
                                name="dwfrm_registrationForm_registerPassword"
                                aria-required="true"
                                maxlength="255"
                                minlength="8"
                                data-rc-feature-password-setup="true"
                              />
                              <label
                                class="rc-input__label"
                                for="registerPassword"
                              >
                                <span class="rc-input__label-text">
                                  Mot de passe
                                </span>
                              </label>
                              <button
                                type="button"
                                class="rc-btn rc-btn--icon rc-icon rc-show--xs rc-iconography rc-input__password-toggle"
                              >
                                <span class="rc-screen-reader-text">
                                  Toggle password visibility
                                </span>
                              </button>
                            </div>
                            <div class="invalid-feedback">
                              Merci de remplir ce champ
                            </div>
                            <div
                              class="tippy-popper invisible"
                              role="tooltip"
                              id="password-tooltip"
                              tabindex="-1"
                              x-placement="top"
                            >
                              <div
                                class="tippy-tooltip brand4-theme rc-brand4-theme"
                                data-size="regular"
                                data-animation="shift-away"
                                data-state="visible"
                                data-interactive=""
                              >
                                <div class="tippy-arrow"></div>
                                <div class="tippy-content" data-state="visible">
                                  <div
                                    id="password-tooltip"
                                    class="rc-tooltip text-center"
                                  >
                                    <div class="rc-meta">
                                      Le mot de passe doit contenir au moins
                                    </div>
                                    <div
                                      class="rc-badge--label"
                                      data-password-strength="length"
                                    >
                                      <span class="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                      <span>8 caractères</span>
                                    </div>
                                    <div
                                      class="rc-badge--label"
                                      data-password-strength="lowercase"
                                    >
                                      <span class="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                      <span>Une lettre minuscule</span>
                                    </div>
                                    <div
                                      class="rc-badge--label"
                                      data-password-strength="uppercase"
                                    >
                                      <span class="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                      <span>Une lettre majuscule</span>
                                    </div>
                                    <div
                                      class="rc-badge--label"
                                      data-password-strength="number"
                                    >
                                      <span class="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                      <span>Un nombre</span>
                                    </div>
                                    <div
                                      class="rc-badge--label"
                                      data-password-strength="specialchar"
                                    >
                                      <span class="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                      <span>Un caractère spécial</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="wrap">
                            <Consent
                              url={url}
                              list={this.state.list}
                              sendList={this.sendList}
                              width={this.state.width}
                              zoom={this.state.zoom}
                              fontZoom={this.state.fontZoom}
                              auto={true}
                              key={'required'}
                            />
                          </div>
                        </div>
                        <p class="rc-body rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                          <span class="rc-text-colour--brand1">*</span> Champ
                          obligatoire
                        </p>
                        <div class="rc-content-v-middle--mobile rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                          <button
                            id="registerSubmitBtn"
                            type="button"
                            value="Créer votre compte Royal Canin"
                            class="rc-btn rc-btn--one rc-self-v-middle--mobile"
                            onClick={this.register}
                          >
                            Créer votre compte Royal Canin
                          </button>
                        </div>
                        <div class="rc-meta rc-margin-top--sm">
                          <p>
                            Vous devez avoir 16 ans ou plus pour soumettre un
                            formulaire. Les données personnelles, que vous
                            renseignez sont traitées aux fins d’études
                            statistiques anonymes sous la responsabilité de la
                            société Royal Canin SAS. Elles seront également
                            traitées par Royal Canin France à des fins de
                            prospection commerciale, le cas échéant par voie
                            électronique si vous y avez préalablement consenti.
                            Elles ne seront pas conservées plus de dix-huit mois
                            après leur collecte ou le dernier contact avec Royal
                            Canin. Vous pouvez retirer, à tout moment, votre
                            consentement pour l’avenir et exercer vos droits
                            d’accès, de rectification et d’effacement de vos
                            données personnelles, ainsi que votre droit de vous
                            opposer à leur traitement ou d’en demander la
                            limitation en écrivant à Royal Canin France, Service
                            consommateur – BP4– 650 avenue de la Petite Camargue
                            – 30470 AIMARGUES ou par email à l’adresse{' '}
                            <a
                              href="mailto:conso.fr@royalcanin.com"
                              class="rc-text-colour--brand1"
                            >
                              conso.fr@royalcanin.com
                            </a>
                            . Vous avez le droit d’introduire une réclamation
                            auprès de la CNIL. Royal Canin France et Royal Canin
                            SAS ont un délégué à la protection des données
                            personnelles, qui peut, être contacté à l’adresse :{' '}
                            <a
                              href="mailto:privacy@effem.com"
                              class="rc-text-colour--brand1"
                            >
                              privacy@effem.com
                            </a>
                            .
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
