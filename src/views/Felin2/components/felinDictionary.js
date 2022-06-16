/**
 * feline appointment type and expert type dictionary
 * 建议采用valueLangKey，在Phrase app管理多语言，valueFr只是临时方案，后期将删除
 * 目前能在store portal 管理dictionary,暂时不用此文件
 */
//appointment type dictionary
export const appointmentTypeDict = [
  {
    id: '8',
    name: 'Online',
    valueEn: 'Online',
    valueFr: 'Appel vidéo',
    valueLangKey: 'appointment_type_Online'
  },
  {
    id: '9',
    name: 'Offline',
    valueEn: 'Offline',
    valueFr: 'Sur place',
    valueLangKey: 'appointment_type_Offline'
  }
];

//expert type dictionary
export const expertTypeDict = [
  {
    id: '11',
    name: 'Nutritionist',
    valueEn: 'Nutritionist',
    valueFr: 'Expert en nutrition',
    valueLangKey: 'expert_type_Nutritionist'
  },
  {
    id: '12',
    name: 'Behaviorist',
    valueEn: 'Behaviorist',
    valueFr: 'Comportementalistes',
    valueLangKey: 'expert_type_Behaviorist'
  }
];
