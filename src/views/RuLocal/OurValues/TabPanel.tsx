import React from 'react';
import { TextRenderProps } from '../OurHistory/TabPanel';
import { value10001 } from './mock';

const Render = ({ title, path, desc }: TextRenderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h2 className="text-30 text-cs-primary font-light">{title}</h2>
        <p className="text-16 text-cs-gray">{desc}</p>
      </div>
      <img src={path} alt="" className="w-full h-full md:max-w-md" />
    </div>
  );
};

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

export const ElmentenThusiasm = () => {
  return <div></div>;
};

export const ElmentenPetNeeds = () => {
  return (
    <Render
      title="Благополучие кошек и собак — прежде всего"
      path={value10001}
      desc="Мы всегда ставим потребности домашних животных на первое место. Это задает четкое направление нашим исследованиям, и на этом основана пищевая ценность всех наших продуктов, которые обеспечивают кошкам и собакам более долгую и здоровую жизнь."
    />
  );
};

export const ElmentenAccuracy = () => {
  return <div></div>;
};

export const ElmentenRespect = () => {
  return (
    <Render
      title="Уважение к потребностям кошек и собак"
      path={value10001}
      desc="Мы уважаем в кошках и собаках их природное совершенство. Это уважение рождается из глубокого понимания их природных особенностей и функциональных потребностей. На этом уважении основывается каждое решение по нашим продуктам и сервисам, и именно оно определяет способ ведения нашего бизнеса."
    />
  );
};
