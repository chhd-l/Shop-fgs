import React from 'react';
import left from './images/left.png';
import center from './images/center.png';
import right from './images/right.png';
const Content = () => {
  return (
    <div className="search-empty-content">
      <p className="search-empty-content-title">
        Oops,we didn't find what you are looking for
      </p>
      <p className="search-empty-content-tips">
        The bad news is that we can't find topic related to your search…. But
        don't be sad, here are some other great resources you might have missed!
      </p>
      <div className="search-empty-content-items">
        <div className="search-empty-content-items-box">
          <img src={left} alt="" />
          <div className="items-content-box">
            <p className="items-title"> Need help finding the right product?</p>
            <p className="items-introduce">
              Take our online survey to find the right food for your pet.
            </p>
          </div>
          <div className="search-empty-content-items-box-btnbox">
            <a className="search-empty-content-items-box-btnbox-btn-first">
              <p style={{ fontSize: 12 }}>Find the right food</p>
            </a>
          </div>
        </div>
        <div className="search-empty-content-items-box">
          <img src={center} alt="" />
          <div className="items-content-box">
            <p className="items-title">Discover breeds</p>
            <p className="items-introduce">
              Every breed is unique, and so are their health needs. Get advice
              and information on the right breed for you, and the right
              nutrition for them.
            </p>
          </div>
          <div className="search-empty-content-items-box-btnbox">
            <a
              className="search-empty-content-items-box-btnbox-btn"
              href="/US/cats/breeds"
            >
              <p>Cat breeds</p>
            </a>
            <a
              className="search-empty-content-items-box-btnbox-btn"
              href="/US/dogs/breeds"
            >
              <p>Dog breeds</p>
            </a>
          </div>
        </div>
        <div className="search-empty-content-items-box">
          <img src={right} alt="" />
          <div className="items-content-box">
            <p className="items-title"> Follow the Puppy & Kitten Guide</p>
            <p className="items-introduce">
              Discover Our essential tips and advices for the first months of
              kittens and puppies
            </p>
          </div>
          <div className="search-empty-content-items-box-btnbox">
            <a
              className="search-empty-content-items-box-btnbox-btn"
              href="/US/cats/puppy"
            >
              <p>Puppies</p>
            </a>
            <a
              className="search-empty-content-items-box-btnbox-btn"
              href="/US/cats/kitten"
            >
              <p>Kittens</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
