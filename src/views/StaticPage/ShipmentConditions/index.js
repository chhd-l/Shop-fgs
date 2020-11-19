import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import image1 from './images/image1.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';
import image4 from './images/image4.jpeg';
import image5 from './images/image5.jpeg';
import image6 from './images/image6.jpeg';
import image7 from './images/image7.jpeg';

import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { sitePurchase } from '@/api/cart';
import './index.less';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import { setSeoConfig } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        id: '',
        goodsName: '',
        goodsImg:
          'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsCategory: '',
        goodsSpecDetails: [],
        goodsSpecs: []
      },
      productList: [],
      currentDetail: {},
      images: [],
      activeIndex: 0,
      prescriberInfo: {},
      loading: false,
      buttonLoading: false,
      errorMsg: '',
      modalShow: false,
      modalList: [
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_cart,
          type: 'addToCart'
        },
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_pay,
          type: 'payNow'
        }
      ],
      currentModalObj: {
        title: this.props.intl.messages.isContinue,
        content: this.props.intl.messages.outOfStockContent_cart,
        type: 'addToCart'
      },
      outOfStockProducts: [],
      inStockProducts: [],
      needLogin: false
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig()
  }
  checkoutStock() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].recommendationNumber > productList[i].goodsInfo.stock
      ) {
        outOfStockProducts.push(productList[i]);
      } else {
        inStockProducts.push(productList[i]);
      }
    }
    let outOfStockVal = '';
    outOfStockProducts.map((el, i) => {
      if (i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName;
      } else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ',';
      }
      return el;
    });
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val: outOfStockVal }
    );
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val: outOfStockVal }
    );
  }
  async hanldeLoginAddToCart() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    // console.log(outOfStockProducts, inStockProducts, '...1')
    // return

    // for (let i = 0; i < productList.length; i++) {
    //   if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
    //     outOfStockProducts.push(productList[i])
    //     this.setState({ buttonLoading: false });
    //     continue
    //   }else {
    //     inStockProducts.push(productList[i])
    //   }
    // }
    if (outOfStockProducts.length > 0) {
      this.setState({ modalShow: true, currentModalObj: modalList[0] });
    } else {
      this.setState({ buttonLoading: true });
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: ''
          });
          await this.props.checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      this.props.history.push('/cart');
    }
  }
  async hanldeUnloginAddToCart(products, path) {
    console.log(products, 'products');
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      // this.setState({ checkOutErrMsg: "" });
      // if (this.state.loading) {
      //   return false;
      // }
      // const { history } = this.props;
      // const { currentUnitPrice, quantity, instockStatus } = this.state;
      // const { goodsId, sizeList } = this.state.details;
      // const currentSelectedSize = find(sizeList, (s) => s.selected);
      // let quantityNew = quantity;

      let quantityNew = product.recommendationNumber;
      let tmpData = Object.assign({}, product.goodsInfo.goods, {
        quantity: quantityNew
      });
      let cartDataCopy = cloneDeep(
        toJS(this.props.checkoutStore.cartData).filter((el) => el)
      );

      // if (!instockStatus || !quantityNew) {
      //   return false;
      // }
      // this.setState({ addToCartLoading: true });
      let flag = true;
      if (cartDataCopy && cartDataCopy.length) {
        const historyItem = find(
          cartDataCopy,
          (c) =>
            c.goodsId === product.goodsInfo.goodsId &&
            product.goodsInfo.goodsInfoId ===
              c.sizeList.filter((s) => s.selected)[0].goodsInfoId
        );
        console.log(historyItem, 'historyItem');
        if (historyItem) {
          flag = false;
          quantityNew += historyItem.quantity;
          if (quantityNew > 30) {
            // this.setState({
            //   checkOutErrMsg: <FormattedMessage id="cart.errorMaxInfo" />,
            // });
            this.setState({ addToCartLoading: false });
            return;
          }
          tmpData = Object.assign(tmpData, { quantity: quantityNew });
        }
      }

      // 超过库存时，修改产品数量为最大值替换
      // let res = await miniPurchases({
      //   goodsInfoDTOList: [
      //     {
      //       goodsInfoId: currentSelectedSize.goodsInfoId,
      //       goodsNum: quantityNew
      //     }
      //   ]
      // });
      // let tmpObj = find(
      //   res.context.goodsList,
      //   (ele) => ele.goodsInfoId === currentSelectedSize.goodsInfoId
      // );
      // if (tmpObj) {
      //   if (quantityNew > tmpObj.stock) {
      //     quantityNew = tmpObj.stock;
      //     if (flag) {
      //       this.setState({
      //         quantity: quantityNew
      //       });
      //     }
      //     tmpData = Object.assign(tmpData, { quantity: quantityNew });
      //   }
      // }

      const idx = findIndex(
        cartDataCopy,
        (c) =>
          c.goodsId === product.goodsInfo.goodsId &&
          product.goodsInfo.goodsInfoId ===
            find(c.sizeList, (s) => s.selected).goodsInfoId
      );
      tmpData = Object.assign(tmpData, {
        currentAmount: product.goodsInfo.marketPrice * quantityNew,
        selected: true,
        quantity: quantityNew
      });
      console.log(idx, 'idx');
      if (idx > -1) {
        cartDataCopy.splice(idx, 1, tmpData);
      } else {
        if (cartDataCopy.length >= 30) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorMaxCate" />
          });
          return;
        }
        cartDataCopy.push(tmpData);
      }
      console.log(cartDataCopy, 'cartDataCopy');
      await this.props.checkoutStore.updateUnloginCart(cartDataCopy);
    }
    this.props.history.push(path);
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  async buyNow(needLogin) {
    if (needLogin) {
      sessionItemRoyal.set('okta-redirectUrl', '/prescription');
    }
    this.setState({ needLogin });
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    let totalPrice;
    inStockProducts.map((el) => {
      console.log(el, 'el');
      totalPrice = el.recommendationNumber * el.goodsInfo.salePrice;
      return el;
    });
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.props.history.push('/prescription');
    }
  }
  async hanldeClickSubmit() {
    let {
      currentModalObj,
      subDetail,
      outOfStockProducts,
      inStockProducts
    } = this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: ''
          });
          await this.props.checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      this.props.history.push('/cart');
    } else if (currentModalObj.type === 'payNow') {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: ''
      //     });
      //     await this.props.checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      this.props.history.push('/prescription');
    }
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };

    return (
      <div className="shipmentConditions">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BreadCrumbs />
          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
            style={{
              width: '50%',
              margin: '20px auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}
          >
            <div
              className="rc-layout-container rc-three-column"
              style={{ padding: '20px' }}
            >
              <div className="rc-column rc-double-width">
                <img src={image1} alt="" />
              </div>
              <div className="rc-column">
                <div className="content1">
                  <h2 className="rc-beta ">
                    Условия доставки интернет-магазина ROYAL CANIN®
                  </h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Доставка заказов осуществляется до двери курьерской
                    компанией DPD (АО «ДПД РУС»).
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className="line"></div>
          <section>
            <div
              className="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
              <div className="rc-column">
                <h2 style={{ color: '#E2001A' }}>Регионы и сроки доставки*</h2>
                <ul>
                  <li>Москва – 1-3 дня</li>
                  <li>Московская область 1-5 дней</li>
                  <li>Нижний Новгород - 1-3 дня</li>
                  <li>Нижегородская область- 1-6 дней</li>
                  <li>Санкт-Петербург - 1-3 дня</li>
                  <li>Ленинградская область – 1-7 дней</li>
                </ul>
              </div>
              <div className="rc-column">
                <h2 style={{ color: '#E2001A' }}>
                  Стоимость доставки при заказе на сумму менее 2000 рублей
                </h2>
                <ul>
                  <li>400 руб. для доставки по Москве и Московской области</li>
                  <li>
                    500 руб. для доставки в Санкт-Петербург, Ленинградскую
                    область, Нижний Новгород и Нижегородскую область
                  </li>
                </ul>
                <p>При заказе на сумму от 2000 руб. доставка бесплатна.</p>
              </div>
            </div>
          </section>
          <div className="line"></div>
          <section
            className="section2"
            style={{ textAlign: 'center', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',
                fontSize: '1.625rem'
              }}
            >
              При доставке транспортной компанией DPD Вы получаете:
            </h2>
            <div className="rc-layout-container rc-three-column">
              <div className="rc-column">
                <div>
                  <span className="rc-icon rc-location rc-brand1"></span>
                  <p>
                    Возможность отслеживать ваш заказ или отказаться от доставки
                    вашего заказа
                  </p>
                </div>
              </div>
              <div className="rc-column">
                <div>
                  <span className="rc-icon rc-calendar rc-brand1"></span>
                  <p>
                    Возможность изменить адрес, дату и временной интервал вашей
                    доставки
                  </p>
                </div>
              </div>
              <div className="rc-column">
                <div>
                  <span className="rc-icon rc-clock rc-brand1"></span>
                  <p>
                    Возможность получить заказ в удобном месте и в удобное для
                    вас время
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section style={{ textAlign: 'center', margin: '0 auto' }}>
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',
                fontSize: '1.625rem'
              }}
            >
              Как пользоваться данными функциями:
            </h2>
            <div className="rc-layout-container rc-three-column">
              <div className="rc-column">
                {/* <div>
                  <span className="rc-icon rc-location rc-brand1"></span>
                  <p>Возможность отслеживать ваш заказ или отказаться от доставки вашего заказа</p>
                </div> */}
                <p className="rc-intro">
                  <strong>1. </strong>Оформите заказ в интернет-магазине{' '}
                  <b>ROYAL CANIN®</b>.
                </p>
              </div>
              <div className="rc-column">
                <p className="rc-intro">
                  <strong>2.</strong> Получите сообщение на мобильный телефон
                  и/или e-mail уведомление с ссылкой на страницу онлайн-сервиса
                  "<b>Управление доставкой</b>".
                </p>
              </div>
              <div className="rc-column">
                <p className="rc-intro">
                  <b>3. </b>Перейдите по ссылке для управления и отслеживания
                  вашей посылки.
                </p>
              </div>
            </div>
          </section>
          <div className="line"></div>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <div style={{ marginTop: '80px' }}>
                  <h2 className="rc-beta ">
                    Изменения даты и интервала доставки
                  </h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Вы можете изменить дату доставки в пределах 5 дней (включая
                    выходные дни в некоторых городах). Изменения интервала
                    доставки предложено в виде выпадающего списка.
                  </span>
                </div>
              </div>
              <div className="rc-column">
                <img src={image2} alt="" />
              </div>
            </div>
          </section>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <div>
                  <h2 className="rc-beta ">Изменения адреса доставки</h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Вы можете изменить адрес доставки в пределах одного города.
                  </span>
                  <img style={{ marginTop: '20px' }} src={image3} alt="" />
                </div>
              </div>
              <div className="rc-column">
                <h2 className="rc-beta ">Выбор пункта самовывоза</h2>
                <span
                  style={{
                    fontSize: '18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  Или выберете доставку в один из пунктов выдачи заказов в
                  пределах города с помощью чузера. На карте отображены все
                  доступные по заказу пункты выдачи с подробным описанием
                  каждого пункта.
                </span>
                <img style={{ marginTop: '20px' }} src={image4} alt="" />
              </div>
            </div>
          </section>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <div style={{ marginTop: '120px' }}>
                  <h2 className="rc-beta ">Отслеживание заказа</h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Вы можете воспользоваться функцией отслеживания заказа, где
                    отображается полная информация по вашему заказу.
                  </span>
                </div>
              </div>
              <div className="rc-column">
                <img src={image5} alt="" />
              </div>
            </div>
          </section>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <div style={{ marginTop: '80px' }}>
                  <h2 className="rc-beta ">Отмена доставки</h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Вы можете отказаться от доставки заказа, выбрав одну из
                    причин из предложенного выпадающего списка.
                  </span>
                </div>
              </div>
              <div className="rc-column">
                <img src={image6} alt="" />
              </div>
            </div>
          </section>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <img style={{ width: '80%' }} src={image7} alt="" />
              </div>
              <div className="rc-column">
                <div style={{ marginTop: '80px' }}>
                  <h2 className="rc-beta ">Отмена доставки</h2>
                  <span
                    style={{
                      fontSize: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    Наши эксперты здесь, чтобы помочь Вам!
                  </span>
                  <br />
                  <button
                    className="rc-btn rc-btn--one"
                    style={{ marginTop: '20px' }}
                    onClick={() => {
                      this.props.history.push('/help');
                    }}
                  >
                    Связаться с нами
                  </button>
                </div>
              </div>
            </div>
          </section>
          <div className="line"></div>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '40px auto' }}
          >
            <p>
              *При размещении заказа до 16.00 на сайте, доставка осуществляется
              на следующий день в пределах Москвы При оформлении заказа после
              16.00, доставка осуществляется через день в пределах Москвы.
              Обращаем внимание, что при размещении заказа в пятницу после 16:00
              и в выходные, ближайшая дата доставки – вторник. Сроки доставки за
              пределами Москвы необходимо уточнять по телефону через сотрудника
              Контактного центра.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
