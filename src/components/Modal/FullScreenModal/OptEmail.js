import React, { useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { paymentStore } = useLocalStore(() => stores);
  const { fullScreenModalOptEmail } = paymentStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalOptEmail ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalOptEmail')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      TİCARİ ELEKTRONİK İLETİ GÖNDERİLMESİ VE BU KAPSAMDA
                      KİŞİSEL
                    </h2>
                    <h2 className="rc-beta text-center">
                      VERİ İŞLENMESİ HAKKINDA AYDINLATMA METNİ
                    </h2>
                    <p>
                      İşbu Ticari Elektronik İleti Gönderilmesi ve Bu Kapsamda
                      Kişisel Veri İşlenmesi Hakkında Aydınlatma Metni, Royal
                      Canin Turkey Evcil Hayvan Ürünleri Ticaret Limited Şirketi
                      (<strong>“Royal Canin”</strong>) tarafından yürütülen
                      bilgilendirme ve tanıtım faaliyetleri kapsamında, Royal
                      Canin ürünlerinin tanıtımına, gerçekleştirilen kampanya,
                      promosyon ve etkinlikler hakkında bilgi verilmesine ve
                      haber bültenlerinin iletilmesine ilişkin olarak ticari
                      elektronik ileti gönderilmesi ve bu kapsamda kişisel
                      verilerinizin işlenmesi ile ilgili tarafınıza bilgi
                      verilmesi amacıyla hazırlanmıştır.
                    </p>
                    <p>
                      Vereceğiniz ticari elektronik ileti izni ile Royal
                      Canin’in bilgilendirme, tanıtım ve pazarlama faaliyetleri
                      kapsamında, Royal Canin tarafından yürütülen genel veya
                      özel kişiselleştirilmiş kampanyalar, promosyonlar, ürün ve
                      hizmet tanıtımları, yarışma, çekiliş ve etkinliklerden
                      haberdar olmanız, anket çalışmaları ve haber bültenlerini
                      almanız, müşteri memnuniyeti uygulamalarının sunumu,
                      reklamlar, bilgilendirmelere ilişkin olarak seçeceğiniz
                      kanallar üzerinden (SMS, e-posta, telefon araması) Royal
                      Canin tarafından tarafınıza ticari elektronik ileti
                      gönderilmesini kabul etmiş bulunacaksınız.
                    </p>
                    <p>
                      Royal Canin tarafından tarafınıza ticari elektronik ileti
                      gönderilmesine onay vermeniz durumunda, belirtmiş
                      olduğunuz adınız soyadınız, tarafınız ile iletişime
                      geçilmesi ile ilgili olarak tercih etmiş olduğunuz
                      iletişim yöntemine bağlı olarak telefon numaranız ve/veya
                      e-posta adresiniz, ticari elektronik ileti izni ve buna
                      ilişkin kişisel verilerinizin işlenmesine ilişkin onaya
                      ilişkin bilgiler, internet sitemiz üzerinde bu
                      bilgileri/formu doldurmanız ile otomatik yöntemlerle
                      toplanacak, Royal Canin tarafından veri sorumlusu sıfatı
                      ile, yürütülen bilgilendirme, tanıtım ve pazarlama
                      faaliyetleri kapsamında, Royal Canin tarafından yürütülen
                      genel veya özel kişiselleştirilmiş kampanyalar,
                      promosyonlar, ürün ve hizmet tanıtımları, yarışma, çekiliş
                      ve etkinliklerden haberdar olmanız, anket çalışmaları ve
                      haber bültenlerini almanız, müşteri memnuniyeti
                      uygulamalarının sunumu, reklamlar, bilgilendirmelere
                      ilişkin olarak seçeceğiniz kanallar üzerinden (SMS,
                      e-posta, telefon araması) Royal Canin tarafından
                      tarafınıza ticari elektronik ileti yollanabilmesi amacıyla
                      açık rızanıza dayalı olarak işlenecektir.
                    </p>
                    <p>
                      Vermiş olduğunuz bu onaylar kendi takdirinizde olup;
                      ilerleyen dönemlerde dilediğiniz her zaman ve hiçbir
                      gerekçe göstermeksizin talebiniz tarihi itibariyle Royal
                      Canin’den elektronik ticari ileti almayı reddedebilir ve
                      buna bağlı açık rızaya dayalı kişisel veri işleme sürecini
                      durdurabilirsiniz. Bu kapsamda tarafınıza gönderilen
                      iletilerde belirtilen yöntemle onayınızı iptal edebilir
                      (ret işlemi yapabilir), internet sitemiz üzerinde
                      üyeliğiniz bulunması durumunda “Hesabım” bölümünden
                      “Bilgilerim” kısmındaki ilgili seçeneği tıklayarak da
                      onayınızı/açık rızanızı geri alabilir veya tercih
                      ettiğiniz ticari iletişim kanallarını değiştirebilirsiniz.
                    </p>
                    <p>
                      Bu süreçte işlenen kişisel verileriniz ticari elektronik
                      iletilerin tarafınıza gönderilebilmesi için Royal Canin’in
                      ticari elektronik ileti gönderilmesi ile ilgili olarak o
                      dönemde destek hizmet aldığı mobil medya şirketi, ajans
                      veya pazarlama şirketi ile destek aldığımız bilgi
                      teknolojileri şirketleri ve danışmanlar ile; kişisel
                      verilerinizden iletişim bilgileriniz ile Royal Canin’e
                      verdiğiniz ticari elektronik ileti iznine ilişkin bilgiler
                      Royal Canin’in Ticari İletişim ve Ticari Elektronik
                      İletiler Hakkında Yönetmelik tahtındaki yükümlülüklerine
                      yerine getirmek için Yönetmelik’e göre yetkilendirilmiş
                      kuruluş ve bu kuruluşa bilgi aktarımı için aracı hizmet
                      sağlayıcı kuruluşlar ve aracı yazılımlar ile ilgili destek
                      aldığımız bilgi teknolojileri şirketleri ve danışmanlar
                      ile gerekli olduğu ölçüde paylaşılacaktır.
                    </p>
                    <p>
                      6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 11.
                      maddesi altında sayılı haklarınızı kullanmak ile ilgili
                      talebinizi Kanun ve Veri Sorumlusuna Başvuru Usul ve
                      Esasları Hakkında Tebliğ hükümleri çerçevesinde,
                      talebinizin ıslak imzalı halini kimliğinizi tevsik eden
                      belgelerle birlikte Esentepe Mah. Büyükdere Cad. No: 127
                      Astoria Kuleleri A Blok Kat: 1 Şişli İstanbul adresindeki
                      şirket merkezine elden teslim edebilir ya da sistemimizde
                      kayıtlı olan e-posta adresi üzerinden{' '}
                      <a
                        href="mailto:iletisim@royalcanin.com"
                        style={{
                          color: '#0563C1',
                          textDecoration: 'underline'
                        }}
                      >
                        iletisim@royalcanin.com
                      </a>
                      adresine e-posta göndererek göndererek veya sistemimizde
                      kayıtlı e-posta adresiniz bulunmuyor ise
                      iletisim@royalcanin.com adresine e-imzalı/mobil imzalı
                      şekilde e-posta göndererek Royal Canin’e iletebilirsiniz.
                      Kimliğinizi tespit için şirketimize sunulacak belgeler
                      açısından, kimlik bilgileri dışında bilgilere yer veren
                      bir belge sunmamanızı ve sunduğunuz belgede herhangi bir
                      özel nitelikli kişisel veriye (örn. din bilgisi, kan grubu
                      bilgisi) yer verilmemesini rica ederiz.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}
    </Observer>
  );
}
