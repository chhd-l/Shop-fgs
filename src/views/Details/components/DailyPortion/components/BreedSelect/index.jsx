import React, { useState } from 'react';
import SearchSelection from '@/components/SearchSelection';
import { FormattedMessage } from 'react-intl-phraseapp';

const testOptions = [
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
export default function BreedSelect(
  {
    label='Breed', // 表单标题
    options= testOptions,
    value={}, // BreedSelect的已选择的值,
    isBreedDisabled=false, // 是否禁止选择breed
    ...rest
  }
  ){
  let {
    onChange
  } = rest;
  const [inputValue, setInputValue] = useState(value?.name ?? undefined)
  const [checked, setChecked] = useState(false);

  React.useEffect(() => {
    const defaultValue = options.find((item) => item.label === value.name)
    setInputValue(defaultValue ? defaultValue.label : undefined)
  }, [value])

  const handleSelectChange = (val) => {
    console.log('val', val);
    onChange && onChange(val, false)
  }

  const handleSelectMixedBreedChange = (e) => {
    let bool = e.target.checked;
    console.log('handleSelectMixedBreedChange', bool);
    setChecked(bool)
    if (bool){
      onChange && onChange(undefined, true)
    }
  }

  return (
    <div>
      <div className="question-title">
        { label }
      </div>
      <div>
        <span className="rc-input rc-full-width">
          <FormattedMessage id="searchBreed">
            {(placeholder) => (
              <SearchSelection
                disabled={checked}
                queryList={async ({ inputVal, pageNum }) => {
                  let reg = new RegExp(`${inputVal}`, 'i')
                  return options
                    .filter((item) => reg.test(item.label))
                    .map((item) => ({
                      ...item, name: item.label
                    }))
                }}
                selectedItemChange={handleSelectChange}
                defaultValue={inputValue}
                placeholder={placeholder}
                customStyle={true}
                isBottomPaging={false}
              />
            )}
          </FormattedMessage>
        </span>
        <div className={"content-section"}>
          {/*form-group*/}
          <div className="mt-3">
            <div className="rc-input rc-input--inline">
              <input
                id="pf-checkbox-mixbreed"
                type="checkbox"
                className="rc-input__checkbox"
                // value="mixed_breed"
                checked={checked}
                onChange={handleSelectMixedBreedChange}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor="pf-checkbox-mixbreed"
              >
                <FormattedMessage id="productFinder.mixBreed" />
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


