import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 判断url是否以http(s)，是，使用a标签跳转外链，否则link跳转内联
 */

const DistributeHubLinkOrATag = ({ children, url, ariaLabel, ...rest }) => {
  return /^https?:\/\//.test(url) ? (
    <a href={url} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  ) : (
    <Link to={url} aria-label={ariaLabel} {...rest}>
      {children}
    </Link>
  );
};

export default DistributeHubLinkOrATag;
