import React from 'react';
import CommentTrOne from './img/FeedbackImage1.png';
import CommentOne from './img/CommentThree.png';
import CommentTwo from './img/CommentOne.png';
import CommentThree from './img/CommentTwo.png';
import CommentFour from './img/CommentFour.png';

const CommentCarouselNew = () => {
  const Ru = process.env.REACT_APP_LANG === 'ru';
  const TR = process.env.REACT_APP_LANG == 'tr';
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <h3 className="rc-beta">Our Loyal Customers</h3>
              </div>
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
                data-rows="6"
                data-rc-prev="prev"
                data-rc-next="next"
              >
                <div className="rc-carousel__card-gal">
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentOne}
                        alt="alt text"
                        style={{ borderRadius: '50%', width: '50%' }}
                      />
                    </picture>
                  </article>
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentTwo}
                        alt="alt text"
                        style={{ borderRadius: '50%', width: '50%' }}
                      />
                    </picture>
                  </article>
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentThree}
                        alt="alt text"
                        style={{ borderRadius: '50%', width: '50%' }}
                      />
                    </picture>
                  </article>
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentFour}
                        alt="alt text"
                        style={{ borderRadius: '50%', width: '50%' }}
                      />
                    </picture>
                  </article>
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentTrOne}
                        alt="alt text"
                        style={{ borderRadius: '50%', width: '50%' }}
                      />
                    </picture>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCarouselNew;
