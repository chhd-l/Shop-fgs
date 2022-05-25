import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { seoHoc } from '@/framework/common';
import BreadCrumbs from '@/components/BreadCrumbs';
import './index.css';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
@injectIntl
@seoHoc('general terms conditions page')
@observer
class TermsConditionsTr extends React.Component {
  spacingFragment = () => {
    return (
      <p
        style={{
          color: '#666666',
          'background-color': '#ffffff',
          margin: '0px 0px 1rem',
          padding: '0px'
        }}
      >
        &nbsp;
      </p>
    );
  };
  h2Fragment = (title) => {
    return (
      <h2
        style={{
          color: '#666666',
          'margin-top': '0px',
          'margin-bottom': '0.5rem',
          'text-align': 'left'
        }}
      >
        <span>{title}</span>
      </h2>
    );
  };
  p1 = (content) => {
    return (
      <p
        style={{
          color: '#666666',
          'margin-top': '0px',
          'margin-bottom': '1rem',
          'text-align': 'left'
        }}
      >
        {content}
      </p>
    );
  };
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-content-block rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-one-column rc-max-width--xl rc-content-h-middle">
              <div className="rc-column rc-text--left">
                <div className="rc-full-width rc-padding-x--sm">
                  <div
                    data-js-table="true"
                    data-rc-feature-tables-setup="true"
                    className="richtext-editor rc-wysiwyg rc-bg-colour--brand3"
                  >
                    <div
                      className="rc-one-column"
                      style={{
                        color: '#666666',
                        'background-color': '#ffffff',
                        margin: '0px',
                        padding: '0px'
                      }}
                    >
                      <div
                        className="rc-column rc-padding-left--none"
                        style={{
                          width: '1336.02px',
                          margin: 0,
                          padding: '1rem'
                        }}
                      >
                        <h1
                          className="rc-alpha"
                          style={{
                            color: '#e2001a',
                            margin: '20px 0px 0.5rem',
                            padding: '0px',
                            'text-align': 'center'
                          }}
                        >
                          Şartlar ve Koşullar
                        </h1>
                      </div>
                    </div>
                    {this.spacingFragment()}

