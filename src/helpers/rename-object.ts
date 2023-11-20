import { SwapiResponsePeople } from "../interfaces/swapi.interface";

export const renamePeople = (people: SwapiResponsePeople, keysTranslate:string[], keys:string[]) => {
  keys.map( async (key,i) => {
    const texto = keysTranslate[i];
    people[texto] = people[`${key}`]
    delete people[`${key}`]
  })
}