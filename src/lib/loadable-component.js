import React from 'react';
import Loadable from 'react-loadable';
// import Loading from '@/components/Loading';
import cn from 'classnames';

/**
 * Load components on demand
 * @param {JSX} preloadJSX - JSX for preload, in order to resolve the design language's bug
 * 原因是Loadable组件时，design language本质是DOMContentLoaded进行事件绑定，其处理样式文件按页面class名使用情况进行按需加载逻辑，
 * 所以提前将用到的class名前置加载，以使其正常加载样式文件
 */
export default (loader, preloadClassName) => {
  return Loadable({
    loader,
    loading: () => {
      return (
        <div
          className={cn('rc-card rc-list rc-icon rc-img', preloadClassName)}
          style={{ display: 'none' }}
        />
      );
      // return <Loading preloadClassName={preloadClassName} />;
    }
  });
};
