import React from 'react';
import './index.less';
type MyTabProps = {
  tabList: {
    tab: string;
    element: JSX.Element;
  }[];
};
const MyTab = ({ tabList }: MyTabProps) => {
  return (
    <div>
      <nav className="rc-tabs__controller  rc-fade--x" data-toggle-group="">
        <ul
          className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank rc-tab--centered padding-inline-start"
          role="tablist"
        >
          {tabList.map((item, index) => (
            <li key={item.tab}>
              <button
                className="rc-tab rc-btn rc-btn--sm whitespace-nowrap"
                data-toggle={`tab__panel-${
                  index + 1
                }--single-4e432196-9e94-47a0-9de3-b4e3caf507ec`}
                role="tab"
              >
                {item.tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {tabList.map((item, index) => (
          <div
            key={item.tab}
            id={`tab__panel-${
              index + 1
            }--single-4e432196-9e94-47a0-9de3-b4e3caf507ec`}
            className="rc-padding-y--md px-cs-2"
          >
            {item.element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTab;
