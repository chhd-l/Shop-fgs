import React from 'react';
import { Link } from 'react-router-dom';

class DistributeHubLinkOrATag extends React.Component {
  static defaultProps = {
    target: '_self'
  };
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
      target,
      ...rest
    } = this.props;
    return +window.__.env.REACT_APP_HUB ? (
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
  }
}

export default DistributeHubLinkOrATag;
