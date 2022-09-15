import React from 'react';

const NewInput = ({
  item,
  disabled = false,
  callback,
  prevIcon,
  caninForm,
  errMsgObj,
  newInputFous,
  newInputChange,
  newInputBlur,
  maxLengthFun
}) => {
  if (caninForm[item.fieldKey]) {
    item.Status = 'inputOk';
  }
  if (errMsgObj[item.fieldKey]) {
    item.Status = 'inputErr';
  }

  const statusObj = item.InitFormStatus[item.Status];
  return (
    <>
      <div className="w-100">
        <label className="flex flex-col">
          {
            <span
              className={cn('text-sm my-1', {
                visible: statusObj['showLabel'],
                invisible: !statusObj['showLabel']
              })}
            >
              {/* <FormattedMessage id={`payment.${item.fieldKey}`} /> */}
              {item.fieldKey}
            </span>
          }

          <div className="relative">
            {prevIcon && prevIcon()}
            <input
              className={cn(
                `${statusObj['border']} w-full text-14 pt-2 pb-3 placeholder-primary placeholder-opacity-50 ${statusObj['borderColorCss']}`,
                { 'pl-5': prevIcon }
              )}
              onFocus={newInputFous}
              id={`${item.fieldKey}Shipping`}
              type={item.filedType}
              value={caninForm[item.fieldKey] || ''}
              onChange={newInputChange}
              // onCompositionStart={this.compositionStart}
              // onCompositionEnd={this.compositionEnd}
              //onBlur={this.inputBlur}
              onBlur={newInputBlur}
              name={item.fieldKey}
              disabled={item?.disabled ? true : false}
              maxLength={maxLengthFun(item)}
              autocomplete="new-password"
              placeholder={item.fieldKey}
            />
            <i
              className={cn(
                'absolute right-0 top-1 iconfont',
                statusObj['iconCss']
              )}
            ></i>
          </div>
        </label>
      </div>
      {callback && callback()}
      {/* 输入提示 */}
      {item.requiredFlag == 1 && errMsgObj[item.fieldKey] && (
        <div className="text-form-err">{errMsgObj[item.fieldKey]}</div>
      )}
    </>
  );
};

export default NewInput;
