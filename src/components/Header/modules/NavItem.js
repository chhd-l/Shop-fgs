import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({ item = {}, className, style = {}, children, onClick }) {
  const isLocalHost = window.location.hostname == 'localhost';
  return (
    <>
      {item.href ? (
        <a
          href={item.href.pathname}
          target={item.href.target}
          className={className}
          style={{ ...style }}
          onClick={onClick}
        >
          {children}
        </a>
      ) : item.link ? (
        item.link.pathname == '/home' && item.storeId == 123457919 ? (
          isLocalHost ? (
            <a
              href={`${item.link.pathname}`}
              className={className}
              style={{ ...style }}
              onClick={onClick}
            >
              {children}
            </a>
          ) : (
            <a
              href={`/jp${item.link.pathname}`}
              className={className}
              style={{ ...style }}
              onClick={onClick}
            >
              {children}
            </a>
          )
        ) : (
          <Link
            onClick={onClick}
            to={item.link}
            className={className}
            style={{ ...style }}
          >
            {children}
          </Link>
        )
      ) : (
        <span onClick={onClick} className={className} style={{ ...style }}>
          {children}
        </span>
      )}
    </>
  );
}

export default NavItem;
