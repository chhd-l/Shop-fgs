import React from 'react'
import '../../assets/css/search.css'
import { cloneDeep } from 'lodash'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checkedList: [] }
  }
  handleChange (value) {
    const { checkedList } = this.state
    let checkedListCopy = cloneDeep(checkedList)
    let index = checkedListCopy.indexOf(value);
    if (index > -1) {
      checkedListCopy.splice(index, 1)
    } else {
      checkedListCopy.push(value)
    }

    this.setState({
      checkedList: []
    })
    this.checkedList.push(value)
  }
  render () {
    // const { filterList } = this.props
    const filterList = [
      {
        name: 'AGE',
        list: [
          {
            label: 'Puppies (up to 10 months)',
            value: 'Puppies (up to 10 months)'
          },
          {
            label: 'Adults (1-7 years old)',
            value: 'Adults (1-7 years old)'
          },
          {
            label: 'Aging (over 7 years old)',
            value: 'Aging (over 7 years old)'
          }
        ]
      },
      {
        name: 'Pet size',
        list: [
          {
            label: 'X-Small (up to 4 kg)',
            value: 'X-Small (up to 4 kg)'
          },
          {
            label: 'Mini (4-10 kg)',
            value: 'Mini (4-10 kg)'
          },
          {
            label: 'Medium (10-25 kg)',
            value: 'Medium (10-25 kg)'
          },
          {
            label: 'Maxi (25-45 kg)',
            value: 'Maxi (25-45 kg)'
          },
          {
            label: 'Giant (over 45 kg)',
            value: 'Giant (over 45 kg)'
          }
        ]
      }
    ]
    return (
      <form className="rc-filters__form" action="" name="example-filter">
        <header className="rc-filters__header">
          <button className="rc-md-down rc-stick-left rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography"
            data-filter-trigger="filter-example" type="button"></button>
          <h1 className="rc-filters__heading rc-padding-top--sm rc-padding-bottom--xs rc-header-with-icon rc-header-with-icon--alpha">
            <span className="md-up rc-icon rc-filter--xs rc-iconography"></span>
            Filters
          </h1>
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
                        value={l.value} onChange={this.handleChange.bind(this, l.value)} />
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