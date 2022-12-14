import BreadCrumbs from '../components/BreadCrumbs';
import { Footer, Header } from '@/components';
import React from 'react';
import Slick from '../components/Slick';
import Card from './components/Card';
import IconTab from './components/IconTab';
import './index.less';
import {
  iconList,
  slickList,
  sustainability10013,
  sustainability10014,
  sustainability10017
} from './mock';
const Sustainability = () => {
  return (
    <>
      <Header showMiniIcons={true} showUserIcon={true} key="sustainability" />
      <div className="relative rc-content--fixed-header">
        <div className=" max-w-1400 mx-auto">
          <BreadCrumbs />
          <div className=" mt-cs-32 md:px-cs-2">
            <h1 className=" text-cs-primary text-center text-30 md:text-40 leading-cs-40 px-cs-2 ">
              Наше видение устойчивого развития
            </h1>
            <p className="text-16 text-center  px-cs-24 md:px-cs-7">
              ROYAL CANIN® стремится делать жизнь домашних животных лучше, ставя
              потребности кошек и собак на первое место. Но это не всё: наш
              нутриентный подход к питанию позволяет нам учитывать воздействие
              каждой разрабатываемой нами формулы продукта на окружающую среду и
              общество, при этом обеспечивая домашних животных качественным,
              полезным и безопасным питанием. И наш путь к устойчивому развитию
              на этом не заканчивается: мы неустанно уменьшаем воздействие на
              планету и людей, делая нашу деятельность более экологически и
              социально ответственной.
            </p>
            <h1 className="text-center text-30 md:text-40 text-cs-primary mt-cs-100  px-0 md:px-cs-8 mb-cs-32">
              Принципы устойчивого развития, которыми руководствуется ROYAL
              CANIN®
            </h1>
            <IconTab />
            <h2 className="text-26 md:text-30 text-cs-primary text-center">
              Наш путь к углеродной нейтральности
            </h2>
            <div className="md:px-cs-304 text-center mt-cs-16  text-cs-gray px-cs-2">
              <p className="text-16">
                В рамках обязательства Mars, Incorporated по достижению нулевых
                выбросов парниковых газов на всех этапах
                производственно-сбытовой цепи к 2050 году бренд ROYAL CANIN®
                взял на себя обязательство получить к 2025 году сертификат об
                углеродной нейтральности, а его первая линейка продуктов должна
                быть сертифицирована как углеродно-нейтральный продукт в 2022
                году.
              </p>
              <p className="mt-cs-16 text-16">
                Бренд ROYAL CANIN® планирует использовать надежный и
                международно-признанный стандарт PAS 2060 углеродной
                нейтральности и будет придерживаться информационной открытости,
                регулярно отчитываясь о своем пути.
              </p>
              <p className="mt-cs-16">
                Для достижения углеродной нейтральности к 2025 году, мы
                предпримем следующие шаги:{' '}
              </p>
            </div>
            <Card />
            <div className="px-cs-2 md:px-cs-9">
              <p className="text-cs-gray text-16 mb-cs-16 text-center">
                Кроме того, мы планируем интегрированную трансформацию бизнеса с
                учетом климатических требований – от методов управления до
                вовлечения в процесс сотрудников, поставщиков и деловых
                партнеров.{' '}
              </p>
              <p className="text-cs-gray text-16 text-center">
                В качестве компенсации любых остаточных выбросов, которые
                невозможно полностью прекратить или уменьшить, компания ROYAL
                CANIN® планирует инвестировать в высокоуровневые углеродные
                кредиты – сертификаты, получение которых зависит от внедрения
                мер, обеспечивающих сокращение углеродного следа. Использование
                этих квот регулируется руководством Net Zero Foundations в
                рамках инициативы Science Based Target (SBTi).
              </p>
            </div>
            <div className=" px-cs-2">
              <div className=" relative w-full h-full mt-cs-64  py-8 md:px-24 px-cs-2 overflow-hidden">
                <img
                  src={sustainability10013}
                  alt=""
                  className=" absolute top-0 left-0 w-full"
                  style={{ zIndex: -1 }}
                />
                <div
                  style={{ marginTop: '23%' }}
                  className="h-cs-409 w-full md:max-w-500 md:max-h-420 px-0 md:px-8 md:py-8 py-4  md:mt-0 bg-white"
                >
                  <h2 className="text-24  md:text-30 text-cs-primary ">
                    «Мы верим, что принятие этого смелого обязательства по
                    углеродной нейтральности вдохновит на новые идеи и
                    достижение результатов, а также поможет мобилизовать силы и
                    позволит внести значимые изменения в развитие планеты».
                  </h2>
                  <p className="text-16 text-cs-gray">
                    Лоик Муто, президент Royal Canin
                  </p>
                </div>
              </div>
            </div>
            <div className=" mt-cs-36 px-cs-1 md:px-cs-288">
              <h2 className="text-center text-cs-primary md:text-30 text-24">
                Более экологичная упаковка
              </h2>
              <p className="text-16 text-center text-cs-gray mt-cs-16">
                Как основной партнер Инициативы по новой экономике пластмасс
                фонда Ellen MacArthur Foundation (EMF) и участник соглашения о
                Глобальном обязательстве по устранению источника пластиковых
                отходов и загрязнения, мы согласуем свое видение с EMF в целях
                поддержки экономики замкнутого цикла, в которой упаковка никогда
                не становится мусором. К 2025 году мы планируем сделать всю нашу
                пластиковую упаковку пригодной для вторичной переработки,
                повторного использования или компостирования. Чтобы создать
                закрытый цикл, мы также будем включать до 30% переработанного
                вторичного пластика в нашу пластиковую упаковку, в зависимости
                от темпов и масштабов развития переработки и в соответствии с
                правилами пищевой безопасности.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 px-cs-2 md:px-0">
              {iconList.map((item) => (
                <div className=" mt-cs-80 px-0 md:px-cs-6" key={item.label}>
                  <img src={item.path} alt="" />
                  <h2 className="text-30 text-cs-primary text-center mt-cs-30">
                    {item.label}
                  </h2>
                </div>
              ))}
            </div>
            <div className=" flex flex-wrap mt-cs-100 px-cs-1 md:px-0 pb-cs-2">
              <p className=" pb-cs-1 md:text-20 text-16 text-cs-gray order-none md:order-2  LineFeed text-left font-light ">
                <span className=" hidden md:inline-block">“</span>
                Одновременно с составом мы меняем наш подход к упаковке, потому
                что считаем, что в неэкологичной упаковке не может быть
                отвечающего принципам устойчивого развития продукта.
                <span className="hidden md:inline-block">”</span>
              </p>
              <img
                src={sustainability10017}
                alt=""
                className=" order-1 mr-cs-20 w-cs-41 h-cs-41 md:w-cs-85 md:h-cs-85
                "
              />
              <p className="order-3 pl-0 md:pl-cs-109 md:text-16 text-cs-gray md:mb-cs-64 LineFeedText">
                — Эммануэль Потье де ла Уссе, руководитель отдела производства
                упаковки
              </p>
            </div>
          </div>
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <div className="px-cs-1 md:px-cs-408  mb-cs-64 mt-cs-32 ">
          <h2 className="md:text-30 text-26 text-cs-primary text-center">
            Поддержка положительной роли домашних животных в обществе в рамках
            работы фонда ROYAL CANIN®{' '}
          </h2>
          <p className=" my-cs-16 text-16 text-cs-gray text-center">
            Домашние животные делают наш мир лучше. Наш фонд, созданный в 2020
            году, финансирует проекты по поддержке положительной роли домашних
            животных в здоровье и благополучии человека.
          </p>
          {/* <Button>Узнайте больше о нашем фонде (анг.)</Button> */}
        </div>
        <div className="md:px-24  px-8">
          <div className="relative h-full pt-cs-100 pb-0 md:pb-cs-100 md:px-24 px-4 overflow-hidden">
            <img
              className="absolute top-0 left-0 w-full"
              src={sustainability10014}
              style={{
                zIndex: -1
              }}
              alt=""
            />
            <div className="h-full md:h-cs-409 w-full md:max-w-500 md:max-h-300 bg-white px-8 md:py-8 py-4 md:mt-0 ml-0 md:ml-54/10">
              <p className="text-16 text-cs-gray">
                «Наша цель — сделать МИР ДЛЯ ДОМАШНИХ ЖИВОТНЫХ ЛУЧШЕ, ведь они
                улучшают наши жизни. Вот почему фонд ROYAL CANIN® поддерживает
                внешние проекты, в которых роль домашних животных занимает
                центральное место в здоровье и благосостоянии людей»
              </p>
              <p className="text-16 text-cs-gray mt-cs-24">
                — Фабрис Матье, глобальный директор по устойчивому развитию
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-30 text-cs-primary text-center mt-cs-40 mb-cs-100">
          Что руководители ROYAL CANIN® говорят об устойчивом развитии
        </h2>
        <Slick slickList={slickList} />
      </div>

      <Footer />
    </>
  );
};

export default Sustainability;
