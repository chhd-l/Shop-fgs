import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export type TabItemProps = PropsWithChildren<{
  active?: boolean;
  onClick?: () => void;
}>;
const TabPane = ({ children, active, onClick }: TabItemProps) => {
  const className = classNames('rc-padding-y--md', {
    'bg-violet-600': active
  });
  return (
    <>
      <div
        id="tab__panel-1--single-4e432196-9e94-47a0-9de3-b4e3caf507ec"
        // className="rc-padding-y--md"
        className={className}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};

export default TabPane;
