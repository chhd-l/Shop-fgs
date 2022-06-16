import React, { useState, useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';
import Table from './Table';
import Address from './Address';
import { formatDate } from '@/utils/utils';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { loginStore, paymentStore } = useLocalStore(() => stores);
  const { isLogin, userInfo } = loginStore;
  const {
    fullScreenModalB,
    deliveryAddressInfo,
    billingAddressInfo,
    guestEmail
  } = paymentStore;

  const { close } = value;

  function getCurrentDate() {
    return formatDate({ date: new Date() });
  }

  const [currentDate] = useState(getCurrentDate());

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalB ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalB')}
                />
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      MESAFELİ SATIŞ SÖZLEŞMESİ{' '}
                    </h2>
                    <br />
                    <h3>1. TARAFLAR </h3>
                    <br />
                    <h4>1.1.Satıcı: </h4>
                    <br />
                    <p>
                      Ünvan ROYAL CANIN TURKEY EVCİL HAYVAN ÜRÜNLERİ TİCARET
                      LTD.ŞTİ.
                    </p>
                    <p>
                      Adres ESENTEPE MAH. BÜYÜKDERE CAD. ASTORIA KULELERİ NO:127
                      A BLOK KAT:1 ŞİŞLİ İSTANBUL
                    </p>
                    <p>Telefon 0 212 370 06 70</p>
                    <p>Faks 0 212 370 06 71</p>
                    <p>E-posta: iletisim@royalcanin.com</p>
                    <p>Mersis No: 0735085841000012</p>
                    <p>Ticaret Sicil No: 983173</p>
                    <br />
                    <h4>1.2. Alici:</h4>
                    <p>
                      Ad Soyad / Unvan:
                      <span data-represents-field="#billingAddressTitle" />
                      <span data-represents-field="#shippingFirstName">
                        {deliveryAddressInfo?.firstName}
                      </span>{' '}
                      <span data-represents-field="#shippingLastName">
                        {deliveryAddressInfo?.lastName}
                      </span>
                    </p>
                    <Address deliveryAddressInfo={deliveryAddressInfo} />
                    <p>
                      Telefon:
                      <span data-represents-field="#shippingPhoneNumber">
                        {deliveryAddressInfo?.phoneNumber ||
                          deliveryAddressInfo?.consigneeNumber}
                      </span>
                    </p>
                    <p>
                      E-posta:
                      <span data-represents-field="#shippingEmail">
                        {isLogin ? userInfo?.customerAccount : guestEmail}
                      </span>
                    </p>
                    <br />
                    <h3>2. SÖZLEŞME’NİN KONUSU </h3>
                    <p>
                      İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”), 6502 Sayılı
                      Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                      Sözleşmeler Yönetmeliği uyarınca Alıcı’nın{' '}
                      <a
                        href="https://www.royalcanin.com/tr"
                        style={{ color: '#0563C1' }}
                      >
                        https://www.royalcanin.com/tr
                      </a>{' '}
                      adresli internet sitesi (“İnternet Sitesi”) üzerinden
                      elektronik ortamda siparişini verdiği ürünlerin satış ve
                      teslimine ilişkin olarak Satıcı ve Alıcı’nın hak ve
                      yükümlülüklerini düzenler.{' '}
                    </p>
                    <h3>3. SÖZLEŞME KONUSU ÜRÜNLER VE ÖDEME ŞEKLİ </h3>

                    <Table />
                    <br />
                    <p>Ödeme şekli: </p>
                    <div className="form-group custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="rc-input__checkbox "
                        value="standard"
                        id="Method_of_payment-creditcard"
                        name="standard_order"
                        disabled="disabled"
                        style={{ cursor: 'pointer' }}
                        checked="checked"
                        data-card-type="CREDIT_CARD"
                      />
                      <label
                        className="rc-input__label--inline"
                        htmlFor="Method_of_payment-creditcard"
                        style={{ cursor: 'default' }}
                      >
                        Kart Bilgileri
                      </label>
                    </div>
                    <br />
                    <h3>4. TESLİMAT VE FATURA BİLGİLERİ </h3>
                    <p>
                      <strong>4.1.Teslimat Bilgileri: </strong>
                    </p>
                    <p>
                      Ad Soyad / Unvan:
                      <span data-represents-field="#billingAddressTitle" />
                      <span data-represents-field="#shippingFirstName">
                        {deliveryAddressInfo?.firstName}
                      </span>{' '}
                      <span data-represents-field="#shippingLastName">
                        {deliveryAddressInfo?.lastName}
                      </span>
                    </p>
                    <Address deliveryAddressInfo={deliveryAddressInfo} />
                    <p>
                      Telefon:
                      <span data-represents-field="#shippingPhoneNumber">
                        {deliveryAddressInfo?.phoneNumber ||
                          deliveryAddressInfo?.consigneeNumber}
                      </span>
                    </p>
                    <p>
                      E-posta:
                      <span data-represents-field="#shippingEmail">
                        {isLogin ? userInfo?.customerAccount : guestEmail}
                      </span>
                    </p>
                    <br />
                    <p>
                      <strong>4.2.Fatura Bilgileri: </strong>
                    </p>
                    <p>
                      Ad Soyad / Unvan:
                      <span data-represents-field="#billingAddressTitle" />
                      <span data-represents-field="#billingFirstName">
                        {billingAddressInfo?.firstName}
                      </span>{' '}
                      <span data-represents-field="#billingLastName">
                        {billingAddressInfo?.lastName}
                      </span>
                    </p>
                    <Address billingAddressInfo={billingAddressInfo} />
                    <p>
                      Telefon:
                      <span data-represents-field="#billingPhoneNumber">
                        {billingAddressInfo?.phoneNumber ||
                          billingAddressInfo?.consigneeNumber}
                      </span>
                    </p>
                    <p>
                      E-posta:
                      <span data-represents-field="#billingEmail">
                        {isLogin ? userInfo?.customerAccount : guestEmail}
                      </span>
                    </p>
                    <p>
                      <strong>4.3. </strong>Sözleşme konusu ürünler, siparişin
                      Satıcı’ya ulaştığı tarihten itibaren en geç 3 (üç) iş gün
                      içinde kargoya verilir.{' '}
                    </p>
                    <p>
                      <strong>4.4. </strong>Sözleşme konusu ürünler, sipariş
                      verilirken bildirilen ve yukarıda belirtilen teslimat
                      adresine teslim edilir. Alıcı’nın teslimat adresinde
                      bulunmaması veya hatalı adres bildirmesi durumunda Satıcı
                      hiçbir sorumluluk kabul etmez.{' '}
                    </p>
                    <p>
                      <strong>4.5.</strong>Satın alınan ürün, üç kez deneme
                      yapılmasına rağmen (kapıda teslimat yapılması, telefon
                      veya e-posta ile ulaşılmaya çalışılması vs. dâhil)
                      Alıcı’ya teslim edilemediği takdirde sipariş iptal
                      edilerek, ödenmiş olunan tutar kredi / banka kartına iade
                      edilecektir. Abonelik programı kapsamında satın alınan
                      ürünler için de aynı kural geçerlidir.
                    </p>
                    <div className="content-asset">
                      <h3>5. CAYMA HAKKI</h3>
                      <p>
                        <strong>5.1</strong> Alıcı, Sözleşme konusu ürünleri
                        teslim alma tarihinden itibaren 14 (ondört) gün içinde
                        herhangi bir gerekçe göstermeksizin ve cezai şart
                        ödemeksizin Sözleşme’den cayma hakkına sahiptir. Ayrıca
                        Alıcı, Sözleşme’nin kurulmasından ürünün teslimine kadar
                        olan süre içinde de cayma hakkını kullanabilir.
                      </p>
                      <p>
                        <strong>5.2</strong> Alıcı’nın cayma hakkını
                        kullandığına dair bildirimin, cayma hakkı süresi
                        dolmadan internet sitesi üzerindeki form doldurulmak
                        suretiyle veya Satıcı’nın e-posta adresine gönderilecek
                        bir bildirim ile Satıcı’ya iletmiş olması gerekir.
                        Alıcı’nın cayma hakkını kullanmasından itibaren 10 (on)
                        gün içinde ilgili ürünü Satıcı’ya kutusu, ambalajı,
                        varsa standart aksesuarları ve varsa ürün ile birlikte
                        hediye edilen diğer ürünler ile birlikte eksiksiz ve
                        hasarsız olarak iade etmesi gerekmektedir. Alıcı, iade
                        edeceği ürünü, kendisine teslimat yapan kargo şirketi
                        aracılığıyla gönderim ücreti Satıcı’ya ait olmak üzere
                        Satıcı’ya geri gönderebilir. Cayma hakkının
                        kullanılmasını takip eden 14 (ondört) gün içinde iade
                        edilen ürünün bedeli, Alıcı’nın ödeme şekli kullanılarak
                        iade edilir. Ürün iade edilirken, ürünün teslimi
                        sırasında Alıcı’ya ibraz edilmiş olan fatura aslının da
                        Alıcı tarafından iade edilmesi gerekmektedir.
                      </p>
                      <p>
                        <strong>5.3</strong> Aşağıdaki hallerde cayma hakkı
                        kullanılamaz:
                      </p>
                      <p>
                        a. Fiyatı finansal piyasalardaki dalgalanmalara bağlı
                        olarak değişen ve Satıcı’nın kontrolünde olmayan mal
                        veya hizmetlere ilişkin sözleşmeler.
                      </p>
                      <p>
                        b. Alıcı’nın istekleri veya kişisel ihtiyaçları
                        doğrultusunda hazırlanan mallara ilişkin sözleşmeler.
                      </p>
                      <p>
                        c. Çabuk bozulabilen veya son kullanma tarihi
                        geçebilecek malların teslimine ilişkin sözleşmeler.
                      </p>
                      <p>
                        d. Tesliminden sonra ambalaj, bant, mühür, paket gibi
                        koruyucu unsurları açılmış olan mallardan; iadesi sağlık
                        ve hijyen açısından uygun olmayanların teslimine ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        e. Tesliminden sonra başka ürünlerle karışan ve doğası
                        gereği ayrıştırılması mümkün olmayan mallara ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        f. Malın tesliminden sonra ambalaj, bant, mühür, paket
                        gibi koruyucu unsurları açılmış olması halinde maddi
                        ortamda sunulan kitap, dijital içerik ve bilgisayar sarf
                        malzemelerine ilişkin sözleşmeler.
                      </p>
                      <p>
                        g. Abonelik sözleşmesi kapsamında sağlananlar dışında,
                        gazete ve dergi gibi süreli yayınların teslimine ilişkin
                        sözleşmeler.
                      </p>
                      <p>
                        h. Belirli bir tarihte veya dönemde yapılması gereken,
                        konaklama, eşya taşıma, araba kiralama, yiyecek-içecek
                        tedariki ve eğlence veya dinlenme amacıyla yapılan boş
                        zamanın değerlendirilmesine ilişkin sözleşmeler.
                      </p>
                      <p>
                        i. Elektronik ortamda anında ifa edilen hizmetler veya
                        tüketiciye anında teslim edilen gayrimaddi mallara
                        ilişkin sözleşmeler.
                      </p>
                      <p>
                        j. Cayma hakkı süresi sona ermeden önce, tüketicinin
                        onayı ile ifasına başlanan hizmetlere ilişkin
                        sözleşmeler.
                      </p>
                      <h3>6. ALICI’NIN BEYAN VE TAAHHÜTLERİ</h3>
                      <p>
                        <strong>6.1</strong> Alıcı, İnternet Sitesi’nde yer alan
                        Sözleşme konusu malın temel nitelikleri, satış fiyatı ve
                        ödeme şekli ile teslimat ve kargo bedeline ilişkin
                        olarak Satıcı tarafından yüklenen ön bilgileri okuyup
                        bilgi sahibi olduğunu ve elektronik ortamda gerekli
                        teyidi verdiğini beyan eder.
                      </p>
                      <p>
                        <strong>6.2</strong> Alıcı, işbu Sözleşme’yi ve Ön
                        Bilgilendirme Formu’nu elektronik ortamda teyit etmekle,
                        mesafeli sözleşmelerin akdinden önce Satıcı tarafından
                        Alıcı’ya bildirilmesi gereken Sözleşme konusu mal veya
                        hizmetin temel niteliklerini; mal veya hizmetin tüm
                        vergiler dâhil toplam fiyatı, niteliği itibariyle
                        önceden hesaplanamıyorsa fiyatın hesaplanma usulü, varsa
                        tüm nakliye, teslim ve benzeri ek masraflar ile bunların
                        önceden hesaplanamaması halinde ek masrafların
                        ödenebileceği bilgisini; cayma hakkının olduğu
                        durumlarda, bu hakkın kullanılma şartları, süresi, usulü
                        ve Satıcı’nın iade için öngördüğü taşıyıcıya ilişkin
                        bilgiler ve cayma hakkının kullanılamadığı durumlarda,
                        cayma hakkından faydalanamayacağına ya da hangi
                        koşullarda cayma hakkını kaybedeceğine ilişkin bilgileri
                        edindiğini teyit etmektedir.
                      </p>
                      <p>
                        <strong>6.3</strong> Alıcı’nın, Sözleşme konusu malı
                        teslim almadan önce muayene etmeksizin tahrip olmuş,
                        kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı malı
                        kargo şirketinden teslim alması halinde sorumluluk
                        tamamen kendisine aittir. Alıcı tarafından teslim alınan
                        malın hasarsız olduğu kabul edilir. Teslimden sonra
                        malın özenle korunması borcu, Alıcı’ya aittir. Cayma
                        hakkı kullanılacaksa Alıcı malın paketini açmamalıdır ve
                        malı kullanılmamalıdır.
                      </p>
                      <h3>7. SATICI’NIN BEYAN VE TAAHHÜTLERİ</h3>
                      <p>
                        <strong>7.1</strong> Satıcı, İnternet Sitesi’nde ilan
                        edilen fiyatların ürünlerin satış fiyatı olduğunu
                        taahhüt eder. İlan edilen fiyatlar ve vaatler,
                        güncelleme yapılana ve değiştirilene kadar geçerlidir.
                        Süreli olarak ilan edilen fiyatlar ise belirtilen süre
                        sonuna kadar geçerlidir.
                      </p>
                      <p>
                        <strong>7.2</strong> Sözleşme konusu ürünlerin Alıcı’ya
                        gönderilmesi için satış bedelinin ödenmiş olması
                        şarttır. Herhangi bir nedenle satış bedeli ödenmez veya
                        banka kayıtlarında iptal edilir ise Satıcı, Sözleşme
                        konusu ürünlerin teslimi yükümlülüğünden kurtulmuş kabul
                        edilir.
                      </p>
                      <p>
                        <strong>7.3</strong> Satıcı, mücbir sebepler veya
                        nakliyeyi engelleyen olağanüstü durumlar nedeni ile
                        Sözleşme konusu malı süresi içinde teslim edemez ise,
                        durumu öğrendiği tarihten itibaren 3 (üç) gün içinde
                        Alıcı’ya bildirmekle yükümlüdür.
                      </p>
                      <h3>8. ROYAL CANIN CLUB</h3>
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
                        a. Ürünlerin otomatik olarak gönderilme sıklığı, Alıcı
                        tarafından belirlenir.
                      </p>
                      <p>
                        b. Program dahilindeki mama seçenekleri, tavsiye
                        niteliğindedir. Evcil hayvanın özel ihtiyaç ve
                        hassasiyetlerinin her zaman için göz önünde
                        bulundurulması ve en uygun sağlıklı beslenme çözümünü
                        öğrenmek için Veteriner Hekime danışılması önerilir.
                      </p>
                      <p>
                        c. Club programında önerilen ürünler tekli siparişe de
                        açık olup Alıcı’nın bu ürünleri satın alabilmesi için
                        Club programına dahil olmasına gerek bulunmamaktadır.
                      </p>
                      <p>
                        d. Club programı dahilinde haftaiçi her gün 09.00-18.00
                        saatleri arasında hizmet veren Beslenme Danışmanları
                        vardır. Bu danışmanlar, yalnızca veteriner hekim
                        muayenesi ve kontrolü gerektirmeyen evcil hayvan bakımı,
                        beslenmesi ve davranışları hakkında Club üyelerine
                        tavsiyelerde bulunur.
                      </p>
                      <p>
                        e. Alıcıya, Club programına dahil olduğunda ilk
                        teslimatında içinde battaniye, mama kabı, broşür içeren
                        hoşgeldin paketi sunulur. İlk siparişi takip eden her üç
                        siparişinde bir mama kabı, saklama kabı, bakım kiti gibi
                        Satıcı’nın takdirine göre belirlenecek hediyeler
                        sunulmaktadır. Söz konusu hediyeler burada sayılanlarla
                        sınırlı olmadığı gibi hediyelerin içeriğinde ve
                        sıralamasında değişiklik uygulanabilir.
                      </p>
                      <p>
                        f. Siparişlerin herhangi bir nedenle iadesi durumda ürün
                        ve hediyeler eksiksiz bir şekilde birlikte paket olarak
                        iade edilmelidir.
                      </p>
                      <p>
                        g. Alıcı, herhangi bir zamanda hiçbir değişiklik veya
                        iptal ücreti olmadan Club aboneliğini değiştirebilir
                        veya iptal edebilir. Alıcı’nın Club aboneliği
                        kapsamındaki ürünü değiştirmesi durumunda artık yeni
                        belirlenen ürünün fiyatı üzerinden ücretlendirme
                        yapılacaktır.
                      </p>
                      <p>
                        h. Alıcı, herhangi bir teslimatı bir sonraki sipariş
                        tarihinden en az bir gün önce atlamayı tercih edebilir.
                        Bu durumda söz konusu sipariş gönderilmeyecek ve
                        faturalanmayacaktır. Bu durumda ilgili teslimat
                        kapsamında bir hediye gönderilecekse, bu hediye bir
                        sonraki teslimat ile gönderilecektir. Ancak bu durumda
                        beslenme danışmanı tavsiyelerinden faydalanmaya devam
                        edebileceksiniz.
                      </p>
                      <p>
                        i. Alıcı, siparişin gönderilme tarihini, ilgili sipariş
                        oluşmadan önce değiştirebilir. Herhangi bir siparişe
                        ilişkin tarih değiştirildiğinde, sonraki siparişlerin
                        tarihleri otomatik olarak değiştirilmez.
                      </p>
                      <p>
                        j. Alıcı, Club programı kapsamındaki siparişlerin
                        teslimat veya fatura adresini, ilgili siparişi vermeden
                        önce değiştirebilir.
                      </p>
                      <p>
                        k. Club programı kapsamında satın alınan ürünlerin
                        teslimatı ücretsiz yapılacaktır.
                      </p>
                      <p>
                        l. Club programı kapsamındaki ürünlerden herhangi
                        birinin ücretinde artış olduğu takdirde Alıcı’ya bu
                        değişikliği bildirmek ve söz konusu satın almaya devam
                        etmek isteyip istemediğinin onayını almak üzere e-posta
                        gönderilecektir. Alıcı’nın bu bildirimi almasından
                        itibaren yedi (7) gün içinde fiyat artışını kabul
                        etmemesi durumunda Satıcı söz konusu siparişi işleyeme
                        koyamayacak ve gönderemeyecektir. Alıcı’nın yedi (7) gün
                        içinde fiyat artışını kabul etmediğine dair bir
                        bildirimde bulunmaması halinde takip eden siparişleri,
                        yeni fiyat üzerinden ücretlendirilecektir.
                      </p>
                      <p>
                        m. Alıcı, Club programı kapsamında satın aldığı ürünler
                        için yalnızca kredi kartı ve/veya banka kartı ile ödeme
                        yapabilir. Alıcı’nın kart bilgileri abonelik programına
                        kayıt için gerekli olacaktır ve bu bilgiler Satıcı’nın
                        ödeme hizmeti sağlayıcısı tarafından kaydedilecektir.
                        Alıcı bu bilgilerini her zaman hesabından değiştirebilir
                        ve takip eden siparişlerde yeni kartı kullanılır.
                      </p>
                      <p>
                        n. Alıcı’nın ödeme için kaydetmiş olduğu kartının
                        geçerliliği sona erdiğinde Alıcı, kart bilgilerini
                        güncellemesi için otomatik bir e-posta alacaktır.
                        Alıcı’nın kartının geçerlilik süresi sona ermesine
                        rağmen kart bilgilerini güncellememesi durumunda Satıcı,
                        abonelik konusu siparişi işleme koyamayacak ve
                        gönderemeyecektir.
                      </p>
                      <p>
                        o. Alıcı’nın kartına ilişkin ödeme onayı her bir sipariş
                        için kontrol edilecektir ve ödeme, Alıcı’nın siparişi
                        oluştuğunda tahsil edilecektir. Ödemeye ilişkin herhangi
                        bir problem olduğu takdirde ödeme bilgilerini
                        güncellemesi için Alıcı ile iletişime geçilecektir.
                        Satıcı, ödeme bilgilerini güncellemesi için Alıcı’ya
                        ulaşamadığı takdirde Satıcı, abonelik konusu siparişi
                        işleme koyamayacak ve gönderemeyecektir.
                      </p>
                      <p>
                        p. Alıcı’nın aboneliği kapsamındaki bir ürünün geçici
                        olarak stok dışı olması durumunda bu husus Alıcı’ya
                        bildirilecek ve söz konusu ürün stoka girene kadar
                        siparişleri işleme koyulamayacaktır. Alıcı’nın aboneliği
                        kapsamındaki bir ürünün süresiz olarak stok dışı olması
                        durumunda bu husus Alıcı’ya bildirilecek ve Alıcı’nın
                        söz konusu ürün hakkındaki aboneliği otomatik olarak
                        iptal edilecektir. Alıcı’nın böyle bir durumda
                        Satıcı’dan herhangi bir talep hakkı bulunmamaktadır.
                        Hediyeler ise ürün kapsamında sayılmaz, stok durumuna
                        veya Satıcı’nın takdirine göre hediyeler üründen ayrı
                        şekilde veya daha sonraki bir zamanda gönderilebilir.
                      </p>

                      <h3>9. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h3>
                      <p>
                        <strong>9.1</strong> İşbu Sözleşme’nin uygulanmasında,
                        Gümrük ve Ticaret Bakanlığınca ilan edilen değere kadar,
                        Alıcı’nın ürünü satın aldığı ve ikametgâhının bulunduğu
                        yerdeki Tüketici Hakem Heyetleri ile Tüketici
                        Mahkemeleri yetkilidir. 6502 Sayılı Tüketicinin
                        Korunması Hakkında Kanun’un 68/1. maddesinde belirtilen
                        alt ve üst limitler doğrultusunda tüketici talepleri
                        hakkında ilçe/il tüketici hakem heyetleri yetkilidir.
                      </p>
                    </div>
                    <h3>10. YÜRÜRLÜK </h3>
                    <p>
                      İşbu Sözleşme, taraflarca okunarak {currentDate} tarihinde
                      Alıcı tarafından elektronik ortamda onaylanmak suretiyle
                      akdedilmiş ve yürürlüğe girmiştir.
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
