"dataLayer.push(
    {'event':'{{site.id}}clickMenu',
    interaction:{
    'category':'menu',
    'action':'submenu',
    'label':'puppy',
    'value':1},
    })"
    
    "dataLayer.push({
        'event': '{{site.id}}eComPromotionImpression',
        'ecommerce': {
            'promoView': {
                'promotions': [ // Array of promoFieldObjects.
                    {
                        'id': 'image_24',
                        'name': 'June Sale',
                        'creative': 'June Sale',
                        'position': 'slide_1'
                    },
                    {
                        'id': 'image_25',
                        'name': 'Free Shipping Promo',
                        'creative': 'Free Shipping Promo',
                        'position': 'slide_2'
                    }
                ]
            }
        }
    });"
    

    "dataLayer.push({
        'event': '{{site.id}}eComPromotionImpression',
        'ecommerce': {
            'promoView': {
                'promotions': [ // Array of promoFieldObjects.
                    {
                        'id': 'image_24',
                        'name': 'June Sale',
                        'creative': 'June Sale',
                        'position': 'slide_1'
                    },
                    {
                        'id': 'image_25',
                        'name': 'Free Shipping Promo',
                        'creative': 'Free Shipping Promo',
                        'position': 'slide_2'
                    }
                ]
            }
        }
    });"
    
    " dataLayer.push({
        'event': '{{site.id}}eComPromotionClick',
        'ecommerce': {
          'promoClick': {
            'promotions': [
             {
               'id': 'CATPROMO',            // Name or ID is required
               'name': 'Cats Product Promotion',
               'creative': 'cat_banner2',
               'position': '1'
             }]
          }
        }  });"
    
    
        dataLayer.push({
            'event': '{{site.id}}eComPromotionClick',
            'ecommerce': {
              'promoClick': {
                'promotions': [
                 {
                   'id': 'CATPROMO',            // Name or ID is required
                   'name': 'Cats Product Promotion',
                   'creative': 'cat_banner2',
                   'position': '1'
                 }]
              }
            }  });

            "dataLayer.push({
                'event':'{{site.id}}eComProductImpression',
                ‘ecommerce’:{
                ‘impressions’: [ 
                      { 
                        ‘name’ : ‘Mother and Babycat’,
                        ‘id’: ‘1234’, 
                        ‘brand’: ‘Royal Canin’,
                        'price': '12.05',
                        'club': 'yes',
                        ‘category’: 'Cat/{{Range}}/Dry',
                        ‘list’: ‘Related Items’,
                        'variant': '2.00 Kg',
                        ‘position’ : 0,
                         'sku':'XFGHUIY
                         'flag':'best-seller'
                    }
               ... // can contain multiple products
               ]
             }
            });"


            "dataLayer.push({
                'event':'{{site.id}}eComProductImpression',
                ‘ecommerce’:{
                ‘impressions’: [ 
                      { 
                        ‘name’ : ‘Mother and Babycat’,
                        ‘id’: ‘1234’, 
                        ‘brand’: ‘Royal Canin’,
                        'price': '12.05',
                        'club': 'yes',
                        ‘category’: 'Cat/{{Range}}/Dry',
                        ‘list’: ‘Related Items’,
                        'variant': '2.00 Kg',
                        ‘position’ : 0,
                         'sku':'XFGHUIY
                         'flag':'best-seller'
                    }
               ... // can contain multiple products
               ]
             }
            });"
            

            dataLayer.push({
                'event':'{{site.id}}eComProductImpression',
                'ecommerce':{
                'impressions': [ 
                      { 
                        'name' : 'Mother and Babycat',
                        'id': '1234', 
                        'brand': 'Royal Canin',
                        'price': '12.05',
                        'club': 'yes',
                        'category': 'Cat/{{Range}}/Dry',
                        'list': 'Related Items',
                        'variant': '2.00 Kg',
                        'position' : 0,
                         'sku':'XFGHUIY'
                         'flag':'best-seller'
                    }
               ]
             }
            });
            
            
            
            
            dataLayer.push({
              'event': '{{site.id}}eComProductClick',
              'ecommerce': {
                    'click': {
                          'actionField': {'list': 'Related Items'}, 
                           'products': [{ 
                                 'name': 'Mother and Babycat', 
                                 'id': '1234', 
                                 'club: 'yes', 
                                 'brand': 'Royal Canin',
                                 'category': 'Cat/{{Range}}/Dry',
                                 'list': Catalogue,
                                 'position': 0,
                                   'sku':'XFGHUIY'
                           }]
                      }
                   }
         })


         dataLayer.push({
          'event': '{{site.id}}eComProductView',
          'ecommerce': {
          'currencyCode':'TRY',
          'detail: {
          'actionField': {
          'list': 'Related Items'
          },
          'products': [{ // can only contain one product
          'name': 'Mother and Babycat', 
          'id': '1234', 
          'club': 'yes', 
          'price': '235.5',
          'brand': 'Royal Canin',
          'category': 'Cat/{{Range}}/Dry',
          'variant': '4.00 Kg',
            'sku':'XFGHUIY'
          }]
          }
          }
          });
          

          "dataLayer.push({
            'event': '{{site.id}}eComAddToBasket',
            'ecommerce': {
                 'add': {
                       'products': [{ // can only contain one product
                             'name': 'Mother and Babycat', 
                             'id': '1234', 
                             'club': 'yes', 
                             'type': 'subscription', 
                             'price': '12.05',
                             'brand': 'Royal Canin',
                             'category': 'Cat/{{Range}}/Dry',
                             'variant': '2',
                             'quantity': '1',
                             'recommendation':'recommended',
                               'sku':'XFGHUIY'
                          }]
                   }
               }
          });"


          dataLayer.push({
            'event': '{{site.id}}eComRemoveFromCartt',
            'ecommerce': {
                 'remove': {
                       'products': [{ // can only contain one product
                             'name': 'Mother and Babycat', 
                             'id': '1234', 
                             'club': 'yes', 
                             'type': 'subscription', 
                             'price': '12.05',
                             'brand': 'Royal Canin',
                             'category': 'Cat/{{Range}}/Dry',
                             'variant': '2',
                             'quantity': '1',
                             'recommendation':'recommended',
                             'sku':'XFGHUIY'
                          }]
                   }
               }
          })
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        
        
        
        
        
    
    
    
    
    
    
    
    
    
    
    
    