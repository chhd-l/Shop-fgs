import { Canonical } from '@/components/Common';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.css';
const ClubLandingPage1 = (props: any) => {
  const [idx, setIdx] = useState(0);
  const [startTouchx, setStartTouchx] = useState(0);
  const [versionB, setVersionB] = useState(false);
  const meritList = [
    {
      img: 'https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shipping copy 3.svg',
      title: <FormattedMessage id="clublandingpage1.Introduce1.title" />,
      titleTwo: <FormattedMessage id="clublandingpage1.Introduce1.titleTwo" />,
      content: <FormattedMessage id="clublandingpage1.Introduce1.content" />,
      contentStrong: (
        <FormattedMessage id="clublandingpage1.Introduce1.contentStrong" />
      )
    },
    {
      img: 'https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Discount.svg',
      title: <FormattedMessage id="clublandingpage1.Introduce2.title" />,
      titleTwo: <FormattedMessage id="clublandingpage1.Introduce2.titleTwo" />,
      contentStrong: (
        <FormattedMessage id="clublandingpage1.Introduce2.contentStrong" />
      ),
      content: (
        <FormattedMessage
          id="clublandingpage1.Introduce2.content"
          values={{
            val: (
              <strong>
                {
                  <FormattedMessage id="clublandingpage1.Introduce2.content.strong1" />
                }
              </strong>
            ),
            val2: (
              <strong>
                {
                  <FormattedMessage id="clublandingpage1.Introduce2.content.strong2" />
                }
              </strong>
            )
          }}
        />
      )
    },
    {
      img: 'https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shipping copy 2.svg',
      title: <FormattedMessage id="clublandingpage1.Introduce3.title" />,
      titleTwo: <FormattedMessage id="clublandingpage1.Introduce3.titleTwo" />,
      content: <FormattedMessage id="clublandingpage1.Introduce3.content" />
    },
    {
      img: 'https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Bitmap Copy.svg',
      title: <FormattedMessage id="clublandingpage1.Introduce4.title" />,
      titleTwo: <FormattedMessage id="clublandingpage1.Introduce4.titleTwo" />,
      content: (
        <FormattedMessage
          id="clublandingpage1.Introduce4.content"
          values={{
            val: (
              <strong>
                <FormattedMessage id="clublandingpage1.Introduce4.content.strong" />
              </strong>
            )
          }}
        />
      ),
      render: {
        text: <FormattedMessage id="clublandingpage1.Introduce4.render" />,
        src: 'https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498'
      }
    }
  ];
  const touchStart = () => {
    let startx = (window?.event as any)?.touches[0].clientX;
    setStartTouchx(startx);
  };
  const touchEnd = () => {
    let endx = (window.event as any)?.changedTouches[0].clientX;
    if (endx - startTouchx < 0) {
      if (idx !== meritList.length - 1) {
        setIdx(idx + 1);
      }
    } else {
      if (idx !== 0) {
        setIdx(idx - 1);
      }
    }
  };
  const switchClubLandingPageVersionB = () => {
    setVersionB(true);
  };
  (window as any).switchClubLandingPageVersionB = switchClubLandingPageVersionB;
  return (
    <>
      <Canonical />
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
        <div
          style={{ fontFamily: 'DIN Pro' }}
          className="w-full md:h-cs-740 h-cs-500 relative "
        >
          <img
            className="hidden md:block"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/BG-LPClub-Bloc0@2x.png"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/BG2@2x.png"
            alt=""
          />
          <div className="md:bg-white md:w-1/4 w-4/5 h-4/6 md:absolute md:rounded-3xl md:top-24 md:left-80 m-auto md:m-0 flex flex-col items-center md:py-16">
            <img
              className="hidden md:block"
              src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/bannerLOGO.svg"
              alt=""
            />
            <p className="my-5 text-26 md:text-30 text-red-600 font-normal">
              <FormattedMessage id="clublandingpage1.bannerTitle" />
            </p>
            <p className="text-18 md:text-20 text-gray-600 w-80 mb-4 md:mb-8 text-center md:text-left">
              {/* Recevez votre colis tous les mois, et */}
              <FormattedMessage
                id="clublandingpage1.bannerContent"
                values={{
                  val: (
                    <strong>
                      {' '}
                      {
                        <FormattedMessage id="clublandingpage1.bannerContent.strong" />
                      }{' '}
                    </strong>
                  )
                }}
              />
              {/* <strong>choisissez vous-même</strong> la datede votre commande ! */}
            </p>
            <p className="text-16 text-gray-700 flex mb-10">
              <img
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/161.svg"
                alt=""
              />
              <span className="ml-1">
                <strong>
                  <FormattedMessage id="clublandingpage1.bannerCheckout" />
                </strong>
              </span>
            </p>
            <p className="hidden md:block">
              <a
                className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                target="_blank"
              >
                <FormattedMessage id="clublandingpage1.bannerBtn" />
              </a>
            </p>
          </div>
        </div>
        <div className="w-full h-80 relative md:pt-24 pt-16 mt-20 md:mt-0">
          <img
            className="absolute md:left-20 md:w-cs-714 w-80 md:top-2 left-4 -top-16"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Cart-pa@2x.png"
            alt=""
          />
          <img
            className="absolute md:right-5 md:w-cs-714 w-80 md:top-20 right-4 top-60"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Dog-pa@2x.png"
            alt=""
          />
          <div className="md:w-3/4 w-4/5 h-56 pt-9 bg-gray-100 m-auto flex items-center flex-col rounded-3xl">
            <p className="md:text-7xl text-5xl text-red-600">
              <FormattedMessage id="clublandingpage1.SignUp.number" />
            </p>
            <p className="text-22 text-black md:-mt-2 mb-6 font-normal text-center w-44 md:w-full">
              <FormattedMessage id="clublandingpage1.SignUp.content" />
            </p>
            <p className="hidden md:block">
              <a
                className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                target="_blank"
              >
                <FormattedMessage id="clublandingpage1.SignUp.btn" />
              </a>
            </p>
          </div>
        </div>

        {versionB ? (
          <>
            <div
              style={{ boxShadow: '0px 0px 20px #eee' }}
              className="md:shadow-none md:border-0 mt-20 md:mt-8 pt-8 md:pt-16 relative md:w-cs-77/100 w-4/5 m-auto rounded-3xl h-cs-369 md:h-cs-500 md:rounded-none overflow-x-hidden"
            >
              <div
                style={{ left: `-${idx * 300}px`, transition: '.5s' }}
                className={`
          flex md:justify-between text-center relative 
          `}
                onTouchStart={() => {
                  touchStart();
                }}
                onTouchEnd={() => {
                  touchEnd();
                }}
              >
                {meritList.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        i === idx ? 'flex' : ''
                      } md:flex flex-col items-center flex-shrink-0 md:w-64 w-5/6 mx-7 md:mx-0`}
                    >
                      <img className="m-auto md:m-0" src={item.img} alt="" />
                      <p className="mt-6 text-20 mb-2 font-normal">
                        {item.title}
                      </p>
                      <p className="leading-cs-24 text-16 text-black">
                        {item.titleTwo}
                      </p>
                      <p className="leading-cs-24 text-16">
                        <strong>{item.contentStrong}</strong>
                        {item.content}
                      </p>
                      {item.render ? (
                        <p>
                          <a
                            className="m-auto mt-3 w-48 h-9 flex justify-center items-center text-red-700 rounded-full border-2 border-red-700 text-16"
                            href={item.render.src}
                            target="_blank"
                          >
                            {item.render.text}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <p className="absolute bottom-12 left-2/4 -ml-28 hidden md:block">
                <a
                  className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                  href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                  target="_blank"
                >
                  <FormattedMessage id="clublandingpage1.Merit.btn" />
                </a>
              </p>
            </div>
            <ul className="flex md:hidden justify-center m-auto mt-10 mb-11">
              {meritList.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={`${
                      idx === i ? 'bg-red-600' : 'bg-gray-200'
                    } w-2 h-2 rounded-full mr-2`}
                    onClick={() => setIdx(i)}
                  ></li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="mt-8 pt-16 relative md:w-cs-77/100 w-full md:m-auto md:h-cs-500">
            <div
              className={`
                md:flex md:justify-between md:text-center relative w-5/6 md:w-full m-auto md:m-0 pb-16  md:pb-0
              `}
            >
              {meritList.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`flex md:flex-col md:items-center md:w-64 mx-0`}
                  >
                    <img
                      className="w-20 h-20 md:w-auto md:h-auto relative md:sticky top-16 md:top-0 mr-6 md:mr-0"
                      src={item.img}
                      alt=""
                    />
                    <div className="">
                      <p className="md:mt-6 mt-14 md:text-20 text-18 mb-2 font-normal">
                        {item.title}
                      </p>
                      <p className="md:leading-cs-24 text-16 text-black">
                        {item.titleTwo}
                      </p>
                      <p className="md:leading-cs-24 text-16">
                        <strong>{item.contentStrong}</strong>
                        {item.content}
                      </p>
                      {item.render ? (
                        <p>
                          <a
                            className="md:m-auto mt-3 w-44 h-8 md:w-48 md:h-9 flex justify-center items-center text-red-700 rounded-full border-2 border-red-700 md:text-16 text-14"
                            href={item.render.src}
                            target="_blank"
                          >
                            {item.render.text}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="absolute bottom-12 left-2/4 -ml-28 hidden md:block">
              <a
                className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                target="_blank"
              >
                <FormattedMessage id="clublandingpage1.Merit.btn" />
              </a>
            </p>
          </div>
        )}
        <div className="w-full md:h-cs-850 h-cs-780 pt-12 relative bg-gray-100 flex flex-col items-center">
          <p className="text-26 md:text-30 md:text-black mb-11 text-center md:font-normal">
            <FormattedMessage id="clublandingpage1.Club.title" />
          </p>
          <div className="w-full md:w-cs-680 flex justify-around h-cs-556 items-center">
            <img
              className="absolute md:top-96 md:mt-64 md:left-96 md:ml-80 top-96 mt-72 left-20 ml-2"
              src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shadow.png"
              alt=""
            />
            <img
              className="absolute top-56 mt-96 left-80 ml-lxl-720  hidden md:block"
              src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shadow.png"
              alt=""
            />
            <div className="w-80 rounded-3xl bg-white h-full z-10 flex flex-col items-center pt-7">
              <img
                className="w-40 mb-6"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/bannerLOGO.svg"
                alt=""
              />
              <ul>
                <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong className="text-black">
                      <FormattedMessage id="clublandingpage1.Club.title1" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.content1" />
                  </p>
                </li>
                <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong className="text-black">
                      <FormattedMessage id="clublandingpage1.Club.title2" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.content2" />
                  </p>
                </li>
                <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong className="text-black">
                      <FormattedMessage id="clublandingpage1.Club.title3" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.content3" />
                  </p>
                </li>
                <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong className="text-black">
                      <FormattedMessage id="clublandingpage1.Club.title4" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.content4" />
                  </p>
                </li>
                <li className="h-cs-80 flex justify-center items-center text-center flex-col">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong className="text-black">
                      <FormattedMessage id="clublandingpage1.Club.title5" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.content5" />
                  </p>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex w-72 rounded-3xl bg-white h-cs-489 z-10 relative flex-col items-center pt-7">
              <img
                className="w-36 mb-6"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Main Logo.svg"
                alt=""
              />
              <span className="text-14 absolute left-28 top-20 mt-2 text-gray-500">
                Hors Club
              </span>
              <ul>
                <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong>
                      <FormattedMessage id="clublandingpage1.Club.Title1" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.Content1" />
                  </p>
                </li>
                <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong>
                      <FormattedMessage id="clublandingpage1.Club.Title2" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.Content2" />
                  </p>
                </li>
                <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong>
                      <FormattedMessage id="clublandingpage1.Club.Title3" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.Content3" />
                  </p>
                </li>
                <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong>
                      <FormattedMessage id="clublandingpage1.Club.Title4" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.Content4" />
                  </p>
                </li>
                <li className="h-cs-74 flex justify-center items-center text-center flex-col">
                  <p className="flex">
                    <img
                      src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                      alt=""
                      className="mr-2"
                    />
                    <strong>
                      <FormattedMessage id="clublandingpage1.Club.Title5" />
                    </strong>
                  </p>
                  <p>
                    <FormattedMessage id="clublandingpage1.Club.Content5" />
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <p className="absolute bottom-12 left-2/4 -ml-28  hidden md:block">
            <a
              className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
              href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
              target="_blank"
            >
              <FormattedMessage id="clublandingpage1.Club.btn" />
            </a>
          </p>
          <img
            className="absolute left-10 bottom-12 w-lxl-814 z-20 hidden md:block"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/dogzhan.png"
            alt=""
          />
          <img
            className="absolute w-lxl-636 right-28 bottom-7  hidden md:block"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/cartzhan.png"
            alt=""
          />
        </div>
        <div className=" w-full md:h-cs-556 h-cs-740 md:pt-28 md:bg-gray-100 relative flex justify-center items-center">
          <div className="md:w-cs-1160 w-full md:h-cs-340 h-cs-740 bg-white md:rounded-3xl pt-11 relative z-10">
            <div className="md:w-cs-560 w-72 m-auto text-center text-red-600 md:mt-0 text-26 md:text-30 font-normal mb-7 md:mb-11">
              <FormattedMessage id="clublandingpage1.Recipe.title" />
            </div>
            <div className="md:w-cs-560 w-full m-auto md:flex md:justify-around text-20 md:text-black">
              <div className="w-64 flex flex-col items-center m-auto">
                <p className="mb-5 text-18 text-center h-11">
                  <FormattedMessage id="clublandingpage1.Recipe.contentLeft" />
                </p>
                <p className="">
                  <a
                    className="w-52 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                    href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                    target="_blank"
                  >
                    <FormattedMessage id="clublandingpage1.Recipe.contentLeftBtn" />
                  </a>
                </p>
              </div>
              <div className="w-60 flex flex-col items-center md:sticky md:bottom-0 m-auto relative -bottom-80">
                <p className=" text-18 text-center h-11">
                  <FormattedMessage id="clublandingpage1.Recipe.contentRight" />
                </p>
                <p className="">
                  <a
                    className="w-52 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
                    href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                    target="_blank"
                  >
                    <FormattedMessage id="clublandingpage1.Recipe.contentRightBtn" />
                  </a>
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute md:w-cs-284 md:left-96  md:ml-4  md:top-28 z-20 md:mt-0 top-80 mt-16 left-8 w-44"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/bao@2x.png"
            alt=""
          />
          <img
            className="absolute  md:w-cs-284  md:right-96  md:mr-4  md:top-32 z-20 md:mt-0 top-80 mt-16 right-8 w-44"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/bao2@2x.png"
            alt=""
          />
          <img
            className="absolute w-cs-999 h-32 md:top-96 md:mt-8 md:left-96 md:ml-16 top-96 mt-cs-272"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shadow.png"
            alt=""
          />
        </div>
        <div className="md:pt-9 pt-28 w-full md:h-cs-780 h-lxl-940 bg-gray-100">
          <p className="text-center m-auto text-26 md:mb-12 mb-8">
            <FormattedMessage id="clublandingpage1.Issue.title" />
          </p>
          <ul className="md:w-lxl-814 w-80 m-auto mb-14 font-black">
            <li className="md:h-20 h-24 border-b-2 border-gray-200 flex justify-between items-center">
              <p className="text-18 md:text-20 w-cs-250 md:w-full">
                <FormattedMessage id="clublandingpage1.Issue.content1" />
              </p>
              <img
                className="w-4 md:w-6 md:h-3 h-2"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/xiala.svg"
                alt=""
              />
            </li>
            <li className="md:h-20 h-24 border-b-2 border-gray-200 flex justify-between items-center">
              <p className="text-18 md:text-20 w-cs-244 md:w-full">
                <FormattedMessage id="clublandingpage1.Issue.content2" />
              </p>
              <img
                className="w-4 md:w-6 md:h-3 h-2"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/xiala.svg"
                alt=""
              />
            </li>
            <li className="md:h-20 h-24 border-b-2 border-gray-200 flex justify-between items-center">
              <p className="text-18 md:text-20 w-cs-244 md:w-full">
                <FormattedMessage id="clublandingpage1.Issue.content3" />
              </p>
              <img
                className="w-4 md:w-6 md:h-3 h-2"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/xiala.svg"
                alt=""
              />
            </li>
            <li className="md:h-20 h-24 border-b-2 border-gray-200 flex justify-between items-center">
              <p className="text-18 md:text-20 w-cs-244 md:w-full">
                <FormattedMessage id="clublandingpage1.Issue.content4" />
              </p>
              <img
                className="w-4 md:w-6 md:h-3 h-2"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/xiala.svg"
                alt=""
              />
            </li>
            <li className="md:h-20 h-24 border-b-2 border-gray-200 flex justify-between items-center">
              <p className="text-18 md:text-20 w-cs-244 md:w-full">
                <FormattedMessage id="clublandingpage1.Issue.content5" />
              </p>
              <img
                className="w-4 md:w-6 md:h-3 h-2"
                src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/xiala.svg"
                alt=""
              />
            </li>
          </ul>
          <div
            style={{ boxShadow: '0px 0px 20px #eee' }}
            className="md:w-cs-439 w-80 md:h-cs-157 h-44 pt-6 md:px-10 text-center flex flex-col items-center bg-white m-auto rounded-3xl"
          >
            <p className="md:text-20 mb-1 md:mb-0 text-18 md:w-full w-44 text-black">
              <FormattedMessage id="clublandingpage1.Contact.title" />
            </p>
            <p className="md:text-16 mb-1 md:mb-0 text-14 md:w-full w-64">
              <FormattedMessage id="clublandingpage1.Contact.content" />
            </p>
            <p className="text-26 text-red-600 font-normal">
              <FormattedMessage id="clublandingpage1.Contact.number" />
            </p>
          </div>
        </div>
        {versionB ? (
          <div className="md:h-52 pt-14 hidden md:block">
            <p className="w-cs-470 text-black text-18 text-center m-auto mb-6 font-normal">
              <FormattedMessage id="clublandingpage1.Contact.activate" />
            </p>
            <p className="">
              <a
                className="w-52 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full m-auto"
                href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                target="_blank"
              >
                <FormattedMessage id="clublandingpage1.Contact.activateBtn" />
              </a>
            </p>
          </div>
        ) : null}
        <Footer />
      </main>
    </>
  );
};
export default ClubLandingPage1;
