import React, { useState } from 'react';

const SearchAddressPreview = (props) => {
  console.log(props.data);
  const { data, hideSearchAddressPreview, setCaninForm } = props;
  const { address1, city, deliveryAddress, postCode, county } = props.data;

  const [isEditingAddr2, setIsEditingAddr2] = useState(false);
  const [add2, setAdd2] = useState('');

  const editAdd2 = () => {
    setIsEditingAddr2(!isEditingAddr2);
  };

  const inputChange = (e) => {
    setAdd2(e.target.value);
    const caninForm = { ...data, ...{ address2: e.target.value } };
    setCaninForm(caninForm);
  };
  return (
    <>
      <span className="ml-1 mr-2 text-cs-gray text-14">Address</span>
      <span className="iconfont iconchenggong text-form-ok"></span>
      <div className="relative pl-7 py-5 bg-gray-100 rounded-xl">
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
            <input
              className="text-14 bg-gray-100 py-1 border-b border-black w-52 text-cs-gray"
              type="text"
              value={add2}
              onChange={inputChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAddressPreview;
