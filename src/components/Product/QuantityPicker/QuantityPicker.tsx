import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import cn from 'classnames';

interface Props {
  initQuantity: number;
  updateQuantity: any;
  min: number;
  max: number;
  showError: any;
  className: string;
  initRestTotalLimitConf?: any;
}

let timer = null;

/**
 * 商品数量加减组件
 * @param initQuantity - 初始数量
 * @param updateQuantity - 更新数量回调
 * @param min - 限制最小数量
 * @param max - 限制最大数量
 * @param showError - 报错提示回调
 * @param className - className
 * @param initRestTotalLimitConf - 剩余数量限制，一般用于购物车总数量限制剩余值
 */
const QuantityPicker = ({
  initQuantity,
  updateQuantity,
  min = 1,
  max,
  showError,
  className,
  initRestTotalLimitConf
}: Props) => {
  const [quantity, setQuantity] = useState<number | string>(initQuantity);
  const [restTotalLimitConf, setRestTotalLimitConf] = useState(
    initRestTotalLimitConf
  );

  const [addBtnStatus, setAddBtnStatus] = useState<boolean>(true);
  const [subBtnStatus, setSubBtnStatus] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<any>('');

  useEffect(() => {
    setQuantity(initQuantity);
  }, [initQuantity]);

  const subQuantity = () => {
    setErrorMsg('');
    setQuantity(quantity === min ? min : Number(quantity) - 1);

    if (quantity === min) {
      setErrorMsg(<FormattedMessage id="cart.errorInfo" />);
    }
  };
  const addQuantity = () => {
    setErrorMsg('');
    const tmpMax = restTotalLimitConf?.num
      ? Math.min(max, restTotalLimitConf.num)
      : max;
    setQuantity(quantity === tmpMax ? tmpMax : Number(quantity) + 1);

    if (quantity === tmpMax) {
      handleMaxNumErrMsg({ tmpMax });
    }
  };
  const handleAmountChange = (e: any) => {
    setErrorMsg('');
    const eventType = e.type;
    const val =
      e.target.value === '' ? e.target.value : parseInt(e.target.value);
    // 允许清空输入框
    if (val === '' && eventType === 'change') {
      setQuantity(val);
      return;
    }
    // 若数量清空了，再离开输入框，数量默认置为1
    if (val === '' && eventType === 'blur') {
      setErrorMsg(<FormattedMessage id="cart.errorInfo" />);
      setQuantity(1);
    }

    // bug fix: 500ms自动触发blur事件
    // 数量清空后，未手动点击其他地方，若直接切换规格，导致本身blur事件未触发，
    // 由此切换规则时，调用切换规格接口时，会再次调用本方法，引起多调用一次加入购物车接口，使购物车商品重复
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   Array.from(document.querySelectorAll('.rc-quantity__input'), (item) => {
    //     item.blur();
    //   });
    // }, 500);
    const tmpMax = restTotalLimitConf?.num
      ? Math.min(max, restTotalLimitConf.num)
      : max;

    setQuantity(val > tmpMax ? tmpMax : val < min ? min : val);

    if (val > tmpMax) {
      handleMaxNumErrMsg({ tmpMax });
    }
  };

  const handleMaxNumErrMsg = ({ tmpMax }: { tmpMax: number }) => {
    if (quantity === tmpMax) {
      // 若存在剩余总数量限制时，需区分报错提示
      if (restTotalLimitConf) {
        if (max < restTotalLimitConf.num) {
          setErrorMsg(
            <FormattedMessage id="cart.errorMaxInfo" values={{ val: max }} />
          );
        } else {
          setErrorMsg(restTotalLimitConf.errorMsg);
        }
      } else {
        setErrorMsg(
          <FormattedMessage id="cart.errorMaxInfo" values={{ val: max }} />
        );
      }
    }
  };

  useEffect(() => {
    setSubBtnStatus(quantity !== min);

    if (updateQuantity && initQuantity !== quantity && quantity !== '') {
      updateQuantity(quantity);
    }
  }, [quantity]);

  useEffect(() => {
    const tmpMax = restTotalLimitConf?.num
      ? Math.min(max, restTotalLimitConf.num)
      : max;

    setAddBtnStatus(quantity !== tmpMax);
  }, [quantity, restTotalLimitConf?.num]);

  useEffect(() => {
    if (showError) showError(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    setRestTotalLimitConf((cur: any) =>
      cur ? { ...cur, ...{ num: initRestTotalLimitConf?.num } } : cur
    );
  }, [initRestTotalLimitConf?.num]);

  return (
    <div className={cn(className)}>
      <div className={cn('flex items-center')}>
        <span
          className={cn(
            'rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus',
            {
              'rc-btn-disabled': !subBtnStatus
            }
          )}
          onClick={subQuantity}
        />
        <input
          className="rc-quantity__input"
          value={quantity}
          min={min}
          max={max}
          onChange={handleAmountChange}
          onBlur={handleAmountChange}
          type="number"
        />
        <span
          className={cn(
            'rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus',
            { 'rc-btn-disabled': !addBtnStatus }
          )}
          data-quantity-error-msg="Вы не можете заказать больше 10"
          onClick={addQuantity}
        />
      </div>
    </div>
  );
};

export default QuantityPicker;
