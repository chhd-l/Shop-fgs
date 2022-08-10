import {
  flat,
  translateHtmlCharater,
  hanldePurchases,
  stgShowAuth,
  mergeUnloginCartData,
  getDictionary
} from '@/utils/utils';
const sessionItemRoyal = window.__.sessionItemRoyal;
// import { toJS } from 'mobx';
// jest.mock('toJS');

jest.mock('lodash/find', () => (arr, callback) => {
  return { petsId: 123 };
});

jest.mock('@/store', () => {
  return {
    checkoutStore: {
      cartData: [
        {
          goodsInfoId: '',
          goodsNum: '',
          goodsInfoFlag: '',
          periodTypeId: '',
          invalid: false,
          recommendationInfos: [],
          recommendationId: '',
          recommendationName: '',
          goodsCategory: '',
          petsId: '',
          questionParams: '',
          prefixFn: '',
          sizeList: [{ selected: true }]
        }
      ],
      removeCartData: jest.fn()
    },
    clinicStore: {}
  };
});

jest.mock('@/api/cart', () => {
  return {
    //purchases: () => Promise.reject(new Error())
    purchases: () => Promise.resolve({ context: 123 }),
    mergePurchase: () => Promise.resolve({ context: 123 })
  };
});

jest.mock('@/api/dict', () => {
  return {
    getAppointDict: () =>
      Promise.resolve({
        context: {
          goodsDictionaryVOS: []
        }
      }),
    getDict: () =>
      Promise.resolve({
        context: {
          sysDictionaryVOS: []
        }
      })
  };
});

describe('utils 功能函数测试', () => {
  it('flat 函数测试', () => {
    expect(flat([''])).not.toBe('');
    expect(flat([[12345]])).not.toBe('');
  });

  it('translateHtmlCharater 函数测试', () => {
    expect(translateHtmlCharater('<div>123</div>')).not.toBe('');
  });

  it('hanldePurchases 函数测试', () => {
    return hanldePurchases().then((data) => {
      expect(data).toEqual(123);
    });
  });

  it('stgShowAuth 函数测试', () => {
    expect(stgShowAuth()).toBe(true);
  });

  it('mergeUnloginCartData 函数测试', async () => {
    await mergeUnloginCartData();
  });

  it('mergeUnloginCartData 函数测试2', async () => {
    sessionItemRoyal.set('orderSource', 123);
    await mergeUnloginCartData();
  });

  it('getDictionary 函数测试', async () => {
    sessionItemRoyal.set(
      'dict-city',
      '[{"name": "Chongqing"},{"name":"Chengdu"}]'
    );
    expect(await getDictionary({ type: 'city', name: '' })).toEqual([
      { name: 'Chongqing' },
      { name: 'Chengdu' }
    ]);
    expect(await getDictionary({ type: 'appointment_type', name: '' })).toEqual(
      []
    );
    expect(await getDictionary({ type: 'expert_type', name: '' })).toEqual([]);
    expect(await getDictionary({ type: '', name: '' })).toEqual([]);
  });
});
