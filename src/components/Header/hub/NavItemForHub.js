import React from 'react';

function NavItem({ item = {}, className, style = {}, children, onClick }) {
  return (
    <>
      {item.Link && item.Link.Url ? (
        <a
          href={item.Link.Url}
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
