/*
 * @Author: mingyi.tang@effem.com mingyi.tang@effem.com
 * @Date: 2022-08-08 10:56:53
 * @LastEditors: mingyi.tang@effem.com mingyi.tang@effem.com
 * @LastEditTime: 2022-08-08 16:54:57
 * @FilePath: \shop-front\setupTest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import '@testing-library/jest-dom';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});

Object.defineProperty(window, '__', {
  value: {
    env: {
      REACT_APP_COUNTRY: 'fr'
    }
  }
});
