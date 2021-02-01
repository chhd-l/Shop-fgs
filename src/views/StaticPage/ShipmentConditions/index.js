import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { setSeoConfig } from '@/utils/utils';
import './index.less';
import { Helmet } from 'react-helmet';

import image1 from './images/image1.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';
import image4 from './images/image4.jpeg';
import image5 from './images/image5.jpeg';
import image6 from './images/image6.jpeg';
import image7 from './images/image7.jpeg';
import LazyLoad from 'react-lazyload';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({seoConfig: res})
    });
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
        <Helmet>
        <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <section
            style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}
          >
            <div
              className="rc-layout-container rc-three-column"
              style={{ padding: '20px' }}
            >
              <div className="rc-column rc-double-width">
                <LazyLoad>
                <img src={image1} alt="" />
                </LazyLoad>
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
                <LazyLoad>
                <img src={image2} alt="" />
                </LazyLoad>
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
                  <LazyLoad>
                  <img style={{ marginTop: '20px' }} src={image3} alt="" />
                  </LazyLoad>
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
                <LazyLoad>
                <img style={{ marginTop: '20px' }} src={image4} alt="" />
                </LazyLoad>
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
                <LazyLoad>
                <img src={image5} alt="" />
                </LazyLoad>
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
                <LazyLoad>
                <img src={image6} alt="" />
                </LazyLoad>
              </div>
            </div>
          </section>
          <section
            style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}
          >
            <div className="rc-layout-container" style={{ padding: '20px' }}>
              <div className="rc-column">
                <LazyLoad>
                <img style={{ width: '80%' }} src={image7} alt="" />
                </LazyLoad>
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
