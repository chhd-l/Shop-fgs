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
const PanelContainer = ({
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
}) => {
  const { className: cClassName, ...cRest } = containerConf || {};

  return (
    <div
      className={cn(
        'card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3 border',
        panelStatus.isEdit ? 'border-333' : 'border-transparent',
        cClassName
      )}
      {...cRest}
    >
      <div
        className={cn(
          'd-flex justify-content-between align-items-center flex-wrap',
          { red: panelStatus.isEdit },
          tClassName
        )}
        {...tRest}
      >
        <h5 className="mb-0 text-xl">
          {titleVisible ? (
            <span className="flex justify-start">
              {panelStatus.isEdit ? highlighIcon : defaultIcon}{' '}
              <span>
                <span>{title}</span>
                {panelStatus.isCompleted ? (
                  <span className="iconfont font-weight-bold green ml-2 iconchenggong" />
                ) : null}
              </span>
            </span>
          ) : null}
        </h5>
        {panelStatus.isCompleted && onEdit ? (
          <p
            onClick={onEdit}
            className="rc-styled-link mb-1 leading-tight edit_payment_method cursor-pointer"
          >
            {edit || <FormattedMessage id="edit" />}
          </p>
        ) : null}
      </div>
      <div className={cn({ hidden: !panelStatus.isEdit })}>{children}</div>
      {panelStatus.isCompleted ? previewJSX : null}
    </div>
  );
};
export default PanelContainer;
