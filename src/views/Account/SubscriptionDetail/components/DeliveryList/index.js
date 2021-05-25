import React from 'react';
import Selection from '@/components/Selection';
import NextDelivery from './NextDelivery';
import CompletedDelivery from './CompletedDelivery';
import { getDeviceType } from '@/utils/utils';

const DeliveryList = ({
  subDetail,
  isGift,
  tabName,
  completedYear,
  completedYearOption,
  changeTab,
  noStartYearOption,
  noStartYear,
  modalList,
  activeTabIdx,
  getMinDate,
  setState
}) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const isActive = subDetail.subscribeStatus === '0';
  const changeYearOption = (el) => {
    if (activeTabIdx === 0) {
      setState({ noStartYear: el });
    } else {
      setState({ completedYear: el });
    }
  };
  return (
    <div
      style={{ display: `${isGift ? 'none' : 'initial'}` }}
      className="rc-match-heights rc-content-h-middle rc-reverse-layout"
    >
      <div>
        <div
          className="rc-border-bottom rc-border-colour--interface"
          style={{ width: '70%', display: 'inline-block' }}
        >
          <nav className="rc-fade--x">
            <ul
              className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
              role="tablist"
            >
              {tabName.map((ele, index) => (
                <li key={index}>
                  <button
                    className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                    data-toggle={`tab__panel-${index}`}
                    aria-selected={activeTabIdx === index ? 'true' : 'false'}
                    role="tab"
                    onClick={(e) => changeTab(e, index)}
                  >
                    {ele}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          style={{
            width: '30%',
            display: 'inline-block',
            textAlign: 'right',
            verticalAlign: 'middle'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: isMobile ? 'auto' : '230px',
              borderBottom: '1px solid #aaa',
              textAlign: 'left'
            }}
          >
            {activeTabIdx === 0 ? (
              <Selection
                optionList={noStartYearOption}
                selectedItemData={noStartYear}
                selectedItemChange={(el) => changeYearOption(el)}
                type="freqency"
                key={(noStartYear && noStartYear.value) || ''}
              />
            ) : (
              <Selection
                optionList={completedYearOption}
                selectedItemData={completedYear}
                selectedItemChange={(el) => changeYearOption(el)}
                type="freqency"
                key={(completedYear && completedYear.value) || ''}
              />
            )}
          </span>
        </div>
        <div className="rc-tabs tabs-detail" style={{ marginTop: '40px' }}>
          {activeTabIdx === 0 &&
            subDetail.noStartTradeList &&
            subDetail.noStartTradeList
              .filter(
                (el) =>
                  noStartYear &&
                  el.tradeItems[0].nextDeliveryTime.split('-')[0] ===
                    noStartYear.value
              )
              .map((el) => (
                <NextDelivery
                  subDetail={subDetail}
                  modalList={modalList}
                  setState={setState}
                  getMinDate={getMinDate}
                  el={el}
                />
              ))}
          {activeTabIdx === 1 &&
            subDetail.completedTradeList &&
            subDetail.completedTradeList
              .filter(
                (el) =>
                  completedYear &&
                  el.tradeState.createTime.split('-')[0] === completedYear.value
              )
              .map((el, i) => (
                <CompletedDelivery el={el} isActive={isActive} i={i} />
              ))}
        </div>
      </div>
    </div>
  );
};
export default DeliveryList;
