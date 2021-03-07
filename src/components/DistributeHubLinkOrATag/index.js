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
      style
    } = this.props;
    return +process.env.REACT_APP_HUB ? (
      <a
        href={`${process.env.REACT_APP_HUBPAGE_PREFIX}${href}`}
        className={className}
        style={style}
        onClick={onClick}
        itemType={itemType}
        itemProp={itemProp}
        aria-label={ariaLabel}
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
