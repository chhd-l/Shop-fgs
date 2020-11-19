import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import './index.css';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

class Help extends React.Component {
  componentDidMount(){
    setSeoConfig()
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  render(h) {
    const event = {
      page: {
        type: 'Other',
        theme: ''
      }
    };

    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BreadCrumbs />
          <section
            style={{
              textAlign: 'center',
              width: '50%',
              margin: '40px auto 80px'
            }}
          >
            <h1 style={{ color: '#E2001A', marginTop: '40px' }}>
              Şartlar ve Koşullar
            </h1>
          </section>
          <div class="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
            <h2 style={{ textAlign: 'center' }}>Geçerlilik Kapsamı</h2>
            <h3 style={{ textAlign: 'center' }}>
              <br />
            </h3>
            <p style={{ textAlign: 'center' }}>
              İşbu Genel Hükümler ve Koşullar (“<strong>Koşullar</strong>”)
              Royal Canin Turkey Evcil Hayvan Ürünleri Limited Şirketi (bundan
              sonra “<strong>Royal Canin</strong>” olarak anılacaktır) ile Royal
              Canin internet veya “web” sitelerini (topluca “
              <strong>Site</strong>” veya “<strong>Siteler</strong>” olarak
              anılacaktır) kullanan siz tüketiciler veya şahsi kullanıcılarla
              arasındaki belirli yasal yükümlülüklere dair bildirimde bulunmak
              amacıyla hazırlanmıştır.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Site üzerinde her tür kullanım ve tasarruf yetkisi Royal Canin’e
              aittir. Koşullar, Site kullanımınızı ve Site’de satın aldığınız
              veya kullandığınız herhangi bir ürün veya hizmetimizin yasal
              olarak bağlayıcı koşullarını belirlemektedir. Site’ye erişim
              sağlayarak ve / veya kullanarak, Koşullar’ı kabul etme hakkınız ve
              yetkinliğinizin olduğunu ve tüm Koşullar’a uymayı kabul ettiğinizi
              beyan etmiş sayılmaktasınız. Lütfen Site’yi kullanmadan önce
              Koşullar’ı dikkatle okuyunuz. Site’deki belirli ürün ve
              hizmetlerin geçerli olması için ek şartlar olabilir (örneğin,
              Abonelik programımıza üye olmanız durumunda, ayrıca Abonelik Hüküm
              ve Koşulları’na tabi olursunuz). Royal Canin, Koşullar da dâhil
              olmak üzere, Site ve Site uzantılarında mevcut her tür koşulu ve
              bilgiyi önceden herhangi bir ihtara gerek olmaksızın değiştirme
              hakkını saklı tutar. Değişiklikler Site’de yayım anında yürürlüğe
              girer. Site’yi kullanabilmeniz işbu Koşullar’ı kabul etmenize
              bağlıdır.&nbsp;&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, Site’de mevcut olan bilgilerin doğruluk ve
              güncelliğini sürekli şekilde kontrol etmektedir. Ancak tüm itinalı
              çalışmaya rağmen, Site’de sunulmuş olan bilgiler fiili
              değişikliklerin gerisinde kalabilir. Site’de bulacağınız ürünler
              ve bilgiler Site’ye verildiği anda geçerli olacak şekilde
              sunulmuştur. Bu sebeple ilgili hizmetin güncel durumu ile Site’de
              yer alan durumu arasında farklılık olabilir.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Site’de Değişiklik Yapma Hakkı
            </h2>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, işbu Koşullar da dâhil olmak üzere Site ve Site
              uzantısında mevcut her tür hizmet, ürün ve Site’yi kullanma
              koşulları ile Site’de sunulan bilgileri önceden bir ihtara gerek
              olmaksızın değiştirme, Site’yi yeniden organize etme ve yayını
              durdurma hakkını saklı tutar. Değişiklikler Site’de yayım anında
              yürürlüğe girer. Site’nin kullanımı ya da Site’ye giriş ile bu
              değişiklikler de kabul edilmiş sayılır. Royal Canin, Koşullar’ın
              ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde;
              işlemin kesintiye uğraması, hata, ihmal, kesinti, silinme, kayıp,
              işlemin veya iletişimin gecikmesi, bilgisayar virüsü, iletişim
              hatası, hırsızlık, imha veya izinsiz olarak kayıtlara girilmesi,
              değiştirilmesi veya kullanılması hususunda herhangi bir sorumluluk
              kabul etmez.
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>
                <em>&nbsp;</em>
              </strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>
              Bilgi, Makale ve Tavsiyeye İlişkin Kısıtlamalar
            </h2>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, Site’de evcil hayvanlar hakkında sadece eğitim amaçlı
              bilgi, makale ve tavsiye sunabilmektedir. Bu Site aracılığıyla
              sunulan herhangi bir bilgi, makale veya tavsiye evcil hayvanınızda
              hastalık teşhis edilmesine veya tedavi edilmesine yönelik değildir
              ve bir veteriner hekim tarafından sağlanan veterinerlik hizmetinin
              yerine geçmez. Evcil hayvanınızın bakımı ve tedavisi ile ilgili
              tıbbi veya sağlıkla ilgili tavsiyeler için, veteriner hekiminiz
              ile iletişim kurunuz.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>Ürün Ekranı &amp; Renkler</h2>
            <p style={{ textAlign: 'center' }}>
              Bu Site, ürün resimlerini olabildiğince gerçeğe uygun bir şekilde
              göstermeye çalışır. Ancak, Site’de gördüğünüz rengin ürünün gerçek
              rengiyle eşleştiğini garanti edemeyiz. Renk görüntüsünün, kısmen
              kullandığınız ekrana (monitör) ve cihazınızın ayarlarına bağlı
              olabileceğini ve bunlardan dolayı renklerde farklılık
              olabileceğini unutmayınız.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Site’de Oluşabilecek Hatalar
            </h2>
            <p style={{ textAlign: 'center' }}>
              Site’de sunulan ürün ve hizmetlerin fiyatları ve
              kullanılabilirliği, kullanıcılara önceden bilgi verilmeksizin
              değiştirilebilir. Site’de verilen bilgilerde hata bulunduğu
              takdirde bu hatalar Royal Canin tarafından düzeltilir. Royal
              Canin, belirtilen herhangi bir teklifi iptal etme ve siparişin
              onaylanıp onaylanmadığı bilgisini veya kredi / banka kartınız
              dâhil olmak üzere herhangi bir hatayı, yanlışlığı veya ihmali
              düzeltme hakkını saklı tutar. Kredi / banka kartınız satın alma
              işlemi için zaten ücretlendirildiyse ve siparişiniz iptal
              edildiyse, ilgili tutar kredi / banka kartınıza iade edilir. Bu
              tutarın iadesinin kredi / banka kartınıza yansıtılma süresi, kendi
              bankanızın uygulamaları doğrultusunda değişkenlik gösterebilir ve
              bunlardan Royal Canin sorumlu tutulamaz. Satın aldığınız üründen
              memnun olmadığınız takdirde işbu Koşullar’da belirtilen iade
              şartları doğrultusunda ürün iadesi yapabilirsiniz.
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>Fikri Mülkiyet Hakları</h2>
            <p style={{ textAlign: 'center' }}>
              Site, Royal Canin logosu ve Royal Canin sanal mağaza logosu dâhil
              ancak bunlarla sınırlı olmamak kaydıyla Royal Canin’in sahip
              olduğu ve kullandığı değerli ticari markaları ve hizmet
              markalarını (“<strong>Royal Canin Markaları</strong>”) içerir.
              Site’de bulunan bilgiler, yazılar, resimler, markalar, slogan ve
              diğer işaretler ile sair fikri mülkiyet haklarına ilişkin
              bilgilerin korunmasına yönelik programlar ile sayfa düzeni ve işbu
              Site’nin sunumu münhasıran Royal Canin’in mülkiyetindedir. Royal
              Canin’den önceden yazılı muvafakat alınmaksızın, Site’deki
              bilgilerin, resimlerin veya açıklamaların ya da bu sayfaya ilişkin
              her türlü veri tabanı, internet sitesi, yazılım kodlarının kısmen
              ya da tamamen kopyalanması, değiştirilmesi, yayımlanması,
              çevrimiçi ya da diğer bir medya kullanılmak suretiyle gönderimi,
              dağıtımı, satılması yasaktır. Site’deki bilgilerin kısmen
              kopyalanması veya basılması ancak ticari olmayan kişisel
              ihtiyaçlarınız için mümkündür.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Site’nin İzin Verilen Kullanımları
            </h2>
            <p style={{ textAlign: 'center' }}>
              İşbu Koşullar’a tabi olarak, Royal Canin size, Site’ye erişmek
              için kişisel kullanımınız ile sınırlı, devredilemez, münhasır
              olmayan bir hak vermektedir. Bu hak, Site özelliklerinin veya
              içeriğinin herhangi bir yeniden satışını veya ticari kullanımını
              veya aşağıda belirtilen sınırlı amaçlardan herhangi biri için
              Site’ye erişme veya bunları kullanma hakkını içermez. Royal Canin
              bu hakkı herhangi bir zamanda bir gerekçe gösterme zorunluluğu
              olmaksızın geri alabilir.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              İşbu Koşullar’da size verilen haklar şu koşullara tâbidir: (a)
              Site’yi kendiniz veya bir üçüncü taraf adına, üçüncü bir tarafa
              ürünlerin veya hizmetlerin yeniden satışı için kullanamazsınız;
              (b) Site’yi, ürünlerini veya içeriklerini Royal Canin’in yazılı
              izni olmadan lisanslayamaz, alt lisans veremez, çoğaltamaz,
              satamaz, kiralayamaz, transfer edemez, dağıtamaz, barındıramaz
              veya başka şekilde ticari olarak kullanamazsınız; (c) Site’nin
              herhangi bir bölümünü değiştirmez, türev işlemlerini yapamaz,
              parçalara ayıramaz ve derleyemezsiniz; (d) benzer veya rekabetçi
              bir hizmet oluşturmak veya başka bir kişi veya şirket yararına
              içerik veya hesap bilgilerini indirmek, kopyalamak veya toplamak
              için Site’ye erişemezsiniz; (e) burada açıkça belirtilmedikçe,
              Site’nin hiçbir bölümünü Royal Canin’in açık yazılı izni
              olmaksızın kopyalayamaz, çoğaltamaz, dağıtamaz, yeniden
              yayınlayamaz, indiremez, gösteremez veya
              iletemezsiniz.&nbsp;&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, herhangi bir zamanda, Site’yi veya herhangi bir
              parçasını önceden haber vermeksizin veya herhangi bir bildirimde
              bulunmaksızın değiştirme, askıya alma veya durdurma hakkını saklı
              tutar. Royal Canin’in, Site’nin veya herhangi bir parçasının
              değiştirilmesi, askıya alınması veya durdurulması için size veya
              üçüncü taraflara karşı sorumlu olmayacağını kabul etmektesiniz.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Kullanıcı Hesabı<strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              Sitenin belirli özelliklerini kullanabilmeniz için Site’ye kayıt
              olmanız ve Site kayıt formunda belirtilen belirli bilgileri
              sağlamanız gerekir. Bu kayıt formunda şunları beyan ve taahhüt
              etmektesiniz: (a) gönderdiğiniz tüm gerekli kayıt bilgileri
              güvenilir ve doğrudur ve doğru kalmaya devam edecektir; ve (b)
              Site’yi kullanımınız geçerli herhangi bir mevzuat hükmünü veya
              Koşullar’ı ihlal etmemektedir.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Royal Canin hesabınızın giriş bilgilerinizin gizliliğini korumakla
              yükümlüsünüz. Royal Canin hesabınızla ilişkili tüm etkinliklerin
              (bunlarla sınırlı olmamak üzere, herhangi bir satın alma, Site
              kullanımı veya Royal Canin hesabınızdaki yazışmalar dâhil)
              sorumluluğu size aittir. Site’de veya Site üzerindeki kullanıcı
              hesabınızın yetkisiz kullanımı gerçekleştiği takdirde bu durumu
              derhal Royal Canin’e bildirmeniz gerekmektedir. Royal Canin’e
              böyle bir bildirimde bulunduğunuz takdirde, Royal Canin
              hesabınızın tekrar yetkisiz kullanımını engellemek amacıyla
              hesabınızı askıya alabilir veya başka şekilde güvence altına
              alabilir.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>Kullanıcı İçeriği</h2>
            <p style={{ textAlign: 'center' }}>
              “<strong>Kullanıcı İçeriği</strong>”, Site kullanıcısının Royal
              Canin’e gönderdiği her türlü bilgi ve içeriği ifade eder.
              Kullanıcı İçeriği’nden yalnızca siz sorumlusunuz. Kullanıcı
              İçeriği’nin kullanımıyla ilişkili tüm riskleri, ve ilgili içeriğin
              doğruluğunu ve eksiksizliğini üstlenmektesiniz. Kullanıcı
              İçeriği’ni Site’de kullanmanız için gerekli olan haklara veya
              izinlere sahip olduğunuzu beyan ve garanti etmektesiniz. Kullanıcı
              İçeriği’nden münhasıran kendiniz sorumlu olduğunuzdan bunların
              herhangi bir mevzuat hükmünü ve işbu Koşullar’ı ihlal etmesi
              durumunda kendi sorumluluğunuz söz konusu olacaktır. Royal
              Canin’in herhangi bir Kullanıcı İçeriği’ni yedeklemesi zorunlu
              değildir, bunu yapacağına dair herhangi bir beyanda
              bulunmamaktadır. Royal Canin’in Kullanıcı İçeriği’ni istediği
              zaman silebileceğini kabul etmektesiniz.
              <strong>
                <em>&nbsp;</em>
              </strong>
            </p>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, Royal Canin’e sağladığınız her türlü geri bildirimi,
              iletişimi veya öneriyi gizli bir şekilde ele alacaktır. Bu
              nedenle, Royal Canin ile aksi yönde yazılı bir anlaşmanın
              yokluğunda, herhangi bir üçüncü kişiye ait gizli veya özel
              olduğunu düşündüğünüz herhangi bir bilgi veya fikri Royal Canin’e
              göndermeyeceğinizi kabul etmektesiniz.
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>
              Kullanım Politikası<strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              Site’yi (a) herhangi bir üçüncü kişinin fikri mülkiyet hakkını ve
              gizli bilgisini ihlal eden; (b) hukuka aykırı, haksız, tehdit
              edici, zararlı, başkalarının mahremiyetine zarar veren, kaba,
              iftira niteliğinde, yalan beyanda bulunan, kasıtlı olarak
              yanıltan, ticarete açık, pornografik, açık bir şekilde saldırıda
              bulunan (örneğin, ırkçılığı teşvik eden, herhangi bir gruba veya
              bireye karşı sakıncalı veya herhangi bir şekilde çocuklara zararlı
              olabilecek içerikler); veya (c) mevzuatı, herhangi bir sözleşmesel
              yükümlülüğü veya işbu Koşullar’ı ihlal eden Kullanıcı İçeriği’ni
              toplamak, yüklemek, iletmek, görüntülemek veya dağıtmak için
              kullanmamayı kabul etmektesiniz.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Buna ek olarak, Site’yi ticari amaçlarla veya aşağıdaki amaçlarla
              kullanmamayı da kabul etmektesiniz: (a) bilgisayar sistemlerini
              hasara uğratacak virüsleri veya yazılımları yüklemek, iletmek ya
              da dağıtmak; (b) ticari amaçla veya başka bir amaca hizmet eder
              şekilde, istenmeyen veya yetkisiz reklam, tanıtım malzemeleri,
              istenmeyen ve gereksiz e-postalar veya başka herhangi istenmeyen
              mesajlar göndermek; (c) onayları olmadan e-posta adresleri de
              dâhil olmak üzere diğer kullanıcılarla ilgili bilgileri toplamak;
              (d) Site’ye bağlı sunucuları veya ağları engellemek veya bozmak
              veya bu ağların düzenlemelerini, politikalarını veya
              prosedürlerini ihlal etmek; (e) diğer bilgisayar sistemleri veya
              sunucu ile bağlantılı veya birlikte kullanılan ağlara yetkisiz
              erişim elde etme girişiminde bulunmak; veya (f) başka bir
              kullanıcının Site’yi kullanmına müdahale etmek veya herhangi bir
              şekilde engellemek.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              İşbu Koşullar’ın herhangi bir hükmünü ihlal etmeniz halinde,
              tamamen Royal Canin’in takdirine bağlı olarak, Kullanıcı
              İçeriği’nin kaldırılması, değiştirilmesi, kullanıcı hesabının
              feshedilmesi ve/veya yasal makamlara bildirim ve şikayette
              bulunulması da dâhil ancak bunlarla sınırlı olmaksızın herhangi
              bir Kullanıcı İçeriği gözden geçirilebilir, araştırılabilir ve /
              veya uygun önlemler alınabilir (ancak Royal Canin’in herhangi bir
              şekilde bunları yapma yükümlülüğü bulunmamaktadır). Kullanıcı
              İçeriği’nin bir hak ihlaline sebebiyet verebilecek veya Royal
              Canin’e karşı sorumluluk doğurabilecek hallerde kaldırabilir veya
              değiştirebiliriz. Mevzuat gereği bir yükümlülüğümüzün olması
              ihtimalinde, resmi, idari veya yargı makamlarından gelecek
              talepler doğrultusunda kullanıcı adınız ve şifreniz, IP adresiniz
              ve trafik bilgileriniz, Kullanıcı İçeriğiniz dâhil, gerekli
              bilgiler ilgili makamlar ile paylaşılabilecektir.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Herhangi bir şüpheye mahal vermemek adına, Site’ye iletilen her
              türlü Kullanıcı İçeriği’nden ilgili kullanıcı sorumlu olup Royal
              Canin’in bunları denetleme, değiştirme veya Site’den kaldırma
              hakkı olmakla birlikte böyle bir yükümlülüğü bulunmamaktadır.
              Kullanıcı İçeriği’nin herhangi bir mevzuat hükmünü, işbu
              Koşullar’ı veya sözleşmesel yükümlülüğü ihlal etmesi halinde bu
              durumdan ilgili kullanıcının kendisi şahsen sorumlu olup Royal
              Canin’in herhangi bir sorumluluğu bulunmamaktadır.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              Diğer Site kullanıcılarıyla olan etkileşimleriniz yalnızca siz ve
              ilgili kullanıcı arasındadır. Bu tür etkileşimlerin sonucu olarak
              meydana gelen herhangi bir uyuşmazlık, kayıp veya hasardan Royal
              Canin’in sorumlu olmayacağını kabul etmektesiniz.
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
            <h2 style={{ textAlign: 'center' }}>&nbsp;Abone Programı</h2>
            <p style={{ textAlign: 'center' }}>
              Royal Canin ödeme sayfasında “Abonelik” seçeneğini işaretleyerek,
              abonelik programımızda uygulanacak Abonelik Hüküm ve Koşullarını
              (“Abonelik Şartları”) kabul etmiş sayılırsınız. Abonelik
              Koşulları, Site’nin kullanımını düzenleyen işbu Koşullar’ın yanı
              sıra, Site’de geçerli tüm şartlar, koşullar, sınırlamalar ve
              gereksinimlere ek olarak (muhtelif zamanlarda değiştirilebileceği
              şekilde), otomatik üyelik şartlarınızı da yönetir. Abone
              programımıza kayıt olarak, Abonelik Şartları’nı kabul etmiş
              sayılırsınız. Lütfen bu Abonelik Şartları’nı dikkatle okuyun.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Üçüncü Taraf Siteleri ve Diğer Kullanıcılar
            </h2>
            <p style={{ textAlign: 'center' }}>
              Site, üçüncü taraf internet sitelerine (topluca “
              <strong>Üçüncü Taraf Siteleri</strong>”) (örneğin, Facebook,
              YouTube, Twitter veya Pinterest gibi sosyal medya siteleri)
              bağlantılar veya reklamlar içerebilir. Royal Canin herhangi bir
              Üçüncü Taraf Sitesi’nden sorumlu değildir. Royal Canin, bu Üçüncü
              Taraf Siteleri’ne yalnızca kolaylık sağlamak amacıyla bağlantı
              sağlar ve Üçüncü Taraf Siteleri ile ilgili olarak herhangi bir
              beyanda veya taahhütte bulunmaz, bunların içeriğini onaylamaz,
              denetlemez veya bunlara dair garanti vermez. Tüm Üçüncü Taraf
              Siteleri’ni kendi sorumluluğunuzda kullandığınızı kabul
              etmektesiniz. Bir Üçüncü Taraf Sitesi’ne bağlandığınızda, gizlilik
              ve veri toplama uygulamaları dâhil olmak üzere ilgili Üçüncü Taraf
              Sitesi’nin kullanım şartları uygulanır. Herhangi bir Üçüncü Taraf
              Sitesi’ni kullanmaya veya burada herhangi bir işleme başlamadan ya
              da devam etmeden önce gerekli veya uygun incelemeleri yapmanız
              gerekmektedir.
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>
              Siparişi Değerlendirme Koşulu
            </h2>
            <p style={{ textAlign: 'center' }}>
              Site üzerinden bir sipariş verdiğinizde ödeme yönteminizi ve /
              veya gönderim adresinizi doğrulayacağız. Royal Canin, herhangi bir
              neden göstermeksizin herhangi bir siparişinizi reddetme veya temin
              edilecek ürün adedini değiştirme hakkını saklı tutar. Siparişiniz
              reddedildiği durumda siparişte vermiş olduğunuz e-posta adresiniz
              kullanılarak bilgilendirme yapılacaktır. Reddedilen bir sipariş
              için sizden hâlihazırda ücret tahsil edildiği durumda ücret size
              kendi ödeme yönteminiz ile iade edilecektir.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Sipariş Kabul ve Onayı<strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              Site üzerinden bir sipariş verdiğinizde bu siparişinizin
              alındığına dair e-posta adresiniz kullanılarak bilgilendirme
              yapılacaktır. Royal Canin, önceden haber vermeksizin herhangi bir
              ürün üzerindeki sipariş miktarını sınırlama hakkını saklı tutar.
              Bazı durumlarda Site üzerinden verdiğiniz sipariş teyit edilmeden
              önce bilgilerinizin doğrulanması gerekli olabilir. Site’de yer
              alan ürünlerin fiyatları ve stok bilgileri Royal Canin tarafından
              tek taraflı olarak ve önceden bildirilmeksizin değiştirilebilir.
              Site’de veya siparişte herhangi bir hata tespit edildiği takdirde
              bu hatalar Royal Canin tarafından düzeltilebilir.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Sipariş ve Miktar Sınırlamaları<strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              Royal Canin, tamamen kendi takdirine bağlı olarak ve önceden
              bilgilendirme yapma zorunluluğu olmaksızın, kişi başına, hane
              başına veya sipariş başına satın alınan miktarları sınırlayabilir
              veya iptal edebilir. Kısıtlamalar, aynı Site hesabı tarafından
              verilen siparişleri, aynı kredi / banka kartını ve aynı
              faturalandırma ve / veya gönderim adresini kullanan siparişleri
              içerebilir. Siparişinizde bir değişiklik yapmamız durumunda,
              siparişinizle birlikte verilen e-posta adresiniz kullanılarak
              bilgilendirme yapılacaktır. Royal Canin, Site üzerinden kurumsal
              müşterilere yapılan satışları sınırlama veya yasaklama hakkını
              saklı tutar.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              Teslimat Koşulları<strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              Siparişleriniz, ödemenizin teyidi alındıktan sonra en geç üç (3)
              iş günü (Pazartesi-Cuma günleri arası) içinde&nbsp;kargo şirketine
              teslim edilir. Siparişleriniz, sadece Türkiye Cumhuriyeti
              sınırları içindeki adreslere teslim edilecektir. Teslimat
              adresinin Royal Canin ürünlerinin bulunduğu lojistik merkezine
              olan uzaklığına göre kargo şirketi 2 - 3 gün
              içinde&nbsp;siparişinizi size ulaştıracaktır.&nbsp;Tarafımızdan
              kaynaklanan bir aksilik olması halinde ise bize sağlamış olduğunuz
              iletişim bilgileri aracılığıyla size bilgilendirme yapılacaktır.
              Bu sebeple iletişim bilgilerinizin eksiksiz ve doğru sağlanmış
              olması önemlidir. Satın aldığınız ürünler bir teyit e-postası ile
              tarafınıza bildirilecektir. Seçtiğiniz ürünlerden herhangi birinin
              stokta mevcut olmaması durumunda konu ile ilgili bir e-posta
              iletilecek ve ürünün ilk stoklara gireceği tarih tarafınıza
              bildirilecektir. Site bir elektronik ticaret sitesidir ve aynı
              anda birden çok kullanıcıya alışveriş yapma imkânı tanır. Birden
              fazla tüketicinin aynı ürünü alması ve bu sebeple ürün stoklarının
              tükenmesi söz konusu olabilir. Böyle bir durumda ödemesini
              yaptığınız ürünün stoklarımızda kalmaması halinde 1-5 gün
              içinde&nbsp;ürün stoklarının yenilenip yenilenmeyeceği kontrol
              edilecektir. Bu süre içinde ürün stoklarının yenilenmeyeceği
              kesinleşirse söz konusu ürün için yaptığınız ödeme, kendi ödeme
              yönteminiz kullanılarak iade edilecektir.<strong>&nbsp;</strong>
            </p>
            <p style={{ textAlign: 'center' }}>
              Royal Canin’den satın alınan tüm ürünler, bir kargo şirketi
              aracılığıyla kullanıcılara iletilecektir. Ürünler, kargo şirketi
              tarafından kullanıcıya teslim edildiğinde ürünlere ilişkin her
              türlü hasar ve risk kullanıcıya geçecektir.
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>Fiyat ve Ödeme</h2>
            <p style={{ textAlign: 'center' }}>
              Siparişlerinize ilişkin ödemeleri bir veya kredi kartı ile
              yapabilirsiniz. Site’de Visa®, MasterCard®, American Express® Card
              ve MasterCard veya Visa logolu banka kartlarını kabul ediyoruz.
              Ödeme Türk Lirası üzerinden yapılacaktır. Site’de gösterilen tüm
              fiyatlara Türkiye Cumhuriyeti’nde yürürlükte olan %18 KDV
              dâhildir. Güvenli ödeme sistemi sunmak için, Royal Canin önde
              gelen finans kuruluşlarının güvenli ödeme sistemlerini kullanır.
              Genel olarak, kredi / banka kartları, siparişinizi size gönderene
              veya uygunluğunu teyit edene kadar Royal Canin tarafından
              ücretlendirilmez (bu süre zarfında, yalnızca uygun vergiler veya
              nakliye ücretleri ile birlikte gönderdiğimiz ürünler için
              ücretlendirilirsiniz). Bununla birlikte, sipariş tutarınızı
              siparişinizin verildiği tarihte kredi / banka kartı
              düzenleyicinizle ön provizyon alabiliriz. Bu, mevcut kredinizi
              etkileyebilir.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Promosyonlar ve Kuponlar
              </span>
              <strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Bir promosyon / kupon kodu kullanılıyorsa, ilgili teklifi
                kullanmak için belirlenen kod, “Promosyon Kodu” alanına ödeme
                sırasında girilmelidir. Herhangi bir promosyon veya kupon, diğer
                promosyonlarla veya kuponlarla birleştirilemez; işlem başına
                yalnızca bir adet promosyon veya kupon kodu kullanılabilir ve
                sepet tutarından düşülür. Royal Canin, belirli ürünler,
                ağırlıklar, bazı gönderim ücretleri ve hızlandırılmış nakliye
                ücretlerinin promosyon veya kuponlar aracılığıyla ödenmesini
                kısıtlama hakkını saklı tutar. Teklif koşullarında aksi
                belirtilmedikçe, çevrimiçi kuponlar Royal Canin mağazalarında
                veya Royal Canin ürünlerinin satıldığı herhangi bir satış
                noktasında geçerli değildir.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                İade Şartları ve Prosedürü
              </span>
              <strong>&nbsp;</strong>
            </h2>
            <p>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Site üzerinden satın almış olduğunuz ürünü kullanmadan, tahrip
                etmeden ve ticari olarak satılabilirliğini ve
                kullanılabilirliğini bozmadan teslim almış olduğunuz tarihinden
                itibaren 14 (on dört)günlük süre içinde teslim aldığınız şekli
                ile iade edebilirsiniz. Ürünü, ürünün faturasını ve iade
                sebebini içeren talebinizi bize iletmeniz halinde iade prosedürü
                işletilecektir. Açılmış / denenmiş / hasar görmüş / kullanılmış
                ürünler kapsamına giren ürünlerin iadesi kabul edilmemektedir.
              </span>
            </p>
            <p>
              <br />
            </p>
            <p>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                İade etmek istediğiniz ürünün faturası kurumsal ise, iade
                ederken kurumun düzenlemiş olduğu iade faturası ile birlikte
                göndermeniz gerekmektedir. İade faturası, kargo payı dâhil
                edilmeden (ürün birim fiyatı + KDV şeklinde) kesilmelidir.
                Faturası kurumlar adına düzenlenen sipariş iadeleri, iade
                faturası kesilmediği takdirde tamamlanamayacaktır.
              </span>
            </p>
            <p>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Teslim aldığınız paketleri kargo şirketi yetkilisi önünde açıp
                kontrol ediniz. Eğer üründe herhangi bir hasar varsa kargo
                şirketine tutanak tutturarak ürünü teslim almayınız. Ürün teslim
                alındıktan sonra kargo şirketinin görevini tam olarak yerine
                getirdiğini ve ürünü hasarsız ve eksiksiz teslim aldığınızı
                kabul etmiş sayılmaktasınız.
              </span>
            </p>
            <p>
              <br />
            </p>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Site üzerinden satın almış olduğunuz ve paketi açılmış, ambalajı
                veya kendisi zarar görmüş, bozulmuş, kırılmış, tahrip edilmiş,
                yırtılmış ve/veya kullanılmış ürünlerin iadesi kabul
                edilmemektedir. Orijinal ambalajı zarar görmüş, tahrip edilmiş
                ve sair şekildeki ürünlerin iadesi kabul edilmez.&nbsp;Ürünü,
                teslim aldığınız andaki durumunda iade etmekle yükümlüsünüz.
                Ürünü iade etmeniz veya henüz ürünü teslim almadan cayma
                hakkınızı kullanmanız halinde, iade edilen ürün iade adresimize
                ulaştığı tarihten itibaren üç (3) iş günü içinde ürün bedeli
                tarafınıza, kendi ödeme yönteminiz kullanılarak iade
                edilecektir. Bu tutarın iadesinin kredi / banka kartınıza
                yansıtılma süresi, kendi bankanızın uygulamaları doğrultusunda
                değişkenlik gösterebilir ve bunlardan Royal Canin sorumlu
                tutulamaz. Taksitli satışlarda yapılan iadeler bankanız
                tarafından kredi / banka kartınıza her ay artı bakiye olarak
                yansıtılabilir.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>&nbsp;</strong>
            </p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Sorumluluk Sınırlaması
              </span>
              <strong>&nbsp;</strong>
            </h2>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Royal Canin, Site’ye erişilmesi, Site’nin ya da Site’deki
                bilgilerin ve diğer verilerin ve programların kullanılması
                sebebiyle, Koşullar’ın ihlali, haksız fiil ya da başkaca
                sebeplere binaen doğabilecek doğrudan ya da dolaylı hiçbir
                zarardan sorumlu değildir. Royal Canin, Koşullar’ın ihlali,
                haksız fiil, ihmal veya diğer sebepler neticesinde Site
                üzerinden yürütülen işlemin kesintiye uğraması, hata veya ihmal
                durumunda herhangi bir sorumluluk kabul etmez. Site’ye ya da
                bağlantı verilen Üçüncü Taraf Siteleri’ne erişilmesi ya da
                bunların kullanılması sonucunda doğabilecek her tür
                sorumluluktan, mahkeme masrafları ve diğer masraflar da dâhil
                olmak üzere herhangi bir zarardan Royal Canin sorumlu
                olmayacaktır.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Uygulanacak Hukuk ve Yetkili Mahkeme
              </span>
            </h2>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                İşbu Koşullar ve Site’nin kullanımı ile ilgili olarak
                çıkabilecek ihtilaflarda öncelikle işbu Koşullar’daki hükümler;
                Koşullar’da hüküm bulunmaması halinde ise Türkiye Cumhuriyeti
                mevzuatı uygulanacaktır. İşbu Koşullar ve Site’nin kullanımından
                doğabilecek her türlü uyuşmazlığın çözümünde İstanbul Merkez
                (Çağlayan) Mahkemeleri ile İcra Daireleri yetkili olacaktır.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>Gizlilik</span>
              <strong>&nbsp;</strong>
            </h2>
            <p>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                İşbu Koşullar’ın yürürlükte olduğu süre boyunca ve Koşullar’ın
                sona ermesinden sonra taraflar yazılı, sözlü veya sair surette
                kendilerine iletilen her türlü bilgi ve belgeleri (“
              </span>
              <a
                href="https://www.shop.royalcanin.com.tr/tr/privacy-statement.html"
                target="_self"
                data-link-type="external"
                data-link-label="https://www.shop.royalcanin.com.tr/tr/privacy-statement.html"
              >
                Gizli Bilgiler
              </a>
              ”), ilgili m
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                evzuat hükümleri saklı kalmak üzere, karşı tarafın yazılı onayı
                olmadan üçüncü kişilere açıklayamaz; başka kişi, kurum ve
                kuruluşların yararına kullanamaz ve kullandıramaz. Taraflar,
                yukarıda sayılan{' '}
              </span>
              Gizli Bilgiler’in gizliliğini sağlamak, bu hususta her türlü
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                {' '}
                önlemi almak, gizlilik esaslarına uygun hareket etmek, bu
                bilgilerin yetkisiz kişilerce kullanımını önlemek ve her türlü
                suiistimalden korumak için her türlü önlemi almakla yükümlüdür.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Kişisel Verilerin Korunması
              </span>
              &nbsp;
            </h2>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Site’yi kullanımınız kapsamında kişisel verilerinizin korunması
                hakkında aydınlatma ve muvafakatname metnine&nbsp;
              </span>
              <u style={{ color: 'rgb(102, 102, 102)' }}>buradan</u>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                &nbsp;ulaşabilirsiniz.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Site Kullanımının Sona Erdirilmesi
              </span>
            </h2>
            <p>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Royal Canin, yürürlükteki mevzuat hükümlerine veya işbu
                Koşullar’a aykırı herhangi bir davranışınız olması halinde
                tamamen kendi takdirine bağlı olarak, bu Site’deki kişisel
                hesabınızı, üyelik kayıtlarınızı veya benzer kullanımları
                herhangi bir zamanda incelemeye alabilir, dondurabilir veya sona
                erdirebilir. Hesabınızın sona erdirilmesinden önce vermiş
                olduğunuz siparişlere ilişkin ödeme yükümlülüğünüz devam eder.
                Hesabınızın sona erdirilmesi durumunda Site’de hiçbir hesabınız
                veya benzeri üyelik haklarınız kalmayacaktır. İşbu Koşullar
                kapsamındaki sorumluluk sınırlamaları ve muhtelif hükümler, bu
                tür bir sona erdirmeden sonra geçerliliğini korumaya devam eder.
                Royal Canin, Site üzerinden vermiş olduğunuz iletişim bilgileri
                aracılığıyla hesabınızın sona erdirildiğine dair bildirim
                gönderebilir.
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgb(102, 102, 102)' }}>
                Royal Canin önceden haber vermeksizin tamamen kendi takdirine
                bağlı olarak bu Site’nin tamamını veya bir kısmını değiştirme,
                askıya alma, kapatma veya devam ettirme hakkını saklı tutar
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
            <p style={{ textAlign: 'center' }}>
              <br />
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
