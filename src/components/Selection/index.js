import React from 'react'
import { find, findIndex } from 'lodash'
import './index.css'

export default class Selection extends React.Component {
  static defaultProps = {
    optionList: [],
    customStyleType: '', // eg: select-one
    customContainerStyle: null
  }
  constructor(props) {
    super(props)
    this.state = {
      optionsVisible: false,
      selectedItem: { name: '', value: '', id: -1 },
      hoveredIdx: -1
    }
    this.timeOutId = null
  }
  componentWillReceiveProps (nextProps) {
    
    if(this.props.type === 'freqency') {
      console.log(nextProps, nextProps.selectedItemData,'date' ,this.state.selectedItem)
    }
    const selectedItemData = nextProps.selectedItemData
    if (selectedItemData.value !== this.state.selectedItem.value) {
      this.setState({
        selectedItem: { value: selectedItemData.value }
      })
    }
  }
  hideOptions = () => {
    this.setState({
      optionsVisible: false
    })
  }
  handleClickOption (value, item) {
    this.setState({
      selectedItem: { value, id: item.id, name: item.name }
    }, () => {
      this.props.selectedItemChange(this.state.selectedItem)
    })
  }
  handleMouseEnterOption (idx) {
    this.setState({
      hoveredIdx: idx
    })
  }
  toggleShowOptions (e) {
    const { optionsVisible, selectedItem } = this.state
    if(this.props.disabled) {
      return
    }
    this.setState(currentState => ({
      optionsVisible: !currentState.optionsVisible,
      hoveredIdx: !currentState.optionsVisible ? findIndex(this.props.optionList, o => o.value === selectedItem.value) : -1,
    }))
  }
  onBlurHandler () {
    this.timeOutId = setTimeout(() => {
      this.setState({
        optionsVisible: false
      })
    })
  }
  onFocusHandler () {
    clearTimeout(this.timeOutId)
  }
  render () {
    const { selectedItem, hoveredIdx, optionsVisible } = this.state
    const { optionList } = this.props
    return (
      <div
        onBlur={() => this.onBlurHandler()}
        onFocus={() => this.onFocusHandler()}
        style={{ ...this.props.customContainerStyle }}>
        <div
          className={`choices ${optionsVisible ? 'is-open' : ''} ${this.props.disabled? 'disabled': ''}`}
          role="listbox"
          tabIndex="1"
          data-type={this.props.customStyleType}
          style={{cursor: this.props.disabled? 'auto': 'pointer',width:'13rem'}}
          onClick={e => this.toggleShowOptions(e)}>
          <div className="choices__inner">
            <div className="choices__list choices__list--single">
              <div className="choices__item choices__item--selectable" aria-selected="true">
                {find(optionList, ele => ele.value == selectedItem.value) && find(optionList, ele => ele.value == selectedItem.value).name}&nbsp;
              </div>
            </div>
          </div>
          <div className={`choices__list choices__list--dropdown ${optionsVisible ? 'is-active' : ''}`} aria-expanded={optionsVisible}>
            <div className="choices__list" dir="ltr" role="listbox">
              {this.props.optionList.map((item, i) => (
                <div
                  className={`choices__item choices__item--choice choices__item--selectable ${hoveredIdx === i ? 'is-highlighted' : ''}`}
                  role="option"
                  aria-selected="false"
                  key={i}
                  onClick={() => this.handleClickOption(item.value, item)} onMouseEnter={() => this.handleMouseEnterOption(i)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}