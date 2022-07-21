import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getDeviceType } from '@/utils/utils';
const BreadCrumbs = withRouter((props) => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname?.toLocaleLowerCase();

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || [];
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  if (isMobile && mapData.length > 1) {
    // 移动端只展示倒数第二层
    mapData = mapData.splice(mapData.length - 2, 1);
  }
  return (
    <div className="rc-bg-colour--brand3" style={{ paddingTop: '1px' }}>
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul
          className="d-flex"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {props.noHomeLink ? null : (
            <li
              className="rc-md-up"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <DistributeHubLinkOrATag
                href={''}
                to="/"
                className="rc-styled-link rc-progress__breadcrumb mr-0"
                ariaLabel="Links to home page"
                itemType="https://schema.org/Thing"
                itemProp="item"
              >
                <span itemProp="name">
                  <FormattedMessage id="homePage" />
                </span>
              </DistributeHubLinkOrATag>
              <meta itemProp="position" content="1" />
            </li>
          )}
          {mapData.length > 0 ? (
            isMobile || mapData.length === 1 ? (
              <span
                itemProp="name"
                className="font-weight-normal ml-2 mr-2"
                style={{ color: '#e2001a' }}
              >
                &lt;
              </span>
            ) : (
              <span
                itemProp="name"
                className="font-weight-normal ml-2 mr-2 rc-md-up"
              >
                &gt;
              </span>
            )
          ) : null}
          {mapData.map((item, index) => (
            <>
              <li
                key={index}
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <Link
                  className={`rc-styled-link rc-progress__breadcrumb mr-0 ${
                    index < mapData.length - 1 || mapData.length === 1
                      ? ''
                      : 'font-thin'
                  }`}
                  itemType="https://schema.org/Thing"
                  itemProp="item"
                  to={item.href}
                >
                  <FormattedMessage id={`${item.name}`}>
                    {(txt) => (
                      <span itemProp="name" title={txt}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>
                </Link>
                <meta itemProp="position" content={index + 2} />
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
