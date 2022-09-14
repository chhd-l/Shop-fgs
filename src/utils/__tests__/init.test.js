jest.mock('lodash/find', () => (arr, callback) => {
  return { petsId: 123 };
});

describe('init 文件测试', () => {
  window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS === '1';

  it('init 测试', () => {
    // window.__.env.REACT_APP_COUNTRY = 'us';
    let div = document.createElement('div');
    div.id = 'root';
    document.getElementsByTagName('body')[0].appendChild(div);
    const init = require('../init');
  });
});
