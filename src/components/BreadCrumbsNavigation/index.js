import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function BreadCrumbsNavigation({ list }) {
  const decoList = [
    { name: <FormattedMessage id="homePage" />, link: '/' },
    ...list
  ];
  return (
    <div
      className="rc-bg-colour--brand3 rc-md-up"
      style={{ paddingTop: '1px' }}
    >
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul className="d-flex">
          {decoList.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.link ? (
                  <Link
                    className="rc-styled-link rc-progress__breadcrumb mr-0"
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span>{item.name}</span>
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
