import React from 'react';
import './index.less';
import { InitFormStatus } from '@/utils/utils';
import cn from 'classnames';
import { preProcessFile } from 'typescript';
/**
 * 带有远程搜索功能的下拉选择组件
 */

class SearchSelection extends React.Component {
  static defaultProps = {
    customStyle: false,
    disabled: false,
    timeout: 0,
    inputCustomStyle: false, //input框是否要全长
    customCls: '',
    isBottomPaging: false, // 滑倒底部翻页
    isLoadingList: true, // 是否显示loading
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
      optionPanelVisible: false,
      form: {
        value: this.props.defaultValue,
        pageNum: 0
      },
      loadingList: false,
      placeholder: this.props.placeholder,
      searchForNoResult: true,
      Status: this.props.defaultValue ? 'inputOk' : 'empty',
      InitFormStatus: { ...InitFormStatus }
    };
    this.timer = null;
    this.otherValue = '';
    this.searchText = React.createRef();
  }
  componentDidMount = () => {
    // console.log('666 searchSelection form: ', this.state.form);
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.setState({
        form: {
          ...this.state.form,
          value: this.props.defaultValue
        }
      });
      if (!this.props.defaultValue) {
        this.setState({
          placeholder: this.props.placeholder
        });
      }
    }

    if (this.props.errMsg !== prevProps.errMsg) {
      this.setState({
        Status: 'inputErr'
      });
    }
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  setFormItemStatus = (Status) => {
    this.setState({ Status });
  };

  handleInputChange = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const target = e.target;
    const tname = target.name;

    if (target.value.length > 0) {
      this.setFormItemStatus('inputOk');
    } else {
      this.setFormItemStatus('empty');
    }

    const { form } = this.state;
    try {
      form.value = target.value;
      // 返回搜索框输入的值
      this.props.searchInputChange(e);
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
          form: form
          // optionList: []
        },
        () => {
          if (this.props.freeText) {
          }
        }
      );

      clearTimeout(this.timer);
      let timeout = this.props.timeout;
      let tm = this.props.isLoadingList ? 1000 : timeout > 0 ? timeout : 80;
      this.timer = setTimeout(() => {
        this.queryList(); // 搜索
      }, tm);
    } catch (error) {
      console.log(error);
    }
  };
  handleInputFocus = (e) => {
    // eslint-disable-next-line no-unused-expressions
    this.props.onSearchSelectionFocus?.();
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
    } else {
      this.setState({
        placeholder: this.props.placeholder
      });
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
                  storeId: window.__.env.REACT_APP_STOREID,
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
        // console.log('666 >>> currentItem: ', this.state.currentItem);
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
    if (this.props.isLoadingList) {
      this.setState({
        loadingList: true
      });
    }
    this.setState({
      optionPanelVisible: true
    });
    try {
      let res = await this.props.queryList({
        inputVal: form.value,
        pageNum: form.pageNum
      });
      this.setState({
        optionList: res,
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
    // eslint-disable-next-line no-unused-expressions
    this.props.onSearchSelectionChange?.();
    e.nativeEvent.stopImmediatePropagation();
    const { form } = this.state;
    form.value = item?.newName || item.name;
    this.setState({
      form: form,
      optionList: [],
      optionPanelVisible: false,
      currentItem: item?.newName || item.name,
      otherValue: item?.newName || item.name
    });
    this.setFormItemStatus('inputOk');
    this.otherValue = item?.newName || item.name;
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
    const { optionList, form, InitFormStatus, Status } = this.state;
    const statusObj = InitFormStatus[Status];
    const { name } = this.props;
    return (
      <div className="w-100">
        <label
          className="flex flex-col"
          onBlur={() => {
            setTimeout(() => {
              this.setState({
                optionList: [],
                optionPanelVisible: false
              });
            }, 500);
          }}
        >
          <span
            className={cn('text-sm my-1', {
              visible: statusObj.showLabel,
              invisible: !statusObj.showLabel
            })}
          >
            {/* <FormattedMessage id={`payment.${item.fieldKey}`} /> */}
            {name}
          </span>
          <div className="relative">
            <input
              disabled={this.props.disabled}
              type="text"
              placeholder={this.state.placeholder}
              className={cn(
                `${statusObj['border']} w-full text-14 pt-2 pb-3 placeholder-primary placeholder-opacity-50 ${statusObj['borderColorCss']}`
              )}
              value={form.value || ''}
              onChange={(e) => this.handleInputChange(e)}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
              ref={this.searchText}
              name={this.props.name}
              autoComplete="off"
            />
            <i
              className={cn(
                'absolute right-0 top-1 iconfont',
                statusObj['iconCss']
              )}
            ></i>
          </div>
        </label>
        {this.state.optionPanelVisible && (
          <div className="border mt-1 w-full bg-white rounded z-50">
            <ul
              className="m-0 clinic-item-container test-scroll"
              onScroll={this.hanldeScroll}
            >
              {optionList.map((item, idx) => (
                <li
                  className={`clinic-item pl-2 pr-2 ${
                    idx !== optionList.length - 1 ? 'border-bottom' : ''
                  }`}
                  key={item.label}
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
        {!this.state.searchForNoResult &&
          optionList.length === 0 &&
          this.props.nodataTipSlot}
      </div>
    );
  }
}

export default SearchSelection;
