import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';

function BreadCrumbsNavigation({ list }) {
  // 首字母大写
  if (list[0]?.name) {
    let lsname = list[0].name;
    list[0].name =
      lsname.toLowerCase().charAt(0).toUpperCase() +
      lsname.toLowerCase().slice(1);
  }
  const decoList = [
    {
      name: <FormattedMessage id="homePage" />,
      link: '/',
      href: '',
      isHubOuterLink: true
    },
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
                className="text-capitalize"
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
              >
                {index === decoList.length - 1 || !item.link ? (
                  <span itemProp="name">{item.name}</span>
                ) : item.isHubOuterLink ? (
                  <>
                    <DistributeHubLinkOrATag href={item.href} to={item.link}>
                      <span itemProp="name">{item.name}</span>
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
                <meta itemProp="position" content={index + 1} />
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
