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
  handleSaveChange,
  modalList,
  activeTabIdx,
  getMinDate,
  setState,
  timeSlotArr,
  slotTimeChanged,
  intl
}) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const isActive = subDetail.subscribeStatus === 'ACTIVE';
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
          style={{ width: isMobile ? '100%' : '70%', display: 'inline-block' }}
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
            width: isMobile ? '100%' : '30%',
            display: 'inline-block',
            textAlign: 'right',
            verticalAlign: 'middle'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: isMobile ? '100%' : '230px',
              borderBottom: '1px solid #aaa',
              textAlign: 'left'
            }}
          >
            {activeTabIdx === 0 ? (
              <Selection
                customCls={'width-full'}
                optionList={noStartYearOption}
                selectedItemData={noStartYear}
                selectedItemChange={(el) => changeYearOption(el)}
                type="freqency"
                key={(noStartYear && noStartYear.value) || ''}
              />
            ) : (
              <Selection
                customCls={'width-full'}
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
              .map((el, i) => (
                <NextDelivery
                  timeSlotArr={timeSlotArr}
                  subDetail={subDetail}
                  modalList={modalList}
                  setState={setState}
                  getMinDate={getMinDate}
                  handleSaveChange={handleSaveChange}
                  slotTimeChanged={slotTimeChanged}
                  el={el}
                  key={i}
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
                <CompletedDelivery
                  subDetail={subDetail}
                  el={el}
                  isActive={isActive}
                  i={i}
                  key={i}
                  intl={intl}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default DeliveryList;
