import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl'

const BreadCrumbs = withRouter(props => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || []
  // specific for keywords search
  if (url.indexOf('/list/keywords') > -1 && !mapData.length) {
    mapData = breadcrumbNameMap['/list/keywords']
  }

  // specific for details page
  if (url.substr(1, 7) === 'details' && !mapData.length) {

    let cateName = sessionStorage.getItem('rc-goods-cate-name')
    let goodsName = sessionStorage.getItem('rc-goods-name')
    const urlMap={'/list/dogs':"Dogs",'/list/cats':"Cats"}

    if (cateName) {
      mapData.push({ name: urlMap[cateName], href:cateName })
    }
    if (goodsName) {
      mapData.push({ name: goodsName })
    }
    console.log("测试面包屑：",mapData);
  }

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
              {
                item.href
                  ? <Link className="rc-styled-link rc-progress__breadcrumb" to={item.href}><FormattedMessage id={`${item.name}`} /></Link>
                  : <FormattedMessage id={`${item.name}`}>
                    {
                      txt => (<span title={txt}>{txt}</span>)
                    }
                  </FormattedMessage>
              }
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
})

export default BreadCrumbs