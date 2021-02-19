import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const AddCartSuccessMobile = ()=>{
    return (<aside
        role="modal"
        class="rc-modal rc-hidden"
        data-modal-target="modal-example"
      >
        <div class="rc-modal__container">
          <header class="rc-modal__header">
            <button
              class="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
              data-modal-trigger="modal-example"
            >
              <FormattedMessage id="close" />
            </button>
          </header>
          <section
            class="rc-modal__content rc-scroll--y"
            style={{ textAlign: 'center' }}
          >
            <div class="rc-margin-top--md" style={{ textAlign: 'center' }}>
              <svg
                t="1607498763458"
                class="icon"
                style={{
                  width: '35px',
                  height: '35px',
                  marginBottom: '20px'
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2968"
                width="200"
                height="200"
              >
                <path
                  d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM512 960c-249.6 0-448-204.8-448-448 0-249.6 204.8-448 448-448 249.6 0 448 198.4 448 448C960 761.6 761.6 960 512 960zM691.2 339.2 454.4 576 332.8 454.4c-19.2-19.2-51.2-19.2-76.8 0C243.2 480 243.2 512 262.4 531.2l153.6 153.6c19.2 19.2 51.2 19.2 70.4 0l51.2-51.2 224-224c19.2-19.2 25.6-51.2 0-70.4C742.4 320 710.4 320 691.2 339.2z"
                  p-id="2969"
                  fill="#47b800"
                ></path>
              </svg>
              <p style={{ color: '#47b800 !important' }}>
                <FormattedMessage id="addedtoCart" />
              </p>
              <Link to="/home" style={{ color: '#666', fontWeight: 400 }}>
                <FormattedMessage id="continueMyPurchases" />
              </Link>
              <p>
                <FormattedMessage id="or" />
              </p>
            </div>
            <Link
              class="rc-btn rc-btn--one"
              style={{ fontWeight: 400 }}
              to="/cart"
            >
              <FormattedMessage id="goToCart" />
            </Link>
          </section>
        </div>
      </aside>
      )
}
export default AddCartSuccessMobile