import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './Popover.less';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import cn from 'classnames';
import { Button } from '@/components/Common';

class PopoverComp extends React.Component {
  static defaultProps = {
    content: <FormattedMessage id="confirmDelete" />,
    containerStyle: {},
    arrowStyle: {},
    contentStyle: {},
    cancelBtnVisible: true,
    confirmBtnVisible: true,
    okText: <FormattedMessage id="clinic.confirm" />,
    cancelText: <FormattedMessage id="cancel" />,
    positions: [],
    handleContentMouseOver: () => {},
    handleContentMouseOut: () => {}
  };

  cancel = (e) => {
    this.props.updateChildDisplay(false);
  };
  render() {
    const {
      containerStyle,
      arrowStyle,
      contentStyle,
      cancelText,
      okText,
      positions
    } = this.props;
    return (
      <Popover
        isOpen={this.props.display}
        positions={
          positions.length ? positions : ['bottom', 'left', 'right', 'top']
        } // preferred positions by priority
        onClickOutside={() => this.props.updateChildDisplay(false)}
        containerStyle={containerStyle}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'#d7d7d7'}
            arrowSize={10}
            arrowStyle={arrowStyle}
            className="popover-arrow-container z-50"
            arrowClassName={cn('popover-arrow', {
              'confirm-tool-arrow111': position === 'bottom'
            })}
          >
            <div
              onMouseOver={this.props.handleContentMouseOver}
              onMouseOut={this.props.handleContentMouseOut}
              className="px-3 pt-3 pb-2 bg-rc-f6"
              style={{
                maxWidth: '300px',
                height: 'auto',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '5px',
                color: '#666',
                border: '1px solid #d7d7d7'
              }}
            >
              <div className="content-text" style={contentStyle}>
                {this.props.content}
              </div>
              {this.props.cancelBtnVisible || this.props.confirmBtnVisible ? (
                <div className="d-flex justify-content-between py-2">
                  {this.props.cancelBtnVisible ? (
                    <Button size="small" className="mt-1" onClick={this.cancel}>
                      {cancelText}
                    </Button>
                  ) : null}
                  {this.props.confirmBtnVisible ? (
                    <Button
                      type="primary"
                      size="small"
                      className={'mt-1'}
                      onClick={(e) => {
                        this.props.confirm(e);
                      }}
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
        {this.props.children}
      </Popover>
    );
  }
}
export default PopoverComp;
