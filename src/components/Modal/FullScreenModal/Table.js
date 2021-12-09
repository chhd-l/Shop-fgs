import React, { useContext } from 'react';
import { formatMoney } from '@/utils/utils';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Table(props) {
  const value = useContext(FullScreenModalContext);
  const { loginStore, checkoutStore } = useLocalStore(() => stores);
  const { isLogin } = loginStore;
  const {
    subscriptionDiscountPrice,
    deliveryPrice,
    tradePrice,
    promotionVOList,
    installMentParam
  } = checkoutStore;
  const { productList, calTotalNum } = value;

  let addtionalFee = installMentParam?.addtionalFee; //分期费

  return (
    <div className="rc-table">
      <div className="rc-scroll--x">
        <table
          className="rc-table__table"
          data-js-table="checkout_billing_productTable"
          data-rc-feature-tables-setup="true"
        >
          <thead className="rc-table__thead">
            <tr className="rc-table__row">
              <th className="rc-table__th rc-espilon">Ürün Kodu</th>
              <th className="rc-table__th rc-espilon">Mal Hizmet</th>
              <th className="rc-table__th rc-espilon">Birim fiyat(TL)</th>
              <th className="rc-table__th rc-espilon">Miktar</th>
              <th className="rc-table__th rc-espilon">Toplam Fiyat (TL)</th>
            </tr>
          </thead>
          <tbody className="rc-table__tbody">
            {productList.map((el, i) => {
              return (
                <tr className="rc-table__row" key={i}>
                  <td className="rc-table__td">
                    {isLogin
                      ? el.goodsInfoNo
                      : el.sizeList.filter((el) => el.selected)[0][
                          'goodsInfoNo'
                        ]}
                  </td>
                  <td className="rc-table__td">{el.goodsName}</td>
                  <td className="rc-table__td">
                    {isLogin
                      ? formatMoney(el.salePrice)
                      : formatMoney(
                          el.sizeList.filter((el) => el.selected)[0][
                            'marketPrice'
                          ]
                        )}
                  </td>
                  <td className="rc-table__td">
                    {isLogin ? el.buyCount + '.00' : el.quantity + '.00'}
                  </td>
                  <td className="rc-table__td">
                    {isLogin
                      ? formatMoney(el.salePrice * el.buyCount)
                      : formatMoney(
                          el.sizeList.filter((el) => el.selected)[0][
                            'marketPrice'
                          ] * el.quantity
                        )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            <tr className="rc-table__row">
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td">Toplam Miktar</td>
              <td className="rc-table__td">{calTotalNum()}</td>
            </tr>
            {promotionVOList.map((el) => {
              return (
                <tr className="rc-table__row">
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td">{el.marketingName}</td>
                  <td className="rc-table__td">
                    -{formatMoney(el.discountPrice)}
                  </td>
                </tr>
              );
            })}
            <tr className="rc-table__row">
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td">KDV Matrahi</td>
              <td className="rc-table__td">
                {subscriptionDiscountPrice > 0
                  ? '-' + subscriptionDiscountPrice + ' TL'
                  : '0 TL'}
              </td>
            </tr>
            <tr className="rc-table__row">
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td">Kargo bedeli</td>
              <td className="rc-table__td">{deliveryPrice} TL</td>
            </tr>
            {addtionalFee && (
              <tr className="rc-table__row">
                <td className="rc-table__td"></td>
                <td className="rc-table__td"></td>
                <td className="rc-table__td"></td>
                <td className="rc-table__td">Taksit ilave bedeli</td>
                <td className="rc-table__td">{addtionalFee} TL</td>
              </tr>
            )}
            <tr className="rc-table__row">
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td"></td>
              <td className="rc-table__td">
                Ödenecek Tutar (KDV ve kargo ücreti dahil)
              </td>
              <td className="rc-table__td">{tradePrice} TL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
