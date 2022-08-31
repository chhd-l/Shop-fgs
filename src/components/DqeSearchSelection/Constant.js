export const InitFormStatus = {
  empty: {
    showLabel: false,
    border: 'border-b',
    borderColorCss: 'border-form',
    iconCss: ''
  },
  normal: {
    //现在没有这一项，只要有值 就inputOk
    showLabel: true,
    border: 'border-b',
    borderColorCss: 'border-form',
    iconCss: ''
  },
  inputOk: {
    showLabel: true,
    border: 'border-b-2',
    borderColorCss: 'border-form-ok',
    iconCss: 'iconchenggong text-form-ok'
  },
  inputErr: {
    showLabel: true,
    border: 'border-b-2',
    borderColorCss: 'border-form-err',
    iconCss: 'iconchahao text-form-err'
  }
};
