import React from 'react'
import { withRouter } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';

const BreadCrumbs = withRouter(props => {
  const { location } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname

  const mapData = breadcrumbNameMap[url] || []

  return (
    <div className="rc-bg-colour--brand3 rc-md-up" style={{ paddingTop: '1px' }}>
      <nav className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul>
          <li>
            <a className="rc-styled-link rc-progress__breadcrumb" href="#/"
              aria-label="Links to example page">Home Page</a>
          </li>
          {mapData.map((item, index) => (
            <li key={index}>
              {item.href ? <a className="rc-styled-link rc-progress__breadcrumb" href={item.href}>{item.name}</a> : item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
})

export default BreadCrumbs