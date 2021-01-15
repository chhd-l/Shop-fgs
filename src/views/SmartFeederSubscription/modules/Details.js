import { getDeviceType } from '@/utils/utils';
import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';

const Details = ({ goodsDetailTab }) => {
  const isMobile = getDeviceType() !== 'PC';
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const tabsArr = [
    { show: true },
    { show: false },
    { show: false },
    { show: false }
  ];
  const [tabs, setTabs] = useState(tabsArr);
  const createMarkup = (text) => ({ __html: text });
  return (
    <>
      {!isMobile && goodsDetailTab.tabName.length ? (
        <div className="rc-max-width--xl">
          <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
            <div>
              <div className="rc-border-bottom rc-border-colour--interface">
                <nav className="rc-fade--x">
                  <ul
                    className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                    role="tablist"
                  >
                    {goodsDetailTab.tabName.map((ele, index) => (
                      <li key={index}>
                        <button
                          className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                          data-toggle={`tab__panel-${index}`}
                          aria-selected={
                            activeTabIdx === index ? 'true' : 'false'
                          }
                          role="tab"
                          onClick={() => setActiveTabIdx(index)}
                        >
                          {ele}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div
                className="rc-tabs tabs-detail"
                style={{ marginTop: '40px' }}
              >
                {goodsDetailTab.tabContent.map((ele, i) => (
                  <div
                    id={`tab__panel-${i}`}
                    key={i}
                    className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                    aria-expanded={activeTabIdx === i ? 'true' : 'false'}
                  >
                    <div className="block">
                      <p
                        className="content rc-scroll--x"
                        style={{ marginBottom: '4rem' }}
                        dangerouslySetInnerHTML={createMarkup(ele)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isMobile &&
        goodsDetailTab.tabName.map((ele, index) => (
          <>
            <dl>
              <div
                className={`rc-list__accordion-item test-color 
                  ${tabs[index].show ? 'showItem' : 'hiddenItem'}`}
              >
                <div
                  className="rc-list__header"
                  onClick={() => {
                      console.info('....', tabs)
                      tabs.forEach((item, idx)=>{
                        if(idx != index){
                            item.show = false
                        }
                      })
                    tabs[index].show = !tabs[index].show;
                    setTabs([...tabs]);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: ele }}></div>
                  <span
                    className={`icon-change ${
                      tabs[index].show
                        ? 'rc-icon rc-up rc-brand1'
                        : 'rc-icon rc-down rc-iconography'
                    }`}
                  ></span>
                </div>
                <div className={`rc-list__content`}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: goodsDetailTab.tabContent[index]
                    }}
                  />
                  <LazyLoad height={200}>
                    <img src={goodsDetailTab.tabContent[index].imgUl} alt="" />
                  </LazyLoad>
                </div>
              </div>
            </dl>
          </>
        ))}
    </>
  );
};
export default Details;
