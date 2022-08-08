/*
 * @Author: mingyi.tang@effem.com mingyi.tang@effem.com
 * @Date: 2022-08-04 14:13:05
 * @LastEditors: mingyi.tang@effem.com mingyi.tang@effem.com
 * @LastEditTime: 2022-08-08 17:03:37
 * @FilePath: \shop-front\src\components\Form\Downselect\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import './index.less';
let RCInputProps = {
  placeholder: '请输入',
  type: 'text',
  tips: ''
};

const RCDownselect = (props: any) => {
  //下拉选择是否显示
  const [show, setShow] = useState(false);
  //下拉选择框的内容
  const [data, setData] = useState<any[]>([]);
  //输入框的内容
  const [val, setVal] = useState('');
  RCInputProps = { ...props };
  let { placeholder, tips } = RCInputProps;
  const handlechange = (ev: any) => {
    let { value } = ev.target;
    setVal(value);
    let dd = data;
    //在这里去发送请求，然后接受返回的东西去push
    dd.push(value);
    setData([...dd]);
  };
  const handleVal = (val: any) => {
    setVal(val);
    setShow(false);
  };
  return (
    <>
      <div className="p-3 w-80 downselect">
        <i className="iconfont iconSearch absolute top-5 text-gray-400"></i>
        <input
          data-testid="downSelect"
          placeholder={placeholder}
          className={'border-b-2 border-gray-400 py-3 pl-8 w-80'}
          onFocus={() => setShow(true)}
          onBlur={() => {
            setTimeout(() => {
              setShow(false);
            }, 500);
          }}
          onChange={(ev) => handlechange(ev)}
          value={val}
        />
        {show && (
          <>
            <ul className={`p-3 border-2 w-80 h-24 overflow-auto ulscoll`}>
              {data?.length > 0 &&
                data?.map((one, i) => (
                  <li
                    className="hover:bg-gray-200"
                    onClick={() => handleVal(one)}
                    key={i}
                  >
                    {one}
                  </li>
                ))}
            </ul>
            <div className="p-2 border-t-0 w-80 rounded-b-lg font-semibold border-2">
              {tips}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default RCDownselect;
