import React from 'react';
import './selectMultip';
import './index.less';

class MultipleSelect extends React.Component {
  static defaultProps = {
    customStyle: false,
    inputCustomStyle: false, //input框是否要全长
    customCls: '',
    isBottomPaging: false, // 滑倒底部翻页
    isLoadingList: true, // 是否显示loading
    freeText: false,
    name: ''
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
      searchForNoResult: true
    };
  }

  componentDidMount() {
    selectMultip.register();
  }

  render() {
    const { optionList, form } = this.state;
    return (
      <div className="multiple-select-container">
        <select
          id="22"
          data-multip
          style={{ width: '180px', height: '30px', marginLeft: '200px' }}
        >
          <option value="">---请选择---</option>
          <option value="1">薯片</option>
          <option value="2">大豆油</option>
          <option value="3">花生</option>
        </select>
        <span
          className={`iconfont font-weight-bold icon-arrow ${
            false ? 'active' : ''
          }`}
        >
          &#xe6fa;
        </span>
      </div>
    );
  }
}

export default MultipleSelect;
