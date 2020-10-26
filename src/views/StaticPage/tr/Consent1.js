import React from 'react';

function Consent1({}) {
  return (
    <div className="rc-content--fixed-header rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
      <div class="rc-padding--sm rc-margin-bottom--sm  rc-agreements-container">
        <h2 class="rc-beta text-center">
          MESAFELİ SATIŞ ÖN BİLGİLENDİRME FORMU{' '}
        </h2>
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

        <div class="rc-table">
          {/* <div class="rc-scroll--x">
            <table
              class="rc-table__table"
              data-js-table="checkout_billing_productTable"
              data-rc-feature-tables-setup="true"
            >
              <thead class="rc-table__thead">
                <tr class="rc-table__row">
                  <th class="rc-table__th rc-espilon">Ürün Kodu</th>
                  <th class="rc-table__th rc-espilon">Mal Hizmet</th>
                  <th class="rc-table__th rc-espilon">Birim fiyat(TL)</th>
                  <th class="rc-table__th rc-espilon">Miktar</th>
                  <th class="rc-table__th rc-espilon">Toplam Fiyat (TL)</th>
                </tr>
              </thead>
              <tbody class="rc-table__tbody">
                <tr class="rc-table__row">
                  <td class="rc-table__td">100200500_TR</td>
                  <td class="rc-table__td">X-small Puppy</td>
                  <td class="rc-table__td">49.50 TL</td>
                  <td class="rc-table__td">1.00</td>
                  <td class="rc-table__td">49.50 TL</td>
                </tr>
              </tbody>
              <tbody>
                <tr class="rc-table__row">
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td">Toplam Miktar</td>
                  <td class="rc-table__td">1.00</td>
                </tr>
                <tr class="rc-table__row">
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td">KDV Matrahi</td>
                  <td class="rc-table__td">7.55 TL</td>
                </tr>
                <tr class="rc-table__row">
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td">Kargo bedeli</td>
                  <td class="rc-table__td">7.99 TL</td>
                </tr>
                <tr class="rc-table__row">
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td"></td>
                  <td class="rc-table__td">Ödenecek Tutar</td>
                  <td class="rc-table__td">49.50 TL</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
        <br />
        <br />
        <p>ÖDEME BİLGİLERİ </p>
        <p>Ödemeler kredi kartı, yapılabilir </p>
        <p>TESLİMAT VE FATURA BİLGİLERİ </p>
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
        <div class="content-asset">
          <p>
            <a href="#anchorTest">CAYMA HAKKI</a>
          </p>
          <p>
            Alıcı, Sözleşme konusu ürünleri teslim alma tarihinden itibaren 14
            (ondört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai
            şart ödemeksizin Sözleşme’den cayma hakkına sahiptir. Ayrıca Alıcı,
            Sözleşme’nin kurulmasından ürünün teslimine kadar olan süre içinde
            de cayma hakkını kullanabilir.
          </p>
          <p id="anchor1">
            Alıcı’nın <a href="#test2">cayma</a> hakkını kullandığına dair
            bildirimin, e-posta adresine gönderilecek bir bildirim ile Satıcı’ya
            iletmiş olması gerekir. Alıcı’nın cayma hakkını kullanmasından
            itibaren 10 (on) gün içinde ilgili ürünü Satıcı’ya kutusu, ambalajı,
            varsa standart aksesuarları ve varsa ürün ile birlikte hediye edilen
            diğer ürünler ile birlikte eksiksiz ve hasarsız olarak iade etmesi
            gerekmektedir. Alıcı, iade edeceği ürünü, kendisine teslimat yapan
            kargo şirketi aracılığıyla gönderim ücreti Satıcı’ya ait olmak üzere
            Satıcı’ya geri gönderebilir. Cayma hakkının kullanılmasını takip
            eden 14 (ondört) gün içinde iade edilen ürünün bedeli, Alıcı’nın
            ödeme şekli kullanılarak iade edilir. Ürün iade edilirken, ürünün
            teslimi sırasında Alıcı’ya ibraz edilmiş olan fatura aslının da
            Alıcı tarafından iade edilmesi gerekmektedir.
          </p>
          <p>Aşağıdaki hallerde cayma hakkı kullanılamaz:</p>
          <p>
            <strong>a.</strong>&nbsp;Fiyatı finansal piyasalardaki
            dalgalanmalara bağlı olarak değişen ve Satıcı’nın kontrolünde
            olmayan mal veya hizmetlere ilişkin sözleşmeler.
          </p>
          <p>
            <strong>b.</strong>&nbsp;Alıcı’nın istekleri veya kişisel
            ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler.
          </p>
          <p>
            <strong>c.</strong>&nbsp;Çabuk bozulabilen veya son kullanma tarihi
            geçebilecek malların teslimine ilişkin sözleşmeler.
          </p>
          <p>
            <strong>d.</strong>&nbsp;Tesliminden sonra ambalaj, bant, mühür,
            paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık
            ve hijyen açısından uygun olmayanların teslimine ilişkin
            sözleşmeler.
          </p>
          <p>
            <strong>e.</strong>&nbsp;Tesliminden sonra başka ürünlerle karışan
            ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin
            sözleşmeler.
          </p>
          <p>
            <strong>f.</strong>&nbsp;Malın tesliminden sonra ambalaj, bant,
            mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi
            ortamda sunulan kitap, dijital içerik ve bilgisayar sarf
            malzemelerine ilişkin sözleşmeler.
          </p>
          <p>
            <strong>g.</strong>&nbsp;Abonelik sözleşmesi kapsamında sağlananlar
            dışında, gazete ve dergi gibi süreli yayınların teslimine ilişkin
            sözleşmeler.
          </p>
          <p>
            <strong>h.</strong>&nbsp;Belirli bir tarihte veya dönemde yapılması
            gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek
            tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın
            değerlendirilmesine ilişkin sözleşmeler.
          </p>
          <p>
            <strong>i.</strong>&nbsp;Elektronik ortamda anında ifa edilen
            hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara
            ilişkin sözleşmeler.
          </p>
          <p id="test2">
            <strong>j.</strong>&nbsp;Cayma hakkı süresi sona ermeden önce,
            tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin
            sözleşmeler.
          </p>
          <p>&nbsp;</p>
          <p id="anchorTest">
            <a href="#anchor1">UYUŞMAZLIK ÇÖZÜMÜ</a>
          </p>
          <p>
            Sözleşme’nin uygulanmasında, Gümrük ve Ticaret Bakanlığınca ilan
            edilen değere kadar, Alıcı’nın ürünü satın aldığı ve ikametgâhının
            bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri
            yetkilidir. 6502 Sayılı Tüketicinin Korunması Hakkında Kanun’un
            68/1. maddesinde belirtilen alt ve üst limitler doğrultusunda
            tüketici talepleri hakkında ilçe/il tüketici hakem heyetleri
            yetkilidir.
          </p>
          <p>
            İşbu Mesafeli Satış Ön Bilgilendirme Formu’nun Alıcı tarafından
            okunup onaylanmasının ardından Satıcı ile Alıcı arasında Mesafeli
            Satış Sözleşmesi’nin kurulması aşamasına geçilecektir.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Consent1;
