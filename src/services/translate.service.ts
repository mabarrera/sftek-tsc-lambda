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