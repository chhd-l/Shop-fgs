import BreadCrumbs from '@/components/BreadCrumbs';
import { Button } from '@/components/Common';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import Slick from '../components/Slick';
import Card from './components/Card';
import './index.less';
import {
  iconList,
  sustainability10013,
  sustainability10014,
  sustainability10017
} from './mock';
const Sustainability = () => {
  return (
    <>
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header">
        <div className="p-cs-2 max-w-1400 mx-auto">
          <BreadCrumbs />
          <div className="p-cs-1 mt-28">
            <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
              Наше видение устойчивого развития
            </h1>
            <p className="text-16 text-center px-0 md:px-cs-7">
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
            <h1 className="text-center text-40 text-cs-primary mt-cs-100  px-0 md:px-cs-7">
              Принципы устойчивого развития, которыми руководствуется ROYAL
              CANIN®
            </h1>
            <h2 className="text-30  text-cs-primary text-center mt-cs-100">
              Наш путь к углеродной нейтральности
            </h2>
            <div className=" px-0 md:px-cs-272 text-center mt-cs-16 text-16 text-cs-gray">
              <p>
                В рамках обязательства Mars, Incorporated по достижению нулевых
                выбросов парниковых газов на всех этапах
                производственно-сбытовой цепи к 2050 году бренд ROYAL CANIN®
                взял на себя обязательство получить к 2025 году сертификат об
                углеродной нейтральности, а его первая линейка продуктов должна
                быть сертифицирована как углеродно-нейтральный продукт в 2022
                году.
              </p>
              <p className="mt-cs-16">
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
            <div className="px-0 md:px-cs-8">
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
            <div className=" relative w-full h-full mt-cs-64  py-8 md:px-24 px-4 overflow-hidden">
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
                <h2 className="  text-30 text-cs-primary   ">
                  «Мы верим, что принятие этого смелого обязательства по
                  углеродной нейтральности вдохновит на новые идеи и достижение
                  результатов, а также поможет мобилизовать силы и позволит
                  внести значимые изменения в развитие планеты».
                </h2>
                <p className="text-16 text-cs-gray">
                  Лоик Муто, президент Royal Canin
                </p>
              </div>
            </div>
            <div className=" mt-cs-36 px-0 md:px-cs-288">
              <h2 className="text-center text-cs-primary text-30">
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
            <div className="grid grid-cols-1 md:grid-cols-3">
              {iconList.map((item) => (
                <div className=" mt-cs-80 px-0 md:px-cs-6" key={item.label}>
                  <img src={item.path} alt="" />
                  <h2 className="text-30 text-cs-primary text-center mt-cs-30">
                    {item.label}
                  </h2>
                </div>
              ))}
            </div>
            <div className=" flex flex-wrap mt-cs-100">
              <p
                className="text-20 text-cs-gray order-none md:order-2  btn text-left"
                // style={{ width: 'calc(100% - 130px)', textIndent: '-0.75rem' }}
              >
                “ Одновременно с составом мы меняем наш подход к упаковке,
                потому что считаем, что в неэкологичной упаковке не может быть
                отвечающего принципам устойчивого развития продукта. ”
              </p>
              <img
                src={sustainability10017}
                alt=""
                style={{ width: 85, height: 85 }}
                className=" order-1 mr-cs-20"
              />
              <p className="order-3 pl-0 md:pl-cs-109 text-16 text-cs-gray ">
                — Эммануэль Потье де ла Уссе, руководитель отдела производства
                упаковки
              </p>
            </div>
          </div>
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <div className="px-0 md:px-cs-408 text-center mb-cs-64">
          <h2 className="text-30 text-cs-primary text-center">
            Поддержка положительной роли домашних животных в обществе в рамках
            работы фонда ROYAL CANIN®{' '}
          </h2>
          <p className=" my-cs-16 text-16 text-cs-gray text-center">
            Домашние животные делают наш мир лучше. Наш фонд, созданный в 2020
            году, финансирует проекты по поддержке положительной роли домашних
            животных в здоровье и благополучии человека.
          </p>
          <Button>Узнайте больше о нашем фонде (анг.)</Button>
        </div>
        <div className="md:px-24 py-12 px-8">
          <div className="relative h-full py-cs-100 md:px-24 px-4 overflow-hidden">
            <img
              className="absolute top-0 left-0 w-full"
              src={sustainability10014}
              style={{
                zIndex: -1
              }}
              alt=""
            />
            <div className="h-cs-409 w-full md:max-w-500 md:max-h-300 bg-white px-8 md:py-8 py-4 md:mt-0 ml-0 md:ml-54/10">
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
        <Slick />
      </div>

      <Footer />
    </>
  );
};

export default Sustainability;
