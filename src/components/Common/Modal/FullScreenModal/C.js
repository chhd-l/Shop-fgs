import React, { useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { paymentStore } = useLocalStore(() => stores);
  const { fullScreenModalC } = paymentStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalC ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalC')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm  rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      İNTERNET SİTESİ MÜŞTERİLERİ/ ÜYELERİNİN KİŞİSEL
                      VERİLERİNİN İŞLENMESİ
                    </h2>
                    <h2 className="rc-beta text-center">
                      HAKKINDA AYDINLATMA METNİ
                    </h2>
                    <p>Değerli Müşterilerimiz/Üyelerimiz,</p>
                    <p>
                      Royal Canin Turkey Evcil Hayvan Ürünleri Ticaret Limited
                      Şirketi (“<strong>Royal Canin</strong>”) olarak kişisel
                      verilerinizin korunmasına büyük önem atfetmekteyiz. Bu
                      kapsamda 6698 sayılı Kişisel Verilerin Korunması Kanunu (“
                      <strong>KVKK</strong>”) uyarınca “veri sorumlusu”
                      sıfatıyla kişisel verilerinizi KVKK’ya uygun olarak ve
                      aşağıda belirtilen amaçlar ve sınırlar kapsamında
                      işlemekte ve buna uygun gerekli idari ve teknik tedbirleri
                      almaya son derece özen göstermekteyiz. Bu kapsamda bu
                      İnternet Sitesi Müşterileri/Üyelerinin Kişisel Verilerinin
                      İşlenmesi Hakkında Aydınlatma Metni (“
                      <strong>Aydınlatma Metni</strong>”) vasıtasıyla kişisel
                      verilerinizi işleme süreçlerimiz ve KVKK tahtındaki
                      haklarınız ile ilgili olarak sizleri bilgilendirmek
                      isteriz.
                    </p>
                    <p>
                      Bu metin altında www.royalcanin.com/tr adresli Royal Canin
                      internet sitesi üzerinden üyelik oluşturmanız, internet
                      sitemiz üzerinden (üyelik oluşturarak veya oluşturmadan)
                      alışveriş yapmanız, ticari iletişim kanalları ile genel ve
                      kişiye özel kampanya bilgilendirmelerin yapılmasını kabul
                      etmeniz ve iletişim kanallarımız üzerinden karşılıklı
                      olarak iletişime geçmemiz halinde kişisel veri işleme
                      süreçlerine ilişkin aydınlatılmanız amaçlanmıştır.
                    </p>
                    <p>
                      <strong style={{ textDecoration: 'underline' }}>
                        İşlediğimiz Kişisel Verileriniz
                      </strong>
                    </p>
                    <p>
                      www.royalcanin.com/tr adresli internet sitemiz üzerinden
                      gerçekleştireceğiniz üyelik işlemi ve/veya ürün satın alma
                      işlemleri, ticari iletişim kanalları ile genel ve kişiye
                      özel kampanya bilgilendirmelerin yapılmasını kabul etmeniz
                      ve iletişim kanallarımız üzerinden karşılıklı olarak
                      iletişime geçmemiz kapsamında aşağıda sayılı kişisel
                      verilerinizi işlemekteyiz:
                    </p>
                    <p>
                      <strong>a. Kimlik Bilgileri: </strong>
                      Unvan, ad ve soyadı
                    </p>
                    <p>
                      <strong>b. İletişim Bilgileri: </strong>
                      Adres, telefon numarası, e-posta adresi
                    </p>
                    <p>
                      <strong>c. Mali Bilgiler: </strong>
                      Vergi dairesi bilgileri, fatura detayları, şahıs
                      şirketleri açısından şahıs şirketi unvanı
                    </p>
                    <p>
                      <strong>d. Müşteri İşlem Bilgileri: </strong>
                      Müşteri numarası, satın alınan ürünlerin adı, boyutu ve
                      adedi, satış tutarı, işlem tarihi ve zamanı, ödeme
                      detayları, sipariş numarası, yararlanılan bir
                      promosyon/indirim var ise buna ilişkin kullanılan
                      promosyon kodu
                    </p>
                    <p>
                      <strong>e. Abonelik Bilgileri: </strong>
                      Abonelik numarası, abonelik oluşturulan ürün(ler),
                      teslimat sıklığı, abonelik oluşturma{' '}
                      <strong>Abonelik Bilgileri:</strong> [ve sona erme]
                      tarihi, abonelik durumu (aktif/pasif), mevcut ise
                      aboneliğe özgü ürünün indirimli ücreti, sonraki teslimat
                      tarihi
                    </p>
                    <p>
                      <strong>f. Evcil Hayvan Bilgileri: </strong>
                      Tercihinize bağlı olarak internet sitemizde belirttiğiniz,
                      evcil hayvanınıza ilişkin cins, ırk, cinsiyet, yaş,
                      kısırlaştırılıp kısırlaştırılmadığı bilgisi, mevcut ise
                      evcil hayvanın özel ihtiyaçlarına ilişkin bilgiler
                    </p>
                    <br />
                    <br />
                    <p>
                      Kişisel verilerin işlenmesi KVKK kapsamında kişisel
                      veriler üzerinde, toplama, kayıt, depolama, saklama,
                      değiştirme, yeniden düzenleme, açıklama, aktarma,
                      devralma, geri alınabilir kılma, sınıflandırma veya
                      bunların kullanımının önlenmesi gibi kısmen veya tamamen
                      otomatik yöntemlerle veya sürecin herhangi bir veri kayıt
                      sisteminin parçası olması şartıyla otomatik olmayan
                      yöntemlerle gerçekleştirilen herhangi bir işlem olarak
                      tanımlanmıştır.
                    </p>
                    <p>
                      <strong>g. Ses Kaydı: </strong>
                      Müşteri hizmetleri departmanımız, çağrı merkezimiz veya
                      diğer başvuru yolları aracılığıyla yaptığınız görüşmeler
                      kapsamında alınan ses kayıtları
                    </p>
                    <p>
                      <strong>h. Pazarlama Bilgileri: </strong>
                      İl-ilçe şeklinde demografik bilgiler, internet sitesindeki
                      bildirimlere/anketlere/tekliflere/kampanyalara karşı
                      yaklaşımlar, alışkanlıklar, favoriler, beğeniler,
                      davranışlar, tercihler, arama hareketleri, segmentler,
                      önceki alışverişler, çerez kayıtları, çerez ve reklam
                      tanıtıcısı/kimliği bilgileri ve cihaz ID, iletişim
                      tercihleri, alışveriş tutarı, ödeme yöntemi tercihi,
                      ödemenin gerçekleştiği banka bilgisi, anket cevapları
                    </p>
                    <p>
                      <strong>i. İşlem Güvenliği Bilgileri: </strong>
                      Kullanıcı adı ve şifre, IP adresi, internet sitesi giriş
                      ve çıkış/ziyaret bilgileri, Royal Canin’e KVKK tahtında
                      verdiğiniz ve/veya ticari iletişimlerle ilgili verdiğiniz
                      izin/rızalara ilişkin log kayıtları, sözleşme onayına
                      ilişkin log kayıtları
                    </p>
                    <p>
                      <strong>j. Hukuki İşlem Bilgileri: </strong>
                      Royal Canin ile aranızda bir uyuşmazlık olması durumunda
                      bu uyuşmazlık sürecine ilişkin yazışma ve dosya bilgileri
                    </p>
                    <p>
                      <strong>k. Diğer Bilgiler: </strong>
                      Kredi/banka kartı bilgileri (kartta belirtilen adı-soyadı,
                      kart numarası, güvenlik kodu, son kullanma tarihi),
                      şirkete iletilecek talep ve şikayetler ve bu kapsamda
                      paylaşılacak bilgiler
                    </p>
                    <p>
                      (Metin içerisinde yukarıda sayılı verilerin hepsi birlikte
                      “<strong>Kişisel Veri</strong>” olarak anılacaktır.)
                    </p>
                    <p>
                      <strong style={{ textDecoration: 'underline' }}>
                        Kişisel Verilerinizin Toplanma Yöntemi{' '}
                      </strong>
                    </p>
                    <p>
                      Kişisel Verileriniz, www.royalcanin.com/tr adresli
                      internet sitemize üyelik kaydınız, üye girişiniz ve/veya
                      internet sitemiz üzerinden gerçekleştireceğiniz ürün alım
                      işlemleri, bu işlemler esnasında doldurulan formlar, bu
                      internet sitesi üzerinden Royal Canin ile iletişime
                      geçebilmeniz için doldurulan iletişim formları, kullanılan
                      çerezler (cookie) kapsamında internet sitesi üzerinden ve
                      internet sitesi üyeliğinizi Facebook veya Google
                      hesabınızla yapmayı tercih etmeniz halinde kullanılan
                      sosyal ağ bağlantılarından aşağıda belirtilen amaçlar
                      çerçevesinde Royal Canin birimleri tarafından otomatik
                      yöntemlerle toplanmakta ve işlenmektedir. Buna ek olarak,
                      Royal Canin müşteri hizmetleri ile herhangi bir şekilde
                      iletişime geçmeniz halinde (yazılı başvuru veya doğrudan
                      departman ve/veya çağrı merkezi operatörü ile yapılan
                      telefon görüşmeleri de dahil olmak üzere), bu iletişim
                      kapsamında, iletişim yönteminize bağlı olarak sözlü,
                      yazılı veya elektronik ortamda ileteceğiniz Kişisel
                      Verileriniz, yapılan iletişimin yöntemine göre otomatik
                      veya otomatik olmayan yöntemlerle toplanmakta ve Royal
                      Canin sistemlerine kaydedilmesi ile otomatik yöntemlerle
                      işlenmektedir.
                    </p>
                    <p>
                      <strong style={{ textDecoration: 'underline' }}>
                        Kişisel Verilerinizin İşlenme Amaçları ve Hukuki
                        Sebepleri
                      </strong>
                    </p>
                    <p>
                      <strong>
                        İnternet Sitemiz Üzerinden Alışveriş Yapmanız Halinde
                        Kişisel Verilerinizin İşlenmesi
                      </strong>
                    </p>
                    <p>
                      www.royalcanin.com/tr adresli internet sitemizde (üye
                      olarak veya üye olmaksızın) bir satın alma işlemi
                      gerçekleştirdiğinizde:
                    </p>
                    <p>
                      - Siparişin oluşturulması, mesafeli satış sözleşmesinin
                      yapılması, mesafeli satış sözleşmesi kapsamındaki
                      alışveriş işleminin gerçekleştirilmesi ve sözleşmenin
                      gereğinin yerine getirilmesi, sipariş hazırlama,
                      paketleme, sevk irsaliyesi hazırlama, kargolama ve
                      siparişinizin size ulaştırılabilmesi, düzenlenen faturanın
                      iletilmesi, sipariş iptal taleplerinin incelenmesi ve
                      yerine getirilebilmesi, gerekli ise iade veya ürün
                      incelemesi gibi operasyonel işlemlerin organizasyonu ve
                      yerine getirilebilmesi, sipariş ve iade süreçleri
                      kapsamında sizinle irtibata geçilebilmesi amaçlarıyla
                      Kimlik Bilgileriniz, İletişim Bilgileriniz, Müşteri İşlem
                      Bilgileriniz ve Mali Bilgileriniz,
                    </p>
                    <p>
                      - Satın alma işleminin ödeme adımında kredi/banka kartı
                      ile ödeme işlemi kapsamında ödeme işleminizin
                      gerçekleştirilmesi, onay alınması, ödemenin
                      alınması/tahsili ve (gerektiğinde) iade gerçekleştirilmesi
                      amaçlarıyla Kimlik Bilgileriniz ile kredi/banka kartı
                      bilgileriniz, (Kredi kartı bilgileriniz şirketimizde
                      kaydedilmeden ödeme kuruluşuna aktarılacak ve ödeme
                      kuruluşu tarafından saklanacaktır.)
                    </p>
                    <p>
                      - Mali defterler ve kayıtların usulüne uygun şekilde
                      tutulması, faturaların düzenlenmesi ve yapılan satış
                      işlemine ilişkin olarak mevzuattaki yükümlülüklerin yerine
                      getirilebilmesi, finans ve muhasebe işlemlerinin
                      yürütülebilmesi amaçlarıyla adınız, soyadınız, adresiniz,
                      Mali Bilgileriniz, Müşteri İşlem Bilgileriniz,
                    </p>
                    <p>
                      - İşlem güvenliği sağlanması amacıyla alışveriş işleminize
                      ilişkin log kayıtları ve IP adresiniz
                    </p>
                    <p>
                      Royal Canin tarafından bir sözleşmenin kurulması veya
                      ifasıyla doğrudan doğruya ilgili olması kaydıyla,
                      sözleşmenin taraflarına ait kişisel verilerin işlenmesinin
                      gerekli olması, veri sorumlusunun hukuki yükümlülüklerini
                      yerine getirebilmesi için zorunlu olması ve temel hak ve
                      özgürlüklerinize zarar verilmemesi kaydıyla veri
                      sorumlusunun meşru menfaati için veri işlemenin zorunlu
                      olması hukuki sebepleriyle işlenmektedir
                    </p>
                    <p>
                      İnternet sitemiz üzerinde bir üyelik oluşturmanız ve
                      alışverişinizi bu üyelik üzerinden gerçekleştirmeniz
                      durumunda yukarıdakilere ek olarak üyeliğinize ilişkin
                      bilgiler de işlenecektir. (
                      <em>
                        İnternet sitemize üye olmanız durumunda üyelik
                        kapsamında kişisel verilerinizin işlenmesi ile ilgili
                        lütfen bir sonraki başlığı inceleyiniz.
                      </em>
                      )
                    </p>
                    <p>
                      Siparişin farklı bir kişi adına teslim edilecek olması
                      durumunda, (yukarıdaki bilgilere ek olarak) sipariş
                      hazırlama, paketleme, sevk irsaliyesi hazırlama, kargolama
                      ve siparişinizin ulaştırılabilmesi amaçlarıyla, teslimat
                      yapılacak kişinin adı-soyadı, adres ve telefon bilgisi
                      ilgili kişinin temel hak ve özgürlüklerine zarar
                      verilmemesi kaydıyla veri sorumlusunun meşru menfaati için
                      veri işlemenin zorunlu olması hukuki sebebine dayanılarak
                      işlenmektedir.
                    </p>
                    <p>
                      <strong>
                        İnternet Sitemiz Üzerinden Bir Üyelik Oluşturmanız
                        Halinde Üyelik ile İlgili Kişisel Verilerinizin
                        İşlenmesi
                      </strong>
                    </p>
                    <p>
                      www.royalcanin.com/tr adresli Royal Canin internet
                      sitesinde bir üyelik oluşturmaya karar vermeniz durumunda,
                      üyelik işlemlerinin gerçekleştirilmesini sağlamak, sizinle
                      akdedeceğimiz üyelik sözleşmesinin/Şartlar ve Koşullar’ın
                      gereğini yerine getirmek, üye girişinin yapılabilmesi,
                      üyelik bilgilendirmesinin yapılabilmesi amaçlarıyla Kimlik
                      Bilgileriniz, e-posta adresiniz ve şifreniz, üyeliğinizi
                      Facebook veya Google hesabınızla yapmanız halinde zorunlu
                      olarak tarafımıza aktarılan Facebook veya Google ID
                      bilgisi; üye olarak internet sitesi üzerinden alışveriş
                      yapmak istendiğinde her alışveriş işleminde tekrar bilgi
                      girilmesine gerek kalmaksızın alışveriş yapmanızı
                      sağlayabilmek amacıyla ve bu bilgileri üyeliğinize
                      kaydetmiş olmanız durumunda Kimlik Bilgileriniz ve
                      İletişim Bilgileriniz; üye olarak tarafınıza sipariş
                      geçmişinizi görüntüleme imkanı verebilmek amacıyla önceki
                      alışverişlerinize ilişkin Müşteri İşlem Bilgileriniz, bir
                      sözleşmenin kurulması veya ifasıyla doğrudan doğruya
                      ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel
                      verilerin işlenmesinin gerekli olması ve temel hak ve
                      özgürlüklerinize zarar verilmemesi kaydıyla veri
                      sorumlusunun meşru menfaati için veri işlemenin zorunlu
                      olması hukuki sebepleriyle işlenmektedir.
                    </p>
                    <p>
                      <em>
                        (İnternet sitesi üzerinden alışveriş yapılması süreci
                        kapsamında işlenen kişisel veriler için ek olarak lütfen
                        bir önceki başlığı inceleyiniz.)
                      </em>
                    </p>
                    <p>
                      İnternet sitemize üyeliğe ek olarak Royal Canin nezdinde
                      abonelik oluşturarak (Royal Canin Club’a katılarak) Royal
                      Canin’in seçtiğiniz ürünlerini belirlediğiniz aralıklar
                      ile otomatik olarak satın ve teslim almak istemeniz
                      durumunda, (yukarıda belirtilen üyelik ve internet sitesi
                      üzerinden ürün satın alma işlemleri ve bu süreçlere
                      ilişkin veri işleme süreçleri saklı kalmak üzere) abonelik
                      kaydınızın oluşturulması, belirlediğiniz aralıklar ile
                      ürünlerin teslimi, buna ilişkin ücretlerin tahsili
                      amacıyla, Kimlik Bilgileriniz, İletişim Bilgileriniz,
                      Abonelik Bilgileriniz, Evcil Hayvan Bilgileriniz ve kredi
                      kartı bilgileri (isim, soyisim, kredi kartının son 4 hane
                      bilgisi) bir sözleşmenin kurulması veya ifasıyla doğrudan
                      doğruya ilgili olması kaydıyla, sözleşmenin taraflarına
                      ait kişisel verilerin işlenmesinin gerekli olması hukuki
                      sebebiyle işlenmektedir.
                    </p>
                    <p>
                      Genel veya size özel kişiselleştirilmiş kampanyalar,
                      avantajlar, reklamların oluşturulması, kampanya, yarışma,
                      çekiliş ve diğer etkinliklerin düzenlenmesi, segmentasyon,
                      profilleme, raporlama, pazarlama ve analiz çalışmalarının
                      yapılması, [Royal Canin internet sitesi veya diğer üçüncü
                      taraf ortamlarda Royal Canin’e ait reklamların ve
                      pazarlama/iletişim faaliyetlerinin (internet sitesindeki
                      bildirimler, pop-up gösterimi, kişiye özel teklifler,
                      reklam, anket vs.) yapılması] ve internet sitesi
                      üzerindeki kullanıcı deneyimini iyileştirmek amaçlarıyla
                      adınız-soyadınız, telefon numaranız/e-posta adresiniz ve
                      Pazarlama Bilgileriniz buna ilişkin olarak vereceğiniz
                      açık rızaya dayanarak işlenmektedir.
                    </p>
                    <p>
                      <strong>
                        Royal Canin’e Ticari İletişim İzni Vermeniz Halinde
                        Kişisel Verilerinizin İşlenmesi
                      </strong>
                    </p>
                    <p>
                      Royal Canin’e herhangi bir kanaldan ticari elektronik
                      iletişim izni/rızası vermeniz halinde, Royal Canin
                      tarafından yürütülen genel veya özel kişiselleştirilmiş
                      kampanyalar, promosyonlar, ürün ve hizmet tanıtımları,
                      yarışma, çekiliş ve etkinliklerden haberdar olmanız, anket
                      çalışmaları ve haber bültenlerini almanız, müşteri
                      memnuniyeti uygulamalarının sunumu, reklamlar,
                      bilgilendirmeler, pazarlama faaliyetleri kapsamında
                      seçeceğiniz kanallar üzerinden (SMS, e-posta, telefon
                      araması) ticari iletişim faaliyetlerinde bulunulabilmesi
                      amaçlarıyla adınız soyadınız, telefon numaranız, e-posta
                      adresiniz, ticari elektronik ileti izni ve buna ilişkin
                      kişisel verilerinizin işlenmesine ilişkin onaya ilişkin
                      bilgiler, ticari elektronik ileti iznini fiziki bir form
                      doldurarak vermiş olmanız halinde imzanız açık rızanıza
                      dayanılarak işlenecektir.
                    </p>
                    <p>
                      Vermiş olduğunuz bu onay kendi takdirinizde olup;
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
                      <strong>
                        Royal Canin ile Olan İletişimleriniz Halinde Kişisel
                        Verilerinizin İşlenmesi
                      </strong>
                    </p>
                    <p>
                      Royal Canin’in müşteri hizmetleri/çağrı merkezi, e-posta,
                      internet sitesindeki iletişim formu ve benzeri kanallar
                      ile iletişim kurmanız durumunda, talep ve şikayetlerinizin
                      kaydedilmesi, incelenmesi, değerlendirilmesi ve yerine
                      getirilmesi, hizmet/işlem güvenliğinin sağlanabilmesi,
                      gerektiğinde bunlara ilişkin olarak sizinle tekrar
                      iletişime geçilmesi, bu kapsamda ürünler hakkında
                      değerlendirme/geri bildirim/şikayet süreçlerinin
                      yönetilmesi ve müşteri memnuniyetinin sağlanması,
                      hizmet/işlem güvenliğini sağlayabilmek amacıyla, Ses
                      Kaydınız, Kimlik Bilgileriniz, İletişim Bilgileriniz,
                      talep ve şikayetiniz ve bu kapsamda aktaracağınız
                      bilgiler, iletişime geçme amacınıza bağlı olarak Müşteri
                      İşlem Bilgileriniz, Evcil Hayvan Bilgileriniz, Abonelik
                      Bilgileriniz, ilgili ise Hukuki İşlem Bilgileri sizlerin
                      temel hak ve özgürlüklerine zarar vermemek kaydıyla Royal
                      Canin’in meşru menfaati için gerekli olması hukuki
                      sebebine dayanılarak işlenmektedir. Bu verileriniz ayrıca
                      Royal Canin ile aranızda doğabilecek bir uyuşmazlık
                      halinde delil olarak kullanılmak üzere bir hakkın tesisi,
                      kullanılması veya korunması için veri işlemenin zorunlu
                      olması hukuki sebebine dayanılarak işlenmektedir.
                    </p>
                    <p>
                      <strong>
                        Yasal Süreçler ve Kurum içi Faaliyetler Kapsamında
                        Kişisel Verilerinizin İşlenmesi
                      </strong>
                    </p>
                    <p>
                      - Mevzuattan kaynaklanan yükümlülüklerimizi yerine
                      getirmek, yetkili ve görevli kamu kurum ve kuruluşlarına
                      karşı hukuki yükümlüklerimizi yerine getirmek, bu kapsamda
                      gerekli kayıt ve belgeleri oluşturmak ve saklamak,
                      gerektiğinde yetkili ve görevli kamu/resmi kurum ve
                      kuruluşlarına bilgi vermek amaçlarıyla Kimlik
                      Bilgileriniz, İletişim Bilgileriniz, Mali Bilgileriniz,
                      Müşteri İşlem Bilgileriniz, (mevcut ise Abonelik
                      Bilgileriniz) ve İşlem Güvenliği Bilgileriniz veri
                      sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi
                      için zorunlu olması hukuki sebebiyle işlenmektedir.
                    </p>
                    <p>
                      - Olası bir şikayet veya doğacak uyuşmazlıklarda mahkeme,
                      icra dairesi, hakem heyeti, Kişisel Verileri Koruma
                      Kurumu, Ticaret Bakanlığı gibi resmi kurum ve kuruluşlara
                      karşı her türlü cevap, itiraz ve dava hakkının
                      kullanılması, arabuluculuk süreçleri de dahil
                      uyuşmazlıklara ilişkin görüşme ve anlaşma süreçlerinin
                      yürütülmesi, tüm bu süreçlerde delil olarak
                      kullanılabilmesi, yetkili kamu/resmi kurum ve kuruluşların
                      tarafımızdan bilgi talep etmesi halinde gerekli bilgilerin
                      temin edilebilmesi, sizlerin tarafımızdan bilgi talep
                      etmesi veya yasal haklarınız kapsamında başvuruda
                      bulunmanız halinde gerekli bilgilerin tarafınıza temin
                      edilebilmesi amaçlarıyla Kimlik Bilgileriniz, İletişim
                      Bilgileriniz, Mali Bilgileriniz, Müşteri İşlem
                      Bilgileriniz, sınırlı kredi/banka kartı bilginiz, (mevcut
                      ise Abonelik Bilgileriniz), İşlem Güvenliği Bilgileriniz,
                      Ses Kaydınız, talep ve şikayetleriniz, internet sitesine
                      üyeliğinizi Facebook veya Google hesabınızla yapmanız
                      halinde zorunlu olarak tarafımıza aktarılan Facebook veya
                      Google ID bilgisi, (olay/talep ile ilgili ise Evcil Hayvan
                      Bilgileriniz) ve Hukuki İşlem Bilgileri bir hakkın tesisi,
                      kullanılması veya korunması için veri işlemenin zorunlu
                      olması ve temel hak ve özgürlüklerinize zarar vermemek
                      kaydıyla, veri sorumlusunun meşru menfaatleri için veri
                      işlenmesinin zorunlu olması hukuki sebepleriyle
                      işlenmektedir.
                    </p>
                    <p>
                      - Kurum içi denetim, iç kontrol, uyum ve raporlama
                      çalışmaları kapsamında Kimlik Bilgileriniz, İletişim
                      Bilgileriniz, Mali Bilgileriniz, Müşteri İşlem
                      Bilgileriniz, (mevcut ise Abonelik Bilgileriniz), İşlem
                      Güvenliği Bilgileriniz ve Hukuki İşlem Bilgileri veri
                      sorumlusunun hukuki yükümlülüklerini yerine getirebilmesi
                      için zorunlu olması ve temel hak ve özgürlüklerinize zarar
                      vermemek kaydıyla, veri sorumlusunun meşru menfaatleri
                      için veri işlenmesinin zorunlu olması hukuki sebebiyle
                      işlenmektedir.
                    </p>
                    <p>
                      - İnternet sitemizdeki satış, ziyaret ve üyeliklere
                      ilişkin istatistik tutulması, satış ve pazarlama
                      analizleri yapılması, stratejik planlama ve ticari
                      politikaların belirlenmesi, müşteri deneyimini
                      iyileştirmeye yönelik çalışma ve geliştirmeler yapılması
                      amaçlarıyla Müşteri İşlem Bilgileriniz, Abonelik
                      Bilgileriniz, internet sitesi ziyaret bilginiz ve
                      Pazarlama Bilgileriniz temel hak ve özgürlüklerinize zarar
                      vermemek kaydıyla, veri sorumlusunun meşru menfaatleri
                      için veri işlenmesinin zorunlu olması hukuki sebebiyle
                      işlenmektedir.
                    </p>
                    <p>
                      <strong style={{ textDecoration: 'underline' }}>
                        Kişisel Verilerinizin Aktarımı
                      </strong>
                    </p>
                    <p>
                      Kimlik Bilgileriniz ve İletişim Bilgileriniz, sipariş
                      ettiğiniz ürünlerin siparişte belirtilen adrese
                      ulaştırılması için sipariş teslimatının yapılacağı esnada
                      kargo ve/veya taşımacılık hizmeti aldığımız hizmet
                      sağlayıcı firma ile paylaşılmaktadır.
                    </p>
                    <p>
                      Satın alma işleminin ödeme adımında, kredi/banka kartı
                      bilgileriniz, ödeme işleminizi gerçekleştirmek, onay
                      almak, ödemeyi almak ve (gerektiğinde) iadeleri
                      gerçekleştirmek için ödeme kuruluşu tarafından
                      işlenmektedir ve saklanmaktadır.
                    </p>
                    <p>
                      Siparişiniz ile ilgili faturanın oluşturularak saklanması
                      kapsamında Kimlik Bilgileri, İletişim Bilgileri, Mali
                      Bilgiler ve Müşteri İşlem Bilgileri e-fatura ve e-arşiv
                      fatura hizmeti sağlayıcıları ile paylaşılmaktadır.
                    </p>
                    <p>
                      Kişisel Verileriniz, internet sitemiz ve Royal Canin
                      sistemleri ile ilgili yazılım ve hizmet desteği aldığımız
                      bilişim teknolojileri hizmet sağlayıcıları (veri tabanı ve
                      sunucu hizmeti sağlayıcıları, izleme/hedefleme
                      teknolojileri destek sağlayıcıları,
                      pazarlama/reklam/analiz faaliyetleri destek sağlayıcıları,
                      kimlik doğrulama hizmet sağlayıcıları, e-fatura
                      entegrasyon firması, elektronik ileti aracı hizmet
                      sağlayıcıları, aracı yazılım hizmet sağlayıcıları,
                      arşivleme hizmeti verenler) ve şirketin denetim süreçleri
                      kapsamında denetim hizmeti sağlayıcı firmalar ile
                      paylaşılmaktadır.
                    </p>
                    <p>
                      İnternet sitesi üzerinden satışlar ve Royal Canin
                      sistemleri ile ilgili kullanılan çeşitli yazılımların ve
                      hizmet alınan hizmet verenlerin (veri tabanı ve sunucu
                      hizmeti sağlayıcıları, izleme/hedefleme teknolojileri
                      destek sağlayıcıları, pazarlama/reklam/analiz faaliyetleri
                      destek sağlayıcıları, kimlik doğrulama hizmet
                      sağlayıcıları, aracı yazılım hizmet sağlayıcıları,
                      arşivleme hizmeti verenler) kullandığı sunucuların
                      yurtdışında olması sebebiyle Kimlik Bilgileriniz, İletişim
                      Bilgileriniz, Müşteri İşlem Bilgileriniz, Mali
                      Bilgileriniz, kredi kartı numaranızın son dört hanesi ile
                      son kullanma tarihi, Abonelik Bilgileriniz, Evcil Hayvan
                      Bilgileriniz, Pazarlama Bilgileriniz, İşlem Güvenliği
                      Bilgileriniz ve Hukuki İşlem Bilgileri yurtdışına
                      aktarılmaktadır.
                    </p>
                    <p>
                      Mevcut ve ileride üyemiz/müşterimiz olacak kişiler ile
                      diğer üçüncü kişilerin www.royalcanin.com/tr adresli
                      internet sitemiz ile ilgili üyelik, ürün alımı, abonelik
                      veya Royal Canin ürünlerine ilişkin olarak herhangi bir
                      soru, şikayet, talep veya önerileri ile ilgili olarak
                      bizimle bağlantıya geçebilmeleri için bir müşteri
                      ilişkileri çağrı merkezi firmasından destek hizmet
                      alınmaktadır. Kimlik Bilgileriniz, İletişim Bilgileriniz,
                      Müşteri İşlem Bilgileriniz, Evcil Hayvan Bilgileriniz,
                      Abonelik Bilgileriniz çağrı merkezi hizmetlerinin yerine
                      getirilebilmesi için ve gereken ölçüde çağrı merkezi
                      hizmeti aldığımız firma ile paylaşılacaktır.
                    </p>
                    <p>
                      Royal Canin’e herhangi bir kanaldan ticari iletişim
                      izni/rızası vermeniz halinde, adınız soyadınız, tarafınız
                      ile iletişime geçilmesi ile ilgili olarak tercih etmiş
                      olduğunuz iletişim yöntemine bağlı olarak telefon
                      numaranız ve/veya e-posta adresiniz, ticari elektronik
                      iletilerin tarafınıza gönderilebilmesi için Royal Canin’in
                      ticari elektronik ileti gönderilmesi ile ilgili olarak o
                      dönemde destek hizmet aldığı mobil medya şirketi, ajans
                      veya pazarlama şirketi ile destek alınan bilgi
                      teknolojileri şirketleri ve danışmanlar ile; telefon
                      numaranız ve/veya e-posta adresiniz ile Royal Canin’e
                      verdiğiniz ticari elektronik ileti iznine ilişkin bilgiler
                      Royal Canin’in Ticari İletişim ve Ticari Elektronik
                      İletiler Hakkında Yönetmelik tahtındaki yükümlülüklerine
                      yerine getirmek için Yönetmelik’e göre yetkilendirilmiş
                      kuruluş ve bu kuruluşa bilgi aktarımı için aracı hizmet
                      sağlayıcı kuruluşlar ve aracı yazılımlar ile ilgili destek
                      aldığımız bilgi teknolojileri şirketleri ve danışmanlar
                      ile gerekli olduğu ölçüde paylaşılmaktadır.
                    </p>
                    <p>
                      Kişisel Verileriniz, mevzuattan kaynaklanan
                      yükümlülüklerimizi yerine getirmek, yetkili ve görevli
                      kamu kurum ve kuruluşlarına karşı bilgi vermek dahil ve
                      ilgili sair hukuki yükümlüklerimizi yerine getirmek
                      amacıyla, gerekli olduğu ölçüde ilgili kamu/resmi kurum ve
                      kuruluşlar ile paylaşılmaktadır. Ek olarak olası bir
                      şikayet veya doğacak uyuşmazlıklarda mahkeme, icra
                      dairesi, hakem heyeti, Kişisel Verileri Koruma Kurumu,
                      Ticaret Bakanlığı gibi resmi kurum ve kuruluşlara karşı
                      her türlü cevap, itiraz ve dava hakları gibi yasal
                      haklarımızın kullanılması, arabuluculuk süreçleri de dahil
                      uyuşmazlıklara ilişkin görüşme ve anlaşma süreçlerinin
                      yürütülmesi amaçlarıyla, ilgili olduğu ölçüde ilgili
                      kamu/resmi kurum ve kuruluşlar ve adli makamlar ile ve
                      konu ile ilgili hizmet aldığımız avukatlarımız/hukuk
                      danışmanlarımız ile paylaşılacaktır.
                    </p>
                    <p>
                      Yukarıda sayılı haller dışında Kişisel Verilerinizin
                      üçüncü bir kişiyle paylaşılması gerekmesi halinde, bu
                      duruma ilişkin aydınlatma yükümlülüğümüzü ilgili aktarıma
                      özgü olarak ayrıca yerine getireceğiz.
                    </p>
                    <p>
                      <strong>
                        KVKK Tahtında Veri Sahibi Olarak Haklarınız
                      </strong>
                    </p>
                    <p>
                      KVKK ve yürürlükte bulunan diğer mevzuat çerçevesinde:
                    </p>
                    <p>
                      i. Kişisel Verilerinizin işlenip işlenmediğini öğrenme,
                    </p>
                    <p>
                      ii. Kişisel Verileriniz işlenmişse buna ilişkin bilgi
                      talep etme,
                    </p>
                    <p>
                      iii. Kişisel Verilerin işlenme amacını ve bunların amacına
                      uygun kullanılıp kullanılmadığını öğrenme,
                    </p>
                    <p>
                      iv. Yurtiçinde veya yurtdışında Kişisel Verilerinizin
                      aktarıldığı üçüncü kişileri bilme,
                    </p>
                    <p>
                      v. Kişisel Verilerinizin eksik veya yanlış işlenmiş olması
                      halinde bunların düzeltilmesini isteme,
                    </p>
                    <p>
                      vi. KVKK mevzuatında öngörülen şartlar çerçevesinde
                      Kişisel Verilerinizin silinmesini veya yok edilmesini
                      isteme1,
                    </p>
                    <p>
                      vii. v. ve vi. maddeleri kapsamında yapılan işlemlerin
                      Kişisel Verilerinizin aktarıldığı üçüncü kişilere
                      bildirilmesini isteme,
                    </p>
                    <p>
                      viii. İşlenen verilerin münhasıran otomatik sistemler
                      vasıtasıyla analiz edilmesi suretiyle aleyhinize bir
                      sonucun ortaya çıkmasına itiraz etme,
                    </p>
                    <p>
                      ix. Kişisel Verilerin kanuna aykırı olarak işlenmesi
                      sebebiyle zarara uğramanız halinde bu zararın
                      giderilmesini talep etme
                    </p>
                    <p>haklarına sahipsiniz.</p>
                    <p>
                      <strong style={{ textDecoration: 'underline' }}>
                        Haklarınız Kapsamında Royal Canin’e Başvuru Yolları
                      </strong>
                    </p>
                    <p>
                      Yukarıda belirtilen KVKK kapsamındaki haklarınızı
                      kullanmak ile ilgili talebinizi, KVKK ve Veri Sorumlusuna
                      Başvuru Usul ve Esasları Hakkında Tebliğ hükümleri
                      çerçevesinde, talebinizin ıslak imzalı halini kimliğinizi
                      tevsik eden belgelerle birlikte Esentepe Mah. Büyükdere
                      Cad. No: 127 Astoria Kuleleri A Blok Kat: 1 Şişli İstanbul
                      adresindeki şirket merkezine elden teslim edebilir ya da
                      sistemimizde kayıtlı olan e-posta adresi üzerinden{' '}
                      <a
                        href="mailto:iletisim@royalcanin.com"
                        style={{
                          color: '#0563C1',
                          textDecoration: 'underline'
                        }}
                      >
                        iletisim@royalcanin.com
                      </a>{' '}
                      adresine e-posta göndererek veya sistemimizde kayıtlı
                      e-posta adresiniz bulunmuyor ise{' '}
                      <a
                        href="mailto:iletisim@royalcanin.com"
                        style={{
                          color: '#0563C1',
                          textDecoration: 'underline'
                        }}
                      >
                        iletisim@royalcanin.com
                      </a>{' '}
                      adresine e-imzalı/mobil imzalı şekilde e-posta göndererek
                      Royal Canin’e iletebilirsiniz. Kimliğinizi tespit için
                      şirketimize sunulacak belgeler açısından, kimlik bilgileri
                      dışında bilgilere yer veren bir belge sunmamanızı ve
                      sunduğunuz belgede herhangi bir özel nitelikli kişisel
                      veriye (örn. din bilgisi, kan grubu bilgisi) yer
                      verilmemesini rica ederiz.
                    </p>
                    <p>
                      İşbu Aydınlatma Metni kapsamında düzenlenen veri işleme
                      süreçlerinde herhangi bir değişiklik meydana gelmesi
                      durumunda, değişiklikler en kısa süre içerisinde
                      Aydınlatma Metni’ne yansıtılacak olup, metnin güncel
                      halini her zaman internet sitesi üzerinden
                      inceleyebilirsiniz.
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
