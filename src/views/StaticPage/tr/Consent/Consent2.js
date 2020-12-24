import React from 'react';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

class Consent2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({seoConfig: res})
    });
  }
 render() {
  return (
    <div className="rc-content--fixed-header rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
      <Helmet>
        <title>{this.state.seoConfig.title}</title>
        <meta name="description" content={this.state.seoConfig.metaDescription}/>
        <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
      </Helmet>
      <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
        <h2 className="rc-beta text-center">MESAFELİ SATIŞ SÖZLEŞMESİ </h2>
        <br />
        <h3>1. TARAFLAR </h3>
        <br />
        <h4>1.1.Satıcı: </h4>
        <br />
        <p>SATICI’YA AİT BİLGİLER </p>
        <br />
        <p>Ünvan ROYAL CANIN TURKEY EVCİL HAYVAN ÜRÜNLERİ TİCARET LTD.ŞTİ.</p>
        <p>
          Adres ESENTEPE MAH. BÜYÜKDERE CAD. ASTORIA KULELERİ NO:127 A BLOK
          KAT:1 ŞİŞLİ İSTANBUL
        </p>
        <p>Telefon 0 212 370 06 70</p>
        <p>Faks 0 212 370 06 71</p>
        <p>E-posta: contact@shop.royalcanin.com.tr</p>
        <p>Mersis No: 0735085841000012</p>
        <p>Ticaret Sicil No: 983173</p>
        <br />
        {/* <h4>1.2. Alici:</h4>
        <p>
          <strong>Teslimat Bilgileri: </strong>
        </p>
        <p>
          E-posta:
          <span data-represents-field="#shippingEmail"></span>
        </p>
        <br /> */}
        <h3>2. SÖZLEŞME’NİN KONUSU </h3>
        <p>
          İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”), 6502 Sayılı Tüketicinin
          Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca
          Alıcı’nın adresli internet sitesi (“İnternet Sitesi”) üzerinden
          elektronik ortamda siparişini verdiği ürünlerin satış ve teslimine
          ilişkin olarak Satıcı ve Alıcı’nın hak ve yükümlülüklerini düzenler.{' '}
        </p>
        <h3>3. SÖZLEŞME KONUSU ÜRÜNLER VE ÖDEME ŞEKLİ </h3>

        {/* <div className="rc-table">
          <div className="rc-scroll--x">
            <table
              className="rc-table__table"
              data-js-table="checkout_billing_productTable"
              data-rc-feature-tables-setup="true"
            >
              <thead className="rc-table__thead">
                <tr className="rc-table__row">
                  <th className="rc-table__th rc-espilon">Ürün Kodu</th>
                  <th className="rc-table__th rc-espilon">Mal Hizmet</th>
                  <th className="rc-table__th rc-espilon">Birim fiyat(TL)</th>
                  <th className="rc-table__th rc-espilon">Miktar</th>
                  <th className="rc-table__th rc-espilon">Toplam Fiyat (TL)</th>
                </tr>
              </thead>
              <tbody className="rc-table__tbody">
                <tr className="rc-table__row">
                  <td className="rc-table__td">100200500_TR</td>
                  <td className="rc-table__td">X-small Puppy</td>
                  <td className="rc-table__td">49.50 TL</td>
                  <td className="rc-table__td">1.00</td>
                  <td className="rc-table__td">49.50 TL</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="rc-table__row">
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td">Toplam Miktar</td>
                  <td className="rc-table__td">1.00</td>
                </tr>
                <tr className="rc-table__row">
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td">KDV Matrahi</td>
                  <td className="rc-table__td">7.55 TL</td>
                </tr>
                <tr className="rc-table__row">
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td">Kargo bedeli</td>
                  <td className="rc-table__td">7.99 TL</td>
                </tr>
                <tr className="rc-table__row">
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td"></td>
                  <td className="rc-table__td">Ödenecek Tutar</td>
                  <td className="rc-table__td">49.50 TL</td>
                </tr>
              </tbody>
            </table> 
          </div>
  </div>*/}
        {/* <br />
        <p>Ödeme şekli: </p>
        <div className="form-group custom-control custom-checkbox">
          <input
            type="checkbox"
            className="rc-input__checkbox "
            value="standard"
            id="Method_of_payment-creditcard"
            name="standard_order"
            disabled="disabled"
            style="cursor: pointer;"
            data-card-type="CREDIT_CARD"
          />
          <label
            className="rc-input__label--inline"
            htmlFor="Method_of_payment-creditcard"
            style="cursor: default;"
          >
            Kart Bilgileri
          </label>
        </div> */}
        <br />
        <h3>4. TESLİMAT VE FATURA BİLGİLERİ </h3>
        {/* <p>
          <strong>4.1.Teslimat Bilgileri: </strong>
        </p>
        <p>
          E-posta:
          <span data-represents-field="#shippingEmail"></span>
        </p>
        <br />
        <p>
          E-posta:
          <span data-represents-field="#billingEmail"></span>
        </p> */}
        <p>
          <strong>4.1. </strong>Sözleşme konusu ürünler, siparişin Satıcı’ya
          ulaştığı tarihten itibaren en geç 3 (üç) iş gün içinde kargoya
          verilir.{' '}
        </p>
        <p>
          <strong>4.2. </strong>Sözleşme konusu ürünler, sipariş verilirken
          bildirilen ve yukarıda belirtilen teslimat adresine teslim edilir.
          Alıcı’nın teslimat adresinde bulunmaması veya hatalı adres bildirmesi
          durumunda Satıcı hiçbir sorumluluk kabul etmez.{' '}
        </p>
        <p>
          <strong>4.3.</strong>Satın alınan ürün, üç kez deneme yapılmasına
          rağmen (kapıda teslimat yapılması, telefon veya e-posta ile ulaşılmaya
          çalışılması vs. dâhil) Alıcı’ya teslim edilemediği takdirde sipariş
          iptal edilerek, ödenmiş olunan tutar kredi / banka kartına iade
          edilecektir. Abonelik programı kapsamında satın alınan ürünler için de
          aynı kural geçerlidir.
        </p>
        <div className="content-asset">
          <h3>5. CAYMA HAKKI</h3>
          <p>
            <strong>5.1</strong> Alıcı, Sözleşme konusu ürünleri teslim alma
            tarihinden itibaren 14 (ondört) gün içinde herhangi bir gerekçe
            göstermeksizin ve cezai şart ödemeksizin Sözleşme’den cayma hakkına
            sahiptir. Ayrıca Alıcı, Sözleşme’nin kurulmasından ürünün teslimine
            kadar olan süre içinde de cayma hakkını kullanabilir.
          </p>
          <p>
            <strong>5.2</strong> Alıcı’nın cayma hakkını kullandığına dair
            bildirimin, cayma hakkı süresi dolmadan internet sitesi üzerindeki
            form doldurulmak suretiyle veya Satıcı’nın e-posta adresine
            gönderilecek bir bildirim ile Satıcı’ya iletmiş olması gerekir.
            Alıcı’nın cayma hakkını kullanmasından itibaren 10 (on) gün içinde
            ilgili ürünü Satıcı’ya kutusu, ambalajı, varsa standart aksesuarları
            ve varsa ürün ile birlikte hediye edilen diğer ürünler ile birlikte
            eksiksiz ve hasarsız olarak iade etmesi gerekmektedir. Alıcı, iade
            edeceği ürünü, kendisine teslimat yapan kargo şirketi aracılığıyla
            gönderim ücreti Satıcı’ya ait olmak üzere Satıcı’ya geri
            gönderebilir. Cayma hakkının kullanılmasını takip eden 14 (ondört)
            gün içinde iade edilen ürünün bedeli, Alıcı’nın ödeme şekli
            kullanılarak iade edilir. Ürün iade edilirken, ürünün teslimi
            sırasında Alıcı’ya ibraz edilmiş olan fatura aslının da Alıcı
            tarafından iade edilmesi gerekmektedir.
          </p>
          <p>
            <strong>5.3</strong> Aşağıdaki hallerde cayma hakkı kullanılamaz:
          </p>
          <p>
            a. Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen
            ve Satıcı’nın kontrolünde olmayan mal veya hizmetlere ilişkin
            sözleşmeler.
          </p>
          <p>
            b. Alıcı’nın istekleri veya kişisel ihtiyaçları doğrultusunda
            hazırlanan mallara ilişkin sözleşmeler.
          </p>
          <p>
            c. Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların
            teslimine ilişkin sözleşmeler.
          </p>
          <p>
            d. Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından
            uygun olmayanların teslimine ilişkin sözleşmeler.
          </p>
          <p>
            e. Tesliminden sonra başka ürünlerle karışan ve doğası gereği
            ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.
          </p>
          <p>
            f. Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olması halinde maddi ortamda sunulan kitap,
            dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.
          </p>
          <p>
            g. Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve
            dergi gibi süreli yayınların teslimine ilişkin sözleşmeler.
          </p>
          <p>
            h. Belirli bir tarihte veya dönemde yapılması gereken, konaklama,
            eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya
            dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin
            sözleşmeler.
          </p>
          <p>
            i. Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye
            anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.
          </p>
          <p>
            j. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile
            ifasına başlanan hizmetlere ilişkin sözleşmeler.
          </p>
          <h3>6. ALICI’NIN BEYAN VE TAAHHÜTLERİ</h3>
          <p>
            <strong>6.1</strong> Alıcı, İnternet Sitesi’nde yer alan Sözleşme
            konusu malın temel nitelikleri, satış fiyatı ve ödeme şekli ile
            teslimat ve kargo bedeline ilişkin olarak Satıcı tarafından yüklenen
            ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda
            gerekli teyidi verdiğini beyan eder.
          </p>
          <p>
            <strong>6.2</strong> Alıcı, işbu Sözleşme’yi ve Ön Bilgilendirme
            Formu’nu elektronik ortamda teyit etmekle, mesafeli sözleşmelerin
            akdinden önce Satıcı tarafından Alıcı’ya bildirilmesi gereken
            Sözleşme konusu mal veya hizmetin temel niteliklerini; mal veya
            hizmetin tüm vergiler dâhil toplam fiyatı, niteliği itibariyle
            önceden hesaplanamıyorsa fiyatın hesaplanma usulü, varsa tüm
            nakliye, teslim ve benzeri ek masraflar ile bunların önceden
            hesaplanamaması halinde ek masrafların ödenebileceği bilgisini;
            cayma hakkının olduğu durumlarda, bu hakkın kullanılma şartları,
            süresi, usulü ve Satıcı’nın iade için öngördüğü taşıyıcıya ilişkin
            bilgiler ve cayma hakkının kullanılamadığı durumlarda, cayma
            hakkından faydalanamayacağına ya da hangi koşullarda cayma hakkını
            kaybedeceğine ilişkin bilgileri edindiğini teyit etmektedir.
          </p>
          <p>
            <strong>6.3</strong> Alıcı’nın, Sözleşme konusu malı teslim almadan
            önce muayene etmeksizin tahrip olmuş, kırık, ambalajı yırtılmış vb.
            hasarlı ve ayıplı malı kargo şirketinden teslim alması halinde
            sorumluluk tamamen kendisine aittir. Alıcı tarafından teslim alınan
            malın hasarsız olduğu kabul edilir. Teslimden sonra malın özenle
            korunması borcu, Alıcı’ya aittir. Cayma hakkı kullanılacaksa Alıcı
            malın paketini açmamalıdır ve malı kullanılmamalıdır.
          </p>
          <h3>7. SATICI’NIN BEYAN VE TAAHHÜTLERİ</h3>
          <p>
            <strong>7.1</strong> Satıcı, İnternet Sitesi’nde ilan edilen
            fiyatların ürünlerin satış fiyatı olduğunu taahhüt eder. İlan edilen
            fiyatlar ve vaatler, güncelleme yapılana ve değiştirilene kadar
            geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre
            sonuna kadar geçerlidir.
          </p>
          <p>
            <strong>7.2</strong> Sözleşme konusu ürünlerin Alıcı’ya gönderilmesi
            için satış bedelinin ödenmiş olması şarttır. Herhangi bir nedenle
            satış bedeli ödenmez veya banka kayıtlarında iptal edilir ise
            Satıcı, Sözleşme konusu ürünlerin teslimi yükümlülüğünden kurtulmuş
            kabul edilir.
          </p>
          <p>
            <strong>7.3</strong> Satıcı, mücbir sebepler veya nakliyeyi
            engelleyen olağanüstü durumlar nedeni ile Sözleşme konusu malı
            süresi içinde teslim edemez ise, durumu öğrendiği tarihten itibaren
            3 (üç) gün içinde Alıcı’ya bildirmekle yükümlüdür.
          </p>
          <h3>8. ABONELİK</h3>
          <p>
            <strong>8.1</strong> Alıcı belirli ürünleri belirli aralıklarla
            satın almak amacıyla abonelik programına katıldığı takdirde söz
            konusu satışlara aşağıdaki hükümler uygulanacaktır:
          </p>
          <p>
            a. Alıcı, herhangi bir zamanda hiçbir değişiklik veya iptal ücreti
            olmadan aboneliğini değiştirebilir veya iptal edebilir.
          </p>
          <p>
            b. Alıcı, herhangi bir teslimatı bir sonraki sipariş tarihinden en
            az bir gün önce atlamayı tercih edebilir. Bu durumda söz konusu
            sipariş gönderilmeyecek ve faturalanmayacaktır.
          </p>
          <p>
            c. Abonelik, otomatik yenileme ile bir yıllık süre için geçerli
            olacaktır. Alıcı’ya, bir yıllık sürenin dolmasından 15 gün önce ve 3
            gün önce bir yıllık sürenin dolduğunu ve aboneliğin bir yıllık süre
            için yenileneceğini hatırlatmak üzere e-posta gönderilecektir.
            Alıcı, aboneliğini bir yıllık süre içinde herhangi bir zamanda da
            iptal edebilir.
          </p>
          <p>
            d. Abonelik programı kapsamında satın alınan ürünlerin teslimatı
            ücretsiz yapılacaktır.
          </p>
          <p>
            e. Abonelik programı kapsamındaki ürünlerden herhangi birinin
            ücretinde artış olduğu takdirde Alıcı’ya bu değişikliği bildirmek ve
            söz konusu satın almaya devam etmek isteyip istemediğinin onayını
            almak üzere e-posta gönderilecektir. Alıcı’nın bu bildirimi
            almasından itibaren yedi (7) gün içinde fiyat artışını kabul
            etmemesi durumunda Satıcı söz konusu siparişi işleyeme koyamayacak
            ve gönderemeyecektir.
          </p>
          <p>
            f. Gelecek siparişe uygulanabilecek herhangi bir promosyon olduğu
            takdirde bu promosyon otomatik olarak uygulanacaktır.
          </p>
          <p>
            g. Alıcı, abonelik programı kapsamında satın aldığı ürünler için
            yalnızca kredi kartı ile ödeme yapabilir. Alıcı’nın kredi kartı
            bilgileri abonelik programına kayıt için gerekli olacaktır ve bu
            bilgiler Satıcı’nın ödeme hizmeti sağlayıcısı PayU tarafından
            kaydedilecektir. Alıcı kredi kartı bilgilerini her zaman hesabından
            değiştirebilir ve takip eden siparişlerde yeni kredi kartı
            kullanılır.
          </p>
          <p>
            h. Alıcı’nın kredi kartının geçerliliği sona erdiğinde Alıcı kredi
            kartı bilgilerini güncellemesi için otomatik bir e-posta alacaktır.
            Alıcı’nın kredi kartının geçerlilik süresi sona ermesine rağmen
            kredi kartı bilgilerini güncellememesi durumunda Satıcı, abonelik
            konusu siparişi işleme koyamayacak ve gönderemeyecektir.
          </p>
          <p>
            i. Alıcı’nın kredi kartına ilişkin ödeme onayı her bir sipariş için
            kontrol edilecektir ve ödeme, Alıcı’nın siparişi gönderildiğinde
            tahsil edilecektir. Ödemeye ilişkin herhangi bir problem olduğu
            takdirde ödeme bilgilerini güncellemesi için Alıcı ile iletişime
            geçilecektir. Satıcı, ödeme bilgilerini güncellemesi için Alıcı’ya
            ulaşamadığı takdirde Satıcı, abonelik konusu siparişi işleme
            koyamayacak ve gönderemeyecektir.
          </p>
          <p>
            j. Alıcı’nın aboneliği kapsamındaki bir ürünün geçici bir ürün için
            stok dışı olması durumunda bu husus Alıcı’ya bildirilecek ve söz
            konusu ürün stoka girene kadar siparişleri işleme koyulamayacaktır.
            Alıcı’nın aboneliği kapsamındaki bir ürünün süresiz olarak stok dışı
            olması durumunda bu husus Alıcı’ya bildirilecek ve Alıcı’nın söz
            konusu ürün hakkındaki aboneliği otomatik olarak iptal edilecektir.
          </p>
          <h3>9. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h3>
          <p>
            <strong>9.1</strong> İşbu Sözleşme’nin uygulanmasında, Gümrük ve
            Ticaret Bakanlığınca ilan edilen değere kadar, Alıcı’nın ürünü satın
            aldığı ve ikametgâhının bulunduğu yerdeki Tüketici Hakem Heyetleri
            ile Tüketici Mahkemeleri yetkilidir. 6502 Sayılı Tüketicinin
            Korunması Hakkında Kanun’un 68/1. maddesinde belirtilen alt ve üst
            limitler doğrultusunda tüketici talepleri hakkında ilçe/il tüketici
            hakem heyetleri yetkilidir.
          </p>
        </div>
        <h3>9. YÜRÜRLÜK </h3>
        <p>
          İşbu Sözleşme, taraflarca okunarak 26/10/2020 tarihinde Alıcı
          tarafından elektronik ortamda onaylanmak suretiyle akdedilmiş ve
          yürürlüğe girmiştir.
        </p>
      </div>
    </div>
  );
 }
}

export default Consent2;
