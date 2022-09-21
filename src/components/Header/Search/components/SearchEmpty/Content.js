import React from 'react';

import img_left from './images/left.png';
import img_center from './images/center.png';
import img_right from './images/right.png';

const Content = () => {
  return (
    <div className="search-empty-content-box">
      <div className="empty-content-tips">
        <div className="empty-content-title">
          Oops,we didn't find what you are looking for
        </div>
        <div className="empty-content-desc">
          The bad news is that we can't find topic related to your search…{' '}
          <br />
          But don't be sad, here are some other great resources you might have
          missed!
        </div>
      </div>

      <div className="empty-content-link">
        <div className="empty-content-link-item">
          <div className="empty-content-link-item-img">
            <img src={img_left} alt="img" />
          </div>
          <div className="empty-content-title">
            Need help finding the right product?
          </div>
          <div className="empty-content-desc">
            Take our online survey to find the right food for your pet.
          </div>
          <div className="empty-content-link-action empty-columns-1">
            <a className="empty-circle-btn" href="/">
              Find the right food
            </a>
          </div>
        </div>

        <div className="empty-content-link-item">
          <div className="empty-content-link-item-img">
            <img src={img_center} alt="img" />
          </div>
          <div className="empty-content-title">Discover breeds</div>
          <div className="empty-content-desc">
            Every breed is unique, and so are their health needs. Get advice and
            information on the right breed for you, and the right nutrition for
            them.
          </div>
          <div className="empty-content-link-action">
            <a className="empty-circle-btn" href="/">
              Cat breeds
            </a>
            <a className="empty-circle-btn" href="/">
              Dog breeds
            </a>
          </div>
        </div>

        <div className="empty-content-link-item">
          <div className="empty-content-link-item-img">
            <img src={img_right} alt="img" />
          </div>
          <div className="empty-content-title">
            Follow the Puppy & Kitten Guide
          </div>
          <div className="empty-content-desc">
            Discover Our essential tips and advices for the first months of
            kittens and puppies.
          </div>
          <div className="empty-content-link-action">
            <a className="empty-circle-btn" href="/">
              Puppies
            </a>
            <a className="empty-circle-btn" href="/">
              Kittens
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
