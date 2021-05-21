import React, { useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { paymentStore } = useLocalStore(() => stores);
  const { fullScreenModalTC } = paymentStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalTC ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalTC')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
                    <p>Genel Hükümler ve Koşullar</p>
                    <p>Geçerlilik Kapsamı</p>
                    <p>
                      İşbu Genel Hükümler ve Koşullar (“Koşullar”) Royal Canin
                      Turkey Evcil Hayvan Ürünleri Limited Şirketi (bundan sonra
                      “Royal Canin” olarak anılacaktır) ile Royal Canin internet
                      veya “web” sitelerini (topluca “Site” veya “Siteler”
                      olarak anılacaktır) kullanan siz tüketiciler veya şahsi
                      kullanıcılarla arasındaki belirli yasal yükümlülüklere
                      dair bildirimde bulunmak amacıyla hazırlanmıştır.
                    </p>
                    <p>
                      Site üzerinde her tür kullanım ve tasarruf yetkisi Royal
                      Canin’e aittir. Koşullar, Site kullanımınızı ve Site’de
                      satın aldığınız veya kullandığınız herhangi bir ürün veya
                      hizmetimizin yasal olarak bağlayıcı koşullarını
                      belirlemektedir. Site’ye erişim sağlayarak ve / veya
                      kullanarak, Koşullar’ı kabul etme hakkınız ve
                      yetkinliğinizin olduğunu ve tüm Koşullar’a uymayı kabul
                      ettiğinizi beyan etmiş sayılmaktasınız. Lütfen Site’yi
                      kullanmadan önce Koşullar’ı dikkatle okuyunuz. Site’deki
                      belirli ürün ve hizmetlerin geçerli olması için ek şartlar
                      olabilir (örneğin, ROYAL CANIN® Club programımıza üye
                      olmanız durumunda, ayrıca işbu Koşullar’ın ROYAL CANIN®
                      Club başlığı altındaki hükümlere tabi olursunuz). Royal
                      Canin, Koşullar da dâhil olmak üzere, Site ve Site
                      uzantılarında mevcut her tür koşulu ve bilgiyi önceden
                      herhangi bir ihtara gerek olmaksızın değiştirme hakkını
                      saklı tutar. Değişiklikler Site’de yayım anında yürürlüğe
                      girer. Site’yi kullanabilmeniz işbu Koşullar’ı kabul
                      etmenize bağlıdır.
                    </p>
                    <p>
                      Royal Canin, Site’de mevcut olan bilgilerin doğruluk ve
                      güncelliğini sürekli şekilde kontrol etmektedir. Ancak tüm
                      itinalı çalışmaya rağmen, Site’de sunulmuş olan bilgiler
                      fiili değişikliklerin gerisinde kalabilir. Site’de
                      bulacağınız ürünler ve bilgiler Site’ye verildiği anda
                      geçerli olacak şekilde sunulmuştur. Bu sebeple ilgili
                      hizmetin güncel durumu ile Site’de yer alan durumu
                      arasında farklılık olabilir.
                    </p>
                    <p>Site’de Değişiklik Yapma Hakkı</p>
                    <p>
                      Royal Canin, işbu Koşullar da dâhil olmak üzere Site ve
                      Site uzantısında mevcut her tür hizmet, ürün ve Site’yi
                      kullanma koşulları ile Site’de sunulan bilgileri önceden
                      bir ihtara gerek olmaksızın değiştirme, Site’yi yeniden
                      organize etme ve yayını durdurma hakkını saklı tutar.
                      Değişiklikler Site’de yayım anında yürürlüğe girer.
                      Site’nin kullanımı ya da Site’ye giriş ile bu
                      değişiklikler de kabul edilmiş sayılır. Royal Canin,
                      Koşullar’ın ihlali, haksız fiil, ihmal veya diğer sebepler
                      neticesinde; işlemin kesintiye uğraması, hata, ihmal,
                      kesinti, silinme, kayıp, işlemin veya iletişimin
                      gecikmesi, bilgisayar virüsü, iletişim hatası, hırsızlık,
                      imha veya izinsiz olarak kayıtlara girilmesi,
                      değiştirilmesi veya kullanılması hususunda herhangi bir
                      sorumluluk kabul etmez.
                    </p>
                    <p>Bilgi, Makale ve Tavsiyeye İlişkin Kısıtlamalar</p>
                    <p>
                      Royal Canin, Site’de evcil hayvanlar hakkında sadece
                      eğitim amaçlı bilgi, makale ve tavsiye sunabilmektedir. Bu
                      Site aracılığıyla sunulan herhangi bir bilgi, makale veya
                      tavsiye evcil hayvanınızda hastalık teşhis edilmesine veya
                      tedavi edilmesine yönelik değildir ve bir veteriner hekim
                      tarafından sağlanan veterinerlik hizmetinin yerine geçmez.
                      Evcil hayvanınızın bakımı ve tedavisi ile ilgili tıbbi
                      veya sağlıkla ilgili tavsiyeler için, veteriner hekiminiz
                      ile iletişim kurunuz.
                    </p>
                    <p>Ürün Ekranı & Renkler</p>
                    <p>
                      Bu Site, ürün resimlerini olabildiğince gerçeğe uygun bir
                      şekilde göstermeye çalışır. Ancak, Site’de gördüğünüz
                      rengin ürünün gerçek rengiyle eşleştiğini garanti
                      edemeyiz. Renk görüntüsünün, kısmen kullandığınız ekrana
                      (monitör) ve cihazınızın ayarlarına bağlı olabileceğini ve
                      bunlardan dolayı renklerde farklılık olabileceğini
                      unutmayınız.
                    </p>
                    <p>Site’de Oluşabilecek Hatalar</p>
                    <p>
                      Site’de sunulan ürün ve hizmetlerin fiyatları ve
                      kullanılabilirliği, kullanıcılara önceden bilgi
                      verilmeksizin değiştirilebilir. Site’de verilen bilgilerde
                      hata bulunduğu takdirde bu hatalar Royal Canin tarafından
                      düzeltilir. Royal Canin, belirtilen herhangi bir teklifi
                      iptal etme ve siparişin onaylanıp onaylanmadığı bilgisini
                      veya kredi / banka kartınız dâhil olmak üzere herhangi bir
                      hatayı, yanlışlığı veya ihmali düzeltme hakkını saklı
                      tutar. Kredi / banka kartınız satın alma işlemi için zaten
                      ücretlendirildiyse ve siparişiniz iptal edildiyse, ilgili
                      tutar kredi / banka kartınıza iade edilir. Bu tutarın
                      iadesinin kredi / banka kartınıza yansıtılma süresi, kendi
                      bankanızın uygulamaları doğrultusunda değişkenlik
                      gösterebilir ve bunlardan Royal Canin sorumlu tutulamaz.
                      Satın aldığınız üründen memnun olmadığınız takdirde işbu
                      Koşullar’da belirtilen iade şartları doğrultusunda ürün
                      iadesi yapabilirsiniz.
                    </p>
                    <p>Fikri Mülkiyet Hakları</p>
                    <p>
                      Site, Royal Canin logosu ve Royal Canin sanal mağaza
                      logosu dâhil ancak bunlarla sınırlı olmamak kaydıyla Royal
                      Canin’in sahip olduğu ve kullandığı değerli ticari
                      markaları ve hizmet markalarını (“Royal Canin Markaları”)
                      içerir. Site’de bulunan bilgiler, yazılar, resimler,
                      markalar, slogan ve diğer işaretler ile sair fikri
                      mülkiyet haklarına ilişkin bilgilerin korunmasına yönelik
                      programlar ile sayfa düzeni ve işbu Site’nin sunumu
                      münhasıran Royal Canin’in mülkiyetindedir. Royal Canin’den
                      önceden yazılı muvafakat alınmaksızın, Site’deki
                      bilgilerin, resimlerin veya açıklamaların ya da bu sayfaya
                      ilişkin her türlü veri tabanı, internet sitesi, yazılım
                      kodlarının kısmen ya da tamamen kopyalanması,
                      değiştirilmesi, yayımlanması, çevrimiçi ya da diğer bir
                      medya kullanılmak suretiyle gönderimi, dağıtımı, satılması
                      yasaktır. Site’deki bilgilerin kısmen kopyalanması veya
                      basılması ancak ticari olmayan kişisel ihtiyaçlarınız için
                      mümkündür.
                    </p>
                    <p>Site’nin İzin Verilen Kullanımları</p>
                    <p>
                      İşbu Koşullar’a tabi olarak, Royal Canin size, Site’ye
                      erişmek için kişisel kullanımınız ile sınırlı,
                      devredilemez, münhasır olmayan bir hak vermektedir. Bu
                      hak, Site özelliklerinin veya içeriğinin herhangi bir
                      yeniden satışını veya ticari kullanımını veya aşağıda
                      belirtilen sınırlı amaçlardan herhangi biri için Site’ye
                      erişme veya bunları kullanma hakkını içermez. Royal Canin
                      bu hakkı herhangi bir zamanda bir gerekçe gösterme
                      zorunluluğu olmaksızın geri alabilir.
                    </p>
                    <p>
                      İşbu Koşullar’da size verilen haklar şu koşullara tâbidir:
                      (a) Site’yi kendiniz veya bir üçüncü taraf adına, üçüncü
                      bir tarafa ürünlerin veya hizmetlerin yeniden satışı için
                      kullanamazsınız; (b) Site’yi, ürünlerini veya içeriklerini
                      Royal Canin’in yazılı izni olmadan lisanslayamaz, alt
                      lisans veremez, çoğaltamaz, satamaz, kiralayamaz, transfer
                      edemez, dağıtamaz, barındıramaz veya başka şekilde ticari
                      olarak kullanamazsınız; (c) Site’nin herhangi bir bölümünü
                      değiştirmez, türev işlemlerini yapamaz, parçalara ayıramaz
                      ve derleyemezsiniz; (d) benzer veya rekabetçi bir hizmet
                      oluşturmak veya başka bir kişi veya şirket yararına içerik
                      veya hesap bilgilerini indirmek, kopyalamak veya toplamak
                      için Site’ye erişemezsiniz; (e) burada açıkça
                      belirtilmedikçe, Site’nin hiçbir bölümünü Royal Canin’in
                      açık yazılı izni olmaksızın kopyalayamaz, çoğaltamaz,
                      dağıtamaz, yeniden yayınlayamaz, indiremez, gösteremez
                      veya iletemezsiniz.
                    </p>
                    <p>
                      Royal Canin, herhangi bir zamanda, Site’yi veya herhangi
                      bir parçasını önceden haber vermeksizin veya herhangi bir
                      bildirimde bulunmaksızın değiştirme, askıya alma veya
                      durdurma hakkını saklı tutar. Royal Canin’in, Site’nin
                      veya herhangi bir parçasının değiştirilmesi, askıya
                      alınması veya durdurulması için size veya üçüncü taraflara
                      karşı sorumlu olmayacağını kabul etmektesiniz.
                    </p>
                    <p>Kullanıcı Hesabı</p>
                    <p>
                      Sitenin belirli özelliklerini kullanabilmeniz için Site’ye
                      kayıt olmanız ve Site kayıt formunda belirtilen belirli
                      bilgileri sağlamanız gerekir. Bu kayıt formunda şunları
                      beyan ve taahhüt etmektesiniz: (a) gönderdiğiniz tüm
                      gerekli kayıt bilgileri güvenilir ve doğrudur ve doğru
                      kalmaya devam edecektir; ve (b) Site’yi kullanımınız
                      geçerli herhangi bir mevzuat hükmünü veya Koşullar’ı ihlal
                      etmemektedir.
                    </p>
                    <p>
                      Royal Canin hesabınızın giriş bilgilerinizin gizliliğini
                      korumakla yükümlüsünüz. Royal Canin hesabınızla ilişkili
                      tüm etkinliklerin (bunlarla sınırlı olmamak üzere,
                      herhangi bir satın alma, Site kullanımı veya Royal Canin
                      hesabınızdaki yazışmalar dâhil) sorumluluğu size aittir.
                      Site’de veya Site üzerindeki kullanıcı hesabınızın
                      yetkisiz kullanımı gerçekleştiği takdirde bu durumu derhal
                      Royal Canin’e bildirmeniz gerekmektedir. Royal Canin’e
                      böyle bir bildirimde bulunduğunuz takdirde, Royal Canin
                      hesabınızın tekrar yetkisiz kullanımını engellemek
                      amacıyla hesabınızı askıya alabilir veya başka şekilde
                      güvence altına alabilir.
                    </p>
                    <p>Kullanıcı İçeriği</p>
                    <p>
                      “Kullanıcı İçeriği”, Site kullanıcısının Royal Canin’e
                      gönderdiği her türlü bilgi ve içeriği ifade eder.
                      Kullanıcı İçeriği’nden yalnızca siz sorumlusunuz.
                      Kullanıcı İçeriği’nin kullanımıyla ilişkili tüm riskleri,
                      ve ilgili içeriğin doğruluğunu ve eksiksizliğini
                      üstlenmektesiniz. Kullanıcı İçeriği’ni Site’de kullanmanız
                      için gerekli olan haklara veya izinlere sahip olduğunuzu
                      beyan ve garanti etmektesiniz. Kullanıcı İçeriği’nden
                      münhasıran kendiniz sorumlu olduğunuzdan bunların herhangi
                      bir mevzuat hükmünü ve işbu Koşullar’ı ihlal etmesi
                      durumunda kendi sorumluluğunuz söz konusu olacaktır. Royal
                      Canin’in herhangi bir Kullanıcı İçeriği’ni yedeklemesi
                      zorunlu değildir, bunu yapacağına dair herhangi bir
                      beyanda bulunmamaktadır. Royal Canin’in Kullanıcı
                      İçeriği’ni istediği zaman silebileceğini kabul
                      etmektesiniz.
                    </p>
                    <p>
                      Royal Canin, Royal Canin’e sağladığınız her türlü geri
                      bildirimi, iletişimi veya öneriyi gizli bir şekilde ele
                      alacaktır. Bu nedenle, Royal Canin ile aksi yönde yazılı
                      bir anlaşmanın yokluğunda, herhangi bir üçüncü kişiye ait
                      gizli veya özel olduğunu düşündüğünüz herhangi bir bilgi
                      veya fikri Royal Canin’e göndermeyeceğinizi kabul
                      etmektesiniz.
                    </p>
                    <p>Kullanım Politikası</p>
                    <p>
                      Site’yi (a) herhangi bir üçüncü kişinin fikri mülkiyet
                      hakkını ve gizli bilgisini ihlal eden; (b) hukuka aykırı,
                      haksız, tehdit edici, zararlı, başkalarının mahremiyetine
                      zarar veren, kaba, iftira niteliğinde, yalan beyanda
                      bulunan, kasıtlı olarak yanıltan, ticarete açık,
                      pornografik, açık bir şekilde saldırıda bulunan (örneğin,
                      ırkçılığı teşvik eden, herhangi bir gruba veya bireye
                      karşı sakıncalı veya herhangi bir şekilde çocuklara
                      zararlı olabilecek içerikler); veya (c) mevzuatı, herhangi
                      bir sözleşmesel yükümlülüğü veya işbu Koşullar’ı ihlal
                      eden Kullanıcı İçeriği’ni toplamak, yüklemek, iletmek,
                      görüntülemek veya dağıtmak için kullanmamayı kabul
                      etmektesiniz.
                    </p>
                    <p>
                      Buna ek olarak, Site’yi ticari amaçlarla veya aşağıdaki
                      amaçlarla kullanmamayı da kabul etmektesiniz: (a)
                      bilgisayar sistemlerini hasara uğratacak virüsleri veya
                      yazılımları yüklemek, iletmek ya da dağıtmak; (b) ticari
                      amaçla veya başka bir amaca hizmet eder şekilde,
                      istenmeyen veya yetkisiz reklam, tanıtım malzemeleri,
                      istenmeyen ve gereksiz e-postalar veya başka herhangi
                      istenmeyen mesajlar göndermek; (c) onayları olmadan
                      e-posta adresleri de dâhil olmak üzere diğer
                      kullanıcılarla ilgili bilgileri toplamak; (d) Site’ye
                      bağlı sunucuları veya ağları engellemek veya bozmak veya
                      bu ağların düzenlemelerini, politikalarını veya
                      prosedürlerini ihlal etmek; (e) diğer bilgisayar
                      sistemleri veya sunucu ile bağlantılı veya birlikte
                      kullanılan ağlara yetkisiz erişim elde etme girişiminde
                      bulunmak; veya (f) başka bir kullanıcının Site’yi
                      kullanmına müdahale etmek veya herhangi bir şekilde
                      engellemek.
                    </p>
                    <p>
                      İşbu Koşullar’ın herhangi bir hükmünü ihlal etmeniz
                      halinde, tamamen Royal Canin’in takdirine bağlı olarak,
                      Kullanıcı İçeriği’nin kaldırılması, değiştirilmesi,
                      kullanıcı hesabının feshedilmesi ve/veya yasal makamlara
                      bildirim ve şikayette bulunulması da dâhil ancak bunlarla
                      sınırlı olmaksızın herhangi bir Kullanıcı İçeriği gözden
                      geçirilebilir, araştırılabilir ve / veya uygun önlemler
                      alınabilir (ancak Royal Canin’in herhangi bir şekilde
                      bunları yapma yükümlülüğü bulunmamaktadır). Kullanıcı
                      İçeriği’nin bir hak ihlaline sebebiyet verebilecek veya
                      Royal Canin’e karşı sorumluluk doğurabilecek olması
                      halinde ilgili Kullanıcı İçeriği’ni kaldırabilir veya
                      değiştirebiliriz. Mevzuat gereği bir yükümlülüğümüzün
                      olması ihtimalinde, resmi, idari veya yargı makamlarından
                      gelecek talepler doğrultusunda kullanıcı adınız ve
                      şifreniz, IP adresiniz ve trafik bilgileriniz, Kullanıcı
                      İçeriğiniz dâhil, gerekli bilgiler ilgili makamlar ile
                      paylaşılabilecektir.
                    </p>
                    <p>
                      Herhangi bir şüpheye mahal vermemek adına, Site’ye
                      iletilen her türlü Kullanıcı İçeriği’nden ilgili kullanıcı
                      sorumlu olup Royal Canin’in bunları denetleme, değiştirme
                      veya Site’den kaldırma hakkı olmakla birlikte böyle bir
                      yükümlülüğü bulunmamaktadır. Kullanıcı İçeriği’nin
                      herhangi bir mevzuat hükmünü, işbu Koşullar’ı veya
                      sözleşmesel yükümlülüğü ihlal etmesi halinde bu durumdan
                      ilgili kullanıcının kendisi şahsen sorumlu olup Royal
                      Canin’in herhangi bir sorumluluğu bulunmamaktadır.
                    </p>
                    <p>
                      Diğer Site kullanıcılarıyla olan etkileşimleriniz yalnızca
                      siz ve ilgili kullanıcı arasındadır. Bu tür etkileşimlerin
                      sonucu olarak meydana gelen herhangi bir uyuşmazlık, kayıp
                      veya hasardan Royal Canin’in sorumlu olmayacağını kabul
                      etmektesiniz.
                    </p>
                    <p>Üçüncü Taraf Siteleri ve Diğer Kullanıcılar</p>
                    <p>
                      Site, üçüncü taraf internet sitelerine (topluca “Üçüncü
                      Taraf Siteleri”) (örneğin, Facebook, YouTube, Twitter veya
                      Pinterest gibi sosyal medya siteleri) bağlantılar veya
                      reklamlar içerebilir. Royal Canin herhangi bir Üçüncü
                      Taraf Sitesi’nden sorumlu değildir. Royal Canin, bu Üçüncü
                      Taraf Siteleri’ne yalnızca kolaylık sağlamak amacıyla
                      bağlantı sağlar ve Üçüncü Taraf Siteleri ile ilgili olarak
                      herhangi bir beyanda veya taahhütte bulunmaz, bunların
                      içeriğini onaylamaz, denetlemez veya bunlara dair garanti
                      vermez. Tüm Üçüncü Taraf Siteleri’ni kendi
                      sorumluluğunuzda kullandığınızı kabul etmektesiniz. Bir
                      Üçüncü Taraf Sitesi’ne bağlandığınızda, gizlilik ve veri
                      toplama uygulamaları dâhil olmak üzere ilgili Üçüncü Taraf
                      Sitesi’nin kullanım şartları uygulanır. Herhangi bir
                      Üçüncü Taraf Sitesi’ni kullanmaya veya burada herhangi bir
                      işleme başlamadan ya da devam etmeden önce gerekli veya
                      uygun incelemeleri yapmanız gerekmektedir.
                    </p>
                    <p>Siparişi Değerlendirme Koşulu</p>
                    <p>
                      Site üzerinden bir sipariş verdiğinizde ödeme yönteminizi
                      ve / veya gönderim adresinizi doğrulayacağız. Royal Canin,
                      herhangi bir neden göstermeksizin herhangi bir
                      siparişinizi reddetme veya temin edilecek ürün adedini
                      değiştirme hakkını saklı tutar. Siparişiniz reddedildiği
                      durumda siparişte vermiş olduğunuz e-posta adresiniz
                      kullanılarak bilgilendirme yapılacaktır. Reddedilen bir
                      sipariş için sizden hâlihazırda ücret tahsil edildiği
                      durumda ücret size kendi ödeme yönteminiz ile iade
                      edilecektir.
                    </p>
                    <p>Sipariş Kabul ve Onayı</p>
                    <p>
                      Site üzerinden bir sipariş verdiğinizde bu siparişinizin
                      alındığına dair e-posta adresiniz kullanılarak
                      bilgilendirme yapılacaktır. Royal Canin, önceden haber
                      vermeksizin herhangi bir ürün üzerindeki sipariş miktarını
                      sınırlama hakkını saklı tutar. Bazı durumlarda Site
                      üzerinden verdiğiniz sipariş teyit edilmeden önce
                      bilgilerinizin doğrulanması gerekli olabilir. Site’de yer
                      alan ürünlerin fiyatları ve stok bilgileri Royal Canin
                      tarafından tek taraflı olarak ve önceden bildirilmeksizin
                      değiştirilebilir. Site’de veya siparişte herhangi bir hata
                      tespit edildiği takdirde bu hatalar Royal Canin tarafından
                      düzeltilebilir.
                    </p>
                    <p>Sipariş ve Miktar Sınırlamaları</p>
                    <p>
                      Royal Canin, tamamen kendi takdirine bağlı olarak ve
                      önceden bilgilendirme yapma zorunluluğu olmaksızın, kişi
                      başına, hane başına veya sipariş başına satın alınan
                      miktarları sınırlayabilir veya iptal edebilir.
                      Kısıtlamalar, aynı Site hesabı tarafından verilen
                      siparişleri, aynı kredi / banka kartını ve aynı
                      faturalandırma ve / veya gönderim adresini kullanan
                      siparişleri içerebilir. Siparişinizde bir değişiklik
                      yapmamız durumunda, siparişinizle birlikte verilen e-posta
                      adresiniz kullanılarak bilgilendirme yapılacaktır. Royal
                      Canin, Site üzerinden kurumsal müşterilere yapılan
                      satışları sınırlama veya yasaklama hakkını saklı tutar.
                    </p>
                    <p>Teslimat Koşulları</p>
                    <p>
                      Siparişleriniz, ödemenizin teyidi alındıktan sonra en geç
                      üç (3) iş günü (Pazartesi-Cuma günleri arası) içinde kargo
                      şirketine teslim edilir. Siparişleriniz, sadece Türkiye
                      Cumhuriyeti sınırları içindeki adreslere teslim
                      edilecektir. Tarafımızdan kaynaklanan bir aksilik olması
                      halinde ise bize sağlamış olduğunuz iletişim bilgileri
                      aracılığıyla size bilgilendirme yapılacaktır. Bu sebeple
                      iletişim bilgilerinizin eksiksiz ve doğru sağlanmış olması
                      önemlidir. Satın aldığınız ürünler bir teyit e-postası ile
                      tarafınıza bildirilecektir. Seçtiğiniz ürünlerden herhangi
                      birinin stokta mevcut olmaması durumunda konu ile ilgili
                      bir e-posta iletilecek ve ürünün ilk stoklara gireceği
                      tarih tarafınıza bildirilecektir. Site bir elektronik
                      ticaret sitesidir ve aynı anda birden çok kullanıcıya
                      alışveriş yapma imkânı tanır. Birden fazla tüketicinin
                      aynı ürünü alması ve bu sebeple ürün stoklarının tükenmesi
                      söz konusu olabilir. Böyle bir durumda ödemesini
                      yaptığınız ürünün stoklarımızda kalmaması halinde 1-5 gün
                      içinde ürün stoklarının yenilenip yenilenmeyeceği kontrol
                      edilecektir. Bu süre içinde ürün stoklarının
                      yenilenmeyeceği kesinleşirse söz konusu ürün için
                      yaptığınız ödeme, kendi ödeme yönteminiz kullanılarak iade
                      edilecektir.
                    </p>
                    <p>
                      Royal Canin’den satın alınan tüm ürünler, bir kargo
                      şirketi aracılığıyla kullanıcılara iletilecektir. Ürünler,
                      kargo şirketi tarafından kullanıcıya teslim edildiğinde
                      ürünlere ilişkin her türlü hasar ve risk kullanıcıya
                      geçecektir.
                    </p>
                    <p>Fiyat ve Ödeme</p>
                    <p>
                      Siparişlerinize ilişkin ödemeleri banka kartı ve/ya kredi
                      kartı ile yapabilirsiniz. Ödeme Türk Lirası üzerinden
                      yapılacaktır. Site’de gösterilen tüm fiyatlara Türkiye
                      Cumhuriyeti’nde yürürlükte olan %18 KDV dâhildir. Güvenli
                      ödeme sistemi sunmak için, Royal Canin önde gelen finans
                      kuruluşlarının güvenli ödeme sistemlerini kullanır. Genel
                      olarak, kredi / banka kartları, siparişinizi size
                      gönderene veya uygunluğunu teyit edene kadar Royal Canin
                      tarafından ücretlendirilmez (bu süre zarfında, yalnızca
                      uygun vergiler veya nakliye ücretleri ile birlikte
                      gönderdiğimiz ürünler için ücretlendirilirsiniz). Bununla
                      birlikte, sipariş tutarınızı siparişinizin verildiği
                      tarihte kredi / banka kartı düzenleyicinizle ön provizyon
                      alabiliriz. Bu, mevcut kredinizi etkileyebilir.
                    </p>
                    <p>ROYAL CANIN® Club</p>
                    <p>
                      ROYAL CANIN® Club, bu programın içinde yer alan belirli
                      ürün ve hizmetleri sitede tanımlandığı şekilde satın almak
                      isteyen Online Mağazamıza kayıtlı kullanıcılar için
                      otomatik olarak belirli aralıklarla ürün satın alınmasına
                      ilişkin bir abonelik programıdır. Alıcı, bu programa
                      katıldığı takdirde söz konusu satışlarda aşağıdaki
                      hükümler uygulanacaktır:
                    </p>
                    <p>
                      a. Ürünlerin otomatik olarak gönderilme sıklığı, Alıcı
                      tarafından belirlenir.
                    </p>
                    <p>
                      b. Program dahilindeki mama seçenekleri, tavsiye
                      niteliğindedir. Evcil hayvanın özel ihtiyaç ve
                      hassasiyetlerinin her zaman için göz önünde bulundurulması
                      ve en uygun sağlıklı beslenme çözümünü öğrenmek için
                      Veteriner Hekime danışılması önerilir.
                    </p>
                    <p>
                      c. Club programında önerilen ürünler tekli siparişe de
                      açık olup Alıcı’nın bu ürünleri satın alabilmesi için Club
                      programına dahil olmasına gerek bulunmamaktadır.
                    </p>
                    <p>
                      d. Club programı dahilinde haftaiçi her gün 09.00-18.00
                      saatleri arasında hizmet veren Beslenme Danışmanları
                      vardır. Bu danışmanlar, yalnızca veteriner hekim muayenesi
                      ve kontrolü gerektirmeyen evcil hayvan bakımı, beslenmesi
                      ve davranışları hakkında Club üyelerine tavsiyelerde
                      bulunur.
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
                      iptal ücreti olmadan Club aboneliğini değiştirebilir veya
                      iptal edebilir. Alıcı’nın Club aboneliği kapsamındaki
                      ürünü değiştirmesi durumunda artık yeni belirlenen ürünün
                      fiyatı üzerinden ücretlendirme yapılacaktır.
                    </p>
                    <p>
                      h. Alıcı, herhangi bir teslimatı bir sonraki sipariş
                      tarihinden en az bir gün önce atlamayı tercih edebilir. Bu
                      durumda söz konusu sipariş gönderilmeyecek ve
                      faturalanmayacaktır. Bu durumda ilgili teslimat kapsamında
                      bir hediye gönderilecekse, bu hediye bir sonraki teslimat
                      ile gönderilecektir. Ancak bu durumda beslenme danışmanı
                      tavsiyelerinden faydalanmaya devam edebileceksiniz.
                    </p>
                    <p>
                      i. Alıcı, siparişin gönderilme tarihini, ilgili sipariş
                      oluşmadan önce değiştirebilir. Herhangi bir siparişe
                      ilişkin tarih değiştirildiğinde, sonraki siparişlerin
                      tarihleri otomatik olarak değiştirilmez.
                    </p>
                    <p>
                      j. Alıcı, Club programı kapsamındaki siparişlerin teslimat
                      veya fatura adresini, ilgili siparişi vermeden önce
                      değiştirebilir.
                    </p>
                    <p>
                      k. Club programı kapsamında satın alınan ürünlerin
                      teslimatı ücretsiz yapılacaktır.
                    </p>
                    <p>
                      l. Club programı kapsamındaki ürünlerden herhangi birinin
                      ücretinde artış olduğu takdirde Alıcı’ya bu değişikliği
                      bildirmek ve söz konusu satın almaya devam etmek isteyip
                      istemediğinin onayını almak üzere e-posta gönderilecektir.
                      Alıcı’nın bu bildirimi almasından itibaren yedi (7) gün
                      içinde fiyat artışını kabul etmemesi durumunda Satıcı söz
                      konusu siparişi işleyeme koyamayacak ve gönderemeyecektir.
                      Alıcı’nın yedi (7) gün içinde fiyat artışını kabul
                      etmediğine dair bir bildirimde bulunmaması halinde takip
                      eden siparişleri, yeni fiyat üzerinden
                      ücretlendirilecektir.
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
                      Alıcı’nın kartının geçerlilik süresi sona ermesine rağmen
                      kart bilgilerini güncellememesi durumunda Satıcı, abonelik
                      konusu siparişi işleme koyamayacak ve gönderemeyecektir.
                    </p>
                    <p>
                      o. Alıcı’nın kartına ilişkin ödeme onayı her bir sipariş
                      için kontrol edilecektir ve ödeme, Alıcı’nın siparişi
                      oluştuğunda tahsil edilecektir. Ödemeye ilişkin herhangi
                      bir problem olduğu takdirde ödeme bilgilerini güncellemesi
                      için Alıcı ile iletişime geçilecektir. Satıcı, ödeme
                      bilgilerini güncellemesi için Alıcı’ya ulaşamadığı
                      takdirde Satıcı, abonelik konusu siparişi işleme
                      koyamayacak ve gönderemeyecektir.
                    </p>
                    <p>
                      p. Alıcı’nın aboneliği kapsamındaki bir ürünün geçici
                      olarak stok dışı olması durumunda bu husus Alıcı’ya
                      bildirilecek ve söz konusu ürün stoka girene kadar
                      siparişleri işleme koyulamayacaktır. Alıcı’nın aboneliği
                      kapsamındaki bir ürünün süresiz olarak stok dışı olması
                      durumunda bu husus Alıcı’ya bildirilecek ve Alıcı’nın söz
                      konusu ürün hakkındaki aboneliği otomatik olarak iptal
                      edilecektir. Alıcı’nın böyle bir durumda Satıcı’dan
                      herhangi bir talep hakkı bulunmamaktadır. Hediyeler ise
                      ürün kapsamında sayılmaz, stok durumuna veya Satıcı’nın
                      takdirine göre hediyeler üründen ayrı şekilde veya daha
                      sonraki bir zamanda gönderilebilir.
                    </p>
                    <p>Promosyonlar ve Kuponlar</p>
                    <p>
                      Bir promosyon / kupon kodu kullanılıyorsa, ilgili teklifi
                      kullanmak için belirlenen kod, “Promosyon Kodu” alanına
                      ödeme sırasında girilmelidir. Herhangi bir promosyon veya
                      kupon, diğer promosyonlarla veya kuponlarla
                      birleştirilemez; işlem başına yalnızca bir adet promosyon
                      veya kupon kodu kullanılabilir ve sepet tutarından
                      düşülür. Royal Canin, belirli ürünler, ağırlıklar, bazı
                      gönderim ücretleri ve hızlandırılmış nakliye ücretlerinin
                      promosyon veya kuponlar aracılığıyla ödenmesini kısıtlama
                      hakkını saklı tutar. Teklif koşullarında aksi
                      belirtilmedikçe, çevrimiçi kuponlar Royal Canin
                      mağazalarında veya Royal Canin ürünlerinin satıldığı
                      herhangi bir satış noktasında geçerli değildir.
                    </p>
                    <p>İade Şartları ve Prosedürü</p>
                    <p>
                      Site üzerinden satın almış olduğunuz ürünü kullanmadan,
                      tahrip etmeden ve ticari olarak satılabilirliğini ve
                      kullanılabilirliğini bozmadan teslim almış olduğunuz
                      tarihinden itibaren 14 (on dört) günlük süre içinde teslim
                      aldığınız şekli ile anlaşmalı olduğumuz kargo şirketi
                      aracılığıyla iade edebilirsiniz. Ürünü, ürünün faturasını
                      ve iade sebebini içeren talebinizi bize iletmeniz halinde
                      iade prosedürü işletilecektir. Açılmış / denenmiş / hasar
                      görmüş / kullanılmış ürünler kapsamına giren ürünlerin
                      iadesi kabul edilmemektedir.
                    </p>
                    <p>
                      İade etmek istediğiniz ürünün faturası kurumsal ise, iade
                      ederken kurumun düzenlemiş olduğu iade faturası ile
                      birlikte göndermeniz gerekmektedir. İade faturası, kargo
                      payı dâhil edilmeden (ürün birim fiyatı + KDV şeklinde)
                      kesilmelidir. Faturası kurumlar adına düzenlenen sipariş
                      iadeleri, iade faturası kesilmediği takdirde
                      tamamlanamayacaktır.
                    </p>
                    <p>
                      Teslim aldığınız paketleri kargo şirketi yetkilisi önünde
                      açıp kontrol ediniz. Eğer üründe herhangi bir hasar varsa
                      kargo şirketine tutanak tutturarak ürünü teslim almayınız.
                      Ürün teslim alındıktan sonra kargo şirketinin görevini tam
                      olarak yerine getirdiğini ve ürünü hasarsız ve eksiksiz
                      teslim aldığınızı kabul etmiş sayılmaktasınız.
                    </p>
                    <p>
                      Site üzerinden satın almış olduğunuz ve paketi açılmış,
                      ambalajı veya kendisi zarar görmüş, bozulmuş, kırılmış,
                      tahrip edilmiş, yırtılmış ve/veya kullanılmış ürünlerin
                      iadesi kabul edilmemektedir. Orijinal ambalajı zarar
                      görmüş, tahrip edilmiş ve sair şekildeki ürünlerin iadesi
                      kabul edilmez. Ürünü, teslim aldığınız andaki durumunda
                      iade etmekle yükümlüsünüz. Ürünü iade etmeniz veya henüz
                      ürünü teslim almadan cayma hakkınızı kullanmanız halinde,
                      iade edilen ürün iade adresimize ulaştığı tarihten
                      itibaren üç (3) iş günü içinde ürün bedeli tarafınıza,
                      kendi ödeme yönteminiz kullanılarak iade edilecektir. Bu
                      tutarın iadesinin kredi / banka kartınıza yansıtılma
                      süresi, kendi bankanızın uygulamaları doğrultusunda
                      değişkenlik gösterebilir ve bunlardan Royal Canin sorumlu
                      tutulamaz. Taksitli satışlarda yapılan iadeler bankanız
                      tarafından kredi / banka kartınıza her ay artı bakiye
                      olarak yansıtılabilir.
                    </p>
                    <p>Sorumluluk Sınırlaması</p>
                    <p>
                      Royal Canin, Site’ye erişilmesi, Site’nin ya da Site’deki
                      bilgilerin ve diğer verilerin ve programların kullanılması
                      sebebiyle, Koşullar’ın ihlali, haksız fiil ya da başkaca
                      sebeplere binaen doğabilecek doğrudan ya da dolaylı hiçbir
                      zarardan sorumlu değildir. Royal Canin, Koşullar’ın
                      ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde
                      Site üzerinden yürütülen işlemin kesintiye uğraması, hata
                      veya ihmal durumunda herhangi bir sorumluluk kabul etmez.
                      Site’ye ya da bağlantı verilen Üçüncü Taraf Siteleri’ne
                      erişilmesi ya da bunların kullanılması sonucunda
                      doğabilecek her tür sorumluluktan, mahkeme masrafları ve
                      diğer masraflar da dâhil olmak üzere herhangi bir zarardan
                      Royal Canin sorumlu olmayacaktır.
                    </p>
                    <p>Uygulanacak Hukuk ve Yetkili Mahkeme</p>
                    <p>
                      İşbu Koşullar ve Site’nin kullanımı ile ilgili olarak
                      çıkabilecek ihtilaflarda öncelikle işbu Koşullar’daki
                      hükümler; Koşullar’da hüküm bulunmaması halinde ise
                      Türkiye Cumhuriyeti mevzuatı uygulanacaktır. İşbu Koşullar
                      ve Site’nin kullanımından doğabilecek her türlü
                      uyuşmazlığın çözümünde İstanbul Merkez (Çağlayan)
                      Mahkemeleri ile İcra Daireleri yetkili olacaktır.
                    </p>
                    <p>Gizlilik</p>
                    <p>
                      İşbu Koşullar’ın yürürlükte olduğu süre boyunca ve
                      Koşullar’ın sona ermesinden sonra taraflar yazılı, sözlü
                      veya sair surette kendilerine iletilen her türlü bilgi ve
                      belgeleri (“Gizli Bilgiler”), ilgili mevzuat hükümleri
                      saklı kalmak üzere, karşı tarafın yazılı onayı olmadan
                      üçüncü kişilere açıklayamaz; başka kişi, kurum ve
                      kuruluşların yararına kullanamaz ve kullandıramaz.
                      Taraflar, yukarıda sayılan Gizli Bilgiler’in gizliliğini
                      sağlamak, bu hususta her türlü önlemi almak, gizlilik
                      esaslarına uygun hareket etmek, bu bilgilerin yetkisiz
                      kişilerce kullanımını önlemek ve her türlü suiistimalden
                      korumak için her türlü önlemi almakla yükümlüdür.
                    </p>
                    <p>Kişisel Verilerin Korunması</p>
                    <p>
                      Site’yi kullanımınız kapsamında kişisel verilerinizin
                      korunması hakkında aydınlatma bildirimine buradan
                      ulaşabilirsiniz.
                    </p>
                    <p>Site Kullanımının Sona Erdirilmesi</p>
                    <p>
                      Royal Canin, yürürlükteki mevzuat hükümlerine veya işbu
                      Koşullar’a aykırı herhangi bir davranışınız olması halinde
                      tamamen kendi takdirine bağlı olarak, bu Site’deki kişisel
                      hesabınızı, üyelik kayıtlarınızı veya benzer kullanımları
                      herhangi bir zamanda incelemeye alabilir, dondurabilir
                      veya sona erdirebilir. Hesabınızın sona erdirilmesinden
                      önce vermiş olduğunuz siparişlere ilişkin ödeme
                      yükümlülüğünüz devam eder. Hesabınızın sona erdirilmesi
                      durumunda Site’de hiçbir hesabınız veya benzeri üyelik
                      haklarınız kalmayacaktır. İşbu Koşullar kapsamındaki
                      sorumluluk sınırlamaları ve muhtelif hükümler, bu tür bir
                      sona erdirmeden sonra geçerliliğini korumaya devam eder.
                      Royal Canin, Site üzerinden vermiş olduğunuz iletişim
                      bilgileri aracılığıyla hesabınızın sona erdirildiğine dair
                      bildirim gönderebilir.
                    </p>
                    <p>
                      Royal Canin önceden haber vermeksizin tamamen kendi
                      takdirine bağlı olarak bu Site’nin tamamını veya bir
                      kısmını değiştirme, askıya alma, kapatma veya devam
                      ettirme hakkını saklı tutar
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
