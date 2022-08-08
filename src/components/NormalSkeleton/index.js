import React from 'react';
import Skeleton from 'react-skeleton-loader';

export default function NormalSkeleton({
  height = '20%',
  width = '100%',
  count = 3,
  color = '#f5f5f5'
}) {
  return <Skeleton count={count} color={color} width={width} height={height} />;
}
