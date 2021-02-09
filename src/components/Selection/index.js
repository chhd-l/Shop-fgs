import React from 'react';
import findIndex from 'lodash/findIndex';
import './index.less';

export default class Selection extends React.Component {
  static defaultProps = {
    optionList: [],
    customStyleType: '', // eg: select-one【实心】 ，多种下拉箭头样式
    customContainerStyle: null,
    placeholder: '',
    customInnerStyle: {},
    selectedItemData: null,
    customCls: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      optionsVisible: false,
      selectedItem: {
        name: '',
        value:
          (this.props.selectedItemData && this.props.selectedItemData.value) ||
          '',
        id: -1
      },
      hoveredIdx: -1
    };
    console.info('selectedItemDataselectedItemDataselectedItemData', this.props.selectedItemData)
    this.timeOutId = null;
  }
  hideOptions = () => {
    this.setState({
      optionsVisible: false
    });
  };
  handleClickOption(value, item) {
    this.setState(
      {
        selectedItem: { value, ...item }
      },
      () => {
        this.props.selectedItemChange(this.state.selectedItem);
      }
    );
  }
  handleMouseEnterOption(idx) {
    this.setState({
      hoveredIdx: idx
    });
  }
  toggleShowOptions = (e) => {
    const { selectedItem } = this.state;
    if (this.props.disabled) {
      return;
    }
    this.setState((currentState) => ({
      optionsVisible: !currentState.optionsVisible,
      hoveredIdx: !currentState.optionsVisible
        ? findIndex(
            this.props.optionList,
            (o) => o.value + '' === selectedItem.value + ''
          )
        : -1
    }));
  };
  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        optionsVisible: false
      });
    });
  };
  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  };
  render() {
    const { optionList, customStyleType } = this.props;
    const { selectedItem, hoveredIdx, optionsVisible } = this.state;
    return (
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
        style={{ ...this.props.customContainerStyle }}
        className={`${this.props.customCls}`}
      >
        <div
          id="Selection"
          className={`choices ${optionsVisible ? 'is-open' : ''} ${
            this.props.disabled ? 'disabled' : ''
          }`}
          role="listbox"
          tabIndex="1"
          data-type={customStyleType}
          style={{ cursor: this.props.disabled ? 'auto' : 'pointer' }}
          onClick={this.toggleShowOptions}
        >
          <div
            className="choices__inner"
            style={{ ...this.props.customInnerStyle }}
          >
            <div className="choices__list choices__list--single">
              <div
                className="choices__item choices__item--selectable"
                aria-selected="true"
              >
                {
                  console.info('optionList.filter', optionList.filter(
                    (ele) => ele.value + '' === selectedItem.value + ''
                  ))
                }
                {
                  console.info('optionList', optionList)
                }
                {
                  console.info('selectedItem', selectedItem)
                }
                {optionList.filter(
                  (ele) => ele.value + '' === selectedItem.value + ''
                ).length
                  ? optionList.filter(
                      (ele) => ele.value + '' === selectedItem.value + ''
                    )[0].name
                  : this.props.placeholder}
                &nbsp;
              </div>
            </div>
          </div>
          <div
            className={`choices__list choices__list--dropdown ${
              optionsVisible ? 'is-active' : ''
            }`}
            aria-expanded={optionsVisible}
          >
            <div className="choices__list" dir="ltr" role="listbox">
              {optionList.map((item, i) => (
                <div
                  className={`choices__item choices__item--choice choices__item--selectable ${
                    hoveredIdx === i ? 'is-highlighted' : ''
                  }`}
                  role="option"
                  aria-selected="false"
                  key={i}
                  onClick={() => this.handleClickOption(item.value, item)}
                  onMouseEnter={() => this.handleMouseEnterOption(i)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          {customStyleType ? null : (
            <span
              className={`iconfont font-weight-bold icon-arrow ${
                optionsVisible ? 'active' : ''
              }`}
            >
              &#xe6fa;
            </span>
          )}
        </div>
      </div>
    );
  }
}
