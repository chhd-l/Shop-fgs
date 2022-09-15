import React from 'react';
import List from '../List';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id, values, children }) => {
      let kkk = null;
      if (values && values?.val && values?.val?.props) {
        kkk = (
          <div
            data-testid={values?.val?.props['data-testid'] ?? ''}
            onClick={values?.val.props.onClick}
          ></div>
        );
      }
      return (
        <span>
          {id}
          {kkk}
          {children && children()}
        </span>
      );
    },
    injectIntl: (e) => e,
    intl: (e) => e,
    createIntlCache: (e) => e,
    createIntl: (e) => e,
    useIntl: () => {
      return {
        formatMessage: jest.fn()
      };
    }
  };
});

jest.mock('@/components/GoogleTagManager', () => {
  return () => <div>GoogleTagManager</div>;
});
jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});
jest.mock('@/components/Header', () => {
  return () => <div>Header</div>;
});
jest.mock('@/components/BannerTip', () => {
  return () => <div>BannerTip</div>;
});
jest.mock('@/components/SideMenu', () => {
  return () => <div>SideMenu</div>;
});
jest.mock('@/components/FrequencyMatch', () => {
  return () => <span>FrequencyMatch</span>;
});

jest.mock('@okta/okta-react', () => {
  const authState = {
    idToken: 'sdada',
    accessToken: {
      value: 'sdadad'
    },
    isAuthenticated: false
  };
  return {
    useOktaAuth: (e) => {
      return { authState, oktaAuth: jest.fn(), ...e };
    },
    withOktaAuth: (e) => e
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
          sysDictionaryVOS: [
            {
              value: 'fr',
              id: 123457909
            }
          ]
        }
      })
  };
});

jest.mock('@/api/address', () => {
  const originalModule = jest.requireActual('@/api/address');
  return {
    __esModule: true,
    ...originalModule,
    getAddressList: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            message: 'Opération réussie',
            context: [
              {
                deliveryAddressId: '800001802df8ca1f2b59f418647e255f',
                customerId: '8000017e7a86c7373c27755abbac0e18',
                consigneeName: 'ret r',
                consigneeNumber: '(+33) 4 43 43 43 43',
                provinceId: null,
                provinceIdStr: null,
                provinceCode: null,
                pickupName: null,
                pickupPrice: null,
                pickupDescription: null,
                paymentMethods: null,
                cityId: null,
                cityIdStr: null,
                city: 'ORLEANS',
                province: '',
                areaId: null,
                areaIdStr: null,
                settlementIdStr: null,
                deliveryAddress: '3 RUE R PICARD DE LA VACQUERIE',
                isDefaltAddress: 0,
                delFlag: 0,
                createTime: '2022-04-14 07:45:29.000',
                createPerson: null,
                updateTime: null,
                updatePerson: null,
                deleteTime: null,
                deletePerson: null,
                countryId: 2612,
                postCode: '45100',
                rfc: '',
                type: 'DELIVERY',
                address1: '3 RUE R PICARD DE LA VACQUERIE',
                address2: '',
                firstName: 'ret',
                lastName: 'r',
                firstNameKatakana: null,
                lastNameKatakana: null,
                canDelFlag: false,
                email: '',
                sfccCityCode: null,
                country: 'FR',
                area: '',
                street: null,
                settlement: null,
                house: null,
                housing: null,
                entrance: '',
                apartment: '',
                isValidated: null,
                storeId: 123457909,
                comment: '',
                receiveType: 'HOME_DELIVERY',
                pickupCode: null,
                deliveryDate: null,
                timeSlot: null,
                workTime: null,
                validFlag: 1,
                alert: null,
                county: null,
                contractNumber: null,
                courierCode: null,
                state: null
              },
              {
                deliveryAddressId: '8000017e7a873c8672904bbe15a87e67',
                customerId: '8000017e7a86c7373c27755abbac0e18',
                consigneeName: 'sd w',
                consigneeNumber: '(+33) 2 32 42 12 34',
                provinceId: null,
                provinceIdStr: '',
                provinceCode: null,
                pickupName: null,
                pickupPrice: null,
                pickupDescription: null,
                paymentMethods: null,
                cityId: 0,
                cityIdStr: '',
                city: 'JUVIGNY VAL D ANDAINE',
                province: '',
                areaId: 0,
                areaIdStr: null,
                settlementIdStr: null,
                deliveryAddress:
                  'Appartment 3, Carrara Tower, 1 Bollinder Place',
                isDefaltAddress: 0,
                delFlag: 0,
                createTime: '2022-01-19 03:52:50.000',
                createPerson: null,
                updateTime: '2022-04-14 07:45:03.000',
                updatePerson: '8000017e7a86c7373c27755abbac0e18',
                deleteTime: null,
                deletePerson: null,
                countryId: 2612,
                postCode: '61330',
                rfc: '',
                type: 'DELIVERY',
                address1: 'Appartment 3, Carrara Tower, 1 Bollinder Place',
                address2: '',
                firstName: 'sd',
                lastName: 'w',
                firstNameKatakana: null,
                lastNameKatakana: null,
                canDelFlag: false,
                email: '',
                sfccCityCode: null,
                country: 'FR',
                area: '',
                street: '',
                settlement: null,
                house: '',
                housing: '',
                entrance: '',
                apartment: '',
                isValidated: null,
                storeId: 123457909,
                comment: '',
                receiveType: 'HOME_DELIVERY',
                pickupCode: null,
                deliveryDate: '',
                timeSlot: '',
                workTime: '',
                validFlag: 1,
                alert: null,
                county: null,
                contractNumber: null,
                courierCode: null,
                state: null
              }
            ],
            defaultLocalDateTime: '2022-09-14 05:14:16.558'
          });
        })
    ),
    saveAddress: jest.fn(),
    getAddressBykeyWord: jest.fn(),
    getDeliveryDateAndTimeSlot: jest.fn(),
    editAddress: jest.fn(),
    checkPickUpActive: jest.fn()
  };
});

jest.mock('@/utils/request', () => {
  return {
    getRandom: () => {
      return 'dsadadasd';
    }
  };
});

const propsData = {
  visible: true,
  type: 'delivery',
  intlMessages: null,
  showDeliveryDateTimeSlot: false,
  showOperateBtn: true,
  deliveryOrPickUp: 0,
  saveAddressNumber: 0, // 保存Delivery地址次数
  updateSaveAddressNumber: jest.fn(),
  titleVisible: true,
  isValidationModal: true, // 是否显示验证弹框
  isAddOrEdit: jest.fn(),
  updateValidationStaus: jest.fn(),
  updateFormValidStatus: jest.fn(),
  calculateFreight: jest.fn(),
  updateData: jest.fn()
};

describe('List Test', () => {
  window.dataLayer = [];

  test('test fr', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'fr';
    window.__.env.REACT_APP_DEFAULT_COUNTRYID = 123457909;
    window.__.localItemRoyal.set(
      'rc-wrongAddressMsg',
      JSON.stringify('dsadadad')
    );
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <List {...propsData} />
          </Router>
        </Provider>
      );
      // debug()
    });
  });
});
