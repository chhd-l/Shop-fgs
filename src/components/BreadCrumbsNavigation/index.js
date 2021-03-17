import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';

function BreadCrumbsNavigation({ list }) {
  const decoList = [
    { name: <FormattedMessage id="homePage" />, link: '/', href: '/' },
    ...list
  ];
  return (
    <div
      className="breadcrumb-navigation rc-bg-colour--brand3 rc-md-up"
      style={{ paddingTop: '1px' }}
    >
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul
          className="d-flex bc-nav-ul"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {decoList.map((item, index) => (
            <React.Fragment key={index}>
              <li
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
              >
                {index === decoList.length - 1 || !item.link ? (
                  <span itemProp="name">{item.name}</span>
                ) : item.href ? (
                  <>
                    <DistributeHubLinkOrATag href={item.link}>
                      {item.name}
                    </DistributeHubLinkOrATag>
                  </>
                ) : (
                  <>
                    <Link
                      className="rc-styled-link rc-progress__breadcrumb mr-0"
                      itemType="https://schema.org/Thing"
                      itemProp="item"
                      to={item.link}
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                  </>
                )}
              </li>
              {index !== decoList.length - 1 && (
                <span className="font-weight-normal ml-2 mr-2">&gt;</span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbsNavigation;
