import React from 'react'
import { withRouter,link} from 'react-router-dom';
import { FormattedMessage} from 'react-intl';
import { STORE_CATE_ENUM } from '@/utils/constant';
import find from 'lodash/find';
import imagemain from '../../views/StaticPage/PackmixfeedingwetDry/images/Main-Coon-Adult-1-bis.jpg';

const  ShopitemList = withRouter((props)=>{

  return(
    <div className="rc-card-grid rc-match-heights rc-card-grid--fixed " style={{ width: '70%', marginTop: '50px', margin:'0 auto'}}>
      <div className="rc-grid .rc-one-column">
        <article className="rc-card rc-card--a">

          <picture className="rc-card__image">
            <img src={imagemain} alt="A Dachshund jumping"/>
          </picture>
          <div className="rc-card__body">
            <header >
              <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
              <p className="rc-card__meta">À partir de 15 mois</p>
              <h5>62,98 €</h5>
            </header>
          </div>
        </article>
      </div>

      <div className="rc-grid .rc-one-column">
        <article className="rc-card rc-card--a">

          <picture className="rc-card__image">
            <img src={imagemain} alt="A Dachshund jumping"/>
          </picture>
          <div className="rc-card__body">
            <header >
              <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
              <p className="rc-card__meta">À partir de 15 mois</p>
              <h5>62,98 €</h5>
            </header>
          </div>
        </article>
      </div>

      <div className="rc-grid .rc-one-column">
        <article className="rc-card rc-card--a">

          <picture className="rc-card__image">
            <img src={imagemain} alt="A Dachshund jumping"/>
          </picture>
          <div className="rc-card__body">
            <header >
              <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
              <p className="rc-card__meta">À partir de 15 mois</p>
              <h5>62,98 €</h5>
            </header>
          </div>
        </article>
      </div>

      <div className="rc-grid .rc-one-column">
        <article className="rc-card rc-card--a">

          <picture className="rc-card__image">
            <img src={imagemain} alt="A Dachshund jumping"/>
          </picture>
          <div className="rc-card__body">
            <header >
              <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
              <p className="rc-card__meta">À partir de 15 mois</p>
              <h5>62,98 €</h5>
            </header>
          </div>
        </article>
      </div>

      <div className="rc-grid .rc-one-column">
        <article className="rc-card rc-card--a">

          <picture className="rc-card__image">
            <img src={imagemain} alt="A Dachshund jumping"/>
          </picture>
          <div className="rc-card__body">
            <header >
              <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
              <p className="rc-card__meta">À partir de 15 mois</p>
              <h5>62,98 €</h5>
            </header>
          </div>
        </article>
      </div>
    </div>
  )


});
export default ShopitemList;
