import React from 'react';
import findIndex from 'lodash/findIndex';
import cn from 'classnames';
import './index.less';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';

@injectIntl
export default class Selection extends React.Component {
  static defaultProps = {
    optionList: [],
    customStyleType: '', // eg: select-one【实心】 ，多种下拉箭头样式
    customContainerStyle: null,
    placeholder: '',
    customInnerStyle: {},
    choicesInput: false,
    emptyFirstItem: '',
    selectedItemData: null,
    customCls: '',
    hasBorder: false
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
      hoveredIdx: -1,
      dataList: [],
      noResultsFound: false
    };
    this.timeOutId = null;
    this.searchRef = React.createRef();
  }
  componentDidMount() {
    this.searchRef?.current && this.searchRef?.current?.focus();
  }
  hideOptions = () => {
    this.setState({
      optionsVisible: false
    });
  };
  handleClickOption(value, item) {
    if (this.props.comfirmModal) {
      this.props.selectedItemChange({ value, ...item });
      if (this.props.slotTimeChanged) {
        this.setState({
          selectedItem: { value, ...item },
          optionsVisible: false
        });
      }
    } else {
      this.setState(
        {
          selectedItem: { value, ...item },
          optionsVisible: false
        },
        () => {
          this.props.selectedItemChange(this.state.selectedItem);
        }
      );
    }
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
    this.props.onClick && this.props.onClick();
    this.setState((currentState) => ({
      optionsVisible: !currentState.optionsVisible,
      hoveredIdx: !currentState.optionsVisible
        ? findIndex(
            this.props.optionList,
            (o) => o.value + '' === selectedItem.value + ''
          )
        : -1
    }));
    this.setState(
      {
        dataList: this.props.optionList
      },
      () => {
        if (this.searchRef) {
          this.searchRef?.current?.focus();
        }
      }
    );
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
  handleSearchInputChange = (e) => {
    const { optionList } = this.props;
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    let keyword = e.target.value;
    let resl = optionList.filter((item) =>
      item.name.match(new RegExp(keyword, 'i'))
    );
    if (this.props.emptyFirstItem) {
      let efstr = this.props.emptyFirstItem;
      if (resl.length == 0) {
        this.setState({
          noResultsFound: true
        });
      } else {
        this.setState({
          noResultsFound: false
        });
        if (resl[0]?.name != efstr) {
          resl.unshift({ value: '', name: efstr });
        }
      }
    }
    this.setState({
      dataList: resl
    });
  };
  handleClickSearchInput = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  };
  showValue = () => {
    let res = '';
    const { placeholder, optionList } = this.props;
    const { selectedItem } = this.state;
    const length = optionList.filter(
      (ele) => ele.value + '' === selectedItem.value + ''
    ).length;
    if (length) {
      let option = optionList.filter(
        (ele) => ele.value + '' === selectedItem.value + ''
      )[0].name;
      if (option) {
        res = option;
      } else {
        res = placeholder;
      }
      return res;
    }
  };
  render() {
    const { optionList, customStyleType, wider } = this.props;
    const {
      dataList,
      selectedItem,
      noResultsFound,
      hoveredIdx,
      optionsVisible
    } = this.state;
    // this.setState({
    //   dataList: optionList
    // });
    return (
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
        style={{ ...this.props.customContainerStyle }}
        className={`${this.props.customCls}`}
      >
        <div
          id="Selection"
          className={cn(`choices`, {
            'is-open': optionsVisible,
            disabled: this.props.disabled,
            'has-border': this.props.hasBorder
          })}
          role="listbox"
          tabIndex="1"
          data-type={customStyleType || (wider ? 'select-wider' : '')}
          style={{ cursor: this.props.disabled ? 'auto' : 'pointer' }}
          onClick={this.toggleShowOptions}
        >
          <div
            className={cn('choices__inner')}
            style={this.props.customInnerStyle}
            ref={(node) => {
              const { customInnerStyle } = this.props;
              if (node) {
                for (const key in customInnerStyle) {
                  const value = customInnerStyle[key];
                  if (value.includes('!important')) {
                    node.style.setProperty(
                      key,
                      value.split('!important')[0],
                      'important'
                    );
                  }
                }
              }
            }}
          >
            <div className="choices__list choices__list--single d-flex justify-content-center align-items-center">
              <div
                className="choices__item choices__item--selectable"
                aria-selected="true"
              >
                {/* {optionList.filter(
                  (ele) => ele.value + '' === selectedItem.value + ''
                ).length
                  ? optionList.filter(
                      (ele) => ele.value + '' === selectedItem.value + ''
                    )[0].name
                  : this.props.placeholder} */}
                {this.showValue()}
              </div>
            </div>
          </div>
          <div
            className={cn(`choices__list choices__list--dropdown`, {
              'visible block': optionsVisible
            })}
            aria-expanded={optionsVisible}
          >
            {/* 快速搜索关键字 */}
            {this.props.choicesInput ? (
              <input
                type="text"
                className="selection_choices_input choices__input choices__input--cloned"
                autoCapitalize="off"
                spellCheck="false"
                placeholder=""
                onClick={(e) => this.handleClickSearchInput(e)}
                onChange={(e) => this.handleSearchInputChange(e)}
                ref={this.searchRef}
                autoComplete="new-password"
              />
            ) : null}

            <div className="choices__list" dir="ltr" role="listbox">
              {noResultsFound && (
                <div className="choices__item choices__item--custom-data choices__item--choice has-no-results">
                  No results found
                </div>
              )}
              {dataList.map((item, i) =>
                item.value == '' ? (
                  <div
                    className={`choices__item choices__item--choice choices__item--selectable ${
                      hoveredIdx === i ? 'is-highlighted' : ''
                    }`}
                    role="option"
                    aria-selected="false"
                    key={i}
                  >
                    {item.name}
                  </div>
                ) : (
                  <div
                    className={`choices__item choices__item--choice choices__item--selectable ${
                      hoveredIdx === i ? 'is-highlighted' : ''
                    } ${item.disabled ? 'disabled_item' : ''}`}
                    role="option"
                    aria-selected="false"
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.disabled) {
                        return;
                      }
                      this.handleClickOption(item.value, item);
                    }}
                    onMouseEnter={() => {
                      if (item.disabled) {
                        return;
                      }
                      this.handleMouseEnterOption(i);
                    }}
                  >
                    {item.name}
                  </div>
                )
              )}
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
