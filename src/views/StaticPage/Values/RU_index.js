import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';

import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig();
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
        theme: 'Brand'
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
          <BannerTip />
          <BreadCrumbs />
          <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',
                fontSize: '2.5rem'
              }}
            >
              Здоровье животных – наша главная забота
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              Здоровье и благополучие собак и кошек – наша важнейшая цель.
            </p>
          </section>

          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Питание в соответствии с потребностями
                </h2>
                <p>
                  Собаки и кошки – необыкновенные животные, и мы проявляем
                  искреннее уважение к их особенностям. В основе этого уважения
                  – глубокие знания о собаках, кошках и их подлинных
                  потребностях. Этим обусловлены все наши решения о создании
                  новых продуктов и услуг, каждый шаг в нашей работе.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Благополучие животных – прежде всего
                </h2>
                <p>
                  Здоровье и благополучие собак и кошек – наш приоритет всегда и
                  во всем. Этому принципу подчинены все наши бизнес-решения. Мы
                  убеждены, что важный аспект удовлетворения потребностей
                  животных – это правильно подобранное питание.
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src={image1} style={{ width: '100%' }} alt="" />
            </div>
          </div>
          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div className="rc-column">
              <img
                src={image2}
                style={{ width: '100%', marginTop: '50px' }}
                alt=""
              />
            </div>
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Специализированное питание – основа основ
                </h2>
                <p>
                  Благодаря нашим знаниям и опыту, мы имеем очень точное
                  представление о потребностях собак и кошек, о том, в каких
                  питательных веществах они нуждаются, чтобы поддерживать
                  красоту и отличную физическую форму. Такая точность
                  предъявляет очень высокие требования ко всем параметрам наших
                  продуктов: от формы, текстуры, вкусовой привлекательности и
                  усвояемости до безопасности и отслеживаемости сырья по каждому
                  ингредиенту.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Животные – наше главное увлечение
                </h2>
                <p>
                  Мы вкладываем все свои силы, всю душу в то, что мы делаем.
                  Наше главное стремление – создать лучший мир для животных и их
                  владельцев, где бы они не находились.
                </p>
              </div>
            </div>
          </div>
          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Мы никогда не прекращаем учиться
                </h2>
                <p>
                  Чем глубже наши знания о животных, тем больше мы можем сделать
                  для того, чтобы удовлетворить их подлинные потребности с
                  помощью инноваций. Мы никогда не прекращаем учиться и ничего
                  не принимаем на веру без критической оценки. Вот почему мы
                  постоянно сотрудничаем с учеными, ветеринарными специалистами,
                  заводчиками-профессионалами – и, конечно же, с владельцами
                  собак и кошек.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Здоровье – наша главная забота
                </h2>
                <p>
                  Все, что мы делаем, подчинено движению к главной цели –
                  здоровью и благополучию собак и кошек.
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src={image3} style={{ width: '100%' }} alt="" />
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '80px auto' }}
          >
            <h2 style={{ fontSize: '2.5rem' }}>Устойчивое развитие</h2>
            <p>
              Наш подход к экологически устойчивому развитию – проявление
              заслуженного уважения к животным, людям и нашей планете.
            </p>
            <h2 style={{ fontSize: '2.5rem' }}>Наука, здоровье и питание</h2>
            <p>
              Вся наша деятельность основана на постоянном совершенствовании
              научных знаний о здоровье и питании животных.
            </p>
          </section>
          <section
            style={{
              textAlign: 'center',
              width: '450px',
              margin: '80px auto',
              border: '1px solid #d7d7d7',
              padding: '30px'
            }}
          >
            <h2 style={{ color: '#E2001A', fontSize: '1.875rem' }}>
              Здоровье и инновации
            </h2>
            <p>
              Вся наша деятельность основана на глубоком понимании ключевых
              вопросов науки и диетологии и постоянном его совершенствовании.
            </p>
          </section>
          {/* <section style={{ textAlign: 'left', width: '100%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem', paddingLeft: '200px' }}>
              Выберите нужный продукт. Какое у вас животное?
            </h2>
            <div
              className="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
              <div className="rc-column" style={{ border: '1px solid #ccc' , cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/dogs')
                }}>
                <img src={dog} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', fontWeight: '400'}}>Узнайте больше и подберите подходящее питание для вашего питомца</p>
              </div>
              <div className="rc-column" style={{ border: '1px solid #ccc', marginLeft: '20px', cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/cats')
                }}>
                <img src={cat} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', fontWeight: '400'}}>Подберите подходящее здоровое питание для Вашей кошки!</p>
              </div>
            </div>
          </section> */}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Help;
