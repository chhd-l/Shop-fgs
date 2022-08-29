import React, { Fragment, useState } from 'react';
import cn from 'classnames';

const SearchAddressPreview = (props) => {
  const { caninForm, hideSearchAddressPreview, setCaninForm, formListOption } =
    props;
  const { address1, city, deliveryAddress, postCode, county } = props.caninForm;

  const [isEditingAddr2, setIsEditingAddr2] = useState(false);

  const editAdd2 = () => {
    setIsEditingAddr2(!isEditingAddr2);
  };

  const newInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const newCaninForm = { ...caninForm, ...{ [name]: value } };
    setCaninForm(newCaninForm);
  };

  const newInputJSX = (item) => {
    const statusObj = item.InitFormStatus[item.Status];
    return (
      <>
        <div className="w-56">
          <label className="flex flex-col">
            <div className="relative">
              <input
                className={`${statusObj['border']} w-full bg-gray-100 text-14 py-2 placeholder-primary placeholder-opacity-50 ${statusObj['borderColorCss']}`}
                id={`${item.fieldKey}Shipping`}
                type={item.filedType}
                value={caninForm[item.fieldKey] || ''}
                onChange={newInputChange}
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

  return (
    <>
      <span className="mb-1 ml-1 mr-2 text-cs-gray text-14">Address</span>
      <span className="iconfont iconchenggong text-form-ok"></span>
      <div className="relative pl-7 pt-8 pb-5 bg-gray-200 rounded-xl">
        <span
          className="absolute right-4 top-2 text-14 font-medium underline cursor-pointer"
          onClick={hideSearchAddressPreview}
        >
          Modify
        </span>
        <div className="text-cs-gray text-14">{address1}</div>
        <div className="text-cs-gray text-14">
          {postCode} {city}
        </div>
        {!isEditingAddr2 ? (
          <div
            className="text-cs-black text-14 font-medium underline cursor-pointer"
            onClick={editAdd2}
          >
            Ajouter un complement
          </div>
        ) : (
          <div className="flex flex-col text-14">
            <div
              className="text-cs-black my-2 font-medium cursor-pointer"
              onClick={editAdd2}
            >
              Complement d'address
            </div>
            {formListOption.map((item, index) => {
              return (
                <Fragment key={index}>
                  {/* 当 inputFreeTextFlag=1，inputSearchBoxFlag=0 时，为普通文本框（text、number） */}
                  {item.inputFreeTextFlag == 1 &&
                  item.inputSearchBoxFlag == 0 ? (
                    <>
                      {item.fieldKey == 'comment' ? <></> : newInputJSX(item)}
                    </>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAddressPreview;
