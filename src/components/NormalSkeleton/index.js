import React from 'react';
import Skeleton from 'react-skeleton-loader';

export default function NormalSkeleton({ height = '20%' }) {
  return <Skeleton count="3" color="#f5f5f5" width="100%" height={height} />;
}
