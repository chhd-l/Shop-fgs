import React from 'react';
import './index.less';
import { Tab2010Data } from './mock';

const textSize = 'max-w-screen-md mx-auto m-7';
const Tab1990Data = [
  {
    title: '1990: Новый владелец. Новая стратегия. Неизменная философия',
    path: '',
    desc: ''
  }
];
type TextRenderProps = {
  title: string;
  desc: string;
  path: string;
};
const Render = ({ title, desc, path }: TextRenderProps) => {
  return (
    <div className=" mt-16">
      <img src={path} alt="" className="" />
      <div className={textSize}>
        <h2 className="text-30 text-rc-red text-center">{title}</h2>
        <p className="mt-4 text-center">{desc}</p>
      </div>
    </div>
  );
};
export const Tab1960 = () => {
  return (
    <Render
      title="1968: Наша увлеченность идеей влияния питания на здоровье животных
  началась с одного человека"
      path="https://cdn.royalcanin-weshare-online.io/hvr6xGYBIYfdNSoCzwmC/v1/1968-royal-canin-history?w=1440&"
      desc=" Жан Катари родился в мае 1927 года в небольшом французском городке
      Ле-Пюи-ан-Веле. Он начал свою карьеру в качестве ветеринарного врача,
      работая с лошадьми и быками. С годами он пришел к выводу, что питание
      может влиять на здоровье животных. В 1968 году он создал специальный
      корм для собак, так называемый «желтый суп». В этом же году была
      зарегистрирована торговая марка ROYAL CANIN®."
    />
  );
};

export const Tab1970 = () => {
  return (
    <div>
      <Render
        title="1972: Bienvenue a Le Groupe Guyomarc'h"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="  Компанию ROYAL CANIN® приобретает группа Guyomarc'h. Благодаря ее
      экспертному опыту мы внедряем гораздо более точный подход к разработке
      формул продуктов и удовлетворению особых потребностей животных. Группа
      Guyomarc’h предоставляет подразделениям ROYAL CANIN® значительную
      автономию. Guyomarc'h обеспечивает ROYAL CANIN® финансовую поддержку,
      выделяет ресурсы на научные исследования, оказывает помощь в разработке
      стратегий, в том числе маркетинговых. Еще одной отличительной чертой
      эпохи Guyomarc’h становится децентрализация управления компанией."
      />

      <Render
        title="1974: Выход на международный рынок"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc=" К началу 1974 года продукция ROYAL CANIN® продается в восьми странах
        Европы: Франции, Бельгии, Дании, Германии, Италии, Испании, Швеции и
        Нидерландах."
      />
    </div>
  );
};

export const Tab1980 = () => {
  return (
    <div>
      <Render
        title="1980: Выпуск AGR, глобальной инновации"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="   AGR — первый в мире полнорационный корм для щенков крупных пород,
        который получил высокую оценку заводчиков по всему миру и более 15 лет
        считался «эталонным кормом»."
      />

      <Render
        title="1982: Элемент французской культуры"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc=" Бегущая собака: легендарная реклама. Этот рекламный ролик, в котором
        была использована музыка Эннио Морриконе из фильма «Профессионал», стал
        частью французской поп-культуры."
      />

      <Render
        title="1985"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Бренд ROYAL CANIN® выходит на рынок США благодаря сотрудничеству с
        четырьмя импортерами."
      />
    </div>
  );
};

export const Tab1990 = () => {
  return (
    <div>
      <Render
        title="1990: Новый владелец. Новая стратегия. Неизменная философия"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc=" Paribas Affaires Industrielles покупает Guyomarc'h Groupe. Это приводит к серьезным изменениям стратегии, росту амбиций и глобальному развитию. Наша философия остается неизменной — сделать мир для домашних животных лучше."
      />
      <Render
        title="1994: Новаторский прорыв в питании для кошек"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Выпуск гаммы продуктов RCFI, тройная революция в питании для кошек. Новое решение — это продукция класса премиум в виде сухого корма и специализированная дистрибуция через заводчиков и ветеринарных врачей в условиях, когда остальная часть рынка кормов для кошек представлена влажными кормами, реализуемыми через супермаркеты."
      />
      <Render
        title="1997: Публикации компании ROYAL CANIN®: новая глава"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Мы опубликовали энциклопедию ROYAL CANIN® о собаках, а через год — энциклопедию о кошках. Авторы энциклопедий получили Гран-при Ветеринарной академии."
      />
      <Render
        title="1997: Питание с учетом размеров"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="После многих лет исследований и разработок был выпущена гамма продуктов RCCI SIZE. Это первая в мире программа питания, учитывающая размеры и возраст собак."
      />
    </div>
  );
};

export const Tab2000 = () => {
  return (
    <div>
      <Render
        title="2001: Объединение знаний"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Первая научная конференция в Монпелье собрала 150 ветеринарных врачей со всей Европы для обсуждения вопросов питания и обеспечения благополучия животных. Одновременно в Эмарге открылся Кампус ROYAL CANIN®. Это центр передовых технологий, объединяющий все направления деятельности в одном месте — в оснащенных по последнему слову техники зданиях, расположенных вокруг завода: в Кампусе разместились Научно-исследовательский центр ROYAL CANIN®, питомники собак и кошек, головной офис и французский филиал."
      />
      <Render
        title="2002: Новая семья — Mars"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="ROYAL CANIN SAS становится частью корпорации Mars Inc."
      />
      <Render
        title="2002: Корм для собак определенной породы"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Мы запускаем первый корм для собак определенной породы — Mini Yorkshire Terrier YPR 28 для йоркширского терьера. Он обеспечивает питание, адаптированное к конкретным физиологическим особенностям и потребностям, связанным с особенностями здоровья собак этой породы."
      />
      <Render
        title="2003: Сочетание преимуществ"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Выпуск новой эксклюзивной ветеринарной гаммы продуктов VDiet — результат сотрудничества ROYAL CANIN® Research с Уолтемским центром питания домашних животных (WCPN)."
      />
      <Render
        title="2005"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="Современная клиника по лечению ожирения. В сотрудничестве с WCPN (Центром питания домашних жвотных Waltham) мы поддерживаем работу первой европейской клиники коррекции веса в Ливерпуле, Великобритания."
      />
      <Render
        title="2009: Появление линейки влажных кормов"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="ROYAL CANIN® начинает производить влажные корма, которые поступают в продажу в зоомагазинах. Появляется линейка влажных продуктов для кошек Feline Health Nutrition."
      />
      <Render
        title="2009: Последний континент"
        path="https://cdn.royalcanin-weshare-online.io/h_r6xGYBIYfdNSoC7Qne/v1/1972-royal-canin-history?w=1440&"
        desc="С момента открытия первой фабрики в Азии наша продукция стала выпускаться на девяти предприятиях. Теперь компания ROYAL CANIN® производит и поставляет продукцию на всех континентах, кроме Антарктиды."
      />
    </div>
  );
};

export const Tab2010 = () => {
  return (
    <div>
      {Tab2010Data.map((item) => (
        <Render title={item.title} path={item.path} desc={item.desc} />
      ))}
    </div>
  );
};
