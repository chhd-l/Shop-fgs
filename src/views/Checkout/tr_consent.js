let A = {
  id: 'tr_A',
  consentTitle: `Mesafeli ön satış bilgilendirme formunu okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;color:#666" id="tr_consent_a">Formu incele</span></span>`,
  isChecked: false,
  isRequired: true
};

let B = {
  id: 'tr_B',
  consentTitle: `Mesafeli satış sözleşmesini okudum ve kabul ediyorum.<br /><span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;color:#666" id="tr_consent_b">Formu incele</span></span>`,
  isChecked: false,
  isRequired: true
};

let C = {
  id: 'tr_C',
  consentTitle: `Lütfen kişisel verilerinizin işlenmesi hakkında detaylı bilgilendirmeyi içeren <span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;" id="tr_consent_c">Aydınlatma Metni’ni</span> inceleyiniz.`,
  isChecked: false,
  isRequired: false
};

let D = {
  id: 'tr_D',
  consentTitle: `Kişisel verilerimin Türkiye dışına transfer edilmesi için <span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;" id="tr_consent_d">Yurtdışına Veri Aktarımı Açık Rıza Metni</span>’nde belirtilen izni veriyorum`,
  isChecked: false,
  isRequired: true
};

let D2 = {
  id: 'tr_D',
  consentTitle: `<span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;" id="tr_consent_d">Yurtdışına Veri Aktarımı Açık Rıza Metni</span>ni okudum. Kişisel verilerimin Türkiye dışına transfer edilmesini onaylıyorum`,
  isChecked: false,
  isRequired: true
};

let optEmail = {
  id: 'optEmail',
  consentTitle: `Royal Canin’in tanıtım ve kampanyalarından haberdar olmak istiyorum. Bu kapsamda Royal Canin’e tarafıma ticari elektronik ileti göndermesi için <span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;color:#666" id="tr_consent_opt_email">Ticari Elektronik İleti Metni</span>’nde belirtilen izni veriyorum`,
  isChecked: false,
  isRequired: false
};

let pm = {
  id: 'pm',
  consentTitle: `<span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;color:#666" id="tr_consent_tc">Genel Hükümler ve Koşullar’</span>ı okudum, onaylıyorum ve üyeliğim kapsamında kişisel verilerimin kişiselleştirilmiş pazarlama, profilleme/segmentasyon amacıyla işlenmesine ilişkin <span lass="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
  border-bottom: 1px solid #ccc;color:#666" id="tr_consent_pm">Kişiselleştirilmiş Pazarlama Açık Rıza Metni</span>’nde  belirtilen izni veriyorum.`,
  isChecked: false,
  isRequired: true
};

let registerCustomerList = [A, B];
let guestList = [C, A, B, D];
let commonList = [A, B];

export { registerCustomerList, guestList, commonList };
