import React, { useEffect, useState } from 'react';
import './index.less';

const TabPanel = (props) => {
  const { active, tabKey, title, handleSetTable } = props;
  useEffect(() => {
    handleSetTable(tabKey, title);
  }, [title]);
  return (
    <div
      className={`r-tabs-tab-pane ${
        active === tabKey ? 'r-tabs-tab-pane-active' : ''
      }`}
    >
      {props.children}
    </div>
  );
};

const Tabs = (props) => {
  const { children, current, defaultActiveKey, onChange } = props;
  const [active, setActive] = useState(defaultActiveKey);
  const [tabs, setTabs] = useState([]);
  const [tabTitle, setTabTitle] = useState([]);

  const handleClick = (tab) => {
    setActive(tab);
    onChange?.(tab);
  };

  const handleSetTable = (tab, title) => {
    const idx = tabs.indexOf(tab);
    if (idx < 0) {
      tabs.push(tab);
      tabTitle.push(title);
    } else {
      tabs[idx] = tab;
      tabTitle[idx] = title;
    }
    setTabs(tabs.slice());
    setTabTitle(tabTitle.slice());
  };

  const renderHeader = () => {
    const realActive = current ? current : active;
    return tabs.map((tab, index) => {
      return (
        <div
          key={tab}
          className={`r-tabs-tab ${
            tab === realActive ? 'r-tabs-tab-active' : ''
          }`}
          onClick={() => handleClick(tab)}
        >
          {tabTitle[index]}
        </div>
      );
    });
  };

  const renderBody = () => {
    const realActive = current ? current : active;
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        active: realActive,
        handleSetTable: handleSetTable
      });
    });
  };

  return (
    <div className="r-tabs">
      <div className="r-tabs-header">{renderHeader()}</div>
      <div className="r-tabs-body">{renderBody()}</div>
    </div>
  );
};

Tabs.TabPanel = TabPanel;

export default Tabs;
