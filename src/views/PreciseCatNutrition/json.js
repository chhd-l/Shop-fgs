//type: 1.输入框,2.单选按钮组,3.age选择,4.品种选择
export const questionList = [
  {
    id: 1,
    type: 1,
    questionInfo: {
      title: 'What is your cat’s name ?'
    }
  },
  {
    id: 2,
    type: 2,
    questionInfo: {
      title: 'Gender',
      //选择组
      options: [
        { id: 123, name: 'Male' },
        { id: 124, name: 'Female' }
      ]
    }
  },
  {
    id: 3,
    type: 3,
    questionInfo: {
      title: 'What is the age of your companion ?',
      tip: '',
      options: [
        { id: 1, value: 'Month' },
        { id: 2, value: 'Year' },
        { id: 3, value: 'Day' }
      ]
    }
  },
  {
    id: 4,
    type: 4,
    questionInfo: {
      title: 'What is the age of your companion ?',
      tip: '',
      options: [
        { id: 1, value: 'Month' },
        { id: 2, value: 'Year' },
        { id: 3, value: 'Day' }
      ]
    }
  }
];
export const indexList = [
  {
    id: 'name',
    active: true,
    metadata: {
      step: 1,
      questionDisplayType: 'freeTextSkippable',
      label: 'Quel est le nom de votre chat ?'
    },
    possibleValues: []
  },
  {
    id: 'genderCode',
    active: true,
    metadata: {
      step: 1,
      questionDisplayType: 'singleSelect',
      label: 'Quel est le sexe de votre chat ?',
      description:
        "Les animaux de compagnie mâles et femelles ont des besoins alimentaires différents. Il s'agit de trouver ce qui convient le mieux à votre animal de compagnie."
    },
    possibleValues: [
      { value: 'male', label: 'Mâle' },
      { value: 'female', label: 'Femelle' }
    ]
  },
  {
    id: 'age',
    active: true,
    metadata: {
      step: 1,
      questionDisplayType: 'ageSelect',
      label: 'Quel âge a votre chat ?',
      description:
        'Votre animal de compagnie peut avoir des besoins de santé différents à chaque étape de sa vie.'
    },
    possibleValues: []
  },
  {
    id: 'neutered',
    active: true,
    metadata: {
      step: 1,
      questionDisplayType: 'singleSelect',
      label: 'Quel âge a votre chat ?',
      description:
        'Votre animal de compagnie peut avoir des besoins de santé différents à chaque étape de sa vie.'
    },
    possibleValues: [
      { value: 'true', label: 'Oui' },
      { value: 'false', label: 'Non' }
    ]
  },
  {
    id: 'breedCode',
    active: true,
    metadata: {
      step: 1,
      questionDisplayType: 'breedSelect',
      label: 'Quelle est la race de votre chat?',
      description:
        'Chaque race a des besoins nutritionnels différents. Mieux connaître leur race peut nous aider à choisir un régime alimentaire adapté à leurs besoins.'
    },
    possibleValues: [
      { key: 'curl', label: 'American Curl' },
      { key: 'seychellois', label: 'Seychellois' },
      { key: 'arabian_mau', label: 'Mau arabe' },
      { key: 'ragamuffin', label: 'RagaMuffin' },
      { key: 'russie', label: 'Russe' },
      { key: 'siamese', label: 'Siamois' },
      { key: 'british_shorthair', label: 'British Shorthair' },
      { key: 'selkirk_rex_longhair', label: 'Selkirk Rex Longhair' },
      { key: 'american_wirehair', label: 'American Wirehair' }
    ]
  }
];

export const stepList1 = [
  {
    id: 'petActivityCode',
    active: true,
    metadata: {
      step: 2,
      questionDisplayType: 'singleSelect',
      label: "Quel est le niveau d'activité physique de votre chat ?",
      description:
        "L'activité de votre animal détermine son métabolisme, qui fonctionne à un rythme variable."
    },
    possibleValues: [
      { value: 'low', label: 'Très faible' },
      { value: 'moderate', label: 'Modéré' },
      { value: 'high', label: 'Très élevé' }
    ]
  }
];
export const stepList2 = [
  {
    id: 'bcs',
    active: true,
    metadata: {
      step: 3,
      questionDisplayType: 'bcsSelect',
      label: 'Comment décririez-vous votre chat ?',
      description:
        "L'activité de votre animal détermine son métabolisme, qui fonctionne à un rythme variable."
    },
    possibleValues: [
      { value: '1', label: 'Ribs clearly visible' },
      { value: '2', label: 'Ribs not visible but easily felt' },
      { value: '3', label: 'Well body proportion, a bit of belly fat' },
      { value: '4', label: 'Waist not clearly defined' },
      { value: '5', label: 'Ribs difficult to feel' }
    ]
  }
];
