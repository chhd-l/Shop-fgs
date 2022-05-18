import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({ item = {}, className, style = {}, children, onClick }) {
  console.log('NavItem', item);
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
        item.link.pathname == '/home' ? (
          <a
            href={item.link.pathname}
            className={className}
            style={{ ...style }}
            onClick={onClick}
          >
            {children}
          </a>
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
