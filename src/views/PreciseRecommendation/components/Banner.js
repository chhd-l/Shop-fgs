import React, { useState, useEffect } from 'react';
import { getDeviceType } from '@/utils/utils';
import './Banner.less';
const bannerList = [
  { img: 'secure_payment', text: 'Secure<br/>payment' },
  { img: 'satisfie_or_reimbursed', text: 'Satisfied or<br/> reimbursed' },
  { img: 'premium_quality', text: 'Premium<br/> Quality' },
  { img: 'fast_shipment', text: '3 Days<br/> shipment' }
];
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const Banner = () => {
  return (
    <section>
      <div>
        <div className="pc rc-md-up">
          <div
            className=" rc-padding-x--md rc-layout-container rc-five-column"
            style={{ fontSize: '20px' }}
          >
            <div className="rc-column rc-double-width">
              <img
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/product_img.png`}
              />
            </div>

            <div className="rc-column rc-triple-width">
              <h2
                className="rc-text-colour--brand1"
                style={{ fontSize: '40px' }}
              >
                #Name#’s adapted diet & portion
              </h2>
              <div className=" rc-layout-container rc-five-column rc-padding-top--md">
                <div className="rc-column rc-triple-width">
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    30 days of complete & balanced diet for
                    <br /> adult cat, Recommended diet to limit weight
                  </div>
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    Daily portion:{' '}
                    <strong style={{ color: '#444' }}>40 g/day</strong>
                    <br />
                    Total pack weight:{' '}
                    <strong style={{ color: '#444' }}>1.5 kg</strong>
                  </div>
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    Automatic shipment every 30 days <br />
                    Free shipment cost
                  </div>
                </div>
                <div className="rc-column rc-double-width">
                  <div className="rc-margin-bottom--sm">
                    <div style={{ color: '#444', fontSize: '40px' }}>
                      € 1,33/day
                    </div>
                    <div style={{ color: '#444' }}>€ 39,90/month</div>
                  </div>
                  <div
                    className="relative"
                    style={{ left: '-3rem', lineHeight: '1.2' }}
                  >
                    <div style={{ color: '#008900', fontSize: '24px' }}>
                      -25% on first order
                    </div>
                    <button
                      class="rc-btn rc-btn--one rc-btn--sm"
                      style={{ width: '200px' }}
                    >
                      buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile rc-md-down rc-padding--md  text-center">
          <h2 className="rc-text-colour--brand1" style={{ fontSize: '24px' }}>
            #Name#’s adapted diet & portion
          </h2>
          <div
            className="rc-margin-bottom--xs  text-left"
            style={{ lineHeight: '24px' }}
          >
            30 days of complete & balanced diet for adult cat, Recommended diet
            to limit weight
          </div>
          <img
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/product_img.png`}
          />
          <div className="rc-margin-bottom--xs" style={{ lineHeight: '24px' }}>
            Daily portion: <strong style={{ color: '#444' }}>40 g/day</strong>
            <br />
            Total pack weight: <strong style={{ color: '#444' }}>1.5 kg</strong>
          </div>
          <div className="rc-margin-bottom--md">
            <div style={{ color: '#444', fontSize: '40px' }}>€ 1,33/day</div>
            <div style={{ color: '#444' }}>€ 39,90/month</div>
          </div>
          <div
            className="rc-margin-bottom--xs"
            style={{ color: '#008900', fontSize: '24px' }}
          >
            -25% on first order
          </div>
          <div className="rc-margin-bottom--lg" style={{ lineHeight: '24px' }}>
            Automatic shipment every 30 days <br />
            Free shipment cost
          </div>
          <button
            class="rc-btn rc-btn--one rc-btn--sm"
            style={{ width: '200px' }}
          >
            buy now
          </button>
        </div>
        <div className="rc-layout-container rc-five-column">
          <div className="rc-column rc-double-width"></div>
          <div className="rc-column rc-triple-width">
            <div
              className=" row col-12 text-center"
              style={{ maxWidth: '500px' }}
            >
              {bannerList.map((el) => (
                <div className={`${isMobile ? 'col-6' : 'col-3'}`}>
                  <img
                    className="m-auto"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/${el.img}.svg`}
                  />
                  <p dangerouslySetInnerHTML={{ __html: el.text }}></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rc-max-width--xl m-auto rc-padding-x--md   rc-layout-container rc-two-column">
        <div className="rc-column">
          <h2
            className="rc-text-colour--brand1"
            style={{
              fontSize: '32px',
              textTransform: 'uppercase'
            }}
          >
            Your cat’s diet proven benefits
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '26px',
              width: '460px',
              maxWidth: '100%'
            }}
          >
            We partner with pet experts – veterinarians, breeders, professional
            groups and organisations – to ensure that our nutritional formulas
            are precisely tailored to your pet’s needs.
          </p>
          <img
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/cat.png`}
          />
        </div>
        <div className="rc-column">
          <div className="d-flex">
            <div className="rc-padding-right--xs" style={{ width: '78px' }}>
              <img
                // style={{ transform: 'scale(0.7)', transformOrigin: 'top' }}
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/image5.png`}
              />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '20px' }}>
                Stool odour reduction
              </strong>
              <p style={{ fontSize: '18px', lineHeight: '24px' }}>
                A lack of exercise may lead to a slower intestinal transit and
                smelly stools. Cette nourriture contains highly digestible
                protein (L.I.P.*) and helps reduce the quantity and odour of
                stools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
