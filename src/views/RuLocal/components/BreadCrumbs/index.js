import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl-phraseapp';
import { isMobile } from '@/utils/utils';

const BreadCrumbs = withRouter((props) => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname?.toLocaleLowerCase();

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || [];
  if (isMobile && mapData.length > 1) {
    // 移动端只展示倒数第二层
    mapData = mapData.splice(mapData.length - 2, 1);
  }
  return (
    <div className="rc-bg-colour--brand3" style={{ paddingTop: '1px' }}>
      {/* <div className={`rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm ${window.__.env.REACT_APP_RU_LOCALIZATION_ENABLE?"rc-padding-top--md rc-padding-bottom--xs":"rc-padding-y--xs"}`}> */}
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
            isMobile || (mapData.length === 1 && props.noHomeLink) ? (
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
                {console.info(index < mapData.length - 1)}
                {console.info(mapData.length === 1 && isMobile)}
                {console.info(
                  mapData.length === 1 && !isMobile && !props.noHomeLink
                )}
                <Link
                  className={`rc-styled-link rc-progress__breadcrumb mr-0 ${
                    index < mapData.length - 1 ||
                    (mapData.length === 1 && isMobile) ||
                    (mapData.length === 1 && !isMobile && props.noHomeLink)
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
