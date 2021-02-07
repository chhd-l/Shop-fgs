export default async function querySearch() {
  return Promise.resolve({
    data: {
      Items: [
        {
          Title: 'A guide to changing your dogs food',
          Description: null,
          Url:
            'https://www.royalcanin.com/fr/dogs/health-and-wellbeing/a-guide-to-changing-your-dogs-food'
        },
        {
          Title: 'Reduce the risk of separation anxiety in dogs after lockdown',
          Description: null,
          Url:
            'https://www.royalcanin.com/fr/dogs/health-and-wellbeing/reduce-the-risk-of-separation-anxiety-in-dogs-after-lockdown'
        },
        {
          Title: 'Les soins de fin de vie de votre chien',
          Description: null,
          Url:
            'https://www.royalcanin.com/fr/dogs/health-and-wellbeing/your-dogs-end-of-life-care'
        },
        {
          Title: 'Incontinence urinaire chez le chien',
          Description: null,
          Url:
            'https://www.royalcanin.com/fr/dogs/health-and-wellbeing/urinary-incontinence-in-dogs'
        }
      ],
      FeaturedItems: [
        {
          Title: 'Afficher tous les résultats 25',
          Description: null,
          Url: 'https://www.royalcanin.com/fr/results?SearchQuery=dogs'
        }
      ]
    }
  });
}
