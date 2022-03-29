import React, { useState } from 'react';
import cn from 'classnames';

const Pagination = ({ pageNum, totalPage, sendPageNumber }) => {
  const [pageNumber, setPageNumber] = useState(pageNum);
  const inputChangeEvent = (e) => {
    let value = parseInt(e.target.value);
    if (value <= 0) {
      value = 1;
    } else if (value > totalPage) {
      value = totalPage;
    }
    setPageNumber(value);
  };
  const onBlurEvent = () => {
    if (isNaN(pageNumber)) {
      //最后删除为空时  pageNum的值是NAN，这个时候重新把pageNumber设为1
      setPageNumber(1);
      sendPageNumber(1);
    } else {
      sendPageNumber(pageNumber);
    }
  };
  const prevPageEvent = () => {
    if (pageNumber <= 1) return;
    setPageNumber(pageNumber - 1);
    sendPageNumber(pageNumber - 1);
  };
  const nextPageEvent = () => {
    if (pageNumber == totalPage) return;
    setPageNumber(pageNumber + 1);
    sendPageNumber(pageNumber + 1);
  };

  return (
    <>
      <nav class="rc-pagination">
        <div class="rc-pagination__form">
          <button
            class={cn(
              'rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography',
              pageNumber <= 1 ? 'rc-pagination__direction--disabled' : ''
            )}
            onClick={prevPageEvent}
          ></button>
          <div class="rc-pagination__steps">
            <input
              type="number"
              class="rc-pagination__step rc-pagination__step--current"
              value={pageNumber}
              onChange={inputChangeEvent}
              onBlur={onBlurEvent}
            />
            <div class="rc-pagination__step rc-pagination__step--of">
              of
              <span className="pl-1">{totalPage}</span>
            </div>
          </div>
          <button
            class={cn(
              'rc-btn rc-pagination__direction rc-pagination__direction--next rc-icon rc-right--xs rc-iconography',
              pageNumber == totalPage
                ? 'rc-pagination__direction--disabled'
                : ''
            )}
            onClick={nextPageEvent}
          ></button>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
