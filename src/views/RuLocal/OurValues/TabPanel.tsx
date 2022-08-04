import React from 'react';
import { TextRenderProps } from '../OurHistory/TabPanel';
import {
  value10001,
  value10002,
  value10005,
  value10006p,
  value10007
} from './mock';

const Render = ({ title, path, desc }: TextRenderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-cs-2  px-0 md:px-cs-2">
      <div className="  px-0 md:px-cs-54">
        <h2 className="text-30 text-cs-primary font-light">{title}</h2>
        <p className="text-16 text-cs-gray mt-cs-18 text-justify">{desc}</p>
      </div>
      <img src={path} alt="" className="w-full max-h-screen md:max-w-md" />
    </div>
  );
};

//Знания
export const ElementKnowledge = () => {
  return (
    <Render
      title="В поисках знаний"
      path={value10001}
      desc="Благодаря обширным знаниям о потребностях кошек и собак мы создаем
  питание с учетом особых потребностей животных. Мы никогда не
  прекращаем совершенствоваться и все проверяем на собственном опыте.
  Вот почему мы сотрудничаем с ведущими учеными, ветеринарными врачами и
  специалистами по поведению и поддерживаем постоянный диалог с
  владельцами кошек и собак по всему миру."
    />
  );
};

////Увлеченность
export const ElmentenThusiasm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-cs-30">
      <div className="flex w-full justify-end pr-cs-30 order-last md:order-first col-span-1">
        <img
          src={value10007}
          alt=""
          className=" w-full h-full md:w-cs-167 md:h-cs-180 "
        />
      </div>
      <div className="text-center md:text-left col-span-3">
        <h2 className="text-cs-primary text-30 text-center md:text-left">
          Здоровье питомцев — наша главная забота
        </h2>
        <p className="text-16 text-cs-gray text-center md:text-left mt-cs-16 mb-cs-36">
          Мы вкладываем в свою профессию сердце и душу и прилагаем все усилия,
          чтобы сделать мир для домашних животных и их владельцев лучше.
        </p>
      </div>
    </div>
  );
};

//Потребности питомцев
export const ElmentenPetNeeds = () => {
  return (
    <Render
      title="Благополучие кошек и собак — прежде всего"
      path={value10002}
      desc="Мы всегда ставим потребности домашних животных на первое место. Это задает четкое направление нашим исследованиям, и на этом основана пищевая ценность всех наших продуктов, которые обеспечивают кошкам и собакам более долгую и здоровую жизнь."
    />
  );
};

//Точность
export const ElmentenAccuracy = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-cs-30">
      <div className="flex w-full justify-end order-last md:order-first col-span-1">
        <img
          src={value10006p}
          alt=""
          className=" w-full h-full md:w-cs-300 md:h-cs-180 "
        />
      </div>
      <div className="text-center md:text-left col-span-2">
        <h2 className="text-cs-primary text-30 text-center md:text-left">
          Точность во всем
        </h2>
        <p className="text-16 text-cs-gray text-center md:text-left mt-cs-16 mb-cs-36">
          Благодаря глубоким знаниям и значительному опыту мы понимаем особые
          потребности животных и знаем, какие питательные вещества им требуются
          для сохранения великолепной формы. Такая индивидуализация обеспечивает
          высокое качество и видимый результат от каждой характеристики наших
          продуктов — от формы, текстуры, вкусовых качеств и усвояемости до
          безопасности и отслеживаемости.
        </p>
      </div>
    </div>
  );
};

//Уважение
export const ElmentenRespect = () => {
  return (
    <Render
      title="Уважение к потребностям кошек и собак"
      path={value10005}
      desc="Мы уважаем в кошках и собаках их природное совершенство. Это уважение рождается из глубокого понимания их природных особенностей и функциональных потребностей. На этом уважении основывается каждое решение по нашим продуктам и сервисам, и именно оно определяет способ ведения нашего бизнеса."
    />
  );
};
