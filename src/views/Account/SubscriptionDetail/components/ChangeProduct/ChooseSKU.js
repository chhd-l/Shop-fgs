import React, { useEffect, useState, useContext } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import ShowErrorDom from '../ShowErrorDom';
import Selection from '@/components/Selection';
import { changeSubscriptionGoods } from '@/api/subscription';
import { formatMoney, getDeviceType } from '@/utils/utils';
import find from 'lodash/find';
import { ChangeProductContext } from './index';
import { SubDetailHeaderContext } from '../SubDetailHeader';
const ChooseSKU = ({ intl }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const quantityMinLimit = 1;
  const [changeNowLoading, setChangeNowLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [errorMsgSureChange, setErrorMsgSureChange] = useState('');
  let selected = false;
  const ChangeProductValue = useContext(ChangeProductContext);
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const {
    productListLoading,
    setState,
    isNotInactive,
    getDetail,
    subDetail,
    triggerShowChangeProduct
  } = SubDetailHeaderValue;
  const {
    details,
    matchGoods,
    stock,
    specList,
    showProdutctDetail,
    setForm,
    currentSubscriptionPrice,
    images,
    form,
    currentGoodsItems
  } = ChangeProductValue;
  if (
    specList?.length == 0 &&
    details?.subscriptionStatus &&
    details?.promotions == 'club'
  ) {
    // 兼容bundle商品
    selected = true;
  }
  specList.forEach((el) => {
    if (!selected) {
      selected = el?.chidren.find((item) => item.selected)?.goodsId;
    }
  });
  const changePets = (selected) => {
    if (!selected) {
      return;
    }
    setChangeNowLoading(true);
    doChangeSubscriptionGoods();
  };
  const handleSelectedItemChange = (data) => {
    let newForm = {};
    newForm.frequencyVal = data.value;
    newForm.frequencyName = data.name;
    newForm.frequencyId = data.id;
    setForm(newForm);
  };
  const hanldeAmountChange = (type) => {
    if (!type) return;
    let res;
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1;
      } else {
        res = quantity - 1;
      }
    } else {
      res = (quantity || 0) + 1;
      if (quantity >= process.env.REACT_APP_LIMITED_NUM) {
        res = process.env.REACT_APP_LIMITED_NUM;
      }
    }
    setQuantity(res);
  };
  const handleAmountInput = (e) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity(val);
    } else {
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
      }
      if (tmp > process.env.REACT_APP_LIMITED_NUM) {
        tmp = process.env.REACT_APP_LIMITED_NUM;
      }
      setQuantity(tmp);
    }
  };
  const doChangeSubscriptionGoods = () => {
    try {
      const { sizeList } = details;
      let currentSelectedSize = sizeList[0];
      if (details?.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      }
      let buyWay = parseInt(form.buyWay);
      let goodsInfoFlag =
        buyWay && details.promotions?.includes('club') ? 2 : buyWay;
      let subscribeId = subDetail.subscribeId;

      let addGoodsItems = {
        skuId: currentSelectedSize.goodsInfoId,
        subscribeNum: quantity,
        goodsInfoFlag: 2,
        periodTypeId: form.frequencyId
        // productFinderFlag: currentSelectedSize.productFinderFlag
      };
      let deleteGoodsItems = currentGoodsItems.map((el) => {
        return {
          subscribeId,
          skuId: el.goodsInfoVO?.goodsInfoId
        };
      });
      let isTheSamePro = deleteGoodsItems.find(
        (el) => el?.skuId == currentSelectedSize?.goodsInfoId
      );
      if (isTheSamePro?.skuId) {
        //替换的skuid一致，不能正常提交
        setErrorMsgSureChange(intl.messages['subscription.thesameProd']);
        setChangeNowLoading(false);
        return;
      }
      if (buyWay) {
        addGoodsItems.periodTypeId = form.frequencyId;
      }
      let params = {
        subscribeId,
        addGoodsItems: [addGoodsItems],
        deleteGoodsItems
      };
      changeSubscriptionGoods(params)
        .then((res) => {
          setChangeNowLoading(false);
          getDetail();
          //关闭2弹窗 todo
        })
        .catch((err) => {
          setChangeNowLoading(false);
          setErrorMsgSureChange(err && err.message);
        });
    } catch (err) {
      setErrorMsgSureChange(err && err.message);

      setChangeNowLoading(false);
    }
  };

  const handleChooseSize = (sId, sdId, isSelected) => {
    if (isSelected) {
      return;
    }
    specList
      .filter((item) => item.specId === sId)[0]
      .chidren.map((item) => {
        if (item.specDetailId === sdId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
    const goodSize = specList.map((item) =>
      item.chidren.find((good) => good.specDetailId === sdId)
    )?.[0]?.detailName;
    setSpecList(specList);
    matchGoods(); // todo
  };

  return (
    <React.Fragment>
      <ShowErrorDom errorMsg={errorMsgSureChange} />
      <div className="d-flex for-pc-bettwen">
        <div className="d-flex for-mobile-colum for-mobile-100">
          <div className="d-flex rc-margin-right--xs">
            <img
              src={details.goodsImg}
              style={{ height: '4rem' }}
              alt={details.goodsName}
            />
            <div className="rc-margin-left--xs" style={{ maxWidth: '200px' }}>
              <div>{details.goodsName}</div>
              {/* <div>{details.goodsSubtitle}</div> */}
            </div>
          </div>
          <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-margin-left--xs">
            <div className="text-left ml-1 font_size12 pad_b_5">
              <FormattedMessage id="amount" />:
            </div>
            <div className="d-flex rc-align-children--space-between">
              <div className="Quantity">
                <div className="quantity d-flex justify-content-between align-items-center">
                  <input
                    type="hidden"
                    id="invalid-quantity"
                    value="Пожалуйста, введите правильный номер."
                  />
                  <div className="rc-quantity text-right d-flex justify-content-end">
                    <span
                      className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                      onClick={() => hanldeAmountChange('minus')}
                    />
                    <input
                      className="rc-quantity__input"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      min={quantityMinLimit}
                      max={stock}
                      onChange={handleAmountInput}
                      maxLength="5"
                    />
                    <span
                      className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                      onClick={() => hanldeAmountChange('plus')}
                    />
                  </div>
                </div>
              </div>
              <strong className="rc-md-down">
                ={formatMoney(currentSubscriptionPrice * quantity)}
              </strong>
            </div>
          </div>
          <div
            className="cart-and-ipay rc-margin-right--xs rc-margin-left--xs"
            style={{ float: 'left' }}
          >
            <div className="specAndQuantity rc-margin-bottom--xs ">
              <div className="spec">
                {specList.map((sItem, i) => (
                  <div id="choose-select" key={i} style={{ width: '300px' }}>
                    <div
                      className="rc-margin-bottom--xs"
                      style={{ textAlign: 'left' }}
                    >
                      {sItem.specName}:
                    </div>
                    <div data-attr="size">
                      <div
                        className="rc-swatch __select-size"
                        id="id-single-select-size"
                      >
                        {sItem.chidren.map((sdItem, i) => (
                          <div
                            key={i}
                            className={`rc-swatch__item ${
                              sdItem.selected ? 'selected' : ''
                            } ${
                              sdItem.isEmpty || !sdItem.isClub
                                ? 'outOfStock'
                                : ''
                            }`}
                            onClick={() => {
                              if (sdItem.isEmpty || !sdItem.isClub) {
                                return false;
                              } else {
                                handleChooseSize(
                                  sItem.specId,
                                  sdItem.specDetailId,
                                  sdItem.selected
                                );
                              }
                            }}
                          >
                            <span
                              style={{
                                backgroundColor:
                                  sdItem.isEmpty || !sdItem.isClub
                                    ? '#ccc'
                                    : '#fff',
                                cursor: sdItem.isEmpty
                                  ? 'not-allowed'
                                  : 'pointer'
                              }}
                            >
                              {/* {parseFloat(sdItem.detailName)}{' '} */}
                              {sdItem.detailName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="frequency rc-margin-right--xs rc-margin-left--xs">
            <div style={{ marginBottom: '4px' }}>
              <FormattedMessage id="subscription.frequency" />:
            </div>
            <div className={!isMobile && 'subscriptionDetail-choose-frequency'}>
              {details.promotions && (
                <FrequencySelection
                  frequencyType={details.promotions}
                  currentFrequencyId={form.frequencyId}
                  handleConfirm={handleSelectedItemChange}
                />
              )}
            </div>
          </p>
        </div>
        <strong className="rc-md-up" style={{ marginTop: '20px' }}>
          ={formatMoney(currentSubscriptionPrice * quantity)}
        </strong>
      </div>
      <div className="d-flex  for-mobile-colum for-pc-bettwen rc-button-link-group">
        <span
          className={`text-plain rc-styled-link ${
            productListLoading ? 'ui-btn-loading' : ''
          }`}
          onClick={() => {
            setState({
              triggerShowChangeProduct: Object.assign(
                {},
                triggerShowChangeProduct,
                {
                  show: true,
                  firstShow: !triggerShowChangeProduct.firstShow,
                  goodsInfo: [...subDetail.goodsInfo],
                  isShowModal: true
                }
              )
            });
          }}
        >
          <FormattedMessage id="subscription.seeOtherRecommendation" />
        </span>
        <div className="for-mobile-colum d-flex">
          <button
            onClick={() => showProdutctDetail(0)}
            className="rc-btn rc-btn--two rc-btn--sm"
          >
            <FormattedMessage id="subscription.productDetails" />
          </button>
          {isNotInactive && (
            <button
              onClick={() => changePets(selected)}
              className={`rc-btn rc-btn--one rc-btn--sm ${
                selected ? '' : 'rc-btn-solid-disabled'
              }
                ${changeNowLoading ? 'ui-btn-loading' : ''}`}
            >
              <FormattedMessage id="subscription.changeNow" />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(ChooseSKU);
