import React from 'react'

class BreadCrumbs extends React.Component {
  renderItem (item) {
    let res = null
    if (item.href) {
      res = `<a className="rc-styled-link rc-progress__breadcrumb" href="${item.href}" aria-label="Links to example page">${item.name}</a>`
    } else {
      res = item.name
    }
    return res
  }
  render () {
    const { data } = this.props
    return (
      <div className="rc-bg-colour--brand3 rc-md-up" style={{ paddingTop: '1px' }}>
        <nav className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
          <ul>
            <li>
              <a className="rc-styled-link rc-progress__breadcrumb" href="./boilerplate"
                aria-label="Links to example page">Home</a>
            </li>
            {data.map((item, index) => (
              <li key={index}>
                {this.renderItem(item)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }
}

export default BreadCrumbs