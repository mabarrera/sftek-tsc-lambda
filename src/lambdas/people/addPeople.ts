import { APIGatewayProxyHandler } from "aws-lambda";
import * as AWS from 'aws-sdk';
import { v4 } from "uuid";
import { PeopleResponse } from "../../interfaces/people.interface";

export const addPeople:APIGatewayProxyHandler = async (event) => {
  const { name, lastname, email } = JSON.parse(event.body!);
  try {
    const createdAt = new Date();
    const id = v4();

    const people:PeopleResponse = { id, name, lastname, email, createdAt };

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    await dynamodb.put({
      TableName: 'PeopleTable',
      Item: people
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(people)
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}