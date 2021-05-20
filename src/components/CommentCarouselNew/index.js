import React from 'react';
import { FormattedMessage } from 'react-intl';
import CommentOne from './img/CommentOne.png';
import CommentFour from './img/CommentFour.png';
import CommentTrOne from './img/FeedbackImage1.png';
import CommentTrFour from './img/FeedbackImage4.jpeg';

const CommentCarouselNew = () => {
  const Ru = process.env.REACT_APP_COUNTRY === 'RU';
  const TR = process.env.REACT_APP_COUNTRY == 'TR';
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <h3 className="rc-beta">
                  <FormattedMessage id="club.loyal.customers" />
                </h3>
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
                        src={CommentTrOne}
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
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <img
                        src={CommentTrOne}
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
