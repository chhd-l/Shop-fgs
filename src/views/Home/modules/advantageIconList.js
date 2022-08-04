const defaultIconList = [
  {
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure-new@2x.png`,
    langKey: 'home.point1'
  },
  {
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/reimbursed-new@2x.png`,
    langKey: 'home.point2'
  },
  {
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
    langKey: 'home.point3'
  },
  {
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/shippment-new@2x.png`,
    langKey: 'home.point4'
  }
];
const iconList =
  {
    us: [
      {
        img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure@2x.png`,
        langKey: 'home.point1'
      },
      {
        img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CLUB-BENEFITS_FREE-SHIPPING.webp`,
        langKey: 'home.point2'
      },
      {
        img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
        langKey: 'home.point3'
      },
      {
        img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/question@2x_home_us.webp`,
        langKey: 'home.point4'
      }
    ]
  }[window.__.env.REACT_APP_COUNTRY] || defaultIconList;

export default iconList;
