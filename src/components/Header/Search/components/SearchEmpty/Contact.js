import React from 'react';

const Contact = () => {
  return (
    <div className="search-empty-contact-box">
      <div className="empty-contact-title">Any questions?</div>
      <div className="empty-contact-desc">
        Visit <a href="">our contact page</a> or reach us directly.
      </div>
      <div className="empty-contact-link">
        <a className="empty-circle-btn" href="tel:0845 300 5011">
          0845 300 5011
        </a>
        <a className="empty-circle-btn" href="">
          Send a message
        </a>
        <a className="empty-circle-btn" href="">
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
