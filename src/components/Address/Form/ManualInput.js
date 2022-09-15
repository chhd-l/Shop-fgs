import React from 'react';
import cn from 'classnames';

const NewInputJSX = ({
  formList,
  item,
  caninForm,
  setCaninForm,
  setFormList
}) => {
  const statusObj = item.InitFormStatus[item.Status];

  const setFormItemStatus = (tname, status) => {
    const formList = [...formList];

    formList.forEach((list) => {
      if (list.fieldKey == tname) {
        list.Status = status;
      }
    });
    setFormList(formList);
  };

  const inputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const newCaninForm = { ...caninForm, ...{ [name]: value } };
    setCaninForm(newCaninForm);
    if (value.length > 0) {
      setFormItemStatus(name, 'inputOk');
    } else {
      setFormItemStatus(name, 'empty');
    }
  };

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
            <input
              className={`${statusObj['border']} w-full text-14 py-2 placeholder-primary placeholder-opacity-50 ${statusObj['borderColorCss']}`}
              id={`${item.fieldKey}Shipping`}
              type={item.filedType}
              value={caninForm[item.fieldKey] || ''}
              onChange={inputChange}
              name={item.fieldKey}
              disabled={item?.disabled ? true : false}
              autoComplete="off"
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
    </>
  );
};

const ManualInput = ({
  formList,
  address1Item,
  address2Item,
  postCodeItem,
  cityItem,
  caninForm,
  setCaninForm,
  setFormList
}) => {
  return (
    <>
      <div className="w-full">
        {address1Item.length > 0 && (
          <NewInputJSX
            formList={formList}
            item={address1Item[0]}
            caninForm={caninForm}
            setCaninForm={setCaninForm}
            setFormList={setFormList}
          />
        )}
      </div>
      <div className="full">
        {address2Item.length > 0 && (
          <NewInputJSX
            formList={formList}
            item={address2Item[0]}
            caninForm={caninForm}
            setCaninForm={setCaninForm}
            setFormList={setFormList}
          />
        )}
      </div>
      <div className="flex">
        <div className="w-1/2">
          {postCodeItem.length > 0 && (
            <NewInputJSX
              formList={formList}
              item={postCodeItem[0]}
              caninForm={caninForm}
              setCaninForm={setCaninForm}
              setFormList={setFormList}
            />
          )}
        </div>
        <div className="w-1/2">
          {cityItem.length > 0 && (
            <NewInputJSX
              formList={formList}
              item={cityItem[0]}
              caninForm={caninForm}
              setCaninForm={setCaninForm}
              setFormList={setFormList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManualInput;
