import React from 'react';
import { formatDate } from '@/utils/utils';

const OrderLogisticsProgress = (props) => {
  const {
    hasMoreLessOperation = false,
    moreLogistics,
    handleToggleMoreLess,
    customDateCls = ''
  } = props;
  return (
    <ul className="text-break">
      {(props.list || []).map(
        (item, i) =>
          item.shown && (
            <li
              className={`logi-item align-items-center ${
                item.active ? 'active' : ''
              } ${
                !hasMoreLessOperation || !i || moreLogistics
                  ? 'd-flex'
                  : 'hidden'
              }`}
              key={i}
            >
              <span className={`logi-time text-right ${customDateCls}`}>
                {formatDate({ date: item.timestamp })}
                <br />
                {formatDate({
                  date: item.timestamp,
                  showYear: false,
                  showMinute: true
                })}
              </span>
              <div className="logi-text px-4 py-3">
                <img
                  className="logi-icon w-4"
                  src={`${
                    window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX
                  }/img/icons/${!i ? 'progress-ing' : 'progress-done'}.svg`}
                  alt="icons progress"
                />

                <span
                  className={`ml-4 ui-text-overflow-line2 ${!i ? 'red' : ''}`}
                >
                  {item.longDescription}
                </span>
              </div>
              {hasMoreLessOperation && !i ? (
                <span
                  className={`iconfont ui-cursor-pointer ${!i ? 'red' : ''}`}
                  onClick={handleToggleMoreLess}
                >
                  {moreLogistics ? <>&#xe6b1;</> : <>&#xe6b0;</>}
                </span>
              ) : null}
            </li>
          )
      )}
    </ul>
  );
};

export default OrderLogisticsProgress;
