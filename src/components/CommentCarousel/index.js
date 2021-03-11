import React from 'react'
import Rate from '../Rate';
import CommentImg from './img/Custmersay.PNG'

const CommentCarousel=()=>{
  return(
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className='rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile'>
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <h3 className="rc-beta">What our customers are saying</h3>
            </div>
            <div className="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true" data-rows="6"
                        data-rc-prev="prev" data-rc-next="next">
              <div className="rc-carousel__card-gal">
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src={CommentImg} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Dera</p>
                      <h1 className="rc-card__title">Wall-E & Eva</h1>
                    </header>
                    <p className="rc-card__meta">Carousels can also be used with Cards to only show a single row of cards rather than a large grid or stack of cards if required, but can only be used with the 4 Col and 6 Col combinations of cards. As cards can effectively include 4 or 6 cards per ‘slide’</p>
                    <div className="text-left text-md-center rc-card--product__rating flex">
                      <div  className="justify-content-center margin-auto">
                        <Rate def='3' disabled={true} marginSize="smallRate" />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src={CommentImg} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Dera</p>
                      <h1 className="rc-card__title">Wall-E & Eva</h1>
                    </header>
                    <p className="rc-card__meta">Carousels can also be used with Cards to only show a single row of cards rather than a large grid or stack of cards if required, but can only be used with the 4 Col and 6 Col combinations of cards. As cards can effectively include 4 or 6 cards per ‘slide’</p>
                    <div className="text-left text-md-center rc-card--product__rating flex">
                      <div  className="justify-content-center margin-auto">
                        <Rate def='3' disabled={true} marginSize="smallRate" />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src={CommentImg} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Dera</p>
                      <h1 className="rc-card__title">Wall-E & Eva</h1>
                    </header>
                    <p className="rc-card__meta">Carousels can also be used with Cards to only show a single row of cards rather than a large grid or stack of cards if required, but can only be used with the 4 Col and 6 Col combinations of cards. As cards can effectively include 4 or 6 cards per ‘slide’</p>
                    <div className="text-left text-md-center rc-card--product__rating flex">
                      <div  className="justify-content-center margin-auto">
                        <Rate def='3' disabled={true} marginSize="smallRate" />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src={CommentImg} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Dera</p>
                      <h1 className="rc-card__title">Wall-E & Eva</h1>
                    </header>
                    <p className="rc-card__meta">Carousels can also be used with Cards to only show a single row of cards rather than a large grid or stack of cards if required, but can only be used with the 4 Col and 6 Col combinations of cards. As cards can effectively include 4 or 6 cards per ‘slide’</p>
                    <div className="text-left text-md-center rc-card--product__rating flex">
                      <div  className="justify-content-center margin-auto">
                      <Rate def='3' disabled={true} marginSize="smallRate" />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <button className="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                          aria-label="Like">
                    <span className="rc-screen-reader-text">Like</span>
                  </button>
                  <picture className="rc-card__image">
                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">Meta 1</p>
                      <h1 className="rc-card__title">Headline</h1>
                    </header>
                  </div>
                </article>
              </div>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCarousel;
