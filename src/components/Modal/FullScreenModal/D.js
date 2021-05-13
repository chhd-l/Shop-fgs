import React, { useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { paymentStore } = useLocalStore(() => stores);
  const { fullScreenModalD } = paymentStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalD ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalD')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      Yurtdışına Veri Aktarımı Açık Rıza Metni ifadesine
                      eklenecek kısım:{' '}
                    </h2>
                    <br />
                    <p>
                      <strong>
                        Kişisel Verilerin Yurtdışına Aktartılmasına ilişkin Açık
                        Rıza Metni
                      </strong>
                    </p>
                    <p>
                      Üyelik ekranında tarafıma sunulan ve Royal Canin Turkey
                      Evcil Hayvan Ürünleri Ticaret Limited Şirketi (“
                      <strong>Royal Canin</strong>”) internet sitesi
                      (www.royalcanin.com/tr) üzerinden her zaman ulaşabileceğim{' '}
                      <strong style={{ textDecoration: 'underline' }}>
                        Aydınlatma Metninde
                      </strong>{' '}
                      detaylı olarak açıklandığı şekilde, internet sitesi
                      üzerinden satışlar ve Royal Canin sistemleri ile ilgili
                      kullanılan çeşitli yazılımların ve Royal Canin’e hizmet
                      verenlerin (veri tabanı ve sunucu hizmeti sağlayıcıları,
                      izleme/hedefleme teknolojileri destek sağlayıcıları,
                      pazarlama/reklam/analiz faaliyetleri destek sağlayıcıları,
                      kimlik doğrulama hizmet sağlayıcıları, aracı yazılım
                      hizmet sağlayıcıları, arşivleme hizmeti verenler)
                      kullandığı sunucuların yurtdışında olması sebebiyle
                      (mevcut veya ileride güncelleyeceğim) Kimlik Bilgilerimin,
                      İletişim Bilgilerimin, Müşteri İşlem Bilgilerimin, Mali
                      Bilgilerimin, kredi kartı numaramın son dört hanesi ile
                      son kullanma tarihinin, Abonelik Bilgilerimin, Evcil
                      Hayvan Bilgilerimin, Pazarlama Bilgilerimin, İşlem
                      Güvenliği Bilgilerimin ve Hukuki İşlem Bilgilerinin
                      yurtdışına aktarılmasına rıza veriyorum.
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
