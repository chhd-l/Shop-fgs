import React from 'react';
import Cover from './Cover';

const benifitList =
  {
    en: [
      {
        iconCls: 'rc-lock--xs rc-iconography--xs',
        text: '100% secure payment'
      },
      {
        iconCls: 'rc-loading--xs rc-iconography--xs',
        text: 'Satisfaction guaranteed'
      },
      {
        iconCls: 'rc-low-maintenance--xs rc-iconography',
        text: 'Premium nutrition'
      },
      { iconCls: 'rc-shop--xs rc-iconography--xs', text: 'Free shipping' }
    ],
    ru: [
      {
        iconCls: 'rc-lock--xs rc-iconography--xs',
        text: '100% безопасный платеж'
      },
      {
        iconCls: 'rc-loading--xs rc-iconography--xs',
        text: 'Гарантия возврата'
      },
      {
        iconCls: 'rc-low-maintenance--xs rc-iconography',
        text: 'Премиум качество'
      },
      { iconCls: 'rc-shop--xs rc-iconography--xs', text: 'Бесплатная доставка' }
    ],
    tr: [
      { iconCls: 'rc-lock--xs rc-iconography--xs', text: '100% güvenli ödeme' },
      { iconCls: 'rc-loading--xs rc-iconography--xs', text: 'İade imkânı' },
      {
        iconCls: 'rc-low-maintenance--xs rc-iconography',
        text: 'Premium Kalite'
      },
      { iconCls: 'rc-shop--xs rc-iconography--xs', text: 'Ücretsiz Kargo' }
    ],
    fr: [
      {
        iconCls: 'rc-lock--xs rc-iconography--xs',
        text: 'Achat 100% sécurisé'
      },
      {
        iconCls: 'rc-loading--xs rc-iconography--xs',
        text: 'Satisfait ou remboursé'
      },
      {
        iconCls: 'rc-low-maintenance--xs rc-iconography',
        text: 'Qualité Premium'
      },
      { iconCls: 'rc-shop--xs rc-iconography--xs', text: 'Livraison rapide' }
    ]
  }[process.env.REACT_APP_LANG] || [];
