import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './Popover.less';
import { Popover, ArrowContainer, PopoverPosition } from 'react-tiny-popover';
import cn from 'classnames';
import { Button } from '@/components/Common';

interface Props {
  display: boolean; //determin the popover is showed or not
  content?: any; //popover's content
  containerStyle?: object;
  arrowStyle?: object;
  contentStyle?: object;
  cancelBtnVisible?: boolean; //cancel button visibility
  confirmBtnVisible?: boolean; //confirm button visibility
  okText?: any; //confirm button text
  cancelText?: any; //cancel button text
  positions?: PopoverPosition[]; //determin which direction the popover showed
  updateChildDisplay: Function; //function to pass up the Popover visibility status
  handleContentMouseOver?: React.MouseEventHandler;
  handleContentMouseOut?: React.MouseEventHandler;
  confirm?: Function; //listening click confirm button
  arrowSize?: number;
  children?: any; //which you can trigger the popover's visible or hidden
}

const PopoverComp = ({
  display,
  positions = [],
  updateChildDisplay,
  containerStyle = {},
  arrowStyle = {},
  contentStyle = {},
  handleContentMouseOver = () => {},
  handleContentMouseOut = () => {},
  confirm = () => {},
  content = <FormattedMessage id="confirmDelete" />,
  okText = <FormattedMessage id="clinic.confirm" />,
  cancelText = <FormattedMessage id="cancel" />,
  cancelBtnVisible = true,
  confirmBtnVisible = true,
  arrowSize = 10,
  children
}: Props) => {
  const cancel = () => {
    updateChildDisplay(false);
  };

  return (
    <Popover
      isOpen={display}
      positions={
        positions.length ? positions : ['bottom', 'left', 'right', 'top']
      } // preferred positions by priority
      onClickOutside={cancel}
      containerStyle={{ ...{ zIndex: '11' }, ...containerStyle }}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'#d7d7d7'}
          arrowSize={arrowSize}
          arrowStyle={arrowStyle}
          className="popover-arrow-container z-50"
          arrowClassName={cn('popover-arrow', `arrow-${position}`)}
        >
          <div
            onMouseOver={handleContentMouseOver}
            onMouseOut={handleContentMouseOut}
            style={Object.assign(
              {},
              {
                maxWidth: '300px',
                padding: '0.75rem 0.75rem .5rem 0.75rem',
                height: 'auto',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '5px',
                color: '#666',
                border: '1px solid #d7d7d7',
                backgroundColor: 'var(--rc-f6)'
              },
              contentStyle
            )}
          >
            <div className="content-text">{content}</div>
            {cancelBtnVisible || confirmBtnVisible ? (
              <div className="d-flex justify-content-between flex-wrap py-2">
                {cancelBtnVisible ? (
                  <Button size="small" className="mt-1" onClick={cancel}>
                    {cancelText}
                  </Button>
                ) : null}
                {confirmBtnVisible ? (
                  <Button
                    type="primary"
                    size="small"
                    className={'mt-1'}
                    onClick={confirm}
                  >
                    {okText}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </ArrowContainer>
      )}
    >
      {/* 这是点击的按钮 */}
      {children}
    </Popover>
  );
};

export default PopoverComp;
