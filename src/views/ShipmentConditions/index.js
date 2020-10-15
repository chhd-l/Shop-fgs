import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import recommendation1 from '@/assets/images/recommendation1.png';
import recommendation2 from '@/assets/images/recommendation2.png';
import recommendation3 from '@/assets/images/recommendation3.png';
import recommendation4 from '@/assets/images/recommendation4.png';
// import autoship from './images/autoship.png'
// import icon1 from './images/icon1.png'
// import icon2 from './images/icon2.png'
// import icon3 from './images/icon3.png'
// import icon4 from './images/icon4.png'
// import cat from './images/cat.png'
// import dog from './images/dog.png'
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { sitePurchase } from '@/api/cart';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';

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
  async componentDidMount() {
    this.setState({ loading: true });
    // console.log(window.location, 'location', this.props)
    getRecommendationList(this.props.match.params.id).then((res) => {
      console.log(res, 'aaa');
      let productList = res.context.recommendationGoodsInfoRels;
      productList.map((el) => {
        el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
          g = Object.assign({}, g, { selected: false });
          console.log(g.goodsInfoId, el, 'hhhh')
          if(g.goodsInfoId === el.goodsInfo.goodsInfoId) {
            g.selected = true
          }
          return g;
        });
        let specList = el.goodsSpecs;
        let specDetailList = el.goodsSpecDetails;
        specList.map((sItem) => {
          sItem.chidren = specDetailList.filter((sdItem, i) => {
            return sdItem.specId === sItem.specId;
          });
          console.log(sItem, el,'hhhh')
          
          sItem.chidren.map(child => {
            if(el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) > -1) {
              console.log(child, 'child')
              child.selected = true
            }
          })
        });
        el.goodsInfo.goods.goodsInfos = el.goodsInfos;
        el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
        el.goodsInfo.goods.goodsSpecs = specList;
      });

      this.setState({ productList }, () => {
        this.checkoutStock()
      });
      // getPrescriptionById({id: res.context.prescriberId}).then(res => {
      getPrescriptionById({ id: '2304' }).then((res) => {
        console.log(res, 'bbb');
        this.props.clinicStore.setLinkClinicId('2304');
        this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
        this.setState({ prescriberInfo: res.context, loading: false });
      });
    }).catch(err => {
      // this.props.history.push('/')
    })
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  checkoutStock() {
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
        outOfStockProducts.push(productList[i])
      }else {
        inStockProducts.push(productList[i])
      }
    }
    let outOfStockVal = ''
    outOfStockProducts.map((el, i) => {
      if(i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName
      }else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ','
      }
    })
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val:  outOfStockVal}
    )
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val:  outOfStockVal}
    )
  }
  async hanldeLoginAddToCart() {
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
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
      if(outOfStockProducts.length > 0) {
        this.setState({modalShow: true, currentModalObj: modalList[0]})
      }else {
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
    console.log(products,'products')
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
      
      let tmpData = Object.assign({}, product.goodsInfo.goods, {
        quantity: quantityNew
      });
      
      let quantityNew = product.recommendationNumber;
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
        console.log(historyItem, 'historyItem')
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
    if(needLogin) {
      sessionItemRoyal.set('okta-redirectUrl', '/prescription')
    }
    this.setState({needLogin})
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
    let totalPrice 
    inStockProducts.map(el => {
      console.log(el, 'el')
      totalPrice = el.recommendationNumber * el.goodsInfo.salePrice
    })
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if(outOfStockProducts.length > 0) {
      sessionItemRoyal.set('recommend_product', JSON.stringify(inStockProducts))
      this.setState({modalShow: true, currentModalObj: modalList[1]})
      return false
    }else {
      sessionItemRoyal.set('recommend_product', JSON.stringify(inStockProducts))
      this.props.history.push('/prescription');
    }
  }
  async hanldeClickSubmit() {
    let { currentModalObj, subDetail, outOfStockProducts, inStockProducts } = this.state;
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
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
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
          <section style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="subscriptionLanding.title1"/>
            </h2>
            <p>
              <FormattedMessage id="subscriptionLanding.content1"/>
            </p>
          </section>
          <section>
          <div
              class="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
              <div class="rc-column">
                <h2 style={{color: '#E2001A'}}>Регионы и сроки доставки*</h2>
                {/* <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}>Собака</p> */}
                <li>
                  Москва – 1-3 дня
                </li>
                <li>
                  Московская область 1-5 дней
                </li>
                <li>
                  Нижний Новгород - 1-3 дня
                </li>
                <li>
                  Нижегородская область- 1-6 дней
                </li>
                <li>
                  Санкт-Петербург - 1-3 дня
                </li>
                <li>
                  Ленинградская область – 1-7 дней
                </li>
              </div>
              <div class="rc-column">
                <h2 style={{color: '#E2001A'}}>Стоимость доставки при заказе на сумму менее 2000 рублей</h2>
                <ul>
                  <li>400 руб. для доставки по Москве и Московской области</li>
                  <li>500 руб. для доставки в Санкт-Петербург, Ленинградскую область, Нижний Новгород и Нижегородскую область</li>
                </ul>
                {/* <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}>Кошка</p> */}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
