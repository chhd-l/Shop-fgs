/* eslint-disable no-unused-expressions */
import capitalize from 'lodash/capitalize';
export const GAForDailyPortionToolScreenPetInfo = () => {
  window.dataLayer?.push({
    event: 'dailyPortionToolScreen', //String : constant
    dailyPortionToolScreen: {
      name: 'Pet info' //String : constant
    }
  });
};

export const GAForDailyPortionToolScreenBCS = () => {
  window.dataLayer?.push({
    event: 'dailyPortionToolScreen', //String : constant
    dailyPortionToolScreen: {
      name: 'BCS' //String : constant
    }
  });
};

export const GAForDailyPortionToolScreenResults = (param) => {
  const {
    breedCode,
    weight,
    genderCode,
    year,
    month,
    bcs,
    neutered,
    petActivityCode,
    quantityPerDay
  } = param;
  const bcsMap = {
    3: 'Low',
    5: 'Medium',
    7: 'High'
  };
  window.dataLayer?.push({
    event: 'dailyPortionToolScreen', //String : constant
    dailyPortionToolScreen: {
      name: 'Results',
      petInfo: {
        breed: breedCode, //String : "Breed" field value coming from "Pet info" screen (including for Mixed Breed / Unknown)

        weight: `${weight} kg`, //String : "Weight" field value coming from "Pet info" screen (with local units)

        gender: capitalize(genderCode), //String : "Gender" field value coming from "Pet info" screen : "Male", "Female"

        neutered: neutered ? 'Yes' : 'No', //String : "Neutered" field value coming from "Pet info" screen : "Yes" or "No"

        age: year !== 0 ? `${year} Years` : `${month} Months`, //String : "Age" field value coming from "Pet info" screen, including the type of unit (Months / Years) selected

        activityLevel: capitalize(petActivityCode), //String : "Activity Level" field value coming from "Pet info" screen : "Low", "Medium", "High"

        BCS: bcsMap[bcs], //String : "BCS" field value coming from "BCS info" screen : "Low", "Medium", "High"

        portion: quantityPerDay //Integer : recommendation of daily portion displayed on the result screen
      }
    }
  });
};
