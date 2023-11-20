import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import { SwapiResponsePeople } from "../../interfaces/swapi.interface";
import { TranslateAWS, translatePeopleToEsp } from "../../services/translate.service";
import { renamePeople, replaceSpecialChars } from "../../helpers";

export const getPeople:APIGatewayProxyHandler = async (event) => {
  const {id} = event.pathParameters!
  try {
    const { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
    const personaje:SwapiResponsePeople = data
    const keys = Object.keys(personaje)
    let keysEsp:string[] = []
    for( let key of keys ){
      const text = await TranslateAWS(key)
      keysEsp.push(replaceSpecialChars(text))
    }

    renamePeople(personaje, keysEsp, keys)

    return {
      statusCode: 200,
      body: JSON.stringify({ personaje })
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}