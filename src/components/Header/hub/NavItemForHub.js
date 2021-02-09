import React from 'react';

function NavItem({ item = {}, className, style = {}, children, onClick }) {
  return (
    <>
      {item.link && item.link.url ? (
        <a
          href={item.link.url}
          className={className}
          style={{ ...style }}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <span onClick={onClick} className={className} style={{ ...style }}>
          {children}
        </span>
      )}
    </>
  );
}

export default NavItem;
