const ENV_LOCAL = {
  REACT_APP_ACCESS_PATH: 'http://localhost:3000/',

  REACT_APP_RedirectURL: 'http://localhost:3000/implicit/callback',
  REACT_APP_RegisterPrefix:
    'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
  REACT_APP_RegisterCallback: 'http://localhost:3000?origin=register',

  // #stg de
  // #REACT_APP_CLIENT_ID: '0oaq4l7mz80pZlTd00x6',
  // #stg fr
  // #REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
  // #stg us
  // #REACT_APP_CLIENT_ID: '0oaq4l7mz80pZlTd00x6',
  // #stg mx
  // #REACT_APP_CLIENT_ID: '0oannemxw9bawuRAT0x6',

  // #REACT_APP_BASEURL: 'https://shopuat.466920.com/api',
  // #REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

  // #REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',

  // #本地一律不设置二级子目录访问页面
  REACT_APP_HOMEPAGE: '/',

  GENERATE_SOURCEMAP: 'true'
};

export default ENV_LOCAL;
