import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl'

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
            <Link to="/" className="rc-styled-link rc-progress__breadcrumb" aria-label="Links to home page">
              <FormattedMessage id="homePage" />
            </Link>
          </li>
          {mapData.map((item, index) => (
            <li key={index}>
              {item.href ? <Link className="rc-styled-link rc-progress__breadcrumb" to={item.href}>{item.name}</Link> : item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
})

export default BreadCrumbs