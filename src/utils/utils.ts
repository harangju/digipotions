import axios from 'axios';

export function csvToJSON(csv: string): object {
  let lines: Array<string> = csv.split("\n");
  let result: Array<object> = [];
  let headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    let obj: { [key: string]: string } = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

const URL_DARKSPIRIT = 'https://digidaigaku.com/dark-spirits/metadata/';
const URL_DARKHEROSPIRIT = 'https://digidaigaku.com/dark-hero-spirits/metadata/';

export async function getDarkSpirit(id: string): Promise<object> {
  return new Promise((resolve, reject) => {
    axios.get(URL_DARKSPIRIT + id + '.json')
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function getDarkHeroSpirit(id: string): Promise<object> {
  return new Promise((resolve, reject) => {
    axios.get(URL_DARKHEROSPIRIT + id + '.json')
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
