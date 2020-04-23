import React from 'react'
import { FormattedMessage } from 'react-intl'
import '@/assets/css/search.css'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.matchParentCatogery = this.matchParentCatogery.bind(this)
  }
  get computedCheckList () {
    return this.props.checkedList.map(v => {
      return { parentCatogery: this.matchParentCatogery(v), ...v }
    })
  }
  matchParentCatogery (data) {
    let res = ''
    let tmp = this.props.filterList.find(l => l.propId === data.propId)
    if (tmp) {
      res = tmp.propName.toLocaleLowerCase()
    }
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
            <FormattedMessage id="filters" />
          </h1>
          <div className="filter-bar">
            <ul>
              {computedCheckList.map((v, i) => (
                <FormattedMessage id='sortedBy'>
                  {(txt) => (
                    <li className="filter-value" title={`${txt} ${v.parentCatogery}: ${v.detailName}`} key={v + i}>
                      {v.detailName}
                      <i className="filter-remove" onClick={onRemove.bind(this, v)}></i>
                    </li>
                  )}
                </FormattedMessage>

              ))}
            </ul>
          </div>
          {checkedList.length ?
            <div className="text-center rc-margin-y--xs rc-padding-bottom--xs">
              <a className="rc-styled-link js-clear-filter" onClick={onRemove.bind(this, 'all')}><FormattedMessage id="removeAllFilters" /></a>
            </div> : ''}

        </header>

        <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" role="presentation" className="rc-margin--none">
          {filterList.map((f, index) => (
            <React.Fragment key={index}>
              <dt role="heading">
                <button className="rc-list__header" id={`accordion-header-${index}`} data-toggle={`accordion-content-${index}`} role="button">{f.propName}</button>
              </dt>
              <dd className="rc-list__content rc-expand--vertical" id={`accordion-content-${index}`}>
                {f.goodsPropDetails.map((l, i) => (
                  <li title={`Sort by ${f.propName.toLocaleLowerCase()}: ${l.detailName}`} className="rc-list__item" key={index + '-' + i}>
                    <div className="rc-input rc-input--stacked">
                      <input className="rc-input__checkbox" id={`input-${index}-${i}`} type="checkbox" name="checkbox"
                        checked={checkedList.findIndex(c => c.detailId === l.detailId && c.propId === l.propId) > -1}
                        value={l.propName} onChange={onChange.bind(this, l)} />
                      <label className="rc-input__label--inline" htmlFor={`input-${index}-${i}`}>
                        {l.detailName}
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