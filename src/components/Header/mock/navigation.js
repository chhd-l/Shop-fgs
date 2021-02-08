export default async function queryNavigation() {
  return Promise.resolve({
    data: {
      menuGroups: [
        {
          type: 'MenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/cats',
            text: 'Chats'
          },
          menuItems: [
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/cats/breeds',
                text: 'Races'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url:
                  'https://www.royalcanin.com/fr/cats/thinking-of-getting-a-cat',
                text: "Vous envisagez d'adopter un chat"
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/cats/kitten',
                text: 'Chaton'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/cats/health-and-wellbeing',
                text: 'Santé et bien-être'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/cats/products',
                text: 'Aliments'
              }
            },
            {
              type: 'PromotionalMenuItem',
              title: 'Need help finding the right product?',
              subtitle: 'Try our product finder',
              link: {
                url: 'https://www.royalcanin.com/fr/product-finder',
                text: 'Find a product'
              },
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/dmk5a2QBG95Xk-RBxdqA/v33/maine-coon-adult-brand-breed-emblematic?w=1280&auto=compress&fm=jpg',
                altText:
                  'Maine coon adulte assis en noir et blanc sur fond blanc'
              }
            }
          ]
        },
        {
          type: 'MenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/dogs',
            text: 'Chiens'
          },
          menuItems: [
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/dogs/breeds',
                text: 'Races'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url:
                  'https://www.royalcanin.com/fr/dogs/thinking-of-getting-a-dog',
                text: "Vous envisagez d'adopter un chien"
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/dogs/puppy',
                text: 'Chaton'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/dogs/health-and-wellbeing',
                text: 'Santé et bien-être'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/dogs/products',
                text: 'Aliments'
              }
            },
            {
              type: 'PromotionalMenuItem',
              title: 'Need help finding the right product?',
              subtitle: 'Try our product finder',
              link: {
                url: 'https://www.royalcanin.com/fr/product-finder',
                text: 'Find a product'
              },
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/zWkqHWsBG95Xk-RBIfhn/v1/bd13h-hub-golden-retriever-adult-black-and-white?w=1280&auto=compress&fm=jpg',
                altText: 'Golden retriever adulte noir et blanc'
              }
            }
          ]
        },
        {
          type: 'MenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/tailored-nutrition',
            text: 'Alimentation sur mesure'
          },
          menuItems: null
        },
        {
          type: 'MenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/about-us',
            text: 'À propos de nous'
          },
          menuItems: [
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/our-history',
                text: 'Notre histoire'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/our-values',
                text: 'Nos valeurs'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/sustainability',
                text: 'Développement durable'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url:
                  'https://www.royalcanin.com/fr/about-us/quality-and-food-safety',
                text: 'Qualité et sécurité alimentaire'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/news',
                text: 'Actualités'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/espace-partenaire',
                text: 'Espace Partenaire'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/faqs',
                text: 'FAQ'
              }
            }
          ]
        },
        {
          type: 'DetailedMenuGroup',
          link: {
            url: '',
            text: 'Products'
          },
          menuItems: [
            {
              type: 'DetailedMenuItem',
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/smk7a2QBG95Xk-RBgNuy/v11/english-setter-puppy-vet-vhn?w=1280&auto=compress&fm=jpg',
                altText:
                  'Chiot setter anglais assis en noir et blanc sur fond blanc'
              },
              link: {
                url: 'https://www.royalcanin.com/fr/shop/cats/products',
                text: ''
              },
              title: 'Dog products',
              subItems: [
                {
                  title: 'Retail products',
                  subtitle:
                    'Precise nutrition for dogs of all ages, sizes and breeds.',
                  link: {
                    url:
                      'https://uatwedding.royalcanin.com/fr/shop/cats/retail_products',
                    text: ''
                  }
                },
                {
                  title: 'Vet products',
                  subtitle:
                    'Help to maintain the health of dogs of diagnosed health problems',
                  link: {
                    url: 'https://uatwedding.royalcanin.com/fr/shop/cats/vet_products',
                    text: ''
                  }
                },
                {
                  title: 'Discover our product ranges',
                  subtitle: '',
                  link: {
                    url: 'https://www.royalcanin.com/fr/shop/dogs',
                    text: ''
                  }
                }
              ]
            },
            {
              type: 'DetailedMenuItem',
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/9Wkqa2QBG95Xk-RBzs_r/v15/siberian-adult-care-emblematic?w=1280&auto=compress&fm=jpg',
                altText: 'Sibérien adulte assis en noir et blanc sur fond blanc'
              },
              link: {
                url: 'https://www.royalcanin.com/fr/shop/cats/products',
                text: ''
              },
              title: 'Cat products',
              subItems: [
                {
                  title: 'Retail products',
                  subtitle:
                    'Precise nutrition for cats of all ages, sizes and breeds.',
                  link: {
                    url:
                      'https://uatwedding.royalcanin.com/fr/shop/cats/retail_products',
                    text: ''
                  }
                },
                {
                  title: 'Vet products',
                  subtitle:
                    'Help to maintain the health of cats of diagnosed health problems',
                  link: {
                    url: 'https://uatwedding.royalcanin.com/fr/shop/cats/vet_products',
                    text: ''
                  }
                },
                {
                  title: 'Discover our product ranges',
                  subtitle: '',
                  link: {
                    url: 'https://www.royalcanin.com/fr/shop/cats',
                    text: ''
                  }
                }
              ]
            },
            {
              type: 'PromotionalMenuItem',
              title: 'Need help finding the right product?',
              subtitle: 'Try our product finder',
              link: {
                url: '/uk/product-finder',
                text: 'Find a product'
              },
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/4mnFr2YBG95Xk-RB6d20/v1/yorkshire-terrier-sacred-birman-b-w-brand-emblematic-tailored-nutrition-hero',
                altText:
                  'Sacred Birman kitten and Yorkshire Terrier adult standing in black and white on a white background'
              }
            }
          ]
        },
        {
          type: 'MenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/where-to-buy',
            text: 'Où acheter'
          },
          menuItems: [
            {
              type: 'PromotionalMenuItem',
              title: 'Buy with Royal Canin Club',
              subtitle: 'Lorem ipsum dolor',
              link: {
                url: 'https://uatwedding.royalcanin.com/fr/shop/',
                text: 'Discover'
              },
              image: {
                url:
                  'https://cdn.royalcanin-weshare-online.io/1GnLpWYBG95Xk-RBFd3d/v1/puppy-labrador-kitten-british-shorthair-b-w-brand-emblematic?w=1280&auto=compress&fm=jpg',
                altText:
                  'Chiot labrador et chaton british shorthair debout en noir et blanc sur fond blanc'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/where-to-buy',
                text: 'Find a retailer'
              }
            },
            {
              type: 'MenuItem',
              icon: '',
              link: {
                url: 'https://www.royalcanin.com/fr/where-to-buy',
                text: 'Find a vet'
              }
            }
          ]
        },
        {
          type: 'ContactUsMenuGroup',
          link: {
            url: 'https://www.royalcanin.com/fr/contact-us',
            text: 'Nous contacter'
          },
          menuItems: [
            {
              type: 'QuestionsContactMenuItem',
              content: 'Any questions?',
              title: 'Do you need help? <br> Do not hesitate to contact us:'
            },
            {
              type: 'PhoneContactMenuItem',
              icon: 'Contact',
              link: null,
              description: '8h30-12h30/14h-17h',
              subtitle: 'By phone',
              title: '0845 300 5011'
            },
            {
              type: 'IconContactMenuItem',
              icon: 'Email',
              link: {
                url: 'https://www.royalcanin.com/fr/contact-us',
                text: ''
              },
              subtitle: 'By e-mail'
            },
            {
              type: 'IconContactMenuItem',
              icon: 'Advice',
              link: {
                url: 'https://www.royalcanin.com/fr/about-us/faqs',
                text: ''
              },
              subtitle: 'FAQ'
            }
          ]
        }
      ]
    }
  });
}
