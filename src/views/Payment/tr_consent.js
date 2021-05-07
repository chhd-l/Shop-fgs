let A = {
  id: 'A',
  consentTitle: `Mesafeli ön satış bilgilendirme formunu okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline" data-modal-trigger="standard-sales-agreement">Formu incele</span>`,
  isChecked: false,
  isRequired: false
};

let B = {
  id: 'B',
  consentTitle: `Mesafeli satış sözleşmesini okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="text-decoration: underline">Formu incele</span>`,
  isChecked: false,
  isRequired: false
};

let C = {
  id: 'C',
  consentTitle: `Lütfen kişisel verilerinizin işlenmesi hakkında detaylı bilgilendirmeyi içeren <span class="medium ui-cursor-pointer-pure" style="text-decoration: underline">Aydınlatma Metni’ni</span> inceleyiniz.`,
  isChecked: false,
  isRequired: false
};

let D = {
  id: 'D',
  consentTitle: `<span class="medium ui-cursor-pointer-pure" style="text-decoration: underline">Yurtdışına Veri Aktarımı Açık Rıza Metni</span>ni okudum. Kişisel verilerimin Türkiye dışına transfer edilmesini onaylıyorum.`,
  isChecked: false,
  isRequired: false
};

let registerCustomerList = [A, B];
let guestList = [C, A, B, D];

export { registerCustomerList, guestList };
