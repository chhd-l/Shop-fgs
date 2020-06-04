import React from 'react'
import { find, findIndex } from 'lodash'

export default class Selection extends React.Component {
  static defaultProps = {
    optionList: []
  }
  constructor(props) {
    super(props)
    this.state = {
      optionsVisible: false,
      selectedItem: { value: '' },
      hoveredIdx: -1
    }
  }
  componentDidMount () {
    document.addEventListener('click', () => {
      this.setState({
        optionsVisible: false
      })
    })
  }
  componentWillReceiveProps (nextProps) {
    const selectedItemData = nextProps.selectedItemData
    if (selectedItemData !== this.state.selectedItem) {
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
  handleClickOption (value) {
    this.setState({
      selectedItem: { value }
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
    e.nativeEvent.stopImmediatePropagation();
    const { optionsVisible, selectedItem } = this.state
    this.setState({
      optionsVisible: !optionsVisible,
      hoveredIdx: !optionsVisible ? findIndex(this.props.optionList, o => o.value === selectedItem.value) : -1,
    })
  }
  render () {
    const { selectedItem, hoveredIdx, optionsVisible } = this.state
    const { optionList } = this.props
    return (
      <div
        className="choices"
        role="listbox"
        onClick={e => this.toggleShowOptions(e)}>
        <div className="choices__inner">
          <div className="choices__list choices__list--single">
            <div className="choices__item choices__item--selectable" aria-selected="true">
              {find(optionList, ele => ele.value === selectedItem.value) && find(optionList, ele => ele.value === selectedItem.value).name}
            </div>
          </div>
        </div>
        <div className={`choices__list choices__list--dropdown ${optionsVisible ? 'is-active' : ''}`} aria-expanded="false">
          <div className="choices__list" dir="ltr" role="listbox">
            {this.props.optionList.map((item, i) => (
              <div
                className={`choices__item choices__item--choice choices__item--selectable ${hoveredIdx === i ? 'is-highlighted' : ''}`}
                role="option"
                aria-selected="false"
                title={item.name}
                key={i}
                onClick={() => this.handleClickOption(item.value)} onMouseEnter={() => this.handleMouseEnterOption(i)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}