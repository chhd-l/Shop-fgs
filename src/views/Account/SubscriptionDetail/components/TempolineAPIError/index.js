import React from 'react';

const TempolineApiError = ({ showError, closeError }) => {
  const closeErrorTip = () => {
    closeError && closeError();
  };
  return showError ? (
    <div className="row mx-0 border border-rc-red p-2 md:p-4 mt-8 md:mt-4 bg-red-500 bg-opacity-20 text-rc-red text-base col-12">
      <span className="row mx-0 col-12 col-md-1">
        <span className="iconfont iconchahao justify-start col-6 col-md-1 text-left pl-0" />
        <span className="md:hidden iconfont iconguan justify-end col-6 text-right" />
      </span>
      <span className="col-md-10 col-12 md:-ml-4 xl:-ml-12">
        Sorry the new quantity is too much for the pickpoint you have
        selected,please select another delivery method
      </span>
      <span
        className="iconfont iconguan justify-end col-md-1 col-12 text-right hidden md:block cursor-pointer"
        onClick={closeErrorTip}
      />
    </div>
  ) : null;
};

export default TempolineApiError;
