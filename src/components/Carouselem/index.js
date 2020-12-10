import React from 'react'
import { withRouter,link} from 'react-router-dom';
import { FormattedMessage} from 'react-intl';
import find from 'lodash/find';
import imagemain from './image/Main-Coon-Adult-1-bis.jpg';
import imagePersan from './image/Persan-1-bis.jpg';
import imageBritish from './image/British-Shortair1-bis.jpg';
import imageappetite from './image/Appetite-control-1.jpg';

const  Carouselem = withRouter((props)=>{

  return(
    <div style={{width:'80%' ,margin:'0 auto'}}>
      <div className="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true"
           data-rows="6" data-rc-prev="prev" data-rc-next="next" >
        <div className="rc-carousel__card-gal">
          <article className="rc-card rc-card--b">
            <picture className="rc-card__image">
              <img src={imagemain} alt="alt text"/>
            </picture>
            <div className="rc-card__body">
              <header>
                <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
                <p className="rc-card__meta">À partir de 15 mois</p>
                <h5>62,98 €</h5>
              </header>
            </div>
          </article>

          <article className="rc-card rc-card--b">
            <picture className="rc-card__image">
              <img src={imagePersan} alt="alt text"/>
            </picture>
            <div className="rc-card__body">
              <header>
                <h1 className="rc-card__title">Pack Persan Adulte</h1>
                <p className="rc-card__meta">À partir de 15 mois</p>
                <h5>64,98 €</h5>
              </header>
            </div>
          </article>
          <article className="rc-card rc-card--b">
            <picture className="rc-card__image">
              <img src={imageBritish} alt="alt text"/>
            </picture>
            <div className="rc-card__body">
              <header>
                <h1 className="rc-card__title">Pack British Shorthair Adulte</h1>
                <p className="rc-card__meta">À partir de 15 mois</p>
                <h5 >62,98 €</h5>
              </header>
            </div>
          </article>
          <article className="rc-card rc-card--b">
            <picture className="rc-card__image">
              <img src={imageappetite} alt="alt text"/>
            </picture>
            <div className="rc-card__body">
              <header>
                <h1 className="rc-card__title">Pack Appetite Control Care</h1>
                <p className="rc-card__meta">Chats adultes stérilisés de 1 à 7 ans – Tendance à quémander</p>
                <h5>58.98 €</h5>
              </header>
            </div>
          </article>
          <article className="rc-card rc-card--b">
            <picture className="rc-card__image">
              <img src={imageappetite} alt="alt text"/>
            </picture>
            <div className="rc-card__body">
              <header>
                <h1 className="rc-card__title">Pack Appetite Control Care</h1>
                <p className="rc-card__meta">Chats adultes stérilisés de 1 à 7 ans – Tendance à quémander</p>
                <h5>58.98 €</h5>
              </header>
            </div>
          </article>


        </div>
      </div>
    </div>
  )


});
export default Carouselem;
