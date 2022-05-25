import React, { useState, useEffect, useContext } from 'react';
import { formatMoney } from '@/utils/utils';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';
import Table from './Table';
import Address from './Address';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { loginStore, paymentStore, configStore } = useLocalStore(() => stores);
  const { isLogin, userInfo } = loginStore;
  const {
    fullScreenModalA,
    deliveryAddressInfo,
    billingAddressInfo,
    guestEmail
  } = paymentStore;
  const { localAddressForm } = configStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalA ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalA')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm  rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      MESAFELİ SATIŞ ÖN BİLGİLENDİRME FORMU{' '}
                    </h2>
                    <p>
                      <strong>SATICI’YA AİT BİLGİLER</strong>
                    </p>
                    <br />
                    <p>
                      Ünvan: ROYAL CANIN TURKEY EVCİL HAYVAN ÜRÜNLERİ TİCARET
                      LTD.ŞTİ.
                    </p>
                    <p>
                      Adres: ESENTEPE MAH. BÜYÜKDERE CAD. ASTORIA KULELERİ
                      NO:127 A BLOK KAT:1 ŞİŞLİ İSTANBUL
                    </p>
                    <p>Telefon: 0 212 370 06 70</p>
                    <p>Faks: 0 212 370 06 71</p>
                    <p>E-posta: iletisim@royalcanin.com</p>
                    <p>Mersis No: 0735085841000012</p>
                    <p>Ticaret Sicil No: 983173</p>
                    <p>
                      Her türlü şikâyet ve talep için yukarıdaki e-posta adresi
                      ya da telefon numarası aracılığıyla bizimle iletişime
                      geçebilirsiniz
                    </p>
                    <br />
                    <p>
                      <strong>ÜRÜNLERE İLİŞKİN BİLGİLER</strong>
                    </p>
                    <Table />
                    <br />
                    <br />
                    <p>
                      <strong>ÖDEME BİLGİLERİ</strong>
                    </p>
                    <p>Ödemeler kredi kartı, yapılabilir </p>
                    <h3>TESLİMAT VE FATURA BİLGİLERİ </h3>
                    <p>
                      <strong>Teslimat Bilgileri: </strong>
                    </p>
                    <p>
                      Ad Soyad / Unvan:{' '}
                      <span>{deliveryAddressInfo?.firstName}</span>{' '}
                      <span>{deliveryAddressInfo?.lastName}</span>
                    </p>
                    <Address deliveryAddressInfo={deliveryAddressInfo} />
                    <p>
                      Telefon:{' '}
                      <span>
                        {deliveryAddressInfo?.phoneNumber ||
                          deliveryAddressInfo?.consigneeNumber}
                      </span>{' '}
                    </p>
                    <p>
                      E-posta:{' '}
                      <span>
                        {isLogin ? userInfo?.customerAccount : guestEmail}
                      </span>
                    </p>
                    <br />
                    <p>
                      <strong>Fatura Bilgileri: </strong>
                    </p>
                    <p>
                      Ad Soyad / Unvan:{' '}
                      <span>{billingAddressInfo?.firstName}</span>{' '}
                      <span>{billingAddressInfo?.lastName}</span>
                    </p>
                    <Address billingAddressInfo={billingAddressInfo} />
                    <p>
                      Telefon:{' '}
                      <span>
                        {billingAddressInfo?.phoneNumber ||
                          billingAddressInfo?.consigneeNumber}
                      </span>{' '}
                    </p>
                    <p>
                      E-posta:{' '}
                      <span>
                        {isLogin ? userInfo?.customerAccount : guestEmail}
                      </span>{' '}
                    </p>
                    <div className="content-asset">
                      <p>
                        <strong>TESLİMAT: </strong>
                      </p>
                      <p>
                        Sözleşme konusu ürünler, siparişin Satıcı’ya ulaştığı
                        tarihten itibaren en geç 3 (üç) iş günü içinde kargoya
                        verilir.
                      </p>
                      <p>
                        Sözleşme konusu ürünler, sipariş verilirken bildirilen
                        ve yukarıda belirtilen teslimat adresine teslim edilir.
                        Alıcı’nın teslimat adresinde bulunmaması veya hatalı
                        adres bildirmesi durumunda Satıcı hiçbir sorumluluk
                        kabul etmez.
                      </p>
                      <p>
                        Satın alınan ürün, kargo şirketi tarafından Alıcı’ya
                        teslim edilemediği takdirde Alıcı’nın bizzat teslim
                        alması için üç gün ilgili kargo şirketinin şubesinde
                        bekletilecek; bu süre içinde teslim alınmazsa iade
                        alınarak ödenmiş olunan tutar kredi / banka kartına iade
                        edilecektir. Royal Canin Club programı kapsamında satın
                        alınan ürünler için de aynı kural geçerlidir.
                      </p>

                      <p>
                        <strong>CAYMA HAKKI</strong>
                      </p>
                      <p>
                        Alıcı, Sözleşme konusu ürünleri teslim alma tarihinden
                        itibaren 14 (ondört) gün içinde herhangi bir gerekçe
                        göstermeksizin ve cezai şart ödemeksizin Sözleşme’den
                        cayma hakkına sahiptir. Ayrıca Alıcı, Sözleşme’nin
                        kurulmasından ürünün teslimine kadar olan süre içinde de
                        cayma hakkını kullanabilir.
                      </p>
                      <p id="anchor1">
                        Alıcı’nın <a href="#test2">cayma</a> hakkını
                        kullandığına dair bildirimin, e-posta adresine
                        gönderilecek bir bildirim ile Satıcı’ya iletmiş olması
                        gerekir. Alıcı’nın cayma hakkını kullanmasından itibaren
                        10 (on) gün içinde ilgili ürünü Satıcı’ya kutusu,
                        ambalajı, varsa standart aksesuarları ve varsa ürün ile
                        birlikte hediye edilen diğer ürünler ile birlikte
                        eksiksiz ve hasarsız olarak iade etmesi gerekmektedir.
                        Alıcı, iade edeceği ürünü, kendisine teslimat yapan
                        kargo şirketi aracılığıyla gönderim ücreti Satıcı’ya ait
                        olmak üzere Satıcı’ya geri gönderebilir. Cayma hakkının
                        kullanılmasını takip eden 14 (ondört) gün içinde iade
                        edilen ürünün bedeli, Alıcı’nın ödeme şekli kullanılarak
                        iade edilir. Ürün iade edilirken, ürünün teslimi
                        sırasında Alıcı’ya ibraz edilmiş olan fatura aslının da
                        Alıcı tarafından iade edilmesi gerekmektedir.
                      </p>
                      <p>Aşağıdaki hallerde cayma hakkı kullanılamaz:</p>
                      <p>
                        <strong>a.</strong>&nbsp;Fiyatı finansal piyasalardaki
                        dalgalanmalara bağlı olarak değişen ve Satıcı’nın
                        kontrolünde olmayan mal veya hizmetlere ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        <strong>b.</strong>&nbsp;Alıcı’nın istekleri veya
                        kişisel ihtiyaçları doğrultusunda hazırlanan mallara
                        ilişkin sözleşmeler.
                      </p>
                      <p>
                        <strong>c.</strong>&nbsp;Çabuk bozulabilen veya son
                        kullanma tarihi geçebilecek malların teslimine ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        <strong>d.</strong>&nbsp;Tesliminden sonra ambalaj,
                        bant, mühür, paket gibi koruyucu unsurları açılmış olan
                        mallardan; iadesi sağlık ve hijyen açısından uygun
                        olmayanların teslimine ilişkin sözleşmeler.
                      </p>
                      <p>
                        <strong>e.</strong>&nbsp;Tesliminden sonra başka
                        ürünlerle karışan ve doğası gereği ayrıştırılması mümkün
                        olmayan mallara ilişkin sözleşmeler.
                      </p>
                      <p>
                        <strong>f.</strong>&nbsp;Malın tesliminden sonra
                        ambalaj, bant, mühür, paket gibi koruyucu unsurları
                        açılmış olması halinde maddi ortamda sunulan kitap,
                        dijital içerik ve bilgisayar sarf malzemelerine ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        <strong>g.</strong>&nbsp;Abonelik sözleşmesi kapsamında
                        sağlananlar dışında, gazete ve dergi gibi süreli
                        yayınların teslimine ilişkin sözleşmeler.
                      </p>
                      <p>
                        <strong>h.</strong>&nbsp;Belirli bir tarihte veya
                        dönemde yapılması gereken, konaklama, eşya taşıma, araba
                        kiralama, yiyecek-içecek tedariki ve eğlence veya
                        dinlenme amacıyla yapılan boş zamanın
                        değerlendirilmesine ilişkin sözleşmeler.
                      </p>
                      <p>
                        <strong>i.</strong>&nbsp;Elektronik ortamda anında ifa
                        edilen hizmetler veya tüketiciye anında teslim edilen
                        gayrimaddi mallara ilişkin sözleşmeler.
                      </p>
                      <p id="test2">
                        <strong>j.</strong>&nbsp;Cayma hakkı süresi sona ermeden
                        önce, tüketicinin onayı ile ifasına başlanan hizmetlere
                        ilişkin sözleşmeler.
                      </p>
                      <p>&nbsp;</p>

                      <p>
                        <strong>ROYAL CANIN CLUB</strong>
                      </p>
                      <p>
                        ROYAL CANIN® Club, bu programın içinde yer alan belirli
                        ürün ve hizmetleri sitede tanımlandığı şekilde satın
                        almak isteyen Online Mağazamıza kayıtlı kullanıcılar
                        için otomatik olarak belirli aralıklarla ürün satın
                        alınmasına ilişkin bir abonelik programıdır. Alıcı, bu
                        programa katıldığı takdirde söz konusu satışlarda
                        aşağıdaki hükümler uygulanacaktır:
                      </p>
                      <p>
                        <strong>a.</strong>&nbsp;Ürünlerin otomatik olarak
                        gönderilme sıklığı, Alıcı tarafından belirlenir.
                      </p>
                      <p>
                        <strong>b.</strong>&nbsp;Program dahilindeki mama
                        seçenekleri, tavsiye niteliğindedir. Evcil hayvanın özel
                        ihtiyaç ve hassasiyetlerinin her zaman için göz önünde
                        bulundurulması ve en uygun sağlıklı beslenme çözümünü
                        öğrenmek için Veteriner Hekime danışılması önerilir.
                      </p>
                      <p>
                        <strong>c.</strong>&nbsp;Club programında önerilen
                        ürünler tekli siparişe de açık olup Alıcı’nın bu
                        ürünleri satın alabilmesi için Club programına dahil
                        olmasına gerek bulunmamaktadır.
                      </p>
                      <p>
                        <strong>d.</strong>&nbsp;Club programı dahilinde
                        haftaiçi her gün 09.00-18.00 saatleri arasında hizmet
                        veren Beslenme Danışmanları vardır. Bu danışmanlar,
                        yalnızca veteriner hekim muayenesi ve kontrolü
                        gerektirmeyen evcil hayvan bakımı, beslenmesi ve
                        davranışları hakkında Club üyelerine tavsiyelerde
                        bulunur.
                      </p>
                      <p>
                        <strong>e.</strong>&nbsp;Alıcıya, Club programına dahil
                        olduğunda ilk teslimatında içinde battaniye, mama kabı,
                        broşür içeren hoşgeldin paketi sunulur. İlk siparişi
                        takip eden her üç siparişinde bir mama kabı, saklama
                        kabı, bakım kiti gibi Satıcı’nın takdirine göre
                        belirlenecek hediyeler sunulmaktadır. Söz konusu
                        hediyeler burada sayılanlarla sınırlı olmadığı gibi
                        hediyelerin içeriğinde ve sıralamasında değişiklik
                        uygulanabilir.
                      </p>
                      <p>
                        <strong>f.</strong>&nbsp;Siparişlerin herhangi bir
                        nedenle iadesi durumda ürün ve hediyeler eksiksiz bir
                        şekilde birlikte paket olarak iade edilmelidir.
                      </p>
                      <p>
                        <strong>g.</strong>&nbsp;Alıcı, herhangi bir zamanda
                        hiçbir değişiklik veya iptal ücreti olmadan Club
                        aboneliğini değiştirebilir veya iptal edebilir.
                        Alıcı’nın Club aboneliği kapsamındaki ürünü değiştirmesi
                        durumunda artık yeni belirlenen ürünün fiyatı üzerinden
                        ücretlendirme yapılacaktır.
                      </p>
                      <p>
                        <strong>h.</strong>&nbsp;Alıcı, herhangi bir teslimatı
                        bir sonraki sipariş tarihinden en az bir gün önce
                        atlamayı tercih edebilir. Bu durumda söz konusu sipariş
                        gönderilmeyecek ve faturalanmayacaktır. Bu durumda
                        ilgili teslimat kapsamında bir hediye gönderilecekse, bu
                        hediye bir sonraki teslimat ile gönderilecektir. Ancak
                        bu durumda beslenme danışmanı tavsiyelerinden
                        faydalanmaya devam edebileceksiniz.
                      </p>
                      <p>
                        <strong>i.</strong>&nbsp;Alıcı, siparişin gönderilme
                        tarihini, ilgili sipariş oluşmadan önce değiştirebilir.
                        Herhangi bir siparişe ilişkin tarih değiştirildiğinde,
                        sonraki siparişlerin tarihleri otomatik olarak
                        değiştirilmez.
                      </p>
                      <p>
                        <strong>j.</strong>&nbsp;Alıcı, Club programı
                        kapsamındaki siparişlerin teslimat veya fatura adresini,
                        ilgili siparişi vermeden önce değiştirebilir.
                      </p>
                      <p>
                        <strong>k.</strong>&nbsp;Club programı kapsamında satın
                        alınan ürünlerin teslimatı ücretsiz yapılacaktır.
                      </p>
                      <p>
                        <strong>l.</strong>&nbsp;Club programı kapsamındaki
                        ürünlerden herhangi birinin ücretinde artış olduğu
                        takdirde Alıcı’ya bu değişikliği bildirmek ve söz konusu
                        satın almaya devam etmek isteyip istemediğinin onayını
                        almak üzere e-posta gönderilecektir. Alıcı’nın bu
                        bildirimi almasından itibaren yedi (7) gün içinde fiyat
                        artışını kabul etmemesi durumunda Satıcı söz konusu
                        siparişi işleyeme koyamayacak ve gönderemeyecektir.
                        Alıcı’nın yedi (7) gün içinde fiyat artışını kabul
                        etmediğine dair bir bildirimde bulunmaması halinde takip
                        eden siparişleri, yeni fiyat üzerinden
                        ücretlendirilecektir.
                      </p>
                      <p>
                        <strong>m.</strong>&nbsp;Alıcı, Club programı kapsamında
                        satın aldığı ürünler için yalnızca kredi kartı ve/veya
                        banka kartı ile ödeme yapabilir. Alıcı’nın kart
                        bilgileri abonelik programına kayıt için gerekli
                        olacaktır ve bu bilgiler Satıcı’nın ödeme hizmeti
                        sağlayıcısı tarafından kaydedilecektir. Alıcı bu
                        bilgilerini her zaman hesabından değiştirebilir ve takip
                        eden siparişlerde yeni kartı kullanılır.
                      </p>
                      <p>
                        <strong>n.</strong>&nbsp;Alıcı’nın ödeme için kaydetmiş
                        olduğu kartının geçerliliği sona erdiğinde Alıcı, kart
                        bilgilerini güncellemesi için otomatik bir e-posta
                        alacaktır. Alıcı’nın kartının geçerlilik süresi sona
                        ermesine rağmen kart bilgilerini güncellememesi
                        durumunda Satıcı, abonelik konusu siparişi işleme
                        koyamayacak ve gönderemeyecektir.
                      </p>
                      <p>
                        <strong>o.</strong>&nbsp;Alıcı’nın kartına ilişkin ödeme
                        onayı her bir sipariş için kontrol edilecektir ve ödeme,
                        Alıcı’nın siparişi oluştuğunda tahsil edilecektir.
                        Ödemeye ilişkin herhangi bir problem olduğu takdirde
                        ödeme bilgilerini güncellemesi için Alıcı ile iletişime
                        geçilecektir. Satıcı, ödeme bilgilerini güncellemesi
                        için Alıcı’ya ulaşamadığı takdirde Satıcı, abonelik
                        konusu siparişi işleme koyamayacak ve gönderemeyecektir.
                      </p>
                      <p>
                        <strong>p.</strong>&nbsp;Alıcı’nın aboneliği
                        kapsamındaki bir ürünün geçici olarak stok dışı olması
                        durumunda bu husus Alıcı’ya bildirilecek ve söz konusu
                        ürün stoka girene kadar siparişleri işleme
                        koyulamayacaktır. Alıcı’nın aboneliği kapsamındaki bir
                        ürünün süresiz olarak stok dışı olması durumunda bu
                        husus Alıcı’ya bildirilecek ve Alıcı’nın söz konusu ürün
                        hakkındaki aboneliği otomatik olarak iptal edilecektir.
                        Alıcı’nın böyle bir durumda Satıcı’dan herhangi bir
                        talep hakkı bulunmamaktadır. Hediyeler ise ürün
                        kapsamında sayılmaz, stok durumuna veya Satıcı’nın
                        takdirine göre hediyeler üründen ayrı şekilde veya daha
                        sonraki bir zamanda gönderilebilir.
                      </p>

                      <p id="anchorTest">
                        <strong>UYUŞMAZLIK ÇÖZÜMÜ</strong>
                      </p>
                      <p>
                        Sözleşme’nin uygulanmasında, Gümrük ve Ticaret
                        Bakanlığınca ilan edilen değere kadar, Alıcı’nın ürünü
                        satın aldığı ve ikametgâhının bulunduğu yerdeki Tüketici
                        Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.
                        6502 Sayılı Tüketicinin Korunması Hakkında Kanun’un
                        68/1. maddesinde belirtilen alt ve üst limitler
                        doğrultusunda tüketici talepleri hakkında ilçe/il
                        tüketici hakem heyetleri yetkilidir.
                      </p>
                      <p>
                        İşbu Mesafeli Satış Ön Bilgilendirme Formu’nun Alıcı
                        tarafından okunup onaylanmasının ardından Satıcı ile
                        Alıcı arasında Mesafeli Satış Sözleşmesi’nin kurulması
                        aşamasına geçilecektir.
                      </p>
                    </div>
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
