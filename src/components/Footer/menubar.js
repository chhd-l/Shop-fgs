export const menubar = {
    // titleId:列头部名称，list：每列的数据 {prop：stone portal配置的数据，messageId：列数据名称，url：前端自定义超链接，link：前端路由}
    en:[
        [{
          titleId:'footer.aboutRoyalCanin',list: [{prop:'contactUsUrl',messageId:'aboutUs2'},{prop:'ourValues',url:'https://www.royalcanin.com/mx/about-us/our-values',messageId:'footer.ourValues'},{prop:'qualityAndSafety',url:'https://www.royalcanin.com/mx/about-us/quality-and-food-safety',messageId:'footer.qualityAndSafety'},{prop:'specificNutrition',url:'https://www.royalcanin.com/mx/tailored-nutrition',messageId:'footer.healthAndNutrition'}]
        }],
        [{
            titleId:'footer.products',list: [{link:"/list/cats",messageId:'cats'},{link:'/list/dogs',messageId:'dogs'}]
        }],
        [{
            titleId:'footer.help',list: [{link:"/help",messageId:'footer.contacts'},{link:'/FAQ',messageId:'footer.FAQ'},{link:'/requestinvoice',messageId:'footer.RequestInvoice'}]
        }],
        [{
            titleId:'footer.Additionally',list: [{link:"/privacypolicy",messageId:'footer.privacyPolicy'},{prop:'informationForParents',messageId:'footer.informationForParents'},{link:'/termuse',messageId:'footer.websiteTermsOfUse'},{prop:'cookiesUrl',messageId:'footer.cookieCollectionPolicy'}]
        }],
    ],
    es:[
        [{
          titleId:'footer.aboutRoyalCanin',list: [{prop:'contactUsUrl',messageId:'aboutUs2'},{prop:'ourValues',url:'https://www.royalcanin.com/mx/about-us/our-values',messageId:'footer.ourValues'},{prop:'qualityAndSafety',url:'https://www.royalcanin.com/mx/about-us/quality-and-food-safety',messageId:'footer.qualityAndSafety'},{prop:'specificNutrition',url:'https://www.royalcanin.com/mx/tailored-nutrition',messageId:'footer.healthAndNutrition'}]
        }],
        [{
            titleId:'footer.products',list: [{link:"/list/cats",messageId:'cats'},{link:'/list/dogs',messageId:'dogs'}]
        }],
        [{
            titleId:'footer.help',list: [{link:"/help",messageId:'footer.contacts'},{link:'/FAQ',messageId:'footer.FAQ'},{link:'/requestinvoice',messageId:'footer.RequestInvoice'}]
        }],
        [{
            titleId:'footer.Additionally',list: [{link:"/privacypolicy",messageId:'footer.privacyPolicy'},{prop:'informationForParents',messageId:'footer.informationForParents'},{link:'/termuse',messageId:'footer.websiteTermsOfUse'},{prop:'cookiesUrl',messageId:'footer.cookieCollectionPolicy'}]
        }],
    ],
    de:[
        [{
            titleId:'aboutUs',list: [
                {url:'https://www.royalcanin.com/de/about-us/our-history#Our%20history',messageId:'footer.history'},
                {props:'ourValues',url:'https://www.royalcanin.com/de/about-us/our-values#Our%20values',messageId:'footer.ourValues'},{url:'https://www.royalcanin.com/de/about-us/sustainability#Sustainability',messageId:'footer.consistence'},
                {url:'https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit',messageId:'footer.qualityAndSafety'},{url:'https://www.royalcanin.com/de/about-us/news',messageId:'footer.news'},
                {url:'https://www.royalcanin.com/de/about-us/acceptance-guarantee',messageId:'footer.acceptance'},
                {url:'https://www.royalcanin.com/de/about-us/acceptance-guarantee',messageId:'footer.newsletter'},
                {url:'https://www.royalcanin.com/de/about-us/promotions',messageId:'footer.action'}]
        }],
        [{
            titleId:'footer.products',list: [{link:"/list/cats",messageId:'de_cats'},{link:'/list/dogs',messageId:'de_dogs'}]
        }],
        [{
            titleId:'footer.help2',list: [{url:"https://shopstg.royalcanin.com/help",messageId:'footer.contacts'},{url:'',messageId:'footer.FAQVersand'},{url:'https://shopstg.royalcanin.com/FAQ',messageId:'footer.FAQAllgemeines'}]
        }],
        [{
            titleId:'footer.Additionally2',list: [{url:"https://www.mars.com/privacy-policy-germany",messageId:'footer.privacyPolicy2'},{url:'',messageId:'footer.termsOfService'},{link:'/Widerrufsbelehrung',messageId:'footer.withdrawal'}]
        }],
    ]
}