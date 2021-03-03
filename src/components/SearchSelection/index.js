import React from 'react';

/**
 * 带有远程搜索功能的下拉选择组件
 */
class SearchSelection extends React.Component {
  static defaultProps = {
    customStyle: false,
    customCls: '',
    isBottomPaging: false // 滑倒底部翻页
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
  }
  handleInputChange = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const target = e.target;
    const { form } = this.state;
    try {
      form.value = target.value;
      this.setState({ form: form, searchForNoResult: true });
      if (!target.value) {
        return false;
      }
      form.pageNum = 0;
      this.setState({ form: form, optionList: [] });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.queryList();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  handleInputFocus = (e) => {
    const tmpVal = this.state.form.value;
    if (tmpVal) {
      this.setState({
        placeholder: tmpVal,
        form: Object.assign(this.state.form, { value: '' }),
        currentItem: tmpVal
      });
    }
  };
  handleInputBlur = (e) => {
    // if (process.env.REACT_APP_LANG == 'en') {
      // 可以输入，也可以选择
      const target = e.target;
      const { form } = this.state;
      try {
        setTimeout(() => {
          if (this.otherValue && this.otherValue != '') {
            form.value = this.otherValue;
            setTimeout(()=>{
              this.otherValue = '';
            },500);
          } else {
            form.value = target.value;
          }

          let citem = {
            cityName: form.value,
            cityNo: null,
            countryName: null,
            createTime: null,
            delFlag: 0,
            delTime: null,
            id: form.value,
            name: form.value,
            osmId: null,
            postCode: null,
            sip: null,
            stateId: null,
            stateName: null,
            storeId: process.env.REACT_APP_STOREID,
            systemCityPostCodes: null,
            updateTime: null
          }

          this.setState({
            form: form,
            optionPanelVisible: false,
          });
          this.props.selectedItemChange(citem);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    // } else {
    //   setTimeout(() => {
    //     // 没有选择有效item时，回填之前的值
    //     this.setState({
    //       form: Object.assign(this.state.form, {
    //         value: this.state.currentItem || ''
    //       }),
    //       searchForNoResult: true
    //     });
    //   }, 500);
    // }
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
      <>
        <div
          className={`${this.props.customCls} ${this.props.customStyle
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
            className={`${this.props.customStyle ? 'rc-input__control' : 'form-control'
              }`}
            value={form.value}
            onChange={(e) => this.handleInputChange(e)}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
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
                    className={`clinic-item pl-2 pr-2 ${idx !== optionList.length - 1 ? 'border-bottom' : ''
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
      </>
    );
  }
}

export default SearchSelection;
