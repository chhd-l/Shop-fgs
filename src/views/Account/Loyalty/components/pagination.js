import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const Pagination = (props) => {
  return (
    <>
      <nav class="rc-pagination">
        <form class="rc-pagination__form">
          <button class="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography rc-pagination__direction--disabled"></button>
          <div class="rc-pagination__steps">
            <input
              type="text"
              class="rc-pagination__step rc-pagination__step--current"
              value="1"
            />
            <div class="rc-pagination__step rc-pagination__step--of">
              of
              <span className="pl-1">10</span>
            </div>
          </div>
          <button class="rc-btn rc-pagination__direction rc-pagination__direction--next rc-icon rc-right--xs rc-iconography"></button>
        </form>
      </nav>
    </>
  );
};

export default Pagination;
