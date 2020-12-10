import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl';

const BreadCrumbs = withRouter((props) => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname;

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || [];

  return (
    <div
      className="rc-bg-colour--brand3"
      style={{ paddingTop: '1px' }}
    >
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul className="d-flex">
          <li>
            <Link
              to="/home"
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
