import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import classNames from 'classnames';
import {
  productFinderDailyPortion,
  productFinderDailyPortionRation,
  getDailyPortionLifeStage
} from '@/api/details';
import BreedSelect from './components/BreedSelect';
import SingleSelect from './components/SingleSelect';
import AgeSelect from './components/AgeSelect';
import WeightSelect from './components/WeightSelect';
import RadioSelect from './components/RadioSelect';
import BcsSelect from './components/BcsSelect';
import DailyPortion_icon_text from '@/assets/images/dailyPortion/dailyPortion_icon.png';
import { optimizeImage } from '@/utils/utils';
import './index.less';
import {
  GAForDailyPortionToolScreenBCS,
  GAForDailyPortionToolScreenPetInfo,
  GAForDailyPortionToolScreenResults
} from '@/utils/GA/dailyPortionTool';
import { Button, Modal } from '@/components/Common';

/**
 * questionDisplayType / name
 *
 * singleSelect: genderCode petActivityCode
 * date: age 没有下拉值 year 0-25， month 0-11
 * breed: breedCode
 * radio: neutered
 * weightSelect: weight 没有下拉值 1-49
 * bcsSelect: bcs
 **/

const questionList = [
  {
    name: 'age',
    label: 'null',
    metadata: {
      step: 1,
      questionDisplayType: 'data',
      label: <FormattedMessage id={'dailyPortion.age.label'} />,
      description:
        'Votre animal de compagnie peut avoir des besoins de santé différents à chaque étape de sa vie.',
      description3: null
    },
    possibleValues: []
  }, // 只有月份
  {
    name: 'neutered',
    label: 'null',
    metadata: {
      step: 1,
      questionDisplayType: 'radio',
      label: <FormattedMessage id={'dailyPortion.neutered.label'} />,
      description:
        "Un animal stérilisé peut avoir tendance à prendre du poids en raison d'un appétit accru. Il est important de trouver un régime alimentaire moins calorique et plus riche en nutriments.",
      description3: null
    },
    possibleValues: [
      {
        key: 'true',
        label: <FormattedMessage id={'account.yes'} />
      },
      {
        key: 'false',
        label: <FormattedMessage id={'account.no'} />
      }
    ]
  },
  {
    name: 'breedCode',
    label: 'null',
    metadata: {
      step: 1,
      questionDisplayType: 'breed',
      label: <FormattedMessage id={'dailyPortion.breedCode.label'} />,
      description:
        'Chaque race a des besoins nutritionnels différents. Mieux connaître leur race peut nous aider à choisir un régime alimentaire adapté à leurs besoins.',
      description3: null
    },
    possibleValues: [
      {
        breedCode: 'american_curl_longhair',
        localName: 'American Curl Longhair'
      },
      {
        breedCode: 'serengeti',
        localName: 'Serengeti'
      },
      {
        breedCode: 'tiffanie',
        localName: 'Tiffany'
      },
      {
        breedCode: 'thai_lilac',
        localName: 'Thai lilac'
      },
      {
        breedCode: 'chantilly_tiffany',
        localName: 'Chantilly tiffany'
      },
      {
        breedCode: 'donskoy',
        localName: 'Donskoy'
      },
      {
        breedCode: 'oriental_shorthair',
        localName: 'Oriental Shorthair'
      },
      {
        breedCode: 'colourpoint_shorthair',
        localName: 'Colourpoint shorthair'
      },
      {
        breedCode: 'selkirk_rex_shorthair',
        localName: 'Selkirk Rex Shorthair'
      },
      {
        breedCode: 'californian_rex',
        localName: 'Californian Rex'
      },
      {
        breedCode: 'undefined',
        localName: 'Non défini'
      },
      {
        breedCode: 'kurilian_bobtail',
        localName: 'Bobtail des Kouriles'
      },
      {
        breedCode: 'peterbald',
        localName: 'Peterbald'
      },
      {
        breedCode: 'ural_rex',
        localName: "Rex de l'oural"
      },
      {
        breedCode: 'chausie',
        localName: 'Chausie'
      },
      {
        breedCode: 'ceylan',
        localName: 'Ceylan'
      },
      {
        breedCode: 'american_bobtail',
        localName: 'Bobtail Americain'
      },
      {
        breedCode: 'munchkin',
        localName: 'Munchkin'
      },
      {
        breedCode: 'laperm_longhair',
        localName: 'LaPerm Longhair'
      },
      {
        breedCode: 'singapura',
        localName: 'Singapura'
      },
      {
        breedCode: 'arabian_mau',
        localName: 'Mau arabe'
      },
      {
        breedCode: 'ragdoll',
        localName: 'Ragdoll'
      },
      {
        breedCode: 'aphrodite_giant',
        localName: 'Aphrodite giant'
      },
      {
        breedCode: 'laperm',
        localName: 'LaPerm'
      },
      {
        breedCode: 'turks',
        localName: 'Angora Turc'
      },
      {
        breedCode: 'american_shorthair',
        localName: 'American Shorthair'
      },
      {
        breedCode: 'ocicat',
        localName: 'Ocicat'
      },
      {
        breedCode: 'persian',
        localName: 'Persan'
      },
      {
        breedCode: 'mixed_breed',
        localName: 'Croisé'
      },
      {
        breedCode: 'ussuri',
        localName: 'Ussuri'
      },
      {
        breedCode: 'heilige_birma',
        localName: 'Sacré de Birmanie'
      },
      {
        breedCode: 'chartreux',
        localName: 'Chartreux'
      },
      {
        breedCode: 'abyssinian',
        localName: 'Abyssin'
      },
      {
        breedCode: 'british_shorthair',
        localName: 'British Shorthair'
      },
      {
        breedCode: 'russie',
        localName: 'Russe'
      },
      {
        breedCode: 'cornish_rex',
        localName: 'Cornish Rex'
      },
      {
        breedCode: 'manx_longhair',
        localName: 'Cymric'
      },
      {
        breedCode: 'highlander',
        localName: 'Highlander'
      },
      {
        breedCode: 'asian',
        localName: 'Asian'
      },
      {
        breedCode: 'ojos_azules',
        localName: 'Ojos azules'
      },
      {
        breedCode: 'classicat',
        localName: 'Classicat'
      },
      {
        breedCode: 'balinese',
        localName: 'Balinais'
      },
      {
        breedCode: 'toyger',
        localName: 'Toyger'
      },
      {
        breedCode: 'lykoi',
        localName: 'Lykoï'
      },
      {
        breedCode: 'american_polydactyl',
        localName: 'American polydactyl'
      },
      {
        breedCode: 'siberian',
        localName: 'Sibérien'
      },
      {
        breedCode: 'bambino',
        localName: 'Bambino'
      },
      {
        breedCode: 'thai_blue_point',
        localName: 'Thai blue point'
      }
    ]
  },
  {
    name: 'genderCode',
    label: 'null',
    metadata: {
      step: 1,
      questionDisplayType: 'singleSelect',
      label: <FormattedMessage id={'dailyPortion.genderCode.label'} />,
      description:
        "Les animaux de compagnie mâles et femelles ont des besoins alimentaires différents. Il s'agit de trouver ce qui convient le mieux à votre animal de compagnie.",
      description3: null
    },
    possibleValues: [
      {
        key: 'male',
        label: <FormattedMessage id={'petMale'} />
      },
      {
        key: 'female',
        label: <FormattedMessage id={'petFemale'} />
      }
    ]
  },
  {
    name: 'weight',
    label: 'null', //单位
    metadata: {
      step: 2,
      questionDisplayType: 'weightSelect',
      label: <FormattedMessage id={'dailyPortion.weight.label'} />,
      description:
        '["Vous n\'êtes pas sûr du poids de votre chat ?","1. Montez sur la balance en tenant votre chat dans vos bras. Notez le poids.","2. Montez sur la balance sans votre chat. Notez à nouveau le poids.","3. Soustrayez ces deux valeurs et le résultat sera le poids de votre chat.","Vous pouvez également consulter votre vétérinaire."]',
      description3: null
    },
    possibleValues: []
  },
  {
    name: 'petActivityCode',
    label: 'null',
    metadata: {
      step: 2,
      questionDisplayType: 'singleSelect',
      label: <FormattedMessage id={'dailyPortion.petActivityCode.label'} />,
      description:
        "L'activité de votre animal détermine son métabolisme, qui fonctionne à un rythme variable.",
      description3: null
    },
    possibleValues: [
      {
        key: 'low',
        label: <FormattedMessage id={'dailyPortion.petActivityCode.low'} />
      },
      {
        key: 'moderate',
        label: <FormattedMessage id={'dailyPortion.petActivityCode.Medium'} />
      },
      {
        key: 'high',
        label: <FormattedMessage id={'dailyPortion.petActivityCode.High'} />
      }
    ]
  },
  {
    name: 'bcs',
    label: 'null',
    metadata: {
      step: 3,
      questionDisplayType: 'bcsSelect',
      label: <FormattedMessage id={'dailyPortion.bcs.label'} />,
      description: null,
      description3: null
    },
    possibleValues: [
      {
        // "Low"
        key: 3,
        label: <FormattedMessage id={'dailyPortion.bcs.underweight'} />,
        description: (
          <FormattedMessage id={'dailyPortion.bcs.underweight.description'} />
        )
      },
      {
        //  "Medium"
        key: 5,
        label: <FormattedMessage id={'dailyPortion.bcs.Ideal'} />,
        description: (
          <FormattedMessage id={'dailyPortion.bcs.Ideal.description'} />
        )
      },
      {
        // "High"
        key: 7,
        label: <FormattedMessage id={'dailyPortion.bcs.Overweight'} />,
        description: (
          <FormattedMessage id={'dailyPortion.bcs.Overweight.description'} />
        )
      }
    ]
  }
];
const mixedBreedPossibleOptions = [
  {
    value: 'mixed_breed_xsmall_1_4kg',
    name: <FormattedMessage id={'dailyPortion.breed.searchBreedSize.xsmall'} />
    // "name":"Très petit (moins de 4 kg)"
  },
  {
    value: 'mixed_breed_mini_4_10kg',
    // "name":"Petit (4-10 kg)"
    name: <FormattedMessage id={'dailyPortion.breed.searchBreedSize.mini'} />
  },
  {
    value: 'mixed_breed_medium_11_25kg',
    // "name":"Moyen (11-25 kg)",
    name: <FormattedMessage id={'dailyPortion.breed.searchBreedSize.medium'} />
  },
  {
    value: 'mixed_breed_maxi_26_44kg',
    // "name":"Grand (26-44 kg)",
    name: <FormattedMessage id={'dailyPortion.breed.searchBreedSize.maxi'} />
  },
  {
    value: 'mixed_breed_giant_45kg',
    // "name":"Géant (plus de 45 kg)",
    name: <FormattedMessage id={'dailyPortion.breed.searchBreedSize.giant'} />
  }
];
const isRu = window.__.env.REACT_APP_COUNTRY?.toLowerCase() === 'ru';
export default function DailyPortion({
  speciesValue = '', // species
  goodsInfo = '', // 当前已选择的size
  isCalculateDisabled = false, // calculate 按钮是否禁止点击
  initBreedValue = '',
  details = {}, // 产品详情数据
  ...rest
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShowQuestion, setShowQuestion] = useState(false);
  const [step, setStep] = useState(1);
  const [stepOneDisabled, setStepOneDisabled] = useState(true);
  const [breedOptions, setBreedOptions] = useState([]);
  const [ration, setRation] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPreselected, setPreselected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [productLifeStage, setProductLifeStage] = useState();
  const [breedCodeParam, setBreedCodeParam] = useState('');
  const [productIsAdult, setProductIsAdult] = useState(false);
  const [errOperate, setErrOperate] = useState(false);

  /**
   * 问题的结果
   **/
  const [breedData, setBreedData] = useState({});
  // species is dog, the “please select a breed size
  const [mixedBreedPossibleValue, setMixedBreedPossibleValue] = useState({});
  const [isMixedBreed, setMixedBreed] = useState(false);
  const [gender, setGender] = useState('');
  let [year, setYear] = useState(0);
  let [month, setMonth] = useState(0);
  const [petActivityCode, setpetActivityCode] = useState('');
  const [weight, setWeight] = useState('');
  const [neutered, setNeutered] = useState('');
  const [bcs, setBcs] = useState('');

  useEffect(() => {
    // ageing-12+-2561  Senior_Cat
    // chaton-persan-2554  Kitten_Cat
    // chiot-shih-tzu-2439  Puppy_Dog
    let LifestagesAttr = details.goodsAttributesValueRelList
      .filter((item) => item.goodsAttributeName === 'Lifestages')
      ?.map((item) => item?.goodsAttributeValue);

    let isAdult = LifestagesAttr?.some((item) => {
      let bol = ['adult', 'mature', 'senior'].some((_el) =>
        item.toLowerCase().includes(_el)
      );
      return bol;
    });
    const isPuppy = LifestagesAttr.some((el) =>
      el.toLowerCase().includes('puppy')
    );
    const isKitten = LifestagesAttr.some((el) =>
      el.toLowerCase().includes('kitten')
    );
    const isJunior = LifestagesAttr.some((el) =>
      el.toLowerCase().includes('junior')
    );
    setProductLifeStage({
      isPuppy,
      isKitten,
      isJunior
    });
    setProductIsAdult(isAdult);
  }, [details]);

  useEffect(() => {
    let breedBool = isMixedBreed;
    let ageBool = year * 12 + month > 0;
    let weightBool = parseFloat(weight) > 0;
    let breedCodeParam = breedData?.key || '';
    if (isMixedBreed) {
      const isMixedBreedPossibleValues = isMixedBreed && speciesValue === 'Dog';
      breedBool = true;
      if (isMixedBreedPossibleValues) {
        breedBool = mixedBreedPossibleValue?.value;
        breedCodeParam = mixedBreedPossibleValue?.value;
      }
    } else {
      breedBool = !!breedData?.key;
    }
    setBreedCodeParam(breedCodeParam);

    let stepOneDisabled = !(
      breedBool &&
      gender &&
      ageBool &&
      weightBool &&
      neutered &&
      petActivityCode
    );
    console.log({
      breedBool,
      gender,
      ageBool,
      weightBool,
      neutered,
      petActivityCode
    });
    setStepOneDisabled(stepOneDisabled);
  }, [
    breedData,
    isMixedBreed,
    gender,
    year,
    month,
    petActivityCode,
    weight,
    neutered,
    mixedBreedPossibleValue
  ]);

  // button remains inactive and an error message is displayed
  useEffect(() => {
    const param = {
      breedCode: breedCodeParam,
      genderCode: gender,
      month: year * 12 + month
    };
    if (Object.keys(param).length) {
      const bol = Object.values(param).every((el) => el);
      bol && dailyPortionLifeStage(param);
    }
  }, [breedCodeParam, gender, year, month]);

  useEffect(() => {
    if (!speciesValue) return;
    getBreedOptions(speciesValue);
  }, [speciesValue, initBreedValue]);

  const showQuestion = () => {
    setShowQuestion(true);
    GAForDailyPortionToolScreenPetInfo();
  };
  const handleToStep2 = () => {
    setStep(2);
    GAForDailyPortionToolScreenBCS();
  };
  const dailyPortionLifeStage = async (param) => {
    const res = await getDailyPortionLifeStage(param);
    if (res.code === 'K-000000') {
      const resLifestage = res.context?.lifestage || '';
      const adultPet = ['adult', 'mature', 'senior'].indexOf(resLifestage) > -1;
      const youngPet =
        ['puppy', 'kitten', 'junior', 'baby'].indexOf(resLifestage) > -1;
      const youngProduct = Object.values(productLifeStage)?.some(
        (item) => item
      );
      if ((youngProduct && adultPet) || (productIsAdult && youngPet)) {
        setErrOperate(true);
      } else {
        setErrOperate(false);
      }
    }
  };

  const handleBreedData = (data, isMixedBreed = false) => {
    console.log({ data, isMixedBreed });
    setBreedData(data);
    setMixedBreed(!!isMixedBreed);
  };

  const handleGenderCode = (data) => {
    setGender(data);
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Gender'
      });
  };

  const handleSetYear = (data) => {
    setYear(data);
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Pet Age'
      });
  };

  const handleSetMouth = (data) => {
    setMonth(data);
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Pet Age'
      });
  };

  const handleSetNeutered = (data) => {
    setNeutered(data);
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Pet neutered'
      });
  };

  const handlePetActivityCode = (data) => {
    setpetActivityCode(data);
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Pet Activity'
      });
  };

  const getResult = async () => {
    window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Calculate portion'
      });

    const isMixedBreedPossibleValues = isMixedBreed && speciesValue === 'Dog';
    const isDry = details?.wsTechnologyCode?.toLocaleLowerCase() === 'dry';

    let param = {
      countryCode: window.__.env.REACT_APP_COUNTRY?.toLowerCase(),
      breedCode: isMixedBreed ? 'mixed_breed' : breedData.key,
      petActivityCode: petActivityCode,
      genderCode: gender,
      neutered: neutered,
      age: year * 12 + month,
      weight: parseFloat(weight),
      bcs: parseInt(bcs, 10),
      speciesCode: String(speciesValue).toLowerCase(),
      technologyCode: details?.wsTechnologyCode,
      energyCategory: details?.wsEnergyCategory,
      referenceEnergyValue: details?.wsReferenceEnergyValue,
      density: !!details?.wsDensity ? details?.wsDensity : 1,
      packWeight: goodsInfo?.goodsInfoWeight ? goodsInfo?.goodsInfoWeight : 1,
      goodsInfoUnit: goodsInfo?.goodsInfoUnit
        ? String(goodsInfo?.goodsInfoUnit).toLowerCase()
        : 'kg'
    };
    if (isMixedBreedPossibleValues) {
      param.breedCode = mixedBreedPossibleValue?.value;
    }
    /**
     * 俄罗斯和法国单独处理 goodsInfoUnit 单位参数
     * - 俄罗斯 кг => kg
     * - 法国 GR => g
     *
     **/
    if (
      window.__.env.REACT_APP_COUNTRY == 'ru' &&
      goodsInfo?.goodsInfoUnit === 'кг'
    ) {
      param.goodsInfoUnit = 'kg';
    }
    if (
      window.__.env.REACT_APP_COUNTRY == 'fr' &&
      goodsInfo?.goodsInfoUnit === 'GR'
    ) {
      param.goodsInfoUnit = 'g';
    }

    setLoading(true);
    try {
      let res = await productFinderDailyPortionRation(param);
      setLoading(false);
      switch (res.code) {
        case 'K-000000':
          setRation({
            quantityPerDay: res?.context?.quantityPerDay ?? 0,
            unit: res?.context?.unit ?? ''
          });
          const gaParams = {
            month,
            year,
            quantityPerDay: res?.context?.quantityPerDay,
            ...param
          };
          GAForDailyPortionToolScreenResults(gaParams);
          setStep(3);
          break;
        case 'K-000089':
          setVisible(true);
          setResultMsg(res.message);
          setRation({});
          break;
        default:
          setRation({});
          setResultMsg('');
          break;
      }
      // When the result is displayed
      window.dataLayer &&
        dataLayer.push({
          event: 'rationingToolInteraction',
          rationingToolInteraction: 'Display result'
        });
    } catch (e) {
      setLoading(false);
      setRation({});
    }
  };

  const againCalculation = (isGA = true) => {
    // 全部结果重置
    if (!isPreselected) {
      setBreedData({});
    }
    setMixedBreedPossibleValue({});
    setMixedBreed(false);
    setGender('');
    setYear(0);
    setMonth(0);
    setpetActivityCode('');
    setWeight('');
    setNeutered('');
    setBcs('');
    // 返回第一步
    setStep(1);

    isGA &&
      window.dataLayer &&
      dataLayer.push({
        event: 'rationingToolInteraction',
        rationingToolInteraction: 'Start a new calculation'
      });
  };

  const renderStep = (step) => {
    const breedCodeData = questionList.find(
      (item) => item.name === 'breedCode'
    );
    const genderCodeData = questionList.find(
      (item) => item.name === 'genderCode'
    );
    const ageCodeData = questionList.find((item) => item.name === 'age');
    const petActivityCodeData = questionList.find(
      (item) => item.name === 'petActivityCode'
    );
    const weightData = questionList.find((item) => item.name === 'weight');
    const neuteredData = questionList.find((item) => item.name === 'neutered');
    const bcsData = questionList.find((item) => item.name === 'bcs');

    const isMixedBreedPossibleValues = isMixedBreed && speciesValue === 'Dog';
    let weightUnit = 'Kg';
    let rationUnit = ration?.unit;
    const country = window.__.env.REACT_APP_COUNTRY?.toLowerCase();
    /**
     * fix Translations
     * 只有Wet Food才会返回Can，Dry Food返回的都是g 和 kg
     **/
    switch (country) {
      case 'ru':
        weightUnit = 'кг';
        if (rationUnit === 'g') rationUnit = 'г';
        if (rationUnit === 'can') rationUnit = 'шт';
        break;
      case 'fr':
        if (rationUnit === 'can') rationUnit = 'sachet fraîcheur';
        break;
      case 'tr':
        if (rationUnit === 'can') rationUnit = 'poşet';
        break;
      case 'se':
        break;
      default:
        rationUnit = ration?.unit;
        break;
    }

    switch (step) {
      case 1:
        return (
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 pb-4 lg:pb-0">
                <BreedSelect
                  defaultValue={initBreedValue}
                  isMixedBreedPossibleValues={isMixedBreedPossibleValues}
                  isPreselected={isPreselected}
                  label={breedCodeData?.metadata?.label ?? ''}
                  options={breedOptions ?? []}
                  mixedBreedPossibleOptions={mixedBreedPossibleOptions}
                  value={breedData}
                  mixedBreedPossibleValue={mixedBreedPossibleValue}
                  mixedBreedValue={isMixedBreed}
                  onChange={handleBreedData}
                  onChangeMixedBreedPossible={setMixedBreedPossibleValue}
                />
              </div>
              <div className="w-full lg:w-1/3 pb-4 lg:pb-0">
                <SingleSelect
                  label={genderCodeData?.metadata?.label ?? ''}
                  value={gender}
                  type={'genderCode'}
                  options={genderCodeData?.possibleValues ?? []}
                  onChange={handleGenderCode}
                />
              </div>
              <div className="w-full lg:w-1/3 pb-4 lg:pb-0">
                <AgeSelect
                  label={ageCodeData?.metadata?.label ?? ''}
                  yearValue={year}
                  monthValue={month}
                  onChangeYear={handleSetYear}
                  onChangeMonth={handleSetMouth}
                />
                <div
                  className={`w-full bg-red-600 text-white mt-0 md:mt-2 py-2 text-sm pl-2 ${
                    errOperate ? '' : 'hidden'
                  }`}
                >
                  <FormattedMessage id="dailyPortion.errorMessage" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap lg:pt-6">
              <div className="w-full pt-4 lg:pt-0 lg:w-1/3">
                <WeightSelect
                  unit={weightUnit}
                  label={weightData?.metadata?.label ?? 'Current pet weight'}
                  value={weight}
                  onChange={setWeight}
                />
              </div>
              <div className="w-full pt-4 lg:pt-0 lg:w-1/3">
                <RadioSelect
                  label={neuteredData?.metadata?.label ?? ''}
                  options={neuteredData?.possibleValues ?? []}
                  value={neutered}
                  onChange={handleSetNeutered}
                />
              </div>
              <div className="w-full pt-4 lg:pt-0 lg:w-1/3">
                <SingleSelect
                  label={petActivityCodeData?.metadata?.label ?? ''}
                  value={petActivityCode}
                  options={petActivityCodeData?.possibleValues ?? []}
                  onChange={handlePetActivityCode}
                />
              </div>
            </div>
            <div className="py-10 text-center">
              <Button
                type="primary"
                data-testid="handleToStep2"
                disabled={stepOneDisabled || errOperate}
                className={classNames('rc-margin-right--xs--mobile')}
                onClick={handleToStep2}
              >
                <FormattedMessage id="continue" />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <BcsSelect
              label={
                bcsData?.metadata?.label ?? 'Select your pets’s body condition'
              }
              options={bcsData?.possibleValues ?? []}
              value={bcs}
              onChange={setBcs}
            />
            <div className="py-6 lg:py-10 text-center">
              <div className="pb-6">
                <Button
                  data-testid="bcsBtn"
                  style={{ minWidth: '200px' }}
                  disabled={!bcs}
                  onClick={() => getResult()}
                  type="primary"
                  loading={loading}
                  className={classNames('rc-margin-right--xs--mobile')}
                >
                  <FormattedMessage id="dailyPortion.calculatePortion" />
                </Button>
              </div>
              <div>
                <button
                  style={{ minWidth: '200px' }}
                  onClick={() => setStep(1)}
                  className={classNames(
                    'rc-btn dailyPortion-startBtn rc-margin-right--xs--mobile'
                  )}
                >
                  <FormattedMessage id="dailyPortion.editInformations" />
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="mt-4 text-center">
            <div className="resultText-box p-6">
              <p className="pb-12 lg:pb-10">
                <FormattedMessage id={'dailyPortion.resultText'} />
              </p>
              <div className="flex flex-col lg:flex-row lg:justify-center items-center">
                <span>
                  <img
                    className="w-14 lg:w-10 px-2"
                    src={DailyPortion_icon_text}
                    alt={''}
                  />
                </span>
                <div>
                  <span className="resultText-num">
                    {`${ration?.quantityPerDay} ${rationUnit}`}
                  </span>
                  <span className="pl-2">
                    /<FormattedMessage id={'day-unit'} />
                  </span>
                </div>
              </div>
              {bcs == 3 || bcs == 7 ? (
                <p className="text-gray-600 text-base mt-3">
                  <span className="rc-iconography rc-icon rc-info--xs" />
                  <FormattedMessage id="dailyPortion.weightIssuesMessage" />
                </p>
              ) : null}
            </div>
            <div className="mt-6">
              <button
                data-testid="againCalculation"
                onClick={() => againCalculation(true)}
                className={classNames(
                  'rc-btn dailyPortion-startBtn  rc-margin-right--xs--mobile'
                )}
              >
                <FormattedMessage id="dailyPortion.newCalculationBtnText" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getBreedOptions = async (speciesValue) => {
    if (!speciesValue) return [];

    let param = {
      countryCode:
        window.__.env.REACT_APP_COUNTRY_CODE || window.__.env.REACT_APP_COUNTRY,
      species: String(speciesValue).toLowerCase()
    };
    let res = await productFinderDailyPortion(param);

    if (res.code === 'K-000000') {
      setBreedOptions(res?.context?.breeds ?? []);
      // handleInitBreedDisabled(res.context.breeds ?? [])
    } else {
      setBreedOptions([]);
    }
  };

  // const handleInitBreedDisabled = (breeds) => {
  //   if (Array.isArray(breeds) && breeds.length > 0 && initBreedValue) {
  //     // const value = breeds.find((item) => item.breedCode === initBreedValue)
  //     const value = breeds.find((item) => item.name === initBreedValue);
  //     if (value) {
  //       setPreselected(true);
  //       setBreedData({
  //         key: value.breedCode,
  //         name: value.localName
  //       });
  //     } else {
  //       setBreedData({});
  //       setPreselected(false);
  //     }
  //   }
  // };

  const handleOk = () => {
    setVisible(false);
    setResultMsg('');
    againCalculation(false);
  };

  return (
    <div className="DailyPortion-wrap container ">
      <div className="lg:flex">
        <div className="w-full lg:w-1/4 p-2 md:p-0 text-center">
          <LazyLoad>
            <img
              src={optimizeImage({
                originImageUrl: isRu
                  ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/dailyPortion/ru_daily_portion.png`
                  : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/dailyPortion/dailyPortion_logo.png`,
                width: 300
              })}
              alt={'Daily Portion'}
            />
          </LazyLoad>
        </div>
        <div className="w-full lg:w-3/4 p-4">
          <p className="py-4 lg:py-6">
            <FormattedMessage id="dailyPortion.title" />
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button
              type="primary"
              disabled={isCalculateDisabled}
              onClick={showQuestion}
              className={classNames('rc-margin-right--xs--mobile', {
                hidden: isShowQuestion
              })}
            >
              <FormattedMessage id="dailyPortion.calculatePortion" />
            </Button>
          </div>
        </div>
      </div>
      <main
        className={classNames('w-full p-4', {
          hidden: !isShowQuestion
        })}
      >
        {renderStep(step)}
      </main>
      <Modal
        modalTitle={''}
        visible={visible}
        headerVisible={false}
        cancel={() => setVisible(false)}
        hanldeClickConfirm={handleOk}
      >
        <p className="text-center red p-6">{resultMsg}</p>
      </Modal>
    </div>
  );
}