                    {this.h2Fragment('Geçerlilik Kapsamı')}
                    {this.spacingFragment()}
                    {this.p1(
                      'İşbu Genel Hükümler ve Koşullar (“Koşullar”) Royal Canin Turkey Evcil Hayvan Ürünleri Limited Şirketi (bundan sonra “Royal Canin” olarak anılacaktır) ile Royal Canin internet veya “web” sitelerini (topluca “Site” veya “Siteler” olarak anılacaktır) kullanan siz tüketiciler veya şahsi kullanıcılarla arasındaki belirli yasal yükümlülüklere dair bildirimde bulunmak amacıyla hazırlanmıştır.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site üzerinde her tür kullanım ve tasarruf yetkisi Royal Canin’e aittir. Koşullar, Site kullanımınızı ve Site’de satın aldığınız veya kullandığınız herhangi bir ürün veya hizmetimizin yasal olarak bağlayıcı koşullarını belirlemektedir. Site’ye erişim sağlayarak ve / veya kullanarak, Koşullar’ı kabul etme hakkınız ve yetkinliğinizin olduğunu ve tüm Koşullar’a uymayı kabul ettiğinizi beyan etmiş sayılmaktasınız. Lütfen Site’yi kullanmadan önce Koşullar’ı dikkatle okuyunuz. Site’deki belirli ürün ve hizmetlerin geçerli olması için ek şartlar olabilir (örneğin, Abonelik programımıza üye olmanız durumunda, ayrıca Abonelik Hüküm ve Koşulları’na tabi olursunuz). Royal Canin, Koşullar da dâhil olmak üzere, Site ve Site uzantılarında mevcut her tür koşulu ve bilgiyi önceden herhangi bir ihtara gerek olmaksızın değiştirme hakkını saklı tutar. Değişiklikler Site’de yayım anında yürürlüğe girer. Site’yi kullanabilmeniz işbu Koşullar’ı kabul etmenize bağlıdır.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, Site’de mevcut olan bilgilerin doğruluk ve güncelliğini sürekli şekilde kontrol etmektedir. Ancak tüm itinalı çalışmaya rağmen, Site’de sunulmuş olan bilgiler fiili değişikliklerin gerisinde kalabilir. Site’de bulacağınız ürünler ve bilgiler Site’ye verildiği anda geçerli olacak şekilde sunulmuştur. Bu sebeple ilgili hizmetin güncel durumu ile Site’de yer alan durumu arasında farklılık olabilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Site’de Değişiklik Yapma Hakkı')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, işbu Koşullar da dâhil olmak üzere Site ve Site uzantısında mevcut her tür hizmet, ürün ve Site’yi kullanma koşulları ile Site’de sunulan bilgileri önceden bir ihtara gerek olmaksızın değiştirme, Site’yi yeniden organize etme ve yayını durdurma hakkını saklı tutar. Değişiklikler Site’de yayım anında yürürlüğe girer. Site’nin kullanımı ya da Site’ye giriş ile bu değişiklikler de kabul edilmiş sayılır. Royal Canin, Koşullar’ın ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde; işlemin kesintiye uğraması, hata, ihmal, kesinti, silinme, kayıp, işlemin veya iletişimin gecikmesi, bilgisayar virüsü, iletişim hatası, hırsızlık, imha veya izinsiz olarak kayıtlara girilmesi, değiştirilmesi veya kullanılması hususunda herhangi bir sorumluluk kabul etmez.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment(
                      'Bilgi, Makale ve Tavsiyeye İlişkin Kısıtlamalar'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, Site’de evcil hayvanlar hakkında sadece eğitim amaçlı bilgi, makale ve tavsiye sunabilmektedir. Bu Site aracılığıyla sunulan herhangi bir bilgi, makale veya tavsiye evcil hayvanınızda hastalık teşhis edilmesine veya tedavi edilmesine yönelik değildir ve bir veteriner hekim tarafından sağlanan veterinerlik hizmetinin yerine geçmez. Evcil hayvanınızın bakımı ve tedavisi ile ilgili tıbbi veya sağlıkla ilgili tavsiyeler için, veteriner hekiminiz ile iletişim kurunuz.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Ürün Ekranı & Renkler')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Bu Site, ürün resimlerini olabildiğince gerçeğe uygun bir şekilde göstermeye çalışır. Ancak, Site’de gördüğünüz rengin ürünün gerçek rengiyle eşleştiğini garanti edemeyiz. Renk görüntüsünün, kısmen kullandığınız ekrana (monitör) ve cihazınızın ayarlarına bağlı olabileceğini ve bunlardan dolayı renklerde farklılık olabileceğini unutmayınız.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Site’de Oluşabilecek Hatalar')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site’de sunulan ürün ve hizmetlerin fiyatları ve kullanılabilirliği, kullanıcılara önceden bilgi verilmeksizin değiştirilebilir. Site’de verilen bilgilerde hata bulunduğu takdirde bu hatalar Royal Canin tarafından düzeltilir. Royal Canin, belirtilen herhangi bir teklifi iptal etme ve siparişin onaylanıp onaylanmadığı bilgisini veya kredi / banka kartınız dâhil olmak üzere herhangi bir hatayı, yanlışlığı veya ihmali düzeltme hakkını saklı tutar. Kredi / banka kartınız satın alma işlemi için zaten ücretlendirildiyse ve siparişiniz iptal edildiyse, ilgili tutar kredi / banka kartınıza iade edilir. Bu tutarın iadesinin kredi / banka kartınıza yansıtılma süresi, kendi bankanızın uygulamaları doğrultusunda değişkenlik gösterebilir ve bunlardan Royal Canin sorumlu tutulamaz. Satın aldığınız üründen memnun olmadığınız takdirde işbu Koşullar’da belirtilen iade şartları doğrultusunda ürün iadesi yapabilirsiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Fikri Mülkiyet Hakları')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site, Royal Canin logosu ve Royal Canin sanal mağaza logosu dâhil ancak bunlarla sınırlı olmamak kaydıyla Royal Canin’in sahip olduğu ve kullandığı değerli ticari markaları ve hizmet markalarını (“Royal Canin Markaları”) içerir. Site’de bulunan bilgiler, yazılar, resimler, markalar, slogan ve diğer işaretler ile sair fikri mülkiyet haklarına ilişkin bilgilerin korunmasına yönelik programlar ile sayfa düzeni ve işbu Site’nin sunumu münhasıran Royal Canin’in mülkiyetindedir. Royal Canin’den önceden yazılı muvafakat alınmaksızın, Site’deki bilgilerin, resimlerin veya açıklamaların ya da bu sayfaya ilişkin her türlü veri tabanı, internet sitesi, yazılım kodlarının kısmen ya da tamamen kopyalanması, değiştirilmesi, yayımlanması, çevrimiçi ya da diğer bir medya kullanılmak suretiyle gönderimi, dağıtımı, satılması yasaktır. Site’deki bilgilerin kısmen kopyalanması veya basılması ancak ticari olmayan kişisel ihtiyaçlarınız için mümkündür..'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Site’nin İzin Verilen Kullanımları')}
                    {this.spacingFragment()}
                    {this.p1(
                      'İşbu Koşullar’a tabi olarak, Royal Canin size, Site’ye erişmek için kişisel kullanımınız ile sınırlı, devredilemez, münhasır olmayan bir hak vermektedir. Bu hak, Site özelliklerinin veya içeriğinin herhangi bir yeniden satışını veya ticari kullanımını veya aşağıda belirtilen sınırlı amaçlardan herhangi biri için Site’ye erişme veya bunları kullanma hakkını içermez. Royal Canin bu hakkı herhangi bir zamanda bir gerekçe gösterme zorunluluğu olmaksızın geri alabilir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'İşbu Koşullar’da size verilen haklar şu koşullara tâbidir: (a) Site’yi kendiniz veya bir üçüncü taraf adına, üçüncü bir tarafa ürünlerin veya hizmetlerin yeniden satışı için kullanamazsınız; (b) Site’yi, ürünlerini veya içeriklerini Royal Canin’in yazılı izni olmadan lisanslayamaz, alt lisans veremez, çoğaltamaz, satamaz, kiralayamaz, transfer edemez, dağıtamaz, barındıramaz veya başka şekilde ticari olarak kullanamazsınız; (c) Site’nin herhangi bir bölümünü değiştirmez, türev işlemlerini yapamaz, parçalara ayıramaz ve derleyemezsiniz; (d) benzer veya rekabetçi bir hizmet oluşturmak veya başka bir kişi veya şirket yararına içerik veya hesap bilgilerini indirmek, kopyalamak veya toplamak için Site’ye erişemezsiniz; (e) burada açıkça belirtilmedikçe, Site’nin hiçbir bölümünü Royal Canin’in açık yazılı izni olmaksızın kopyalayamaz, çoğaltamaz, dağıtamaz, yeniden yayınlayamaz, indiremez, gösteremez veya iletemezsiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, herhangi bir zamanda, Site’yi veya herhangi bir parçasını önceden haber vermeksizin veya herhangi bir bildirimde bulunmaksızın değiştirme, askıya alma veya durdurma hakkını saklı tutar. Royal Canin’in, Site’nin veya herhangi bir parçasının değiştirilmesi, askıya alınması veya durdurulması için size veya üçüncü taraflara karşı sorumlu olmayacağını kabul etmektesiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Kullanıcı Hesabı')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Sitenin belirli özelliklerini kullanabilmeniz için Site’ye kayıt olmanız ve Site kayıt formunda belirtilen belirli bilgileri sağlamanız gerekir. Bu kayıt formunda şunları beyan ve taahhüt etmektesiniz: (a) gönderdiğiniz tüm gerekli kayıt bilgileri güvenilir ve doğrudur ve doğru kalmaya devam edecektir; ve (b) Site’yi kullanımınız geçerli herhangi bir mevzuat hükmünü veya Koşullar’ı ihlal etmemektedir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin hesabınızın giriş bilgilerinizin gizliliğini korumakla yükümlüsünüz. Royal Canin hesabınızla ilişkili tüm etkinliklerin (bunlarla sınırlı olmamak üzere, herhangi bir satın alma, Site kullanımı veya Royal Canin hesabınızdaki yazışmalar dâhil) sorumluluğu size aittir. Site’de veya Site üzerindeki kullanıcı hesabınızın yetkisiz kullanımı gerçekleştiği takdirde bu durumu derhal Royal Canin’e bildirmeniz gerekmektedir. Royal Canin’e böyle bir bildirimde bulunduğunuz takdirde, Royal Canin hesabınızın tekrar yetkisiz kullanımını engellemek amacıyla hesabınızı askıya alabilir veya başka şekilde güvence altına alabilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Kullanıcı İçeriği')}
                    {this.spacingFragment()}
                    {this.p1(
                      '“Kullanıcı İçeriği”, Site kullanıcısının Royal Canin’e gönderdiği her türlü bilgi ve içeriği ifade eder. Kullanıcı İçeriği’nden yalnızca siz sorumlusunuz. Kullanıcı İçeriği’nin kullanımıyla ilişkili tüm riskleri, ve ilgili içeriğin doğruluğunu ve eksiksizliğini üstlenmektesiniz. Kullanıcı İçeriği’ni Site’de kullanmanız için gerekli olan haklara veya izinlere sahip olduğunuzu beyan ve garanti etmektesiniz. Kullanıcı İçeriği’nden münhasıran kendiniz sorumlu olduğunuzdan bunların herhangi bir mevzuat hükmünü ve işbu Koşullar’ı ihlal etmesi durumunda kendi sorumluluğunuz söz konusu olacaktır. Royal Canin’in herhangi bir Kullanıcı İçeriği’ni yedeklemesi zorunlu değildir, bunu yapacağına dair herhangi bir beyanda bulunmamaktadır. Royal Canin’in Kullanıcı İçeriği’ni istediği zaman silebileceğini kabul etmektesiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, Royal Canin’e sağladığınız her türlü geri bildirimi, iletişimi veya öneriyi gizli bir şekilde ele alacaktır. Bu nedenle, Royal Canin ile aksi yönde yazılı bir anlaşmanın yokluğunda, herhangi bir üçüncü kişiye ait gizli veya özel olduğunu düşündüğünüz herhangi bir bilgi veya fikri Royal Canin’e göndermeyeceğinizi kabul etmektesiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Kullanım Politikası')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site’yi (a) herhangi bir üçüncü kişinin fikri mülkiyet hakkını ve gizli bilgisini ihlal eden; (b) hukuka aykırı, haksız, tehdit edici, zararlı, başkalarının mahremiyetine zarar veren, kaba, iftira niteliğinde, yalan beyanda bulunan, kasıtlı olarak yanıltan, ticarete açık, pornografik, açık bir şekilde saldırıda bulunan (örneğin, ırkçılığı teşvik eden, herhangi bir gruba veya bireye karşı sakıncalı veya herhangi bir şekilde çocuklara zararlı olabilecek içerikler); veya (c) mevzuatı, herhangi bir sözleşmesel yükümlülüğü veya işbu Koşullar’ı ihlal eden Kullanıcı İçeriği’ni toplamak, yüklemek, iletmek, görüntülemek veya dağıtmak için kullanmamayı kabul etmektesiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Buna ek olarak, Site’yi ticari amaçlarla veya aşağıdaki amaçlarla kullanmamayı da kabul etmektesiniz: (a) bilgisayar sistemlerini hasara uğratacak virüsleri veya yazılımları yüklemek, iletmek ya da dağıtmak; (b) ticari amaçla veya başka bir amaca hizmet eder şekilde, istenmeyen veya yetkisiz reklam, tanıtım malzemeleri, istenmeyen ve gereksiz e-postalar veya başka herhangi istenmeyen mesajlar göndermek; (c) onayları olmadan e-posta adresleri de dâhil olmak üzere diğer kullanıcılarla ilgili bilgileri toplamak; (d) Site’ye bağlı sunucuları veya ağları engellemek veya bozmak veya bu ağların düzenlemelerini, politikalarını veya prosedürlerini ihlal etmek; (e) diğer bilgisayar sistemleri veya sunucu ile bağlantılı veya birlikte kullanılan ağlara yetkisiz erişim elde etme girişiminde bulunmak; veya (f) başka bir kullanıcının Site’yi kullanmına müdahale etmek veya herhangi bir şekilde engellemek.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'İşbu Koşullar’ın herhangi bir hükmünü ihlal etmeniz halinde, tamamen Royal Canin’in takdirine bağlı olarak, Kullanıcı İçeriği’nin kaldırılması, değiştirilmesi, kullanıcı hesabının feshedilmesi ve/veya yasal makamlara bildirim ve şikayette bulunulması da dâhil ancak bunlarla sınırlı olmaksızın herhangi bir Kullanıcı İçeriği gözden geçirilebilir, araştırılabilir ve / veya uygun önlemler alınabilir (ancak Royal Canin’in herhangi bir şekilde bunları yapma yükümlülüğü bulunmamaktadır). Kullanıcı İçeriği’nin bir hak ihlaline sebebiyet verebilecek veya Royal Canin’e karşı sorumluluk doğurabilecek hallerde kaldırabilir veya değiştirebiliriz. Mevzuat gereği bir yükümlülüğümüzün olması ihtimalinde, resmi, idari veya yargı makamlarından gelecek talepler doğrultusunda kullanıcı adınız ve şifreniz, IP adresiniz ve trafik bilgileriniz, Kullanıcı İçeriğiniz dâhil, gerekli bilgiler ilgili makamlar ile paylaşılabilecektir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Herhangi bir şüpheye mahal vermemek adına, Site’ye iletilen her türlü Kullanıcı İçeriği’nden ilgili kullanıcı sorumlu olup Royal Canin’in bunları denetleme, değiştirme veya Site’den kaldırma hakkı olmakla birlikte böyle bir yükümlülüğü bulunmamaktadır. Kullanıcı İçeriği’nin herhangi bir mevzuat hükmünü, işbu Koşullar’ı veya sözleşmesel yükümlülüğü ihlal etmesi halinde bu durumdan ilgili kullanıcının kendisi şahsen sorumlu olup Royal Canin’in herhangi bir sorumluluğu bulunmamaktadır.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Diğer Site kullanıcılarıyla olan etkileşimleriniz yalnızca siz ve ilgili kullanıcı arasındadır. Bu tür etkileşimlerin sonucu olarak meydana gelen herhangi bir uyuşmazlık, kayıp veya hasardan Royal Canin’in sorumlu olmayacağını kabul etmektesiniz.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment(
                      'Üçüncü Taraf Siteleri ve Diğer Kullanıcılar'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site, üçüncü taraf internet sitelerine (topluca “Üçüncü Taraf Siteleri”) (örneğin, Facebook, YouTube, Twitter veya Pinterest gibi sosyal medya siteleri) bağlantılar veya reklamlar içerebilir. Royal Canin herhangi bir Üçüncü Taraf Sitesi’nden sorumlu değildir. Royal Canin, bu Üçüncü Taraf Siteleri’ne yalnızca kolaylık sağlamak amacıyla bağlantı sağlar ve Üçüncü Taraf Siteleri ile ilgili olarak herhangi bir beyanda veya taahhütte bulunmaz, bunların içeriğini onaylamaz, denetlemez veya bunlara dair garanti vermez. Tüm Üçüncü Taraf Siteleri’ni kendi sorumluluğunuzda kullandığınızı kabul etmektesiniz. Bir Üçüncü Taraf Sitesi’ne bağlandığınızda, gizlilik ve veri toplama uygulamaları dâhil olmak üzere ilgili Üçüncü Taraf Sitesi’nin kullanım şartları uygulanır. Herhangi bir Üçüncü Taraf Sitesi’ni kullanmaya veya burada herhangi bir işleme başlamadan ya da devam etmeden önce gerekli veya uygun incelemeleri yapmanız gerekmektedir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Siparişi Değerlendirme Koşulu')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site üzerinden bir sipariş verdiğinizde ödeme yönteminizi ve / veya gönderim adresinizi doğrulayacağız. Royal Canin, herhangi bir neden göstermeksizin herhangi bir siparişinizi reddetme veya temin edilecek ürün adedini değiştirme hakkını saklı tutar. Siparişiniz reddedildiği durumda siparişte vermiş olduğunuz e-posta adresiniz kullanılarak bilgilendirme yapılacaktır. Reddedilen bir sipariş için sizden hâlihazırda ücret tahsil edildiği durumda ücret size kendi ödeme yönteminiz ile iade edilecektir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Sipariş Kabul ve Onayı')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site üzerinden bir sipariş verdiğinizde bu siparişinizin alındığına dair e-posta adresiniz kullanılarak bilgilendirme yapılacaktır. Royal Canin, önceden haber vermeksizin herhangi bir ürün üzerindeki sipariş miktarını sınırlama hakkını saklı tutar. Bazı durumlarda Site üzerinden verdiğiniz sipariş teyit edilmeden önce bilgilerinizin doğrulanması gerekli olabilir. Site’de yer alan ürünlerin fiyatları ve stok bilgileri Royal Canin tarafından tek taraflı olarak ve önceden bildirilmeksizin değiştirilebilir. Site’de veya siparişte herhangi bir hata tespit edildiği takdirde bu hatalar Royal Canin tarafından düzeltilebilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Sipariş ve Miktar Sınırlamaları')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, tamamen kendi takdirine bağlı olarak ve önceden bilgilendirme yapma zorunluluğu olmaksızın, kişi başına, hane başına veya sipariş başına satın alınan miktarları sınırlayabilir veya iptal edebilir. Kısıtlamalar, aynı Site hesabı tarafından verilen siparişleri, aynı kredi / banka kartını ve aynı faturalandırma ve / veya gönderim adresini kullanan siparişleri içerebilir. Siparişinizde bir değişiklik yapmamız durumunda, siparişinizle birlikte verilen e-posta adresiniz kullanılarak bilgilendirme yapılacaktır. Royal Canin, Site üzerinden kurumsal müşterilere yapılan satışları sınırlama veya yasaklama hakkını saklı tutar.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Teslimat Koşulları')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Siparişleriniz, ödemenizin teyidi alındıktan sonra en geç üç (3) iş günü (Pazartesi-Cuma günleri arası) içinde kargo şirketine teslim edilir. Siparişleriniz, sadece Türkiye Cumhuriyeti sınırları içindeki adreslere teslim edilecektir. Teslimat adresinin Royal Canin ürünlerinin bulunduğu lojistik merkezine olan uzaklığına göre kargo şirketi 2 - 3 gün içinde siparişinizi size ulaştıracaktır. Tarafımızdan kaynaklanan bir aksilik olması halinde ise bize sağlamış olduğunuz iletişim bilgileri aracılığıyla size bilgilendirme yapılacaktır. Bu sebeple iletişim bilgilerinizin eksiksiz ve doğru sağlanmış olması önemlidir. Satın aldığınız ürünler bir teyit e-postası ile tarafınıza bildirilecektir. Seçtiğiniz ürünlerden herhangi birinin stokta mevcut olmaması durumunda konu ile ilgili bir e-posta iletilecek ve ürünün ilk stoklara gireceği tarih tarafınıza bildirilecektir. Site bir elektronik ticaret sitesidir ve aynı anda birden çok kullanıcıya alışveriş yapma imkânı tanır. Birden fazla tüketicinin aynı ürünü alması ve bu sebeple ürün stoklarının tükenmesi söz konusu olabilir. Böyle bir durumda ödemesini yaptığınız ürünün stoklarımızda kalmaması halinde 1-5 gün içinde ürün stoklarının yenilenip yenilenmeyeceği kontrol edilecektir. Bu süre içinde ürün stoklarının yenilenmeyeceği kesinleşirse söz konusu ürün için yaptığınız ödeme, kendi ödeme yönteminiz kullanılarak iade edilecektir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin’den satın alınan tüm ürünler, bir kargo şirketi aracılığıyla kullanıcılara iletilecektir. Ürünler, kargo şirketi tarafından kullanıcıya teslim edildiğinde ürünlere ilişkin her türlü hasar ve risk kullanıcıya geçecektir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Fiyat ve Ödeme')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Siparişlerinize ilişkin ödemeleri bir veya kredi kartı ile yapabilirsiniz. Site’de Visa®, MasterCard®, American Express® Card ve MasterCard veya Visa logolu banka kartlarını kabul ediyoruz. Ödeme Türk Lirası üzerinden yapılacaktır. Site’de gösterilen tüm fiyatlara Türkiye Cumhuriyeti’nde yürürlükte olan %18 KDV dâhildir. Güvenli ödeme sistemi sunmak için, Royal Canin önde gelen finans kuruluşlarının güvenli ödeme sistemlerini kullanır. Genel olarak, kredi / banka kartları, siparişinizi size gönderene veya uygunluğunu teyit edene kadar Royal Canin tarafından ücretlendirilmez (bu süre zarfında, yalnızca uygun vergiler veya nakliye ücretleri ile birlikte gönderdiğimiz ürünler için ücretlendirilirsiniz). Bununla birlikte, sipariş tutarınızı siparişinizin verildiği tarihte kredi / banka kartı düzenleyicinizle ön provizyon alabiliriz. Bu, mevcut kredinizi etkileyebilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Abonelik Programı')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin ödeme sayfasında “Abonelik” seçeneğini işaretleyerek, abonelik programımızda uygulanacak aşağıda belirtilen koşulları kabul etmiş sayılırsınız. Abonelik Koşulları, Site’nin kullanımını düzenleyen işbu Koşullar’ın yanı sıra, Site’de geçerli tüm şartlar, koşullar, sınırlamalar ve gereksinimlere ek olarak (muhtelif zamanlarda değiştirilebileceği şekilde), otomatik üyelik şartlarınızı da yönetir. Abone programımıza kayıt olarak, Abonelik Şartları’nı kabul etmiş sayılırsınız. Lütfen bu Abonelik Şartları’nı dikkatle okuyun.'
                    )}
                    {this.p1(
                      'Alıcı belirli ürünleri belirli aralıklarla satın almak amacıyla abonelik programına katıldığı takdirde söz konusu satışlara aşağıdaki hükümler uygulanacaktır:'
                    )}
                    {this.p1(
                      'a. Alıcı, herhangi bir zamanda hiçbir değişiklik veya iptal ücreti olmadan aboneliğini değiştirebilir veya iptal edebilir.'
                    )}
                    {this.p1(
                      'b. Alıcı, herhangi bir teslimatı bir sonraki sipariş tarihinden en az bir gün önce atlamayı tercih edebilir. Bu durumda söz konusu sipariş gönderilmeyecek ve faturalanmayacaktır.'
                    )}
                    {this.p1(
                      'c. Abonelik, otomatik yenileme ile bir yıllık süre için geçerli olacaktır. Alıcı’ya, bir yıllık sürenin dolmasından 15 gün önce ve 3 gün önce bir yıllık sürenin dolduğunu ve aboneliğin bir yıllık süre için yenileneceğini hatırlatmak üzere e-posta gönderilecektir. Alıcı, aboneliğini bir yıllık süre içinde herhangi bir zamanda da iptal edebilir.'
                    )}
                    {this.p1(
                      'd. Abonelik programı kapsamında satın alınan ürünlerin teslimatı ücretsiz yapılacaktır.'
                    )}
                    {this.p1(
                      'e. Abonelik programı kapsamındaki ürünlerden herhangi birinin ücretinde artış olduğu takdirde Alıcı’ya bu değişikliği bildirmek ve söz konusu satın almaya devam etmek isteyip istemediğinin onayını almak üzere e-posta gönderilecektir. Alıcı’nın bu bildirimi almasından itibaren yedi (7) gün içinde fiyat artışını kabul etmemesi durumunda Satıcı söz konusu siparişi işleyeme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'f. Gelecek siparişe uygulanabilecek herhangi bir promosyon olduğu takdirde bu promosyon otomatik olarak uygulanacaktır.'
                    )}
                    {this.p1(
                      'g. Alıcı, abonelik programı kapsamında satın aldığı ürünler için yalnızca kredi kartı ile ödeme yapabilir. Alıcı’nın kredi kartı bilgileri abonelik programına kayıt için gerekli olacaktır ve bu bilgiler Satıcı’nın ödeme hizmeti sağlayıcısı PayU tarafından kaydedilecektir. Alıcı kredi kartı bilgilerini her zaman hesabından değiştirebilir ve takip eden siparişlerde yeni kredi kartı kullanılır.'
                    )}
                    {this.p1(
                      'h. Alıcı’nın kredi kartının geçerliliği sona erdiğinde Alıcı kredi kartı bilgilerini güncellemesi için otomatik bir e-posta alacaktır. Alıcı’nın kredi kartının geçerlilik süresi sona ermesine rağmen kredi kartı bilgilerini güncellememesi durumunda Satıcı, abonelik konusu siparişi işleme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'ı. Alıcı’nın kredi kartına ilişkin ödeme onayı her bir sipariş için kontrol edilecektir ve ödeme, Alıcı’nın siparişi gönderildiğinde tahsil edilecektir. Ödemeye ilişkin herhangi bir problem olduğu takdirde ödeme bilgilerini güncellemesi için Alıcı ile iletişime geçilecektir. Satıcı, ödeme bilgilerini güncellemesi için Alıcı’ya ulaşamadığı takdirde Satıcı, abonelik konusu siparişi işleme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'i. Alıcı’nın aboneliği kapsamındaki bir ürünün geçici bir ürün için stok dışı olması durumunda bu husus Alıcı’ya bildirilecek ve söz konusu ürün stoka girene kadar siparişleri işleme koyulamayacaktır. Alıcı’nın aboneliği kapsamındaki bir ürünün süresiz olarak stok dışı olması durumunda bu husus Alıcı’ya bildirilecek ve Alıcı’nın söz konusu ürün hakkındaki aboneliği otomatik olarak iptal edilecektir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('ROYAL CANIN® CLUB')}
                    {this.spacingFragment()}
                    {this.p1(
                      'ROYAL CANIN® Club, bu programın içinde yer alan belirli ürün ve hizmetleri sitede tanımlandığı şekilde satın almak isteyen Online Mağazamıza kayıtlı kullanıcılar için bir abonelik programıdır. Alıcı, bu programa katıldığı takdirde söz konusu satışlarda aşağıdaki hükümler uygulanacaktır:'
                    )}
                    {this.p1(
                      'a. Ürünlerin otomatik olarak gönderilme sıklğı, Alıcı tarafından girilen evcil hayvan bilgilerine dayanarak site algoritması tarafından belirlenir. Bu sıklık, Alıcı tarafından belirtilen evcil hayvan bilgilerine ve önerilen ürüne dayanarak gerekli olan maksimum besleme oranına göre hesaplanır.'
                    )}
                    {this.p1(
                      'b.Program dahilindeki mama seçenekleri, tavsiye niteliğindedir. Evcil hayvanın özel ihtiyaç ve hassasiyetlerinin her zaman için göz önünde bulundurulması ve en uygun sağlıklı beslenme çözümünü öğrenmek için Veteriner Hekime danışılması önerilir.'
                    )}
                    {this.p1(
                      'c. Club programında önerilen ürünler sadace bu programda satılmaktadır, ayrıca tekli sipariş olarak satışa sunulmamaktadır.'
                    )}
                    {this.p1(
                      'd. Alıcı’nın verdiği evcil hayvan bilgilerine, yaş ve kısırlaştırma gibi farklı ihtiyaçlarına dayanarak program dahilinde gönderilen üründe değişiklik yapılması gerekebilir. Bu gibi durumlarda değişiklik yapılması gereken zamandan 10 gün önce Alıcıya, geçiş yapılması gereken ürüne onay vermeleri için bir email gönderilir. Alıcı onaylamadığı durumda, bir sonraki sipariş Satıcının onayladığı ürün ile devam edecektir. Alıcı, Satıcının önermediği bir ürünle programa devam edemez.'
                    )}
                    {this.p1(
                      'e. Club programı dahilinde haftaiçi her gün 09.00-18.00 saatleri arasında hizmet veren Evcil Hayvan Danışmanları vardır. Bu danışmanlar, veteriner hekim muayenesi ve kontrolü gerekmektirmeyen evcil hayvan bakımı, beslenmesi ve davranışları hakkında Club üyelerine tavsiyelerde bulunur.'
                    )}
                    {this.p1(
                      'f. Alıcıya, her teslimatla birlikte, battaniye, ölçü kabı, kedi topu, mama kabı,önerilen kuru mamaya uygun yaş mama, kedi evi,saklama kabı gibi hediyeler sunulmaktadır. Bu hediyeler bunlarla sınırlı olmadığı gibi hediyelerin içeriğinde ve sıralamasında değişiklik uygulanabilir.'
                    )}
                    {this.p1(
                      'g. Siparişlerin iadesi durumda ürün ve hediyeler eksiksiz bir şekilde birlikte paket olarak iade edilmelidir.'
                    )}
                    {this.p1(
                      'h. Alıcı, herhangi bir zamanda hiçbir değişiklik veya iptal ücreti olmadan Club aboneliğini değiştirebilir veya iptal edebilir.'
                    )}
                    {this.p1(
                      'ı. Alıcı, herhangi bir teslimatı bir sonraki sipariş tarihinden en az bir gün önce atlamayı tercih edebilir. Bu durumda söz konusu sipariş gönderilmeyecek ve faturalanmayacaktır. Bu durumda, teslimatla ilgili hediye atlatılacaktır. Ancak evcil hayvan danışmanı tavsiyelerinden faydalanmaya devam edebileceksiniz.'
                    )}
                    {this.p1(
                      'i. Alıcı, , ROYAL CANIN® Club programının algoritmasına göre otomatik olarak oluşturulan siparişin gönderilme tarihini, ilgili sipariş oluşmadan önce değiştirebilir. Tarihler değiştirilirken, bir sonraki Siparişlerin tarihleri otomatik olarak değiştirilmez.'
                    )}
                    {this.p1(
                      'j. Alıcı, herhangi bir siparişin veya tüm siparişlerin teslimat veya fatura adresini değiştirebilir.'
                    )}
                    {this.p1(
                      'k. Club aboneliği, otomatik yenileme ile bir yıllık süre için geçerli olacaktır. Alıcı’ya, bir yıllık sürenin dolmasından 15 gün önce ve 3 gün önce bir yıllık sürenin dolduğunu ve aboneliğin bir yıllık süre için yenileneceğini hatırlatmak üzere e-posta gönderilecektir. Alıcı, aboneliğini bir yıllık süre içinde herhangi bir zamanda da iptal edebilir.'
                    )}
                    {this.p1(
                      'l. Club programı kapsamında satın alınan ürünlerin teslimatı ücretsiz yapılacaktır.'
                    )}
                    {this.p1(
                      'm. Club programı kapsamındaki ürünlerden herhangi birinin ücretinde artış olduğu takdirde Alıcı’ya bu değişikliği bildirmek ve söz konusu satın almaya devam etmek isteyip istemediğinin onayını almak üzere e-posta gönderilecektir. Alıcı’nın bu bildirimi almasından itibaren yedi (7) gün içinde fiyat artışını kabul etmemesi durumunda Satıcı söz konusu siparişi işleyeme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'n. Alıcı, Cub programı kapsamında satın aldığı ürünler için yalnızca kredi kartı ile ödeme yapabilir. Alıcı’nın kredi kartı bilgileri abonelik programına kayıt için gerekli olacaktır ve bu bilgiler Satıcı’nın ödeme hizmeti sağlayıcısı PayU tarafından kaydedilecektir. Alıcı kredi kartı bilgilerini her zaman hesabından değiştirebilir ve takip eden siparişlerde yeni kredi kartı kullanılır.'
                    )}
                    {this.p1(
                      'o. Alıcı’nın kredi kartının geçerliliği sona erdiğinde Alıcı kredi kartı bilgilerini güncellemesi için otomatik bir e-posta alacaktır. Alıcı’nın kredi kartının geçerlilik süresi sona ermesine rağmen kredi kartı bilgilerini güncellememesi durumunda Satıcı, abonelik konusu siparişi işleme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'ö. Alıcı’nın kredi kartına ilişkin ödeme onayı her bir sipariş için kontrol edilecektir ve ödeme, Alıcı’nın siparişi oluştuğunda tahsil edilecektir. Ödemeye ilişkin herhangi bir problem olduğu takdirde ödeme bilgilerini güncellemesi için Alıcı ile iletişime geçilecektir. Satıcı, ödeme bilgilerini güncellemesi için Alıcı’ya ulaşamadığı takdirde Satıcı, abonelik konusu siparişi işleme koyamayacak ve gönderemeyecektir.'
                    )}
                    {this.p1(
                      'p. Alıcı’nın aboneliği kapsamındaki bir ürünün geçici bir ürün için stok dışı olması durumunda bu husus Alıcı’ya bildirilecek ve söz konusu ürün stoka girene kadar siparişleri işleme koyulamayacaktır. Alıcı’nın aboneliği kapsamındaki bir ürünün süresiz olarak stok dışı olması durumunda bu husus Alıcı’ya bildirilecek ve Alıcı’nın söz konusu ürün hakkındaki aboneliği otomatik olarak iptal edilecektir. Hediyeler ise ürün kapsamında sayılmaz, stok durumuna göre hediyeler üründen ayrı şekilde veya daha sonraki bir zamanda gönderilebilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Promosyonlar ve Kuponlar')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Bir promosyon / kupon kodu kullanılıyorsa, ilgili teklifi kullanmak için belirlenen kod, “Promosyon Kodu” alanına ödeme sırasında girilmelidir. Herhangi bir promosyon veya kupon, diğer promosyonlarla veya kuponlarla birleştirilemez; işlem başına yalnızca bir adet promosyon veya kupon kodu kullanılabilir ve sepet tutarından düşülür. Royal Canin, belirli ürünler, ağırlıklar, bazı gönderim ücretleri ve hızlandırılmış nakliye ücretlerinin promosyon veya kuponlar aracılığıyla ödenmesini kısıtlama hakkını saklı tutar. Teklif koşullarında aksi belirtilmedikçe, çevrimiçi kuponlar Royal Canin mağazalarında veya Royal Canin ürünlerinin satıldığı herhangi bir satış noktasında geçerli değildir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('İade Şartları ve Prosedürü')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site üzerinden satın almış olduğunuz ürünü kullanmadan, tahrip etmeden ve ticari olarak satılabilirliğini ve kullanılabilirliğini bozmadan teslim almış olduğunuz tarihinden itibaren 14 (on dört)günlük süre içinde teslim aldığınız şekli ile iade edebilirsiniz. Ürünü, ürünün faturasını ve iade sebebini içeren talebinizi bize iletmeniz halinde iade prosedürü işletilecektir. Açılmış / denenmiş / hasar görmüş / kullanılmış ürünler kapsamına giren ürünlerin iadesi kabul edilmemektedir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'İade etmek istediğiniz ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte göndermeniz gerekmektedir. İade faturası, kargo payı dâhil edilmeden (ürün birim fiyatı + KDV şeklinde) kesilmelidir. Faturası kurumlar adına düzenlenen sipariş iadeleri, iade faturası kesilmediği takdirde tamamlanamayacaktır.'
                    )}
                    {this.p1(
                      'Teslim aldığınız paketleri kargo şirketi yetkilisi önünde açıp kontrol ediniz. Eğer üründe herhangi bir hasar varsa kargo şirketine tutanak tutturarak ürünü teslim almayınız. Ürün teslim alındıktan sonra kargo şirketinin görevini tam olarak yerine getirdiğini ve ürünü hasarsız ve eksiksiz teslim aldığınızı kabul etmiş sayılmaktasınız.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Site üzerinden satın almış olduğunuz ve paketi açılmış, ambalajı veya kendisi zarar görmüş, bozulmuş, kırılmış, tahrip edilmiş, yırtılmış ve/veya kullanılmış ürünlerin iadesi kabul edilmemektedir. Orijinal ambalajı zarar görmüş, tahrip edilmiş ve sair şekildeki ürünlerin iadesi kabul edilmez. Ürünü, teslim aldığınız andaki durumunda iade etmekle yükümlüsünüz. Ürünü iade etmeniz veya henüz ürünü teslim almadan cayma hakkınızı kullanmanız halinde, iade edilen ürün iade adresimize ulaştığı tarihten itibaren üç (3) iş günü içinde ürün bedeli tarafınıza, kendi ödeme yönteminiz kullanılarak iade edilecektir. Bu tutarın iadesinin kredi / banka kartınıza yansıtılma süresi, kendi bankanızın uygulamaları doğrultusunda değişkenlik gösterebilir ve bunlardan Royal Canin sorumlu tutulamaz. Taksitli satışlarda yapılan iadeler bankanız tarafından kredi / banka kartınıza her ay artı bakiye olarak yansıtılabilir.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Sorumluluk Sınırlaması')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, Site’ye erişilmesi, Site’nin ya da Site’deki bilgilerin ve diğer verilerin ve programların kullanılması sebebiyle, Koşullar’ın ihlali, haksız fiil ya da başkaca sebeplere binaen doğabilecek doğrudan ya da dolaylı hiçbir zarardan sorumlu değildir. Royal Canin, Koşullar’ın ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde Site üzerinden yürütülen işlemin kesintiye uğraması, hata veya ihmal durumunda herhangi bir sorumluluk kabul etmez. Site’ye ya da bağlantı verilen Üçüncü Taraf Siteleri’ne erişilmesi ya da bunların kullanılması sonucunda doğabilecek her tür sorumluluktan, mahkeme masrafları ve diğer masraflar da dâhil olmak üzere herhangi bir zarardan Royal Canin sorumlu olmayacaktır.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Uygulanacak Hukuk ve Yetkili Mahkeme')}
                    {this.p1(
                      'İşbu Koşullar ve Site’nin kullanımı ile ilgili olarak çıkabilecek ihtilaflarda öncelikle işbu Koşullar’daki hükümler; Koşullar’da hüküm bulunmaması halinde ise Türkiye Cumhuriyeti mevzuatı uygulanacaktır. İşbu Koşullar ve Site’nin kullanımından doğabilecek her türlü uyuşmazlığın çözümünde İstanbul Merkez (Çağlayan) Mahkemeleri ile İcra Daireleri yetkili olacaktır.'
                    )}
                    {this.spacingFragment()}

                    {this.h2Fragment('Gizlilik')}
                    {this.p1(
                      'İşbu Koşullar’ın yürürlükte olduğu süre boyunca ve Koşullar’ın sona ermesinden sonra taraflar yazılı, sözlü veya sair surette kendilerine iletilen her türlü bilgi ve belgeleri (“Gizli Bilgiler”), ilgili mevzuat hükümleri saklı kalmak üzere, karşı tarafın yazılı onayı olmadan üçüncü kişilere açıklayamaz; başka kişi, kurum ve kuruluşların yararına kullanamaz ve kullandıramaz. Taraflar, yukarıda sayılan Gizli Bilgiler’in gizliliğini sağlamak, bu hususta her türlü önlemi almak, gizlilik esaslarına uygun hareket etmek, bu bilgilerin yetkisiz kişilerce kullanımını önlemek ve her türlü suiistimalden korumak için her türlü önlemi almakla yükümlüdür.'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Kişisel Verilerin Korunması')}
                    {this.spacingFragment()}
                    {this.p1(
                      "'Site’yi kullanımınız kapsamında kişisel verilerinizin korunması hakkında aydınlatma ve muvafakatname metnine buradan ulaşabilirsiniz.'"
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}

                    {this.h2Fragment('Site Kullanımının Sona Erdirilmesi')}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin, yürürlükteki mevzuat hükümlerine veya işbu Koşullar’a aykırı herhangi bir davranışınız olması halinde tamamen kendi takdirine bağlı olarak, bu Site’deki kişisel hesabınızı, üyelik kayıtlarınızı veya benzer kullanımları herhangi bir zamanda incelemeye alabilir, dondurabilir veya sona erdirebilir. Hesabınızın sona erdirilmesinden önce vermiş olduğunuz siparişlere ilişkin ödeme yükümlülüğünüz devam eder. Hesabınızın sona erdirilmesi durumunda Site’de hiçbir hesabınız veya benzeri üyelik haklarınız kalmayacaktır. İşbu Koşullar kapsamındaki sorumluluk sınırlamaları ve muhtelif hükümler, bu tür bir sona erdirmeden sonra geçerliliğini korumaya devam eder. Royal Canin, Site üzerinden vermiş olduğunuz iletişim bilgileri aracılığıyla hesabınızın sona erdirildiğine dair bildirim gönderebilir.'
                    )}
                    {this.spacingFragment()}
                    {this.p1(
                      'Royal Canin önceden haber vermeksizin tamamen kendi takdirine bağlı olarak bu Site’nin tamamını veya bir kısmını değiştirme, askıya alma, kapatma veya devam ettirme hakkını saklı tutar'
                    )}
                    {this.spacingFragment()}
                    {this.spacingFragment()}
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-padding-y--md rc-md-down"></div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default TermsConditionsTr;
