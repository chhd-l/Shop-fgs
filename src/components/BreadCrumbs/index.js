import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl';
import { STORE_CATE_ENUM } from '@/utils/constant';
import { find } from 'lodash';

const sessionItemRoyal = window.__.sessionItemRoyal;

const BreadCrumbs = withRouter((props) => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname;

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || [];
  // specific for keywords search
  if (url.indexOf('/list/keywords') > -1 && !mapData.length) {
    mapData = breadcrumbNameMap['/list/keywords'];
  }

  // specific for details page
  if (url.substr(1, 7) === 'details' && !mapData.length) {
    let cateName = sessionItemRoyal.get('rc-goods-cate-name');
    let goodsName = sessionItemRoyal.get('rc-goods-name');
    if (cateName) {
      const tmp = find(STORE_CATE_ENUM, (ele) => ele.text === cateName);
      mapData.push({ name: cateName, href: (tmp && tmp.url) || '' });
    }
    if (goodsName) {
      mapData.push({ name: goodsName });
    }
  }

  return (
    <div
      className="rc-bg-colour--brand3 rc-md-up"
      style={{ paddingTop: '1px' }}
    >
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul className="d-flex">
          <li>
            <Link
              to="/"
              className="rc-styled-link rc-progress__breadcrumb mr-0"
              aria-label="Links to home page"
            >
              <FormattedMessage id="homePage" />
            </Link>
          </li>
          {mapData.length > 0 && (
            <span className="font-weight-normal ml-2 mr-2">&gt;</span>
          )}
          {mapData.map((item, index) => (
            <>
              <li key={index}>
                {item.href ? (
                  <Link
                    className="rc-styled-link rc-progress__breadcrumb mr-0"
                    to={item.href}
                  >
                    <FormattedMessage id={`${item.name}`} />
                  </Link>
                ) : (
                  <FormattedMessage id={`${item.name}`}>
                    {(txt) => <span title={txt}>{txt}</span>}
                  </FormattedMessage>
                )}
              </li>
              {index !== mapData.length - 1 && (
                <span className="font-weight-normal ml-2 mr-2">&gt;</span>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default BreadCrumbs;
