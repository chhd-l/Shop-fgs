import React from 'react';
import { useState } from 'react';
let RCInputProps = {
  placeholder: '请输入', //输入框提示
  type: 'text', //输入框类型
  ltext: null, //输入框左侧文本
  tips: '' //错误提示
};

const RCInput = (props: any) => {
  //验证icon是否显示
  const [show, setShow] = useState<boolean>(false);
  //控制是否符合格式
  const [zhengque, setZhengque] = useState<boolean>(true);
  RCInputProps = { ...props };
  let borcolor = 'border-gray-500';
  //用户传过来的东西；
  let { ltext, placeholder, type, tips } = RCInputProps;
  //输入框change事件
  let contrlPhoneRegexp: any = {
    us: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
    ru: /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    se: /[+(46)|0]\d{10}$/,
    fr: /^\(\+[3][3]\)[\s](([0][1-9])|[1-9]|[0-9]{2})[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/,
    uk: /^\(\+[4][4]\)[\s](([0][0-9][0-9])|[0-9][0-9])[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/,
    mx: /^\+\([5][2]\)[\s\-][0-9]{3}[\s\-][0-9]{3}[\s\-][0-9]{4}$/,
    tr: /^0\s\(?([2-9][0-8][0-9])\)?\s([0-9][0-9]{2})[\-\. ]?([0-9]{2})[\-\. ]?([0-9]{2})(\s*x[0-9]+)?$/,
    jp: /^[0]\d{9,10}$/,
    other: /\S/
  };
  let contrlEmailRegexp = /^[\w.+-]+@[\w.-]+\.[\w]{2,6}$/;
  const inpChange = (ev: any) => {
    let { value } = ev.target;
    switch (type) {
      case 'email':
        let bol = contrlEmailRegexp.test(value);
        if (bol) {
          setZhengque(true);
        } else {
          setZhengque(false);
        }
        break;
      case 'phone':
        let contrl = window.__.env.REACT_APP_COUNTRY;
        let bol1 = contrlPhoneRegexp[contrl].test(value);
        if (bol1) {
          setZhengque(true);
        } else {
          setZhengque(false);
        }
        break;
      case 'text':
        let bol2 = true;
        if (bol2) {
          setZhengque(true);
        } else {
          setZhengque(false);
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="w-full">
        <label className="flex">
          <span className="min-w-min text-sm my-5 mx-6">{ltext}</span>
          <input
            className={
              'border-b-2 w-auto text-base my-4' +
              (zhengque ? ' border-yellow-700' : ' border-red-800') +
              (show ? '' : borcolor)
            }
            onFocus={() => {
              setShow(true);
              setZhengque(false);
            }}
            placeholder={placeholder}
            type={type}
            onChange={(ev) => inpChange(ev)}
          />
          {!zhengque ? (
            <div className="absolute top-12 text-sm left-14 text-red-800">
              {tips}
            </div>
          ) : null}
          {show ? (
            <i
              className={
                'iconfont relative -left-8 top-4' +
                (zhengque
                  ? ' iconchenggong text-yellow-700'
                  : ' iconchahao text-red-800')
              }
            ></i>
          ) : null}
        </label>
      </div>
    </>
  );
};
export default RCInput;
