import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Button } from '@/components/Common';
import './index.less';

class ConfirmTooltip extends React.Component {
  static defaultProps = {
    content: <FormattedMessage id="confirmDelete" />,
    containerStyle: {},
    arrowStyle: {},
    arrowDirection: 'top',
    cancelBtnVisible: true,
    confirmBtnVisible: true,
    lastFourDigits: '',
    okText: <FormattedMessage id="clinic.confirm" />,
    cancelText: <FormattedMessage id="cancel" />
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.display) {
      setTimeout(() => {
        document.querySelector('.confirm-tool-content') &&
          document.querySelector('.confirm-tool-content').focus();
      });
    }
  }
  onBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.updateChildDisplay(false);
  };
  cancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.updateChildDisplay(false);
  };
  hanldeClickContainer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  render() {
    const { arrowDirection, textStyle, cancelText, okText } = this.props;
    return this.props.display ? (
      <div
        className={`confirm-tool-container position-relative arrow-direction-${arrowDirection}`}
        onBlur={this.onBlur}
        onClick={this.hanldeClickContainer}
      >
        <div
          className="confirm-tool-content rc-bg-colour--brand4 px-3 pt-3 pb-2 bg-rc-f6"
          style={this.props.containerStyle}
          tabIndex="1"
        >
          <div className={`confirm-tool-arrow`} style={this.props.arrowStyle} />
          <div className=" content-text" style={textStyle}>
            {this.props.content}
          </div>
          <div className="d-flex justify-content-between py-2">
            {this.props.cancelBtnVisible ? (
              <Button size="small" className="mt-1" onClick={this.cancel}>
                {cancelText}
              </Button>
            ) : (
              <div />
            )}
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
        </div>
      </div>
    ) : null;
  }
}
export default ConfirmTooltip;
