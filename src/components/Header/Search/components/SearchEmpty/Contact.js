import React from 'react';
import { useSearch } from '../../index';

import img_phone from './images/phone.png';
import img_email from './images/email.png';
import img_msg from './images/msg.png';

const Contact = () => {
  const { config } = useSearch();
  const countryCode = config.countryCode;

  return (
    <div className="search-empty-contact-box">
      <div className="empty-contact-title">Any questions?</div>
      <div className="empty-contact-desc">
        Visit <a href={`${countryCode}/contact-us`}>our contact page</a> or
        reach us directly.
      </div>
      <div className="empty-contact-link">
        <a className="empty-circle-btn" href="tel:+1-800-592-6687">
          <img src={img_phone} alt="phone" />
          0845 300 5011
        </a>
        <a className="empty-circle-btn" href={`${countryCode}/contact-us`}>
          <img src={img_email} alt="email" />
          Send a message
        </a>
        <a className="empty-circle-btn" href={`${countryCode}/about-us/faqs`}>
          <img src={img_msg} alt="message" />
          Access to FAQs
        </a>
      </div>
      <div className="empty-contact-legal">
        *Charges may vary depending on you service provider and your location,
        possibly incurring higher costs [up to 72p per minute when calling from
        the UK].
      </div>
    </div>
  );
};

export default Contact;
