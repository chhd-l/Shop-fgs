import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BreedSelect from './components/BreedSelect';
import SingleSelect from './components/SingleSelect'
import AgeSelect from './components/AgeSelect';
import WeightSelect from './components/WeightSelect';
import RadioSelect from './components/RadioSelect';
import BcsSelect from './components/BcsSelect';
import DailyPortion_icon from '@/assets/images/salesCategory_cat.png';

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

const testArr = [
  {
    "name":"age",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"data",
      "label":"Quel âge a votre chat ?",
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
      "label":"Votre chat est-il stérilisé ?",
      "description":"Un animal stérilisé peut avoir tendance à prendre du poids en raison d'un appétit accru. Il est important de trouver un régime alimentaire moins calorique et plus riche en nutriments.",
      "description3":null
    },
    "possibleValues":[
      {
        "key":"true",
        "label":"Oui"
      },
      {
        "key":"false",
        "label":"Non"
      }
    ]
  },
  {
    "name":"breedCode",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"breed",
      "label":"Quelle est la race de votre chat?",
      "description":"Chaque race a des besoins nutritionnels différents. Mieux connaître leur race peut nous aider à choisir un régime alimentaire adapté à leurs besoins.",
      "description3":null
    },
    "possibleValues":[
      {
        "key":"american_curl_longhair",
        "label":"American Curl Longhair"
      },
      {
        "key":"serengeti",
        "label":"Serengeti"
      },
      {
        "key":"tiffanie",
        "label":"Tiffany"
      },
      {
        "key":"thai_lilac",
        "label":"Thai lilac"
      },
      {
        "key":"chantilly_tiffany",
        "label":"Chantilly tiffany"
      },
      {
        "key":"donskoy",
        "label":"Donskoy"
      },
      {
        "key":"oriental_shorthair",
        "label":"Oriental Shorthair"
      },
      {
        "key":"colourpoint_shorthair",
        "label":"Colourpoint shorthair"
      },
      {
        "key":"selkirk_rex_shorthair",
        "label":"Selkirk Rex Shorthair"
      },
      {
        "key":"californian_rex",
        "label":"Californian Rex"
      },
      {
        "key":"undefined",
        "label":"Non défini"
      },
      {
        "key":"kurilian_bobtail",
        "label":"Bobtail des Kouriles"
      },
      {
        "key":"peterbald",
        "label":"Peterbald"
      },
      {
        "key":"ural_rex",
        "label":"Rex de l'oural"
      },
      {
        "key":"chausie",
        "label":"Chausie"
      },
      {
        "key":"ceylan",
        "label":"Ceylan"
      },
      {
        "key":"american_bobtail",
        "label":"Bobtail Americain"
      },
      {
        "key":"munchkin",
        "label":"Munchkin"
      },
      {
        "key":"laperm_longhair",
        "label":"LaPerm Longhair"
      },
      {
        "key":"singapura",
        "label":"Singapura"
      },
      {
        "key":"arabian_mau",
        "label":"Mau arabe"
      },
      {
        "key":"ragdoll",
        "label":"Ragdoll"
      },
      {
        "key":"aphrodite_giant",
        "label":"Aphrodite giant"
      },
      {
        "key":"laperm",
        "label":"LaPerm"
      },
      {
        "key":"turks",
        "label":"Angora Turc"
      },
      {
        "key":"american_shorthair",
        "label":"American Shorthair"
      },
      {
        "key":"ocicat",
        "label":"Ocicat"
      },
      {
        "key":"persian",
        "label":"Persan"
      },
      {
        "key":"mixed_breed",
        "label":"Croisé"
      },
      {
        "key":"ussuri",
        "label":"Ussuri"
      },
      {
        "key":"heilige_birma",
        "label":"Sacré de Birmanie"
      },
      {
        "key":"chartreux",
        "label":"Chartreux"
      },
      {
        "key":"abyssinian",
        "label":"Abyssin"
      },
      {
        "key":"british_shorthair",
        "label":"British Shorthair"
      },
      {
        "key":"russie",
        "label":"Russe"
      },
      {
        "key":"cornish_rex",
        "label":"Cornish Rex"
      },
      {
        "key":"manx_longhair",
        "label":"Cymric"
      },
      {
        "key":"highlander",
        "label":"Highlander"
      },
      {
        "key":"asian",
        "label":"Asian"
      },
      {
        "key":"ojos_azules",
        "label":"Ojos azules"
      },
      {
        "key":"classicat",
        "label":"Classicat"
      },
      {
        "key":"balinese",
        "label":"Balinais"
      },
      {
        "key":"toyger",
        "label":"Toyger"
      },
      {
        "key":"lykoi",
        "label":"Lykoï"
      },
      {
        "key":"american_polydactyl",
        "label":"American polydactyl"
      },
      {
        "key":"siberian",
        "label":"Sibérien"
      },
      {
        "key":"bambino",
        "label":"Bambino"
      },
      {
        "key":"thai_blue_point",
        "label":"Thai blue point"
      },
    ]
  },
  {
    "name":"genderCode",
    "label":"null",
    "metadata":{
      "step":1,
      "questionDisplayType":"singleSelect",
      "label":"Quel est le sexe de votre chat ?",
      "description":"Les animaux de compagnie mâles et femelles ont des besoins alimentaires différents. Il s'agit de trouver ce qui convient le mieux à votre animal de compagnie.",
      "description3":null
    },
    "possibleValues":[
      {
        "key":"male",
        "label":"Mâle"
      },
      {
        "key":"female",
        "label":"Femelle"
      }
    ]
  },
  {
    "name": "weight",
    "label": "null", //单位
    "metadata": {
      "step": 2,
      "questionDisplayType": "weightSelect",
      "label": "Quel est le poids de votre chat ?",
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
      "label": "Quel est le niveau d'activité physique de votre chat ?",
      "description": "L'activité de votre animal détermine son métabolisme, qui fonctionne à un rythme variable.",
      "description3": null
    },
    "possibleValues": [
      {
        "key": "low",
        "label": "Très faible <1h/day"
      },
      {
        "key": "moderate",
        "label": "Modéré <2h/day"
      },
      {
        "key": "high",
        "label": "Très élevé >3h/day"
      }
    ]
  },
  {
    "name": "bcs",
    "label": "null",
    "metadata": {
      "step": 3,
      "questionDisplayType": "bcsSelect",
      "label": "Comment décririez-vous l'état corporel de votre chat ?",
      "description": null,
      "description3": null
    },
    "possibleValues": [
      {
        "key": "3",
        "label": "Underweight",
        'description':"Loss of mass muscle",
      },
      {
        "key": "5",
        "label": "Ideal",
        'description':"Well proportioned",
      },
      {
        "key": "7",
        "label": "Overweight",
        'description':"Waist barely visible",
      }
    ]
  }
]
export default function DailyPortion({
  isShow = true, // 是否展示计算工具
  isCalculateDisabled = false, // calculate 按钮是否禁止点击
  isBreedDisabled = false, // Breed问题是否禁止选择
  ...rest
}){

  if (!isShow) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShowQuestion, setShowQuestion] = useState(false);
  const [step, setStep] = useState(2);
  const [stepOneDisabled, setStepOneDisabled] = useState(true);
  const [stepTwoDisabled, setStepTwoDisabled] = useState(true);

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
    let stepOneDisabled = false;

  }, [breedData,isMixedBreed, gender, year, month, petActivityCode, weight, neutered])


  const showQuestion = () => {
    setShowQuestion(true)
  }

  const handleBreedData = (data, isMixedBreed=false) => {
    setBreedData(data)
    setMixedBreed(!!isMixedBreed)
  }

  const handleGenderCode = (data) => {
    setGender(data)
  }

  const handlePetActivityCode = (data) => {
    setpetActivityCode(data)
  }

  const getResult = () => {
    // 接口请求 TODO
    setStep(3)
  }

  const renderStep = (step) => {
    const breedCodeData = testArr.find((item) => item.name === 'breedCode');
    const genderCodeData = testArr.find((item) => item.name === 'genderCode');
    const ageCodeData = testArr.find((item) => item.name === 'age');
    const petActivityCodeData = testArr.find((item) => item.name === 'petActivityCode');
    const weightData = testArr.find((item) => item.name === 'weight');
    const neuteredData = testArr.find((item) => item.name === 'neutered');
    const bcsData = testArr.find((item) => item.name === 'bcs');

    switch (step){
      case 1:
        return (
          <div>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-1/3'>
                <BreedSelect
                  value={breedData}
                  onChange={handleBreedData}
                />
              </div>
              <div className='w-full lg:w-1/3'>
                <SingleSelect
                  label={genderCodeData?.metadata?.label ?? ''}
                  value={gender}
                  type={'genderCode'}
                  options={genderCodeData?.possibleValues ?? []}
                  onChange={handleGenderCode}
                />
              </div>
              <div className='w-full lg:w-1/3'>
                <AgeSelect
                  label={ageCodeData?.metadata?.label ?? ''}
                  yearValue={year}
                  monthValue={month}
                  onChangeYear={setYear}
                  onChangeMonth={setMonth}
                />
              </div>
            </div>
            <div className='flex flex-wrap lg:pt-10'>
              <div className='w-full pt-4 lg:pt-0 lg:w-1/3'>
                <WeightSelect
                  label={weightData?.metadata?.label ?? 'Current pet weight'}
                  onChange={setWeight}
                />
              </div>
              <div className='w-full pt-4 lg:pt-0 lg:w-1/3'>
                <RadioSelect
                  label={neuteredData?.metadata?.label ?? ''}
                  options={neuteredData?.possibleValues ?? []}
                  onChange={setNeutered}
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
            onChange={setBcs}
          />
          <div className='py-10 text-center'>
            <div className='pb-6'>
              <button
                disabled={!!bcs}
                onClick={showQuestion}
                className={classNames(
                  'rc-btn rc-btn--one rc-margin-right--xs--mobile',
                  {'rc-btn-solid-disabled': !!bcs},
                )}
              >
                <FormattedMessage id='dailyPortion.calculatePortion'/>
              </button>
            </div>
            <div>
              <button
                className={
                  classNames(
                    'rc-btn dailyPortion-startBtn',
                  )
                } onClick={() => getResult()}>
                <FormattedMessage id='continue'/>
              </button>
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div>
          <h1>结果</h1>
        </div>
      )
      default: return null
    }
  }

  return (
    <div className='DailyPortion-wrap container '>
      <div className='lg:flex'>
        <div className='w-full lg:w-1/5 p-4'>
          <LazyLoad>
            <img src={DailyPortion_icon} alt={'Daily Portion'}/>
          </LazyLoad>
        </div>
        <div className='w-full lg:w-4/5 p-4'>
          <p className='py-8'>
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
                  'invisible': isShowQuestion
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
