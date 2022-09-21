import React from 'react';

const Contact = () => {
  return (
    <div className="search-empty-contact-box">
      <div className="search-empty-contact-box-item">
        <p className="search-empty-contact-box-item-title">Any questions?</p>
        <div className="search-empty-contact-box-item-ct">
          Visit&nbsp;
          <a
            style={{
              textDecoration: 'underline',
              fontWeight: '400',
              cursor: 'pointer'
            }}
            href="/contact-us"
          >
            our contact page
          </a>
          &nbsp;or reach us directly.
        </div>
        <div className="search-empty-contact-box-item-btnBox">
          <div className="search-empty-contact-box-item-btnBox-content">
            <img></img>
            <a
              className="search-empty-contact-box-item-btnBox-content-test"
              href="tel: 0845 300 5011*"
            >
              0845 300 5011*
            </a>
          </div>
          <div className="search-empty-contact-box-item-btnBox-content">
            <img></img>
            <a className="search-empty-contact-box-item-btnBox-content-test">
              Send a message
            </a>
          </div>
          <div className="search-empty-contact-box-item-btnBox-content">
            <img></img>
            <a
              className="search-empty-contact-box-item-btnBox-content-test"
              href="/about-us/faqs"
            >
              Access to FAQs
            </a>
          </div>
        </div>
        <div className="search-empty-contact-box-footer">
          <p className="search-empty-contact-box-footer-test">
            *Charges may vary depending on you service provider and your
            location, possibly incurring higher costs [up to 72p per minute when
            calling from the UK].
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
