import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({ item = {}, className, style = {}, children, onClick }) {
  const isLocalHost = window.location.hostname == 'localhost';
  const jpGotoHome = (navItem) => {
    if (navItem.link.pathname == '/home' && navItem.storeId == 123457919) {
      if (isLocalHost) {
        return (
          <a
            href={`${navItem.link.pathname}`}
            className={className}
            style={{ ...style }}
            onClick={onClick}
          >
            {children}
          </a>
        );
      } else {
        return (
          <a
            href={`/jp${navItem.link.pathname}`}
            className={className}
            style={{ ...style }}
            onClick={onClick}
          >
            {children}
          </a>
        );
      }
    } else {
      return (
        <Link
          onClick={onClick}
          to={item.link}
          className={className}
          style={{ ...style }}
        >
          {children}
        </Link>
      );
    }
  };
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
        jpGotoHome(item)
      ) : (
        <span onClick={onClick} className={className} style={{ ...style }}>
          {children}
        </span>
      )}
    </>
  );
}

export default NavItem;
