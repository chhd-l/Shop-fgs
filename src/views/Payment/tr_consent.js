let A = {
  id: 'tr_A',
  consentTitle: `Mesafeli ön satış bilgilendirme formunu okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;" id="tr_consent_a">Formu incele</span></span>`,
  isChecked: false,
  isRequired: false
};

let B = {
  id: 'tr_B',
  consentTitle: `Mesafeli satış sözleşmesini okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;" id="tr_consent_b">Formu incele</span></span>`,
  isChecked: false,
  isRequired: false
};

let C = {
  id: 'tr_C',
  consentTitle: `Lütfen kişisel verilerinizin işlenmesi hakkında detaylı bilgilendirmeyi içeren <span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;">Aydınlatma Metni’ni</span> inceleyiniz.`,
  isChecked: false,
  isRequired: false
};

let D = {
  id: 'tr_D',
  consentTitle: `<span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;">Yurtdışına Veri Aktarımı Açık Rıza Metni</span>ni okudum. Kişisel verilerimin Türkiye dışına transfer edilmesini onaylıyorum.`,
  isChecked: false,
  isRequired: false
};

let registerCustomerList = [A, B];
let guestList = [C, A, B, D];

export { registerCustomerList, guestList };
