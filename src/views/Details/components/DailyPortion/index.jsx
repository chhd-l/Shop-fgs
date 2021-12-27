import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import {
  productFinderDailyPortion,
  productFinderDailyPortionRation
} from '@/api/details';
import BreedSelect from './components/BreedSelect';
import SingleSelect from './components/SingleSelect'
import AgeSelect from './components/AgeSelect';
import WeightSelect from './components/WeightSelect';
import RadioSelect from './components/RadioSelect';
import BcsSelect from './components/BcsSelect';
import DailyPortion_icon from '@/assets/images/dailyPortion/dailyPortion_logo.png';
import DailyPortion_icon_text from '@/assets/images/dailyPortion/dailyPortion_icon.png';
import './index.less';

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
    "name":"age",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"data",
      "label": <FormattedMessage id={'dailyPortion.age.label'}/>,
      "description":"Votre animal de compagnie peut avoir des besoins de santé différents à chaque étape de sa vie.",
      "description3":null
    },
    "possibleValues":[]
  }, // 只有月份
  {
    "name":"neutered",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"radio",
      "label": <FormattedMessage id={'dailyPortion.neutered.label'}/>,
      "description":"Un animal stérilisé peut avoir tendance à prendre du poids en raison d'un appétit accru. Il est important de trouver un régime alimentaire moins calorique et plus riche en nutriments.",
      "description3":null
    },
    "possibleValues":[
      {
        "key":"true",
        "label":<FormattedMessage id={'account.yes'}/>
      },
      {
        "key":"false",
        "label":<FormattedMessage id={'account.no'}/>
      }
    ]
  },
  {
    "name":"breedCode",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"breed",
      "label": <FormattedMessage id={'dailyPortion.breedCode.label'}/>,
      "description":"Chaque race a des besoins nutritionnels différents. Mieux connaître leur race peut nous aider à choisir un régime alimentaire adapté à leurs besoins.",
      "description3":null
    },
    "possibleValues":[
      {
        "breedCode":"american_curl_longhair",
        "localName":"American Curl Longhair"
      },
      {
        "breedCode":"serengeti",
        "localName":"Serengeti"
      },
      {
        "breedCode":"tiffanie",
        "localName":"Tiffany"
      },
      {
        "breedCode":"thai_lilac",
        "localName":"Thai lilac"
      },
      {
        "breedCode":"chantilly_tiffany",
        "localName":"Chantilly tiffany"
      },
      {
        "breedCode":"donskoy",
        "localName":"Donskoy"
      },
      {
        "breedCode":"oriental_shorthair",
        "localName":"Oriental Shorthair"
      },
      {
        "breedCode":"colourpoint_shorthair",
        "localName":"Colourpoint shorthair"
      },
      {
        "breedCode":"selkirk_rex_shorthair",
        "localName":"Selkirk Rex Shorthair"
      },
      {
        "breedCode":"californian_rex",
        "localName":"Californian Rex"
      },
      {
        "breedCode":"undefined",
        "localName":"Non défini"
      },
      {
        "breedCode":"kurilian_bobtail",
        "localName":"Bobtail des Kouriles"
      },
      {
        "breedCode":"peterbald",
        "localName":"Peterbald"
      },
      {
        "breedCode":"ural_rex",
        "localName":"Rex de l'oural"
      },
      {
        "breedCode":"chausie",
        "localName":"Chausie"
      },
      {
        "breedCode":"ceylan",
        "localName":"Ceylan"
      },
      {
        "breedCode":"american_bobtail",
        "localName":"Bobtail Americain"
      },
      {
        "breedCode":"munchkin",
        "localName":"Munchkin"
      },
      {
        "breedCode":"laperm_longhair",
        "localName":"LaPerm Longhair"
      },
      {
        "breedCode":"singapura",
        "localName":"Singapura"
      },
      {
        "breedCode":"arabian_mau",
        "localName":"Mau arabe"
      },
      {
        "breedCode":"ragdoll",
        "localName":"Ragdoll"
      },
      {
        "breedCode":"aphrodite_giant",
        "localName":"Aphrodite giant"
      },
      {
        "breedCode":"laperm",
        "localName":"LaPerm"
      },
      {
        "breedCode":"turks",
        "localName":"Angora Turc"
      },
      {
        "breedCode":"american_shorthair",
        "localName":"American Shorthair"
      },
      {
        "breedCode":"ocicat",
        "localName":"Ocicat"
      },
      {
        "breedCode":"persian",
        "localName":"Persan"
      },
      {
        "breedCode":"mixed_breed",
        "localName":"Croisé"
      },
      {
        "breedCode":"ussuri",
        "localName":"Ussuri"
      },
      {
        "breedCode":"heilige_birma",
        "localName":"Sacré de Birmanie"
      },
      {
        "breedCode":"chartreux",
        "localName":"Chartreux"
      },
      {
        "breedCode":"abyssinian",
        "localName":"Abyssin"
      },
      {
        "breedCode":"british_shorthair",
        "localName":"British Shorthair"
      },
      {
        "breedCode":"russie",
        "localName":"Russe"
      },
      {
        "breedCode":"cornish_rex",
        "localName":"Cornish Rex"
      },
      {
        "breedCode":"manx_longhair",
        "localName":"Cymric"
      },
      {
        "breedCode":"highlander",
        "localName":"Highlander"
      },
      {
        "breedCode":"asian",
        "localName":"Asian"
      },
      {
        "breedCode":"ojos_azules",
        "localName":"Ojos azules"
      },
      {
        "breedCode":"classicat",
        "localName":"Classicat"
      },
      {
        "breedCode":"balinese",
        "localName":"Balinais"
      },
      {
        "breedCode":"toyger",
        "localName":"Toyger"
      },
      {
        "breedCode":"lykoi",
        "localName":"Lykoï"
      },
      {
        "breedCode":"american_polydactyl",
        "localName":"American polydactyl"
      },
      {
        "breedCode":"siberian",
        "localName":"Sibérien"
      },
      {
        "breedCode":"bambino",
        "localName":"Bambino"
      },
      {
        "breedCode":"thai_blue_point",
        "localName":"Thai blue point"
      },
    ]
  },
  {
    "name":"genderCode",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"singleSelect",
      "label": <FormattedMessage id={'dailyPortion.genderCode.label'}/>,
      "description":"Les animaux de compagnie mâles et femelles ont des besoins alimentaires différents. Il s'agit de trouver ce qui convient le mieux à votre animal de compagnie.",
      "description3":null
    },
    "possibleValues":[
      {
        "key":"male",
        "label": <FormattedMessage id={'petMale'}/>
      },
      {
        "key":"female",
        "label": <FormattedMessage id={'petFemale'}/>
      }
    ]
  },
  {
    "name": "weight",
    "label": "null", //单位
    "metadata": {
      "step": 2,
      "questionDisplayType": "weightSelect",
      "label": <FormattedMessage id={'dailyPortion.weight.label'}/>,
      "description": "[\"Vous n'êtes pas sûr du poids de votre chat ?\",\"1. Montez sur la balance en tenant votre chat dans vos bras. Notez le poids.\",\"2. Montez sur la balance sans votre chat. Notez à nouveau le poids.\",\"3. Soustrayez ces deux valeurs et le résultat sera le poids de votre chat.\",\"Vous pouvez également consulter votre vétérinaire.\"]",
      "description3": null
    },
    "possibleValues": []
  },
  {
    "name": "petActivityCode",
    "label": "null",
    "metadata": {
      "step": 2,
      "questionDisplayType": "singleSelect",
      "label": <FormattedMessage id={'dailyPortion.petActivityCode.label'}/>,
      "description": "L'activité de votre animal détermine son métabolisme, qui fonctionne à un rythme variable.",
      "description3": null
    },
    "possibleValues": [
      {
        "key": "low",
        "label": <FormattedMessage id={'dailyPortion.petActivityCode.low'}/>
      },
      {
        "key": "moderate",
        "label": <FormattedMessage id={'dailyPortion.petActivityCode.Medium'}/>
      },
      {
        "key": "high",
        "label": <FormattedMessage id={'dailyPortion.petActivityCode.High'}/>
      }
    ]
  },
  {
    "name": "bcs",
    "label": "null",
    "metadata": {
      "step": 3,
      "questionDisplayType": "bcsSelect",
      "label": <FormattedMessage id={'dailyPortion.bcs.label'}/>,
      "description": null,
      "description3": null
    },
    "possibleValues": [
      {
        "key": "3",
        "label": <FormattedMessage id={'dailyPortion.bcs.underweight'}/>,
        'description': <FormattedMessage id={'dailyPortion.bcs.underweight.description'}/>,
      },
      {
        "key": "5",
        "label": <FormattedMessage id={'dailyPortion.bcs.Ideal'}/>,
        'description': <FormattedMessage id={'dailyPortion.bcs.Ideal.description'}/>,
      },
      {
        "key": "7",
        "label": <FormattedMessage id={'dailyPortion.bcs.Overweight'}/>,
        'description': <FormattedMessage id={'dailyPortion.bcs.Overweight.description'}/>,
      }
    ]
  }
]
export default function DailyPortion(
  {
    speciesValue='', // species
    goodsInfo='', // 当前已选择的size
    isCalculateDisabled = false, // calculate 按钮是否禁止点击
    initBreedValue='',
    details={}, // 产品详情数据
    ...rest
}){

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShowQuestion, setShowQuestion] = useState(false);
  const [step, setStep] = useState(1);
  const [stepOneDisabled, setStepOneDisabled] = useState(true);
  const [breedOptions,setBreedOptions] = useState([]);
  const [ration, setRation] = useState({})
  const [loading, setLoading] = useState(false);

  /**
   * 问题的结果
   **/
  const [breedData, setBreedData] = useState({});
  const [isMixedBreed, setMixedBreed] = useState(false);
  const [gender, setGender] = useState('');
  let [year, setYear] = useState(0);
  let [month, setMonth] = useState(0);
  const [petActivityCode, setpetActivityCode] = useState('');
  const [weight, setWeight] = useState('');
  const [neutered, setNeutered] = useState('');
  const [bcs, setBcs] = useState('');

  useEffect(() => {
    let breedBool = isMixedBreed
    let ageBool = ((year * 12) + month) > 0;
    let weightBool = parseFloat(weight) > 0;

    if (isMixedBreed){
      breedBool = true
    }else {
      breedBool = !!(breedData?.key)
    }

    let stepOneDisabled = !(
      breedBool
      && gender
      && ageBool
      && weightBool
      && neutered
      && petActivityCode
    );

    setStepOneDisabled(stepOneDisabled);

  }, [ breedData, isMixedBreed, gender, year, month, petActivityCode, weight, neutered ])

  useEffect(() =>{
    if (!speciesValue) return;

    getBreedOptions(speciesValue).then(() => {
      if (Array.isArray(breedOptions) && breedOptions.length > 0 && initBreedValue){
        const value = breedOptions.find((item) => item.breedCode === initBreedValue)
        setBreedData({
          key: value.breedCode,
          name: value.localName,
        } ?? {})
      }
    });
  }, [speciesValue])

  const showQuestion = () => {
    setShowQuestion(true)
  }

  const handleBreedData = (data, isMixedBreed=false) => {
    setBreedData(data)
    setMixedBreed(!!isMixedBreed)
  }

  const handleGenderCode = (data) => {
    setGender(data)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Gender'
    })
  }

  const handleSetYear = (data) => {
    setYear(data)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Pet Age'
    })
  }

  const handleSetMouth = (data) => {
    setMonth(data)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Pet Age'
    })
  }

  const handleSetNeutered = (data) => {
    setNeutered(data)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Pet neutered'
    })
  }

  const handlePetActivityCode = (data) => {
    setpetActivityCode(data)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Pet Activity'
    })
  }

  const getResult = async () => {
    let param = {
      "breedCode": isMixedBreed ? 'mixed_breed' : breedData.key,
      "petActivityCode": petActivityCode,
      "genderCode": gender,
      "neutered": neutered,
      "age": year * 12 + month,
      "weight": weight,
      "bcs": bcs,
      "speciesCode": speciesValue,
      "technologyCode": details?.wsTechnologyCode,
      "energyCategory": details?.wsEnergyCategory,
      "referenceEnergyValue": details?.wsReferenceEnergyValue,
      "density": details?.wsDensity,
      "packWeight": goodsInfo?.goodsInfoWeight,
      "goodsInfoUnit": goodsInfo?.goodsInfoUnit,
    }
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Calculate portion'
    })
    // When the result is displayed
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Display result'
    })

    setLoading(true);
    try {
      let res = await productFinderDailyPortionRation(param);
      setLoading(false);
      setStep(3)
    }catch (e) {
      setLoading(false);
      setRation({})
    }
    console.log('productFinderDailyPortionRation - end', );

  }

  const againCalculation =() => {
    // 全部结果重置
    (!initBreedValue) && setBreedData({});
    setMixedBreed(false);
    setGender('');
    setYear(0);
    setMonth(0);
    setpetActivityCode('');
    setWeight('');
    setNeutered('');
    setBcs('');
    // 返回第一步
    setStep(1)
    dataLayer.push({
      'event' : 'rationingToolInteraction',
      'rationingToolInteraction' : 'Start a new calculation'
    })
  }

  const renderStep = (step) => {

    const breedCodeData = questionList.find((item) => item.name === 'breedCode');
    const genderCodeData = questionList.find((item) => item.name === 'genderCode');
    const ageCodeData = questionList.find((item) => item.name === 'age');
    const petActivityCodeData = questionList.find((item) => item.name === 'petActivityCode');
    const weightData = questionList.find((item) => item.name === 'weight');
    const neuteredData = questionList.find((item) => item.name === 'neutered');
    const bcsData = questionList.find((item) => item.name === 'bcs');

    switch (step){
      case 1:
        return (
          <div>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-1/3 pb-4 lg:pb-0'>
                <BreedSelect
                  isPreselected={!!breedData.key}
                  label={breedCodeData?.metadata?.label ?? ''}
                  options={breedOptions ?? []}
                  value={breedData}
                  onChange={handleBreedData}
                />
              </div>
              <div className='w-full lg:w-1/3 pb-4 lg:pb-0'>
                <SingleSelect
                  label={genderCodeData?.metadata?.label ?? ''}
                  value={gender}
                  type={'genderCode'}
                  options={genderCodeData?.possibleValues ?? []}
                  onChange={handleGenderCode}
                />
              </div>
              <div className='w-full lg:w-1/3 pb-4 lg:pb-0'>
                <AgeSelect
                  label={ageCodeData?.metadata?.label ?? ''}
                  yearValue={year}
                  monthValue={month}
                  onChangeYear={handleSetYear}
                  onChangeMonth={handleSetMouth}
                />
              </div>
            </div>
            <div className='flex flex-wrap lg:pt-6'>
              <div className='w-full pt-4 lg:pt-0 lg:w-1/3'>
                <WeightSelect
                  label={weightData?.metadata?.label ?? 'Current pet weight'}
                  value={weight}
                  onChange={setWeight}
                />
              </div>
              <div className='w-full pt-4 lg:pt-0 lg:w-1/3'>
                <RadioSelect
                  label={neuteredData?.metadata?.label ?? ''}
                  options={neuteredData?.possibleValues ?? []}
                  value={neutered}
                  onChange={handleSetNeutered}
                />
              </div>
              <div className='w-full pt-4 lg:pt-0 lg:w-1/3'>
                <SingleSelect
                  label={petActivityCodeData?.metadata?.label ?? ''}
                  value={petActivityCode}
                  options={petActivityCodeData?.possibleValues ?? []}
                  onChange={handlePetActivityCode}
                />
              </div>
            </div>
            <div className='py-10 text-center'>
              <button
                disabled={stepOneDisabled}
                className={
                classNames(
                  'rc-btn dailyPortion-startBtn',
                  {'rc-btn-solid-disabled': stepOneDisabled},
                )
              } onClick={() => setStep(2)}>
                <FormattedMessage id='continue'/>
              </button>
            </div>
          </div>
        )
      case 2: return (
        <div>
          <BcsSelect
            label={bcsData?.metadata?.label ?? "Select your pets’s body condition"}
            options={bcsData?.possibleValues ?? []}
            value={bcs}
            onChange={setBcs}
          />
          <div className='py-6 lg:py-10 text-center'>
            <div className='pb-6'>
              <button
                disabled={!bcs}
                onClick={() => getResult()}
                className={classNames(
                  'rc-btn rc-btn--one rc-margin-right--xs--mobile',
                  {'rc-btn-solid-disabled': !bcs},
                  {'ui-btn-loading': loading}
                )}
              >
                <FormattedMessage id='dailyPortion.calculatePortion'/>
              </button>
            </div>
            <div>
              <button
                onClick={() => setStep(1)}
                className={
                  classNames(
                    'rc-btn dailyPortion-startBtn',
                  )
                }>
                <FormattedMessage id='dailyPortion.editInformations'/>
              </button>
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div className='mt-4 text-center'>
          <div className='resultText-box p-6'>
            <p className='pb-10'>
              <FormattedMessage id={'dailyPortion.resultText'}/>
            </p>
            <div className='flex justify-center items-center'>
              <span><img className='resultText-box-icon px-2' src={DailyPortion_icon_text} alt={''}/></span>
              <span className='resultText-num'>
                <span>{ration.quantityPerDay}</span>
                <span>{ration.unit}</span>
              </span>
              <span className='pl-2'>/day</span>
            </div>
          </div>
          <div className='mt-6'>
            <button
              onClick={againCalculation}
              className={
                classNames(
                  'rc-btn dailyPortion-startBtn',
                )
              }>
              <FormattedMessage id='dailyPortion.newCalculationBtnText'/>
            </button>
          </div>

        </div>
      )
      default: return null
    }
  }

  const getBreedOptions = async (speciesValue) => {
    if(!speciesValue) return [];

    let param = {
      countryCode: window.__.env.REACT_APP_COUNTRY,
      species: String(speciesValue).toLowerCase()
    }
    let res = await productFinderDailyPortion(param);

    if(res.code === 'K-000000'){
      setBreedOptions(res.context.breeds ?? [])
    }else {
      setBreedOptions([])
    }
  }

  return (
    <div className='DailyPortion-wrap container '>
      <div className='lg:flex'>
        <div className='w-full lg:w-1/4 p-4 text-center'>
          <LazyLoad>
            <img src={DailyPortion_icon} alt={'Daily Portion'}/>
          </LazyLoad>
        </div>
        <div className='w-full lg:w-3/4 p-4'>
          <p className='py-4 lg:py-6'>
            <FormattedMessage id='dailyPortion.title'/>
          </p>
          <div className='flex justify-center lg:justify-start'>
            <button
              disabled={isCalculateDisabled}
              onClick={showQuestion}
              className={classNames(
                'rc-btn rc-btn--one rc-margin-right--xs--mobile',
                {'rc-btn-solid-disabled': isCalculateDisabled},
                {
                  'hidden': isShowQuestion
                }
              )}
            >
              <FormattedMessage id='dailyPortion.calculatePortion'/>
            </button>
          </div>

        </div>
      </div>
      <main className={classNames(
        'w-full p-4',
        {
          'hidden': !isShowQuestion
        }
      )}>
        {renderStep(step)}
      </main>
    </div>
  )
}
