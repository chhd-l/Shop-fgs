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
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import cat from './images/cat.jpg'
import dog from './images/dog.jpg'

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
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {  
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
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
          <section style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem' }}>
              Наши обязательства в области качества и пищевой безопасности
            </h2>
            <p style={{fontSize: '1.2rem'}}>
              ROYAL CANIN® существует 50 лет, и все эти годы качество и безопасность нашей продукции во всем мире были для нас безусловным приоритетом. Внимание к мельчайшим деталям позволяет нам делать специализированное здоровое питание для собак и кошек максимально эффективным.
            </p>
          </section>

          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Качество и пищевая безопасность
                </h2>
                <p>
                  Высочайшие стандарты производства позволяют ROYAL CANIN обеспечивать качество и безопасность продукции в любой стране мира. Наши специалисты по закупкам во всех странах мира используют одни и те же процессы выбора и закупок сырья. Это гарантирует, что все наши продукты в равной степени соответствуют высоким стандартам в области питания. Многие наши поставщики являются долгосрочными партнерами. Регулярный углубленный аудит всех поставщиков обеспечивает точное соответствие качества сырья, которое мы используем на наших предприятиях по всему миру, нашим спецификациям.
                </p>
              </div>
            </div>
            <div class="rc-column">
              <img src={image1} style={{ width: '100%' }} />
            </div>
          </div>
          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div class="rc-column">
              <img src={image2} style={{ width: '100%', marginTop: '50px' }} />
            </div>
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Стабильное качество
                </h2>
                <p>
                  Все 1800 операторов наших производственных линий в разных уголках мира следуют одним и тем же технологическим инструкциям, обеспечивая повсюду единый уровень качества. На каждой стадии производства регулярно проводятся процедуры контроля. Последний из этих тестов оценивает качество уже готовой продукции перед ее выходом с завода. Каждый год мы тестируем полмиллиона образцов! Все наши дистрибьюторы соблюдают высокие стандарты безопасности и качества логистики. Чтобы удостовериться в этом, мы регулярно проводим проверки на их складах и в транспортных парках. Благодаря такой системе контроля мы поддерживаем оптимальное качество, безопасность и пищевую ценность продукции.
                </p>
              </div>
            </div>
          </div>
          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Качественное сырье
                </h2>
                <p>
                  При выборе ингредиентов мы обращаем особое внимание на содержание в них ценных питательных веществ и пользу, которую они могут принести здоровью животных. В связи с этим мы используем только мясо и рыбу, пригодные для употребления в пищу человеком. Мы прилагаем все усилия к тому, чтобы закупать сырье у аккредитованных поставщиков в хозяйствах, расположенных поблизости от наших заводов. Это способствует развитию местной экономики, обеспечивает свежесть сырья и снижает количество вредных выбросов в атмосферу.
                </p>
              </div>
            </div>
            <div class="rc-column">
              <img src={image3} style={{ width: '100%' }} />
            </div>
          </div>
          <section style={{ textAlign: 'center', width: '90%', margin: '80px auto' }}>
            <h2 style={{ fontSize: '2.5rem' }}>
              Строгий отбор поставщиков
            </h2>
            <p>
              При поиске поставщиков мы руководствуемся очень строгими критериями отбора и сотрудничаем лишь с теми, кто способен поддерживать наши высокие стандарты качества и безопасности. Мы проводим тщательные проверки на предприятиях поставщиков, оценивая пищевую ценность сырья, технологии производства, системы гарантий качества, отслеживаемости и экологичности. Такие проверки выполняются на протяжении всего периода нашего сотрудничества с поставщиком, обеспечивая поддержание стандартов качества. 
            </p>
          </section>
          <section style={{ textAlign: 'center', width: '90%', margin: '80px auto' }}>
            <h2 style={{ fontSize: '2.5rem' }}>
              Полная отслеживаемость ингредиентов
            </h2>
            <p>
              Каждая партия сырья от наших поставщиков имеет уникальный номер. Это дает гарантированную возможность отследить происхождение сырья на этапе производства. В ходе изготовления продукции она проходит десять различных процедур контроля, что обеспечивает соответствие ее качества спецификациям. Это касается в том числе и отслеживаемости сырья по каждому ингредиенту.
            </p>
          </section>
          <section style={{ textAlign: 'left', width: '100%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem', paddingLeft: '200px' }}>
              Выберите нужный продукт. Какое у вас животное?
            </h2>
            <div
              class="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
              <div class="rc-column" style={{ border: '1px solid #ccc' , cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/dogs')
                }}>
                <img src={dog} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}>Собака</p>
              </div>
              <div class="rc-column" style={{ border: '1px solid #ccc', marginLeft: '20px', cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/cats')
                }}>
                <img src={cat} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}>Кошка</p>
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
