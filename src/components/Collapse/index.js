import React from 'react';

import './index.css';

const getCollapsedHeight = function getCollapsedHeight() {
  return {
    height: 0,
    opacity: 0
  };
};

const getRealHeight = function getRealHeight(node) {
  return {
    height: node?.scrollHeight + 'px',
    opacity: 1
  };
};

const Icon = ({ isActive }) => {
  if (isActive) {
    return (
      <svg
        className="icon"
        style={{
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
          fill: 'currentColor',
          overflow: 'hidden'
        }}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z"
          fill=""
        />
      </svg>
    );
  }

  return (
    <svg
      className="icon"
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden'
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M800 480l-256 0L544 224c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 256L224 480c-17.664 0-32 14.336-32 32s14.336 32 32 32l256 0 0 256c0 17.696 14.336 32 32 32s32-14.304 32-32l0-256 256 0c17.696 0 32-14.336 32-32S817.696 480 800 480z" />
    </svg>
  );
};

class Panel extends React.Component {
  contentRef = null;

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  handleClick = () => {
    const { onItemClick, panelKey } = this.props;
    onItemClick(panelKey);
  };

  render() {
    const { header, isActive } = this.props;
    const style = isActive
      ? getRealHeight(this.contentRef.current)
      : getCollapsedHeight();

    return (
      <div className="collapse-item">
        <div className="collapse-header" onClick={this.handleClick}>
          <div style={{ flex: 1 }}>{header}</div>
          <Icon isActive={isActive} />
        </div>
        <div className={`collapse-content`} style={style}>
          <div ref={this.contentRef} className="collapse-content-box">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @param defaultActiveKey? 默认展开项
 * @param onChange? (key) => {} 点击回调事件
 *
 * <Collapse defaultActiveKey="a" onChange={(e) => console.log(e)}>
 *  <Panel header="标题" key="a">内容</Panel>
 *  <Panel header="标题2" key="b">内容2</Panel>
 * </Collapse>
 */

class Collapse extends React.Component {
  constructor(props) {
    super(props);

    const defaultActiveKey = props.defaultActiveKey
      ? String(props.defaultActiveKey)
      : null;

    this.state = {
      active: defaultActiveKey
    };
  }

  handleClick = (index) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(index);
    }

    if (this.state.active === index) {
      this.setState({
        active: null
      });
      return;
    }

    this.setState({
      active: index
    });
  };

  renderItem = () => {
    const { active } = this.state;

    return React.Children.map(this.props.children, (child, index) => {
      const panelKey = child.key || String(index);
      const isActive = panelKey === active;

      return React.cloneElement(child, {
        panelKey: panelKey,
        isActive: isActive,
        onItemClick: this.handleClick
      });
    });
  };

  render() {
    return <div className="collapse">{this.renderItem()}</div>;
  }
}

Collapse.Panel = Panel;

export default Collapse;
