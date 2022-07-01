import React, { useContext } from 'react';
import { Observer, useLocalStore } from 'mobx-react';
import stores from '@/store';
import { FullScreenModalContext } from './index';

export default function Modal(props) {
  const value = useContext(FullScreenModalContext);
  const { paymentStore } = useLocalStore(() => stores);
  const { fullScreenModalPM } = paymentStore;
  const { close } = value;

  return (
    <Observer>
      {() => (
        <div className={[fullScreenModalPM ? '' : 'rc-hidden'].join(' ')}>
          <div
            className="rc-shade"
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
          <aside role="modal" className="rc-modal">
            <div className="rc-modal__container h-100">
              <header className="rc-modal__header">
                <button
                  className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                  onClick={() => close('fullScreenModalPM')}
                ></button>
              </header>
              <section className="rc-modal__content rc-scroll--y h-100 rc-padding-top--lg--desktop ">
                <div className="rc-margin-top--none">
                  <div className="rc-padding--sm rc-margin-bottom--sm rc-agreements-container">
                    <h2 className="rc-beta text-center">
                      Kişiselleştirilmiş Pazarlama Açık Rıza Metni
                    </h2>
                    <p>
                      Mevcut veya ileride güncelleyeceğim kişisel verilerimin,
                      üyelik ekranında tarafıma sunulan Royal Canin Turkey Evcil
                      Hayvan Ürünleri Ticaret Limited Şirketi (“
                      <strong>Royal Canin</strong>”) internet sitesi
                      (www.royalcanin.com/tr) üzerinden her zaman ulaşabileceğim{' '}
                      <strong style={{ textDecoration: 'underline' }}>
                        Aydınlatma Metni
                      </strong>
                      nde detaylı olarak açıklandığı şekilde, Royal Canin
                      internet sitesindeki üyeliğim ve alışverişlerime göre bana
                      özel olanak ve teklifler sunulması, genel veya bana özel
                      kişiselleştirilmiş kampanyalar, avantajlar, reklamların
                      oluşturulması, kampanya, yarışma, çekiliş ve diğer
                      etkinliklerin düzenlenmesi, segmentasyon, profilleme,
                      raporlama, pazarlama ve analiz çalışmalarının yapılması,
                      [Royal Canin internet sitesi veya diğer üçüncü taraf
                      ortamlarda Royal Canin’e ait reklamların ve
                      pazarlama/iletişim faaliyetlerinin (internet sitesindeki
                      bildirimler, pop-up gösterimi, kişiye özel teklifler,
                      reklam, anket vs.) yapılması] ve internet sitesi
                      üzerindeki kullanıcı deneyimimi iyileştirmek amaçlarıyla
                      işlenmesine rıza veriyorum.
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
