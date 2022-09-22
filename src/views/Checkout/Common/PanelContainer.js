import React from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';

/**
 * checkout页面各模块container模板
 * @param {object} panelStatus - module status: isPrepare-只显示title/isEdit-title+编辑块/isCompleted-title+预览块/hasCompleted
 * @param {object} titleConf - title configuration
 * @param {object} containerConf - container configuration
 * @param {object} children - 编辑块(只在edit状态显示)
 * @returns
 */

class PanelContainer extends React.Component {
  render() {
    const {
      //status,
      panelStatus,
      titleConf: {
        className: tClassName,
        titleVisible = true,
        icon: { defaultIcon, highlighIcon },
        text: { title, edit },
        onEdit,
        ...tRest
      },
      containerConf,
      previewJSX,
      children
    } = this.props;
    const { className: cClassName, ...cRest } = containerConf || {};
    return (
      <div
        className={cn(
          'card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3 shadow-lg',
          // panelStatus.isEdit ? 'border-333' : 'border-transparent',
          panelStatus.isEdit ? '-mx-4 md:mx-0' : 'border-transparent',
          cClassName
        )}
        {...cRest}
      >
        <div
          className={cn(
            'd-flex justify-content-between align-items-center flex-wrap',
            { 'text-rc-red': panelStatus.isEdit },
            tClassName
          )}
          {...tRest}
        >
          <h5 className="mb-0 text-xl flex-1">
            {titleVisible ? (
              <span className="flex justify-between md:justify-start">
                {/* {panelStatus.isEdit ? highlighIcon : defaultIcon}{' '} */}
                <span className="text-26 md:text-30 text-cs-black font-medium">
                  {title}
                </span>
                {panelStatus.isCompleted ? (
                  <span className="iconfont font-weight-bold green ml-4 iconchenggong" />
                ) : null}
              </span>
            ) : null}
          </h5>
          {panelStatus.isCompleted && onEdit ? (
            <p
              onClick={onEdit}
              className="rc-md-up rc-styled-link mb-1 leading-tight edit_payment_method cursor-pointer qhx"
            >
              {edit || <FormattedMessage id="edit" />}
            </p>
          ) : null}
        </div>
        <div className={cn({ hidden: !panelStatus.isEdit })}>{children}</div>
        {panelStatus.isCompleted ? previewJSX : null}
        {panelStatus.isCompleted && onEdit ? (
          <p className="pb-4 ml-custom mr-custom justify-end flex md:hidden">
            <p
              onClick={onEdit}
              className="rc-styled-link mb-1 leading-tight edit_payment_method cursor-pointer qhx "
            >
              {edit || <FormattedMessage id="edit" />}
            </p>
          </p>
        ) : null}
      </div>
    );
  }
}

export default PanelContainer;
