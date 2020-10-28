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
    getRecommendationList(this.props.match.params.id)
      .then((res) => {
        console.log(res, 'aaa');
        let productList = res.context.recommendationGoodsInfoRels;
        productList.map((el) => {
          el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
            g = Object.assign({}, g, { selected: false });
            console.log(g.goodsInfoId, el, 'hhhh');
            if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
              g.selected = true;
            }
            return g;
          });
          let specList = el.goodsSpecs;
          let specDetailList = el.goodsSpecDetails;
          specList.map((sItem) => {
            sItem.chidren = specDetailList.filter((sdItem, i) => {
              return sdItem.specId === sItem.specId;
            });
            console.log(sItem, el, 'hhhh');

            sItem.chidren.map((child) => {
              if (
                el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) > -1
              ) {
                console.log(child, 'child');
                child.selected = true;
              }
            });
          });
          el.goodsInfo.goods.goodsInfos = el.goodsInfos;
          el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
          el.goodsInfo.goods.goodsSpecs = specList;
        });

        this.setState({ productList }, () => {
          this.checkoutStock();
        });
        // getPrescriptionById({id: res.context.prescriberId}).then(res => {
        getPrescriptionById({ id: '2304' }).then((res) => {
          console.log(res, 'bbb');
          this.props.clinicStore.setLinkClinicId('2304');
          this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
          this.setState({ prescriberInfo: res.context, loading: false });
        });
      })
      .catch((err) => {
        // this.props.history.push('/')
      });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
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
      <div className="recommendation">
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
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              Пользовательское соглашение
            </h2>
            </section>  
            <div class="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  ">
              <p>
                Настоящее Пользовательское соглашение («Соглашение»)
                определяет&nbsp;
                <a
                  href="https://www.shop.royal-canin.ru/s/RU/ru/general-terms-conditions.html#anchor5"
                  target="_self"
                  data-link-type="external"
                  data-link-label="правила"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  правила
                </a>
                &nbsp;использования услуг (сервисов) сайта, расположенного в
                сети Интернет по адресу&nbsp;
                <a
                  href="http://www.shop.royal-canin.ru/"
                  target="_self"
                  data-link-type="external"
                  data-link-label="shop.royal-canin.ru"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  shop.royal-canin.ru
                </a>
                &nbsp;(«Сайт») и является публичной офертой в смысле ст. 437
                Гражданского кодекса Российской Федерации. Регистрация
                посетителем Сайта Учетной записи на Сайте, а также размещения
                заказа на Сайте без регистрации Учетной записи означает полное и
                безоговорочное принятие этим лицом всех условий настоящего
                Соглашения, а&nbsp;также
              </p>
              <ul>
                <li>
                  «Политики конфиденциальности», постоянно находящейся по
                  адресу:&nbsp;
                  <a
                    href="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/privacy/pp-russian.aspx
                  </a>
                  ;
                </li>
                <li>
                  «Условий пользования web-сайтов группы компаний Марс»,
                  постоянно находящихся по адресу:&nbsp;
                  <a
                    href="http://www.mars.com/global/policies/legal/ld-russian.aspx"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/legal/ld-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/legal/ld-russian.aspx
                  </a>
                  ;
                </li>
                <li>
                  «Уведомления для родителей», постоянно находящегося по
                  адресу:&nbsp;
                  <a
                    href="https://www.mars.com/global/policies/note-to-parents/np-russian"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/note-to-parents/np-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/note-to-parents/np-russian.aspx
                  </a>
                  .
                </li>
              </ul>
              <p>
                В случае несогласия с каким-либо из положений Пользовательского
                соглашения или Политики конфиденциальности посетитель Сайта
                обязан воздерживаться от использования Сайта, в том числе
                регистрации Учетной записи на Сайте, размещение заказа на Сайте
                без регистрации Учетной записи и использования предлагаемых на
                Сайте услуг (сервисов).
              </p>
              <p>
                <strong>1.ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</strong>
              </p>
              <p>
                В настоящем Соглашении применяются термины, имеющие
                нижеследующее значение.
              </p>
              <p>
                <strong>
                  <em>Сайт</em>
                </strong>
                &nbsp;– совокупность программ для электронных вычислительных
                машин и иной информации, содержащейся в информационной системе,
                доступ к которой обеспечивается через сеть "Интернет" по
                доменному имени shop.royal-canin.ru. Сайт представляет собой
                Интернет-магазин и действует с целью реализации (продажи)
                покупателям (физическим лицам) товаров, представленных на Сайте
                и находящихся в собственности ООО «РУСКАН Дистрибьюшн» (ИНН
                5007042055, ОГРН 1035001613129) до момента их реализации
                покупателям.
              </p>
              <p>
                <strong>
                  <em>Администрация Сайта</em>
                </strong>
                &nbsp;– Общество с Ограниченной Ответственностью «Рускан
                Дистрибьюшн», ИНН 5007042055, ОГРН 1035001613129, юридическое
                лицо, зарегистрированное по законодательству Российской
                Федерации по адресу: 141870, Московская область, Дмитровский
                городской округ, деревня Кузяево, 70, которое является&nbsp;
                <strong>
                  <em>Собственником Товара</em>
                </strong>
                <em>,&nbsp;</em>реализуемого на Сайте.
              </p>
              <p>
                <strong>
                  <em>Продавец –&nbsp;</em>
                </strong>
                Общество с Ограниченной Ответственностью «Темполайн Логистика»,
                ИНН 9701069871, ОГРН 1035001613129, юридическое лицо,
                зарегистрированное по законодательству Российской Федерации по
                адресу: 105066, Россия, г. Москва, ул. Ольховская, д.16,
                стр.5-5А Мансарда Комната А, осуществляющее реализацию Товара от
                своего имени, но по поручению и за счет Собственника Товара.
              </p>
              <p>
                <strong>
                  <em>Пользователь</em>
                </strong>
                &nbsp;– совершеннолетнее, полностью дееспособное физическое
                лицо, посетитель Сайта, желающее использовать услуги (сервисы)
                Сайта, в том числе, но не ограничиваясь, зарегистрировавшее в
                установленном порядке на Сайте Учетную запись, либо
                предоставившее свои персональные данные Администрации сайте в
                иной форме.
              </p>
              <p>
                <strong>
                  <em>Покупатель</em>
                </strong>
                &nbsp;– зарегистрированный Пользователь, разместивший заказ на
                Сайте на приобретение Товара, либо лицо, разместившее заказ на
                Сайте без регистрации Учетной записи.
              </p>
              <p>
                <strong>
                  <em>Товар</em>
                </strong>
                &nbsp;– продукция категории «корма для домашних животных» под
                товарным знаком ROYAL CANIN®&nbsp;из ассортимента,
                представленного к продаже на Сайте.
              </p>
              <p>
                <strong>
                  <em>Учетная запись</em>
                </strong>
                &nbsp;– запись в базе данных, содержащая, по крайней мере, ее
                наименование (логин) и пароль, обеспечивающие идентификацию
                конкретного зарегистрированного Пользователя Сайта и обеспечение
                его доступа к сервисам Сайта.
              </p>
              <p>
                <strong>
                  <em>Персональные данные Пользователя</em>
                </strong>
                &nbsp;- любая информация, относящаяся к прямо или косвенно
                определенному, или определяемому Пользователю.
              </p>
              <p>
                <strong>
                  <em>Заказ</em>
                </strong>
                &nbsp;– должным образом размещенный запрос Покупателя на
                приобретение и доставку по указанному Покупателем адресу
                Товаров, выбранных на Сайте.
              </p>
              <p>
                <strong>
                  <em>Личный кабинет&nbsp;</em>
                </strong>
                – это раздел Сайта, который позволяет зарегистрированному
                Пользователю Сайта получить доступ к профилю Пользователя,
                профилю его питомца, данным о деталях Заказа и бущущих
                поставках.
              </p>
              <p>
                <strong>
                  2.СТАТУС И ОБЪЕМ&nbsp;ПОЛЬЗОВАТЕЛЬСКОГО&nbsp;СОГЛАШЕНИЯ
                </strong>
              </p>
              <p>
                2.1. Предметом настоящего Соглашения является предоставление
                возможности Пользователю приобретать для личных, семейных,
                домашних и иных нужд, не связанных с осуществлением
                предпринимательской деятельности, Товары, представленные в
                каталоге по адресу&nbsp;
                <a
                  href="http://www.shop.royal-canin.ru/ru/cats"
                  target="_self"
                  data-link-type="external"
                  data-link-label="http://www.shop.royal-canin.ru/ru/cats"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  http://www.shop.royal-canin.ru/ru/cats
                </a>
                &nbsp;и&nbsp;
                <a
                  href="http://www.shop.royal-canin.ru/ru/dogs"
                  target="_self"
                  data-link-type="external"
                  data-link-label="http://www.shop.royal-canin.ru/ru/dogs"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  http://www.shop.royal-canin.ru/ru/dogs
                </a>
                .
              </p>
              <p>
                Данное Соглашение распространяется на все виды Товаров и услуг
                (сервисов), представленных на Сайте, пока такие предложения с
                описанием присутствуют в каталоге.
              </p>
              <p>
                2.2. Настоящее Соглашение между Пользователем и Администрацией
                Сайта содержит все необходимые и существенные условия
                предоставления доступа к размещению Заказов, а также иным
                услугам (сервисам) Сайта со стороны Администрации Сайта,
                обязанности Пользователя по использованию Сайта, ограничения,
                условия приостановления, блокирования и прекращения
                использования Сайта Пользователем, ответственность Сторон, иные
                отношения Сторон, связанные с использованием Сайта.
              </p>
              <p>
                2.3. В отдельных случаях положения настоящего Соглашения связаны
                с положениями правил и/или политик Администрации Сайта,
                составленных в виде отдельных документов, в том числе, но не
                ограничиваясь этим с:
              </p>
              <ul>
                <li>
                  «Политикой конфиденциальности», постоянно находящейся по
                  адресу:&nbsp;
                  <a
                    href="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/privacy/pp-russian.aspx
                  </a>
                  ;
                </li>
                <li>
                  «Условиями пользования web-сайтов группы компаний Марс»,
                  постоянно находящимися по адресу:&nbsp;
                  <a
                    href="http://www.mars.com/global/policies/legal/ld-russian.aspx"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/legal/ld-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/legal/ld-russian.aspx
                  </a>
                  ;
                </li>
                <li>
                  «Уведомлением для родителей», постоянно находящимся по
                  адресу:&nbsp;
                  <a
                    href="https://www.mars.com/global/policies/note-to-parents/np-russian"
                    target="_self"
                    data-link-type="external"
                    data-link-label="http://www.mars.com/global/policies/note-to-parents/np-russian.aspx"
                    style={{color: 'rgb(68, 68, 68)'}}
                  >
                    http://www.mars.com/global/policies/note-to-parents/np-russian.aspx
                  </a>
                  .
                </li>
              </ul>
              <p>
                2.4. Приведенные в тексте настоящего Соглашения гиперссылки на
                полные тексты таких правил и/или политик означают включение этих
                правил и/или политик в настоящее Соглашение в качестве его
                составных частей. Принятие Пользователем всех условий настоящего
                Соглашения означает полное и безоговорочное принятие
                Пользователем всех положений политик и правил, интегрированных
                таким образом в настоящее Соглашение.
              </p>
              <p>
                2.5. Актуальная редакция настоящего Соглашения постоянно
                находится по адресу&nbsp;
                <a
                  href="https://www.shop.royal-canin.ru/s/RU/ru/general-terms-conditions.html"
                  target="_self"
                  data-link-type="external"
                  data-link-label="http://www.shop.royal-canin.ru/ru/general-terms-conditions.html"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  http://www.shop.royal-canin.ru/ru/general-terms-conditions.html
                </a>
                &nbsp;Администрация Сайта вправе в одностороннем порядке вносить
                в настоящее Соглашение изменения и дополнения без
                предварительного уведомления Пользователя и/или получения
                одобрения с его Стороны. Администрация Сайта вправе по своему
                усмотрению уведомлять Пользователей о дополнении и/или изменении
                настоящего Соглашения способом, который Администрация Сайта
                сочтет наиболее приемлемым. Использование Сайта в каждый момент
                времени означает безусловное принятие Пользователем всех условий
                настоящего Соглашения и его составных частей. В случае
                несогласия Пользователя с текущей редакцией Пользовательского
                соглашения полностью или частично, он должен незамедлительно
                запросить Администрацию Сайта об удалении его Учетной записи и
                прекратить использование Сайта до момента удаления его Учетной
                записи.
              </p>
              <p>
                <strong>3.РЕГИСТРАЦИЯ НА САЙТЕ</strong>
              </p>
              <p>
                3.1. Функционал Сайта предоставляет Пользователем возможность
                регистрации Учетной записи на Сайте, которая позволяет
                Покупателю регулярно отслеживать истории совершенных ранее
                покупок, оформить Подписку (автоматическую регулярную доставку),
                завести свою карточку и своего питомца, получать новостную
                рассылку. При регистрации Пользователь может создать только одну
                Учетную запись, создание нескольких учетных записей на одно лицо
                запрещено. При нарушении данного правила Администрация Сайта
                вправе без предварительного уведомления заблокировать или
                удалить одну или все Учетные записи, созданные Пользователем.
              </p>
              <p>
                3.2. Для регистрации Учетной записи Пользователь во всяком
                случае должен указать о себе следующие данные: фамилия и имя,
                пол, адрес электронной почты, пароль, номер телефона, страну,
                город, адрес доставки. Пользователь гарантирует достоверность,
                точность и полноту сведений о себе, предоставленных
                Администрации Сайта при регистрации Учетной записи.
              </p>
              <p>
                3.3. Пользователь обязуется не передавать данные для входа в
                Учетную запись (логин и пароль) третьим лицам, а также
                незамедлительно уведомить Администрацию Сайта о любом случае
                несанкционированного использования его Учетной записи третьими
                лицами, а также об известных ему случаях утери данных для входа
                в Учетную запись. До момента такого уведомления ответственность
                за все действия, связанные с использованием соответствующей
                Учетной записи, несет Пользователь.
              </p>
              <p>
                3.4. Для целей размещения Заказа на Сайте регистрация Учетной
                записи не является обязательным условием.
              </p>
              <p>
                <strong>4.ПОРЯДОК СОВЕРШЕНИЯ ПОКУПКИ НА САЙТЕ</strong>
              </p>
              <p>
                4.1. Для размещения Заказа на сайте Пользователю необходимо:
              </p>
              <ul>
                <li style={{textAlign: 'justify'}}>
                  Зайти на сайт shop.royal-canin.ru;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Если уже известен необходимый товар, то ввести его
                  наименование в разделе «Поиск»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Если необходимый товар неизвестен, то: Зайти в раздел «Кошки»
                  или «Собаки» и с помощью «Фильтров» подобрать необходимый
                  товар или воспользоваться нашим «Подбором рациона»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  После нахождения нужного товара нажать на его название для
                  перехода в карточку продукта;
                </li>
                <li style={{textAlign: 'justify'}}>
                  В карточке продукта выбрать необходимый вес упаковки и
                  количество данного товара;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Выбрать одноразовую доставку или регулярную доставку
                  выбранного товара;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Нажать на кнопку «Добавить в корзину»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Если все нужные товары были добавлены в корзину, во
                  всплывающей Мини-корзине нажать «Оформить заказ» или нажать на
                  иконку «Корзина» в верхнем правом углу экрана;
                </li>
                <li style={{textAlign: 'justify'}}>
                  В корзине нажать «Оформить заказ»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Для покупки ветеринарного корма выбрать клинику, в которой вы
                  получили рекомендацию по покупке этого корма;&nbsp;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Заполнить все необходимые поля для доставки и нажать «Выбрать
                  оплату»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Подтвердить заполненную информацию и проверить, что стоит
                  галочка в поле «Платежная информация», нажать кнопку «Далее»;
                </li>
                <li style={{textAlign: 'justify'}}>
                  Нажать на кнопку «Разместить заказ».
                </li>
                <li style={{textAlign: 'justify'}}>
                  Дождаться звонка Службы поддержки о подтверждении заказа.
                </li>
              </ul>
              <p>
                4.2. Размещая Заказ на Сайте любым способом, Покупатель
                соглашается с условиями размещения Заказов и продажи Товаров, а
                также подтверждает факт своего ознакомления с информацией о
                Товаре.
              </p>
              <p>
                4.3. Товар, представленный на Сайте, имеется в наличии у
                Продавца, за исключением случаев, когда рядом с конкретным
                Товаром располагается информация об отсутствии Товара на складе.
              </p>
              <p>
                4.4. В случае заказа Покупателем Товара, не имеющего на Сайте
                отметки о временном отсутствии на складе, но фактически
                отсутствующего в распоряжении Продавца, последний вправе
                исключить указанный Товар из Заказа (аннулировать Заказ
                Покупателя полностью или в части), уведомив об этом Покупателя
                по телефону через сотрудника Контактного центра, либо направив
                соответствующее электронное сообщение по адресу электронной
                почты, указанному Покупателем при размещении Заказа.
              </p>
              <p>
                4.5. После оформления Заказа на Сайте Сотрудник Контактного
                центра связывается по телефону, указанному Покупателем при
                размещении Заказа, с Покупателем и подтверждает информацию по
                Заказу, времени и адресу доставки. После подтверждения по
                телефону Покупателем информации, указанной при размещении
                Заказа, Покупателю будет направлено электронное сообщение по
                адресу электронной почты и смс-сообщение на телефон, указанные
                Покупателем, с подтверждением оформления Заказа.
              </p>
              <p>
                4.6. Наряду с разовым Заказом Покупатель может оформить&nbsp;
                <strong>
                  Подписку (автоматическая или регулярная доставка).
                </strong>
              </p>
              <p>
                4.6.1. Подписка (автоматическая или регулярная доставка) – это
                сервис, позволяющий один раз оформить Заказ на Сайте и получать
                Заказ с тем же составом продуктов регулярно, раз в 1, 4, 8 или
                12 недель.
              </p>
              <p>
                4.6.2. В рамках Подписки каждый последующий Заказ будет
                сформирован автоматически и доставлен в согласованную дату.
                Перед очередной регулярной доставкой курьер связывается с
                Пользователем для подтверждения заказа и даты доставки.
                Стоимость доставки при использовании Подписки устанавливается в
                соответствии с п. 5.7 настоящих Правил.
              </p>
              <p>
                4.6.3. Пользователь получает на каждый Заказ скидку в 10%&nbsp;
                <strong>от текущей цены Товара на сайте</strong>&nbsp;по
                Подписке.
              </p>
              <p>
                4.6.4. Для отмены, приостановки, пропуска следующей доставки по
                Подписке либо изменения периодичности доставки необходимо
                перейти в раздел «Мои подписки» в аккаунте. Пользователь может
                управлять своими будущими заказами, списком товаров и данными
                учетной записи в рамках автоматической доставки.
              </p>
              <p>
                4.6.5. Если заказ по Подписке включает несколько позиций и
                Пользователь хочет изменить дату заказа одного из товаров,
                необходимо перейти на вкладку «Мои подписки» и указать отдельный
                товар, для которого Покупатель хочет внести изменения. Далее
                необходимо нажать на ссылку «Изменить» справа от информации о
                подписке и затем нажать кнопку «Изменить дату заказа».
              </p>
              <p>
                4.6.6. Для того, чтобы отменить одну из автоматических доставок,
                Покупателю необходимо перейти на вкладку «Мой следующий заказ» в
                разделе «Мои подписки» и нажать кнопку «Пропустить доставку»
                справа от выпадающего меню с датой предстоящего заказа, чтобы
                пропустить весь заказ.
              </p>
              <p>
                4.6.7. Покупатель может приостановить или пропустить следующую
                доставку, а также отменить подписку в рамках автоматической
                доставки за 24 часа до следующей запланированной отправки.
              </p>
              <p>
                4.6.8. Чтобы обновить список товаров по подписке, Покупатель
                должен войти в свою учетную запись, перейти на страницу товара,
                который хочет добавить в заказ, и найти кнопку «Добавить в
                следующую автоматическую доставку». С помощью этой кнопки
                Покупатель сможет добавить товар в заказ разово или оформить на
                него подписку. Эти инструкции также доступны на вкладке «Мой
                следующий заказ» в разделе «Мои подписки» в учетной записи.
              </p>
              <p>
                4.7. При оформлении Заказа Покупатель может вступить в ROYAL
                CANIN® Клуб.
              </p>
              <p>
                4.7.1. ROYAL CANIN® Клуб – это клубная программа для
                загеристрированных Пользователей Сайта, желающих приобрести
                Товар, участвующий в програме, как он определен в п.
              </p>
              <p>
                4.7.2 настоящего Соглашения, которая включает в себя следующие
                продукты и услуги:
              </p>
              <p>
                - автоматическая бесплатная доставка Товара, участвующего в
                программе, с указанной в Личном кабинете периодичностью,
                определенная алгоритмом Сайта на основании данных о питомце,
                внесенных Пользователем.&nbsp;Периодичность рассчитывается
                исходя из максимальной нормы кормления, необходимой котенку в
                указанном возрасте и в соответствии с выбранным кормом;
              </p>
              <p>
                - не более двух бесплатных осмотров для одного питомца члена
                ROYAL CANIN®&nbsp;Клуб в ветеринарных клиниках, список которых
                представлен на Сайте в разделе «Часто задаваемые вопросы», при
                условии более трех и шести доставок, включительно, по одной
                программе ROYAL CANIN®&nbsp;Клуб;
              </p>
              <p>
                - услуги персонального консультанта, который осуществляет
                следующие действия: ежедневно с 9:00 (GMT+3) до 21:00 (GMT+3)
                предоставляепт консультации членам ROYAL CANIN®&nbsp;Клуб по
                Товару, уходу за питомцем, поведению и содержанию питомца и
                иным&nbsp;вопросам по питомцу, не являющимся ветеринарной
                помощью, записывает на осмотры в ветеринарных клиниках, список
                которых представлен на Сайте в разделе «Часто задаваемые
                вопросы», а также оказывает консультации по иным вопросам,
                связанным с членством в ROYAL CANIN®&nbsp;Клуб;
              </p>
              <p>
                - подарки для питомцев членов ROYAL CANIN®&nbsp;Клуб с каждой
                доставкой, включая, но не оганичиваясь плед, мерный стаканчик,
                мяч для котят, контейнер для сухого корма, влажный корм,
                адаптированный к сухому рациону, антибактериальная подушка,
                туннель для котят, миска для котят и иные продукты.
              </p>
              <p>
                4.7.2. Товаром, участвующем в программе ROYAL CANIN®&nbsp;Клуб,
                являются следющие Товары:
              </p>
              <ul>
                <li>Mother and babycat 2 кг</li>
                <li>Kitten 2 кг</li>
                <li>Kitten Sterilized 2 кг</li>
                <li>Kitten Maine Coon 2 кг</li>
                <li>Kitten British Shorthair 2 кг</li>
                <li>Kitten Persian 2 кг</li>
              </ul>
              <p>
                4.7.3. Загеристрированный Пользователь Сайта может стать
                участником программы ROYAL CANIN®&nbsp;Клуб при выполнении
                следующих действий:
              </p>
              <ol>
                <li>
                  Пользователь Сайта выбирает на Сайте Товар, участвующий в
                  программе;
                </li>
                <li>
                  Пользователь Сайта нажимает на кнопку «Вступить в Клуб»;
                </li>
                <li>
                  Пользователь Сайта заполняет в форме на Сайте данные о своем
                  питомце, соответствующие следующим критериям:
                </li>
              </ol>
              <ul>
                <li>
                  котята породы Британская короткошорстная, стерилизованные и не
                  стерилизованные, могут вступить в ROYAL CANIN® Клуб от двух
                  месяцев до девяти с половиной месяцев;
                </li>
                <li>
                  котята породы Персидская, стерилизованные и не
                  стерилизованные, могут вступить в ROYAL CANIN® Клуб от двух
                  месяцев до девяти с половиной месяцев;
                </li>
                <li>
                  котята породы Мейн-кун, стерилизованные и не стерилизованные,
                  могут вступить в ROYAL CANIN® Клуб от двух месяцев до
                  тринадцати месяцев;
                </li>
                <li>
                  котята всех остальных пород, стерилизованные и не
                  стерилизованные, могут вступить в ROYAL CANIN® Клуб до десяти
                  месяцев.
                </li>
              </ul>
              <p>
                4.7.4. Общее количество доставок для одного питомца члена ROYAL
                CANIN®&nbsp;Клуб не может составлять менее двух доставок и
                превышать одиннадцать доставок для всех пород, кроме породы
                Мейн-Кун и восемнадцать доставок для породы Мейн-Кун.
              </p>
              <p>
                4.7.5. Подтверждение каждой следующей доставки осуществляется
                путем связи персонального консультанта с членом ROYAL
                CANIN®&nbsp;Клуб по номеру телефона, указанному в Личном
                кабинете, в Дату отправки Заказа, указанную в Личном кабинете в
                разделе «Клуб». Член ROYAL CANIN®&nbsp;Клуб может пропустить
                каждую следующую доставку до момента ее подтверждения
                персональным консультантом, а также в любое время выйти из
                программы ROYAL CANIN®&nbsp;Клуб. Член ROYAL CANIN® Клуб может
                поменять дату отправки заказа на 14 дней раньше или на 14 дней
                позже Даты отправки Заказа, автоматически сформированной по
                алгоритму программы ROYAL CANIN® Клуб. Изменение даты можно
                осуществить в личном кабинете в разделе «Клуб»,&nbsp;изменив
                дату в графике Дат отправки Заказов, нажав на ссылку «Изменить
                дату отправки». При изменении Даты отправки одного Заказа, даты
                следующих Заказов автоматически не изменяются.
              </p>
              <p>
                Член ROYAL CANIN® Клуб может изменить адрес доставки Заказа и
                контактный номер телефона для связи в Личном кабинете, нажав на
                ссылку «Детали Заказа». Член ROYAL CANIN® Клуб может изменить
                адрес доставки всех последующих Заказов и контактный номер
                телефона для связи в Личном кабинете, нажав на ссылку «Детали
                программы».
              </p>
              <p>
                4.7.6. Возможность записи на бесплатный осмотр в ветеринарных
                клиниках предоставляется члену ROYAL CANIN®&nbsp;Клуб после
                третьей и шестой доставки Товара. После третьей и шестой
                доставки Товара член ROYAL CANIN®&nbsp;Клуб получает по
                электронному адресу, указанному в Личном кабинете, купон на
                бесплатный осмотр с указанным сроком действия. Для записи член
                ROYAL CANIN®&nbsp;Клуб связывается с персональным консультантом
                по телефону 8-800-200-37-35 и осуществляет запись в выбранную
                ветеринарную клинику из раздела «Часто задаваемые вопросы» в
                срок, указанный в купоне на бесплатный осмотр. Бесплатный осмотр
                в ветеринарной клинике осуществляется в согласованное с
                персональным консультантом время записи при предъявлении купона.
              </p>
              <p>
                С 20.04.2020 до 30.06.2020 членам ROYAL CANIN® Клуб после
                третьей и шестой доставки Товара предоставляется возможность
                получения онлайн консультаций нутрициологов ROYAL CANIN® в
                приложении Petstory, доступным для скачивания в Apple Store и
                Google Play. В указанный период члены ROYAL CANIN® Клуб имеют
                право выбора между получением бесплатного осмотра в ветеринарных
                клиниках и получением онлайн консультаций в приложении Petstory.
                Период проведения онлайн консультаций в приложении Petstory
                может быть продлен Администрацией Сайта путем внесения изменений
                в одностороннем порядке в настоящее Соглашение. Для получения
                онлайн консультаций нутрициологов ROYAL CANIN® в приложении
                Petstory члены ROYAL CANIN® Клуб сообщают о своем намерении
                получить онлайн консультацию персональному консультанту и
                получает ссылку на скачивание приложения Petstory в Apple Store
                и Google Play и инструкцию по записи к нутрициологу ROYAL
                CANIN®.
              </p>
              <p>
                4.7.7. Стоимость каждого Заказа по программе ROYAL
                CANIN®&nbsp;Клуб, включающего Товар, участвующий в программе,
                продуктов и услуг, составляет 1700 рублей за каждую поставку,
                что включает в себя стоимость Товара, участвующего в программе,
                услуги персонального консультанта, подарки для питомцев,
                автоматическую бесплатную доставку и может включать бесплатные
                осмотры для питомца члена ROYAL CANIN®&nbsp;Клуб.&nbsp;Счет за
                оплату каждого Заказа Член ROYAL CANIN® Клуб может получить в
                Личном кабинете.
              </p>
              <p>
                <strong>5.ДОСТАВКА И ОПЛАТА</strong>
              </p>
              <p>
                5.1. При размещении заказа до 16.00 на сайте, доставка
                осуществляется на следующий день в пределах Москвы При
                оформлении заказа после 16.00, доставка осуществляется через
                день в пределах Москвы. Обращаем внимание, что при размещении
                заказа в пятницу после 16:00 и в выходные, ближайшая дата
                доставки – вторник. Сроки доставки за пределами Москвы
                необходимо уточнять по телефону через сотрудника Контактного
                центра. Покупатель может указать более позднюю желаемую дату
                доставки, написав ее в поле «Комментарий». Доставка
                осуществляется до двери курьерскими компаниями Pony Express (АО
                «Фрейт Линк»), Global Delivery (ООО «Глобал Деливери») и DPD (АО
                «ДПД РУС»).
              </p>
              <p>
                5.2. Обязанность Продавца передать товар Покупателю считается
                исполненной в момент вручения курьером Товара Покупателю или его
                уполномоченному получателю. Продавец исходит из того, что
                полномочия получателя Заказа следуют из обстановки.
              </p>
              <p>
                5.3. В момент получения Заказа у курьера, Покупатель или его
                уполномоченный получатель обязан осмотреть доставленный ему
                Товар и проверить его комплектность на предмет соответствия
                размещенному им Заказу, а также проверить внешний вид и срок
                годности доставленного Товара и целостность его упаковки. В
                случае отсутствия претензий к доставленному Товару Покупатель
                расписывается в «Бланке доставки заказов» либо ином аналогичном
                документе, предоставляемом курьером, и оплачивает Заказ.
                Подписывая документы о доставке Товара Покупатель подтверждает,
                что не имеет каких-либо претензий к Товару и Продавец полностью
                и надлежащим образом выполнил свою обязанность по передаче
                Товара.
              </p>
              <p>
                5.4. Цена Товара указывается на Сайте, устанавливается в рублях
                и включает в себя НДС. Цена Товара может быть изменена Продавцом
                в одностороннем порядке.
              </p>
              <p>
                5.5. Право собственности на Товар, а также риск случайной гибели
                или случайного повреждения Товара переходит к Покупателю с
                момента передачи Товара Покупателю или его уполномоченному
                получателю Заказа и проставления указанными лицами подписи в
                документах, подтверждающих доставку Заказа.
              </p>
              <p>
                5.6. Стоимость Доставки при заказе на сумму менее 2000 руб.
                составляет:
              </p>
              <ul>
                <li>400 руб. для доставки по Москве и Московской области.</li>
                <li>
                  500 руб. для доставки в Санкт-Петербург, Ленинградскую
                  область, Нижний Новгород и Нижегородскую область.
                </li>
              </ul>
              <p>При Заказе на сумму от 2000 руб. доставка бесплатна.</p>
              <p>5.7&nbsp;Частичный выкуп Товара не допускается.</p>
              <p>
                <strong>6.ВОЗВРАТ ТОВАРА И ДЕНЕЖНЫХ СРЕДСТВ</strong>
              </p>
              <p>
                6.1.Покупатель вправе отказаться от заказанного им Товара
                надлежащего качества в любое время до его получения, а после
                получения Товара — в течение 7 дней со дня его приобретения.
                Возврат Товара надлежащего качества возможен в случае, если
                сохранены его товарный вид, потребительские свойства, в том
                числе не нарушена целостность упаковки, а также документ,
                подтверждающий факт покупки указанного Товара. Отсутствие у
                покупателя указанного документа не лишает его возможности
                ссылаться на другие доказательства приобретения товара у данного
                продавца.
              </p>
              <p>
                6.2.При отказе Покупателя от Товара в порядке, предусмотренном
                п. 6.1. Продавец возвращает ему стоимость возвращенного Товара,
                за исключением расходов Продавца, связанных с доставкой
                возвращенного Покупателем Товара (стоимость доставки), в течение
                10 дней с даты поступления возвращенного Товара на склад
                Продавца вместе с заполненным Покупателем заявлением на возврат.
              </p>
              <p>
                Cтоимость доставки составляет: 500 р. – внутри МКАД, 700 р. – за
                пределами МКАД.
              </p>
              <p>
                6.3. В пределах гарантийного срока Покупатель вправе по своему
                выбору обратиться с требованием о возврате товара ненадлежащего
                качества к изготовителю или импортеру. Под товаром ненадлежащего
                качества подразумевается товар, который неисправен и не может
                обеспечить исполнение своих функциональных качеств. Полученный
                Товар должен соответствовать описанию на Сайте.
              </p>
              <p>
                6.4. В случае продажи Покупателю товара ненадлежащего качества
                (определение ЗПП) Покупатель вправе потребовать:
              </p>
              <ul>
                <li>
                  замены недоброкачественного Товара товаром надлежащего
                  качества;
                </li>
                <li>
                  соразмерного уменьшения покупной цены некачественного Товара;
                </li>
                <li>
                  безвозмездного устранения недостатков Товара (в случае, если
                  такие недостатки возможно устранить) или возмещения расходов
                  на их исправление покупателем или третьим лицом.
                </li>
              </ul>
              <p>
                либо отказаться от исполнения договора и потребовать возврата
                уплаченной за товар суммы. По требованию изготовителя или
                импортера и за его счет покупатель должен возвратить товар с
                недостатками. Возврат денежных средств в таком случае
                осуществляется посредствам Возврат стоимости осуществляется на
                расчетный счет Покупателя, указанный при оформлении возврата на
                бланке, который можно скачать по&nbsp;
                <a
                  href="https://www.royal-canin.ru/upload/doc/RC_Invoice_back_LAST.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-link-type="external"
                  data-link-label="https://www.royal-canin.ru/upload/doc/RC_Invoice_back_LAST.pdf"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  <u>ссылке</u>
                </a>
                <u style={{color: 'rgb(68, 68, 68)'}}>.</u>
              </p>
              <p>
                <strong>7.КОНФИДЕНЦИАЛЬНОСТЬ И ЗАЩИТА ИНФОРМАЦИИ</strong>
              </p>
              <p>
                7.1. Для целей исполнения настоящего Соглашения с Пользователем,
                в частности с целью предоставления Пользователю доступа к Сайту,
                обеспечения возможности использования функционала Сайта,
                размещения заказа на Сайте без регистрации Учетной записи и
                использования предлагаемых на Сайте услуг (сервисов),
                Администрация Сайта организует сбор и обработку персональных
                данных Пользователя.
              </p>
              <p>
                7.2. При регистрации Учетной записи Пользователь должен указать
                о себе следующие данные: фамилия и имя, пол, адрес электронной
                почты, пароль, номер телефона, страну, город, адрес доставки.
              </p>
              <p>
                7.3. При размещении Заказа без регистрации Учетной записи должен
                указать о себе следующие данные: фамилия и имя, адрес
                электронной почты, номер телефона, адрес доставки.
              </p>
              <p>
                7.4. Регистрация Пользователем на Сайте Учетной записи,
                размещение Заказа без регистрации Учетной записи, а также
                предоставление Пользователем своих персональных данных
                Администрации Сайта в иной форме означает:
              </p>
              <ul>
                <li>
                  согласие на сбор Администрацией Сайта его персональных данных
                  в объеме, предусмотренном настоящим Соглашением, а также на
                  дальнейшую обработку этих персональных данных Администрацией
                  Сайта, в том числе их запись, систематизацию, накопление,
                  хранение, уточнение, извлечение, использование, обеспечение
                  доступа к данным, предоставление этих данных другим Продавцам,
                  а также иным третьим лицам, определенным Администрацией Сайта
                  и задействованным в процессе исполнения размещенных на Сайте
                  Заказов, а также блокирование, удаление и уничтожение данных
                  для целей, предусмотренных настоящим Соглашением;
                </li>
                <li>
                  согласие этого лица на передачу предоставленных им
                  персональных данных определенному Администрацией Сайта
                  третьему лицу (или нескольким таким лицам) для обработки этих
                  персональных данных всеми способами для целей, указанных выше,
                  на основании поручения Администрации Сайта, согласие на
                  трансграничную передачу Персональных данных, в том числе на
                  территорию Соединенного Королевства Великобритании и Северной
                  Ирландии и Германии.
                </li>
                <li>
                  Дополнительно, совершая действия, описанные в п. 7.4.,
                  Пользователь соглашается на обработку предоставленных им
                  персональных данных в целях продвижения товаров, работ, услуг
                  Администрации Сайта на рынке путем осуществления прямых
                  контактов с Пользователем посредством электронной почты,
                  прямых почтовых сообщений либо прямых контактов с указанным
                  лицом по указанному им телефону, в том числе посредством
                  рассылки SMS-сообщений. Пользователь вправе отказаться от
                  получения рекламной и другой информации без объяснения причин
                  отказа через личный кабинет. Сервисные сообщения,
                  информирующие Пользователя о Заказе и этапах его обработки,
                  отправляются автоматически и не могут быть отклонены
                  Пользователем.
                </li>
              </ul>
              <p>
                7.5. Обработка персональных данных осуществляется с момента
                регистрации Учетной записи Пользователя, размещения Заказа без
                регистрации Учетной записи либо предоставления персональных
                данных лицом в иной форме, и до момента прекращения отношений
                между Администрацией Сайта и Пользователем. Момент прекращения
                отношений определяется в зависимости от способа предоставления
                Пользователем своих персональных данных. Так, при регистрации
                Пользователем Учетной записи отношения считаются прекращенными в
                результате удаления Учетной записи; при размещении Заказа без
                регистрации Учетной записи – в течение 60 календарных дней с
                даты исполнения Заказа Продавцом.
              </p>
              <p>
                7.6. Пользователь вправе в любой момент отозвать свое согласия
                на обработку персональных данных, уведомив об этом Администрацию
                сайта одним из следующих способов: по телефону 8-800-200-37-35
                либо посредством направления соответствующего заявления на
                электронный адрес:&nbsp;
                <a
                  href="mailto:order@royalcanin.com"
                  target="_self"
                  data-link-type="external"
                  data-link-label="mailto:order@royalcanin.com"
                >
                  order@royalcanin.com
                </a>
                . Пользователь понимает и соглашается с тем, что отзыв его
                согласия на обработку персональных данных осуществляется путем
                отзыва акцепта настоящей Публичной оферты.
              </p>
              <p>
                7.7. Администрация Сайта прикладывает все усилия для защиты
                полученных персональных данных. Сведения о реализуемых
                требованиях к защите персональных данных изложены в виде
                отдельного документа «Политика конфиденциальности», постоянно
                находящегося по адресу&nbsp;
                <a
                  href="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                  target="_self"
                  data-link-type="external"
                  data-link-label="http://www.mars.com/global/policies/privacy/pp-russian.aspx"
                  style={{color: 'rgb(68, 68, 68)'}}
                >
                  http://www.mars.com/global/policies/privacy/pp-russian.aspx
                </a>
                .
              </p>
              <p>
                7.8. Принятием настоящего Пользовательского соглашения
                Пользователь подтверждает, что для улучшения качества
                обслуживания все разговоры по телефону 8-800-200-37-35,
                записываются.
              </p>
              <p>
                <strong>8.ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ</strong>
              </p>
              <p>
                8.1. Если прямо не указано иное, Администрация Сайта владеет
                исключительными правами на все результаты интеллектуальной
                деятельности и приравненные к ним средства индивидуализации,
                размещенные на Сайте, в том числе на объекты авторских прав,
                включая (но не ограничиваясь этим) тексты, изображения,
                фотографии, видеозаписи, изображения и аудиовизуальные
                материалы. Регистрация Пользователя на Сайте не влечет ни
                полной, ни частичной передачи Пользователю исключительных прав
                на результаты интеллектуальной деятельности и средства
                индивидуализации, размещенные на Сайте Администрацией.
                Несанкционированное Администрацией использование Пользователями,
                а равно и третьими лицами принадлежащих ей результатов
                интеллектуальной деятельности, средств индивидуализации не
                допускается.
              </p>
              <p>
                <strong>9.ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ</strong>
              </p>
              <p>
                9.1. Продавец и Администрация Сайта не несут ответственности за
                ущерб, причиненный Покупателю вследствие ненадлежащего
                использования Товаров, приобретенных на Сайте.
              </p>
              <p>
                9.2. Администрация Сайта несет ответственность за содержание
                рекламной и иной информации, представленной на Сайте, в
                соответствии с действующим законодательством РФ о рекламе.
              </p>
              <p>
                <strong>10.УВЕДОМЛЕНИЯ, ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ</strong>
              </p>
              <p>
                10.1. Пользователь, считающий, что его права и интересы нарушены
                из-за неправомерных действий Продавца и/или Администрации Сайта,
                обязан направить претензию в адрес Администрации Сайта.
                Рассмотрение и направление ответа осуществляется Администрацией
                в течение 30 дней с момента поступления претензии.
              </p>
              <p>
                10.2. Все уведомления, обращения, претензии в адрес
                Администрации Сайта должны направляться по адресу электронной
                почты:&nbsp;
                <a
                  href="mailto:order@royalcanin.com"
                  target="_self"
                  data-link-type="external"
                  data-link-label="mailto:order@royalcanin.com"
                >
                  order@royalcanin.com
                </a>
                .
              </p>
              <p>
                10.3. Все споры, связанные с заключением, исполнением и
                прекращением действия настоящего Соглашения, не урегулированные
                во внесудебном порядке, подлежат рассмотрению в суде по месту
                нахождения Администрации Сайта.
              </p>
            </div>
          
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
