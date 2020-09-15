import React from 'react';
import { Link } from 'react-router-dom';

export default class DropDownMenu extends React.Component {
  hanldeListItemMouseOver = (type) => {
    this.props.updateVisibleType(type);
  };
  hanldeListItemMouseOut = () => {
    this.props.updateVisibleType('');
  };
  render() {
    return (
      <div class="rc-md-up">
        <div
          id="dropdown-nav-dogs"
          class={`dropdown-nav d-flex ${
            this.props.visibleType === 'dogs' ? 'show' : ''
          }`}
          aria-hidden="false"
          onMouseOver={() => this.hanldeListItemMouseOver('dogs')}
          onMouseOut={this.hanldeListItemMouseOut}
        >
          <div class="flex-grow-1 rc-padding-y--xs rc-padding-left--sm--desktop">
            <ul
              class="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
              role="menu"
            >
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="dog-age" class="dropdown-nav__item">
                    <small></small> <b>Âge</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Chiot%20%280-2%20mois%29"
                      id="Chiot (0-2 mois)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Chiot (0-2 mois)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Chiot%20%282%20mois-1%20an%29"
                      id="Chiot (2 mois-1 an)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Chiot (2 mois-1 an)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Adulte%20%281-7%20ans%29"
                      id="Adulte (1-7 ans)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Adulte (1-7 ans)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=S%c3%a9nior%20%287%20ans%20et%20plus%29"
                      id="Sénior (7 ans et plus)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Sénior (7 ans et plus)
                    </a>
                  </li>
                </ul>
                <div class="dropdown-nav__cat-link rc-padding-bottom--xs">
                  <Link class="rc-styled-link" to="/list/dogs">
                    Voir tous les produits
                  </Link>
                </div>
              </li>
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="dog-size" class="dropdown-nav__item">
                    <small></small> <b>Taille</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=X-Small%20%281-4%20Kg%29"
                      id="X-Small (1-4 Kg)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      X-Small (1-4 Kg)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Mini%20%281-10%20KG%29"
                      id="Mini (1-10 KG)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Mini (1-10 KG)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Medium%20%2811-25kg%29"
                      id="Medium (11-25kg)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Medium (11-25kg)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Maxi%20%2826-44kg%29"
                      id="Maxi (26-44kg)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Maxi (26-44kg)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=G%c3%a9ant%20%28%3e%2045kg%29"
                      id="Géant (> 45kg)"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Géant (&gt; 45kg)
                    </a>
                  </li>
                </ul>
              </li>
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="dog-range" class="dropdown-nav__item">
                    <small></small> <b>Gamme</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Aliments%20secs"
                      id="Aliments secs"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Aliments secs
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Bouch%c3%a9es%20en%20sauce"
                      id="Bouchées en sauce"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Bouchées en sauce
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Breed%20Health%20Nutrition"
                      id="Breed Health Nutrition"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Aliment pour Chien de Race
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="content-asset">
            <div class="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div class="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div class="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>
                    Chaque animal est unique, tout comme ses besoins
                    nutritionnels.
                  </p>
                  <div
                    id="gtx-trans"
                    style={{ position: 'absolute', left: '194px', top: '32px' }}
                  >
                    <div class="gtx-trans-icon">&nbsp;</div>
                  </div>
                </div>
                <Link
                  to="/list/dogs"
                  title="Trouver l'alimentation adaptée"
                >
                  <button class="rc-btn rc-btn--one">
                    Trouver l'alimentation adaptée
                  </button>
                </Link>
              </div>
              <div class="mt-auto">
                <img
                  class="pull-right rc-lg-up ls-is-cached lazyloaded"
                  data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg"
                  alt="Trouver l'alimentation adaptée"
                  src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg"
                />
                <img
                  class="pull-right rc-md-down lazyload"
                  data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw89994f07/CMS/header-dog.jpg?sw=320&amp;sh=400&amp;sm=fit&amp;cx=61&amp;cy=0&amp;cw=368&amp;ch=460&amp;sfrm=jpg"
                  alt="Trouver l'alimentation adaptée"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="dropdown-nav-cats"
          class={`dropdown-nav d-flex ${
            this.props.visibleType === 'cats' ? 'show' : ''
          }`}
          aria-hidden="true"
          onMouseOver={() => this.hanldeListItemMouseOver('cats')}
          onMouseOut={this.hanldeListItemMouseOut}
        >
          <div class="flex-grow-1 rc-padding-y--xs rc-padding-left--sm--desktop">
            <ul
              class="d-flex justify-content-center rc-padding--none rc-margin--none fullHeight"
              role="menu"
            >
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="cat-age" class="dropdown-nav__item">
                    <small></small> <b>Âge</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=cat-kitten"
                      id="cat-kitten"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Chaton (1-12 mois)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=cat-adult"
                      id="cat-adult"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Adulte (1-7 ans)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=cat-mature"
                      id="cat-mature"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Mature (7-12 ans)
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=cat-senior"
                      id="cat-senior"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Senior (+ 12 ans)
                    </a>
                  </li>
                </ul>
                <div class="dropdown-nav__cat-link rc-padding-bottom--xs">
                  <Link class="rc-styled-link" to="/list/cats">
                    Voir tous les produits
                  </Link>
                </div>
              </li>
              <li
                class="dropdown-nav__item rc-padding-top--xs relative"
                role="menuitem"
              >
                <div class="dropdown-nav__title rc-margin-bottom--xs">
                  <span id="cat-range" class="dropdown-nav__item">
                    <small></small> <b>Gamme</b>
                  </span>
                </div>
                <ul class="rc-padding--none" role="menu" aria-hidden="true">
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Cat%20Aliments%20secs"
                      id="Cat Aliments secs"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Aliments secs
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=cat-wet-food"
                      id="cat-wet-food"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Bouchées en sauce
                    </a>
                  </li>
                  <li class="dropdown-nav__item" role="menuitem">
                    <a
                      href="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?cgid=Feline%20Breed%20Nutrition"
                      id="Feline Breed Nutrition"
                      role="button"
                      class="dropdown-nav__link"
                    >
                      Aliment pour Chat de Race
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="content-asset">
            <div class="dropdown-nav__banner rc-bg-colour--brand4 flex-column flex-sm-row">
              <div class="align-self-center rc-padding-left--md rc-padding-right--xs rc-padding-y--lg--mobile">
                <div class="rc-large-intro rc-margin-bottom--sm inherit-fontsize">
                  <p>
                    Chaque animal est unique, tout comme ses besoins
                    nutritionnels.
                  </p>
                </div>
                <Link
                  to="/list/cats"
                  title="Trouver la nourriture adaptée"
                >
                  <button class="rc-btn rc-btn--one">
                    Trouver la nourriture adaptée
                  </button>
                </Link>
              </div>
              <div class="mt-auto">
                <img
                  class="pull-right rc-lg-up ls-is-cached lazyloaded"
                  data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw73b132cd/CMS/header-cat.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg"
                  alt="Trouver l'alimentation adaptée"
                  src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw73b132cd/CMS/header-cat.jpg?sw=245&amp;sh=258&amp;sm=fit&amp;cx=27&amp;cy=0&amp;cw=437&amp;ch=460&amp;sfrm=jpg"
                />
                <img
                  class="pull-right rc-md-down lazyload"
                  data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw73b132cd/CMS/header-cat.jpg?sw=320&amp;sh=400&amp;sm=fit&amp;cx=61&amp;cy=0&amp;cw=368&amp;ch=460&amp;sfrm=jpg"
                  alt="Trouver l'alimentation adaptée"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="dropdown-nav-aide"
          class={`dropdown-nav d-flex full-width-asset justify-content-center ${
            this.props.visibleType === 'contactUs' ? 'show' : ''
          }`}
          aria-hidden="true"
          onMouseOver={() => this.hanldeListItemMouseOver('contactUs')}
          onMouseOut={this.hanldeListItemMouseOut}
        >
          <div class="content-asset">
            <div class="dropdown-nav__help d-md-flex">
              {' '}
              <div class="dropdown-nav__help__text align-self-center">
                {' '}
                <h4 class="title rc-delta">Une question ?</h4>{' '}
                <div class="desc children-nomargin">
                  {' '}
                  <p>Vous avez besoin d'aide?</p>
                  <p>N'hésitez pas à nous contacter : </p>{' '}
                </div>{' '}
              </div>{' '}
              <div class="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
                {' '}
                <div class="rc-margin-right--xs flex-grow-1">
                  {' '}
                  <b>Par téléphone</b>{' '}
                  <div class="children-nomargin">
                    {' '}
                    <p>De 8h00 à 20h00</p>{' '}
                  </div>{' '}
                  <div>
                    <a href="tel:+0 800 005 360" class="rc-large-body tel">
                      0 800 005 360
                    </a>
                  </div>{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-lg-up">
                  {' '}
                  <img
                    class=" ls-is-cached lazyloaded"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="Par téléphone icon"
                    src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  />{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-md-down">
                  {' '}
                  <img
                    class="lazyload"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="Par téléphone icon"
                  />{' '}
                </div>{' '}
              </div>{' '}
              <Link
                class="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
                to="/help"
              >
                {' '}
                <div class="rc-margin-right--xs flex-grow-1">
                  {' '}
                  <b>Par e-mail</b> <div class="children-nomargin"> </div>{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-lg-up">
                  {' '}
                  <img
                    class=" ls-is-cached lazyloaded"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="Par e-mail icon"
                    src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  />{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-md-down">
                  {' '}
                  <img
                    class="lazyload"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="Par e-mail icon"
                  />{' '}
                </div>{' '}
              </Link>{' '}
              <Link
                class="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
                to="/FAQ/all"
              >
                {' '}
                <div class="rc-margin-right--xs flex-grow-1">
                  {' '}
                  <b>FAQ</b> <div class="children-nomargin"> </div>{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-lg-up">
                  {' '}
                  <img
                    class=" ls-is-cached lazyloaded"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="FAQ icon"
                    src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                  />{' '}
                </div>{' '}
                <div class="rc-padding-left--xs rc-md-down">
                  {' '}
                  <img
                    class="lazyload"
                    data-src="

https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                    alt="FAQ icon"
                  />{' '}
                </div>{' '}
              </Link>{' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
