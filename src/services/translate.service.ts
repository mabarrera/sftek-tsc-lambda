import * as AWS from 'aws-sdk';
import { Translate } from 'aws-sdk';
const translate = new AWS.Translate();
export const TranslateAWS = async (text:string, lang:string = 'es' ) => {
  const params: Translate.Types.TranslateTextRequest = {
    Text: text,
    SourceLanguageCode: 'en',
    TargetLanguageCode: lang
  }
  const translateText = await translate.translateText(params).promise();
  return translateText.TranslatedText;
}

export const translatePeopleToEsp = (text:string) => {
  const keysEng = [
    'name',       'height',
    'mass',       'hair_color',
    'skin_color', 'eye_color',
    'birth_year', 'gender',
    'homeworld',  'films',
    'species',    'vehicles',
    'starships',  'created',
    'edited',     'url'
  ]
  const keysEsp = [
    'nombre',          'altura',
    'masa',            'color_pelo',
    'color_piel',      'color_de_ojos',
    'ano_nacimiento',  'genero',
    'mundo_natal',     'peliculas',
    'especie',         'vehiculos',
    'naves_estelares', 'creado',
    'editado',         'URL'
  ]
  const index = keysEng.indexOf(text);
  return index !== -1 ? keysEsp[index] : text
}