const faqList =
  {
    en: [
      {
        title: 'How can I reach customer service?',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>You can reach one of our customer care representatives toll-free at 1-844-673-3772. We’re available Monday through Friday, 8:00 AM – 4:30 PM CT.</p><p></p>`,
        gaContext: 'How to contact customer service'
      },
      {
        title: 'Do you offer free shipping?',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>Royal Canin offers free shipping on all orders. Your package should arrive within 3-5 days.</p>
        <ul>
        <li>A message to our valued customers regarding COVID-19: Royal Canin’s top priority is the health and wellness of our Associates, partners, and cats and dogs we serve. While we are doing our best to maintain the level of service you have come to expect, you may experience slight delays. We appreciate your patience during this time.</li>
        </ul><p></p>`,
        gaContext: 'Would you like free delivery'
      },
      {
        title: 'How secure is my payment information?',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>Purchases are 100% secure through the Royal Canin checkout process. Our site uses a Secure Sockets Layer (SSL) protocol to encrypt all personal information sent during the checkout process. For more information on how we secure and use your information, please consult our Privacy Policy.</p>
        <p>We currently accept Visa, Mastercard, American Express and Discover as payment methods.</p><p></p>`,
        gaContext: 'How secure is my payment information'
      },
      {
        title: 'Do you offer free returns?',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>Please see our return policy in our <a href="https://www.royalcanin.com/ru/shop/general-terms-conditions" target="_blank" rel="nofollow noopener"><span style="color: #6888c9;">Terms and Conditions</span><span class="warning_blank">Opens a new window</span></a>&nbsp;or <a href=${process.env.REACT_APP_HOMEPAGE$}/help/contact target="_blank" rel="noopener noreferrer"><span style="color: #6888c9;">contact us</span><span class="warning_blank">Opens a new window</span></a> for further assistance.</p><p></p>`,
        gaContext: 'Free return'
      }
    ],
    ru: [
      {
        title: 'СЛУЖБА ПОДДЕРЖКИ',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>Наши эксперты рады помочь Вам каждый день с 9:00 до 21:00 через форму обратной связи и по телефону 8 800 200 37 35</p><p></p>`,
        gaContext: 'How to contact customer service'
      },
      {
        title: 'БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 2500 руб.',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>С условиями доставки Вы можете ознакомиться <a href="https://www.royalcanin.com/ru/about-us/shipment-conditions"><ins>здесь</ins></a></p><p></p>`,
        gaContext: 'Would you like free delivery'
      },
      {
        title: 'БЕЗОПАСНЫЕ ПЛАТЕЖИ',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p>ROYAL CANIN гарантирует 100% безопасную онлайн-оплату. Платежная информация защищена с ипользованием технологии SSL.</p>
        <p>Мы принимаем карты МИР, VISA и Mastercard</p><p></p>`,
        gaContext: 'How secure is my payment information'
      },
      {
        title: 'ВОЗВРАТ ТОВАРА',
        context: `<h1 class="rc-zeta"></h1>
        <p></p><p><a href="https://www.royalcanin.com/ru/shop/general-terms-conditions">С условиями возврата&nbsp; Вы можете ознакомиться здесь</a></p><p></p>`,
        gaContext: 'Free return'
      }
    ],
    tr: [
      {
        title: 'MÜŞTERİ HİZMETLERİ',
        context: `<h1 class="rc-zeta"></h1>
      <p></p><p>Evcil hayvan danışmanlarımız sorularınızı yanıtlamaktan mutluluk duyacaktır! Bize&nbsp;hafta içi her gün 09:00 - 18:00 arasında&nbsp; 0 850 737 1200 üzerinden ulaşabilirsiniz.</p><p></p>`,
        gaContext: 'How to contact customer service'
      },
      {
        title: 'ÜCRETSİZ KARGO',
        context: `<h1 class="rc-zeta"></h1>
    <p></p><p>125TL ve üzeri siparişleriniz kargo ücretsizdir. Ürünleriniz sipariş verdikten sonra 3 - 5 gün içerisinde size ulaşır.</p>
    <ul>
    <li>Koronavirüs sebebiyle, teslimat tarihlerinde gecikme yaşanabilir. Anlayışınız için teşekkür ederiz.</li>
    </ul><p></p>`,
        gaContext: 'Would you like free delivery'
      },
      {
        title: 'GÜVENLİ ÖDEME',
        context: `<h1 class="rc-zeta"></h1>
    <p></p><p>Royal Canin online mağazasında yapacağınız alışverişlerde, %100 güvenli ödeme yöntemi kullanılır. Ödeme ve kart bilgileriniz, SSL sistemiyle güvence altına alınmaktadır.</p>
    <p>Kabul edilen ödeme yöntemleri Visa, Mastercard ve American Express'tir.</p><p></p>`,
        gaContext: 'How secure is my payment information'
      },
      {
        title: 'ÜCRETSİZ İADE',
        context: `<h1 class="rc-zeta"></h1>
    <p></p><p>Ürünlerinizi, satın aldıktan sonraki 14 gün içerisinde ücretsiz olarak iade edebilirsiniz. Teslim edilen siparişlerinizde bir iade kartı yer alır.</p><p></p>`,
        gaContext: 'Free return'
      }
    ],
    fr: [
      {
        title: 'Comment puis-je joindre le service client ?',
        context: `<h1 class="rc-zeta"></h1>
      <p></p><p>Vous pouvez joindre un de nos représentants du service clientèle au numéro gratuit 0 800 005 360. Nous sommes à votre disposition du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.</p><p></p>`,
        gaContext: 'How to contact customer service'
      },
      {
        title: 'Proposez-vous la livraison gratuite ?',
        context: `<h1 class="rc-zeta"></h1>
      <p></p><p>Royal Canin offre la livraison gratuite pour toutes les commandes. Votre colis arrivera dans les 3 jours ouvrables.</p><p></p>`,
        gaContext: 'Would you like free delivery'
      },
      {
        title:
          'Dans quelle mesure mes informations de paiement sont-elles sécurisées ?',
        context: `<h1 class="rc-zeta"></h1>
    <p></p><p>Les achats sont sécurisés à 100 % grâce au processus de paiement de Royal Canin. Notre site utilise un protocole SSL pour crypter toutes les informations personnelles envoyées pendant la procédure de paiement. Pour plus d'informations sur la manière dont nous sécurisons et utilisons vos informations, veuillez consulter notre politique de confidentialité.</p>
    <p>Nous acceptons les cartes Visa et Mastercard comme moyens de paiement. </p><p></p>`,
        gaContext: 'How secure is my payment information'
      },
      {
        title: 'Proposez-vous des retours gratuits ?',
        context: `<h1 class="rc-zeta"></h1>
    <p></p><p>Quel que soit votre motif d'insatisfaction, vous pouvez nous retourner les marchandises pour être intégralement remboursé. Dès réception, nous vous rembourserons le montant total, y compris les frais de retour. Nous utiliserons les mêmes moyens de remboursement que ceux de la transaction initiale, sauf si vous avez expressément convenu d'autre chose. Vous recevrez un e-mail une fois votre colis reçu et le remboursement effectué.</p><p></p>`,
        gaContext: 'Free return'
      }
    ]
  }[process.env.REACT_APP_LANG] || [];

export default class Faq extends React.Component {
  render() {
    return <Cover benifitList={benifitList} faqList={faqList} />;
  }
}
