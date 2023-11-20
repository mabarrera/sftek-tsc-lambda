import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';

import { SwapiResponsePeople } from '../../../interfaces/swapi.interface';
import { translatePeopleToEsp } from '../../../services/translate.service';
import { replaceSpecialChars, renamePeople } from '../../../helpers'

export const allPeople:APIGatewayProxyHandler = async (event) => {
  try {
    const { data } = await axios.get('https://swapi.py4e.com/api/people');
    const personajes:SwapiResponsePeople[] = data.results

    const keysObj = Object.keys(personajes[0])
    for(const [i, key] of keysObj.entries()){
      const text = translatePeopleToEsp(key);
      keysObj[i] = text
    }

    personajes.forEach( item => {
      const keys =  Object.keys(item)
      renamePeople(item, keysObj, keys)
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ personajes  })
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}