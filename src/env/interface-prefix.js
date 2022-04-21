const localEnv = {
  development: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopuat.466920.com/api'
    };
  },
  shopsit: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api'
    };
  },
  shopuat: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api'
    };
  },
  uatwedding: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: `https://uatwedding.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://uatwedding.royalcanin.com/${countryFromLink}/api`
    };
  },
  shopstg: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api'
    };
  },
  stgwedding: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: `https://stgwedding.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://stgwedding.royalcanin.com/${countryFromLink}/api`
    };
  },
  production: ({ countryFromLink }) => {
    let ret = {};
    switch (countryFromLink) {
      case 'mx':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.mx/api'
        };
        break;
      case 'us':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.com/api'
        };
        break;
      case 'de':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.de/api'
        };
        break;
    }
    return ret;
  },
  productionHub: ({ countryFromLink }) => {
    const host = window.location.host;
    switch (host) {
      case 'prd-royalcanin-cd-01.royalcanin.com':
        return {
          REACT_APP_BASEURL: `https://prd-royalcanin-cd-01.royalcanin.com/${countryFromLink}/shop/api`,
          REACT_APP_HUB_APIURL: `https://prd-royalcanin-cd-01.royalcanin.com/${countryFromLink}/api`
        };
      case 'royalcanin.com':
        return {
          REACT_APP_BASEURL: `https://royalcanin.com/${countryFromLink}/shop/api`,
          REACT_APP_HUB_APIURL: `https://royalcanin.com/${countryFromLink}/api`
        };
    }
    return {
      REACT_APP_BASEURL: `https://www.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://www.royalcanin.com/${countryFromLink}/api`
    };
  }
};

// export default localEnv;
module.exports = localEnv;
