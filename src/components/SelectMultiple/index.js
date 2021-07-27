import React from 'react';
import findIndex from 'lodash/findIndex';
import './index.less';

let selectedArray = [];
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
    customCls: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      optionsVisible: false,
      selectedItem: {
        name: '',
        value: this.props.selectedItemData?.value || '',
        id: -1
      },
      selectArray: [],
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
  handleClickOption(val, item) {
    let selectedArr = this.state.selectArray;
    const isExist = selectedArr?.filter((item) => item.value == val);
    const UniqueItem = selectedArr?.filter((item) => item.value != val);
    if (isExist.length) {
      selectedArr = [].concat(UniqueItem);
    } else {
      selectedArr.push(item);
    }
    this.setState(
      {
        selectedItem: { val, ...item },
        optionsVisible: false,
        selectArray: selectedArr
      },
      () => {
        this.props.selectedItemChange(this.state.selectArray, item);
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
    const { selectedItemData, disabled, optionList } = this.props;
    const selectedValues = selectedItemData?.value?.split(',');
    const selectArray = optionList.filter((item) =>
      selectedValues.find((sel) => sel == item.value)
    );
    if (disabled) {
      return;
    }
    this.setState((currentState) => ({
      optionsVisible: !currentState.optionsVisible,
      hoveredIdx: !currentState.optionsVisible
        ? findIndex(optionList, (o) => o.value + '' === selectedItem.value + '')
        : -1
    }));
    this.setState(
      {
        dataList: optionList,
        selectArray
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
    if (this.props.emptyFirstItem == 'State') {
      if (resl.length == 0) {
        this.setState({
          noResultsFound: true
        });
      } else {
        this.setState({
          noResultsFound: false
        });
        if (resl[0]?.name != 'State') {
          resl.unshift({ value: '', name: 'State' });
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
  render() {
    const { optionList, customStyleType, wider, placeholder } = this.props;
    const {
      dataList,
      selectedItem,
      noResultsFound,
      hoveredIdx,
      optionsVisible
    } = this.state;
    const selectedValues = this.props.selectedItemData?.value?.split(',');
    const innerChooseVal = selectedValues
      ?.filter((item) => optionList?.find((el) => el.value == item))
      ?.toString();
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
          data-type={customStyleType || (wider ? 'select-wider' : '')}
          style={{ cursor: this.props.disabled ? 'auto' : 'pointer' }}
          onClick={this.toggleShowOptions}
        >
          <div
            className="choices__inner"
            style={{ ...this.props.customInnerStyle }}
          >
            <div className="choices__list choices__list--single d-flex justify-content-center align-items-center">
              <div
                className="choices__item choices__item--selectable choices__item--selectable-input"
                // contenteditable="true"
                // placeholder={placeholder}
                aria-selected="true"
              >
                {innerChooseVal}
              </div>
            </div>
          </div>
          <div
            className={`choices__list choices__list--dropdown ${
              optionsVisible ? 'is-active' : ''
            }`}
            aria-expanded={optionsVisible}
          >
            {/* 快速搜索关键字 */}
            {this.props.choicesInput ? (
              <input
                type="text"
                className="selection_choices_input choices__input choices__input--cloned"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder=""
                onClick={(e) => this.handleClickSearchInput(e)}
                onChange={(e) => this.handleSearchInputChange(e)}
                ref={this.searchRef}
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
                      selectedValues.find((sel) => sel == item.value)
                        ? 'is-highlighted'
                        : ''
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
