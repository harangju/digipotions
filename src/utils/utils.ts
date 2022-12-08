import axios from 'axios';

export function csvToJSON(csv: string): Array<object> {
  let lines: Array<string> = csv.split("\n");
  let result: Array<object> = [];
  let headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    let obj: { [key: string]: string } = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j].trim();
    }
    result.push(obj);
  }
  return result;
}

const URL_DARKSPIRIT = 'https://digidaigaku.com/dark-spirits/metadata/';
const URL_DARKHEROSPIRIT = 'https://digidaigaku.com/dark-hero-spirits/metadata/';

const URL_WEAPONS = 'https://raw.githubusercontent.com/harangju/digipotions/main/src/assets/csv/Weapons.csv';
const URL_CALLIGRAPHY = 'https://raw.githubusercontent.com/harangju/digipotions/main/src/assets/csv/Calligraphy.csv';
const URL_ENHANCEMENTS = 'https://raw.githubusercontent.com/harangju/digipotions/main/src/assets/csv/Enhancements.csv';
const URL_WEAPON_INVENTORY = 'https://raw.githubusercontent.com/harangju/digipotions/main/src/assets/csv/Weapon%20Inventory.csv';

export interface key_weapons {
  'Right Prop - Dark Spirit Hero': string;
  'Prop - Dark Spirit': string;
  'Revealed Villain Weapon Quantity': string;
  'Revealed Villain Weapon 1 Quality': string;
  'Revealed Villain Weapon 2 Quality': string;
};
export interface key_calligraphy {
  'Background - Dark Hero Spirit': string;
  'Background - Dark Spirit': string;
  'Revealed Villain Background': string;
  'Revealed Villain Calligraphy Style': string;
  'Revealed Villain Calligraphy Color': string;
};
export interface key_enhancements {
  'Bloodline - Dark Hero Spirit': string;
  'Expression - Dark Hero Spirit': string;
  'Expression - Dark Spirit': string;
  'Potion Name': string;
  'Revealed Villain Type': string;
  'Revealed Villain Class': string;
  'Revealed Villain Enhancement': string;
};

let recipe_weapons: Array<key_weapons>;
let recipe_calligraphy: Array<key_calligraphy>;
let recipe_enhancements: Array<key_enhancements>;
let inventory_weapons: Array<object>;

async function getSpirit(id: string, url: string): Promise<{ [key: string]: string }> {
  return new Promise((resolve, reject) => {
    axios.get(url + id + '.json')
      .then((response) => {
        let spirit: { [key: string]: string } = {};
        let attributes = response.data.attributes as { trait_type: string, value: string }[];
        for (let i in attributes) {
          spirit[attributes[i].trait_type] = attributes[i].value;
        }
        spirit['image'] = response.data.image;
        resolve(spirit);
      })
      .catch((error) => reject(error));
  });
}

export async function getDarkSpirit(id: string): Promise<{ [key: string]: string }> {
  return getSpirit(id, URL_DARKSPIRIT);
}

export async function getDarkHeroSpirit(id: string): Promise<{ [key: string]: string }> {
  return getSpirit(id, URL_DARKHEROSPIRIT);
}

export function getWeapons(darkSpiritProp: string, darkHeroSpiritRightProp: string): key_weapons {
  let weapons = recipe_weapons.filter((recipe) => {
    return (recipe['Prop - Dark Spirit'] == darkSpiritProp) &&
      (recipe['Right Prop - Dark Spirit Hero'] == darkHeroSpiritRightProp);
  });
  console.log('weapons', weapons);
  if (weapons.length > 0) {
    return weapons[0];
  } else {
    return {
      'Right Prop - Dark Spirit Hero': darkHeroSpiritRightProp,
      'Prop - Dark Spirit': darkSpiritProp,
      'Revealed Villain Weapon Quantity': '',
      'Revealed Villain Weapon 1 Quality': '',
      'Revealed Villain Weapon 2 Quality': '',
    };
  }
}

export function getCalligraphy(darkSpiritBackground: string, darkHeroSpiritBackground: string): key_calligraphy {
  let calligraphy = recipe_calligraphy.filter((recipe) => {
    return (recipe['Background - Dark Spirit'] == darkSpiritBackground) &&
      (recipe['Background - Dark Hero Spirit'] == darkHeroSpiritBackground);
  });
  return calligraphy[0];
}

export function getEnhancements(darkSpiritExpression: string, darkHeroSpiritBloodline: string, darkHeroSpiritExpression: string): key_enhancements {
  let enhancements = recipe_enhancements.filter((recipe) => {
    return (recipe['Expression - Dark Spirit'] == darkSpiritExpression) &&
      (recipe['Bloodline - Dark Hero Spirit'] == darkHeroSpiritBloodline) &&
      (recipe['Expression - Dark Hero Spirit'] == darkHeroSpiritExpression);
  });
  return enhancements[0];
}

function getRecipes() {
  axios.get(URL_WEAPONS)
    .then((response) => {
      recipe_weapons = csvToJSON(response.data) as key_weapons[];
      console.log(recipe_weapons);
    })
    .catch();
  axios.get(URL_CALLIGRAPHY)
    .then((response) => {
      recipe_calligraphy = csvToJSON(response.data) as key_calligraphy[];
      console.log(recipe_calligraphy);
    })
    .catch();
  axios.get(URL_ENHANCEMENTS)
    .then((response) => {
      recipe_enhancements = csvToJSON(response.data) as key_enhancements[];
      console.log(recipe_enhancements);
    })
    .catch();
  axios.get(URL_WEAPON_INVENTORY)
    .then((response) => {
      inventory_weapons = csvToJSON(response.data);
      console.log(inventory_weapons);
    })
    .catch();
}
getRecipes();