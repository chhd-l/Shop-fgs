import React from 'react';
import LazyLoad from 'react-lazyload';

const HowItWorks=()=>{
  return(
   <div className='experience-component experience-layouts-1column'>
    <div className='row rc-margin-x--none'>
    <div className='rc-full-width'>
      <div className='experience-component experience-assets-contentBlock'>
        <br/>
        <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
          <h3 className="rc-beta">How it works</h3>
        </div>

        <div className="flex justify-content-between">
          <div className="rc-grid">
            <article className="rc-card rc-card--a">
              <button className="rc-btn rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                      aria-label="Like">
                <span className="rc-screen-reader-text">Like</span>
              </button>
              <picture className="rc-card__image">
                <img src="https://placehold.it/300x150" alt="A Dachshund jumping"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <p className="rc-card__meta">Meta 1</p>
                  <h1 className="rc-card__title">Headline</h1>
                  <p className="rc-card__meta">Meta 2</p>
                </header>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center'}}> > </div>
          <div className="rc-grid">
            <article className="rc-card rc-card--a">
              <button className="rc-btn rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                      aria-label="Like">
                <span className="rc-screen-reader-text">Like</span>
              </button>
              <picture className="rc-card__image">
                <img src="https://placehold.it/300x150" alt="A Dachshund jumping"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <p className="rc-card__meta">Meta 1</p>
                  <h1 className="rc-card__title">Headline</h1>
                  <p className="rc-card__meta">Meta 2</p>
                </header>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center'}}> > </div>
          <div className="rc-grid">
            <article className="rc-card rc-card--a">
              <button className="rc-btn rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                      aria-label="Like">
                <span className="rc-screen-reader-text">Like</span>
              </button>
              <picture className="rc-card__image">
                <img src="https://placehold.it/300x150" alt="A Dachshund jumping"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title">Headline</h1>
                </header>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center'}}> > </div>
          <div className="rc-grid">
            <article className="rc-card rc-card--a">
              <button className="rc-btn rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography"
                      aria-label="Like">
                <span className="rc-screen-reader-text">Like</span>
              </button>
              <picture className="rc-card__image">
                <img src="https://placehold.it/300x150" alt="A Dachshund jumping"/>
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
  )
}

export default HowItWorks;
