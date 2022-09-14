import React from 'react';
import './index.css';
export default function index() {
  return (
    <>
      <div
        style={{ fontFamily: 'DIN Pro' }}
        className="w-full h-cs-740 relative "
      >
        <img
          src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/BG-LPClub-Bloc0@2x.png"
          alt=""
        />
        <div className="bg-white w-1/4 h-4/6 absolute rounded-3xl top-24 left-80 flex flex-col items-center py-16">
          <img
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/bannerLOGO.svg"
            alt=""
          />
          <p className="my-5 text-30 text-red-600 font-normal">
            Simplifiez-vous la vie !
          </p>
          <p className="text-20 text-gray-600 w-80 mb-8">
            Recevez votre colis tous les mois, et{' '}
            <strong>choisissez vous-même</strong> la datede votre commande !
          </p>
          <p className="text-16 text-gray-700 flex mb-10">
            <img
              src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/161.svg"
              alt=""
            />
            <span className="ml-1">
              <strong>Gratuit et sans engagement !</strong>
            </span>
          </p>
          <p>
            <a
              className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
              href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
              target="_blank"
            >
              S’inscrire gratuitement
            </a>
          </p>
        </div>
      </div>
      <div className="w-full h-80 relative pt-24">
        <img
          className="absolute left-20 w-cs-714 top-2"
          src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Cart-pa@2x.png"
          alt=""
        />
        <img
          className="absolute right-5 w-cs-714 top-20"
          src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Dog-pa@2x.png"
          alt=""
        />
        <div className="w-3/4 h-56 pt-9 bg-gray-100 m-auto flex items-center flex-col">
          <p className="text-7xl text-red-600">10 000</p>
          <p className="text-22 text-black -mt-2 mb-6 font-normal">
            animaux comblés chaque mois
          </p>
          <p>
            <a
              className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
              href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
              target="_blank"
            >
              S’inscrire gratuitement
            </a>
          </p>
        </div>
      </div>
      <div className="w-cs-77/100 h-cs-500 pt-16 flex m-auto justify-between text-center relative">
        <div className="flex flex-col items-center w-60">
          <img
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shipping copy 3.svg"
            alt=""
          />
          <p className="mt-6 text-20 mb-2 font-normal">
            Créez votre abonnement
          </p>
          <p className="leading-cs-24 text-16 text-black">
            Trouvez la formule Royal
          </p>
          <p className="leading-cs-24 text-16">
            <strong>Canin adaptée</strong> et définissez la fréquence de
            livraison qui vous correspond
          </p>
        </div>
        <div className="flex flex-col items-center w-60">
          <img
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Discount.svg"
            alt=""
          />
          <p className="mt-6 text-20 mb-2  font-normal">
            Économisez du temps et de l'argent
          </p>
          <p>
            Profitez de <strong>10% de réduction</strong> sur votre commande et
            des <strong>frais de ports offerts</strong>.
          </p>
        </div>
        <div className="flex flex-col items-center w-60">
          <img
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shipping copy 2.svg"
            alt=""
          />
          <p className="mt-6 text-20 mb-2  font-normal">Facile à gérer</p>
          <p className="font-normal">Livré où vous voulez à votre rythme.</p>
          <p className="font-normal">
            Annulez votre abonnement à tout moment gratuitement
          </p>
        </div>
        <div className="flex flex-col items-center w-60">
          <img
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/Bitmap Copy.svg"
            alt=""
          />
          <p className="mt-6 text-20 mb-2  font-normal">
            Nombreuses récompenses pour votre animal.
          </p>
          <p>
            Recevez chez vous,{' '}
            <strong>un accessoire offert toute les 3 livraisons.</strong> Faite
            le bonheur de votre animal !
          </p>
          <p>
            <a
              className="mt-3 w-48 h-9 flex justify-center items-center text-red-700 rounded-full border-2 border-red-700 text-16"
              href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
              target="_blank"
            >
              Révéler les cadeaux
            </a>
          </p>
        </div>
        <p className="absolute bottom-12 left-2/4 -ml-28">
          <a
            className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
            href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
            target="_blank"
          >
            S’inscrire gratuitement
          </a>
        </p>
      </div>
      <div className="w-full h-cs-850 pt-12 relative bg-gray-100 flex flex-col items-center">
        <p className="text-30 text-black mb-11 font-normal">
          Profitez des nombreuses fonctionalités du Club
        </p>
        <div className="w-cs-680 flex justify-around h-cs-556 items-center">
          <img
            className="absolute top-96 mt-64 left-96 ml-80"
            src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/shadow.png"
            alt=""
          />
          <img
            className="absolute top-56 mt-96 left-80 ml-lxl-720"
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
                  <strong>Remise sur les produits</strong>
                </p>
                <p>-10 % pour chaque commande</p>
              </li>
              <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong>Cadeaux</strong>
                </p>
                <p>Toutes les 3 commandes</p>
              </li>
              <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong>Livraison offerte</strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-80 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong>Livraison automatique</strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-80 flex justify-center items-center text-center flex-col">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong>
                    Recommandation
                    <br /> de produits
                  </strong>
                </p>
                <p></p>
              </li>
            </ul>
          </div>
          <div className="w-72 rounded-3xl bg-white h-cs-489 z-10 relative flex flex-col items-center pt-7">
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
                  <strong>Recommandation de produits</strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong></strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong></strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-74 flex justify-center items-center text-center flex-col myli">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong></strong>
                </p>
                <p></p>
              </li>
              <li className="h-cs-74 flex justify-center items-center text-center flex-col">
                <p className="flex">
                  <img
                    src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/32 Copy 2.svg"
                    alt=""
                    className="mr-2"
                  />
                  <strong></strong>
                </p>
                <p></p>
              </li>
            </ul>
          </div>
        </div>
        <p className="absolute bottom-12 left-2/4 -ml-28">
          <a
            className="w-60 h-10 flex justify-center items-center bg-cs-primary text-cs-gray-f6 rounded-full"
            href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
            target="_blank"
          >
            S’inscrire gratuitement
          </a>
        </p>
        <img
          className="absolute left-10 bottom-12 w-lxl-814 z-20"
          src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/dogzhan.png"
          alt=""
        />
        <img
          className="absolute w-lxl-636 right-28 bottom-7"
          src="https://fgs-cdn.azureedge.net/cdn/img/ProductFinder3/cartzhan.png"
          alt=""
        />
      </div>
      <div className="w-full h-cs-556 pt-32 bg-gray-100 relative"></div>
    </>
  );
}
