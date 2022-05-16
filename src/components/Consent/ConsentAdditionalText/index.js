import React from 'react';
import './index.less';

const ConsentAdditionalText = ({ textPosition }) => {
  // console.log(textPosition, 'textPosition');
  const topText = {
    us: (
      <p className="consent-txt">
        We’d like to continue to keep you and your pet up to date with all the
        exciting promotions and new product developments from Royal Canin and
        &nbsp;
        <a href="https://www.mars.com/made-by-mars" target="_blank">
          Mars Petcare and its affiliates
        </a>
        , which we think would interest you. From time to time, we may also use
        your data for research to enhance our product and service offerings to
        our consumers. If you are over the age of 16 years old, please confirm
        your choice by clicking the boxes below.
      </p>
    ),
    fr: (
      <div className="consent-txt">
        <p>
          Je souhaite recevoir par mail des conseils personnalisés et des offres
          sur la nutrition, la santé, le bien-être et l’éducation de mon animal
          de la part de &nbsp;
          <a
            href="https://fra.mars.com/mars-et-ses-marques/petcare"
            target="_blank"
          >
            Mars Petcare et ses filiales
          </a>
          .
        </p>
        <p>
          Je suis âgé(e) de plus de 16 ans et je souhaite recevoir ces
          informations de la part de :{' '}
        </p>
      </div>
    ),
    de: (
      <div className="consent-txt">
        <p>
          Wir möchten Sie und Ihr Haustier auch weiterhin über spannende neue
          Produktentwicklungen, Werbeaktionen oder Umfragen innerhalb von Mars
          Petcare und seinen Tochtergesellschaften &nbsp;
          <a href="https://deu.mars.com/hergestellt-von-mars" target="_blank">
            'Made by Mars'
          </a>{' '}
          &nbsp; auf dem Laufenden halten, von denen wir glauben, dass sie für
          Sie interessant sind, Ihr Einverständnis vorausgesetzt.
        </p>
        <p>
          Ja, ich bin über 16 Jahre alt und möchte folgende Informationen
          erhalten:
        </p>
      </div>
    ),
    se: (
      <div className="consent-txt">
        <p>
          Ja tack, jag vill gärna få nyheter, tävlingar, skräddarsydda kostråd
          och erbjudanden på produkter via e-post, SMS och telefon. Jag är över
          16 år och jag kan när som helst återkalla mitt samtycke.
        </p>
      </div>
    ),
    mx: (
      <div className="consent-txt">
        <p>
          Nos gustaría mantenerte al tanto a ti y a tu mascota de promociones y
          contenido de valor de &nbsp;
          <a
            href="https://mex.mars.com/es-MX/hecho-por-mars/petcare"
            target="_blank"
          >
            Mars Petcare y sus afiliados
          </a>{' '}
          .
        </p>
        <p>Tengo 16 años o más.</p>
      </div>
    ),
    jp: (
      <div className="consent-txt">
        <p>
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            マースペットケア及びその関連会社
          </a>
          における、お客様の個人情報の取得・お取扱い方法、
          個人情報に関するお問い合わせ、その他個人情報に関するお客様の権利の行使につきま
          しては、{' '}
          <a href="https://www.mars.com/privacy-policy-japan" target="_blank">
            「マースのプライバシーに関する声明」
          </a>{' '}
          でご確認いただけます。&nbsp;
        </p>
        <p>&nbsp;</p>
        <p>
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            マースペットケア及びその関連会社
          </a>
          からお客様に対し、 お得なプロモーションや新製品に関する情報についてお
          客様と（大切なペット）に最新情報をお届けいたします。
        </p>
        <p>
          私は18歳以上で、下記の会社からメール、SMS等による情報配信を希望します。
        </p>
      </div>
    ),
    tr: (
      <div className="consent-txt">
        <p>
          <a href="https://www.royalcanin.com/tr" target="_blank">
            Royal Canin Turkey Evcil Hayvan Ürünleri Ticaret Ltd. Şti
          </a>
          ,&nbsp;
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            Mars Petcare ve bağlı şirketlerinin
          </a>
          &nbsp;heyecan verici promosyonları ve yeni ürün geliştirmelerinden
          sizi ve [evcil hayvanınızı] haberdar etmek istiyoruz. Zaman zaman,
          ürün ve hizmet sunumlarımızı geliştirmek için araştırma amacıyla
          verilerinizi kullanabiliriz.
        </p>
        <p className="mt-2">
          18 yaşından büyükseniz, lütfen aşağıdaki kutucukları işaretleyerek
          seçimlerinizi onaylayın:
        </p>
      </div>
    )
  };
  const bottomText = {
    us: (
      <div className="explain-txt">
        <p className="mb-2">
          I understand that I may change these preferences at any time by
          contacting Mars Petcare at 1-844-673-3772 or by clicking &nbsp;
          <a href="https://shop.royalcanin.com/help/contact" target="_blank">
            here
          </a>
          .
        </p>
        <p>
          For more information about how we use your data, please see Mars
          Privacy Statement:
          <a href="https://www.mars.com/privacy" target="_blank">
            https://www.mars.com/privacy
          </a>
          .
        </p>
      </div>
    ),
    fr: (
      <div className="explain-txt">
        <p>
          Je comprends que je peux modifier ces préférences à tout moment en me
          connectant sur
          <a href="https://account.royalcanin.com/fr-fr" target="_blank">
            « Mon Compte »
          </a>
          .
        </p>
        <p>
          De façon ponctuelle, vos données pourront être utilisées à des fins
          d’études statistiques anonymes afin d'améliorer nos offres de produits
          et de services. Vous pouvez en savoir plus sur la manière dont Mars
          Petcare et ses filiales collectent et traitent vos données, nous
          contacter pour toute question relative à la confidentialité et exercer
          vos droits en matière de données à caractère personnel via la &nbsp;
          <a href="https://www.mars.com/privacy-policy-france" target="_blank">
            déclaration de confidentialité de Mars
          </a>
          . Vous avez également le droit d’introduire une réclamation auprès de
          la CNIL.
        </p>
      </div>
    ),
    de: (
      <div className="explain-txt">
        <p className="mb-2">
          Mir ist bewusst, dass ich diese Präferenzen jederzeit ändern kann,
          über den Kundenservice oder online über den entsprechenden Link.
        </p>
        <p>
          Wenn Sie mehr erfahren möchten, wie Mars Petcare und seine
          Tochtergesellschaften Ihre Daten erheben und verarbeiten oder Sie
          Fragen zum Datenschutz haben, kontaktieren Sie uns oder schauen Sie in
          unsere &nbsp;
          <a href="https://www.mars.com/privacy-policy-germany" target="_blank">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    ),
    se: (
      <div className="explain-txt">
        <p>
          Från tid till annan kan vi använda dina uppgifter till forskning för
          att förbättra vår produkt- och tjänsteerbjudanden. Du kan ta reda på
          hur Mars Petcare och dess dotterbolag samlar in och behandlar dina
          uppgifter, kontakta oss med sekretessfrågor och utöva dina
          personuppgifter via &nbsp;
          <a href="https://www.mars.com/privacy-policy-sweden" target="_blank">
            Mars’ Sekretesspolicy
          </a>
          .
        </p>
      </div>
    ),
    mx: (
      <div className="explain-txt">
        <p>
          Entiendo que puedo cambiar estas preferencias en cualquier momento
          mediante el [mecanismo detallado para administrar las preferencias].
        </p>
        <p>
          q ü Desmarque esta casilla si no desea que sus datos se utilicen en
          investigaciones para mejorar nuestras ofertas de productos y
          servicios.
        </p>
        <p>
          Puede averiguar cómo &nbsp;
          <a
            href="https://mex.mars.com/es-MX/hecho-por-mars/petcare"
            target="_blank"
          >
            Mars Petcare
          </a>
          &nbsp; y sus afiliados recopilan y procesan sus Datos, puede
          comunicarse con nosotros si tiene preguntas sobre nuestros procesos de
          procesamiento y/o para ejercer sus derechos ARCO a través del Aviso de
          &nbsp;
          <a href="https://www.mars.com/privacy-policy-Mexico" target="_blank">
            Privacidad de Mars
          </a>
          .
        </p>
      </div>
    ),
    jp: (
      <div className="explain-txt">
        {/* <p>&nbsp;</p> */}
        <p>
          マースペットケア及びその関連会社は、製品やサービス提供の向上のための
          調査にお客様のデータを適宜使用することがあります。
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            マースペットケア及 びその関連会社
          </a>
          における、お客様の個人情報についての取得・お取扱い方法、
          その他個人情報に関するお問い合わせ、お客様の権利の行使につきましては、
          <a href="https://www.mars.com/privacy-policy-japan" target="_blank">
            「マースのプライバシーに関する声明」
          </a>
          でご確認いただけます。
        </p>
      </div>
    ),
    tr: (
      <div className="explain-txt">
        <p className="mb-2">
          İleti Yönetim Sistemi aracılığı ile bu tercihleri istediğim zaman
          değiştirebileceğimi biliyorum.
        </p>
        <p>
          <a href="https://www.royalcanin.com/tr" target="_blank">
            Royal Canin Turkey Evcil Hayvan Ürünleri Ticaret Ltd. Şti
          </a>
          ,&nbsp;
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            Mars Petcare ve bağlı şirketlerinin
          </a>
          &nbsp; verilerinizi nasıl toplayıp işlediğini öğrenebilir, gizlilik
          soruları hakkında bizimle iletişime geçebilir ve &nbsp;
          <a href="https://www.mars.com/privacy-policy-turkey" target="_blank">
            Mars Gizlilik Beyanı
          </a>
          &nbsp; aracılığıyla kişisel veri haklarınızı kullanabilirsiniz.
        </p>
      </div>
    )
  };

  return (
    <div className="consent-additional-text-wrap">
      {textPosition === 'top' ? topText[window.__.env.REACT_APP_COUNTRY] : null}
      {textPosition === 'bottom'
        ? bottomText[window.__.env.REACT_APP_COUNTRY]
        : null}
    </div>
  );
};

export default ConsentAdditionalText;
