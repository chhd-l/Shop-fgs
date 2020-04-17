import React from 'react'
import '@/assets/css/search.css'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.matchParentCatogery = this.matchParentCatogery.bind(this)
  }
  get computedCheckList () {
    return this.props.checkedList.map(v => {
      return { parentCatogery: this.matchParentCatogery(v), value: v }
    })
  }
  matchParentCatogery (val) {
    let res = ''
    this.props.filterList.forEach(item => {
      if (item.list.find(l => l.value === val)) {
        res = item.name.toLocaleLowerCase()
      }
    });
    return res
  }
  render () {
    const { computedCheckList } = this
    const { onChange, onRemove, filterList, checkedList } = this.props
    return (
      <form className="rc-filters__form" action="" name="example-filter">
        <header className="rc-filters__header">
          <button className="rc-md-down rc-stick-left rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography"
            data-filter-trigger="filter-example" type="button"></button>
          <h1 className="rc-filters__heading rc-padding-top--sm rc-padding-bottom--xs rc-header-with-icon rc-header-with-icon--alpha">
            <span className="md-up rc-icon rc-filter--xs rc-iconography"></span>
            Filters
          </h1>
          <div className="filter-bar">
            <ul>
              {computedCheckList.map((v, i) => (
                <li className="filter-value" title={`Sorted by ${v.parentCatogery}: ${v.value}`} key={v + i}>
                  {v.value}
                  <i className="filter-remove" onClick={onRemove.bind(this, v.value)}></i>
                </li>
              ))}
            </ul>
          </div>
          {checkedList.length ?
            <div className="text-center rc-margin-y--xs rc-padding-bottom--xs">
              <a className="rc-styled-link js-clear-filter" onClick={onRemove.bind(this, 'all')}>Remove all filters</a>
            </div> : ''}

        </header>

        <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" role="presentation" className="rc-margin--none">
          {filterList.map((f, index) => (
            <React.Fragment key={f.name + index}>
              <dt role="heading">
                <button className="rc-list__header" id={`accordion-header-${index}`} data-toggle={`accordion-content-${index}`} role="button">{f.name}</button>
              </dt>
              <dd className="rc-list__content rc-expand--vertical" id={`accordion-content-${index}`}>
                {f.list.map((l, i) => (
                  <li title={`Sort by ${f.name.toLocaleLowerCase()}: ${l.label}`} className="rc-list__item" key={l.label + i}>
                    <div className="rc-input rc-input--stacked">
                      <input className="rc-input__checkbox" id={`input-${index}-${i}`} type="checkbox" name="checkbox"
                        checked={checkedList.indexOf(l.value) > -1}
                        value={l.value} onChange={onChange.bind(this, l.value)} />
                      <label className="rc-input__label--inline" htmlFor={`input-${index}-${i}`}>
                        {l.label}
                      </label>
                    </div>
                  </li>
                ))}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </form>
    )
  }
}

export default Filter