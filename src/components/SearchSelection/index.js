import React from 'react';

/**
 * 带有远程搜索功能的下拉选择组件
 */

function throttle(fn, delay) {
  let timer = null;
  let nextFlag = true; //用标志位来判断是否结束了一次执行
  return function () {
    if (nextFlag) {
      nextFlag = false;
      timer = setTimeout(function () {
        fn();
        nextFlag = true;
      }, delay);
    }
  };
}
class SearchSelection extends React.Component {
  static defaultProps = {
    customStyle: false,
    customCls: '',
    isBottomPaging: false, // 滑倒底部翻页
    freeText: false,
    name: '',
    isCitySearchSelection: false,
    searchSelectionBlur: () => {},
    searchInputChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      optionList: [],
      form: {
        value: this.props.defaultValue,
        pageNum: 0
      },
      loadingList: false,
      placeholder: this.props.placeholder,
      searchForNoResult: true
    };
    this.timer = null;
    this.otherValue = '';
    this.searchText = React.createRef();
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  handleInputChange = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const target = e.target;
    const { form } = this.state;
    try {
      form.value = target.value;
      // 返回搜索框输入的值
      this.props.searchInputChange(target.value);
      this.setState({
        form: form,
        searchForNoResult: true
      });
      if (!target.value) {
        return false;
      }
      form.pageNum = 0;
      this.setState(
        {
          form: form,
          optionList: []
        },
        () => {
          if (this.props.freeText) {
            // this.handleSetInputItem();
          }
        }
      );

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.queryList(); // 搜索
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  handleInputFocus = (e) => {
    const tmpVal = this.state.form.value;
    if (tmpVal) {
      this.setState({
        currentItem: tmpVal
      });
      // freeText= false，获取焦点时清空文本框value，赋值placeholder
      if (!this.props.freeText) {
        this.setState({
          placeholder: tmpVal,
          form: Object.assign(this.state.form, { value: '' })
        });
      }
    }
  };
  handleInputBlur = (e) => {
    if (this.props.freeText) {
      const target = e.target;
      const { form } = this.state;
      this.props.searchSelectionBlur(e);
      try {
        setTimeout(() => {
          // 可以输入，也可以选择
          if (this.otherValue && this.otherValue != '') {
            form.value = this.otherValue;
            setTimeout(() => {
              this.otherValue = '';
            }, 500);
          } else {
            form.value = target.value;
          }

          this.setState(
            {
              form: form,
              optionPanelVisible: false
            },
            () => {
              if (this.props.isCitySearchSelection) {
                let citem = {
                  cityName: form.value,
                  cityNo: null,
                  createTime: null,
                  delFlag: 0,
                  delTime: null,
                  id: null,
                  name: form.value,
                  osmId: null,
                  postCode: null,
                  sip: null,
                  stateId: null,
                  stateName: null,
                  storeId: process.env.REACT_APP_STOREID,
                  systemCityPostCodes: null,
                  updateTime: null
                };
                this.props.selectedItemChange(citem);
              }
            }
          );
        }, 500);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        // 没有选择有效item时，回填之前的值
        this.setState({
          form: Object.assign(this.state.form, {
            value: this.state.currentItem || ''
          }),
          searchForNoResult: true
        });
      }, 500);
    }
  };
  async queryList() {
    const { form, optionList } = this.state;
    this.setState({ loadingList: true, optionPanelVisible: true });
    try {
      let res = await this.props.queryList({
        inputVal: form.value,
        pageNum: form.pageNum
      });
      this.setState({
        optionList: optionList.concat(...res),
        loadingList: false,
        searchForNoResult: res.length > 0
      });
    } catch (err) {
      this.setState({
        optionList: [],
        loadingList: false
      });
    }
  }
  handleClickClinicItem = (e, item) => {
    e.nativeEvent.stopImmediatePropagation();
    const { form } = this.state;
    form.value = item.name;
    this.setState({
      form: form,
      optionList: [],
      optionPanelVisible: false,
      currentItem: item.name,
      otherValue: item.name
    });
    this.otherValue = item.name;
    this.props.selectedItemChange(item);
  };
  hanldeScroll = (e) => {
    let { form } = this.state;
    const target = e.target;
    let wholeHeight = target.scrollHeight;
    let scrollTop = target.scrollTop;
    let divHeight = target.clientHeight;
    // 滚动到容器底部
    if (scrollTop + divHeight >= wholeHeight && this.props.isBottomPaging) {
      form.pageNum++;
      this.setState(
        {
          form: form
        },
        () => {
          this.queryList();
        }
      );
    }
  };
  render() {
    const { optionList, form } = this.state;
    return (
      <div>
        <div
          className={`${this.props.customCls} ${
            this.props.customStyle
              ? 'rc-input rc-input--label rc-margin--none rc-input--full-width'
              : 'rc-input rc-input--full-width rc-margin-y--xs'
          } searchSelection`}
          onBlur={() => {
            setTimeout(() => {
              this.setState({ optionList: [], optionPanelVisible: false });
            }, 500);
          }}
        >
          {this.props.prefixIcon}
          <input
            type="text"
            placeholder={this.state.placeholder}
            className={`${
              this.props.customStyle ? 'rc-input__control' : 'form-control'
            }`}
            value={form.value || ''}
            onChange={(e) => this.handleInputChange(e)}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            ref={this.searchText}
            name={this.props.name}
          />
          {this.props.customStyle && <label className="rc-input__label" />}
          {this.state.optionPanelVisible && (
            <div className="clnc-overlay border mt-1 position-absolute w-100">
              <ul
                className="m-0 clinic-item-container test-scroll"
                onScroll={this.hanldeScroll}
              >
                {optionList.map((item, idx) => (
                  <li
                    className={`clinic-item pl-2 pr-2 ${
                      idx !== optionList.length - 1 ? 'border-bottom' : ''
                    }`}
                    key={idx}
                    onClick={(e) => this.handleClickClinicItem(e, item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              {this.state.loadingList && (
                <div className="text-center p-2">
                  <span className="ui-btn-loading ui-btn-loading-border-red" />
                </div>
              )}
            </div>
          )}
        </div>
        {!this.state.searchForNoResult &&
          optionList.length === 0 &&
          this.props.nodataTipSlot}
      </div>
    );
  }
}

export default SearchSelection;
