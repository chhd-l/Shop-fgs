import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children?: any;
  className?: string;
  onClick?: any;
  href?: string;
  to?: any;
  itemType?: any;
  itemProp?: any;
  ariaLabel?: any;
  style?: any;
  target?: string;
}

const DistributeHubLinkOrATag = ({
  children,
  className,
  onClick,
  href,
  to,
  itemType,
  itemProp,
  ariaLabel,
  style,
  target = '_self',
  ...rest
}: Props) => {
  return window.__.env.REACT_APP_HUB ? (
    <a
      href={`${window.__.env.REACT_APP_HUB_URLPREFIX}${href}`}
      className={className}
      style={style}
      onClick={onClick}
      itemType={itemType}
      itemProp={itemProp}
      aria-label={ariaLabel}
      target={target}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link
      to={to}
      className={className}
      style={style}
      onClick={onClick}
      itemType={itemType}
      itemProp={itemProp}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default DistributeHubLinkOrATag;
