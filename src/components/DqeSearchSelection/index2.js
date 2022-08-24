import React from 'react';
import { getRandom } from '@/utils/utils';
import cn from 'classnames';
import { InitFormStatus } from './Constant';

/**
 * 带有远程搜索功能的下拉选择组件
 */
class SearchSelection extends React.Component {
  static defaultProps = {
    customStyle: false,
    timeout: 0,
    inputCustomStyle: false, //input框是否要全长
    customCls: '',
    isBottomPaging: false, // 滑倒底部翻页
    isLoadingList: true, // 是否显示loading
    freeText: false,
    name: '',
    isCitySearchSelection: false,
    searchSelectionBlur: () => {},
    searchInputChange: () => {},
    hideLabel: true,
    afterFixIcon: '',
    defaultValue: ''
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
      random: getRandom(),
      Status: 'empty',
      InitFormStatus: { ...InitFormStatus }
    };
    this.timer = null;
    this.otherValue = '';
    this.searchText = React.createRef();
  }
  componentDidMount = () => {
    window.addEventListener('click', (e) => {
      if (e.origin !== location.origin) return;
      let str = '';
      let path = Array.from(e.path);
      path.pop();
      path.forEach((el) => {
        str = str + JSON.stringify(el.classList);
      });
      const isDqeClicked = str.includes(`dqeFormSpace_${this.state.random}`);
      if (!isDqeClicked) {
        setTimeout(() => {
          this.setState({
            optionList: [],
            optionPanelVisible: false
          });
        }, 500);
      }
    });
  };
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  //
  clearForm = () => {
    const { form } = this.state;
    const newForm = { ...form, ...{ value: '' } };
    this.setState({ form: newForm });
  };
  //checkout大改造
  setFormItemStatus = (Status) => {
    this.setState({ Status });
  };

  handleInputChange = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const target = e.target;

    if (target.value.length > 0) {
      this.setFormItemStatus('normal');
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
    let streetNumbers = item.listeNumero?.split(';') || [];
    console.log('item', item);
    // debugger
    // selectedListeNumero
    item.selectedListeNumero =
      item.selectedListeNumero ||
      (streetNumbers.length === 1 ? item.listeNumero : '');
    if (streetNumbers.length > 1 && !item.selectedListeNumero) {
      let currentOptions = streetNumbers.map((el) => {
        let currentItem = { ...item };
        currentItem.name = `${el} ${item.name}`;
        currentItem.newName = `${el} ${item.newName}`;
        currentItem.address1 = `${el} ${item.address1}`;
        currentItem.selectedListeNumero = el;
        return currentItem;
      });
      this.setState({ optionList: currentOptions });
      return;
    } else {
      const form = { ...this.state.form };
      form.value = item?.newName || item.name;
      this.setState(
        {
          form: form,
          optionList: [],
          optionPanelVisible: false,
          currentItem: item?.newName || item.name,
          otherValue: item?.newName || item.name
        },
        () => {
          this.setFormItemStatus('inputOk');
          this.props.showSearchAddressPreviewFun();
        }
      );
      this.otherValue = item?.newName || item.name;
      this.props.selectedItemChange(item);
    }
  };
  render() {
    const { optionList, form, random, Status, InitFormStatus } = this.state;
    const statusObj = InitFormStatus[Status];
    const { name, hideLabel } = this.props;
    return (
      <form className={`fullWidth dqeFormSpace_${random}`} autoComplete="off">
        <div style={{ flex: this.props.inputCustomStyle ? 'auto' : '' }}>
          {
            <>
              <span
                className={cn('min-w-min text-sm my-1 pr-3', {
                  visible: statusObj.showLabel,
                  invisible: !statusObj.showLabel,
                  hidden: hideLabel
                })}
              >
                {/* <FormattedMessage id={`payment.${name}`} /> */}
                {name}
              </span>
            </>
          }
          <div
            className={`${this.props.customCls} ${
              this.props.customStyle
                ? 'w-full relative'
                : 'rc-input rc-input--full-width rc-margin-y--xs'
            } searchSelection`}
          >
            {/* 解决表单只有一个input元素时按下enter自动提交问题，添加一个隐藏的input输入框即可 */}
            <input type="text" className="hidden"></input>
            {this.props.prefixIcon}
            <input
              type="text"
              placeholder={this.state.placeholder}
              className={cn(
                {
                  'w-full text-14 py-2 placeholder-primary placeholder-opacity-50 border-b border-form':
                    this.props.customStyle
                },
                { 'form-control': !this.props.customStyle },
                { 'pl-5': this.props.prefixIcon }
              )}
              value={form.value || ''}
              onChange={(e) => this.handleInputChange(e)}
              onFocus={this.handleInputFocus}
              // onBlur={this.handleInputBlur}
              ref={this.searchText}
              name={this.props.name}
              autoComplete="off"
            ></input>
            {this.props.afterFixIcon}
            {/* {this.props.customStyle && <label className="rc-input__label" />} */}
            {this.state.optionPanelVisible && (
              <div className="border bg-white rounded-b-2xl z-50">
                <ul className="m-0 clinic-item-container test-scroll">
                  {optionList.map((item, idx) => (
                    <li
                      className={`clinic-item p-2 cs-black`}
                      key={`${item.label}_${idx}`}
                      onClick={(e) => this.handleClickClinicItem(e, item)}
                    >
                      {item.name}
                    </li>
                  ))}
                  {optionList.length > 0 && (
                    <div className="p-2 border-t">
                      Saisir l’adresse manuellement
                    </div>
                  )}
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
      </form>
    );
  }
}

export default SearchSelection;
