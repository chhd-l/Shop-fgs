import React from 'react';
import { Link } from 'react-router-dom';

class DistributeHubLinkOrATag extends React.Component {
  render() {
    const {
      children,
      className,
      onClick,
      href,
      to,
      itemType,
      itemProp,
      ariaLabel,
      style,
      target
    } = this.props;
    return +process.env.REACT_APP_HUB ? (
      <a
        href={`${process.env.REACT_APP_HUB_URLPREFIX}${href}`}
        className={className}
        style={style}
        onClick={onClick}
        itemType={itemType}
        itemProp={itemProp}
        aria-label={ariaLabel}
        target={target}
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
      >
        {children}
      </Link>
    );
  }
}

export default DistributeHubLinkOrATag;
